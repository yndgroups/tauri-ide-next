import { Pinia, defineStore } from 'pinia';
import { App } from '@/types';

export const appStore = defineStore({
  id: 'app',
  state: () => ({
    // 打开的文件列表
    appList: new Array<App>(),
    // 当前激活文件
    app: {} as App,
    // 当前激活索引
    appActiveIndex: 0,
    // 打开的路径地址
    openPath: '',
    // 插件数据
    microApps: new Map<string, any>(),
  }),
  getters: {
    getApp(): Array<App> {
      return this.appList;
    },
  },
  actions: {
    // 添加插件
    addMicroApps(app: App) {
      if (app.uniqueKey && !this.microApps.get(app.uniqueKey)) {
        this.microApps.set(app.uniqueKey, app);
        this.addApp({
          name: app.name,
          uniqueKey: app.uniqueKey,
          icon: app.icon,
          color: app.color,
          debug: app.debug,
        });
      }
    },
    // 添加应用
    addApp(app: App) {
      if (this.appList && this.appList.length > 0) {
        let bool = true;
        this.appList.forEach((item) => {
          if (item.uniqueKey == app.uniqueKey) {
            bool = false;
          }
        });
        if (bool) {
          this.appList.push(app);
          let len = this.appList.length - 1;
          if (app.debug) {
            this.setActiveIndex(len);
            this.app = app;
          }
        }
      } else {
        this.appList.push(app);
        if (app.debug) {
          this.setActiveIndex(0);
          this.app = app;
        }
      }
    },
    removeApp(index: number) {
      let tempIndex = 0;
      if (index > 0) {
        tempIndex = index - 1;
      }
      this.setActiveIndex(tempIndex);
      this.app = this.appList[tempIndex];
      this.appList.splice(index, 1);
      if (this.appList.length == 0) {
        this.app = {} as App;
      }
    },
    setActiveIndex(appActiveIndex: number) {
      this.appActiveIndex = appActiveIndex;
      this.app = this.appList[appActiveIndex];
    },
  },
});

export default (store: Pinia) => {
  return appStore(store);
};
