import type { App } from 'vue';
import { createPinia } from 'pinia';
import appStore from './app';
import redisCache from './redis';

const store = createPinia();

export { store };

export function setupStore(app: App<Element>) {
  app.use(store);
}

// 初始化appStore
export function useAppStore() {
  return appStore(store);
}

export function useRedisCacheStore() {
  return redisCache(store)
}
