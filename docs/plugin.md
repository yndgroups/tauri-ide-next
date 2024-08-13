# 插件开发流程
开发注意事项
- 命名
- pnpm-workspace.yaml添加插件路径

## 引入
- ui
在 package.json中引入



- tauri
在`[dependencies]`下进行指定目录引入
tauri-plugin-ai = { path = "../plugins/ai"}



## 问题
> Unhandled Promise Rejection: api.send_ask not allowed. Plugin did not define its manifest
- 查看是否定义错误
- 添加调用授权
