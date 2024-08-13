<template>
  <DataTree />
</template>
<script setup lang="tsx">
import { onMounted } from 'vue';
import { FileOutlined, CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons-vue';
import { readTextFile } from '@tauri-apps/plugin-fs';
import { TreeItem } from '@/types';
const props = defineProps({
  data: {
    type: Array<TreeItem>,
    default: () => {
      return new Array<TreeItem>();
    },
    required: true,
  },
});
const emits = defineEmits(['openFile']);

const DataTree = () => {
  // console.log(props.data, 'datadatadatadata');
  return render(props.data);
};

function selected(item: any, el: any) {
  console.log(item, 'itemitem');
  el.stopPropagation();
  if (item.children && item.children.length) {
    if (item.expand === undefined) {
      item.expand = true;
    } else {
      item.expand = !item.expand;
    }
  } else {
    openFile(item);
  }
}

async function openFile(item: any) {
  const contents = await readTextFile(item.path);
  item.fileContent = contents;
  console.log(contents, 'contents');
  emits('openFile', item);
}

// 渲染jsx模版
const render = (data: any, index: number = 0) => {
  // console.log(data, 'data');
  index += 1;
  return (
    <dl
      class="file-tree"
      style={'--pw:' + index * 15 + 'px'}>
      {data.map((item: any) => {
        if (item.name === '.git') {
          return;
        }
        if (item.children && item.children.length > 0) {
          return (
            <>
              <dt
                onClick={(e) => selected(item, e)}
                class={`tree-node ${item.expand ? 'switcher_open' : 'switcher_close'}`}>
                {item.expand ? <CaretDownOutlined /> : <CaretRightOutlined />}
                <span class="tree-title">{item.label}</span>
              </dt>
              <dd>{render(item.children, index)}</dd>
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
                  <span class="tree-title">{item.label}</span>
                </dt>
              ) : (
                <dt
                  onClick={(e) => selected(item, e)}
                  class="tree-node">
                  <FileOutlined />
                  <span class="tree-title">{item.label}</span>
                </dt>
              )}
            </>
          );
        }
      })}
    </dl>
  );
};

onMounted(async () => {});
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
    color: var(--color-text);
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
  height: 35px;
  line-height: 35px;

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
