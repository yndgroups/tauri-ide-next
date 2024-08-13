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
    for (let i = 0; i < styleKeys.length; i++) {
      const styleKey = styleKeys[i];
      const styleValue = styleValues[i];
      this.setStyleProperty(styleKey, styleValue as string);
    }
  }
  /**
   * 设置样式属性
   * @param key 样式名
   * @param value  样式值
   */
  setStyleProperty(key: string, value: string) {
    document.getElementsByTagName('body')[0].style.setProperty(key, value);
  }
}

export default Theme;
