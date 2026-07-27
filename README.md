# LinkedIn Bullshit Detox 🧼

SPA **Vite + Vanilla JS + Tailwind CSS** qui génère des posts LinkedIn satiriques via l’API Gemini (`gemini-3.6-flash`).

Choisissez un **secteur**, 1 à 5 **mots-clés**, un **ton**, puis générez un post prêt à copier.

## Fonctionnalités

- **12 secteurs** avec jargon métier 
- **20 mots-clés** (1 à 5 sélectionnables) — une partie affichée par défaut, le reste sous « Voir plus »
- **12 tons** satiriques
- Copie du résultat dans le presse-papier
- Cooldown de 3 s entre deux générations

## Stack

| Outil | Version |
| --- | --- |
| Vite | ^7 |
| Tailwind CSS | ^4 (`@tailwindcss/vite`) |
| JavaScript | Vanilla (ES modules) |
| API | Google Gemini (`gemini-3.6-flash`) |

## Architecture (MVC + Service)

```
src/
  config/
    constants.js   # Modèle Gemini, endpoint, prompt système, cooldown
    keywords.js    # Mots-clés + min/max
    sectors.js     # Secteurs + jargon
    tones.js       # Tons satiriques
  models/
    AppState.js    # État réactif (subscribe / update)
  views/
    AppView.js     # DOM / UI
  controllers/
    AppController.js  # Orchestration
  services/
    GeminiService.js  # Appel API Gemini
  main.js          # Point d’entrée
  style.css        # Tailwind + styles custom
```

## Prérequis

- Node.js 20+
- Une clé API Gemini ([Google AI Studio](https://aistudio.google.com/apikey))

## Installation

```bash
npm install
cp .env.example .env
```

Renseignez votre clé dans un `.env` :

```env
VITE_GEMINI_API_KEY=votre_cle_api_gemini_ici
```

## Lancement

```bash
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

## Utilisation

1. Sélectionnez un **secteur**.
2. Choisissez **1 à 5 mots-clés**.
3. Choisissez un **ton**.
4. Cliquez sur **Générer**.
5. Copiez le post généré si souhaité.

## Scripts npm

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualise le build |

