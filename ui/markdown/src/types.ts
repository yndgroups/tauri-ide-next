// 文件
export interface PalmEditor {
  name: string;
  version: string;
  // 加载插件
  loadPlugins: Function;
  // 打印版本信息
  info: Function;
  // 读取文件夹
  readDir: Function;
  // 读取文件
  readTextFile: Function;
  // 挂载实例
  mount: Function;
  // 销毁实例
  unmount: Function;
  // 实例样式
  appendInstanceStyle: Function;
  // 初始化默认应用到沙河
  initAppToSandbox: Function;
  // 获取单个扩展插件信息
  getExtension: Function;
  // 获取所有扩展插件信息
  getExtensions: Function;
  // 获取单个插件信息
  getPlugin: Function;
  // 获取所有插件信息
  getPlugins: Function;
}

// 文件
export interface File {
  key: string;
  path: string;
  name?: string;
  editStatus?: boolean;
  children?: Array<File>;
  fileContent?: string;
  expand?: boolean;
}

export interface TreeItem {
  value: string;
  label: string;
  type: number;
  children?: Array<TreeItem>;
  expand?: boolean;
}
// 应用
export interface App {
  uniqueKey: string;
  name: string;
  icon: string;
  color: string;
  fileList?: Array<File>;
  version?: string;
  debug?: boolean;
  style?: string;
  code?: string;
}

// 任意类型
export interface AnyObject {
  [k: string]: any;
}

// 返回封装
export interface Response {
  code: number;
  msg: string;
  data: AnyObject;
}

// 数据库类型
export enum DbType {
  dm = 'dm',
  kingbase = 'dmkingbase',
  mysql = 'mysql',
  mariadb = 'mariadb',
  oracle = 'oracle',
  redis = 'redis',
  sqlite = 'sqlite',
  sqlserver = 'sqlserver',
  mongodb = 'mongodb',
  postgresql = 'postgresql',
}

// 桥接类型
export interface Bridge {
  invoke: (evt: string, params: AnyObject) => Promise<Response>;
  delete: (evt: string, id: string | number, tableName: string) => Promise<Response>;
  app: any;
  cli: any;
  clipboard: any;
  dialog: any;
  event: any;
  fs: any;
  globalShortcut: any;
  http: any;
  notification: any;
  path: any;
  process: any;
  shell: any;
  updater: any;
  window: any;
  os: any;
  tauri: any;
}

// 继承TauriApp
export interface TauriApp {
  getName: Function;
  getTauriVersion: Function;
  getVersion: Function;
  show: Function;
  hide: Function;
}

// 继承TauriCli
export interface TauriCli {
  getMatches: Function;
}

// 继承TauriClipboard
export interface TauriClipboard {
  writeText: Function;
  readText: Function;
}

// 继承TauriDialog
export interface TauriDialog {
  open: Function;
  save: Function;
  message: Function;
  ask: Function;
  confirm: Function;
}

// 继承TauriEvent
export interface TauriEvent {
  listen: Function;
  once: Function;
  emit: Function;
}

// 继承TauriFs
export interface TauriFs {
  readTextFile: Function;
  readBinaryFile: Function;
  writeTextFile: Function;
  writeBinaryFile: Function;
  readDir: Function;
  createDir: Function;
  removeDir: Function;
  copyFile: Function;
  removeFile: Function;
  renameFile: Function;
  exists: Function;
}

// 继承TauriGlobalShortcut
export interface TauriGlobalShortcut {
  register: Function;
  registerAll: Function;
  isRegistered: Function;
  unregister: Function;
  unregisterAll: Function;
}

// 继承TauriHttp
export interface TauriHttp {
  Body: AnyObject;
  Client: AnyObject;
  Response: AnyObject;
  ResponseType: AnyObject;
  fetch: AnyObject;
  getClient: AnyObject;
}

// 继承TauriNotification
export interface TauriNotification {
  isPermissionGranted: Function;
  requestPermission: Function;
  sendNotification: Function;
}

// 继承TauriPath
export interface TauriPath {
  appDir: Function;
  appConfigDir: Function;
  appDataDir: Function;
  appLocalDataDir: Function;
  appCacheDir: Function;
  audioDir: Function;
  cacheDir: Function;
  configDir: Function;
  dataDir: Function;
  desktopDir: Function;
  documentDir: Function;
  downloadDir: Function;
  executableDir: Function;
  fontDir: Function;
  homeDir: Function;
  localDataDir: Function;
  pictureDir: Function;
  publicDir: Function;
  resourceDir: Function;
  resolveResource: Function;
  runtimeDir: Function;
  templateDir: Function;
  videoDir: Function;
  logDir: Function;
  appLogDir: Function;
  sep: string;
  delimiter: string;
  resolve: Function;
  normalize: Function;
  join: Function;
  dirname: Function;
  extname: Function;
  basename: Function;
  isAbsolute: Function;
}

// 继承TauriProcess
export interface TauriProcess {
  exit: Function;
  relaunch: Function;
}

// 继承TauriShell
export interface TauriShell {
  Command: any;
  Child: any;
  EventEmitter: any;
  open: Function;
}

// 继承TauriUpdate
export interface TauriUpdate {
  onUpdaterEvent: Function;
  installUpdate: Function;
  checkUpdate: Function;
}

// 继承TauriWindow
export interface TauriWindow {
  WebviewWindow: any;
  WebviewWindowHandle: any;
  WindowManager: any;
  CloseRequestedEvent: any;
  getCurrent: any;
  getAll: any;
  appWindow: any;
  LogicalSize: any;
  PhysicalSize: any;
  LogicalPosition: any;
  PhysicalPosition: any;
  UserAttentionType: any;
  currentMonitor: any;
  primaryMonitor: any;
  availableMonitors: any;
}

// 继承TauriOs
export interface TauriOs {
  platform: Function;
  version: Function;
  type: Function;
  arch: Function;
  tempdir: Function;
  locale: Function;
}
