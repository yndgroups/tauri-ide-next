import { BrowserType } from "../type";

export const userAgent = navigator.userAgent.toLowerCase() as any;

/**
 * 是否安卓设备
 * @returns
 */
export function isAndroid(): boolean {
  return /(adr|android)/i.test(userAgent);
}

/**
 * 是否ios设备
 * @returns
 */
export function isIos() {
  return /(iphone|ipad|ipod|ios)/i.test(userAgent);
}

/**
 * 是否移动设备
 * @returns
 */
export function isMobile() {
  return isAndroid() || isIos();
}

/**
 * 是否微信浏览器
 *
 * @returns
 */
export function isWeiXinBrowser() {
  return userAgent.match(/microMessenger/i) === "micromessenger";
}

/**
 * 是否QQ浏览器
 *
 * @returns
 */
export function isQQBrowser() {
  return !!userAgent.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
}

/**
 * 是否是爬虫
 *
 * @returns
 */
export function isSpider() {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(
    userAgent
  );
}

/**
 * 是否pc
 *
 * @returns
 */
export function isPc() {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
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
export function getBrowserType() {
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

export default {
  userAgent,
  isAndroid,
  isIos,
  isMobile,
  isWeiXinBrowser,
  isQQBrowser,
  isPc,
  isSpider,
  getBrowserType,
};
