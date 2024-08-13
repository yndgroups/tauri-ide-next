import {
  EditorSelection,
  EditorState,
  Extension,
  Facet,
  StateEffect,
  Text,
  Transaction,
} from "@codemirror/state";
import { EditorView } from "codemirror";
import { LanguageSupport } from "@codemirror/language";
import { Command, KeyBinding } from "@codemirror/view";

// 编辑器语言
export enum LanguageType {
  sql = "sql",
  markdown = "markdown",
  python = "python",
  javascript = "javascript",
  angular = "angular",
  html = "html",
  css = "css",
  vue = "vue",
  rust = "rust",
  xml = "xml",
  wast = "wast",
  sass = "sass",
  php = "php",
  liquid = "liquid",
  lezer = "lezer",
  less = "less",
  json = "json",
  java = "java",
  cpp = "cpp",
}

export enum Themes {
  abcdef = "abcdef",
  abyss = "abyss",
  androidstudio = "androidstudio",
  andromeda = "andromeda",
  atomone = "atomone",
  aura = "aura",
  basicDark = "basicDark",
  basicLight = "basicLight",
  solarizedDark = "solarizedDark",
  solarizedLight = "solarizedLight",
  bbedit = "bbedit",
  bespin = "bespin",
  copilot = "copilot",
  darcula = "darcula",
  dracula = "dracula",
  duotone = "duotone",
  eclipse = "eclipse",
  github = "github",
  gruvbox = "gruvbox",
  kimbie = "kimbie",
  material = "material",
  monokai = "monokai",
  monokaiDimmed = "monokaiDimmed",
  noctisLilac = "noctisLilac",
  nord = "nord",
  okaidia = "okaidia",
  quietlight = "quietlight",
  red = "red",
  solarized = "solarized",
  sublime = "sublime",
  theme = "theme",
  tokyoNight = "tokyoNight",
  tokyoNightDay = "tokyoNightDay",
  tokyoNightStorm = "tokyoNightStorm",
  tomorrowNightBlue = "tomorrowNightBlue",
  vscode = "vscode",
  whiteDark = "whiteDark",
  whiteLight = "whiteLight",
  xcodeDark = "xcodeDark",
  xcodeLight = "xcodeLight",
}

export enum BrowserType {
  // 位置浏览器
  unknown = "unknown",
  // ie浏览器
  IE = "IE",
  // 火狐浏览器
  Firefox = "Firefox",
  // 欧朋浏览器
  Opera = "Opera",
  // 谷歌浏览器
  Chrome = "Chrome",
  // 苹果浏览器
  Safari = "Safari",
  // ie浏览器 11
  Trident = "Trident",
}

export interface Options {
  // 视图初始化参数
  view: View;
  // 状态初始化参数
  state?: State;
  // 编辑器类型
  languageType: LanguageType;
}

export interface View {
  // 基础项
  state?: EditorState;
  root?: Document | ShadowRoot;
  scrollTo?: StateEffect<any>;
  dispatchTransactions?: (
    trs: readonly Transaction[],
    view: EditorView
  ) => void;
  dispatch?: (tr: Transaction, view: EditorView) => void;
  // 编辑器宽度
  width?: string | number;
  // 编辑器高度

  height?: string | number;
  // tab长度配置

  tabSize?: number;
  // 多行选择

  allowMultipleSelections?: boolean;
  // 主题配置
  theme?: Themes;

  // 编辑器语言的模式
  mode?: String | Object;

  // 编辑器的缩进单位 默认4个空格
  indentUnit?: number;

  // 扩展集合
  extensions?: Extension;

  // 用于启用占位符的扩展，占位符是编辑器为空时要显示的一段示例内容。
  placeholder?: string;

  // 是否换行显示
  lineWrapping?: boolean;

  /**
   *  编辑器左侧是否显示行号 - [boolean]
   * 默认显示
   */
  lineNumbers?: boolean;

  // 行分隔符
  lineSeparator?: string;

  // 是否使用mode提供的上下文的缩进
  smartIndent?: string;

  // 值改变
  change?: Function;

  // language配置语言
  language?: Extension | LanguageSupport;

  // 语法高亮
  highlightStyle?: Extension;

  /** 返回一个突出显示空白的扩展名，将一个cm highlightSpace类添加到空格中，
   *  并将一个厘米highlightTab类添加到各个制表符中。默认情况下，前者显示为淡点，后者显示为箭头 */
  highlightWhitespace?: Extension;

  // 返回一个扩展，该扩展将cm trailingSpace类添加到所有尾部空白中。
  highlightTrailingWhitespace?: Extension;

  /** 返回一个扩展名，确保内容的下边距等于编辑器的高度减去一行的高度，
   * 这样文档中的每一行都可以滚动到编辑器的顶部。
   * 只有当编辑器是可滚动的时，这才有意义，并且不应该在采用其内容大小的编辑器中启用 */
  scrollPastEnd?: Extension;

  // 绑定快捷键
  keyBindingConfig?: KeyBindingConfig;
}

export interface EditorViewConfig {
  // 当前编辑器状态。
  state?: EditorState;
}

// https://codemirror.net/docs/ref/#view.KeyBinding.key
export interface KeyBindingConfig {
  /** 用于此绑定的密钥名称。如果当前平台的特定于平台的属性（mac、win或linux）也在绑定中使用，
   * 则该属性优先。若未定义密钥，也未定义特定于平台的绑定，则会忽略绑定。 */
  key?: string;

  // 专门用于macOS
  mac?: string;

  // 专门用于Windows
  win?: string;

  // 专门用于Linux
  linux?: string;

  /** 触发此绑定时要执行的命令。当命令函数返回false时，将尝试对该键进行进一步绑定。 */
  run?: Command;

  /** 如果给定，这将定义第二个绑定，使用前缀为Shift的键名（可能是特定于平台的）来激活此命令。 */
  shift: Command;

  // 如果存在此属性，则会为不是多笔划前缀的每个键调用该函数。
  any?: (view: EditorView, event: KeyboardEvent) => boolean;
  // any?: fn(view: EditorView, event: KeyboardEvent) → boolean

  /** 默认情况下，当焦点位于编辑器内容（“编辑器”范围）时，应用键绑定。一些扩展，
   * 主要是那些定义自己面板的扩展，可能希望允许您注册该面板的本地绑定。
   * 此类绑定应使用自定义作用域名称。您也可以将多个作用域名称分配给绑定，并用空格分隔它们。
   */
  scope?: string;

  /** 当设置为true（默认值为false）时，这将始终阻止对绑定键的进一步处理，
   * 即使命令返回false也是如此。
   * 这对于键的本机行为令人讨厌或不相关但命令并不总是适用的情况非常有用
   * 例如，Mod-u表示撤消选择，这会导致浏览器在无法撤消任何选择时查看源代码）。
   */
  preventDefault?: boolean;

  /**
 当设置为true时，stopPropagation将在键盘事件上调用，这些事件的preventDefault已被调用以响应此键绑定（另请参阅preventDefault）
 */
  stopPropagation?: boolean;

  /** 用于注册关键点映射的面
   * 可以将多个关键点贴图添加到编辑器中。
   * 它们的优先级决定了它们的优先级
   * （早期指定的或优先级高的先检查）。
   * 当处理程序为给定的键返回true时，将不再调用其他处理程序。
   */
  keymap: Facet<readonly KeyBinding[]>;

  /**
   * 运行为给定作用域注册的密钥处理程序。事件对象应该是一个“keydown”事件。
   * 如果任何处理程序处理了它，则返回true
   * @param view
   * @param event
   * @param scope
   */
  runScopeHandlers: (
    view: EditorView,
    event: KeyboardEvent,
    scope: string
  ) => boolean;
}

// 配置状态
export interface State {
  forceLinting?: any;
  linter?: any;
  // 开始选择。默认为一开始的光标文件的
  selection?:
    | EditorSelection
    | {
        anchor: number;
        head?: number;
      };
  // 各种自定义扩展
  extensions?: Extension;
}

// 编辑器地图
export interface Editor {
  // 初始化
  init(value: string): void;
  // 构建视图扩展
  createStateExtensions(): Array<Extension>;
  // 获得焦点
  setFoucs(): void;
  // 失去焦点
  blur(): void;
  // 禁用编辑器
  disabled(): void;
  // 启用编辑器
  enable(): void;
  // 获取编辑器的值
  getRange(from?: number, to?: number): string | undefined;
  // 获取行
  getLineText(number: number): string;
  // 获取代码行数
  getLineCount(): number;
  // 获取光标位置
  getCursor(): number;
  // 选中数量
  getListSelections(): readonly any[];
  // 获取选中的数据
  getSelection(): string;
  // 获取选中的数据 数组
  getSelections(): string[];
  // 检测是否有选中
  getWhetherSelected(): boolean;
  // 获取 HTML
  getHTML(): string;
  // 替换文本
  replaceRange(replacement: string | Text, from: number, to: number): void;
  // 替换选中
  replaceSelection(replacement: string | Text): void;
  // 设置光标位置
  setCursor(position: number): void;
  // 设置选中
  setSelection(anchor: number, head?: number): void;
  // 设置选中多个
  setSelections(ranges: readonly any[], primary?: number): void;
  // 继承选择
  extendSelectionsBy(f: any, selection: any): void;
  // 销毁实例
  destroy(): void;
  // 异常信息
  warn(info: string): void;
  // 获取焦点位置
  getCursorPosition(): void;
  // 设置预览区内容
  renderPreview(): void;
  // 上传状态
  uploadStatus(): void;
  // 清除缓存
  clearCache(): void;
  // 禁用缓存
  disabledCache(): void;
  // HTML转markdown
  htmlToMarkdown(value: string): string;
  // markdown 转 JSON 输出
  exportJSON(value: string): string;
  // 消息提示。time 为 0 将一直显示
  tip(text: string, time?: number): void;
  // 设置预览模式
  setPreviewMode(mode: "both" | "editor"): void;
  // 删除选中内容
  deleteValue(): void;
  // 更新选中内容
  updateValue(value: string): void;
  // 在焦点处插入内容，并默认进行 Markdown 渲染
  insertValue(value: string, render: boolean): void;
  // 设置编辑器内容
  setValue(markdown: string, clearStack: boolean): void;
  // 清空栈
  clearStack(): void;
}
