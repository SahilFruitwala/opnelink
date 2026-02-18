import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://openlink.sahilfruitwala.com',
  integrations: [react(), sitemap()],
  output: 'server',

  adapter: cloudflare({
    imageService: 'passthrough'
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});