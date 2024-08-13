<template>
  <div
    class="app-layout"
    v-if="finished">
    <div class="app-header">
      <div class="logo">工具栏</div>
      <div>
        <SettingOutlined />
      </div>
    </div>
    <div class="app-workspace">
      <div class="app-actions">
        <ul v-if="appSore.appList && appSore.appList.length">
          <li
            v-for="(app, index) in appSore.getApp"
            :class="{ active: appSore.appActiveIndex === index }"
            :key="app.uniqueKey">
            <Tooltip
              placement="right"
              :title="app.name"
              :color="app.color"
              @click.prevent="appClickHandle(index, app.uniqueKey)">
              <div class="item">
                <component
                  class="comps"
                  :is="icons[app.icon]"
                />
              </div>
            </Tooltip>
          </li>
        </ul>
      </div>
      <div class="app-workspace-editor">
        <component
          v-if="comps[appUniqueKey]"
          :is="comps[appUniqueKey]" />
        <div
          v-else
          id="expansion-bridge"
          ref="expansionBridge"></div>
      </div>
    </div>
    <div class="app-footer">
      <AppFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from 'vue';
import {
  ConsoleSqlOutlined,
  GlobalOutlined,
  AppstoreAddOutlined,
  MediumOutlined,
  SettingOutlined,
  FileAddOutlined,
  BranchesOutlined,
  CodeSandboxOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons-vue';
import { useAppStore } from '@/store';
import { AnyObject } from '@/types';
import Palm from '@/core/palm';
import WorkspaceEditor from '@/components/editor/Layout.vue';
import DataManger from '@/components/dataManger/Layout.vue';
import Extend from '@/components/extends/Layout.vue';
import MarkDown from '@/components/markdown/Layout.vue';
import AppFooter from '@/components/common/AppFooter.tsx';
import Gpt from '@/components/gpt/Layout.vue';
import Git from '@/components/git/Layout.vue';
import Music from '@/components/music/Layout.vue';
import { version } from '@tauri-apps/plugin-os';
import { getName } from '@tauri-apps/api/app';
import { Tooltip } from 'ant-design-vue';
// import { getCurrent } from '@tauri-apps/api/window';
const comps = {
  '1': WorkspaceEditor,
  '2':  DataManger,
  '3': MarkDown,
  '4': Extend,
  '5': Git,
  '6': Gpt,
  '7': Music
};
const expansionBridge = ref<HTMLElement>();
const icons = {
  CodeSandboxOutlined: CodeSandboxOutlined,
  FileAddOutlined: FileAddOutlined,
  BranchesOutlined: BranchesOutlined,
  FileMarkdownOutlined: FileMarkdownOutlined,
  MediumOutlined: MediumOutlined,
  AppstoreAddOutlined: AppstoreAddOutlined,
  ConsoleSqlOutlined: ConsoleSqlOutlined,
  GlobalOutlined: GlobalOutlined,
} as AnyObject;

const appSore = useAppStore();
const finished = ref(false);
const appUniqueKey = ref<string>('1');

watch(
  () => appSore.app,
  (nv) => {
    console.log(`watch:${JSON.stringify(nv)}`);
    appUniqueKey.value = nv.uniqueKey;
    if (nv.uniqueKey !== '1' && nv.uniqueKey !== '2' && nv.uniqueKey !== '3') {
      nextTick(() => {
        if (window.Palm) {
          window.Palm.initAppToSandbox(appSore.app);
        }
      });
    }
  },
  { deep: true },
);

// 初始化应用界面
onMounted(async () => {
  const osVersion = await version();
  const appName = await getName();
  let palm = new Palm(appName, osVersion);
  palm.addApp({
    uniqueKey: '1',
    name: '代码编辑',
    icon: 'CodeSandboxOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '2',
    name: '数据管理',
    icon: 'ConsoleSqlOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '3',
    name: '笔记',
    icon: 'FileMarkdownOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '4',
    name: '扩展',
    icon: 'AppstoreAddOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '5',
    name: '版本控制',
    icon: 'BranchesOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '6',
    name: '知行通',
    icon: 'GlobalOutlined',
    color: '#333',
  });
  palm.addApp({
    uniqueKey: '7',
    name: '音乐',
    icon: 'MediumOutlined',
    color: '#333',
  });
  // await palm.loadPlugins();
  // await palm.registerPlugins();
  window.Palm = palm;
  finished.value = true;
});

// 应用事件
function appClickHandle(index: number, uniqueKey: string) {
  console.log(`uniqueKey=${uniqueKey}`);
  appUniqueKey.value = uniqueKey;
  try {
    // 卸载
    if (uniqueKey !== appSore.app.uniqueKey) {
      window.Palm.unmount();
      if (uniqueKey != '1' && uniqueKey !== '2' && uniqueKey != '3') {
        nextTick(() => {
          // let app = appSore.microApps.get(uniqueKey);
          // window.Palm.initAppToSandbox(app);
        });
      }
      appSore.setActiveIndex(index);
    }
  } catch (error) {
    console.error(error);
  }
}

// oncontextmenu事件禁用右键菜单；
// document.oncontextmenu = function () {
//   console.log('右键已经禁用');
//   return false;
// };

// onselectstart事件禁用网页上选取的内容；
document.onselectstart = function () {
  console.log('事件禁用网页上选取的内容');
  return false;
};

// oncopy事件禁用复制；
document.oncopy = function () {
  return false;
};

// 禁用鼠标事件
document.onmousedown = function (e) {
  if (e.which == 2) {
    // 鼠标滚轮的按下，滚动不触发
    return false;
  }
  if (e.which == 3) {
    // 鼠标右键
    return false;
  }
};
</script>
<style lang="scss" scoped>
.app-layout {
  background: var(--color-bg-container);
  min-height: 100vh;
  height: 100vh;
  min-height: 768px;
  min-width: 1366px;
  overflow: hidden;

  .app-header,
  .app-footer {
    background-color: var(--third-bg-color);
  }

  // 头部导航
  .app-header {
    width: 100vw;
    height: var(--top-header-height);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;

    .logo {
      color: var(--color-text);
    }
  }

  // 分割线拖动
  .divider {
    width: 4px;
    background-color: var(--second-bg-color);

    &:hover {
      background-color: var(--gray-bg-color);
      cursor: w-resize;
    }
  }

  .app-workspace {
    display: flex;
    height: calc(100vh - var(--top-header-height) - var(--top-footer-height));
    overflow: hidden;
    box-sizing: border-box;
  }

  .app-actions {
    width: var(--actions-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--second-bg-color);
    border-right: 1px solid var(--deep-bg-color);
    overflow-y: overlay;
    text-align: center;
    box-sizing: border-box;

    ul li {
      padding: 10px 0;
      cursor: pointer;
      font-size: calc(var(--font-size) * 1.8);
      border-bottom: 2px solid transparent;

      .item {
        display: block;
        width: 100%;
        height: 100%;

        .comps {
          color: var(--color-text);
          font-size: calc(var(--font-size) * 1.5);
        }
      }

      &:hover {
        background-color: var(--deep-bg-color);
        border-bottom: 2px solid var(--primary-border-hover);
      }

      &.active {
        background-color: var(--deep-bg-color);
        border-bottom: 2px solid var(--primary-border-hover);
      }
    }
  }

  .app-file-tree {
    width: var(--file-tree-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--deep-bg-color);
    overflow-y: hidden;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .app-workspace-editor {
    background-color: var(--color-bg-container);
    width: calc(100vw - var(--actions-width));
    box-sizing: border-box;
  }

  .app-footer {
    height: var(--top-footer-height);
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: var(--font-size);
    width: 100vw;
  }
}
</style>
