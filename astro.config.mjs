// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xamxam.ai',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});