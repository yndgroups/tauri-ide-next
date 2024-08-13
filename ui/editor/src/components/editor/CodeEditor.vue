<template>
  <div class="code-editor">
      <!-- 打开文件显示 -->
      <div class="file-tabs">
        <Tabs
          v-model:activeKey="store.activeKey"
          hide-add
          @tabScroll="callback"
          @edit="onEdit"
          @change="changeHandle">
          <TabPane
            :key="i"
            v-for="(o, i) in store.fileList">
            <template #tab>
              <span class="file-name">
                {{ o.name }}
              </span>
              <span class="edit-status"></span>
              <span
                class="close"
                @click.prevent.stop="store.removeFileList(i)"></span>
            </template>
            <!-- <template #moreIcon>
            <EllipsisOutlined class="more-icon" />
          </template> -->
          </TabPane>
        </Tabs>
      </div>
      <!-- 文件编辑区 -->
      <div class="file-editor">
        <div
          class="palm-editor-container"
          ref="codeEditor"></div>
      </div>
      <!-- 命令行 -->
      <Interactive/>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
// import { EllipsisOutlined } from '@ant-design/icons-vue';
import { PalmEditor, LanguageType, Themes } from 'palm-editor';
import { useFileStore } from '@/store';
import { storeToRefs } from 'pinia';
import Interactive from './Interactive.vue';
const store = useFileStore();
const { file } = storeToRefs(store);
const codeEditor = ref();
const editor = ref();

/**
 * 监听文件切换行为时
 */
watch(
  () => file.value,
  (nv) => {
    editor.value.destroy();
    initCode(nv.fileContent || '');
  },
);

onMounted(() => {
  let text = file.value.fileContent || '';
  initCode(text);
});

/**
 * 文件切换
 * 
 * @param val 
 */
function changeHandle(val: string) {
  if (store.fileList[val].path === store.file.path) {
    return;
  }
  store.file = store.fileList[val];
}

/**
 * 初始化
 * 
 * @param content content
 */
function initCode(content: string) {
  editor.value = new PalmEditor(codeEditor.value, content, {
    view: {
      placeholder: '请输入',
      change: (nv: string) => {
        store.file.fileContent = nv;
        store.file.editStatus = true;
        // console.log(store.file.path, 'store.file.path')
        // console.log(val, '值改变执行');
      },
      extensions: [],
      theme: Themes.basicLight,
    },
    state: {},
    languageType: LanguageType.vue,
  });
}

/**
 * 回调
 */
const callback = () => {
  console.log('callback');
};

/**
 * 
 * @param targetKey 编辑
 * 
 * @param action 行为
 */
const onEdit = (targetKey: any, action: any) => {
  if (action === 'add') {
    // add();
  } else {
    console.log(targetKey);
    // remove(targetKey as string);
  }
};

/**
 * 获取编辑器文本数据
 * 
 * @param type 获取编辑器数据
 */
const getData = (type: number) => {
  if (type == 1) {
    return editor.value.getSelection();
  }
};

defineExpose({
  getData,
});
</script>
<style lang="scss" scoped>
.edit-status {
  display: 'inline-block';
  width: '8px';
  height: '8px';
  background-color: var(--color-text);
  border-radius: '50%';
  margin-left: '15px';
}
.close {
  width: 15px;
  height: 15px;
  display: inline-block;
  margin-left: 10px;
  position: relative;
  top: 5px;
  padding-left: 10px;

  &::after,
  &::before {
    content: '';
    display: block;
    width: 2px;
    height: 12px;
    background-color: var(--color-text);
    position: absolute;
  }
  &::after {
    transform: rotate(45deg);
  }
  &::before {
    transform: rotate(-45deg);
  }
}
.cm-s-cobalt .CodeMirror-cursor {
  border-left: 1px solid #30aaed !important;
}
:deep(.ant-tabs-ink-bar) {
  background-color: var(--primary-border);
}
:deep(.ant-tabs-tab-active) {
  background-color: var(--primary-border);
  .file-name {
    color: var(--color-text);
  }
}
:deep(.ant-tabs-tab) {
  background-color: var(--third-bg-color);
  margin: 0 !important;
  padding-left: 20px;
  padding-right: 20px;
  .file-name {
    color: var(--color-text);
  }
}
:deep(.ant-tabs) {
  background-color: var(--color-bg-container);
  color: #7b7d6b;
  &:hover {
    color: var(--color-text);
  }
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
  overflow: hidden;
}
.code-editor {
  position: relative;
  overflow: hidden;
  height: calc(100vh - var(--top-header-height));
}

.file-editor {
  height: calc(100vh - var(--top-header-height) - var(--file-tabs-height) - var(--cmd-interactive-height));
  overflow: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 5px;
  margin-top: var(--file-tabs-height);
  overflow-x: hidden;

  .palm-editor-container {
    height: 100%;
  }
}
.file-tabs {
  width: calc(100vw - var(--actions-width) - var(--file-tree-width));
  box-sizing: border-box;
  height: var(--file-tabs-height);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  box-shadow: 5px 0px 2px var(--color-bg-container);
}

.tab-name {
  color: var(--white-bg-color);
  padding: 0 5px;
}

:deep(.ant-tabs-nav-operations) {
  background-color: var(--third-bg-color);
}

.more-icon {
  font-size: 30px;
  color: #fff;
}

.palm-editor {
  height: 100%;
  background: var(--color-bg-container);
}
</style>
