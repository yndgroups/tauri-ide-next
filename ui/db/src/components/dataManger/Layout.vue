<template>
  <div class="workspace">
    <!-- 菜单 -->
    <div class="menu-tree">
      <div class="actions">
        <div class="search-box">
          <InputSearch
            primary
            v-model:value.trim="keyword"
            placeholder="请输入"
            size="small"
            @search="onSearch" />
        </div>
        <Button
          :border="false"
          type="text"
          class="mg-r5"
          @click="openLinkForm"
          ><template #icon><PlusSquareOutlined /></template
        ></Button>
      </div>
      <DataTree
        v-if="appCache.getMenu('1') && appCache.getMenu('1').length"
        :data="appCache.getMenu('1')" />
    </div>
    <div class="divider"></div>
    <!-- 数据库管理 -->
    <div class="app-core">
      <WorkPanel />
    </div>
    <CreateLink
      v-if="visible"
      :visible="visible"
      @closeModal="visible = false" />
  </div>
</template>
<script setup lang="ts">
import DataTree from './DataTree.vue';
import CreateLink from './CreateLink.vue';
import { InputSearch, Button } from 'ant-design-vue';
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import WorkPanel from './WorkPanel.vue';
import { useCacheStore } from '@/store';
import { getLinks } from '@tauri-apps/plugin-sqlite';
const keyword = ref<string>('');
const visible = ref(false);
const appCache = useCacheStore()

onMounted(() => {
  // console.log(appCache, 'appCache')
  // let dataTreeList = new Array<TreeItem>() as any
  // dataTreeList.push({
  //   value: '1',
  //   label: 'mysql',
  //   type: 1,
  //   children: [
  //     {
  //       value: '2',
  //       label: 'host1',
  //       type: 1,
  //       children: [],
  //       expand: true,
  //     },
  //     {
  //       value: '3',
  //       label: 'host2',
  //       type: 1,
  //       children: [],
  //       expand: true,
  //     },
  //   ],
  //   expand: true,
  // });
  // dataTreeList.push({
  //   value: '1',
  //   label: 'redis',
  //   type: 1,
  //   children: [
  //     {
  //       value: '2',
  //       label: 'host1',
  //       type: 1,
  //       children: [],
  //       expand: true,
  //     },
  //     {
  //       value: '3',
  //       label: 'host2',
  //       type: 1,
  //       children: [],
  //       expand: true,
  //     },
  //   ],
  //   expand: true,
  // });
  // appCache.addMenu('1', dataTreeList)
  getDbLink()
});

async function getDbLink() {
  let {code, data, msg } = await getLinks();
  console.log(code, data, msg, 'xxx11')
 let tree = toTree(data, 0)
 console.log(tree, 'treetree')
}

// 打开链接表单
function openLinkForm() {
  visible.value = true;
}

function toTree(arr, parentId) {
  function loop(parentId) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]

      if (item.pid !== parentId) {
        continue
      }

      item.children = loop(item.id)
      res.push(item)
    }
    return res
  }
  return loop(parentId)
}

// @ts-ignore
const onSearch = () => {
  console.log('onSearch');
};
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

  .search-box {
    padding: 5px 10px;
  }

  .workspace {
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
  .menu-tree {
    width: var(--file-tree-width);
    height: calc(100vh - var(--top-header-height));
    background-color: var(--deep-bg-color);
    overflow-y: overlay;
    box-sizing: border-box;
    overflow-x: hidden;

    .actions {
      margin-top: 5px;
      display: flex;
      align-items: center;
    }
  }

  .app-core {
    background-color: var(--color-bg-container);
    width: calc(100vw - var(--file-tree-width));
    box-sizing: border-box;
  }
}
</style>
