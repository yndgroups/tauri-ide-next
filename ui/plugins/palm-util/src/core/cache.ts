// 本地缓存保存
function sl(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(`localStorage存储${key}失败`, err);
  }
}

// 本地缓存读取
function gl(key: string) {
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
function rl(key: string) {
  localStorage.removeItem(key);
}

// 本地缓存清空
function cl() {
  localStorage.clear();
}

// session缓存保存
function ss(key: string, value: any) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(`sessionStorage存储${key}失败`, err);
  }
}

// session缓存读取
function gs(key: string) {
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
function rs(key: string) {
  sessionStorage.removeItem(key);
}

// session缓存清空
function cs() {
  sessionStorage.clear();
}

export default {
  sl,
  gl,
  rl,
  cl,
  ss,
  gs,
  rs,
  cs,
};
