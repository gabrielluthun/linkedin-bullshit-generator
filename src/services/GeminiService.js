import { GEMINI_API_KEY, GEMINI_MODEL_CHAIN, buildGeminiEndpoint } from '../config/gemini.js';
import { buildSystemPrompt } from '../config/prompt.js';

export class GeminiApiError extends Error {
  /**
   * @param {string} message
   * @param {number} [status]
   */
  constructor(message, status) {
    super(message);
    this.name = 'GeminiApiError';
    this.status = status;
  }
}

/**
 * Service d'accès à l'API Gemini (couche Service / N-tier).
 * En cas de rate limit (429), bascule : gemini-3.6-flash → 3.5-flash → 3.5-flash-lite.
 */
export class GeminiService {
  hasApiKey() {
    return Boolean(GEMINI_API_KEY && String(GEMINI_API_KEY).trim());
  }

  /**
   * @param {string[]} keywords
   * @param {string} toneLabel
   * @param {{ label: string, jargon: string }} sector
   * @returns {Promise<string>}
   */
  async generate(keywords, toneLabel, sector) {
    if (!this.hasApiKey()) {
      throw new GeminiApiError(
        'Clé API Gemini manquante. Définissez VITE_GEMINI_API_KEY dans votre fichier .env puis relancez le serveur.',
      );
    }

    const systemPrompt = buildSystemPrompt(toneLabel, sector);
    const keywordList = keywords.map((k) => `- ${k}`).join('\n');
    const userPrompt = `Secteur : ${sector.label}\nGénère un post LinkedIn complet à partir de ces mots-clés :\n${keywordList}`;
    const promptText = `${systemPrompt}\n\n${userPrompt}`;

    for (const model of GEMINI_MODEL_CHAIN) {
      try {
        return await this.#generateWithModel(model, promptText);
      } catch (error) {
        if (!(error instanceof GeminiApiError) || error.status !== 429) {
          throw error;
        }
      }
    }

    throw new GeminiApiError(
      `Rate limit atteint sur ${GEMINI_MODEL_CHAIN.join(', ')}. Réessayez plus tard.`,
      429,
    );
  }

  /**
   * @param {string} model
   * @param {string} promptText
   * @returns {Promise<string>}
   */
  async #generateWithModel(model, promptText) {
    let response;
    try {
      response = await fetch(buildGeminiEndpoint(model), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: promptText }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
          },
        }),
      });
    } catch {
      throw new GeminiApiError(
        'Impossible de joindre l’API Gemini. Vérifiez votre connexion réseau.',
      );
    }

    if (!response.ok) {
      throw new GeminiApiError(await this.#mapHttpError(response), response.status);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text ?? '')
      .join('')
      .trim();

    if (!text) {
      const blockReason = data?.promptFeedback?.blockReason;
      if (blockReason) {
        throw new GeminiApiError(
          `La génération a été bloquée par Gemini (${blockReason}). Essayez d’autres mots-clés ou un autre ton.`,
        );
      }
      throw new GeminiApiError('Réponse vide de Gemini. Réessayez dans un instant.');
    }

    return this.#stripMarkdownEmphasis(text);
  }

  /**
   * Retire le gras/italique Markdown (* et **) parfois ajouté autour des mots-clés.
   * @param {string} text
   * @returns {string}
   */
  #stripMarkdownEmphasis(text) {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*\n]+)\*/g, '$1')
      .replace(/\*{1,2}/g, '');
  }

  /**
   * @param {Response} response
   */
  async #mapHttpError(response) {
    let details = '';
    try {
      const payload = await response.json();
      details = payload?.error?.message ?? '';
    } catch {
      // ignore parse errors
    }

    if (response.status === 401 || response.status === 403) {
      return 'Clé API Gemini invalide ou non autorisée. Vérifiez VITE_GEMINI_API_KEY.';
    }

    if (response.status === 429) {
      return 'Rate limit dépassé. Attendez quelques secondes puis réessayez.';
    }

    if (response.status >= 500) {
      return 'Le service Gemini est temporairement indisponible. Réessayez plus tard.';
    }

    return details
      ? `Erreur API Gemini (${response.status}) : ${details}`
      : `Erreur API Gemini (${response.status}).`;
  }
}
