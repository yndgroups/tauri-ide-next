/* ==============================
 * URL相关工具包
 * author: 杨大琼
 * email: yangdaqiong@126.com
 * date: 2021-06
 * ============================= */

import { AnyObj } from "../type";

/**
 * 是否url地址
 *
 * @param str 字符串参数
 * @returns 布尔值
 */
export function isURL(str: string): boolean {
  return /^http[s]?:\/\/.*/.test(str);
}

/**
 *
 * @param path 图片地址
 * @param origin 图片文件主机名
 * @returns 返回处理后的文件路径
 */
export function loadImg(path: string, domain?: string): string {
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
export function stringify(params: any, apiPath?: string): any {
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
export function depthPramas(params: any, prekey?: string) {
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
export function parse(params: string): any {
  if (params && typeof params === "object") {
    return "";
  }
  let paramsArr = params.split("&");
  let obj: AnyObj = {};
  if (paramsArr.length) {
    paramsArr.map((item: string) => {
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

/**
 * 获取url参数
 *
 * @param name
 * @returns
 */
export function getUrlString(name: string) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const search = window.location.search.split("?")[1] || "";
  const r = search.match(reg) || [];
  return r[2];
}

export async function exportCsv(JSONlist: Array<any>, title: Array<AnyObj>) {
  let csvString = "";
  JSONlist.map((item: any) => {
    Object.keys(title).map((key: string) => {
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
export const JSONToExcelConvertor = async (
  JSONData: any[],
  title: any[],
  filter: any
) => {
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
  let excelFile =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile +=
    '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile +=
    '<meta http-equiv="content-type" content="application/vnd.ms-excel';
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
  let uri =
    "data:application/vnd.ms-excel;charset=utf-8," +
    encodeURIComponent(excelFile);
  return uri;
};

export default {
  isURL,
  loadImg,
  stringify,
  parse,
  exportCsv,
  JSONToExcelConvertor,
};
