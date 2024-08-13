<template>
  <div class="app-workspace">
    <!-- 菜单 -->
    <div class="app-file-tree">
      <template v-if="appSore.appList[appSore.appActiveIndex] && appSore.appList[appSore.appActiveIndex].fileList && appSore.appList[appSore.appActiveIndex].fileList?.length">
        <FileTree :data="appSore.appList[appSore.appActiveIndex].fileList" />
      </template>
    </div>
    <div class="divider"></div>
    <!-- 编辑区域 -->
    <div class="app-core">
      <CodeEditor />
    </div>
  </div>
</template>
<script setup lang="ts">
import FileTree from './FileTree.vue';
import { useAppStore, useFileStore } from '@/store';
import keyboard from '@/utils/keyboard';
import { BaseDirectory, readDir, writeTextFile } from '@tauri-apps/plugin-fs';
import { onMounted } from 'vue';
import CodeEditor from './CodeEditor.vue';
import { listen } from '@tauri-apps/api/event';
import { confirm, open } from '@tauri-apps/plugin-dialog';
import { homeDir, sep } from '@tauri-apps/api/path';

// import { App } from '../../types';

const fileStore = useFileStore();
const appSore = useAppStore();

onMounted(() => {
  registerKeyboard();
});

/**
 * 监听菜单事件打开文件夹
 * 默认打开用户家目录
 * 
 */
listen('openFolder', async (_event) => {
  openFolder();
});

/**
 * 打开文件夹
 */
async function openFolder() {
  const selected = await open({
    multiple: false,
    directory: true,
    defaultPath: await homeDir(),
  });
  if (Array.isArray(selected)) {
    console.log(selected, 'selected');
    readDirHandler(selected[0]);
    // user selected multiple files
  } else if (selected === null) {
    console.log(selected, '取消选择');
    // user cancelled the selection
  } else {
    console.log(selected, '用户选择了一个文件目录');
    if (selected && typeof selected === 'string') {
      readDirHandler(selected);
    }
  }
}

/**
 * 打开选择的文件夹目录
 *
 * @param dir 打开目录
 */
async function readDirHandler(dir: string) {
  const entries = await readDir(dir, { baseDir: BaseDirectory.Home });
  let list = await processEntriesRecursive(dir, entries);
  appSore.appList[appSore.appActiveIndex].fileList = list;
}

/**
 * 递归变量文件夹
 *
 * @param parent 父级路径
 * @param entries 文件列表
 */
async function processEntriesRecursive(parent, entries) {
  for (const entry of entries) {
    // console.log(`Entry: ${JSON.stringify(entry)}`);
    // 暂时过滤掉以.开头的文件夹
    if (entry.isDirectory && !entry.name.startsWith('.')) {
      const dir = parent + sep() + entry.name;
      entry.children = await processEntriesRecursive(dir, await readDir(dir));
    } else {
      entry.prevPath = parent;
      entry.path = parent + sep() + entry.name;
    }
  }
  return entries;
}

// 注册快捷键
function registerKeyboard() {
  let kbd = keyboard();
  console.log(kbd, '注册快捷键');
  kbd.key(
    '⌘+x,ctrl+x,⌘+c,ctrl+c,⌘+s,ctrl+s,⌘+o,ctrl+o',
    async (_event: any, handler: any) => {
      // console.log(fileStore.file);
      // console.log(event, handler.shortcut, handler.scope, 'keyboard >>>>>>>');
      let fileContent = fileStore.file.fileContent || '';
      let filePath = fileStore.file.path || '';
      switch (true) {
        // 保存文件
        case handler.shortcut == '⌘+s' || handler.shortcut == 'ctrl+s':
          console.info('保存文件', 'filePath = ' + filePath, fileContent);
          let res = await writeTextFile(filePath, fileContent, { baseDir: BaseDirectory.Home });
          fileStore.file.editStatus = false;
          break;
        case handler.shortcut == '⌘+o' || handler.shortcut == 'ctrl+o':
          // 打开文件夹
          openFolder();
          break;
      }
      return false;
    },
    undefined,
  );
}
</script>
<style lang="scss" scoped>
.app-layout {
  background: var(--color-bg-container);
  min-height: 100vh;
  height: 100vh;
  min-height: 768px;
  min-width: 1366px;
  color: #fff;
  overflow: hidden;

  .app-workspace {
    display: flex;
    height: calc(100vh - var(--top-header-height));
    overflow: hidden;
    box-sizing: border-box;
  }

  .app-actions {
    width: var(--actions-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--third-bg-color);
    border-right: 1px solid var(--deep-bg-color);
    overflow-y: overlay;
    text-align: center;
    box-sizing: border-box;

    ul li {
      padding: 10px 0;
      cursor: pointer;
      font-size: calc(var(--font-size));
      .item {
        display: block;
        width: 100%;
        height: 100%;
      }

      &:hover {
        background-color: var(--deep-bg-color);
      }

      &.active {
        background-color: var(--deep-bg-color);
      }
    }
  }
  .app-file-tree {
    width: var(--file-tree-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--deep-bg-color);
    overflow-y: overlay;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .app-core {
    background-color: var(--color-bg-container);
    width: calc(100vw - var(--actions-width) - var(--file-tree-width));
    box-sizing: border-box;
  }
}
</style>
