# 诗词小程序后端API

这是一个为诗词小程序提供数据服务的后端API，使用Node.js + Express + MongoDB构建。

## 功能特性

- 诗词数据管理（增删改查）
- 诗词搜索（支持标题、作者、内容、标签搜索）
- 用户收藏功能
- 分页查询
- 数据筛选（按年级、类型、作者、朝代等）
- 推荐诗词
- 健康检查

## 技术栈

- **Node.js** - 运行环境
- **Express** - Web框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **CORS** - 跨域处理
- **Helmet** - 安全中间件
- **Compression** - 响应压缩
- **Rate Limit** - 请求频率限制

## 安装和运行

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

复制 `config.env` 文件并修改配置：

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/poetry_db
NODE_ENV=development
```

### 3. 启动MongoDB

确保MongoDB服务已启动，或者使用Docker：

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. 初始化数据

```bash
node scripts/initData.js
```

### 5. 启动服务

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

服务将在 `http://localhost:3000` 启动

## API接口文档

### 基础信息

- 基础URL: `http://localhost:3000/api`
- 响应格式: JSON
- 字符编码: UTF-8

### 通用响应格式

```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 诗词相关接口

#### 1. 获取诗词列表

```
GET /api/poetry/list
```

**查询参数：**
- `page` - 页码（默认1）
- `limit` - 每页数量（默认20）
- `grade` - 年级筛选（primary/middle/high）
- `type` - 类型筛选（classic/tangshi/songci/yuanqu）
- `keyword` - 关键词搜索
- `author` - 作者筛选
- `dynasty` - 朝代筛选

**响应示例：**
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": "1",
        "title": "静夜思",
        "author": "李白",
        "dynasty": "唐",
        "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
        "tags": ["思乡", "月亮", "夜晚"],
        "grade": "primary",
        "type": "classic",
        "length": 20
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

#### 2. 获取诗词详情

```
GET /api/poetry/detail/:id
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "静夜思",
    "author": "李白",
    "dynasty": "唐",
    "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
    "contentLines": ["床前明月光，", "疑是地上霜。", "举头望明月，", "低头思故乡。"],
    "tags": ["思乡", "月亮", "夜晚"],
    "grade": "primary",
    "type": "classic",
    "length": 20,
    "analysis": "这首诗以月光为线索...",
    "translation": "床前明亮的月光洒在地上...",
    "authorInfo": "李白（701年-762年）..."
  }
}
```

#### 3. 搜索诗词

```
GET /api/poetry/search?keyword=月亮
```

#### 4. 获取推荐诗词

```
GET /api/poetry/recommend?limit=10
```

#### 5. 获取作者列表

```
GET /api/poetry/authors?dynasty=唐
```

#### 6. 获取朝代列表

```
GET /api/poetry/dynasties
```

#### 7. 获取标签列表

```
GET /api/poetry/tags
```

### 收藏相关接口

#### 1. 获取收藏列表

```
GET /api/collection/list?userId=123&page=1&limit=20
```

#### 2. 添加收藏

```
POST /api/collection/add
Content-Type: application/json

{
  "userId": "123",
  "poetryId": "1"
}
```

#### 3. 取消收藏

```
DELETE /api/collection/remove?userId=123&poetryId=1
```

#### 4. 检查收藏状态

```
GET /api/collection/check?userId=123&poetryId=1
```

#### 5. 获取收藏数量

```
GET /api/collection/count?userId=123
```

### 健康检查

```
GET /health
```

## 数据库设计

### Poetry集合

```javascript
{
  id: String,           // 诗词ID
  title: String,        // 标题
  author: String,       // 作者
  dynasty: String,      // 朝代
  tune: String,         // 词牌名（词曲专用）
  content: String,      // 内容
  contentLines: [String], // 分行内容
  tags: [String],       // 标签
  grade: String,        // 年级（primary/middle/high）
  type: String,         // 类型（classic/tangshi/songci/yuanqu）
  length: Number,       // 字数
  analysis: String,     // 赏析
  translation: String,  // 翻译
  authorInfo: String,   // 作者信息
  createdAt: Date,      // 创建时间
  updatedAt: Date       // 更新时间
}
```

### Collection集合

```javascript
{
  userId: String,       // 用户ID
  poetryId: ObjectId,   // 诗词ID（关联Poetry）
  createdAt: Date       // 收藏时间
}
```

## 部署说明

### 生产环境部署

1. 设置环境变量：
```bash
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://your-mongodb-uri
```

2. 使用PM2启动：
```bash
npm install -g pm2
pm2 start server.js --name poetry-api
```

3. 配置Nginx反向代理（可选）

### Docker部署

```bash
# 构建镜像
docker build -t poetry-backend .

# 运行容器
docker run -d -p 3000:3000 --name poetry-api poetry-backend
```

## 开发说明

### 项目结构

```
backend/
├── models/          # 数据模型
├── routes/          # 路由文件
├── scripts/         # 脚本文件
├── server.js        # 主服务器文件
├── package.json     # 项目配置
└── config.env       # 环境配置
```

### 添加新接口

1. 在 `routes/` 目录下创建新的路由文件
2. 在 `server.js` 中注册路由
3. 更新API文档

### 数据迁移

使用 `scripts/initData.js` 脚本进行数据初始化或迁移。

## 注意事项

1. 确保MongoDB服务正常运行
2. 生产环境请修改CORS配置
3. 建议使用HTTPS协议
4. 定期备份数据库
5. 监控服务状态和性能

## 许可证

MIT License
