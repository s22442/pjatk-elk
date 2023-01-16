import App from './App.vue';

import devalue from '@nuxt/devalue';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { ViteSSG } from 'vite-ssg';

import type { InstallModule } from '~/types/modules';

import '@unocss/reset/tailwind.css';
import './styles/main.scss';
import 'uno.css';

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    const modules = await Promise.all(
      Object.values(
        import.meta.glob<{ install: InstallModule }>('./modules/*.ts')
      ).map((importModule) => importModule())
    );

    await Promise.all([modules.map((module) => module.install(ctx))]);
  },
  { transformState: (state) => (import.meta.env.SSR ? devalue(state) : state) }
);
