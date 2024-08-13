import { AnyObj } from "../type";

// 讲对象的key小驼峰转下划线
export function camelCaseToLine(obj: AnyObj) {
  let newObj: AnyObj = {};
  for (let k in obj) {
    newObj[k.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[k];
  }
  return newObj;
}

// 字符串转Uint8Array
function stringToUint8Array(str: string) {
  var arr = [] as any;
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array;
}

// Uint8Array转字符串
// @ts-ignore
function Uint8ArrayToString(fileData: any) {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }

  return dataString;
}

// int转byte[]
// @ts-ignore
function intTobytes2(n: any) {
  let bytes = [] as any;
  for (var i = 0; i < 2; i++) {
    bytes[i] = n >> (8 - i * 8);
  }
  return bytes;
}

// string转ArrayBuffer
// @ts-ignore
function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// ArrayBuffer转String
// @ts-ignore
function ab2str(buf: any) {
  console.log(buf);
  // return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/**
 * 在字符串中插入新字符串
 *
 * @param target 目标字符串
 * @param index 插入位置
 * @param insertedStr 需要插入的字符串
 * @returns
 */
export function insertStr(target: string, index: number, insertedStr: string) {
  var str = target.slice(0, index) + insertedStr + target.slice(index);
  return str;
}

/**
 * 改变字符串的大小写等
 *
 * @param str 目标字符串
 * @param type 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
 * @returns 返回处理后字符串
 */
export function changeStrCase(str: string, type: number): string {
  type = type || 4;
  let fn: AnyObj = {
    1: (str: string) =>
      str.replace(/\b\w+\b/g, function (s: string) {
        return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
      }),
    2: (str: string) =>
      str.replace(/\b\w+\b/g, function (s: string) {
        return s.substring(0, 1).toLowerCase() + s.substring(1).toUpperCase();
      }),
    3: (str: string) =>
      str
        .split("")
        .map(function (s: string) {
          if (/[a-z]/.test(s)) {
            return s.toUpperCase();
          } else {
            return s.toLowerCase();
          }
        })
        .join(""),
    4: (str: string) => str.toUpperCase(),
    5: (str: string) => str.toLowerCase(),
  };
  return fn[type].hasOwnProperty(type) ? fn[type](str) : str;
}

/**
 * 去除字符串空格
 *
 * @param str 目标字符串
 * @param type 1-所有空格 2-前后空格 3-前空格 4-后空格
 * @returns 返回处理后字符串
 */
export function trim(str: string, type: number): string {
  type = type || 1;
  let fn: AnyObj = {
    1: (str: string) => str.replace(/\s+/g, ""),
    2: (str: string) => str.replace(/(^\s*)|(\s*$)/g, ""),
    3: (str: string) => str.replace(/(^\s*)/g, ""),
    4: (str: string) => str.replace(/(\s*$)/g, ""),
  };
  return fn[type].hasOwnProperty(type) ? fn[type](str) : str;
}

/**
 * 首字母转大写
 *
 * @param str 传入的目标参数
 * @returns 返回新的字符串
 */
export function firstWordCase(str: string): string {
  if (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  } else {
    return "";
  }
}

export default {
  insertStr,
  trim,
  firstWordCase,
  changeStrCase,
  camelCaseToLine,
  stringToUint8Array,
};
