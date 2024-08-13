import { AnyObj } from "../type";

/**
 * Object验证器 isString/isNumber/isBoolean/isFunction/isNull/isUndefined/isObject
 * /isArray/isDate/isRegExp/isError/isSymbol/isPromise/isSet
 *
 * @param name 要交验的名称
 * @param param 校验参数
 * @returns 返回布尔值， 默认返回false
 */
export function isObjectType(name: string, param: any): boolean {
  let anyObj: AnyObj = {
    isString: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "String",
    isNumber: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Number",
    isBoolean: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Boolean", //是否为布尔值
    isFunction: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Function", // 是否函数
    isNull: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Null", // 是否为null
    isUndefined: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Undefined", // 是否unfined
    isObject: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Object", // // 是否对象
    isArray: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Array", // 是否数组
    isDate: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Date", // 是否时间
    isRegExp: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "RegExp", // 是否正则
    isError: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Error", // 是否错误对象
    isSymbol: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Symbol", // 是否Symbol函数
    isPromise: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Promise", // 是否Promise对象
    isSet: (param: any) =>
      Object.prototype.toString.call(param).slice(8, -1) === "Set", // 是否Set对象
  };
  return anyObj.hasOwnProperty(name) ? anyObj[name](param) : false;
}

/**
 * 验证是否Html标签
 *
 * @param target 验证目标参数
 *
 * @returns
 */
export function isHhtmlMark(target: any): boolean {
  return /<("[^"]*"|'[^']*'|[^'">])*>/.test(target);
}

/**
 * 验证是否大写
 *
 * @param target 验证目标参数
 *
 * @returns
 */
export function isUpper(target: any): boolean {
  return /^[A-Z]+$/.test(target);
}

/**
 * 小写
 *
 * @param target 验证目标参数
 * @returns
 */
export function isLower(target: any): boolean {
  return /^[a-z]+$/.test(target);
}

/**
 * 判断是否为中文
 *
 * @param target 判断参数
 * @returns
 */
export function isChinese(target: string): boolean {
  return /^[\\u4E00-\\u9FA5]+$/.test(target);
}

/**
 * 判断是否是英文
 *
 * @param target 判断目标
 * @returns
 */
export function isEnglish(target: any): boolean {
  return /^[a-zA-Z]+$/.test(target);
}

/**
 * 验证是否数字
 *
 * @param target 数字
 * @returns
 */
export function isNumber(target: any): boolean {
  return /^[0-9]$/.test(`${target}`);
}

/**
 * 判断是否时间
 *
 * @param target 时间
 *
 * @returns boolean
 */
export function isDate(target: string): boolean {
  return (
    /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
      target
    ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(target)
  );
}

/**
 * 判断是否ip地址
 *
 * @param ipStr ip地址
 *
 * @returns boolean
 */
export function isIpAddr(target: any): boolean {
  return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
    target
  );
}

/**
 * 判断是否URL地址
 *
 * @param target URL地址
 *
 * @returns
 */
export function isUrl(target: any): boolean {
  // /^http[s]?:\/\/.*/.test(param)
  return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
    target
  );
}

/**
 * 判断是否合法的金额数字
 *
 * @param target 金额(小数点2位)
 * @returns
 */
export function isMoneny(target: any): boolean {
  return /^\d*(?:\.\d{0,2})?$/.test(target);
}

/**
 * 验证是否邮箱号码
 *
 * @param target 邮箱号码
 *
 * @returns
 */
export function isEmail(target: any): boolean {
  // /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(emailStr)
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    target
  );
}

/**
 * 验证是否QQ号码
 *
 * @param target QQ号码
 *
 * @returns boolean
 */
export function isQQ(target: any): boolean {
  if (typeof target !== "number") {
    return false;
  }
  return /^[1-9][0-9]{4,9}$/.test(`${target}`);
}

/**
 * 判断是否邮政编码
 *
 * @param target 邮政编码
 *
 * @returns boolean
 */
export function isZipCode(target: any): boolean {
  if (typeof target !== "number") {
    return false;
  }
  return /[1-9]\d{5}(?!\d)/.test(`${target}`);
}

/**
 * 密码以字母开头，只能包含字母、数字和下划线，默认长度在4~20之间，可根据自己的需求传入最小长度和最大长度
 *
 * @param target 密码
 * @param minLength 最小长度
 * @param maxLength 最大长度
 *
 * @returns boolean
 */
export function pwdStrong(
  target: string,
  minLength: number = 4,
  maxLength = 20
): boolean {
  let reg = new RegExp(`^[a-zA-Z]\w{${minLength},${maxLength}}$`);
  return reg.test(target);
}

/**
 * 验证是否座机号码
 *
 * @param target 座机号码
 *
 * @returns boolean
 */
export function isTelNum(target: any): boolean {
  if (typeof target !== "string") {
    return false;
  }
  return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(target);
}

/**
 * 手机号码验证
 *
 * @param target 手机号码验证
 *
 * @returns boolean
 */
export function isPhoneNum(target: any): boolean {
  if (typeof target !== "string" && typeof target !== "number") {
    return false;
  }
  return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(`${target}`);
}

/**
 * 严格的身份证校验
 *
 * @param idCard 身份证号码
 * @param isStrong 是否强校验
 *
 * @returns boolean
 */
export function isIdCard(cardNum: string, isStrong: boolean = false): boolean {
  if (typeof cardNum !== "string") {
    return false;
  }
  if (isStrong) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardNum);
  }
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(cardNum)) {
    console.log("你输入的身份证长度或格式错误");
    return false;
  }
  //身份证城市
  let aCity: any = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外",
  };
  if (!aCity[parseInt(cardNum.substring(0, 2))]) {
    console.log("你的身份证地区非法");
    return false;
  }

  // 出生日期验证
  let sBirthday = (
      cardNum.substring(6, 4) +
      "-" +
      Number(cardNum.substring(10, 2)) +
      "-" +
      Number(cardNum.substring(12, 2))
    ).replace(/-/g, "/"),
    d = new Date(sBirthday);
  if (
    sBirthday !=
    d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
  ) {
    console.log("身份证上的出生日期非法");
    return false;
  }

  // 身份证号码校验
  let sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = "10X98765432";
  let cardNumArr = cardNum.split("") as Array<any>;
  for (var i = 0; i < cardNumArr.length - 1; i++) {
    sum += cardNumArr[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  if (cardNum[cardNum.length - 1] != last) {
    console.log("你输入的身份证号非法");
    return false;
  }

  return true;
}

/**
 * 判断两个对象是否键值相同
 * @param objFirst 第一个对象
 * @param objTwo 第二个对象
 * @returns
 */
export function isObjectEqual(objFirst: any, objTwo: any) {
  var aProps = Object.getOwnPropertyNames(objFirst);
  var bProps = Object.getOwnPropertyNames(objTwo);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    if (objFirst[propName] !== objTwo[propName]) {
      return false;
    }
  }
  return true;
}

/**
 * 洗牌算法随机
 *
 * @param arr
 * @returns
 */
export function shuffle(arr: Array<any>): any {
  var result: any[] = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
}

export default {
  isObjectType,
  shuffle,
  isObjectEqual,
  isHhtmlMark,
  isUpper,
  isLower,
  isChinese,
  isEnglish,
  isNumber,
  isDate,
  isIpAddr,
  isUrl,
  isMoneny,
  isEmail,
  isQQ,
  isZipCode,
  pwdStrong,
  isTelNum,
  isPhoneNum,
  isIdCard,
};
