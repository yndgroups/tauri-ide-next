export interface AnyObj {
  [k: string]: any;
}

export interface Response {
  code: number;
  msg: string;
  data: AnyObj;
}

export enum BrowserType {
  // 未知浏览器
  unknown = "unknown",
  // ie浏览器
  IE = "IE",
  // 火狐浏览器
  Firefox = "Firefox",
  // 欧朋浏览器
  Opera = "Opera",
  // 谷歌浏览器
  Chrome = "Chrome",
  // 苹果浏览器
  Safari = "Safari",
  // ie浏览器 11
  Trident = "Trident",
}
