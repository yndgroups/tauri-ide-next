
export function toRgb(val: any, alpha: any): any {
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
  let rgbArr: Array<number> = [];
  let rgbStr = "";
  for (let i = 0; i < 3; i++) {
    let item = v.substring(i * 2, i * 2 + 2);
    let num = parseInt(item, 16);
    rgbArr.push(num);
  }
  rgbStr = rgbArr.join();
  rgbStr =
    "rgb" +
    (isAlpha ? "a" : "") +
    "(" +
    rgbStr +
    (isAlpha ? "," + alpha : "") +
    ")";
  return rgbStr;
}

export default {
  toRgb,
};
