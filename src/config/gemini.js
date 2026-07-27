export const GEMINI_MODEL = 'gemini-3.6-flash';
export const GEMINI_FALLBACK_MODEL = 'gemini-3.5-flash';
export const GEMINI_SECOND_FALLBACK_MODEL = 'gemini-3.5-flash-lite';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';

/** Chaîne de modèles : 3.6 → 3.5 → 3.5-flash-lite (bascule uniquement sur error 429). */
export const GEMINI_MODEL_CHAIN = [
  GEMINI_MODEL,
  GEMINI_FALLBACK_MODEL,
  GEMINI_SECOND_FALLBACK_MODEL,
];

/**
 * @param {string} model
 * @returns {string}
 */
export function buildGeminiEndpoint(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}
