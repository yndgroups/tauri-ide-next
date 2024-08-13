<template>
  <div class="work-panel">
    <div ref="editorDom">测试</div>
  </div>
</template>
<script setup lang="ts">
import 'vditor/src/assets/less/index.less';
import {onMounted, onBeforeUnmount, ref, nextTick} from 'vue';
const editorDom = ref();
const editor = ref();
import vditor from 'vditor';
onMounted(() => {
  console.log('初始化应用')
  nextTick(() => {
    init('x')
  })
})

function init(content:string) {
  editor.value = new vditor(editorDom.value, {
    value: content,
    cache: {
      enable: false,
    },
    placeholder: '输入内容',
    toolbar: [],
    after: () => {
      editor.value.setValue(content);
      editor.value.updateValue = (val: any) => {
        console.log(val, 'xxxx');
      };
    },
    input() {
      // console.log('xxx');
      // file.value.fileContent = editor.value.getValue();
      // console.log(editor.value.getValue());
      // file.value.editStatus = true;
    },
    height: '80vh',
    width: '100%',
  });
  // initVditor('zh_CN');
}

onBeforeUnmount(() => {
  console.log("销毁组件")
})
</script>
<style scoped lang="scss">
.work-panel {
  padding: 0px 20px;
  box-sizing: border-box;
  width: calc(100vw - 350px);
}
</style>
