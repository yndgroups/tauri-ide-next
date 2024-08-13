<template>
  <div class="create-link w-24">
    <Modal
      v-model:open="state.visible"
      :title="$t('create.connect')"
      @cancel="cancel"
      width="60%"
      style="min-width: 860px;"
      :footer="false">
      <div class="steps">
        <Step
          v-model:current="state.step"
          :items="state.items"></Step>
      </div>
      <div class="form">
        <Tabs
          v-if="state.step == 0"
          v-model:activeKey="state.activeKey"
          :tab-position="state.mode"
          @tabScroll="callback">
          <TabPane
            v-for="o in state.tabTypeList"
            :key="o.value"
            :tab="$t(o.name)">
            <HowToConnect v-if="state.activeKey === 'howToConnect'">{{ o.name }}</HowToConnect>
            <ConnectForm v-if="state.activeKey === 'linkSetting'"></ConnectForm>
            <SeniorSetting v-if="state.activeKey === 'bestSetting'">{{ o.name }}</SeniorSetting>
          </TabPane>
        </Tabs>
      </div>
    </Modal>

    <Modal
      v-model:open="state.open"
      @ok="state.open = false">
      <template #title>
        <div class="err-title">
          <ExclamationCircleOutlined />
          <span>连接失败提示提示</span>
        </div>
      </template>
      <p class="err-content">{{ state.errMsg }}</p>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, toRaw } from 'vue';
import { h } from 'vue';
import { StepProps, message, Modal, Step, Tabs, TabPane, Form, FormItem, Row, Col, Button, Input } from 'ant-design-vue';
import { ExclamationCircleOutlined, AppstoreAddOutlined, ClusterOutlined } from '@ant-design/icons-vue';
import type { TabsProps } from 'ant-design-vue';
import { LinkInfo, Response } from '@/types';
import PalmSvg from '@/components/common/PalmSvg.vue';
import type { Rule } from 'ant-design-vue/es/form';
import { testLink } from '@tauri-apps/plugin-redis';
import { useRedisCacheStore } from '@/store';
import HowToConnect from './HowToConnect.vue';
import SeniorSetting from './SeniorSetting.vue';
import ConnectForm from './ConnectForm.vue';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const  { t } = useI18n()
let emits = defineEmits(['closeModal', 'refresh']);
let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
// 缓存
const redisCacheStore = useRedisCacheStore();
let state = reactive<any>({
  visible: props.visible,
  activeKey: 'howToConnect',
  step: 0,
  mode: 'left' as any,
  checkedDbType: '',
  tabTypeList: [
    {
      name: 'create.howToConnect',
      value: 'howToConnect',
    },
    {
      name: 'create.linkSetting',
      value: 'linkSetting',
    },
    {
      name: 'create.advancedSetting',
      value: 'bestSetting',
    },
  ],
  items: [
    {
      title: '高级设置',
      icon: h(AppstoreAddOutlined),
    },
    {
      title: '连接信息',
      icon: h(ClusterOutlined),
    },
  ] as StepProps[],
  open: false,
  errMsg: '',
});
onMounted(() => {
  
});

const formState = ref<LinkInfo>({
  name: 'redis',
  user: 'root',
  host: '10.37.129.11',
  port: 6379,
  password: 'ynd@2025',
  db: 0,
});

const callback: TabsProps['onTabScroll'] = (val) => {
  console.log(val);
};

// 取消
const cancel = () => {
  for (let k in formState) {
    formState[k] = '';
  }
  emits('closeModal');
};
</script>
<style lang="scss" scoped>
.steps {
  padding: 10px 150px;
  border-bottom: 1px solid #f2f2f2;
}

.err-title {
  color: #ff0000;
  span {
    padding-left: 10px;
  }
}
.err-content {
  color: #ff0000;
  padding: 0 20px;
}

.list-item {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border: 1px dashed #e3dfdf;
  border-radius: 8px;

  .icon {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .db-name {
    margin-top: 10px;
    font-weight: bold;
    color: #666060;
    font-size: 16px;
  }

  &:hover {
    border: 1px solid var(--color-border);
    cursor: pointer;
  }
  &.active {
    border: 1px solid var(--color-border);
  }
}
.form {
  padding: 30px 0 30px 0;
}
</style>
