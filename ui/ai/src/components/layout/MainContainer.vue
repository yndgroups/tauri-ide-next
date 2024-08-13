<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">对话</a-menu-item>
        <a-menu-item key="2">GPT-4-PLUS</a-menu-item>
        <a-menu-item key="3">邀请</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff">
        <!-- <LeftMenu /> -->
        <DialogBox />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="container">
          <div class="content" :style="{
            height: height
          }">
            <component :is="comps[currentComponent]"></component>
          </div>
          <div
            ref="askForm"
            class="ask-form-box">
            <AskForm />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import AskForm from '../common/AskForm.vue';
import LeftMenu from '../common/LeftMenu.vue';
import DialogBox from '../aside/DialogBox.vue';
import Welcome from '../container/Welcome.vue';
import { ref, nextTick, computed } from 'vue';
const askForm = ref();
let currentComponent = ref(Welcome.name);
const selectedKeys1 = ref<string[]>(['2']);
const comps = {
  [Welcome.name]: Welcome,
};
let askFormHeight = ref(60)

const height = computed(() => `calc(100% - ${askFormHeight.value}px)`)

nextTick(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { height } = entry.contentRect;
      // 这里可以执行你需要的操作，比如更新数据或调用方法
      handleHeightChange(height);
    }
  });
  resizeObserver.observe(askForm.value);
});

const handleHeightChange = (height) => {
  console.log('DOM height changed to:', height);
  // 这里可以根据高度变化进行相应的处理
  askFormHeight.value = height
};
console.log(Welcome.name, 'xxx1x');
</script>
<style scoped>
.header {
  background-color: var(--color-bg-container);
  padding: 0;
  margin: 0;
}
:deep(.container) {
  background: var(--color-bg-container);
  padding: '24px';
  margin: 10px;
  min-height: 350px;
  height: calc(100vh - 1200px);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.content {
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
}
.ask-form-box {
  position: absolute;
  bottom: 0;
  background-color: var(--color-bg-elevated);
  border-top: 1px dashed var(--color-border);
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
