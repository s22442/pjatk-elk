import Eslint from '@nabla/vite-plugin-eslint';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import Pages, { type ImportModeResolver } from 'vite-plugin-pages';
import { VitePWA } from 'vite-plugin-pwa';
import Layouts from 'vite-plugin-vue-layouts';
import generateSitemap from 'vite-ssg-sitemap';

import * as globalHelpers from './src/helpers/_global';

import type { ComponentResolver } from 'unplugin-vue-components/types';

const GlobalHelpersImport = (options: { importPath: string }) => ({
  [options.importPath]: Object.keys(globalHelpers),
});

const BaseComponentsResolver = (options: {
  importDir: string;
  prefix?: string;
}): ComponentResolver => {
  options.importDir = options.importDir.replace(/\/$/, '');

  const pascalCasePrefix = (options.prefix || '')
    .replace(/\w+/g, (match) => match[0].toUpperCase() + match.slice(1))
    .replace(/-|\s/g, '');

  return (name: string) =>
    name.startsWith(pascalCasePrefix)
      ? `${options.importDir}/${name.slice(pascalCasePrefix.length)}.vue`
      : null;
};

const PagesImportModeResolver =
  (): ImportModeResolver =>
  (filepath, { dirs }) => {
    for (const { baseRoute, dir } of dirs) {
      if (baseRoute === '' && filepath.startsWith(`/${dir}/index`)) {
        return 'sync';
      }
    }

    return 'async';
  };

const cwd = process.cwd();

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '~/': `${cwd}/src/`,
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },

  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        GlobalHelpersImport({ importPath: '~/helpers/_global' }),
      ],
      dts: 'src/__vite-auto-imports.d.ts',
    }),

    Components({
      dirs: [],
      resolvers: [
        BaseComponentsResolver({
          importDir: '~/components/_base',
          prefix: 'base',
        }),
      ],

      dts: mode === 'test' ? false : 'src/__vite-components.d.ts',
    }),

    Pages({
      importMode: mode === 'production' ? PagesImportModeResolver() : 'sync',
    }),

    Layouts({ defaultLayout: '_default' }),

    Unocss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'ELK',
        short_name: 'ELK',
        theme_color: '#ffffff',
      },
    }),

    Eslint({ eslintOptions: { cache: false } }),

    Inspect(),
  ],

  build: { target: ['esnext'] },

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished: generateSitemap,
  },

  test: {
    clearMocks: true,
    setupFiles: 'tests/setup.ts',
    globals: true,
    include: ['tests/**/*.test.ts'],
    environment: 'jsdom',
    deps: { inline: ['@vue', '@vueuse', 'vue-demi'] },

    coverage: {
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/main.ts', 'src/modules', 'src/types', '**/*.d.ts'],
      all: true,
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
}));
