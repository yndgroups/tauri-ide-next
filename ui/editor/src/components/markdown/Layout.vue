<template>
  <Layout class="layout-main">
    <LayoutSider
      v-model:collapsed="collapsed"
      :trigger="null"
      theme="light"
      width="300"
      class="layout-sider"
      collapsible>
      <div class="logo" />
      <FileTree
        :data="fileList"
        @openFile="openFile" />
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0">
        <FileTabs>
          <template #action>
            <MenuUnfoldOutlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)" />
            <MenuFoldOutlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)" />
          </template>
        </FileTabs>
      </LayoutHeader>
      <LayoutContent :style="{ background: '#fff', minHeight: '280px' }">
        <WorkPanel />
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { LayoutContent, LayoutSider, LayoutHeader, Layout } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import FileTree from './FileTree.vue';
import FileTabs from './FileTabs.vue';
import WorkPanel from './WorkPanel.vue';
import { BaseDirectory, readDir } from '@tauri-apps/plugin-fs';
// import { useFileStoreWithOut } from '../store/file';
// import keyboard from '../utils/keyboard';
const store = {} as any; //useFileStoreWithOut();
const collapsed = ref<boolean>(false);
const fileList = ref<any>([]);

// 读取文件列表
async function getFileList() {
  const entries = await readDir('test', { baseDir: BaseDirectory.Home });
  fileList.value = entries as any;
}

// 打开文件
async function openFile(fileInfo: any) {
  store.setFileList({
    key: fileInfo.path,
    name: fileInfo.name,
    path: fileInfo.path,
    editStatus: false,
    fileContent: fileInfo.fileContent,
  });
}

onMounted(() => {
  /* let kbd = keyboard();
  console.log(kbd, 'kbdkbdkbd');
  kbd.key(
    '⌘+x,ctrl+x,⌘+c,ctrl+c,⌘+s,ctrl+s',
    async (event, handler) => {
      console.log(store.file);
      let fileContent = store.file.fileContent || '';
      let filePath = store.file.path || '';
      console.log(event, handler.shortcut, handler.scope, 'keyboard >>>>>>>');
      switch (true) {
        case handler.shortcut == '⌘+s' || handler.shortcut == 'ctrl+s':
          await writeTextFile(filePath, fileContent);
          store.file.editStatus = false;
          break;
      }
      return false;
    },
    undefined,
  ); */
  // getFileList();
});
</script>

<style lang="scss" scoped>
.layout-main {
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
}
:deep(.ant-layout-header) {
  padding: 0;
  margin: 0;
}
:deep(.ant-layout-content) {
  padding: 0;
  margin: 0;
}
.files-nav {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.layout-sider {
  height: 100vh;
  overflow: hidden auto;
}
</style>
, LayoutContent, LayoutSider, LayoutHeader./WorkPanel.vue
