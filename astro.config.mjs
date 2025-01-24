// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://atxona.com.ar/',
  build: {
    // Ejemplo: Genera `page.html` en lugar de `page/index.html` durante la compilación.
    format: 'file'
  },
  i18n: {
    defaultLocale: 'es',
    locales: [ 'es', 'en', 'pt' ],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      en: 'es',
      pt: 'es'
    }
  },
  experimental: {
    svg: true,
  },
  integrations: [react(), tailwind()]
});