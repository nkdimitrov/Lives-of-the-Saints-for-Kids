import { defineConfig } from 'astro/config';

// GitHub Pages serves this repo at https://<user>.github.io/<repo>/.
// Override with SITE_URL / BASE_PATH env vars to host elsewhere (e.g. BASE_PATH=/ for a custom domain).
export default defineConfig({
  site: process.env.SITE_URL || 'https://nkdimitrov.github.io',
  base: process.env.BASE_PATH ?? '/Lives-of-the-Saints-for-Kids',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
