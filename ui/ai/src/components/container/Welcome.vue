<template>
  <div class="page-welcome">
    <div class="text-center logo">LOGO</div>
    <h1 class="text-center">欢迎来到 OPENAI</h1>
    <div class="text-center desc">与AI智能聊天，畅想无限可能！基于先进的AI引擎，让你的交流更加智能、高效、便捷！</div>
    <div class="text-center"><a-button> Shift</a-button> + <a-button>Enter</a-button> 换行。开头输入 <a-button>/</a-button> 召唤 Prompt AI提示指令预设。</div>
    <div class="category">
      <a-row :gutter="20">
        <a-col v-for="(o, i ) in category" span="8" :key="i">
          <a-button class="category-item" block>{{o.name}}</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'Welcome',
});
const category = [
    { id: 1, name: '后勤工作' },
    { id: 2, name: '脏话小子' },
    { id: 3, name: '小说家' },
    { id: 4, name: '语言检测器' },
    { id: 5, name: '雅思作文考官' },
    { id: 6, name: 'GitHub Copilot' },
    { id: 7, name: '专业编辑员' },
    { id: 8, name: '心理医生' },
    { id: 9, name: '心灵导师' },
];
</script>
<style lang="scss" scoped>
.page-welcome {
  .logo {
    font-size: 20px;
    font-weight: 800;
    padding-top: 30px;
  }
  h1 {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .desc {
    padding-bottom: 20px;
  }
  .category {
    width: 60%;
    margin: 20px auto;
    &-item{
        margin-bottom: 20px;
    }
    ul {
      width: 100%;
      display: flex;
      li {
        width: calc(100% / 3);
        border: 1px solid #f3f3f3;
        text-align: center;
        border-radius: 10px;
        padding: 10px 20px;
      }
    }
  }
}
</style>
