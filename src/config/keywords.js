/** @typedef {{ id: string, label: string }} Keyword */

/** Mots-clés LinkedIn hardcodés pour la génération. */
/** @type {Keyword[]} */
export const KEYWORDS = [
  { id: 'synergie', label: 'Synergie' },
  { id: 'disruption', label: 'Disruption' },
  { id: 'growth-mindset', label: 'Growth mindset' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'resilience', label: 'Résilience' },
  { id: 'hustle', label: 'Hustle' },
  { id: 'networking', label: 'Networking' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'vulnerability', label: 'Vulnérabilité' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'fail-forward', label: 'Fail forward' },
  { id: 'thought-leadership', label: 'Thought leadership' },
  { id: 'empowerment', label: 'Empowerment' },
  { id: 'agile', label: 'Agile' },
  { id: 'burnout', label: 'Burn-out' },
  { id: 'work-life', label: 'Work-life balance' },
  { id: 'raise', label: 'Levée de fonds' },
  { id: 'ai', label: 'IA' },
  { id: 'passion', label: 'Passion' },
  { id: 'humble-brag', label: 'Humble brag' },
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
