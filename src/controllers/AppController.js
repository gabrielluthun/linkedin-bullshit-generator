import {
  getKeywordsByIds,
  MAX_KEYWORDS,
  MIN_KEYWORDS,
  pickRandomKeywordIds,
} from '../config/keywords.js';
import { getSectorById, pickRandomSectorId } from '../config/sectors.js';
import { getToneById, pickRandomToneId } from '../config/tones.js';
import { GeminiApiError } from '../services/GeminiService.js';

/** Délai imposé entre deux générations. Exporté pour que la vue libelle l'attente. */
export const COOLDOWN_MS = 3000;

/**
 * Contrôleur — orchestre Model, View et Services (MVC — Controller).
 */
export class AppController {
  /**
   * @param {import('../models/AppState.js').AppState} state
   * @param {import('../views/AppView.js').AppView} view
   * @param {import('../services/GeminiService.js').GeminiService} geminiService
   */
  constructor(state, view, geminiService) {
    this.state = state;
    this.view = view;
    this.geminiService = geminiService;
    /** @type {ReturnType<typeof setTimeout>|null} */
    this._cooldownTimer = null;
    /** @type {ReturnType<typeof setTimeout>|null} */
    this._copyTimer = null;
  }

  init() {
    this.view.mount();
    this.view.bindEvents({
      onKeywordToggle: (keywordId) => this.handleKeywordToggle(keywordId),
      onSectorSelect: (sectorId) => this.handleSectorSelect(sectorId),
      onToneSelect: (toneId) => this.handleToneSelect(toneId),
      onSubmit: () => this.handleSubmit(),
      onRandomize: () => this.handleRandomize(),
      onCopy: () => this.handleCopy(),
    });
    this.state.subscribe((state) => this.view.render(state));
    this.view.render(this.state);
  }

  /**
   * @param {string} keywordId
   */
  handleKeywordToggle(keywordId) {
    const current = this.state.selectedKeywordIds;
    const isSelected = current.includes(keywordId);

    if (isSelected) {
      this.state.update({
        selectedKeywordIds: current.filter((id) => id !== keywordId),
        errorMessage: null,
      });
      return;
    }

    if (current.length >= MAX_KEYWORDS) {
      this.state.update({
        errorMessage: `Maximum ${MAX_KEYWORDS} mots-clés. Désélectionnez-en un pour en choisir un autre.`,
      });
      return;
    }

    this.state.update({
      selectedKeywordIds: [...current, keywordId],
      errorMessage: null,
    });
  }

  /**
   * @param {string} sectorId
   */
  handleSectorSelect(sectorId) {
    this.state.update({
      selectedSectorId: sectorId,
      errorMessage: null,
    });
  }

  /**
   * @param {string} toneId
   */
  handleToneSelect(toneId) {
    this.state.update({
      selectedToneId: toneId,
      errorMessage: null,
    });
  }

  /**
   * Tire une combinaison complète au hasard puis lance la génération.
   */
  handleRandomize() {
    if (this.state.isLoading || this.state.isOnCooldown) {
      return Promise.resolve();
    }

    this.state.update({
      selectedSectorId: pickRandomSectorId(),
      selectedKeywordIds: pickRandomKeywordIds(),
      selectedToneId: pickRandomToneId(),
      errorMessage: null,
    });

    return this.handleSubmit();
  }

  async handleSubmit() {
    const { selectedKeywordIds, isLoading, isOnCooldown } = this.state;

    if (isLoading || isOnCooldown || selectedKeywordIds.length < MIN_KEYWORDS) {
      return;
    }

    if (!this.geminiService.hasApiKey()) {
      this.state.update({
        errorMessage:
          'Clé API Gemini manquante. Définissez VITE_GEMINI_API_KEY dans votre fichier .env.',
      });
      return;
    }

    const tone = getToneById(this.state.selectedToneId);
    const sector = getSectorById(this.state.selectedSectorId);
    const keywords = getKeywordsByIds(selectedKeywordIds).map(
      (k) => `${k.buzzword} (${k.label})`,
    );

    this.state.update({
      isLoading: true,
      errorMessage: null,
      copySuccess: false,
    });

    try {
      const resultText = await this.geminiService.generate(keywords, tone.promptTone, sector);
      this.state.update({
        resultText,
        isLoading: false,
      });
      this.#startCooldown();
    } catch (error) {
      const message =
        error instanceof GeminiApiError
          ? error.message
          : 'Une erreur inattendue est survenue. Réessayez.';

      this.state.update({
        isLoading: false,
        errorMessage: message,
      });
    }
  }

  async handleCopy() {
    const { resultText } = this.state;
    if (!resultText) return;

    try {
      await navigator.clipboard.writeText(resultText);
      this.state.update({ copySuccess: true });

      if (this._copyTimer) clearTimeout(this._copyTimer);
      this._copyTimer = setTimeout(() => {
        this.state.update({ copySuccess: false });
      }, 2000);
    } catch {
      this.state.update({
        errorMessage: 'Impossible de copier dans le presse-papier.',
      });
    }
  }

  #startCooldown() {
    if (this._cooldownTimer) clearTimeout(this._cooldownTimer);

    this.state.update({ isOnCooldown: true });
    this._cooldownTimer = setTimeout(() => {
      this.state.update({ isOnCooldown: false });
    }, COOLDOWN_MS);
  }
}
