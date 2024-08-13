import { invoke } from "@tauri-apps/api/core";
import { LinkInfo, Response } from "./types";

// 测试连接
async function testLink(linkInfo: LinkInfo): Promise<Response> {
  return await invoke("plugin:mysql|test_link", { params: linkInfo });
}

// 连接数据库
async function linkDb(sql: string, fields: string): Promise<Response> {
  return await invoke("plugin:mysql|link_db", {});
}

// 执行sql
async function executeSql(sql: string, fields: string): Promise<Response> {
  return await invoke("plugin:mysql|execute_sql", {});
}

export { testLink, linkDb, executeSql };
