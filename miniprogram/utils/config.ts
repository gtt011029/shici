// 环境配置
interface Config {
  BASE_URL: string;
  API_TIMEOUT: number;
}

// 开发环境配置
const devConfig: Config = {
  BASE_URL: 'http://localhost:3000/api',
  API_TIMEOUT: 10000
};

// 生产环境配置
const prodConfig: Config = {
  BASE_URL: 'https://your-production-domain.com/api', // 请替换为你的生产环境域名
  API_TIMEOUT: 10000
};

// 根据环境选择配置
const isDev = true; // 开发环境设置为true，生产环境设置为false
const config: Config = isDev ? devConfig : prodConfig;

export default config;
