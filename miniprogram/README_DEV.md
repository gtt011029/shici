# 微信小程序开发环境配置

## 问题描述
微信小程序在开发环境中不允许直接访问 `http://localhost:3000`，会出现"不在以下 request 合法域名列表中"的错误。

## 解决方案

### 方案1：配置开发环境（已配置）
在 `project.config.json` 中添加了 `"urlCheck": false` 配置，允许在开发环境中访问localhost。

### 方案2：使用内网穿透工具（推荐用于团队开发）

#### 使用 ngrok
1. 安装 ngrok：`npm install -g ngrok`
2. 启动后端服务：`cd backend && npm start`
3. 启动内网穿透：`ngrok http 3000`
4. 将获得的公网地址（如 `https://abc123.ngrok.io`）替换到 `config.ts` 中的 `BASE_URL`

#### 使用 localtunnel
1. 安装 localtunnel：`npm install -g localtunnel`
2. 启动后端服务：`cd backend && npm start`
3. 启动内网穿透：`lt --port 3000`
4. 将获得的公网地址替换到配置中

### 方案3：配置微信开发者工具
1. 打开微信开发者工具
2. 点击右上角"详情"
3. 在"本地设置"中勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

## 环境切换
在 `miniprogram/utils/config.ts` 中：
- 开发环境：设置 `isDev = true`
- 生产环境：设置 `isDev = false` 并配置正确的生产环境域名

## 注意事项
1. 生产环境必须使用HTTPS协议
2. 生产环境的域名需要在微信公众平台配置
3. 开发环境建议使用内网穿透工具，避免频繁修改配置
