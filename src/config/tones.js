/** @typedef {{ id: string, emoji: string, label: string, shortLabel: string, featured: boolean }} Tone */

/**
 * `featured` = affiché par défaut ; les autres sont repliés sous "Voir plus".
 */
/** @type {Tone[]} */
export const TONES = [
  {
    id: 'honest',
    emoji: '🤫',
    label: 'Honnête / Sans filtre',
    shortLabel: 'Honnête',
    featured: true,
  },
  {
    id: 'cynical',
    emoji: '🤡',
    label: 'Ultra-Cynique',
    shortLabel: 'Ultra-Cynique',
    featured: true,
  },
  {
    id: 'bullshit-max',
    emoji: '📈',
    label: 'Encore PLUS LinkedIn (Bullshit MAX)',
    shortLabel: 'Bullshit MAX',
    featured: true,
  },
  {
    id: 'five-year-old',
    emoji: '👶',
    label: 'Traduction pour Enfant de 5 ans',
    shortLabel: 'Enfant 5 ans',
    featured: true,
  },
  {
    id: 'tweet',
    emoji: '⚡',
    label: 'Format Tweet (140 car.)',
    shortLabel: 'Tweet',
    featured: true,
  },
  {
    id: 'passive-aggressive',
    emoji: '😐',
    label: 'Passif-agressif de open space',
    shortLabel: 'Passif-agressif',
    featured: false,
  },
  {
    id: 'coach',
    emoji: '🔥',
    label: 'Coach motivation à fond',
    shortLabel: 'Coach motivé',
    featured: false,
  },
  {
    id: 'grandma',
    emoji: '👵',
    label: 'Comme si ta grand-mère expliquait LinkedIn',
    shortLabel: 'Grand-mère',
    featured: false,
  },
  {
    id: 'soap',
    emoji: '🎭',
    label: 'Drame / soap opera professionnel',
    shortLabel: 'Drame',
    featured: false,
  },
  {
    id: 'hr-speak',
    emoji: '📎',
    label: 'RH corporate (langue de bois)',
    shortLabel: 'RH corporate',
    featured: false,
  },
  {
    id: 'poetry',
    emoji: '🌙',
    label: 'Poésie absurde de bureau',
    shortLabel: 'Poésie absurde',
    featured: false,
  },
  {
    id: 'manifesto',
    emoji: '✊',
    label: 'Manifeste un peu trop sérieux',
    shortLabel: 'Manifeste',
    featured: false,
  },
];

export const DEFAULT_TONE_ID = 'honest';

export function getToneById(id) {
  return TONES.find((tone) => tone.id === id) ?? TONES[0];
}
