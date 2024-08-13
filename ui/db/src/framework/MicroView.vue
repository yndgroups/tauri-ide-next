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
      <div class="app-workspace-container">
        <DataManger></DataManger>
      </div>
    </div>
    <div class="app-footer">
      <AppFooter />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, watch, reactive } from 'vue';
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
import DataManger from '@/components/dataManger/Layout.vue';
import AppFooter from '@/components/common/AppFooter.tsx';
const finished = ref(false);
let state = reactive({
  actions: [
    { name: '连接', icon: 'createLink', id: 1, width: 20, color: '#F00' },
    { name: '新建查询', icon: 'createQuery', id: 2, width: 20, color: '#F00' },
    { name: '表', icon: 'table', id: 2, width: 20, color: '#F00' },
    { name: '视图', icon: 'views', id: 3, width: 20, color: '#F00' },
    { name: '函数', icon: 'fn', id: 4, width: 20, color: '#F00' },
    { name: '事件', icon: 'event', id: 5, width: 20, color: '#F00' },
    { name: '用户', icon: 'user', id: 6, width: 20, color: '#F00' },
    { name: '查询', icon: 'tableQuery', id: 7, width: 20, color: '#F00' },
    { name: '报表', icon: 'report', id: 8, width: 20, color: '#F00' },
    { name: '备份', icon: 'bak', id: 9, width: 20, height: 10, color: '#F00' },
    { name: '自动运行', icon: 'autoRun', id: 10, width: 20, color: '#F00' },
    { name: '模型', icon: 'model', id: 11, width: 20, color: 'blue' },
  ],
});

// 初始化应用界面
onMounted(async () => {
  // const osVersion = await version();
  // const appName = await getName();
  finished.value = true;
});

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

  .app-file-tree {
    width: var(--file-tree-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--deep-bg-color);
    overflow-y: hidden;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .app-workspace-container {
    background-color: var(--color-bg-container);
    width: 100vw;
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
