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
];

export const DEFAULT_TONE_ID = 'honest';

export function getToneById(id) {
  return TONES.find((tone) => tone.id === id) ?? TONES[0];
}
