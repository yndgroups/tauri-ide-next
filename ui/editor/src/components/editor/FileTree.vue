<template>
  <FileTree />
</template>
<script setup lang="tsx">
import { onMounted } from 'vue';
import { FileOutlined, DownOutlined, RightOutlined } from '@ant-design/icons-vue';
import { readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { File } from '@/types';
import { useFileStore } from '@/store';
import { storeToRefs } from 'pinia';
const store = useFileStore();
const { file, fileList } = storeToRefs(store);

const props = defineProps({
  data: {
    type: Array<File>,
    default: () => {
      return new Array<File>();
    },
    required: true,
  },
});

/**
 * 数据
 */
const FileTree = () => {
  return render(props.data);
};

/**
 *
 *
 * @param item 当前选中的
 * @param el
 */
async function selected(item: any, el: any) {
  console.log(item, el, 'selected - current-file');
  el.stopPropagation();
  if (item.children && item.children.length) {
    if (item.expand === undefined) {
      item.expand = true;
    } else {
      item.expand = !item.expand;
    }
  }
  if (item.isFile) { // 读取文件并保存到缓存
    const contents = await readTextFile(item.path);
    store.setFileList({
      key: item.path,
      name: item.name,
      path: item.path,
      editStatus: true,
      fileContent: contents,
    })
  } else if (item.isDirectory) { // 追加或者读取下级目录
    const entries = await readDir(item.path);
    console.log(entries, '追加或者读取下级目录')
  }
}

// 渲染jsx模版
const render = (data: any, index: number = 0) => {
  index += 1;
  return (
    <dl
      class="file-tree"
      style={'--pw:' + index * 15 + 'px'}>
      {data.map((item: any) => {
        if (item.name === '.git' || item.name === 'node_modules') {
          return;
        }
        if (item.isDirectory && item.children && item.children.length > 0) {
          return (
            <>
              {item.name !== 'node_modules' ? (
                <>
                  <dt
                    onClick={(e) => selected(item, e)}
                    class={`tree-node ${item.expand ? 'switcher_open' : 'switcher_close'}`}>
                    {item.expand ? <DownOutlined /> : <RightOutlined />}
                    <span class="tree-title">{item.name}</span>
                  </dt>
                  <dd>{render(item.children, index)}</dd>
                </>
              ) : (
                <dt
                  onClick={(e) => selected(item, e)}
                  class="tree-node">
                  {item.expand ? <DownOutlined /> : <RightOutlined />}
                  <span class="tree-title">{item.name}</span>
                </dt>
              )}
            </>
          );
        } else {
          return (
            <>
              {index > 1 ? (
                <dt
                  onClick={(e) => selected(item, e)}
                  class="tree-node">
                  <FileOutlined />
                  <span class="tree-title">{item.name}</span>
                </dt>
              ) : (
                <dt
                  onClick={(e) => selected(item, e)}
                  class="tree-node">
                  <FileOutlined />
                  <span class="tree-title">{item.name}</span>
                </dt>
              )}
            </>
          );
        }
      })}
    </dl>
  );
};
</script>

<style lang="scss">
.file-tree {
  overflow: hidden;
  dl,
  dt,
  dd {
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  dt,
  dd {
    cursor: pointer;
  }

  .tree-title {
    padding-left: 5px;
  }
}
.tree-node {
  margin-left: var(--pw);
  cursor: pointer;
  height: 30px;
  line-height: 30px;

  &:hover {
    background-color: var(--third-bg-color);
  }

  &::before {
    content: '';
    display: inline-block;
    width: var(--pw);
  }
}
.switcher_open + dd {
  display: block;
}
.switcher_close + dd {
  display: none;
}
</style>
