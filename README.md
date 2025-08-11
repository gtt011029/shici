# 诗词小程序项目

这是一个完整的诗词学习小程序项目，包含前端微信小程序和后端API服务。

## 项目结构

```
miniprogram-1/
├── miniprogram/          # 微信小程序前端
│   ├── pages/           # 页面文件
│   ├── components/      # 组件文件
│   ├── utils/           # 工具函数
│   └── ...
├── backend/             # 后端API服务
│   ├── models/          # 数据模型
│   ├── routes/          # API路由
│   ├── scripts/         # 脚本文件
│   └── ...
└── README.md           # 项目说明
```

## 功能特性

### 前端功能
- 诗词浏览和搜索
- 诗词详情展示（包含赏析、翻译、作者信息）
- 收藏功能
- 分类浏览（经典、唐诗、宋词、元曲）
- 年级筛选（小学、中学、高中）
- 响应式设计

### 后端功能
- RESTful API设计
- 诗词数据管理
- 用户收藏管理
- 全文搜索
- 分页查询
- 数据筛选
- 健康检查

## 技术栈

### 前端
- **微信小程序** - 前端框架
- **TypeScript** - 开发语言
- **Less** - 样式预处理器

### 后端
- **Node.js** - 运行环境
- **Express** - Web框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **Docker** - 容器化部署

## 快速开始

### 1. 启动后端服务

#### 方式一：使用启动脚本（推荐）

**Windows:**
```bash
cd backend
start.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x start.sh
./start.sh
```

#### 方式二：手动启动

```bash
cd backend
npm install
node scripts/initData.js
npm run dev
```

#### 方式三：使用Docker

```bash
cd backend
docker-compose up -d
```

### 2. 配置小程序

1. 打开微信开发者工具
2. 导入项目（选择 `miniprogram` 目录）
3. 在 `miniprogram/utils/api.ts` 中确认API地址配置正确

### 3. 测试API

访问 `http://localhost:3000/health` 检查服务状态

## API接口

### 基础信息
- 基础URL: `http://localhost:3000/api`
- 响应格式: JSON

### 主要接口

#### 诗词相关
- `GET /api/poetry/list` - 获取诗词列表
- `GET /api/poetry/detail/:id` - 获取诗词详情
- `GET /api/poetry/search` - 搜索诗词
- `GET /api/poetry/recommend` - 获取推荐诗词

#### 收藏相关
- `GET /api/collection/list` - 获取收藏列表
- `POST /api/collection/add` - 添加收藏
- `DELETE /api/collection/remove` - 取消收藏
- `GET /api/collection/check` - 检查收藏状态

详细API文档请参考 `backend/README.md`

## 数据库设计

### Poetry集合
```javascript
{
  id: String,           // 诗词ID
  title: String,        // 标题
  author: String,       // 作者
  dynasty: String,      // 朝代
  content: String,      // 内容
  contentLines: [String], // 分行内容
  tags: [String],       // 标签
  grade: String,        // 年级
  type: String,         // 类型
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
  poetryId: ObjectId,   // 诗词ID
  createdAt: Date       // 收藏时间
}
```

## 开发指南

### 添加新诗词

1. 在 `backend/scripts/initData.js` 中添加诗词数据
2. 运行 `node scripts/initData.js` 更新数据库

### 添加新页面

1. 在 `miniprogram/pages/` 下创建新页面
2. 在 `miniprogram/app.json` 中注册页面路由
3. 在 `miniprogram/utils/api.ts` 中添加相关API调用

### 添加新API

1. 在 `backend/routes/` 下创建新路由文件
2. 在 `backend/server.js` 中注册路由
3. 更新API文档

## 部署说明

### 开发环境
- 后端: `http://localhost:3000`
- 数据库: MongoDB本地实例

### 生产环境
- 使用Docker Compose部署
- 配置Nginx反向代理
- 使用HTTPS协议
- 设置环境变量

## 注意事项

1. 确保MongoDB服务正常运行
2. 生产环境请修改CORS配置
3. 定期备份数据库
4. 监控服务状态和性能
5. 小程序需要在微信开发者工具中配置合法域名

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 联系方式

如有问题，请通过以下方式联系：
- 提交GitHub Issue
- 发送邮件至项目维护者
