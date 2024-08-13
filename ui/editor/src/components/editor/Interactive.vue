<template>
  <div class="cmd-interactive">
    <div class="tabs">
      <dl>
        <dt>
          <Tabs v-model:activeKey="state.activeKey">
            <TabPane
              :key="i"
              v-for="(o, i) in state.tabs">
              <template #tab>
                <span class="tab-name"><FileTextOutlined />{{ o.name }}</span>
              </template>
            </TabPane>
          </Tabs>
        </dt>
        <dd @click="tmAdd">+</dd>
      </dl>
    </div>
    <div class="bord">
      <Tabs v-model:activeKey="state.tm" tab-position="left">
            <TabPane
              :key="i"
              v-for="i in state.tms"
              pos>
              <template #tab>
                <span class="tab-name"><CodeOutlined />{{ i }}</span>
              </template>
              <Terminal/>
            </TabPane>
          </Tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FileTextOutlined, CodeOutlined } from '@ant-design/icons-vue';
import Terminal from './Terminal.vue';
import { Tabs, TabPane } from 'ant-design-vue';
import { getTerminalUniqueKeys } from '@tauri-apps/plugin-terminal';
const state = reactive({
  activeKey: '1',
  tm: null,
  tms: [],
  tabs: [
    { name: '问题', status: false },
    { name: '输出', status: false },
    { name: '调试控制台', status: false },
    { name: '终端', status: false },
    { name: '端口', status: false },
  ],
});

onMounted(async () => {
  let ls = getTerminalUniqueKeys()
  console.log(ls)
})

// 添加命令行
const tmAdd = async () => {
  let len = state.tms.length
  if (len > 0) {
    let lastId = state.tms[len - 1] + 1
    state.tms.push(lastId)
    state.tm = lastId
  } else {
    state.tms.push(1)
    state.tm = 1
  }
  let ls = await getTerminalUniqueKeys()
  console.log('getTerminalUniqueKeys => ', ls)
}
</script>
<style scoped lang="scss">
:deep(.ant-tabs) {
  background-color: var(--third-bg-color);
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
  overflow: hidden;
}

:deep(.ant-tabs-nav-operations) {
  background-color: var(--third-bg-color);
}
.cmd-interactive {
  height: var(--cmd-interactive-height);
  background-color: var(--third-bg-color);
  overflow: hidden;

  .tabs dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--third-bg-color);
    padding-right: 20px;
  }

  .tab-name {
    // color: var(--white-bg-color);
  }

  .bord {
    background-color: var(--color-bg-container);
    padding: 10px 0 10px 10px;
    height: var(--cmd-interactive-height);
    box-sizing: border-box;
  }
}
</style>
