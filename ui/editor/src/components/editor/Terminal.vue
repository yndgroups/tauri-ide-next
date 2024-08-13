<template>
  <div
    ref="xterm"
    @mouseout="onMouseout"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { ITheme, Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import 'xterm/lib/xterm.js';
import { resizePty, writeToPty, createTerminal, readFromPty } from '@tauri-apps/plugin-terminal';
import { message } from 'ant-design-vue';
const xterm = ref();
const state = reactive({
  term: {} as Terminal,
  uniqueKey: '',
});

let theme: ITheme = {
  background: '#272822', // 背景
  foreground: '#f8f8f2', // 前景
  cyan: '#2aa198', // 青色
  magenta: '#dd3682', // 洋红
  green: '#859900', // 绿色
  brightGreen: '#586e75',// 亮绿色
  brightRed: '#cb4b16', // 亮红色
  red: '#dc322f', // 红色
  yellow: '#b58900',
  brightYellow: '#657b83', // 亮黄色
  brightMagenta: '#6c71c4', // 亮洋红
  white: '#eee8d5', // 白色
  brightWhite: '#fdf6e3', // 亮白
  brightBlue: '#839496', // 亮蓝色
  blue: '#268bd2', // 蓝色
  black: '#002b36', // 黑色
  brightBlack: '#073642', // 亮黑
  brightCyan: '#f00', // 亮青色
  cursor: '#f00', // 光标
  cursorAccent: '#f00', // 光标强调文字
  extendedAnsi: ['#f00', '#ff0', '#04d'], //  扩展
  selectionBackground: '#4a4a76' // 选择背景色
  // selectionForeground: ['#f00'],
  // selectionInactiveBackground: '#f00',
};
/*
background: "#272822",
  foreground: "#f8f8f2",
  selection: "#4a4a76",
  selectionMatch: "#4a4a76",
  cursor: "#f8f8f0",
  dropdownBackground: "#414339",
  activeLine: "#3e3d3257",
  matchingBracket: "#3e3d32",
  keyword: "#F92672",
  storage: "#F92672",
  variable: "#FD971F",
  parameter: "#FD971F",
  function: "#66D9EF",
  string: "#E6DB74",
  constant: "#AE81FF",
  type: "#66D9EF",
  class: "#A6E22E",
  number: "#AE81FF",
  comment: "#88846f",
  heading: "#A6E22E",
  invalid: "#F44747",
  regexp: "#E6DB74",
  tag: "#F92672",
   */
let fitAddon = new FitAddon();

onMounted(() => {
  initTerminal()
});

// 读取终端信息
async function readFromPtyHandler() {
  if (!state.uniqueKey) {
    return;
  }
  const data = await readFromPty(state.uniqueKey);
  if (typeof data == 'string') {
    await writeToTerminal(data);
  }
  window.requestAnimationFrame(readFromPtyHandler);
}

// 使终端适合所有窗口大小
async function fitTerminal() {
  if (!state.uniqueKey) {
    return;
  }
  fitAddon.fit();
  resizePty(state.term.rows, state.term.cols, state.uniqueKey);
}

// 写入命令到控制台
function writeToTerminal(data: string) {
  return new Promise<void>((r) => {
    state.term.write(data, () => r());
  });
}

// 发送命令
function writeToPtyHandle(data: string) {
  if (!state.uniqueKey) {
    return;
  }
  writeToPty(data, state.uniqueKey);
}

// 初始化终端
async function initTerminal() {
  let resp = await createTerminal();
  console.log(resp, '初始化终端');
  if (resp.code == 1) {
    state.uniqueKey = `${resp.data}`;
  } else {
    console.error('Error creating shell:', resp);
    message.error(`${resp.errMsg}`);
    return;
  }
  state.term = new Terminal({
    // 渲染类型
    // rendererType: 'canvas',
    //   是否禁用输入
    disableStdin: false,
    cursorStyle: 'underline',
    //   启用时光标将设置为下一行的开头
    convertEol: true,
    // 终端中的回滚量
    scrollback: 10,
    fontSize: 14,
    rows: 10,
    // 光标闪烁
    cursorBlink: true,
    theme: theme,
    /* theme: {
      //   字体
      foreground: '#ffffff',
      background: '#042028',
      // 光标
      cursor: 'help',
    }, */
  });
  // 进行适应容器元素大小
  state.term.loadAddon(fitAddon);
  fitAddon.fit();
  //   创建实例
  state.term.open(xterm.value);
  // 进行适应容器元素大小
  state.term.loadAddon(fitAddon);

  // 添加外部链接
  state.term.loadAddon(new WebLinksAddon());
  // 写入
  state.term.onData(writeToPtyHandle);
  // 聚焦
  // state.term.focus();
  // 窗口改变
  addEventListener('resize', fitTerminal);
  // 使终端适合所有窗口大小
  fitTerminal();
  //
  window.requestAnimationFrame(readFromPtyHandler);
  // 在linux上，它似乎是“不允许操作（操作系统错误1）”，但它仍然有效，因为echo$SHELL give/bin/bash
}

function onMouseout() {
  state.term.blur()
}

function onMouseover() {
  state.term.focus()
}
</script>

<style lang="scss" scoped>
#xterm {
  height: calc(var(--cmd-interactive-height) - 90px);
  width: 100%;
  box-sizing: border-box;
}
</style>
