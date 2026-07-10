import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://towerfanreviews.uk',
  trailingSlash: 'always',
  // /thank-you/ is noindex, so it must not be advertised in the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/thank-you/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
