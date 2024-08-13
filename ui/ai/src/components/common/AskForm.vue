<template>
  <div class="ask-form">
        <a-button
          :size="size"
          class="btn">
          <template #icon>
            <CloudDownloadOutlined />
          </template>
        </a-button>
        <a-button
          :size="size"
          class="btn">
          <template #icon>
            <CloudDownloadOutlined />
          </template>
        </a-button>
        <a-button
          :size="size"
          class="btn">
          <template #icon>
            <CloudDownloadOutlined />
          </template>
        </a-button>
        <a-textarea
          class="input"
          :size="size"
          v-model:value="text"
          placeholder="请输入"
          :auto-size="{ minRows: 1, maxRows: 3 }"
          ref="textAreaRef"
          @mouseout="onMouseout"/>
          <a-button
          :size="size"
          class="send-btn"
          :type="text ? 'primary': 'default'"
          :loading="loading"
          @click="sendData">
          <template #icon>
            <div class="btn-icon">
              <SendOutlined class="icon"/>
            </div>
          </template>
        </a-button>
  </div>
</template>
<script lang="ts" setup>
import { SendOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { ref } from 'vue';
import { sendAsk } from "@tauri-apps/plugin-ai" 
import { message } from 'ant-design-vue';
const size = ref<SizeType>('large');
const text = ref<string>('');
const loading = ref<boolean>(false)
const textAreaRef = ref()

/**
 * 发送数据
 */
const sendData = () => {
  if(!text.value) {
    message.warn('请输入内容')
    return
  }
  loading.value = true
  sendAsk(text.value.trim())

  setTimeout(() => {
    loading.value = false
  }, 3000);
}

// 离开输入框失去焦点
const onMouseout = () => {
  textAreaRef.value?.blur()
}
</script>
<style lang="scss" scoped>
.ask-form {
  display: flex;
  align-items: flex-end;
}
:deep(.input) {
  min-width: 500px;
}
.btn {
  width: 60px !important;
  margin-right: 8px;
}
.send-btn {
  margin-left: 5px;
  width: 70px !important;
  .icon {
    transform: rotate(-60deg);
    font-size: 22px;
  }
}
</style>
