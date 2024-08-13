<template>
  <div class="display-error">
    <div class="title">执行结果</div>
    <div class="content">
      {{ errText }}
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  errText: {
    type: String,
    default: '',
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.display-error {
  border: 1px solid #f3f3f3;
  min-height: 300px;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;

  .title {
    color: #ff0000;
    padding-bottom: 10px;
    font-size: 20px;
  }

  .content {
    color: #ff0000;
    font-size: 14px;
  }
}
</style>
