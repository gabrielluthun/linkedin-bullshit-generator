import { pickRandomJargon } from './sectors.js';

export const GEMINI_MODEL = 'gemini-3.6-flash';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';
export const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export const COOLDOWN_MS = 3000;

export const SYSTEM_PROMPT_TEMPLATE =
  "Tu es un expert en satire LinkedIn. Ton rôle est de générer un post LinkedIn complet, incisif et amusant, à partir des mots-clés fournis, pour le secteur/métier '${SECTEUR}' (jargon typique à glisser naturellement : ${JARGON}), selon le ton demandé : '${TON_CHOISI}'. Ancre le post dans des situations crédibles de ce métier. Intègre naturellement les mots-clés. Sois direct, ne donne AUCUNE explication ni phrase d'introduction/conclusion, génère UNIQUEMENT le texte du post.";

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
