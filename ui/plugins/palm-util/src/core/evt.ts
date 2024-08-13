/**
 * 文本复制
 *
 * @param value
 */
export function copyTextToClipboard(value: any) {
  navigator.clipboard.writeText(value).then(
    function () {
      console.info('复制成功')
    },
    function () {
      console.warn('复制失败')
    },
  );
}

/**
 * 滚动到顶部
 */
export function scrollToTop() {
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
export function download(url: string) {
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
export function hasClass(el: any, className: string) {
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
export function addClass(el: any, className: string) {
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
export function removeClass(el: any, className: string) {
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
export function getScrollPosition(el: any = window) {
  let x = el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft;
  let y = el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop;
  return {
    x,
    y,
  };
}

/**
 * 动态引入js
 *
 * @param src
 */
export function injectScript(src: string) {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = src;
  const t = document.getElementsByTagName("script")[0] as any;
  t.parentNode.insertBefore(s, t);
}

/**
 * 去除html标签
 *
 * @param str
 * @returns
 */
export function removeHtmltag(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

/**
 * el是否在视口范围内
 *
 * @param el
 * @param partiallyVisible
 * @returns
 */
export function elementIsVisibleInViewport(el: any, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

export default {
  scrollToTop,
  download,
  hasClass,
  addClass,
  removeClass,
  getScrollPosition,
  copyTextToClipboard,
  injectScript,
  elementIsVisibleInViewport,
};
