import { MAX_KEYWORDS, MIN_KEYWORDS } from '../config/keywords.js';
import { renderAppTemplate } from './template.js';

/**
 * Vue — rendu DOM et mises à jour UI (MVC — View).
 */
export class AppView {
  /**
   * @param {HTMLElement} root
   * @param {{ hasApiKey: boolean, cooldownMs: number }} options
   */
  constructor(root, { hasApiKey, cooldownMs }) {
    this.root = root;
    this.hasApiKey = hasApiKey;
    this.cooldownMs = cooldownMs;
    this.elements = {};
  }

  mount() {
    this.root.innerHTML = renderAppTemplate({ hasApiKey: this.hasApiKey });
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
      randomizeBtn: this.root.querySelector('[data-el="randomize"]'),
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
    this.#renderSelectors(state);
    this.#renderActions(state);
    this.#renderResult(state);
  }

  /**
   * @param {{
   *   onKeywordToggle: (keywordId: string) => void,
   *   onSectorSelect: (sectorId: string) => void,
   *   onToneSelect: (toneId: string) => void,
   *   onSubmit: () => void,
   *   onRandomize: () => void,
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

    this.elements.randomizeBtn?.addEventListener('click', () => {
      handlers.onRandomize();
    });

    this.elements.copyBtn?.addEventListener('click', () => {
      handlers.onCopy();
    });
  }

  /**
   * Secteur, mots-clés, ton : état actif des puces et compteur de sélection.
   * @param {import('../models/AppState.js').AppState} state
   */
  #renderSelectors(state) {
    const { elements } = this;
    const selectedSet = new Set(state.selectedKeywordIds);
    const selectedCount = state.selectedKeywordIds.length;

    this.#syncChips(
      elements.sectorGroup,
      'data-sector-id',
      'chip-btn--active-sector',
      (id) => id === state.selectedSectorId,
    );

    this.#syncChips(elements.keywordGroup, 'data-keyword-id', 'chip-btn--active', (id) =>
      selectedSet.has(id),
    );

    this.#syncChips(
      elements.toneGroup,
      'data-tone-id',
      'chip-btn--active-tone',
      (id) => id === state.selectedToneId,
    );

    if (elements.keywordHint) {
      elements.keywordHint.textContent = `${selectedCount} / ${MAX_KEYWORDS} choisi${selectedCount > 1 ? 's' : ''} (min. ${MIN_KEYWORDS})`;
    }
  }

  /**
   * Boutons d'action et message d'erreur.
   * @param {import('../models/AppState.js').AppState} state
   */
  #renderActions(state) {
    const { elements } = this;
    const busy = state.isLoading || state.isOnCooldown || !this.hasApiKey;

    if (elements.submitBtn) {
      elements.submitBtn.disabled = busy || state.selectedKeywordIds.length < MIN_KEYWORDS;
    }

    if (elements.randomizeBtn) {
      elements.randomizeBtn.disabled = busy;
    }

    if (elements.submitLabel) {
      if (state.isLoading) {
        elements.submitLabel.innerHTML = `
          <span class="spinner" aria-hidden="true"></span>
          <span>Génération en cours...</span>
        `;
      } else if (state.isOnCooldown) {
        const seconds = Math.ceil(this.cooldownMs / 1000);
        elements.submitLabel.textContent = `Patientez ${seconds} seconde${seconds > 1 ? 's' : ''}...`;
      } else {
        elements.submitLabel.textContent = 'Générer le post';
      }
    }

    if (elements.errorBox) {
      elements.errorBox.hidden = !state.errorMessage;
      elements.errorBox.textContent = state.errorMessage ?? '';
    }
  }

  /**
   * Carte de résultat et bouton de copie.
   * @param {import('../models/AppState.js').AppState} state
   */
  #renderResult(state) {
    const { elements } = this;

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
      elements.copyLabel.textContent = state.copySuccess
        ? 'Copié !'
        : 'Copier dans le presse-papier';
    }
  }

  /**
   * Applique l'état actif sur toutes les puces d'un groupe.
   * @param {HTMLElement|null} group
   * @param {string} attr
   * @param {string} activeClass
   * @param {(id: string|null) => boolean} isActive
   */
  #syncChips(group, attr, activeClass, isActive) {
    group?.querySelectorAll(`[${attr}]`).forEach((btn) => {
      const active = isActive(btn.getAttribute(attr));
      btn.classList.toggle(activeClass, active);
      btn.setAttribute('aria-pressed', String(active));
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
}
