// make-comp.js
const fs = require('fs');
const path = require('path');

const name = process.argv[2];
if (!name) {
  console.error('❌ 请输入组件名，例如: node make-comp.js my-component');
  process.exit(1);
}

const projectPath = path.join(__dirname, '..') // 项目根目录
const dir = path.join(projectPath, 'miniprogram/components', name);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const files = {
  [`${name}.json`]: JSON.stringify({ component: true }, null, 2),
  [`${name}.wxml`]: `<view class="${name}">\n  <!-- ${name} 组件模板 -->\n</view>`,
  [`${name}.wxss`]: `.${name} {\n  /* 样式 */\n}`,
  [`${name}.js`]: `Component({\n  properties: {},\n  data: {},\n  methods: {}\n});`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, file), content);
}

console.log(`✅ 组件 ${name} 创建成功！`);
