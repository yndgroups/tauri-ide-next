import Palm from "../dist/index.js";

let t = Palm.device.getBrowserType()
console.log('浏览器类型', t)

// 文件复制
document.getElementById('btn')?.addEventListener('click', () => {
  Palm.evt.copyTextToClipboard('这段文字会被剪切，但是必须同意使用剪切板')
}, true)