// 任意类型
export interface AnyObject {
  [k: string]: any;
}

// 返回封装
export interface Response {
  code: number;
  msg: string;
  data: AnyObject;
  errMsg: String
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
}