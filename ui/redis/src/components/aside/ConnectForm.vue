<template v-if="state.activeKey === 'linkSetting'">
  <Form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol">
    <FormItem
      ref="name"
      label="连接名称"
      required
      name="name">
      <Input
        v-model:value="formState.name"
        autocomplete="false"
        placeholder="请输入连接名称"
        autocapitalize="off" />
    </FormItem>
    <FormItem
      label="主机地址"
      required
      name="host">
      <Input
        v-model:value="formState.host"
        autocomplete="false"
        placeholder="请输入主机地址" />
    </FormItem>
    <FormItem
      label="端口"
      required
      name="port">
      <Input
        v-model:value="formState.port"
        autocomplete="false"
        placeholder="请输入端口" />
    </FormItem>
    <FormItem
      label="用户名"
      required
      name="host"
      placeholder="请输入用户名">
      <Input
        v-model:value="formState.user"
        autocomplete="false" />
    </FormItem>
    <FormItem
      label="密码"
      required
      name="password"
      placeholder="请输入密码">
      <Input
        v-model:value="formState.password"
        autocomplete="false" />
    </FormItem>
    <FormItem :wrapper-col="{ span: 15, offset: 4 }">
      <div class="flex justify-between">
        <Button
          @click="testLinkHandle"
          >测试连接</Button
        >
      <div class="fr">
        <Button
          @click="cancel"
          class="mr-5"
          >取消</Button
        >
        <Button
          type="primary"
          @click="onSubmit"
          >确定</Button
        >
      </div>
      </div>
    </FormItem>
  </Form>
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
let emits = defineEmits(['closeModal', 'refresh']);
let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
// 缓存
const cache = useRedisCacheStore();

let state = reactive<any>({
  visible: props.visible,
  activeKey: 'howToConnect',
  step: 0,
  mode: 'left' as any,
  checkedDbType: '',
  tabTypeList: [
    {
      name: '怎么连接',
      value: 'howToConnect',
    },
    {
      name: '连接设置',
      value: 'linkSetting',
    },
    {
      name: '高级设置',
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

const formRef = ref();
const labelCol = { span: 6 };
const wrapperCol = { span: 13 };
const formState = ref<LinkInfo>({
  name: 'redis',
  user: 'root',
  host: '10.37.129.11',
  port: 6379,
  password: 'ynd@2025',
  db: 0,
});
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: '请输入连接名称', trigger: 'blur' },
    { min: 5, max: 50, message: '长度5-50位', trigger: 'blur' },
  ],
  host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
  port: [{ required: true, message: '请输入端口', trigger: 'blur' }],
  user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

// 保存信息
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      // formState.dbType = state.checkedDbType;
      // console.log('values', formState, toRaw(formState));
      // let res = await saveLink(formState as any);
      // console.log(res, 'res');
      // let { code, msg, data }: Response = await saveLink(formState as any);
      // console.log(code, msg, data);
      // if (code === 1) {
      //   emits('refresh');
      //   emits('closeModal');
      //   message.success(msg);
      // } else {
      //   message.error(msg);
      // }
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};

// 测试连接
const testLinkHandle = async () => {
  let resp = await testLink(formState.value);
  if (resp.code === 1) {
    message.success('连接成功');
  } else {
    message.error('连接失败:' + resp.errMsg);
  }
};

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
