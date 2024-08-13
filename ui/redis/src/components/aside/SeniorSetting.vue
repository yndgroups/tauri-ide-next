<template>
  <div class="pr-20">
    <a-form
      :model="formState"
      v-bind="layout"
      name="nest-messages"
      :validate-messages="validateMessages"
      @finish="onFinish">
      <div>
        <strong>建加载</strong>
      </div>
      <a-form-item label="默认过滤">
        <a-input v-model:value="formState.user.name" />
      </a-form-item>
      <a-form-item label="命名空间分隔符">
        <a-input v-model:value="formState.user.email" />
      </a-form-item>
      <div>
        <strong>设置超时和限制</strong>
      </div>
      <a-form-item label="连接超时">
        <a-input-number addon-before="+" addon-after="-"></a-input-number>
      </a-form-item>
      <a-form-item label="执行超时">
        <a-input-number addon-before="+" addon-after="-"></a-input-number>
      </a-form-item>
      <a-form-item
        label="数据库发现限制">
        <a-input-number addon-before="+" addon-after="-"></a-input-number>
      </a-form-item>
      <div>
        <strong>集群</strong>
      </div>
      <a-form-item
        label="修改集群重定向">
        <a-switch />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    name: '',
    age: undefined,
    email: '',
    website: '',
    introduction: '',
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>
