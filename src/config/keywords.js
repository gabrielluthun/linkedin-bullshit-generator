/** @typedef {{ id: string, label: string }} Keyword */

/** Mots-clés LinkedIn hardcodés — libellés courts et clairs. */
/** @type {Keyword[]} */
export const KEYWORDS = [
  { id: 'synergie', label: 'Travail d’équipe' },
  { id: 'disruption', label: 'Tout changer' },
  { id: 'growth-mindset', label: 'Progresser' },
  { id: 'leadership', label: 'Prendre les devant' },
  { id: 'resilience', label: 'Tenir bon' },
  { id: 'hustle', label: 'Travailler trop' },
  { id: 'networking', label: 'Réseau' },
  { id: 'innovation', label: 'Nouveauté' },
  { id: 'vulnerability', label: 'Parler de ses doutes' },
  { id: 'gratitude', label: 'Dire merci' },
  { id: 'fail-forward', label: 'Apprendre de l’échec' },
  { id: 'thought-leadership', label: 'Avoir une vision' },
  { id: 'empowerment', label: 'Autonomiser' },
  { id: 'agile', label: 'S’adapter' },
  { id: 'burnout', label: 'Au bout du rouleau' },
  { id: 'work-life', label: 'Vie pro / perso' },
  { id: 'raise', label: 'Lever des fonds' },
  { id: 'ai', label: 'IA' },
  { id: 'passion', label: 'Passion du job' },
  { id: 'humble-brag', label: 'Fausse modestie' },
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
