/** @typedef {{ id: string, emoji: string, label: string, featured: boolean }} Keyword */

/**
 * Mots-clés LinkedIn hardcodés — libellés courts, clairs, et un peu potaches
 * pour rester dans le même registre que les tons.
 * `featured` = affiché par défaut ; les autres sont repliés sous "Voir plus".
 */
/** @type {Keyword[]} */
export const KEYWORDS = [
  { id: 'synergie', emoji: '🧩', label: 'Travail d’équipe', featured: true },
  { id: 'disruption', emoji: '💥', label: 'Tout changer', featured: false },
  { id: 'growth-mindset', emoji: '🌱', label: 'Progresser', featured: false },
  { id: 'leadership', emoji: '🫡', label: 'Prendre les devants', featured: false },
  { id: 'resilience', emoji: '💪', label: 'Tenir bon', featured: false },
  { id: 'hustle', emoji: '🥵', label: 'Travailler trop', featured: true },
  { id: 'networking', emoji: '🕸️', label: 'Réseauter', featured: false },
  { id: 'innovation', emoji: '💡', label: 'Inventer un truc', featured: false },
  { id: 'vulnerability', emoji: '😢', label: 'Montrer ses doutes', featured: true },
  { id: 'gratitude', emoji: '🙏', label: 'Dire merci', featured: false },
  { id: 'fail-forward', emoji: '🤕', label: 'Apprendre de l’échec', featured: false },
  { id: 'thought-leadership', emoji: '🔮', label: 'Avoir une vision', featured: false },
  { id: 'empowerment', emoji: '🦸', label: 'Autonomiser', featured: false },
  { id: 'agile', emoji: '🌊', label: 'S’adapter', featured: false },
  { id: 'burnout', emoji: '🫠', label: 'Au bout du rouleau', featured: true },
  { id: 'work-life', emoji: '⚖️', label: 'Vie pro / perso', featured: false },
  { id: 'raise', emoji: '💰', label: 'Lever des fonds', featured: true },
  { id: 'ai', emoji: '🤖', label: 'IA partout', featured: true },
  { id: 'passion', emoji: '❤️‍🔥', label: 'Kiffer son taf', featured: true },
  { id: 'humble-brag', emoji: '😇', label: 'Fausse modestie', featured: true },
];

export const MIN_KEYWORDS = 1;
export const MAX_KEYWORDS = 5;

/**
 * @param {string[]} ids
 * @returns {Keyword[]}
 */
export function getKeywordsByIds(ids) {
  const set = new Set(ids);
  return KEYWORDS.filter((keyword) => set.has(keyword.id));
}
