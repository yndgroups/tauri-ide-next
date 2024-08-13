import { PalmEditor, App } from '@/types';
import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs';
import { useAppStore } from '../store';
// import ProxySandbox from './sandbox';

// 编辑器封装
export default class Palm implements PalmEditor {
  readonly name: string;
  readonly version: string;
  readonly store: any;
  readonly plugins: Map<string, any>;
  readonly extensions: Map<string, any>;
  instance: any;

  // 构造函数
  constructor(name: string = 'palm', version: string = '0.0.1') {
    this.name = name;
    this.version = version;
    this.store = useAppStore();
    this.instance = null;
    this.plugins = new Map<string, any>();
    this.extensions = new Map<string, any>();
  }

  addApp(app: App) {
    this.store.addApp(app);
  }

  // 打印应用信息
  info(target: string) {
    alert(target + '调用了');
  }

  // 获取扩展插件信息
  getExtension(uniqueKey: string) {
    return this.extensions.get(uniqueKey);
  }

  getExtensions() {
    return this.extensions;
  }

  // 获取插件信息
  getPlugin(uniqueKey: string) {
    return this.plugins.get(uniqueKey);
  }

  // 获取所有插件信息
  getPlugins() {
    return this.plugins;
  }

  // 初始化
  initAppToSandbox(app: App) {
    let _this = this;
    console.log(`初始化默认应用：${app.uniqueKey}`);
    let mApp = this.plugins.get(app.uniqueKey);
    if (mApp && typeof mApp.code === 'string') {
      // let proxySandbox = new ProxySandbox(mApp.name);
      mApp.style ? _this.appendInstanceStyle(mApp.style) : null;
      /* ((window) => {
        try {
          proxySandbox.active();
          _this.executeCode(mApp.code)(window);
          // _this.appendInstanceScript(mApp.code);
          console.log(this.instance);
        } catch (e) {
          console.error(e);
        }
      })(proxySandbox.proxy); */
      // console.log(obj, 'obj');
      /* window.sex = '男';
          
          console.log('外部window.sex=>1', window.sex);

          ((window) => {
            proxy2.active();
            console.log('修改前proxy2的sex', window.sex);
            window.sex = '111';
            console.log('修改后proxy2的sex', window.sex);
          })(proxy2.proxy);
          console.log('外部window.sex=>2', window.sex); */
    }
  }

  // 执行代码
  executeCode(code: string) {
    if (typeof code !== 'string') {
      throw new Error('代码飞字符串格式');
    }
    if (code.startsWith('}') || code.endsWith('{')) {
      throw new Error('侦测到异常代码');
    }
    let src = `with (sandbox) { ${code} }`;
    let build = new Function('sandbox', src);
    return (sandbox: any) => build(sandbox);
  }

  // 读取文件夹
  readDir() {}

  // 读取文件
  readTextFile() {}

  // 装载插件代码
  actuatorPlugin(fn: string) {
    return new Function('return ' + fn)();
  }

  // 挂载微应用
  mount(instance: any) {
    console.info('****** 挂载应用 *******');
    this.instance = instance;
  }

  // 卸载微应用
  unmount() {
    console.info('>>>>>> 卸载应用 >>>>>>>');
    // 卸载微应用样式
    let styles = document.querySelectorAll('style');
    styles.forEach((item) => {
      if (item.getAttribute('id') === 'micro-app') {
        item.remove();
      }
    });
    // 卸载微应用实例
    this.instance?.unmount();
  }

  // 插入实例样式
  appendInstanceScript(scriptText: string) {
    if (scriptText) {
      var script = document.createElement('script');
      script.id = 'micro-app';
      script.innerText = scriptText;
      let head = document.querySelector('head');
      if (head) {
        head.appendChild(script);
      } else {
        let head = document.createElement('head');
        document.querySelector('html')?.appendChild(head);
        head.appendChild(script);
      }
    }
  }

  // 插入实例样式
  appendInstanceStyle(styleText: string) {
    if (styleText) {
      var style = document.createElement('style');
      style.id = 'micro-app';
      style.innerText = styleText;
      let head = document.querySelector('head');
      if (head) {
        head.appendChild(style);
      } else {
        let head = document.createElement('head');
        document.querySelector('html')?.appendChild(head);
        head.appendChild(style);
      }
    }
  }

  // 加载本地插件
  loadPlugins() {
    return new Promise((resolve, reject) => {
      try {
        let dir = 'palm/plugins';
        let ps = readDir(dir, {
          baseDir: BaseDirectory.Home,
        });
        ps.then((data: any) => {
          let pl = data.map(
            (item: any) =>
              new Promise(async (rs, rj) => {
                let file = await readTextFile(`${dir}/${item.name}/main.js`, { baseDir: BaseDirectory.Home });
                if (file && typeof file === 'string') {
                  // 读取配置
                  let config = await readTextFile(`${dir}/${item.name}/package.json`, { baseDir: BaseDirectory.Home });
                  // 读取样式
                  let style = await readTextFile(`${dir}/${item.name}/style.css`, { baseDir: BaseDirectory.Home });
                  let cfg = this.actuatorPlugin(config);
                  let plugin = cfg.palm.plugin || {};
                  if (plugin.name && plugin.uniqueKey && plugin.icon && plugin.type) {
                    // console.log(plugin, 'plugin');
                    rs({
                      name: plugin.name || '',
                      icon: plugin.icon || '',
                      uniqueKey: plugin.uniqueKey || ' ',
                      code: file || '',
                      color: plugin.color || '#000',
                      debug: plugin.debug || false,
                      style: style || '',
                      type: plugin.type || '',
                    });
                  }
                } else {
                  rj({});
                }
              }),
          );
          Promise.all(pl).then((res) => {
            res.forEach((item: any) => {
              this.plugins.set(item.uniqueKey, item);
            });
            resolve(res);
          });
        });
      } catch (e) {
        reject(false);
        console.log('插件初始化失败:e', e);
      }
    });
  }

  // 注册插件
  async registerPlugins() {
    this.plugins.forEach((item) => {
      switch (item.type) {
        // 微应用工具，例如git之类
        case 'micro-app':
          this.store.addMicroApps({
            name: item.name,
            icon: item.icon,
            uniqueKey: item.uniqueKey,
            color: item.color,
            debug: item.debug || false,
          });
          break;
        // 扩展编辑器， 比如扩展编辑器支持某种语言扩展强大的功能
        case 'extension-editor':
          this.extensions.set(item.uniqueKey, item);
          break;
      }
    });
  }
}
