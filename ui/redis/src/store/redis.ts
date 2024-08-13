import { Pinia, defineStore } from 'pinia';
import { LinkInfo, TabItem } from '@/types';
import { getCurrent } from '@tauri-apps/api/webview';

// redis缓存信息
export const appCacheStore = defineStore({
  id: 'redisCache',
  state: () => ({
    // 连接信息
    linkList: new Array<LinkInfo>(),
    // 数据
    tabsList: new Array<TabItem>(),
    // 当前激活的uuid客户端
    currentClineUuid: '',
  }),
  getters: {
    
  },
  actions: {
    // 设置当前连接uuid
    setCurrentClineUuid(uuid: string) {
      this.currentClineUuid = uuid
    },
    // 获取当前连接uuid
    getCurrentClineUuid(): string {
      return this.currentClineUuid
    },
    // 添加tab数据
    addTab(tabItem: TabItem) {
      this.tabsList.push(tabItem)
    },
    // 获取tab数据
    getTabList(): Array<any> {
      let tabsList = this.tabsList || []
      if (tabsList && tabsList.length > 0) {
        return tabsList;
      } else {
        // 读取本地缓存
        return []
      }
    },
    /**
     * @param linkItem 
     * 
     * 添加连接信息
     */
    addLink(linkItem: LinkInfo) {
      if (linkItem) {
        this.linkList.push(linkItem)
      }
    },
    /**
     * 获取连接信息
     * 
     * @returns 返回连接数据
     */
    getLinkList(): Array<LinkInfo> {
      let linkList = this.linkList || []
      if (linkList && linkList.length > 0) {
        return linkList;
      } else {
        // 读取本地缓存
        return []
      }
    },
  },
});

export default (store: Pinia) => {
  return appCacheStore(store);
};
