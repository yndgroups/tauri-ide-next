export interface LinkInfo {
  host: String;
  user: String;
  password: String;
  dbType: String;
  port: number;
  name: String;
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
