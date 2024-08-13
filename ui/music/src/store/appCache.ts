import { Pinia, defineStore } from 'pinia';
import { App } from '@/types';

// 缓存应用信息
export const appCacheStore = defineStore({
  id: 'cache',
  state: () => ({
    // 菜单
    mneuList: new Map() as Map<string, Array<any>>,
    // 数据
    tabsData: new Map() as Map<string, Array<any>>
  }),
  getters: {
    
  },
  actions: {
    // 添加tab数据
    addTab(uniqueKey:string, tabItem: Array<any>) {
      if (tabItem && Array.isArray(tabItem)) {
        this.tabsData.set(uniqueKey, tabItem)
      }
    },
    // 获取tab数据
    getTab(uniqueKey: string): Array<any> {
      let tabs = this.tabsData.get(uniqueKey) || []
      return tabs as any;
    },
    /**
     * 缓存菜单数据
     * 
     * @param uniqueKey 唯一标识
     * @param menuItem 要添加的菜单数据
     */
    addMenu(uniqueKey:string, menuItem: Array<any>) {
      if (menuItem && Array.isArray(menuItem)) {
        this.mneuList.set(uniqueKey, menuItem)
      }
    },
    /**
     * 获取菜单数据
     * 
     * @param uniqueKey 唯一标识
     * @returns 返回菜单数据
     */
    getMenu(uniqueKey: string): Array<any> {
      let menus = this.mneuList.get(uniqueKey) || []
      return menus as any;
    },
  },
});

export default (store: Pinia) => {
  return appCacheStore(store);
};
