import { invoke } from "@tauri-apps/api/core";
import { Response, LinkInfo } from "./types";

/**
 * 
 * @param linkInfo 连接信息
 * @returns 返回连接结果
 */
async function link(linkInfo: LinkInfo): Promise<Response> {
  return await invoke("plugin:sqlite|link", { linkInfo: linkInfo });
}

/**
 * 获取保存的连接
 * 
 * @returns 返回连接信息 
 */
async function getLinks(): Promise<Response> {
  return await invoke("plugin:sqlite|get_links");
}

/**
 * 保存链接信息
 * 
 * @param linkInfo 链接信息参数
 * @returns 返回保存结果
 */
async function saveLink(linkInfo: LinkInfo): Promise<Response> {
  return await invoke("plugin:sqlite|save_link", {linkInfo: linkInfo});
}

export { link, getLinks, saveLink };