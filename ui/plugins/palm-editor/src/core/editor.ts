import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { sass } from "@codemirror/lang-sass";
import { less } from "@codemirror/lang-less";
import { php } from "@codemirror/lang-php";
import { angular } from "@codemirror/lang-angular";
import { cpp } from "@codemirror/lang-cpp";
import { lezer } from "@codemirror/lang-lezer";
import { json } from "@codemirror/lang-json";
import { liquid } from "@codemirror/lang-liquid";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";
import { wast } from "@codemirror/lang-wast";
import { vue } from "@codemirror/lang-vue";
import { xml } from "@codemirror/lang-xml";
import { sql } from "@codemirror/lang-sql";
// import { sql } from "@codemirror/lang-sql";

import {
  Compartment,
  EditorSelection,
  EditorState,
  Extension,
  Text,
} from "@codemirror/state";
import { BrowserType, LanguageType, Options, Themes } from "../types";
import { Editor } from "../types";
import themes from "../themes";
export class PalmEditor implements Editor {
  private el: HTMLElement;
  private readonly options: Options;
  private view: EditorView;
  constructor(el: Element | DocumentFragment, value: string, options: Options) {
    this.el = el as any;
    this.options = options;
    this.view = undefined as any;
    this.init(value);
  }

  // 初始化
  init(value: string) {
    if (typeof this.options !== "object") {
      this.warn("配置文件项解析!请查看配置是否正确,未发现option选项");
    } else if (!Reflect.has(this.options, "view")) {
      this.warn("配置必传view选项为空");
    } else {
      if (this.el) {
        this.el = this.el as HTMLElement;
      } else {
        this.el = document.body as HTMLElement;
      }
    }
    // 设置编辑器宽度
    if (this.options.view && this.options.view.width) {
      if (`${this.options.view.width}`.indexOf("px") != -1) {
        this.el.style.width = `${this.options.view.width}`;
      } else if (`${this.options.view.width}`.indexOf("%") != -1) {
        this.el.style.width = `${this.options.view.width}`;
      } else if (/^[0-9]*$/.test(`${this.options.view.width}`)) {
        this.el.style.width = `${this.options.view.width}px`;
      } else {
        this.el.style.width = `${this.options.view.width}`;
      }
    }
    // 设置编辑器高度
    if (this.options.view && this.options.view.height) {
      if (`${this.options.view.height}`.indexOf("px") != -1) {
        this.el.style.height = `${this.options.view.height}`;
      } else if (`${this.options.view.height}`.indexOf("%") != -1) {
        this.el.style.height = `${this.options.view.height}`;
      } else if (/^[0-9]*$/.test(`${this.options.view.height}`)) {
        this.el.style.height = `${this.options.view.height}px`;
      } else {
        this.el.style.height = `${this.options.view.height}`;
      }
    }
    // 如果已经存在初始化，就先销毁原有的，保证只初始化一次
    if (this.view) {
      this.view.destroy();
    }
    this.view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: this.createStateExtensions(),
      }),
      extensions: this.createViewExtensions(),
      parent: this.el,
      dispatch: (tr: any) => {
        this.view.update([tr]);
        if (tr.changes.empty || !tr.docChanged) {
          return;
        }
        if (
          this.options.view.change &&
          typeof this.options.view.change === "function"
        ) {
          this.options.view.change(tr.state.doc.toString());
        }
      },
    });

    // 非Chrome内核通过点击dom元素给其添加焦点
    if(this.getBrowserType() !== BrowserType.Chrome && this.el && this.view) {
      this.el.addEventListener('click', () => { this.setFoucs(); }, true)
    }
  }

  // 获得焦点
  setFoucs() {
    console.log(this, 'this.view')
    if (!this.view.hasFocus) {
      this.view.focus();
    }
  }

  // 失去焦点
  blur() {
    console.log("失去焦点");
  }

  // 禁用编辑器
  disabled() {}

  // 启用编辑器
  enable() {}

  // 异常信息
  warn(info: string) {
    console.log(`warn:${info}`);
    throw new Error(`${info}`);
  }

  // 获取焦点位置
  getCursorPosition() {}

  // 设置预览区内容
  renderPreview() {}

  // 上传状态
  uploadStatus() {}

  // 清除缓存
  clearCache() {}

  // 禁用缓存
  disabledCache() {}

  // 构建视图扩展
  createViewExtensions() {
    let extensions = new Array<Extension>();
    if (
      this.options.view &&
      this.options.view.extensions &&
      Array.isArray(this.options.view.extensions) &&
      this.options.view.extensions.length
    ) {
      this.options.view.extensions.forEach((item) => {
        extensions.push(item);
      });
    }
    return extensions;
  }

  // 构建插件扩展
  createStateExtensions(): Array<Extension> {
    // 扩展，**keymap：** 配置要使用的快捷键；语言包等也是作为扩展在此配置
    // [keymap.of(defaultKeymap)],
    let extensions = new Array<Extension>();
    // 自定义传过来的扩展
    extensions.push(basicSetup);
    // 设置tab宽度
    extensions.push(keymap.of([indentWithTab]));
    // 设置默认快捷键
    extensions.push(keymap.of(defaultKeymap));
    // 设置语言
    const language = new Compartment();
    switch (this.options.languageType) {
      case LanguageType.sql:
        extensions.push(language.of(sql()));
        break;
      case LanguageType.javascript:
        extensions.push(language.of(javascript()));
        break;
      case LanguageType.html:
        extensions.push(language.of(html()));
        break;
      case LanguageType.css:
        extensions.push(language.of(css()));
        break;
      case LanguageType.less:
        extensions.push(language.of(less()));
        break;
      case LanguageType.sass:
        extensions.push(language.of(sass()));
        break;
      case LanguageType.json:
        extensions.push(language.of(json()));
        break;
      case LanguageType.vue:
        extensions.push(language.of(vue()));
        break;
      case LanguageType.angular:
        extensions.push(language.of(angular()));
        break;
      case LanguageType.xml:
        extensions.push(language.of(xml()));
        break;
      case LanguageType.wast:
        extensions.push(language.of(wast()));
        break;
      case LanguageType.markdown:
        extensions.push(language.of(markdown()));
        break;
      case LanguageType.php:
        extensions.push(language.of(php()));
        break;
      case LanguageType.liquid:
        extensions.push(language.of(liquid()));
        break;
      case LanguageType.lezer:
        extensions.push(language.of(lezer()));
        break;
      case LanguageType.java:
        extensions.push(language.of(java()));
        break;
      case LanguageType.python:
        extensions.push(language.of(python()));
        break;
      case LanguageType.rust:
        extensions.push(language.of(rust()));
        break;
      case LanguageType.cpp:
        extensions.push(language.of(cpp()));
        break;
      default:
        if (this.options.view.language) {
          extensions.push(language.of(html()));
        }
    }

    // tab长度配置,否则默认为4
    if (
      this.options.view.tabSize != undefined &&
      this.options.view.tabSize >= 0
    ) {
      const tabSize = new Compartment();
      extensions.push(
        tabSize.of(EditorState.tabSize.of(this.options.view.tabSize))
      );
    }
    // 配置默认提示
    if (this.options.view.placeholder) {
      extensions.push(placeholder(`${this.options.view.placeholder}`));
    }
    // 配置多行选择
    extensions.push(
      EditorState.allowMultipleSelections.of(
        this.options.view.allowMultipleSelections || false
      )
    );
    // 配置是否换行显示
    extensions.push(EditorView.lineWrapping);
    // 配置主题,默认为 monokai
    switch (this.options.view.theme) {
      case Themes.monokai:
        extensions.push(themes.monokai);
        break;
      case Themes.abcdef:
        extensions.push(themes.abcdef);
        break;
      case Themes.abyss:
        extensions.push(themes.abyss);
        break;
      case Themes.androidstudio:
        extensions.push(themes.androidstudio);
        break;
      case Themes.andromeda:
        extensions.push(themes.andromeda);
        break;
      case Themes.atomone:
        extensions.push(themes.atomone);
        break;
      case Themes.aura:
        extensions.push(themes.aura);
        break;
      case Themes.basicLight:
        extensions.push(themes.basicLight);
        break;
      case Themes.basicDark:
        extensions.push(themes.basicDark);
        break;
      case Themes.bbedit:
        extensions.push(themes.bbedit);
        break;
      case Themes.bespin:
        extensions.push(themes.bespin);
        break;
      case Themes.copilot:
        extensions.push(themes.copilot);
        break;
      case Themes.darcula:
        extensions.push(themes.darcula);
        break;
      case Themes.dracula:
        extensions.push(themes.dracula);
        break;
      case Themes.duotone:
        extensions.push(themes.duotone);
        break;
      case Themes.eclipse:
        extensions.push(themes.eclipse);
        break;
      case Themes.github:
        extensions.push(themes.github);
        break;
      case Themes.gruvbox:
        extensions.push(themes.gruvbox);
        break;
      case Themes.kimbie:
        extensions.push(themes.kimbie);
        break;
      case Themes.material:
        extensions.push(themes.material);
        break;
      case Themes.monokaiDimmed:
        extensions.push(themes.monokaiDimmed);
        break;
      case Themes.noctisLilac:
        extensions.push(themes.noctisLilac);
        break;
      case Themes.nord:
        extensions.push(themes.nord);
        break;
      case Themes.okaidia:
        extensions.push(themes.okaidia);
        break;
      case Themes.quietlight:
        extensions.push(themes.quietlight);
        break;
      case Themes.red:
        extensions.push(themes.red);
        break;
      case Themes.sublime:
        extensions.push(themes.sublime);
        break;
      case Themes.tokyoNight:
        extensions.push(themes.tokyoNight);
        break;
      case Themes.tokyoNightDay:
        extensions.push(themes.tokyoNightDay);
        break;
      case Themes.tokyoNightStorm:
        extensions.push(themes.tokyoNightStorm);
        break;
      case Themes.tomorrowNightBlue:
        extensions.push(themes.tomorrowNightBlue);
        break;
      case Themes.vscode:
        extensions.push(themes.vscode);
        break;
      case Themes.whiteLight:
        extensions.push(themes.whiteLight);
        break;
      case Themes.whiteDark:
        extensions.push(themes.whiteDark);
        break;
      case Themes.xcodeDark:
        extensions.push(themes.xcodeDark);
        break;
      case Themes.xcodeLight:
        extensions.push(themes.xcodeLight);
        break;
      default:
        extensions.push(themes.monokai);
      // extensions.push(themes.basicLight);
    }

    // 行分隔符
    if (this.options.view.lineSeparator) {
      extensions.push(
        EditorState.lineSeparator.of(this.options.view.lineSeparator || "")
      );
    }
    // 自定义的扩展，放最后，有封盖默认的行为，优先级高于上面的配置
    if (
      this.options.state &&
      this.options.state.extensions &&
      Array.isArray(this.options.state.extensions) &&
      this.options.state.extensions.length
    ) {
      this.options.state.extensions.forEach((item) => {
        extensions.push(item);
      });
    }
    return extensions;
  }

  // 自定义提示
  // myCompletions(context: CompletionContext) {
  //   let word = context.matchBefore(/\w*/) as any;
  //   if (word.from == word.to && !context.explicit) return null;
  //   return {
  //     from: word.from,
  //     options: [
  //       { label: 'match', type: 'keyword' },
  //       { label: 'hello', type: 'variable', info: '(World)' },
  //       { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
  //     ],
  //   };
  // }

  // 获取编辑器的值
  getRange(from?: number, to?: number): string | undefined {
    return this.view.state.sliceDoc(from, to);
  }

  // 获取行
  getLineText(number: number): string {
    return this.view.state.doc.line(number + 1).text;
  }

  // 获取代码行数
  getLineCount(): number {
    return this.view.state.doc.lines;
  }

  // 获取光标位置
  getCursor(): number {
    return this.view.state.selection.main.head;
  }

  // 选中数量
  getListSelections(): readonly any[] {
    let val:any;
    return (val = this.view.state.selection.ranges) !== null &&
      val !== undefined
      ? val
      : [];
  }

  // 获取选中的数据
  getSelection(): string {
    let val;
    return (val = this.view.state.sliceDoc(
      this.view.state.selection.main.from,
      this.view.state.selection.main.to
    )) !== null && val !== undefined
      ? val
      : "";
  }

  // 获取选中的数据 数组
  getSelections(): string[] {
    const s = this.view.state;
    if (!s) {
      return [];
    }
    return s.selection.ranges.map((r: { from: number; to: number }) =>
      s.sliceDoc(r.from, r.to)
    );
  }

  // 检测是否有选中
  getWhetherSelected(): boolean {
    return this.view.state.selection.ranges.some(
      (r: { empty: boolean }) => !r.empty
    );
  }

  // 替换文本
  replaceRange(replacement: string | Text, from: number, to: number): void {
    this.view.dispatch({
      changes: { from, to, insert: replacement },
    });
  }

  // 替换选中
  replaceSelection(replacement: string | Text): void {
    this.view.dispatch(this.view.state.replaceSelection(replacement));
  }

  // 设置光标位置
  setCursor(position: number): void {
    this.view.dispatch({ selection: { anchor: position } });
  }

  // 设置选中
  setSelection(anchor: number, head?: number): void {
    this.view.dispatch({ selection: { anchor, head } });
  }

  // 设置选中多个
  setSelections(ranges: readonly any[], primary?: number): void {
    this.view.dispatch({
      selection: EditorSelection.create(ranges, primary),
    });
  }

  // 继承选择
  extendSelectionsBy(f: any, selection: any): void {
    this.view.dispatch({
      selection: EditorSelection.create(
        selection.ranges.map((r: any) => r.extend(f(r)))
      ),
    });
  }

  // 销毁实例
  destroy(): void {
    if (this.view && this.view.contentDOM) {
      this.view.contentDOM.removeEventListener("click", this.setFoucs);
      this.view.contentDOM.removeEventListener("blur", this.blur);
    }
    this.view && this.view.destroy();
  }
  // 获取编辑器里的HTML
  getHTML(): string {
    if(this.view && this.view.contentDOM) {
      return this.view.contentDOM.innerHTML;
    } else {
      return ''
    }
  }

  // HTML转markdown
  htmlToMarkdown(value: string): string {
    // let html = this.getRange();
    // let sitdown = new Sitdown();
    // let markdown = sitdown.HTMLToMD(html);
    return "markdown";
  }
  exportJSON(value: string): string {
    throw new Error("Method not implemented.");
  }
  tip(text: string, time?: number | undefined): void {
    throw new Error("Method not implemented.");
  }
  setPreviewMode(mode: "both" | "editor"): void {
    throw new Error("Method not implemented.");
  }
  deleteValue(): void {
    throw new Error("Method not implemented.");
  }
  updateValue(value: string): void {
    throw new Error("Method not implemented.");
  }
  insertValue(value: string, render: boolean): void {
    throw new Error("Method not implemented.");
  }
  setValue(markdown: string, clearStack: boolean): void {
    throw new Error("Method not implemented.");
  }
  clearStack(): void {
    throw new Error("Method not implemented.");
  }

  // 获取浏览器类型
  getBrowserType() {
    const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let browser = BrowserType.unknown;
    if (userAgent.indexOf(BrowserType.IE) != -1) {
      //字符串含有IE字段，表明是IE浏览器
      browser = BrowserType.IE;
    } else if (userAgent.indexOf(BrowserType.Firefox) != -1) {
      //字符串含有Firefox字段，表明是火狐浏览器
      browser = BrowserType.Firefox;
    } else if (userAgent.indexOf("OPR") != -1) {
      //Opera
      browser = BrowserType.Opera;
    } else if (userAgent.indexOf(BrowserType.Chrome) != -1) {
      //Chrome
      browser = BrowserType.Chrome;
    } else if (userAgent.indexOf(BrowserType.Safari) != -1) {
      //Safari
      browser = BrowserType.Safari;
    } else if (userAgent.indexOf(BrowserType.Trident) != -1) {
      //IE内核
      browser = BrowserType.Trident;
    }
    return browser;
  }
}

export default PalmEditor;
