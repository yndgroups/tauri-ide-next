import themeDark from '../resources/theme/dark.json';
import themeLight from '../resources/theme/light.json';

// 主题模式
export enum ThemeModeEnum {
  dark = 'dark',
  light = 'light',
}

export class Theme {
  // 初始化参数
  //   mode 主题模式 light, dark
  constructor(mode: ThemeModeEnum) {
    this.themeChange(mode);
  }

  /**
   * 切换主题模式
   * @param mode 主题模式 light, dark
   */
  themeChange(mode: ThemeModeEnum) {
    let themeConfig;
    switch (mode) {
      case ThemeModeEnum.dark:
        themeConfig = themeDark;
        break;
      case ThemeModeEnum.light:
        themeConfig = themeLight;
        break;
      default:
        themeConfig = themeLight;
        break;
    }
    // 取到所有样式的key 和 value
    const styleKeys = Object.keys(themeConfig);
    const styleValues = Object.values(themeConfig);
    // 遍历设置全局scss变量的样式
    let styleVar: string[] = [];
    let styleBackgroundVar: string = '';
    for (let i = 0; i < styleKeys.length; i++) {
      const styleKey = styleKeys[i] || '';
      const styleValue = styleValues[i] || '';
      if (styleKey){
        styleVar.push(`${styleKey}: ${styleValue}`);
      }
      if (styleKey.endsWith('-bg')){
        let name = styleKey.replace('--', '');
        name = name.replace('-bg', '');
        styleBackgroundVar += `.bg-${name}{background-color: var(${styleKey})}`
      }
      if (styleKey.startsWith('--bg')){
        let name = styleKey.replace('--', '');
        styleBackgroundVar += `.${name}{background-color: var(${styleKey})}`
      }
    }
    this.setStyleProperty(styleVar, styleBackgroundVar);
  }
  /**
   * 设置样式属性
   * @param key 样式名
   * @param value  样式值
   */
  setStyleProperty(cssText: string[], styleBackgroundVar) {
    const styleText = `:root{${cssText.join(';')}};${styleBackgroundVar}`;
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(styleText))
    let head = document.head ||  document.getElementsByTagName('head')[0]
    document.querySelector('html').append(style)
  }
}

export default Theme;
