<template>
  <ConfigProvider
    :locale="uiLocale"
    :theme="{
      algorithm: mainTheme,
    }">
    <MainLayout />
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider, Modal, RadioGroup, Radio, theme as antTheme, message } from 'ant-design-vue';
import { ref, reactive, onBeforeMount } from 'vue';
import { Theme, ThemeModeEnum } from '@/core/theme';
import { listen } from '@tauri-apps/api/event';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import es_ES from 'ant-design-vue/es/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MainLayout from './components/layout/MainLayout.vue';
import { useAppStore } from './store/index';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
const appStore = useAppStore();
locale.value = 'en';
dayjs.locale('zh-cn');
const mainTheme = ref(antTheme.defaultAlgorithm);
const uiLocale = ref({ locale: es_ES }) as any;

// 初始化主题
onBeforeMount(() => {
  changeTheme(appStore.getTheme());
  changeLanguage(appStore.getLang());
})

  // 主题切换
  // 默认算法 theme.defaultAlgorithm、暗色算法theme.darkAlgorithm、紧凑算法 theme.compactAlgorithm。
  listen('setTheme', (val: any) => {
    let nTheme = val.payload.replace('theme_', '');
    let theme = appStore.getTheme();
    if (theme === nTheme) {
      message.info(t('notice.themeChose'));
      return;
    }
    changeTheme(nTheme);
  });

function changeTheme(nTheme: string) {
  const themeInstance = new Theme(nTheme as ThemeModeEnum);
  appStore.setTheme(nTheme);
  themeInstance.themeChange(nTheme as ThemeModeEnum);
  switch (nTheme) {
    case 'light':
      mainTheme.value = antTheme.defaultAlgorithm;
      break;
    case 'dark':
      mainTheme.value = antTheme.darkAlgorithm;
      break;
    default:
      mainTheme.value = antTheme.defaultAlgorithm;
  }
}

// 修改语言
listen('changeLanguage', (val: any) => {
  let currentLang = appStore.getLang();
  if (currentLang === val.payload) {
    message.info(t('notice.langChose'));
    return;
  }
  changeLanguage(val.payload);
});

function changeLanguage(lang: string) {
  appStore.setLang(lang);
  locale.value = lang;
}
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  min-width: 1024px;
}
</style>
