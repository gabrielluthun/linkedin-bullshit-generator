import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Base path requis pour GitHub Pages (site de projet) :
// https://<user>.github.io/linkedin-post-reformulator/
export default defineConfig({
  base: '/linkedin-post-reformulator/',
  plugins: [tailwindcss()],
});
