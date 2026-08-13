import { defineConfig } from 'astro/config';

// GitHub Pages project site. When a custom domain is attached, drop `base`.
export default defineConfig({
  site: 'https://xufenglei2020.github.io',
  base: '/zaichang',
  trailingSlash: 'never',
  markdown: {
    gfm: true,
    smartypants: true,
    remarkRehype: {
      footnoteLabel: '注释',
      footnoteBackLabel: '返回正文',
    },
  },
});
