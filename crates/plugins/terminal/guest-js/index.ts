import { invoke } from "@tauri-apps/api/core";
import {  Response } from "./types";

// 创建终端
async function createTerminal(): Promise<Response> {
  return await invoke("plugin:terminal|create_terminal");
}

// 写入数据
async function writeToPty(data: string, key: string): Promise<Response> {
  console.log('writeToPty => key:', key)
  return await invoke("plugin:terminal|write_to_pty", {data: data, key: key});
}

// 读取数据
async function readFromPty(key: string): Promise<Response> {
  console.log('readFromPty => key:', key)
  return await invoke("plugin:terminal|read_from_pty",  { key: key});
}

// 窗口重置
async function resizePty(rows: number, cols: number, key: string): Promise<Response> {
  console.log('resizePty => key:', key)
  return await invoke("plugin:terminal|resize_pty", {rows: rows, cols: cols, key: key});
}

// 获取已经创建了的唯一值
async function getTerminalUniqueKeys() {
  return await invoke("plugin:terminal|get_terminal_unique_keys");
}

// 清除控制台信息
async function clearTerminal() {
  return await invoke("plugin:terminal|clear_terminal");
}

export { createTerminal as createTerminal, writeToPty, readFromPty, resizePty, getTerminalUniqueKeys, clearTerminal };
