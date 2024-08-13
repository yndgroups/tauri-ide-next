
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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
    function format(num, digit, separator = ",") {
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
    function calculator(num1, num2, method) {
      var obj1 = toInteger(num1);
      var obj2 = toInteger(num2);
      var n1 = obj1.num;
      var n2 = obj2.num;
      var t1 = obj1.multiple;
      var t2 = obj2.multiple;
      var max = t1 > t2 ? t1 : t2;
      var result;
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
          result = n1 * n2 / (t1 * t2);
          return result;
        case "div":
          result = n1 / n2 * (t2 / t1);
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
    function add(num1, num2) {
      return Number(calculator(num1, num2, "add"));
    }
    /**
     * 减法
     *
     * @param num1 参数1
     * @param num2 参数2
     * @returns 返回相减结果
     */
    function sub(num1, num2) {
      return Number(calculator(num1, num2, "sub"));
    }
    /**
     * 乘法
     *
     * @param num1 参数1
     * @param num2 参数2
     * @returns 返回相乘结果
     */
    function mul(num1, num2) {
      return Number(calculator(num1, num2, "mul"));
    }
    /**
     * 除法
     *
     * @param num1 参数1
     * @param num2 参数2
     * @returns 返回相除
     */
    function div(num1, num2) {
      return Number(calculator(num1, num2, "div"));
    }
    /**
     * 判断num是否为一个整数
     *
     * @param num 目标参数
     * @returns bool
     */
    const isInteger = num => {
      return Math.floor(num) === num;
    };
    /**
     * 将一个浮点数转成整数
     *
     * @param floatNum
     * @returns obj 返回整数和倍数
     */
    function toInteger(floatNum) {
      var obj = {
        num: 0,
        multiple: 1
      };
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
    function numToAmount(num) {
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
        var perchar = part[0].charAt(i);
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
    function numToChinese(num) {
      var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
      var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
      var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
      for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
          case 0:
            re = BB[7] + re;
            break;
          case 4:
            if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re;
            break;
          case 8:
            re = BB[5] + re;
            BB[7] = BB[5];
            k = 0;
            break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
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
    function random(min, max) {
      if (arguments.length === 2) {
        return Math.floor(min + Math.random() * (max + 1 - min));
      } else {
        return null;
      }
    }
    var math = {
      add,
      sub,
      mul,
      div,
      format,
      numToAmount,
      numToChinese,
      random
    };

    /* ==============================
     * URL相关工具包
     * author: 杨大琼
     * email: yangdaqiong@126.com
     * date: 2021-06
     * ============================= */
    /**
     * 是否url地址
     *
     * @param str 字符串参数
     * @returns 布尔值
     */
    function isURL(str) {
      return /^http[s]?:\/\/.*/.test(str);
    }
    /**
     *
     * @param path 图片地址
     * @param origin 图片文件主机名
     * @returns 返回处理后的文件路径
     */
    function loadImg(path, domain) {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
      } else {
        if (path.startsWith("/")) {
          return domain ? domain + path : path;
        } else {
          return domain ? domain + "/" + path : path;
        }
      }
    }
    /**
     * 对象转请求url地址
     * 特别注意
     *
     * @param params 对象参数
     * @returns
     */
    function stringify(params, apiPath) {
      let strParams = depthPramas(params);
      if (apiPath) {
        if (apiPath.includes("?")) {
          return apiPath + strParams;
        } else {
          return `${apiPath}${strParams.replace("&", "?")}`;
        }
      } else {
        return strParams;
      }
    }
    /**
     * 对象参数深度处理
     *
     * @param params 请求参数
     * @returns 返回处理的字符串
     */
    function depthPramas(params, prekey) {
      if (params && typeof params !== "object") {
        return params;
      }
      let strParams = "";
      for (let k in params) {
        if (typeof params[k] !== "object") {
          strParams += `&${prekey ? prekey + "." + k : k}=${params[k]}`;
        } else {
          strParams += depthPramas(params[k], `${prekey ? prekey + "." + k : k}`);
        }
      }
      return strParams;
    }
    /**
     * 将url后面的字符串参数进行格式化
     *
     * @param params 字符串参数 ?a=张&b=李
     */
    function parse(params) {
      if (params && typeof params === "object") {
        return "";
      }
      let paramsArr = params.split("&");
      let obj = {};
      if (paramsArr.length) {
        paramsArr.map(item => {
          if (item) {
            let tempArr = item.split("=");
            if (tempArr.length) {
              obj[tempArr[0]] = tempArr[1];
              return obj;
            }
          } else {
            return {};
          }
        });
      }
      return obj;
    }
    async function exportCsv(JSONlist, title) {
      let csvString = "";
      JSONlist.map(item => {
        Object.keys(title).map(key => {
          let value = item[key];
          csvString += value + ",";
        });
        csvString += "\r\n";
      });
      //charset=utf-8,\ufeff + encodeURIComponent解决中文乱码
      // csvString = 'data:application/csv;charset=utf-8,\ufeff' + encodeURIComponent(csvString);
      return csvString;
    }
    // @ts-ignore
    const JSONToExcelConvertor = async (JSONData, title, filter) => {
      if (!JSONData) return;
      //转化json为object
      var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
      var excel = "<table>";
      //设置表头
      var row = "<tr>";
      if (title) {
        //使用标题项
        for (let i in title) {
          row += "<th align='center'>" + title[i] + "</th>";
        }
      } else {
        //不使用标题项
        for (let i in arrData[0]) {
          row += "<th align='center'>" + i + "</th>";
        }
      }
      excel += row + "</tr>";
      //设置数据
      for (let i = 0; i < arrData.length; i++) {
        let row = "<tr>";
        for (let index in arrData[i]) {
          //判断是否有过滤行
          if (filter) {
            if (filter.indexOf(index) == -1) {
              let value = arrData[i][index] == null ? "" : arrData[i][index];
              row += "<td>" + value + "</td>";
            }
          } else {
            let value = arrData[i][index] == null ? "" : arrData[i][index];
            row += "<td align='center'>" + value + "</td>";
          }
        }
        excel += row + "</tr>";
      }
      excel += "</table>";
      //下面是构建文件的代码
      let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
      excelFile += '; charset=UTF-8">';
      excelFile += "<head>";
      excelFile += "<!--[if gte mso 9]>";
      excelFile += "<xml>";
      excelFile += "<x:ExcelWorkbook>";
      excelFile += "<x:ExcelWorksheets>";
      excelFile += "<x:ExcelWorksheet>";
      excelFile += "<x:Name>";
      excelFile += "{worksheet}";
      excelFile += "</x:Name>";
      excelFile += "<x:WorksheetOptions>";
      excelFile += "<x:DisplayGridlines/>";
      excelFile += "</x:WorksheetOptions>";
      excelFile += "</x:ExcelWorksheet>";
      excelFile += "</x:ExcelWorksheets>";
      excelFile += "</x:ExcelWorkbook>";
      excelFile += "</xml>";
      excelFile += "<![endif]-->";
      excelFile += "</head>";
      excelFile += "<body>";
      excelFile += excel;
      excelFile += "</body>";
      excelFile += "</html>";
      let uri = "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(excelFile);
      return uri;
    };
    var urls = {
      isURL,
      loadImg,
      stringify,
      parse,
      exportCsv,
      JSONToExcelConvertor
    };

    /**
     * Object验证器 isString/isNumber/isBoolean/isFunction/isNull/isUndefined/isObject
     * /isArray/isDate/isRegExp/isError/isSymbol/isPromise/isSet
     *
     * @param name 要交验的名称
     * @param param 校验参数
     * @returns 返回布尔值， 默认返回false
     */
    function isObjectType(name, param) {
      let anyObj = {
        isString: param => Object.prototype.toString.call(param).slice(8, -1) === "String",
        isNumber: param => Object.prototype.toString.call(param).slice(8, -1) === "Number",
        isBoolean: param => Object.prototype.toString.call(param).slice(8, -1) === "Boolean",
        //是否为布尔值
        isFunction: param => Object.prototype.toString.call(param).slice(8, -1) === "Function",
        // 是否函数
        isNull: param => Object.prototype.toString.call(param).slice(8, -1) === "Null",
        // 是否为null
        isUndefined: param => Object.prototype.toString.call(param).slice(8, -1) === "Undefined",
        // 是否unfined
        isObject: param => Object.prototype.toString.call(param).slice(8, -1) === "Object",
        // // 是否对象
        isArray: param => Object.prototype.toString.call(param).slice(8, -1) === "Array",
        // 是否数组
        isDate: param => Object.prototype.toString.call(param).slice(8, -1) === "Date",
        // 是否时间
        isRegExp: param => Object.prototype.toString.call(param).slice(8, -1) === "RegExp",
        // 是否正则
        isError: param => Object.prototype.toString.call(param).slice(8, -1) === "Error",
        // 是否错误对象
        isSymbol: param => Object.prototype.toString.call(param).slice(8, -1) === "Symbol",
        // 是否Symbol函数
        isPromise: param => Object.prototype.toString.call(param).slice(8, -1) === "Promise",
        // 是否Promise对象
        isSet: param => Object.prototype.toString.call(param).slice(8, -1) === "Set" // 是否Set对象
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
    function isHhtmlMark(target) {
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(target);
    }
    /**
     * 验证是否大写
     *
     * @param target 验证目标参数
     *
     * @returns
     */
    function isUpper(target) {
      return /^[A-Z]+$/.test(target);
    }
    /**
     * 小写
     *
     * @param target 验证目标参数
     * @returns
     */
    function isLower(target) {
      return /^[a-z]+$/.test(target);
    }
    /**
     * 判断是否为中文
     *
     * @param target 判断参数
     * @returns
     */
    function isChinese(target) {
      return /^[\\u4E00-\\u9FA5]+$/.test(target);
    }
    /**
     * 判断是否是英文
     *
     * @param target 判断目标
     * @returns
     */
    function isEnglish(target) {
      return /^[a-zA-Z]+$/.test(target);
    }
    /**
     * 验证是否数字
     *
     * @param target 数字
     * @returns
     */
    function isNumber(target) {
      return /^[0-9]$/.test(`${target}`);
    }
    /**
     * 判断是否时间
     *
     * @param target 时间
     *
     * @returns boolean
     */
    function isDate(target) {
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(target) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(target);
    }
    /**
     * 判断是否ip地址
     *
     * @param ipStr ip地址
     *
     * @returns boolean
     */
    function isIpAddr(target) {
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(target);
    }
    /**
     * 判断是否URL地址
     *
     * @param target URL地址
     *
     * @returns
     */
    function isUrl(target) {
      // /^http[s]?:\/\/.*/.test(param)
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(target);
    }
    /**
     * 判断是否合法的金额数字
     *
     * @param target 金额(小数点2位)
     * @returns
     */
    function isMoneny(target) {
      return /^\d*(?:\.\d{0,2})?$/.test(target);
    }
    /**
     * 验证是否邮箱号码
     *
     * @param target 邮箱号码
     *
     * @returns
     */
    function isEmail(target) {
      // /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(emailStr)
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(target);
    }
    /**
     * 验证是否QQ号码
     *
     * @param target QQ号码
     *
     * @returns boolean
     */
    function isQQ(target) {
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
    function isZipCode(target) {
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
    function pwdStrong(target, minLength = 4, maxLength = 20) {
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
    function isTelNum(target) {
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
    function isPhoneNum(target) {
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
    function isIdCard(cardNum, isStrong = false) {
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
      let aCity = {
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
        91: "国外"
      };
      if (!aCity[parseInt(cardNum.substring(0, 2))]) {
        console.log("你的身份证地区非法");
        return false;
      }
      // 出生日期验证
      let sBirthday = (cardNum.substring(6, 4) + "-" + Number(cardNum.substring(10, 2)) + "-" + Number(cardNum.substring(12, 2))).replace(/-/g, "/"),
        d = new Date(sBirthday);
      if (sBirthday != d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) {
        console.log("身份证上的出生日期非法");
        return false;
      }
      // 身份证号码校验
      let sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = "10X98765432";
      let cardNumArr = cardNum.split("");
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
    function isObjectEqual(objFirst, objTwo) {
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
    function shuffle(arr) {
      var result = [],
        random;
      while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random]);
        arr.splice(random, 1);
      }
      return result;
    }
    var validator = {
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
      isIdCard
    };

    // 讲对象的key小驼峰转下划线
    function camelCaseToLine(obj) {
      let newObj = {};
      for (let k in obj) {
        newObj[k.replace(/([A-Z])/g, "_$1").toLowerCase()] = obj[k];
      }
      return newObj;
    }
    // 字符串转Uint8Array
    function stringToUint8Array(str) {
      var arr = [];
      for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
      }
      var tmpUint8Array = new Uint8Array(arr);
      return tmpUint8Array;
    }
    /**
     * 在字符串中插入新字符串
     *
     * @param target 目标字符串
     * @param index 插入位置
     * @param insertedStr 需要插入的字符串
     * @returns
     */
    function insertStr(target, index, insertedStr) {
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
    function changeStrCase(str, type) {
      type = type || 4;
      let fn = {
        1: str => str.replace(/\b\w+\b/g, function (s) {
          return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
        }),
        2: str => str.replace(/\b\w+\b/g, function (s) {
          return s.substring(0, 1).toLowerCase() + s.substring(1).toUpperCase();
        }),
        3: str => str.split("").map(function (s) {
          if (/[a-z]/.test(s)) {
            return s.toUpperCase();
          } else {
            return s.toLowerCase();
          }
        }).join(""),
        4: str => str.toUpperCase(),
        5: str => str.toLowerCase()
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
    function trim(str, type) {
      type = type || 1;
      let fn = {
        1: str => str.replace(/\s+/g, ""),
        2: str => str.replace(/(^\s*)|(\s*$)/g, ""),
        3: str => str.replace(/(^\s*)/g, ""),
        4: str => str.replace(/(\s*$)/g, "")
      };
      return fn[type].hasOwnProperty(type) ? fn[type](str) : str;
    }
    /**
     * 首字母转大写
     *
     * @param str 传入的目标参数
     * @returns 返回新的字符串
     */
    function firstWordCase(str) {
      if (str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
      } else {
        return "";
      }
    }
    var str = {
      insertStr,
      trim,
      firstWordCase,
      changeStrCase,
      camelCaseToLine,
      stringToUint8Array
    };

    /**
     * 检测密码强度
     *
     * @param str 密码字符串
     *
     * @returns
     */
    function checkLevel(str) {
      var Lv = 0;
      if (str.length < 6) {
        return Lv;
      }
      if (/[0-9]/.test(str)) {
        Lv++;
      }
      if (/[a-z]/.test(str)) {
        Lv++;
      }
      if (/[A-Z]/.test(str)) {
        Lv++;
      }
      if (/[\.|-|_]/.test(str)) {
        Lv++;
      }
      return Lv;
    }
    var password = {
      checkLevel
    };

    /**
     * 平均值
     *
     * @param arr
     * @returns
     */
    function average(arr) {
      return sum(arr) / arr.length;
    }
    /**
     * 求和
     *
     * @param arr
     * @returns 返回相加值
     */
    function sum(arr) {
      return arr.reduce((pre, cur) => {
        return pre + cur;
      });
    }
    /**
     * 最大值
     *
     * @param arr
     * @returns 返回最大值
     */
    function max(arr) {
      return Math.max.apply(null, arr);
    }
    /**
     * 最小值
     *
     * @param arr
     * @returns
     */
    function min(arr) {
      return Math.min.apply(null, arr);
    }
    /**
     * 将类数组转换为数组
     *
     * @param ary
     * @returns
     */
    function formArray(ary) {
      var arr = [];
      if (Array.isArray(ary)) {
        arr = ary;
      } else {
        arr = Array.prototype.slice.call(ary);
      }
      return arr;
    }
    /**
     * 删除其中一个元素
     *
     * @param arr
     * @param ele
     * @returns
     */
    function remove(arr, ele) {
      var index = arr.indexOf(ele);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
    /**
     * 求两个集合的交集
     * @param a
     * @param b
     */
    function intersect(a, b) {
      a = unique(a);
      // return this.map(a, function (o:any) {
      //     return contains(b, o) ? o : null;
      // });
    }
    /**
     * 求两个集合的并集
     *
     * @param a
     * @param b
     * @returns
     */
    function union(a, b) {
      var newArr = a.concat(b);
      return unique(newArr);
    }
    /**
     * 数组去重复
     *
     * @param arr
     * @returns
     */
    function unique(arr) {
      if (Array.hasOwnProperty("from")) {
        return Array.from(new Set(arr));
      } else {
        let n = [];
        let r = [];
        for (var i = 0; i < arr.length; i++) {
          if (!n[arr[i]]) {
            n[arr[i]] = true;
            r.push(arr[i]);
          }
        }
        return r;
      }
    }
    // 数组排序，{type} 1：从小到大 2：从大到小 3：随机
    function sort(arr, type = 1) {
      return arr.sort((a, b) => {
        switch (type) {
          case 1:
            return a - b;
          case 2:
            return b - a;
          case 3:
            return Math.random() - 0.5;
          default:
            return arr;
        }
      });
    }
    // 判断一个元素是否在数组中
    function contains(arr, val) {
      return arr.indexOf(val) != -1 ? true : false;
    }
    var arr = {
      average,
      sum,
      max,
      min,
      formArray,
      remove,
      intersect,
      union,
      unique,
      sort,
      contains
    };

    /**
     * 文本复制
     *
     * @param value
     */
    function copyTextToClipboard(value) {
      navigator.clipboard.writeText(value).then(function () {
        console.info('复制成功');
      }, function () {
        console.warn('复制失败');
      });
    }
    /**
     * 滚动到顶部
     */
    function scrollToTop() {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    }
    /**
     * 根据url地址下载
     *
     * @param url
     * @returns
     */
    function download(url) {
      var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
      var isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
      if (isChrome || isSafari) {
        var link = document.createElement("a");
        link.href = url;
        if (link.download !== undefined) {
          var fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
          link.download = fileName;
        }
        if (document.createEvent) {
          var e = document.createEvent("MouseEvents");
          e.initEvent("click", true, true);
          link.dispatchEvent(e);
          return true;
        }
      }
      if (url.indexOf("?") === -1) {
        url += "?download";
      }
      window.open(url, "_self");
      return true;
    }
    /**
     * el是否包含某个class
     *
     * @param el
     * @param className
     * @returns
     */
    function hasClass(el, className) {
      let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
      return reg.test(el.className);
    }
    /**
     * el添加某个class
     *
     * @param el
     * @param className
     * @returns
     */
    function addClass(el, className) {
      if (hasClass(el, className)) {
        return;
      }
      let newClass = el.className.split(" ");
      newClass.push(className);
      el.className = newClass.join(" ");
    }
    /**
     * el去除某个class
     *
     * @param el
     * @param className
     * @returns
     */
    function removeClass(el, className) {
      if (!hasClass(el, className)) {
        return;
      }
      let reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
      el.className = el.className.replace(reg, " ");
    }
    /**
     * 获取滚动的坐标
     *
     * @param el
     * @returns
     */
    function getScrollPosition(el = window) {
      let x = el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft;
      let y = el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop;
      return {
        x,
        y
      };
    }
    /**
     * 动态引入js
     *
     * @param src
     */
    function injectScript(src) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = src;
      const t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(s, t);
    }
    /**
     * el是否在视口范围内
     *
     * @param el
     * @param partiallyVisible
     * @returns
     */
    function elementIsVisibleInViewport(el, partiallyVisible = false) {
      const {
        top,
        left,
        bottom,
        right
      } = el.getBoundingClientRect();
      const {
        innerHeight,
        innerWidth
      } = window;
      return partiallyVisible ? (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    }
    var evt = {
      scrollToTop,
      download,
      hasClass,
      addClass,
      removeClass,
      getScrollPosition,
      copyTextToClipboard,
      injectScript,
      elementIsVisibleInViewport
    };
    function toRgb(val, alpha) {
      //16进制颜色值校验规则
      let reg = /^(#?)[a-fA-F0-9]{6}$/;
      //判断是否有设置不透明度
      let isAlpha = typeof alpha == "number";
      //如果值不符合规则返回空字符
      if (!reg.test(val)) {
        return "";
      }
      //如果有#号先去除#号
      let v = val.replace(/#/, "");
      let rgbArr = [];
      let rgbStr = "";
      for (let i = 0; i < 3; i++) {
        let item = v.substring(i * 2, i * 2 + 2);
        let num = parseInt(item, 16);
        rgbArr.push(num);
      }
      rgbStr = rgbArr.join();
      rgbStr = "rgb" + (isAlpha ? "a" : "") + "(" + rgbStr + (isAlpha ? "," + alpha : "") + ")";
      return rgbStr;
    }
    var color = {
      toRgb
    };
    var BrowserType;
    (function (BrowserType) {
      // 未知浏览器
      BrowserType["unknown"] = "unknown";
      // ie浏览器
      BrowserType["IE"] = "IE";
      // 火狐浏览器
      BrowserType["Firefox"] = "Firefox";
      // 欧朋浏览器
      BrowserType["Opera"] = "Opera";
      // 谷歌浏览器
      BrowserType["Chrome"] = "Chrome";
      // 苹果浏览器
      BrowserType["Safari"] = "Safari";
      // ie浏览器 11
      BrowserType["Trident"] = "Trident";
    })(BrowserType || (BrowserType = {}));
    const userAgent = navigator.userAgent.toLowerCase();
    /**
     * 是否安卓设备
     * @returns
     */
    function isAndroid() {
      return /(adr|android)/i.test(userAgent);
    }
    /**
     * 是否ios设备
     * @returns
     */
    function isIos() {
      return /(iphone|ipad|ipod|ios)/i.test(userAgent);
    }
    /**
     * 是否移动设备
     * @returns
     */
    function isMobile() {
      return isAndroid() || isIos();
    }
    /**
     * 是否微信浏览器
     *
     * @returns
     */
    function isWeiXinBrowser() {
      return userAgent.match(/microMessenger/i) === "micromessenger";
    }
    /**
     * 是否QQ浏览器
     *
     * @returns
     */
    function isQQBrowser() {
      return !!userAgent.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
    }
    /**
     * 是否是爬虫
     *
     * @returns
     */
    function isSpider() {
      return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(userAgent);
    }
    /**
     * 是否pc
     *
     * @returns
     */
    function isPc() {
      let userAgentInfo = navigator.userAgent;
      let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      let flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
    // 获取浏览器类型
    function getBrowserType() {
      const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      let browser = BrowserType.unknown;
      if (userAgent.indexOf(BrowserType.IE) != -1) {
        //字符串含有IE字段，表明是IE浏览器
        browser = BrowserType.IE;
      } else if (userAgent.indexOf(BrowserType.Firefox) != -1) {
        //字符串含有Firefox字段，表明是火狐浏览器
        browser = BrowserType.Firefox;
      } else if (userAgent.indexOf("OPR") != -1) {
        //Opera
        browser = BrowserType.Opera;
      } else if (userAgent.indexOf(BrowserType.Chrome) != -1) {
        //Chrome
        browser = BrowserType.Chrome;
      } else if (userAgent.indexOf(BrowserType.Safari) != -1) {
        //Safari
        browser = BrowserType.Safari;
      } else if (userAgent.indexOf(BrowserType.Trident) != -1) {
        //IE内核
        browser = BrowserType.Trident;
      }
      return browser;
    }
    var device = {
      userAgent,
      isAndroid,
      isIos,
      isMobile,
      isWeiXinBrowser,
      isQQBrowser,
      isPc,
      isSpider,
      getBrowserType
    };

    // 本地缓存保存
    function sl(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.log(`localStorage存储${key}失败`, err);
      }
    }
    // 本地缓存读取
    function gl(key) {
      let result;
      try {
        const value = localStorage.getItem(key) || "";
        result = JSON.parse(value);
      } catch (err) {
        console.log(`localStorage获取${key}失败`, err);
      }
      return result;
    }
    // 本地缓存删除
    function rl(key) {
      localStorage.removeItem(key);
    }
    // 本地缓存清空
    function cl() {
      localStorage.clear();
    }
    // session缓存保存
    function ss(key, value) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.log(`sessionStorage存储${key}失败`, err);
      }
    }
    // session缓存读取
    function gs(key) {
      let result;
      try {
        const value = sessionStorage.getItem(key) || "";
        result = JSON.parse(value);
      } catch (err) {
        console.log(`sessionStorage获取${key}失败`, err);
      }
      return result;
    }
    // session缓存删除
    function rs(key) {
      sessionStorage.removeItem(key);
    }
    // session缓存清空
    function cs() {
      sessionStorage.clear();
    }
    var cache = {
      sl,
      gl,
      rl,
      cl,
      ss,
      gs,
      rs,
      cs
    };
    const versoin = "0.0.1";
    const Palm = {
      versoin,
      math,
      urls,
      validator,
      str,
      password,
      arr,
      evt,
      color,
      device,
      cache
    };

    let t = Palm.device.getBrowserType();
    console.log('浏览器类型', t);
    // 文件复制
    document.getElementById('btn')?.addEventListener('click', () => {
        Palm.evt.copyTextToClipboard('hello');
    }, true);

}));
