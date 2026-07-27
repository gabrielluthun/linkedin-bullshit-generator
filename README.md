# LinkedIn Bullshit Detox 🧼

SPA Vite + Vanilla JS + Tailwind CSS qui génère des posts LinkedIn satiriques via l’API Gemini (`gemini-2.0-flash`), à partir de mots-clés hardcodés et d’un ton choisi.

## Architecture (MVC + Service)

```
src/
  config/          # Tons, constantes, prompt système
  models/          # AppState (état réactif)
  views/           # AppView (DOM / UI)
  controllers/     # AppController (orchestration)
  services/        # GeminiService (appel API)
  main.js          # Point d’entrée
```

## Prérequis

- Node.js 20+
- Une clé API Gemini ([Google AI Studio](https://aistudio.google.com/apikey))

## Installation

```bash
npm install
cp .env.example .env
```

Renseignez votre clé dans `.env` :

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

## Sécurité

La clé est lue via `import.meta.env.VITE_GEMINI_API_KEY` (pas de localStorage, pas d’input UI).  
Attention : les variables préfixées `VITE_` sont exposées côté client au build. Pour un usage public, préférez un proxy backend.
