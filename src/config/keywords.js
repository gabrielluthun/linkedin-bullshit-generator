/** @typedef {{ id: string, emoji: string, label: string, buzzword: string, featured: boolean }} Keyword */

/**
 * Mots-clés LinkedIn hardcodés.
 * `label` = libellé affiché, en français simple et un peu potache.
 * `buzzword` = jargon LinkedIn correspondant, transmis au modèle pour qu'il vise
 * le bon cliché plutôt que de le deviner depuis le libellé traduit.
 * `featured` = affiché par défaut ; les autres sont repliés sous "Voir plus".
 */
/** @type {Keyword[]} */
export const KEYWORDS = [
  { id: 'humble-brag', emoji: '😇', label: 'Fausse modestie', buzzword: 'humble brag', featured: true },
  { id: 'burnout', emoji: '🫠', label: 'Au bout du rouleau', buzzword: 'burnout', featured: true },
  { id: 'hustle', emoji: '🥵', label: 'Travailler trop', buzzword: 'hustle culture', featured: true },
  { id: 'morning-routine', emoji: '🕗', label: 'Se lever à 5h', buzzword: 'morning routine', featured: true },
  { id: 'promotion', emoji: '🏆', label: 'Annoncer une promo', buzzword: 'fier·e d’annoncer', featured: true },
  { id: 'useless-meeting', emoji: '⏰', label: 'Réunion inutile', buzzword: 'réunion qui aurait pu être un mail', featured: true },
  { id: 'vulnerability', emoji: '😢', label: 'Montrer ses doutes', buzzword: 'vulnérabilité', featured: true },
  { id: 'ai', emoji: '🤖', label: 'IA partout', buzzword: 'IA générative', featured: true },
  { id: 'raise', emoji: '💰', label: 'Lever des fonds', buzzword: 'levée de fonds', featured: true },
  { id: 'passion', emoji: '❤️‍🔥', label: 'Kiffer son taf', buzzword: 'passion', featured: true },
  { id: 'new-chapter', emoji: '👋', label: 'Quitter son job', buzzword: 'nouveau chapitre', featured: false },
  { id: 'imposter', emoji: '🧠', label: 'Syndrome de l’imposteur', buzzword: 'syndrome de l’imposteur', featured: false },
  { id: 'rto', emoji: '🏠', label: 'Retour au bureau', buzzword: 'retour au présentiel', featured: false },
  { id: 'layoffs', emoji: '📉', label: 'Licenciements bienveillants', buzzword: 'plan de restructuration', featured: false },
  { id: 'pivot', emoji: '🔁', label: 'On a pivoté', buzzword: 'pivot stratégique', featured: false },
  { id: 'inspiring-coffee', emoji: '☕', label: 'Échange inspirant', buzzword: 'échange inspirant', featured: false },
  { id: 'conference', emoji: '🎤', label: 'Parler en conférence', buzzword: 'prise de parole en conférence', featured: false },
  { id: 'side-project', emoji: '💸', label: 'Side project du soir', buzzword: 'side project', featured: false },
  { id: 'mission', emoji: '🌍', label: 'Mission / impact', buzzword: 'mission à impact', featured: false },
  { id: 'thought-leadership', emoji: '🔮', label: 'Avoir une vision', buzzword: 'thought leadership', featured: false },
  { id: 'disruption', emoji: '💥', label: 'Tout changer', buzzword: 'disruption', featured: false },
  { id: 'fail-forward', emoji: '🤕', label: 'Apprendre de l’échec', buzzword: 'fail forward', featured: false },
  { id: 'leadership', emoji: '🫡', label: 'Prendre les devants', buzzword: 'leadership', featured: false },
  { id: 'synergie', emoji: '🧩', label: 'Travail d’équipe', buzzword: 'synergie', featured: false },
  { id: 'innovation', emoji: '💡', label: 'Inventer un truc', buzzword: 'innovation', featured: false },
  { id: 'networking', emoji: '🕸️', label: 'Réseauter', buzzword: 'networking', featured: false },
  { id: 'work-life', emoji: '⚖️', label: 'Vie pro / perso', buzzword: 'work-life balance', featured: false },
  { id: 'gratitude', emoji: '🙏', label: 'Dire merci', buzzword: 'gratitude', featured: false },
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

/**
 * Tire au hasard une sélection valide de mots-clés, en visant 3 termes minimum
 * pour éviter les posts trop pauvres.
 * @returns {string[]}
 */
export function pickRandomKeywordIds() {
  const min = Math.max(MIN_KEYWORDS, Math.min(3, MAX_KEYWORDS));
  const size = min + Math.floor(Math.random() * (MAX_KEYWORDS - min + 1));

  return [...KEYWORDS]
    .sort(() => Math.random() - 0.5)
    .slice(0, size)
    .map((keyword) => keyword.id);
}
