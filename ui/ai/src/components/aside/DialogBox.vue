<template>
  <div class="dialog-box">
    <div class="actions">
        <a-button type="dashed" class="mg-r5 mg-b5">新建对话</a-button>
        <a-button type="dashed" class="mg-r5 mg-b5">AI提示指令</a-button>
        <a-button type="dashed" class="mg-b5">AI角色</a-button>
        <a-button type="dashed" class="mg-r5 mg-b5">智能插件</a-button>
        <a-button type="dashed" class="mg-r5 mg-b5">会话配置</a-button>
        <a-button type="dashed" class="mg-b5">清除会话</a-button>
    </div>
    <div class="dialog-history">
        <a-button block class="mg-b5" v-for="i in 20">
          <CommentOutlined />
          <span>新建对话{{ i }}</span>
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CommentOutlined } from '@ant-design/icons-vue'
defineOptions({
  name: 'DialogBox'
})
</script>
<style lang="scss">
.dialog-box {
    padding: 10px;
    background-color: var(--color-bg-elevated);
    .dialog-history {
        height: calc(100vh - 160px);
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>