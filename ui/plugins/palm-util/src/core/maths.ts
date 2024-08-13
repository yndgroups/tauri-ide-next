/* ==============================
 * 数字相关工具包
 * author: 杨大琼
 * email: yangdaqiong@126.com
 * date: 2021-06
 * ============================= */

/**
 * 数字格式化
 *
 * @param num 要格式化的目标数字
 * @param digit 格式化位数
 * @param separator 分割符号
 * @returns 字符串
 */
export function format(
  num: number,
  digit: number,
  separator: string = ","
): string {
  let str = num.toString();
  if (str.indexOf(".") == -1) {
    const regStr = `\\d{1,${digit}}(?=(\\d{${digit}})+$)`;
    let reg = new RegExp(regStr, "g");
    return str.replace(reg, "$&" + separator);
  } else {
    const regStr = `(\\d)(?=(\\d{${digit}})+\\.)`;
    return str.replace(new RegExp(regStr, "g"), ($0, $str) => {
      return `${$str + separator}`;
    });
  }
}

/**
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param op {string} 运算类型，有加减乘除（add/sub/mul/div）
 *
 */
export function calculator(num1: number, num2: number, method: string) {
  var obj1 = toInteger(num1);
  var obj2 = toInteger(num2);
  var n1 = obj1.num;
  var n2 = obj2.num;
  var t1 = obj1.multiple;
  var t2 = obj2.multiple;
  var max = t1 > t2 ? t1 : t2;
  var result: number;
  switch (method) {
    case "add":
      if (t1 === t2) {
        result = n1 + n2;
      } else if (t1 > t2) {
        result = n1 + n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) + n2;
      }
      return result / max;
    case "sub":
      if (t1 === t2) {
        result = n1 - n2;
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      } else {
        result = n1 * (t2 / t1) - n2;
      }
      return result / max;
    case "mul":
      result = (n1 * n2) / (t1 * t2);
      return result;
    case "div":
      result = (n1 / n2) * (t2 / t1);
      return result;
  }
}

/**
 * 减法
 *
 * @param num1 参数1
 * @param num2 参数2
 * @returns 返回相加结果
 */
export function add(num1: number, num2: number) {
  return Number(calculator(num1, num2, "add"));
}

/**
 * 减法
 *
 * @param num1 参数1
 * @param num2 参数2
 * @returns 返回相减结果
 */
export function sub(num1: number, num2: number) {
  return Number(calculator(num1, num2, "sub"));
}

/**
 * 乘法
 *
 * @param num1 参数1
 * @param num2 参数2
 * @returns 返回相乘结果
 */
export function mul(num1: number, num2: number) {
  return Number(calculator(num1, num2, "mul"));
}

/**
 * 除法
 *
 * @param num1 参数1
 * @param num2 参数2
 * @returns 返回相除
 */
export function div(num1: number, num2: number) {
  return Number(calculator(num1, num2, "div"));
}

/**
 * 判断num是否为一个整数
 *
 * @param num 目标参数
 * @returns bool
 */
export const isInteger = (num: number) => {
  return Math.floor(num) === num;
};

/**
 * 将一个浮点数转成整数
 *
 * @param floatNum
 * @returns obj 返回整数和倍数
 */
export function toInteger(floatNum: number) {
  var obj = { num: 0, multiple: 1 };
  if (isInteger(floatNum)) {
    obj.num = floatNum;
    return obj;
  }
  var str = floatNum + "";
  var index = str.indexOf(".");
  var len = str.substring(index + 1).length;
  var multiple = Math.pow(10, len);
  var intNum = parseInt(floatNum * multiple + 0.5 + "", 10);
  obj.multiple = multiple;
  obj.num = intNum;
  return obj;
}

// 将数字转换为大写金额
export function numToAmount(num: any) {
  //判断如果传递进来的不是字符的话转换为字符
  if (typeof num == "number") {
    num = new String(num);
  }
  num = num.replace(/,/g, ""); //替换tomoney()中的“,”
  num = num.replace(/ /g, ""); //替换tomoney()中的空格
  num = num.replace(/￥/g, ""); //替换掉可能出现的￥字符
  if (isNaN(num)) {
    //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return "";
  }
  //字符处理完毕后开始转换，采用前后两部分分别转换
  var part = String(num).split(".");
  var newchar = "";
  //小数点前进行转化
  for (var i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return "";
      //若数量超过拾亿单位，提示
    }
    var tmpnewchar = "";
    var perchar: any = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;
        break;
      case "1":
        tmpnewchar = "壹" + tmpnewchar;
        break;
      case "2":
        tmpnewchar = "贰" + tmpnewchar;
        break;
      case "3":
        tmpnewchar = "叁" + tmpnewchar;
        break;
      case "4":
        tmpnewchar = "肆" + tmpnewchar;
        break;
      case "5":
        tmpnewchar = "伍" + tmpnewchar;
        break;
      case "6":
        tmpnewchar = "陆" + tmpnewchar;
        break;
      case "7":
        tmpnewchar = "柒" + tmpnewchar;
        break;
      case "8":
        tmpnewchar = "捌" + tmpnewchar;
        break;
      case "9":
        tmpnewchar = "玖" + tmpnewchar;
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + "元";
        break;
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 4:
        tmpnewchar = tmpnewchar + "万";
        break;
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 8:
        tmpnewchar = tmpnewchar + "亿";
        break;
      case 9:
        tmpnewchar = tmpnewchar + "拾";
        break;
    }
    var newchar = tmpnewchar + newchar;
  }
  //小数点之后进行转化
  if (num.indexOf(".") != -1) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2);
    }
    for (i = 0; i < part[1].length; i++) {
      tmpnewchar = "";
      perchar = part[1].charAt(i);
      switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "壹" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "贰" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "叁" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "肆" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "伍" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "陆" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "柒" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "捌" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "玖" + tmpnewchar;
          break;
      }
      if (i == 0) tmpnewchar = tmpnewchar + "角";
      if (i == 1) tmpnewchar = tmpnewchar + "分";
      newchar = newchar + tmpnewchar;
    }
  }

  //替换所有无用汉字
  while (newchar.search("零零") != -1) newchar = newchar.replace("零零", "零");
  newchar = newchar.replace("零亿", "亿");
  newchar = newchar.replace("亿万", "亿");
  newchar = newchar.replace("零万", "万");
  newchar = newchar.replace("零元", "元");
  newchar = newchar.replace("零角", "");
  newchar = newchar.replace("零分", "");
  if (newchar.charAt(newchar.length - 1) == "元") {
    newchar = newchar + "整";
  }
  return newchar;
}

// 将阿拉伯数字翻译成中文的大写数字
export function numToChinese(num: number) {
  var AA = new Array(
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十"
  );
  var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
  var a: any = ("" + num).replace(/(^0*)/g, "").split("."),
    k = 0,
    re = "";
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }

  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6];
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
  }
  if (re == "一十") re = "十";
  if (re.match(/^一/) && re.length == 3) re = re.replace("一", "");
  return re;
}

/**
 * 随机数范围
 *
 * @param min
 * @param max
 * @returns
 */
export function random(min: any, max: any) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    return null;
  }
}

export default {
  add,
  sub,
  mul,
  div,
  format,
  numToAmount,
  numToChinese,
  random,
};
