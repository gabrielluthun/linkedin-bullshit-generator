import './style.css';
import { AppState } from './models/AppState.js';
import { GeminiService } from './services/GeminiService.js';
import { AppView } from './views/AppView.js';
import { AppController } from './controllers/AppController.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('Élément #app introuvable.');
}

const geminiService = new GeminiService();
const state = new AppState();
const view = new AppView(root, { hasApiKey: geminiService.hasApiKey() });
const controller = new AppController(state, view, geminiService);

controller.init();
