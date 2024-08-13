<template>
  <ConfigProvider
    :locale="locale"
    :theme="{
      algorithm: mainTheme,
    }">
    <MainContainer />
    <Modal
      v-model:open="state.open"
      title="主题切换"
      @ok="handleOk"
      width="300px">
      <RadioGroup v-model:value="state.theme">
        <Radio
          :style="radioStyle"
          :value="item.theme"
          v-for="(item, index) in state.list"
          :key="index">
          <div>{{ item.name }}</div>
        </Radio>
      </RadioGroup>
    </Modal>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider, Modal, RadioGroup, Radio, theme as antTheme } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import { Theme, ThemeModeEnum } from '@/core/theme';
import { listen } from '@tauri-apps/api/event';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MainContainer from './components/layout/MainContainer.vue';
dayjs.locale('zh-cn');
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
const state = reactive({
  open: false,
  theme: 'light',
  list: [
    { theme: 'light', name: '亮色' },
    { theme: 'dark', name: '黑色' },
  ],
});
const mainTheme = ref(antTheme.defaultAlgorithm);
const locale = ref({ locale: zhCN }) as any;
const theme = new Theme(ThemeModeEnum.light);

// 默认算法 theme.defaultAlgorithm、暗色算法theme.darkAlgorithm、紧凑算法 theme.compactAlgorithm。
function handleOk() {
  changeTheme(theme, state.theme);
  switch (state.theme) {
    case 'light':
      mainTheme.value = antTheme.defaultAlgorithm;
      break;
    case 'dark':
      mainTheme.value = antTheme.darkAlgorithm;
      break;
    default:
      mainTheme.value = antTheme.defaultAlgorithm;
  }
  state.open = false;
}

// 监听切换
listen('setTheme', () => {
  state.open = true;
});

// 切换主题
function changeTheme(theme: Theme, mode: string) {
  theme.themeChange(mode as any);
}
</script>
