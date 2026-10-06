import { defineConfig } from 'astro/config';
import site from './site.config.mjs';

export default defineConfig({
  site: site.siteUrl,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
