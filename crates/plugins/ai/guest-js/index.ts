import { invoke } from "@tauri-apps/api/core";
import { Response } from "./types";

// 发送问题
async function sendAsk(message: String): Promise<Response> {
  return await invoke("plugin:ai|send_ask", { params: message });
}

export { sendAsk };
