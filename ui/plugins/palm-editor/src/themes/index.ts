import { createTheme, type CreateThemeOptions } from "@uiw/codemirror-themes";
import maps from "./theme-create";

// 初始化主题
function themeInit(
  defaultSettings: CreateThemeOptions["settings"],
  options?: Partial<CreateThemeOptions>
) {
  const { theme = "dark", settings = {}, styles = [] } = options || {};
  return createTheme({
    theme: theme,
    settings: {
      ...defaultSettings,
      ...settings,
    },
    styles: [...styles],
  });
}

// 创建主题
const createThemes = () => {
  let themes = {} as any;
  maps.forEach((item: any, key: string) => {
    themes[key] = themeInit(item.default, {
      theme: key as any,
      styles: item.styles,
    });
  });
  return themes;
};

export default createThemes();
