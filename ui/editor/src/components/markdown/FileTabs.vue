<template>
  <div class="file-tabs-container">
    <div class="action">
      <slot name="action"></slot>
    </div>
    <div class="tab-box">
      <div class="file-tabs">
        <Tabs
          v-model:activeKey="store.activeKey"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @change="onChage">
          <TabPane
            v-for="(pane, index) in fileList"
            :key="index"
            :closable="pane.closable">
            <template #tab>
              <span>
                {{ pane.name }}
              </span>
              <span
                v-if="pane.editStatus"
                class="edit-status"></span>
            </template>
          </TabPane>
        </Tabs>
      </div>
      <div class="path">
        <template v-if="fileList && fileList[store.activeKey]">
          {{ fileList[store.activeKey].path }}
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { Tabs, TabPane } from 'ant-design-vue';
// import { useFileStoreWithOut } from '../store/file';
import { confirm } from '@tauri-apps/plugin-dialog';
const store = {} as any; //useFileStoreWithOut();
const fileList = []; // store.fileList as any;

function onChage(val: string) {
  console.log(val)
  // if (store.fileList[val].path === store.file.path) {
  //   return;
  // }
  // store.file = store.fileList[val];
}

// 删除
const remove = async (index: number) => {
  if (store.fileList[index].editStatus) {
    const res = await confirm('文件还未保存，确定删除吗?', {
      title: '关闭提示',
      kind: 'warning',
      okLabel: '确定',
      cancelLabel: '取消',
    });
    if (res) {
      store.removeFileList(index);
    }
  } else {
    store.removeFileList(index);
  }
};

const onEdit = (targetKey: any) => {
  remove(targetKey);
};
</script>
<style lang="scss">
.file-tabs-container {
  overflow: hidden;
  height: 80px;
  display: flex;
  align-items: center;

  :deep(.ant-tabs) {
    overflow: hidden;
    padding: 0;
  }
  :deep(.ant-tabs-nav) {
    padding: 0;
  }
  :deep(.ant-tabs-nav::before) {
    overflow: hidden;
    display: none;
  }
  :deep(.ant-tabs-content-holder) {
    display: none;
  }

  .action {
    padding-right: 5px;
  }

  .tab-box {
    height: 50px;
    flex-direction: column;
    flex: 1;
    width: 70vw;
  }
  .file-tabs {
    height: 60px;
    overflow: hidden;
  }
  .path {
    font-size: 12px;
  }
}
</style>
