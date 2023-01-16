import { config } from '@vue/test-utils';
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock';

const router = createRouterMock();

config.plugins.VueWrapper.install(VueRouterMock);

beforeEach(() => {
  injectRouterMock(router);
  config.global.plugins = [router];
});
