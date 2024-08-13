<template>
  <div class="page-data-table">
    {{ tabList }}
    <a-tabs
      v-model:activeKey="activeKey"
      :tab-position="mode"
      :style="{ height: '200px' }"
      @tabScroll="callback">
      <a-tab-pane
        v-for="(o, i) in tabList"
        :key="i">
        <template #tab>
          <span>
            <AppleOutlined />
            {{o.key}}@{{o.prot}} | {{o.name}}
          </span>
        </template>
        Content of tab {{ i }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsProps } from 'ant-design-vue';
import { AppleOutlined } from '@ant-design/icons-vue';
import { useRedisCacheStore } from '@/store';
import { onMounted, watch } from 'vue';
import { get, set } from '@tauri-apps/plugin-redis'
import app from '@/store/app';
import ContentHash from './ContentHash.vue';
import ContentList from './ContentList.vue';
import ContentSet from './ContentSet.vue';
import ContentZSet from './ContentZSet.vue';
import ContentString from './ContentString.vue';
import ContentStream from './ContentStream.vue';
const redisCacheStore = useRedisCacheStore();
const components = {
  [ContentHash.name]: ContentHash,
  [ContentList.name]: ContentList,
  [ContentSet.name]: ContentSet,
  [ContentZSet.name]: ContentZSet,
  [ContentString.name]: ContentString,
  [ContentStream.name]: ContentStream,
};
console.log(components, 'components')
defineOptions({
  name: 'MainContainer',
});
const tabList = redisCacheStore.getTabList();
const mode = ref<TabsProps['tabPosition']>('top');
const activeKey = ref(1);

watch(() => redisCacheStore.getCurrentClineUuid(), async (val) => {
  console.log(val, 'getCurrentClineUuid')
  let res = await get(val, 'a111')
  let s = await set(val, 'a1111', '111')
  redisCacheStore.addTab({
    key: '192.168.1.1',
    icon: 'appstore-add',
    name: 'redis1',
    prot: 3306
  })
  console.log(res, 'get ---- res')
})

onMounted(() => {
});

const callback = (val) => {
  console.log(val);
};
</script>
<style lang="scss" scoped>
.page-data-table {
  padding: 10px;
}
</style>
