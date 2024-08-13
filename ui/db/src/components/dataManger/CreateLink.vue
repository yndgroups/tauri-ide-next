<template>
  <div class="create-link">
    <Modal
      v-model:open="state.visible"
      title="创建连接"
      @cancel="cancel"
      width="60%"
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
            v-for="o in state.dbTypeList"
            :key="o.value"
            :tab="o.name">
            <Row :gutter="40">
              <Col
                :span="6"
                v-for="(item, index) in dbList">
                <div
                  class="list-item"
                  @click="checkedDbType(item)"
                  :class="{ active: state.checkedDbType === item.name }">
                  <div class="icon">
                    <PalmSvg
                      :name="item.icon"
                      :key="index"
                      :width="40"
                      :height="40" />
                  </div>
                  <p class="db-name">{{ item.name }}</p>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Form
          v-if="state.step == 1"
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
          <FormItem :wrapper-col="{ span: 16, offset: 4 }">
            <div class="fl">
              <Button
                @click="testLinkHandle"
                class="mg-r10"
                >测试连接</Button
              >
            </div>
            <div class="fr">
              <Button
                @click="cancel"
                class="mg-r10"
                >取消</Button
              >
              <Button
                type="primary"
                @click="onSubmit"
                >确定</Button
              >
            </div>
          </FormItem>
        </Form>
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
import { Response } from '@/types';
import PalmSvg from '@/components/common/PalmSvg.vue';
import type { Rule } from 'ant-design-vue/es/form';
import { testLink } from '@tauri-apps/plugin-mysql';
import { saveLink } from '@tauri-apps/plugin-sqlite';
import { useCacheStore } from '@/store';
let emits = defineEmits(['closeModal', 'refresh']);
let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
// 缓存
const cache = useCacheStore()

let state = reactive<any>({
  visible: props.visible,
  activeKey: 'all',
  step: 0,
  mode: 'left' as any,
  checkedDbType: '',
  dbTypeList: [
    {
      name: '全部',
      value: 'all',
    },
    {
      name: '关系型数据库',
      value: 'relational',
    },
    {
      name: 'noSQL',
      value: 'noSQL',
    },
  ],
  dbList: [
    { name: 'MySQL', icon: 'mysql', type: '2' },
    { name: '达梦', icon: 'dmdb', type: '3' },
    { name: '人大金仓', icon: 'kingBase', type: '4' },
    { name: 'Sqlite', icon: 'sqlite', type: '5' },
    { name: 'MariaDb', icon: 'mariaDb', type: '6' },
    { name: 'Oracle', icon: 'oracle', type: '7' },
    { name: 'PostgreSQL', icon: 'postgreSQL', type: '8' },
    { name: 'MongoDB', icon: 'mongoDB', type: '9' },
  ],
  items: [
    {
      title: '数据库类型',
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
const formState = reactive<{ [key: string]: any }>({
  pid: 0,
  id: 0,
  name: 'linux-text',
  type: 'mysql',
  host: '10.211.55.10',
  user: 'root',
  password: 'Ynd@2025',
  port: 3306,
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
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      formState.dbType = state.checkedDbType;
      console.log('values', formState, toRaw(formState));
      let res = await saveLink(formState as any);
      console.log(res, 'res');
      let { code, msg, data }: Response = await saveLink(formState as any)
      console.log(code, msg, data);
      if (code === 1) {
        emits('refresh');
        emits('closeModal');
        message.success(msg);
      } else {
        message.error(msg);
      }
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};

// 测试连接
const testLinkHandle = async () => {
  let { code, msg }: Response = await testLink({
    host: formState.host,
    user: formState.user,
    password: formState.password,
    dbType: '1',
    port: formState.port,
    name: formState.name,
  });
  state.errMsg = msg;
  code === 1 ? message.success(msg) : (state.open = true);
};

const dbList = computed(() => {
  if (state.activeKey == 'all') {
    return state.dbList;
  } else {
    return state.dbList.filter((item: any) => item.type === state.activeKey);
  }
});

const checkedDbType = (item: any) => {
  state.checkedDbType = item.icon;
  state.step = 1;
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
