/** @typedef {{ id: string, emoji: string, label: string, shortLabel: string, featured: boolean, promptTone: string }} Tone */

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
    promptTone:
      'Honnête / sans filtre : dis la vérité crue du métier, sans langue de bois ni posture LinkedIn. Ironie sèche, constats qui piquent, zéro inspiration toxique.',
    featured: true,
  },
  {
    id: 'cynical',
    emoji: '🤡',
    label: 'Ultra-Cynique',
    shortLabel: 'Ultra-Cynique',
    promptTone:
      'Ultra-cynique : moque impitoyablement les absurdités du milieu pro, le bullshit corporate et l’auto-satisfaction LinkedIn. Ton mordant, sarcasme assumé, humour noir.',
    featured: true,
  },
  {
    id: 'bullshit-max',
    emoji: '📈',
    label: 'Encore PLUS LinkedIn (Bullshit MAX)',
    shortLabel: 'Bullshit MAX',
    promptTone:
      'Encore PLUS LinkedIn (Bullshit MAX) : pousse à l’extrême tous les clichés du réseau — épiphanie de réveil à 5h, leçon de leadership sortie de nulle part, humble brag, mindset de guerrier. Satire totale du format LinkedIn.',
    featured: true,
  },
  {
    id: 'five-year-old',
    emoji: '👶',
    label: 'Traduction pour Enfant de 5 ans',
    shortLabel: 'Enfant 5 ans',
    promptTone:
      'Expliquer le sujet de manière simple et concise pour un enfant de 5 ans.',
    featured: true,
  },
  {
    id: 'grandma',
    emoji: '👵',
    label: 'Comme si ta grand-mère apprenait LinkedIn',
    shortLabel: 'Grand-mère',
    promptTone:
      'Comme si ta grand-mère apprenait LinkedIn : ton affectueux et décalé, métaphores de cuisine ou de village, erreurs de vocabulaire et de syntaxe volontaires.',
    featured: false,
  },
  {
    id: 'lesson-learned',
    emoji: '🪞',
    label: 'Leçon apprise (échec stylisé)',
    shortLabel: 'Leçon apprise',
    promptTone:
      'Leçon apprise (échec stylisé) : part d’un échec minuscule et ridicule du métier (un mail mal envoyé, un oubli de badge) et transforme-le en révélation existentielle démesurée. Fausse vulnérabilité, gravité solennelle totalement disproportionnée.',
    featured: false,
  },
  {
    id: 'fake-faq',
    emoji: '🙋',
    label: 'FAQ imaginaire',
    shortLabel: 'FAQ imaginaire',
    promptTone:
      'FAQ imaginaire : structure le post en questions que personne n’a jamais posées (« On me demande souvent pourquoi… »), suivies de réponses péremptoires. Autopromotion déguisée en pédagogie, certitude absolue sur des questions inexistantes.',
    featured: false,
  },
  {
    id: 'influencer',
    emoji: '📣',
    label: 'Influenceur LinkedIn (engagement bait)',
    shortLabel: 'Influenceur',
    promptTone:
      'Influenceur LinkedIn (engagement bait assumé) : phrases-chocs isolées sur leur ligne, injonctions à réagir (« Agree ? », « Repost si tu… », « Commente OUI »), fausse question rhétorique, chasse aux likes décomplexée.',
    featured: false,
  },
  {
    id: 'passive-aggressive',
    emoji: '😐',
    label: 'Passif-agressif de open space',
    shortLabel: 'Passif-agressif',
    promptTone:
      'Passif-agressif de open space : politesse feinte, sous-entendus cinglants, « je ne dis pas que… mais… », reproches déguisés en observations innocentes sur collègues, réunions et open space.',
    featured: false,
  },
  {
    id: 'coach',
    emoji: '🔥',
    label: 'Coach motivation à fond',
    shortLabel: 'Coach motivé',
    promptTone:
      'Coach motivation à fond : énergie débordante, impératifs, citations inventées, promesses de transformation en 30 jours. Caricature du coach LinkedIn qui vend du rêve et du « mindset gagnant ».',
    featured: false,
  },
  {
    id: 'soap',
    emoji: '🎭',
    label: 'Drame / soap opera professionnel',
    shortLabel: 'Drame',
    promptTone:
      'Drame / soap opera professionnel : tension maximale, cliffhanger, trahisons de bureau, révélations choc sur une réunion anodine. Ton mélodramatique, comme une série télé sur la vie de bureau.',
    featured: false,
  },
  {
    id: 'hr-speak',
    emoji: '📎',
    label: 'RH corporate (langue de bois)',
    shortLabel: 'RH corporate',
    promptTone:
      'RH corporate (langue de bois) : euphémismes, « synergies », « processus d’accompagnement », « dynamique constructive ». Satire du discours RH qui noie le sens sous le jargon institutionnel.',
    featured: false,
  },
];

export const DEFAULT_TONE_ID = 'honest';

export function getToneById(id) {
  return TONES.find((tone) => tone.id === id) ?? TONES[0];
}

/**
 * @returns {string} Identifiant d'un ton tiré au hasard.
 */
export function pickRandomToneId() {
  return TONES[Math.floor(Math.random() * TONES.length)].id;
}
