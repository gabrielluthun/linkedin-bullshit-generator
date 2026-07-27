import { KEYWORDS, MAX_KEYWORDS, MIN_KEYWORDS } from '../config/keywords.js';
import { SECTORS } from '../config/sectors.js';
import { TONES } from '../config/tones.js';
import { countCollapsed, renderChipGroup } from './chips.js';

/**
 * HTML initial de l'application. Ne dépend d'aucun état : les états dynamiques
 * sont appliqués ensuite par `AppView.render()`.
 * @param {{ hasApiKey: boolean }} options
 * @returns {string}
 */
export function renderAppTemplate({ hasApiKey }) {
  const sectorsHtml = renderChipGroup(SECTORS, 'data-sector-id', {
    text: (sector) => sector.shortLabel,
    title: (sector) => sector.label,
  });

  const keywordsHtml = renderChipGroup(KEYWORDS, 'data-keyword-id', {
    text: (keyword) => keyword.label,
    collapsible: true,
  });

  const tonesHtml = renderChipGroup(TONES, 'data-tone-id', {
    text: (tone) => tone.shortLabel,
    title: (tone) => tone.label,
    collapsible: true,
  });

  const collapsedKeywords = countCollapsed(KEYWORDS);
  const collapsedTones = countCollapsed(TONES);

  return `
    <div class="relative mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header class="mb-8 text-center sm:mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
          LinkedIn Bullshit Generator
        </h1>
        <p class="mx-auto mt-3 max-w-xl text-base text-zinc-400 sm:text-lg">
          Trois clics, un post 100% bullshit. <br /><small>(ne faites pas ça à votre réseau)</small>
        </p>
      </header>

      ${hasApiKey ? '' : renderApiAlert()}

      <main class="card space-y-6 p-5 sm:p-7">
        <section>
          <p class="mb-3 text-sm font-medium text-zinc-300">Dans quelle case tu bosses ?</p>
          <div data-el="sectors" class="flex flex-wrap gap-2" role="group" aria-label="Sélecteur de secteur">
            ${sectorsHtml}
          </div>
        </section>

        <section>
          <div class="mb-3 flex items-end justify-between gap-3">
            <p class="text-sm font-medium text-zinc-300">Choisis tes buzzwords</p>
            <p data-el="keyword-hint" class="text-xs text-zinc-500">0 / ${MAX_KEYWORDS} choisi (min. ${MIN_KEYWORDS})</p>
          </div>
          <div data-el="keywords" class="flex flex-wrap gap-2" role="group" aria-label="Sélecteur de mots-clés">
            ${keywordsHtml}
          </div>
          ${
            collapsedKeywords > 0
              ? `<button type="button" data-el="keywords-toggle" class="chip-toggle mt-2" aria-expanded="false">+ ${collapsedKeywords} autres mots-clés</button>`
              : ''
          }
        </section>

        <section>
          <p class="mb-3 text-sm font-medium text-zinc-300">Ton du post</p>
          <div data-el="tones" class="flex flex-wrap gap-2" role="group" aria-label="Sélecteur de ton">
            ${tonesHtml}
          </div>
          ${
            collapsedTones > 0
              ? `<button type="button" data-el="tones-toggle" class="chip-toggle mt-2" aria-expanded="false">+ ${collapsedTones} autres tons</button>`
              : ''
          }
        </section>

        <section class="space-y-3">
          <button type="button" data-el="submit" class="btn-primary" disabled>
            <span data-el="submit-label">Générer le post</span>
          </button>
          <button
            type="button"
            data-el="randomize"
            class="btn-secondary w-full"
            title="Tire un secteur, des mots-clés et un ton au hasard, puis génère"
          >
            <span aria-hidden="true">🎲</span>
            <span>Surprends-moi</span>
          </button>
        </section>

        <div
          data-el="error"
          class="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
          role="alert"
          hidden
        ></div>
      </main>

      <section data-el="result-card" class="card mt-6 p-5 sm:p-7" hidden>
        <div class="mb-3 flex items-center justify-between gap-3">
          <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Post généré
          </h2>
          <button type="button" data-el="copy" class="btn-secondary">
            <span aria-hidden="true">📋</span>
            <span data-el="copy-label">Copier dans le presse-papier</span>
          </button>
        </div>
        <div
          data-el="result"
          class="whitespace-pre-wrap rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-4 text-[15px] leading-relaxed text-zinc-100"
        ></div>
      </section>

      <footer class="mt-10 text-center text-xs text-zinc-600">
        Aucun networker n’a été blessé pendant la génération de posts
        <br />
        (sauf peut-être l'égo de ton feed LinkedIn)
      </footer>
    </div>
  `;
}

/**
 * @returns {string}
 */
function renderApiAlert() {
  return `
    <div
      data-el="api-alert"
      class="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200"
      role="alert"
    >
      <strong class="font-semibold">Clé API manquante.</strong>
      Définissez <code class="rounded bg-zinc-950/50 px-1.5 py-0.5 text-amber-100">VITE_GEMINI_API_KEY</code>
      dans un fichier <code class="rounded bg-zinc-950/50 px-1.5 py-0.5 text-amber-100">.env</code>
      (voir <code class="rounded bg-zinc-950/50 px-1.5 py-0.5 text-amber-100">.env.example</code>),
      puis relancez le serveur de développement.
    </div>
  `;
}
