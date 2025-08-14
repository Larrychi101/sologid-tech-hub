// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://larrychi101.github.io/sologid-tech-hub', // production URL
  base: '/sologid-tech-hub/', // repo name for GitHub Pages
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: true, // optional: resets Tailwind base styles
      },
    }),
  ],
  vite: {
    server: {
      host: true,
      port: 3000,
    },
  },
});
