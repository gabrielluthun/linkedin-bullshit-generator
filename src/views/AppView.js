import { KEYWORDS, MAX_KEYWORDS, MIN_KEYWORDS } from '../config/keywords.js';
import { SECTORS } from '../config/sectors.js';
import { TONES } from '../config/tones.js';

/**
 * Vue — rendu DOM et mises à jour UI (MVC — View).
 */
export class AppView {
  /**
   * @param {HTMLElement} root
   * @param {{ hasApiKey: boolean }} options
   */
  constructor(root, { hasApiKey }) {
    this.root = root;
    this.hasApiKey = hasApiKey;
    this.elements = {};
  }

  mount() {
    this.root.innerHTML = this.#template();
    this.elements = {
      apiAlert: this.root.querySelector('[data-el="api-alert"]'),
      sectorGroup: this.root.querySelector('[data-el="sectors"]'),
      keywordGroup: this.root.querySelector('[data-el="keywords"]'),
      keywordHint: this.root.querySelector('[data-el="keyword-hint"]'),
      keywordToggle: this.root.querySelector('[data-el="keywords-toggle"]'),
      toneGroup: this.root.querySelector('[data-el="tones"]'),
      toneToggle: this.root.querySelector('[data-el="tones-toggle"]'),
      submitBtn: this.root.querySelector('[data-el="submit"]'),
      submitLabel: this.root.querySelector('[data-el="submit-label"]'),
      errorBox: this.root.querySelector('[data-el="error"]'),
      resultCard: this.root.querySelector('[data-el="result-card"]'),
      resultText: this.root.querySelector('[data-el="result"]'),
      copyBtn: this.root.querySelector('[data-el="copy"]'),
      copyLabel: this.root.querySelector('[data-el="copy-label"]'),
    };
    this.#bindToggles();
  }

  /**
   * @param {import('../models/AppState.js').AppState} state
   */
  render(state) {
    const { elements } = this;
    const selectedCount = state.selectedKeywordIds.length;
    const selectedSet = new Set(state.selectedKeywordIds);

    elements.sectorGroup?.querySelectorAll('[data-sector-id]').forEach((btn) => {
      const isActive = btn.getAttribute('data-sector-id') === state.selectedSectorId;
      btn.classList.toggle('chip-btn--active-sector', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    elements.keywordGroup?.querySelectorAll('[data-keyword-id]').forEach((btn) => {
      const isActive = selectedSet.has(btn.getAttribute('data-keyword-id'));
      btn.classList.toggle('chip-btn--active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    if (elements.keywordHint) {
      elements.keywordHint.textContent = `${selectedCount} / ${MAX_KEYWORDS} choisi${selectedCount > 1 ? 's' : ''} (min. ${MIN_KEYWORDS})`;
    }

    elements.toneGroup?.querySelectorAll('[data-tone-id]').forEach((btn) => {
      const isActive = btn.getAttribute('data-tone-id') === state.selectedToneId;
      btn.classList.toggle('chip-btn--active-tone', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    const disabled = state.isLoading || state.isOnCooldown || !this.hasApiKey;
    if (elements.submitBtn) {
      elements.submitBtn.disabled = disabled || selectedCount < MIN_KEYWORDS;
    }

    if (elements.submitLabel) {
      if (state.isLoading) {
        elements.submitLabel.innerHTML = `
          <span class="spinner" aria-hidden="true"></span>
          <span>Génération en cours...</span>
        `;
      } else if (state.isOnCooldown) {
        elements.submitLabel.textContent = 'Patientez 3 secondes...';
      } else {
        elements.submitLabel.textContent = 'Générer le post';
      }
    }

    if (elements.errorBox) {
      if (state.errorMessage) {
        elements.errorBox.hidden = false;
        elements.errorBox.textContent = state.errorMessage;
      } else {
        elements.errorBox.hidden = true;
        elements.errorBox.textContent = '';
      }
    }

    if (elements.resultCard) {
      elements.resultCard.hidden = !state.resultText;
    }

    if (elements.resultText) {
      elements.resultText.textContent = state.resultText;
    }

    if (elements.copyBtn) {
      elements.copyBtn.disabled = !state.resultText;
    }

    if (elements.copyLabel) {
      elements.copyLabel.textContent = state.copySuccess ? 'Copié !' : 'Copier dans le presse-papier';
    }
  }

  /**
   * @param {{
   *   onKeywordToggle: (keywordId: string) => void,
   *   onSectorSelect: (sectorId: string) => void,
   *   onToneSelect: (toneId: string) => void,
   *   onSubmit: () => void,
   *   onCopy: () => void,
   * }} handlers
   */
  bindEvents(handlers) {
    this.elements.sectorGroup?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-sector-id]');
      if (!btn) return;
      handlers.onSectorSelect(btn.getAttribute('data-sector-id'));
    });

    this.elements.keywordGroup?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-keyword-id]');
      if (!btn) return;
      handlers.onKeywordToggle(btn.getAttribute('data-keyword-id'));
    });

    this.elements.toneGroup?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-tone-id]');
      if (!btn) return;
      handlers.onToneSelect(btn.getAttribute('data-tone-id'));
    });

    this.elements.submitBtn?.addEventListener('click', () => {
      handlers.onSubmit();
    });

    this.elements.copyBtn?.addEventListener('click', () => {
      handlers.onCopy();
    });
  }

  /**
   * Bascule "Voir plus" purement présentationnelle (n'affecte pas le Model).
   */
  #bindToggles() {
    this.elements.keywordToggle?.addEventListener('click', () => {
      this.#toggleHidden(this.elements.keywordGroup, this.elements.keywordToggle, 'mots-clés');
    });

    this.elements.toneToggle?.addEventListener('click', () => {
      this.#toggleHidden(this.elements.toneGroup, this.elements.toneToggle, 'tons');
    });
  }

  /**
   * @param {HTMLElement|null} group
   * @param {HTMLElement|null} toggleBtn
   * @param {string} noun
   */
  #toggleHidden(group, toggleBtn, noun) {
    if (!group || !toggleBtn) return;
    const extraItems = group.querySelectorAll('.chip-extra');
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    extraItems.forEach((item) => {
      item.classList.toggle('chip-hidden', isExpanded);
    });

    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    toggleBtn.textContent = isExpanded
      ? `+ ${extraItems.length} autres ${noun}`
      : `− Afficher moins de ${noun}`;
  }

  #template() {
    const sectorsHtml = SECTORS.map(
      (sector) => `
        <button
          type="button"
          class="chip-btn"
          data-sector-id="${sector.id}"
          aria-pressed="false"
          title="${sector.label}"
        >
          <span aria-hidden="true">${sector.emoji}</span>
          <span>${sector.shortLabel}</span>
        </button>
      `,
    ).join('');

    const featuredKeywords = KEYWORDS.filter((k) => k.featured);
    const extraKeywords = KEYWORDS.filter((k) => !k.featured);

    const renderKeyword = (keyword, hidden) => `
      <button
        type="button"
        class="chip-btn${hidden ? ' chip-extra chip-hidden' : ''}"
        data-keyword-id="${keyword.id}"
        aria-pressed="false"
      >
        <span aria-hidden="true">${keyword.emoji}</span>
        <span>${keyword.label}</span>
      </button>
    `;

    const keywordsHtml =
      featuredKeywords.map((k) => renderKeyword(k, false)).join('') +
      extraKeywords.map((k) => renderKeyword(k, true)).join('');

    const featuredTones = TONES.filter((t) => t.featured);
    const extraTones = TONES.filter((t) => !t.featured);

    const renderTone = (tone, hidden) => `
      <button
        type="button"
        class="chip-btn${hidden ? ' chip-extra chip-hidden' : ''}"
        data-tone-id="${tone.id}"
        aria-pressed="false"
        title="${tone.label}"
      >
        <span aria-hidden="true">${tone.emoji}</span>
        <span>${tone.shortLabel}</span>
      </button>
    `;

    const tonesHtml =
      featuredTones.map((t) => renderTone(t, false)).join('') +
      extraTones.map((t) => renderTone(t, true)).join('');

    const apiAlert = this.hasApiKey
      ? ''
      : `
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

        ${apiAlert}

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
              extraKeywords.length > 0
                ? `<button type="button" data-el="keywords-toggle" class="chip-toggle mt-2" aria-expanded="false">+ ${extraKeywords.length} autres mots-clés</button>`
                : ''
            }
          </section>

          <section>
            <p class="mb-3 text-sm font-medium text-zinc-300">Ton du post</p>
            <div data-el="tones" class="flex flex-wrap gap-2" role="group" aria-label="Sélecteur de ton">
              ${tonesHtml}
            </div>
            ${
              extraTones.length > 0
                ? `<button type="button" data-el="tones-toggle" class="chip-toggle mt-2" aria-expanded="false">+ ${extraTones.length} autres tons</button>`
                : ''
            }
          </section>

          <section>
            <button type="button" data-el="submit" class="btn-primary" disabled>
              <span data-el="submit-label">Générer le post</span>
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
}
