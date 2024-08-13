<template>
  <div class="how-link">
    <dl>
      <dt><strong>{{ $t('create.p1') }}</strong></dt>
      <dd>
        <a-input-group compact>
          <a-input
            v-model:value="state.path"
            style="width: calc(100% - 200px)" />
          <a-button type="primary">{{ $t('create.import') }}</a-button>
        </a-input-group>
      </dd>
      <dd class="py-2">
        <p>{{ $t('create.p2') }}</p>
      </dd>

      <dl class="pt-4">
        <dt>
          <strong>{{ $t('create.t1') }}</strong>
        </dt>
        <dd class="pt-2 text-center">
          <a-row :gutter="20">
            <a-col :span="6" v-for="(o, i) in state.navigatorList" :key="i">
              <div class="border-dashed border py-3 my-1 border-sky-700 text-sky-700 hover:border-red-500 hover:text-red-500 cursor-pointer">{{o.name}}</div>
            </a-col>
          </a-row>
        </dd>
      </dl>
    </dl>

    <div class="pt-5">
      <h1 class="pb-2">
        <strong>{{ $t('create.p3') }}</strong>
      </h1>
      <p>
        <span class="pr-5 text-sky-700 hover:text-red-500 cursor-pointer">{{ $t('create.p4') }}</span>
        <span class="pr-5 text-sky-700 hover:text-red-500 cursor-pointer">{{ $t('create.p5') }}</span>
        <span class="text-sky-700 hover:text-red-500 cursor-pointer">{{ $t('create.p6') }}</span>
      </p>
    </div>

    <div class="pt-5">
      <h1 class="pb-2">
        <strong>{{ $t('create.p7') }}</strong>
      </h1>
      <p>
        <span  v-for="(o, i) in state.companyList" :key="i"
          @click="openWindow(o)"
          class="pr-5 text-sky-700 hover:text-red-500 cursor-pointer"
          >{{ o.name }}</span
        >
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { Window } from '@tauri-apps/api/window';
import { Webview } from '@tauri-apps/api/webview';
import { message } from 'ant-design-vue';
import  { type Company } from '@/types';
const state = reactive({
  path: '',
  windows: {},
  uniqueLabels: [],
  navigatorList: [
    {id: 1, name: '本地或对外的Redis', url: 'https://redis.io/insight/#connect-to-a-local-or-public-redis-server', introduce: '本地或对外的Redis'},
    {id: 2, name: '使用SSL/TSL的Redis', url: 'https://redis.io/insight/#connect-to-a-public-redis-server-with-ssl', introduce: '使用SSL/TSL的Redis'},
    {id: 3, name: 'SSH通道', url: 'https://redis.io/insight/#connect-to-private-redis-server-via-ssh-tunnel', introduce: 'SSH通道'},
    {id: 4, name: 'UNIX套接字', url: 'https://redis.io/insight/#connect-to-a-unix-socket', introduce: 'UNIX套接字'},
    {id: 5, name: '阿里云', url: 'https://www.aliyun.com/product/redis', introduce: '云数据库 Redis 版'},
    {id: 6, name: '华为云', url: 'https://www.huaweicloud.com/s/JXJlZGlzJQ', introduce: '分布式缓存服务Redis版'},
    {id: 7, name: '腾讯云', url: 'https://www.tencentcloud.com/zh/products/crs', introduce: '云数据库 Redis'},
  ],
  companyList: [
    {id: 1, name: '阿里云', url: 'https://www.aliyun.com/product/redis', product: '云数据库 Redis 版'},
    {id: 2, name: '华为云', url: 'https://www.huaweicloud.com/s/JXJlZGlzJQ', product: '分布式缓存服务Redis版'},
    {id: 3, name: '腾讯云', url: 'https://www.tencentcloud.com/zh/products/crs', product: '云数据库 Redis'}
  ]
});


function openWindow(o: Company) {
  let uniqueLabel = `label-${o.id}`
  if (!state.uniqueLabels.includes(uniqueLabel)) {
    state.uniqueLabels.push(uniqueLabel);
    const appWindow = new Window(uniqueLabel, {
      title: o.name,
    });
    new Webview(appWindow, uniqueLabel, {
      url: o.url,
      width: 1024,
      height: 768,
      x: 0,
      y: 0,
    });
    state.windows[uniqueLabel] = appWindow;
  } else {
    // message.warn('您已经打开了此窗口')
    let appWindow = state.windows[uniqueLabel];
    appWindow?.show();
  }
}
</script>
