export const GEMINI_MODEL = 'gemini-2.5-flash-lite';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';
export const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export const COOLDOWN_MS = 3000;

export const SYSTEM_PROMPT_TEMPLATE =
  "Tu es un expert en satire LinkedIn. Ton rôle est de générer un post LinkedIn complet, incisif et amusant, à partir des mots-clés fournis, selon le ton demandé : '${TON_CHOISI}'. Intègre naturellement les mots-clés. Sois direct, ne donne AUCUNE explication ni phrase d'introduction/conclusion, génère UNIQUEMENT le texte du post.";

export function buildSystemPrompt(toneLabel) {
  return SYSTEM_PROMPT_TEMPLATE.replace('${TON_CHOISI}', toneLabel);
}
