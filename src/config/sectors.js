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
    shortLabel: 'Dev',
    jargon:
      'sprint, objectifs, feuille de route, deploy, dette technique, scaling, product-market fit, mise en prod, feature flag, post-mortem, backlog, refactor, CI/CD, observability, legacy, ship fast, architecture, discovery produit, user story, release, incident, tech lead, ownership technique, time-to-market, GitHub',
  },
  {
    id: 'marketing',
    emoji: '📣',
    label: 'Marketing / Com',
    shortLabel: 'Marketing',
    jargon:
      'funnel, CAC, notoriété de marque, contenu, reach, taux de conversion, prise de parole, lead magnet, storytelling, audience, ROAS, brand awareness, activation, nurturing, persona, campagne, engagement, viralité, top of funnel, positionnement, social proof, community management, inbound, A/B testing, copywriting',
  },
  {
    id: 'sales',
    emoji: '🤝',
    label: 'Sales / Business',
    shortLabel: 'Sales',
    jargon:
      'pipeline, closing, quota, CRM, discovery call, revenu annuel, upsell, remontée terrain, cycle de vente, portefeuille client, revenu annuel, cross-sell, objection handling, cold outreach, warm intro, deal, forecast commercial, closing rate, ICP, account-based, négociation, closing call, lead qualifié, go/no-go',
  },
  {
    id: 'hr',
    emoji: '🧑‍💼',
    label: 'RH / Talent',
    shortLabel: 'RH',
    jargon:
      'ATS, culture fit, onboarding, rétention, marque employeur, soft skills, savoir-être, feedback 360, compétences transverses, conduite du changement, talent acquisition, employee experience, mobilité interne, QVCT, diversité et inclusion, people management, parcours collaborateur, entretien annuel, engagement collaborateurs, employer branding, soft landing, upskilling, reskilling, bienveillance',
  },
  {
    id: 'finance',
    emoji: '📊',
    label: 'Finance / Consulting',
    shortLabel: 'Finance',
    jargon:
      'P&L, runway, due diligence, KPI, burn rate, prévisionnel, parties prenantes, valeur ajoutée, comité de pilotage, alignement stratégique, cash-flow, ROI, benchmarking, livrable, cadrage, diagnostic, feuille de route stratégique, gouvernance, reporting, consolidation, business case, risk assessment, optimisation des coûts, pilotage de la performance',
  },
  {
    id: 'startup',
    emoji: '🚀',
    label: 'Startup / Founder',
    shortLabel: 'Startup',
    jargon:
      'seed, Series A, pivot, MVP, traction, bootstrapping, founder mode, levée de fonds, go-to-market, croissance explosive, product-market fit, north star metric, runway, early adopters, scale-up, unicorn, pitch deck, market fit, growth hacking, building in public, equity, term sheet, board, hypercroissance',
  },
  {
    id: 'freelance',
    emoji: '🧳',
    label: 'Freelance / Indépendant',
    shortLabel: 'Freelance',
    jargon:
      'client, TJM, portfolio, side project, networking, personal branding, mission, prestataire, facturation, portefeuille de clients, indépendance, freelancing, contrat de prestation, brief client, livrable, retainer, prospection, réputation, specialty, niche, day rate, availability, long-term client, autonomie',
  },
  {
    id: 'general',
    emoji: '🏢',
    label: 'Corporate général',
    shortLabel: 'Corporate',
    jargon:
      'synergie, process, alignment, réunion, transformation digitale, gouvernance, mise en mouvement, feuille de route, best practices, transverse, cascade, ownership, deliverables, lean, valeur ajoutée, parties prenantes, comité de direction, excellence opérationnelle, conduite du changement, roadmap, quick wins, bottom-up, top-down, culture d’entreprise',
  },
  {
    id: 'retail',
    emoji: '🛍️',
    label: 'Retail / Commerce',
    shortLabel: 'Retail',
    jargon:
      'expérience client, flagship, CRM retail, omnicanal, panier moyen, taux de conversion en magasin, merchandising, stock, supply chain, click & collect, parcours client, NPS, fidelisation, point de vente, sell-out, sell-in, category management, assortiment, yield management, drive-to-store, retail media, private label, clientèle VIP, saisonnalité, cross-canal',
  },
  {
    id: 'media',
    emoji: '🎬',
    label: 'Médias / Créatif',
    shortLabel: 'Médias',
    jargon:
      'audience, brief créa, brand content, storytelling, ligne éditoriale, engagement, reach, viralité, production, post-prod, pitch créatif, moodboard, direction artistique, format court, native advertising, media planning, GRP, share of voice, créa, copywriting, plateformes, community, influence, calendrier éditorial, time-to-publish',
  },
  {
    id: 'consulting-it',
    emoji: '🗄️',
    label: 'Consulting IT / SI',
    shortLabel: 'Consulting IT',
    jargon:
      'intégration SI, legacy, delivery, cadrage, recette, mise en production, change management, architecture SI, ERP, CRM, middleware, TMA, run, build, migration, urbanisation du SI, roadmap technique, PMO, gouvernance SI, ticket, SLA, time & materials',
  },
  {
    id: 'data-ai',
    emoji: '🤖',
    label: 'Data / IA',
    shortLabel: 'Data / IA',
    jargon:
      'data-driven, MLOps, gouvernance des données, modèle prédictif, feature engineering, pipeline data, data lake, data warehouse, LLM, fine-tuning, prompt engineering, hallucination, RAG, embedding, dataset, biais algorithmique, IA générative, use case IA, time-to-insight, dashboard, KPI data, data quality, dataops, shadow AI, ROI de l’IA',
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

/**
 * Tire aléatoirement quelques termes du jargon d'un secteur.
 * @param {string} jargon
 * @param {number} [count=4]
 * @returns {string[]}
 */
export function pickRandomJargon(jargon, count = 4) {
  const terms = jargon
    .split(',')
    .map((term) => term.trim())
    .filter(Boolean);

  const shuffled = [...terms].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
