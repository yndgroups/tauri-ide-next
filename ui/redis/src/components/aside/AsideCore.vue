<template>
  <div class="aside-core overflow-hidden">
    <div class="bg-layout-color p-4 pt-2 pr-0 absolute z-10 top-0 h-12">
     <div class="bg-layout-color w-72 flex">
      <a-button
        type="dashed"
        class="flex-1"
        @click="handleCreateLink"
        >{{ $t('create.connect') }}</a-button
      >
      <a-button
        type="dashed"
        class="mx-2">
        <template #icon>
          <div class="mt-[-1px]">
            <SettingOutlined/>
          </div>
        </template>
      </a-button>
      <a-button
        type="dashed"
        >{{ $t('logs.btn') }}</a-button
      >
     </div>
    </div>
    <div class="p-2 pt-12 h-screen overflow-auto">
      <a-collapse
        v-model:activeKey="activeKey"
        accordion
       >
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <!-- 遍历host -->
        <a-collapse-panel
          v-for="(link, i) in state.linkList"
          :key="`${i}`">
          <template #header>
            <div
              class="flex"
              @click="createLinkHandler(link)">
              <div class="flex-1">{{ link.host + '@' + link.port }}</div>
              <div>
                <HomeOutlined
                  class="mr-1"
                  @click.stop="changeToHome" />
                <CodeOutlined
                  class="mr-1"
                  @click.stop="changeToTerminal" />
                <SyncOutlined
                  class="mr-1"
                  @click.stop="refresh" />
                <a-dropdown>
                  <AppstoreAddOutlined @click.stop="false"/>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item @click.stop="moreAction">
                        <div class="menu-item">关闭连接</div>
                      </a-menu-item>
                      <a-menu-item @click.stop="moreAction">
                        <div class="menu-item">编辑连接</div>
                      </a-menu-item>
                      <a-menu-item>
                        <div class="menu-item">删除连接</div>
                      </a-menu-item>
                      <a-menu-item>
                        <div class="menu-item">复制链接</div>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item>
                        <div class="menu-item">标记颜色</div>
                      </a-menu-item>
                      <a-menu-item>
                        <div class="menu-item">内存分析</div>
                      </a-menu-item>
                      <a-menu-item>
                        <div class="menu-item">慢查询</div>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item>
                        <div class="menu-item">清空当前库</div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </template>
          <div class="flex my-2">
            <a-select
              ref="select"
              v-model:value="state.selectDb"
              class="flex-1 mr-2">
              <a-select-option
                v-for="(db, dbi) in link.dbList"
                :value="dbi"
                >{{ db.name }}</a-select-option
              >
            </a-select>
            <a-button
              type="dashed"
              >新建Key</a-button
            >
          </div>
          <section class="px-5">
            <ul>
              <li
                class="py-2 border-dashed border-y"
                v-for="key in link.dbList[state.selectDb]['keys']"
                @click="selectedItem(`${link.host}_${link.port}_${state.selectDb}_${key}`)"
                :key="`${link.host}_${state.selectDb}_${key}`">
                {{ key }}
              </li>
            </ul>
          </section>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <CreateLink
      v-if="state.createLinkVisible"
      :visible="state.createLinkVisible"
      @closeModal="state.createLinkVisible = false" />
  </div>
</template>
<script lang="ts" setup>
import { SettingOutlined, CaretRightOutlined, HomeOutlined, CodeOutlined, SyncOutlined, AppstoreAddOutlined } from '@ant-design/icons-vue';
import { ref, reactive, onMounted } from 'vue';
import CreateLink from './CreateLink.vue';
import { createLink } from '@tauri-apps/plugin-redis';
import { message } from 'ant-design-vue';
import { LinkInfo } from '@/types';
import { useRedisCacheStore } from '@/store';
let emits = defineEmits(['change']);
defineOptions({
  name: 'AsideCore',
});
const redisCacheStore = useRedisCacheStore();
let activeKey = ref('1');
let state = reactive({
  selectDb: 0,
  linkList: redisCacheStore.getLinkList(),
  createLinkVisible: false,
});

onMounted(() => {
    for(let i = 0; i < 20; i++) {
      redisCacheStore.addLink({
      host: '10.37.129.11',
      port: 6379,
      password: 'Ynd2025',
      db: 0,
      dbList: [
        {
          name: 'db0',
          keys: ['a1', 'a2'],
        },
        {
          name: 'db1',
          keys: ['a3', 'a4'],
        },
      ],
    })
    }
    state.linkList = redisCacheStore.getLinkList();
    // console.log(redisCacheStore.getLinkList())
})

async function changeToHome() {
  message.warn('首页');
}

async function changeToTerminal() {
  message.warn('终端');
}

async function refresh() {
  message.warn('刷新');
}

async function moreAction() {
  message.warn('更多功能');
}

async function createLinkHandler(link: LinkInfo) {
  let hide = message.loading('连接中...', 0);
  let resp = await createLink({
    host: link.host,
    port: link.port,
    password: link.password,
    db: link.db,
  }) as any;
  hide();
  console.log(resp, 'resp');
  if (resp.code === 1) {
    redisCacheStore.setCurrentClineUuid(resp.data)
    message.success('连接成功');
  } else {
    message.error('连接失败:' + resp.errMsg);
  }
}

// 选择当前项
function selectedItem(val: string) {
  emits('change', val);
}

function handleCreateLink() {
  state.createLinkVisible = true;
}
</script>
<style lang="scss" scoped>
:deep(.ant-collapse) {
  border: none !important;
}
:deep(.ant-collapse-item) {
  border: none !important;
}

:deep(.ant-collapse-expand-icon) {
  float: right;
  display: none;
}
</style>
