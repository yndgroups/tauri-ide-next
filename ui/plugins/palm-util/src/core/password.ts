/**
 * 检测密码强度
 *
 * @param str 密码字符串
 *
 * @returns
 */
export function checkLevel(str: string): number {
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

export default {
  checkLevel,
};
