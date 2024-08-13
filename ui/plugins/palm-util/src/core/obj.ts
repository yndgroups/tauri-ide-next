function cloneDeep(obj) {
  if (typeof obj !== "object") return obj;
  const newObj =
    Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] !== "object" ? obj[key] : cloneDeep(obj[key]);
    }
  }
  return newObj;
}
