<template>
  <div class="app-workspace">
    <div class="app-file-tree">
      <template v-if="appSore.appList[appSore.appActiveIndex] && appSore.appList[appSore.appActiveIndex].fileList && appSore.appList[appSore.appActiveIndex].fileList?.length">
        <FileTree
          :data="appSore.appList[appSore.appActiveIndex].fileList"
          @openFile="openFile" />
      </template>
    </div>
    <div class="divider"></div>
    <div class="app-core">扩展管理</div>
  </div>
</template>
<script setup lang="ts">
import FileTree from '@/components/common/FileTree.vue';
import { useAppStore, useFileStore } from '@/store';
// import { onMounted } from 'vue';

const fileStore = useFileStore();
const appSore = useAppStore();

// 打开文件
async function openFile(fileInfo: any) {
  fileStore.setFileList({
    key: fileInfo.path,
    name: fileInfo.name,
    path: fileInfo.path,
    editStatus: true,
    fileContent: fileInfo.fileContent,
  });
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
      font-size: var(--font-size);
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
