@echo off
echo 正在启动诗词小程序后端服务...
echo.

echo 1. 检查Node.js环境...
node --version
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

echo.
echo 2. 安装依赖包...
npm install
if %errorlevel% neq 0 (
    echo 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 3. 检查MongoDB连接...
echo 请确保MongoDB服务已启动
echo 如果没有安装MongoDB，可以使用Docker运行:
echo docker run -d -p 27017:27017 --name mongodb mongo:latest

echo.
echo 4. 初始化数据...
node scripts/initData.js
if %errorlevel% neq 0 (
    echo 警告: 数据初始化失败，可能是MongoDB未启动
    echo 请先启动MongoDB服务
)

echo.
echo 5. 启动后端服务...
echo 服务将在 http://localhost:3000 启动
echo 按 Ctrl+C 停止服务
echo.
npm run dev
