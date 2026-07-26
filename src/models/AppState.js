import { DEFAULT_TONE_ID } from '../config/tones.js';

/**
 * Modèle d'état de l'application (MVC — Model).
 */
export class AppState {
  constructor() {
    /** @type {string[]} */
    this.selectedKeywordIds = [];
    /** @type {string} */
    this.selectedToneId = DEFAULT_TONE_ID;
    /** @type {string} */
    this.resultText = '';
    /** @type {boolean} */
    this.isLoading = false;
    /** @type {boolean} */
    this.isOnCooldown = false;
    /** @type {string|null} */
    this.errorMessage = null;
    /** @type {boolean} */
    this.copySuccess = false;
    /** @type {Set<(state: AppState) => void>} */
    this._listeners = new Set();
  }

  /**
   * @param {(state: AppState) => void} listener
   */
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  notify() {
    for (const listener of this._listeners) {
      listener(this);
    }
  }

  /**
   * @param {Partial<AppState>} patch
   */
  update(patch) {
    Object.assign(this, patch);
    this.notify();
  }
}
