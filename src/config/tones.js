/** @typedef {{ id: string, emoji: string, label: string, shortLabel: string }} Tone */

/** @type {Tone[]} */
export const TONES = [
  {
    id: 'honest',
    emoji: '🤫',
    label: 'Honnête / Sans filtre',
    shortLabel: 'Honnête',
  },
  {
    id: 'cynical',
    emoji: '🤡',
    label: 'Ultra-Cynique',
    shortLabel: 'Ultra-Cynique',
  },
  {
    id: 'bullshit-max',
    emoji: '🚀',
    label: 'Encore PLUS LinkedIn (Bullshit MAX)',
    shortLabel: 'Bullshit MAX',
  },
  {
    id: 'five-year-old',
    emoji: '👶',
    label: 'Traduction pour Enfant de 5 ans',
    shortLabel: 'Enfant 5 ans',
  },
  {
    id: 'tweet',
    emoji: '⚡',
    label: 'Format Tweet (140 car.)',
    shortLabel: 'Tweet',
  },
  {
    id: 'passive-aggressive',
    emoji: '😐',
    label: 'Passif-agressif de open space',
    shortLabel: 'Passif-agressif',
  },
  {
    id: 'coach',
    emoji: '🔥',
    label: 'Coach motivation à fond',
    shortLabel: 'Coach motivé',
  },
  {
    id: 'grandma',
    emoji: '👵',
    label: 'Comme si ta grand-mère expliquait LinkedIn',
    shortLabel: 'Grand-mère',
  },
  {
    id: 'soap',
    emoji: '🎭',
    label: 'Drame / soap opera professionnel',
    shortLabel: 'Drame',
  },
  {
    id: 'hr-speak',
    emoji: '📎',
    label: 'RH corporate (langue de bois)',
    shortLabel: 'RH corporate',
  },
  {
    id: 'poetry',
    emoji: '🌙',
    label: 'Poésie absurde de bureau',
    shortLabel: 'Poésie absurde',
  },
  {
    id: 'manifesto',
    emoji: '✊',
    label: 'Manifeste un peu trop sérieux',
    shortLabel: 'Manifeste',
  },
];

export const DEFAULT_TONE_ID = 'honest';

export function getToneById(id) {
  return TONES.find((tone) => tone.id === id) ?? TONES[0];
}
