<template>
  <div class="flex bg-layout-color flex-row h-full overflow-hidden min-h-screen">
    <div class="basis-1/4 h-full overflow-y-auto">
      <AsideCore @change="onChangeHandler" />
    </div>
    <div class="basis-3/4 h-full p-2 overflow-hidden border-radius-md">
      <div class="h-full overflow-y-auto">
        <MainContainer/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { get } from '@tauri-apps/plugin-redis';
import AsideCore from '../aside/AsideCore.vue';
import Welcome from '../container/Welcome.vue';
import MainContainer from '../container/MainContainer.vue';
import { ref, nextTick, computed } from 'vue';
const askForm = ref();
const comps = {
  [`${Welcome.name}`]: Welcome,
  [`${MainContainer.name}`]: MainContainer,
} as any;
let askFormHeight = ref(60);
const height = computed(() => `calc(100% - ${askFormHeight.value}px)`);
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

/* 获取点击事件的内容 */
const onChangeHandler = async (val) => {
  console.log(val, 'xxxxxxx');
  let dresp = await get('a1', 'a111');
  console.log('dresp = ', dresp);
};

const handleHeightChange = (height) => {
  console.log('DOM height changed to:', height);
  // 这里可以根据高度变化进行相应的处理
  askFormHeight.value = height;
};

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
  if (e.detail == 2) {
    // 鼠标滚轮的按下，滚动不触发
    return false;
  }
  if (e.detail == 3) {
    // 鼠标右键
    return false;
  }
};
</script>
