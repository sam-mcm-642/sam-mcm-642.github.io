// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hosted as a user site: sam-mcm-642.github.io
// -> serves at the root, so `base` is '/'. If the GitHub username differs,
//    update `site` (and rename the repo to <username>.github.io).
export default defineConfig({
  site: 'https://sam-mcm-642.github.io',
  base: '/',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    // Cast isolates a benign types-version skew between @tailwindcss/vite and
    // the Vite build Astro bundles; no runtime impact.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
