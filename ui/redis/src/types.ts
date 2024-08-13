
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

// host: '10.37.129.11',
//     port: '6379',
//     password: 'ynd@2025',
//     db: '0',
export interface LinkInfo {
    name?: string
    user?: string
    host: string;
    port: number;
    password: string;
    db: number;
    dbList?: Array<DbItem>;
}

export interface DbItem {
  name: string;
  keys: Array<string>
}

export interface Company {
  id: number;
  name: string;
  url: string;
  product: string;
  icon?: string;
}

export interface TabItem {
  key: string
  name: string
  icon: string,
  prot: number
}

export enum FormatTStyle {
  Text = 'Text',
  Hex = 'Hex',
  Binary = 'binary',
  Json = 'Json',
  MsgPack = 'MsgPack',
  PhpSerialize = 'PhpSerialize',
  JavaSerialize = 'JavaSerialize',
  Pickle = 'Pickle',
  Brotli = 'Brotli',
  Deflate = 'Deflate',
  DeflateRaw = 'DeflateRaw',
  Protobuf = 'Protobuf'
}

export enum DataType {
  String = 'String',
  Hash = 'Hash',
  List = 'List',
  Set = 'Set',
  ZSet = 'ZSet',
  Stream = 'Stream',
  ReJSON = 'ReJSON',
  // JSON = 'JSON',
  // Module = 'Module',
  // StreamConsumer = 'StreamConsumer',
  // StreamGroup = 'StreamGroup',
  // StreamPending = 'StreamPending',
  // StreamConsumerPending = 'StreamConsumerPending',
  // StreamConsumerGroup ='StreamConsumerGroup'
}