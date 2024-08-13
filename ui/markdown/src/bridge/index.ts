import {
  AnyObject,
  Response,
  // TauriApp,
  // TauriCli,
  // TauriClipboard,
  // TauriDialog,
  // TauriEvent,
  // TauriFs,
  // TauriGlobalShortcut,
  // TauriHttp,
  // TauriNotification,
  // TauriOs,
  // TauriPath,
  // TauriProcess,
  // TauriShell,
  // TauriUpdate,
  // TauriWindow,
} from '@/types';
import { invoke, convertFileSrc } from '@tauri-apps/api/core';
// import { app, path, window as win, event } from "@tauri-apps/api";
import { readDir } from '@tauri-apps/plugin-fs';
// import cli from "@tauri-apps/plugin-cli";
import { open } from '@tauri-apps/plugin-dialog';
// import clipboard from "@tauri-apps/plugin-clipboard-manager";
// import shell from "@tauri-apps/plugin-shell";
// import http from "@tauri-apps/plugin-http";
// import os from "@tauri-apps/plugin-os";
// import globalShortcut from "@tauri-apps/plugin-global-shortcut";
// import notification from "@tauri-apps/plugin-notification";
// import process from "@tauri-apps/plugin-process";
// import updater from "@tauri-apps/plugin-updater";

window.Bridge = {
  invoke: async (handler: string, params: AnyObject): Promise<Response> => {
    console.log('invoke =>', handler, params);
    const resut: Response = await invoke(handler, params);
    console.log(`'invoke => code:'${resut.code}, msg: ${resut.msg}, data:`, resut.data);
    return resut;
  },
  delete: async (handler: string, id: string | number, tableName: string) => {
    const resut: Response = await invoke(handler, {
      id: id,
      tableName: tableName,
    });
    console.log(`'invoke => code:'${resut.code}, msg: ${resut.msg}, data:`, resut.data);
    return resut;
  },
  // app: app as TauriApp,
  // cli: cli as TauriCli,
  // clipboard: clipboard as TauriClipboard,
  fs: {
    readDir,
  },
  dialog: {
    open,
  },
  tauri: {
    convertFileSrc,
  },
  // event: event as TauriEvent,
  // fs: fs as unknown as TauriFs,
  // globalShortcut: globalShortcut as TauriGlobalShortcut,
  // http: http as unknown as TauriHttp,
  // notification: notification as TauriNotification,
  // path: path as unknown as TauriPath,
  // process: process as TauriProcess,
  // shell: shell as TauriShell,
  // updater: updater as unknown as TauriUpdate,
  // window: win as unknown as TauriWindow,
  // os: os as unknown as TauriOs,
};
