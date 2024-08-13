import { invoke } from "@tauri-apps/api/core";
import {  RedisConfig, Response } from "./types";

// 测试连接
async function testLink(config: RedisConfig): Promise<Response> {
  return await invoke("plugin:redis|test_link", { config: config });
}

// 创建连接
async function createLink(config: RedisConfig): Promise<Response> {
  return await invoke("plugin:redis|create_link", { config: config });
}

// 创建连接
async function deleteLink(config: RedisConfig): Promise<Response> {
  return await invoke("plugin:redis|delete_link", { config: config });
}

// 获取数据
async function get(uuid: string, key: string): Promise<Response> {
  return await invoke("plugin:redis|get", { uuid: uuid, key: key });
}

// 设置数据
async function set(uuid: string, key: string, value: string): Promise<Response> {
  return await invoke("plugin:redis|set", { uuid: uuid, key: key, value: value });
}

// 获取服务信息
async function getServerInfo(uuid: string): Promise<Response> {
  return await invoke("plugin:redis|get_server_info", { uuid: uuid });
}

// 获取内存情况
async function getMemoryInfo(uuid: string): Promise<Response> {
  return await invoke("plugin:redis|get_memory_info", { uuid: uuid });
}

export { testLink, createLink, deleteLink, get, set, getServerInfo, getMemoryInfo };
