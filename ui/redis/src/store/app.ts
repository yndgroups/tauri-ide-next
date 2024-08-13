import { Pinia, defineStore } from 'pinia';
// app缓存信息
export const appCacheStore = defineStore({
  id: 'appCache',
  state: () => ({
    // 语言 lang
    lang: 'zh_CN',
    theme: 'light'
  }),
  getters: {
    
  },
  actions: {
    setLang(lang: string) {
      this.lang = lang;
    },
    getLang(): string {
      return this.lang;
    },
    setTheme(theme: string) {
      this.theme = theme;
    },
    getTheme(): string {
      return this.theme;
    },
  },
});

export default (store: Pinia) => {
  return appCacheStore(store);
};
