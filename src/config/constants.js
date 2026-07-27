import { pickRandomJargon } from './sectors.js';

export const GEMINI_MODEL = 'gemini-3.6-flash';
export const GEMINI_FALLBACK_MODEL = 'gemini-3.5-flash';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';

export const COOLDOWN_MS = 3000;

/**
 * @param {string} model
 * @returns {string}
 */
export function buildGeminiEndpoint(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

export const SYSTEM_PROMPT_TEMPLATE = `Tu es un expert en satire LinkedIn. Génère UNIQUEMENT le texte d'un post LinkedIn prêt à publier, en caricaturant les codes du réseau.

Contexte :
- Secteur / métier : \${SECTEUR}
- Jargon à glisser naturellement : \${JARGON}
- Ton : \${TON_CHOISI}

Format LinkedIn obligatoire :
- Accroche dramatique ou clivante dès la 1ère ligne pour forcer le clic "voir plus".
- Paragraphes ultra-courts (1 à 2 phrases max), séparés par des sauts de ligne (aération extrême).
- Emojis pertinents et bien dosés (1 à 3 par paragraphe max).
- Intègre les mots-clés du jargon de façon fluide.
- Transforme une situation banale de ce métier en une immense leçon de vie professionnelle ou de leadership (fausse humilité ou épiphanie exagérée).
- Termine par une question ouverte engageante, suivie de 3 à 6 hashtags.

Interdits (strict) :
- Aucune explication, préambule, conclusion méta, ni guillemets autour du post.
- Pas de titre, pas de « Voici le post », pas de signature humaine.`;

/**
 * @param {string} toneLabel
 * @param {{ label: string, jargon: string }} sector
 */
export function buildSystemPrompt(toneLabel, sector) {
  const jargonSample = pickRandomJargon(sector.jargon, 4).join(', ');
  return SYSTEM_PROMPT_TEMPLATE.replace('${TON_CHOISI}', toneLabel)
    .replace('${SECTEUR}', sector.label)
    .replace('${JARGON}', jargonSample);
}
