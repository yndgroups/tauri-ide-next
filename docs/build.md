# 构建

## 构建x86_64程序
- 添加构建环境
```
rustup target add x86_64-apple-darwin 
```
- 执行命令
> nodej命令
```
pnpm build:mac-x86_64
```
> cargo 命令
```
tauri build --target x86_64-apple-darwin
```