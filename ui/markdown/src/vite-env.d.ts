/// <reference types="vite/client" />

declare module 'sql-formatter';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface Window {
    Bridge: Bridge;
    Palm: PalmEditor;
    __zone_symbol__setTimeout: any;
  }
}

export {};
