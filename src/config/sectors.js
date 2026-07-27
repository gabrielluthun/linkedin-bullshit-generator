/**
 * @typedef {{
 *   id: string,
 *   emoji: string,
 *   label: string,
 *   shortLabel: string,
 *   jargon: string,
 * }} Sector
 */

/** @type {Sector[]} */
export const SECTORS = [
  {
    id: 'tech',
    emoji: '💻',
    label: 'Tech / Produit',
    shortLabel: 'Tech',
    jargon: 'sprint, OKR, roadmap, deploy, dette technique, scaling, product-market fit',
  },
  {
    id: 'marketing',
    emoji: '📣',
    label: 'Marketing / Com',
    shortLabel: 'Marketing',
    jargon: 'funnel, CAC, ROAS, brand awareness, content, reach, conversion',
  },
  {
    id: 'sales',
    emoji: '🤝',
    label: 'Sales / Business Dev',
    shortLabel: 'Sales',
    jargon: 'pipeline, closing, quota, CRM, discovery call, revenu récurrent annuel, upsell',
  },
  {
    id: 'hr',
    emoji: '🧑‍💼',
    label: 'RH / Talent',
    shortLabel: 'RH',
    jargon: 'ATS, culture fit, onboarding, retention, employer branding, soft skills',
  },
  {
    id: 'finance',
    emoji: '📊',
    label: 'Finance / Consulting',
    shortLabel: 'Finance',
    jargon: 'P&L, runway, due diligence, KPI, burn rate, forecast, stakeholder',
  },
  {
    id: 'startup',
    emoji: '🚀',
    label: 'Startup / Founder',
    shortLabel: 'Startup',
    jargon: 'seed, Series A, pivot, MVP, traction, bootstrapping, founder mode',
  },
  {
    id: 'freelance',
    emoji: '🧳',
    label: 'Freelance / Indépendant',
    shortLabel: 'Freelance',
    jargon: 'client, TJM, portfolio, side project, networking, personal branding',
  },
  {
    id: 'general',
    emoji: '🏢',
    label: 'Corporate général',
    shortLabel: 'Corporate',
    jargon: 'synergie, process, alignment, meeting, transformation, gouvernance',
  },
];

export const DEFAULT_SECTOR_ID = 'tech';

/**
 * @param {string} id
 * @returns {Sector}
 */
export function getSectorById(id) {
  return SECTORS.find((sector) => sector.id === id) ?? SECTORS[0];
}
