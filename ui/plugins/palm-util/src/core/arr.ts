/**
 * 平均值
 *
 * @param arr
 * @returns
 */
export function average(arr: Array<any>) {
  return sum(arr) / arr.length;
}

/**
 * 求和
 *
 * @param arr
 * @returns 返回相加值
 */
export function sum(arr: Array<any>) {
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
export function max(arr: Array<any>) {
  return Math.max.apply(null, arr);
}

/**
 * 最小值
 *
 * @param arr
 * @returns
 */
export function min(arr: Array<any>) {
  return Math.min.apply(null, arr);
}

/**
 * 将类数组转换为数组
 *
 * @param ary
 * @returns
 */
export function formArray(ary: Array<any>) {
  var arr: any[] = [];
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
export function remove(arr: any, ele: any) {
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
export function intersect(a: any, b: any) {
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
export function union(a: any, b: any) {
  var newArr = a.concat(b);
  return unique(newArr);
}

/**
 * 数组去重复
 *
 * @param arr
 * @returns
 */
export function unique(arr: Array<any>) {
  if (Array.hasOwnProperty("from")) {
    return Array.from(new Set(arr));
  } else {
    let n: any[] = [];
    let r: any[] = [];
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
export function sort(arr: any, type = 1) {
  return arr.sort((a: any, b: any) => {
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
export function contains(arr: any, val: any) {
  return arr.indexOf(val) != -1 ? true : false;
}

export default {
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
  contains,
};
