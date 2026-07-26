import { GEMINI_API_KEY, GEMINI_ENDPOINT, buildSystemPrompt } from '../config/constants.js';

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
 */
export class GeminiService {
  hasApiKey() {
    return Boolean(GEMINI_API_KEY && String(GEMINI_API_KEY).trim());
  }

  /**
   * @param {string[]} keywords
   * @param {string} toneLabel
   * @returns {Promise<string>}
   */
  async generate(keywords, toneLabel) {
    if (!this.hasApiKey()) {
      throw new GeminiApiError(
        'Clé API Gemini manquante. Définissez VITE_GEMINI_API_KEY dans votre fichier .env puis relancez le serveur.',
      );
    }

    const systemPrompt = buildSystemPrompt(toneLabel);
    const keywordList = keywords.map((k) => `- ${k}`).join('\n');
    const userPrompt = `Génère un post LinkedIn complet à partir de ces mots-clés :\n${keywordList}`;

    let response;
    try {
      response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
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

    return text;
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
