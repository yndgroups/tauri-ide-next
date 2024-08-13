import { invoke } from '@tauri-apps/api/core';

interface LinkInfo {
  host: string,
  port: string,
  password: string
}

async function link(linkInfo: LinkInfo): Promise<void> {
  console.log(linkInfo, 'linkInfo')
  await invoke('plugin:dm|link', {linkInfo: linkInfo});
}

export { link };
