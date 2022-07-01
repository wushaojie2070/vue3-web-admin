
```bash
# 克隆项目
git clone https://github.com/jzfai/vue3-admin-plus.git

# 进入项目目录
cd  vue3-admin-plus

# pnpm address https://pnpm.io/zh/motivation
# 安装依赖(建议用pnpm)
# 你可以使用 "npm -g i pnpm@6.32.3" 去安装pnpm
pnpm i

# 启动服务
pnpm run dev
```

浏览器访问 http://localhost:5001


## 发布

```bash
# 构建测试环境
pnpm run build-serve

# 构建生产环境
pnpm run build
```

## 其它

```bash
# 预览发布环境效果
pnpm run preview:build-serve

# 预览生产环境
pnpm run preview

# 代码格式检查并自动修复
pnpm run lint
```