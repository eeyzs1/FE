# 第 13 课：部署与生产环境

> 🎯 学习目标：掌握 Qwik 应用的构建、优化和部署流程，将应用发布到生产环境

---

## 一、构建生产版本

### 1.1 构建命令

```bash
# 构建客户端 + 服务端
pnpm build

# 构建后预览
pnpm preview
```

构建后会在 `dist/` 目录生成：

```
dist/
├── build/              # 客户端 JS chunks（按需加载）
│   ├── q-*.js          # 组件、事件处理器等代码片段
│   └── q-*.css         # 样式片段
├── server/             # 服务端代码
│   ├── entry.ssr.js    # SSR 入口
│   └── ...
└── client/             # 静态资源
    ├── manifest.json
    ├── favicon.svg
    └── ...
```

### 1.2 构建产物分析

Qwik 的构建产物与传统 SPA 不同：

| 产物 | 说明 | 大小 |
|---|---|---|
| Qwik 运行时 | 核心框架代码 | ~1KB |
| 组件 chunks | 每个组件独立 chunk | 按需加载 |
| 事件处理器 chunks | 每个事件处理器独立 chunk | 按需加载 |
| 样式 chunks | 每个组件的样式独立 chunk | 按需加载 |
| SSR bundle | 服务端渲染代码 | 服务器端 |

**关键：** 用户首屏只需下载 ~1KB 的运行时 + 当前页面的 HTML，其余代码按需加载。

---

## 二、适配器（Adapters）

Qwik 使用适配器将应用部署到不同的平台。适配器决定了服务端代码如何运行。

### 2.1 添加适配器

```bash
# Cloudflare Pages
pnpm qwik add cloudflare-pages

# Vercel Edge
pnpm qwik add vercel-edge

# Netlify Edge
pnpm qwik add netlify-edge

# Node.js 服务器
pnpm qwik add node-server

# Deno
pnpm qwik add deno-server
```

添加适配器后，会自动创建对应的 entry 文件和配置。

### 2.2 Node.js 适配器

最通用的适配器，可以部署到任何支持 Node.js 的服务器：

```bash
pnpm qwik add node-server
```

生成的 entry 文件：

```tsx
// src/entry.express.tsx
import { createQwikCity } from '@builder.io/qwik-city/middleware/express';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';

const { router, notFound } = createQwikCity({ render, qwikCityPlan });

export { router, notFound };
```

启动生产服务器：

```bash
# 构建后启动
pnpm build
node server/entry.express
```

### 2.3 Cloudflare Pages 适配器

适合边缘部署，全球低延迟：

```bash
pnpm qwik add cloudflare-pages
```

部署：

```bash
# 使用 Wrangler CLI 部署
npx wrangler pages deploy dist
```

### 2.4 Vercel Edge 适配器

```bash
pnpm qwik add vercel-edge
```

部署：推送到 GitHub 后，Vercel 会自动检测并部署。

### 2.5 适配器选择指南

| 平台 | 适配器 | 优势 | 适合场景 |
|---|---|---|---|
| Node.js | `node-server` | 完全控制、支持所有 API | 自有服务器、Docker |
| Cloudflare | `cloudflare-pages` | 全球边缘、低延迟 | 高流量全球站点 |
| Vercel | `vercel-edge` | 零配置部署、预览部署 | 快速迭代、团队协作 |
| Netlify | `netlify-edge` | 简单部署、表单处理 | 内容型网站 |
| Deno | `deno-server` | 安全沙箱、TypeScript 原生 | Deno 生态项目 |

---

## 三、环境变量

### 3.1 定义环境变量

在项目根目录创建 `.env` 文件：

```bash
# .env
DATABASE_URL=postgresql://...
API_KEY=sk-...
PUBLIC_SITE_URL=https://example.com
```

**命名规则：**
- `PUBLIC_` 前缀的变量会暴露到浏览器端
- 没有前缀的变量只在服务器端可用

### 3.2 在代码中使用

```tsx
// 服务器端（loader、action、middleware、server$）
export const useData = routeLoader$(async ({ env }) => {
  const apiKey = env.get('API_KEY');
  const dbUrl = env.get('DATABASE_URL');
  // ...
});

// 浏览器端（通过 import.meta.env）
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

### 3.3 平台特定的环境变量

不同平台设置环境变量的方式不同：

```bash
# Cloudflare — 在 wrangler.toml 或 dashboard 中设置
# Vercel — 在项目设置中添加
# Netlify — 在 netlify.toml 或 dashboard 中设置
# Node.js — 在启动命令中设置
DATABASE_URL=xxx node server/entry.express
```

---

## 四、静态站点生成（SSG）

如果你的站点内容不频繁变化，可以在构建时预渲染为静态 HTML：

### 4.1 配置 SSG

```tsx
// vite.config.ts
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        trailingSlash: true,
      }),
      qwikVite(),
    ],
  };
});
```

### 4.2 预渲染特定页面

```tsx
// src/routes/index.tsx
export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [
      { slug: 'hello-world' },
      { slug: 'getting-started' },
    ],
  };
};
```

---

## 五、性能优化清单

### 5.1 构建时优化

- [ ] 确认所有 qwik 相关包在 `devDependencies` 中（不在 `dependencies` 中）
- [ ] 使用 `pnpm build` 构建生产版本
- [ ] 检查 `dist/build/` 中的 chunk 大小是否合理
- [ ] 确认没有重复依赖

### 5.2 运行时优化

- [ ] 首屏加载 JS < 10KB（不含第三方库）
- [ ] 使用 `routeLoader$` 而非 `useResource$` 加载首屏数据
- [ ] 避免不必要的 `useVisibleTask$`
- [ ] 使用 `useComputed$` 替代组件函数中的计算
- [ ] 只读场景传 `signal.value` 而非整个 `signal`

### 5.3 部署后验证

- [ ] 使用 Lighthouse 测试性能分数
- [ ] 检查 Core Web Vitals（LCP < 2.5s, FID < 100ms, CLS < 0.1）
- [ ] 验证 SSR 输出包含完整内容（查看页面源代码）
- [ ] 测试 SPA 导航是否正常
- [ ] 测试 JS 禁用时页面是否仍可基本使用

---

## 六、Docker 部署示例

```dockerfile
# Dockerfile
FROM node:20-slim AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/server/entry.express.js"]
```

```bash
# 构建和运行
docker build -t qwik-app .
docker run -p 3000:3000 qwik-app
```

---

## 七、动手实践

### 练习 1：部署到 Cloudflare Pages

1. 添加 Cloudflare Pages 适配器
2. 构建生产版本
3. 使用 Wrangler 部署
4. 验证线上应用正常工作

### 练习 2：Docker 部署

1. 创建 Dockerfile
2. 构建镜像并运行
3. 测试 SSR 和 SPA 导航

### 练习 3：性能审计

1. 部署应用后，使用 Lighthouse 运行性能测试
2. 记录 Core Web Vitals 指标
3. 根据第 11 课的最佳实践优化
4. 重新测试对比

---

## 八、大师洞察

### 边缘部署是 Qwik 的最佳搭档

Qwik 的可恢复性 + 边缘部署 = 极致性能：
- 边缘节点离用户更近，减少网络延迟
- 可恢复性消除了水合开销
- 按需加载减少了数据传输量
- 三者叠加，TTI 可以做到 < 100ms

### SSR vs SSG 的选择

| 场景 | 推荐 | 原因 |
|---|---|---|
| 动态内容（用户数据、实时信息） | SSR | 每次请求生成最新内容 |
| 静态内容（博客、文档） | SSG | 构建时生成，响应更快 |
| 混合内容 | SSR + 缓存 | 动态内容 SSR，静态内容缓存 |

---

✅ 完成本课后，你应该能够：
- [ ] 构建生产版本并分析产物
- [ ] 选择合适的适配器并部署
- [ ] 配置环境变量
- [ ] 使用 Docker 容器化部署
- [ ] 进行部署后的性能审计
- [ ] 理解 SSR vs SSG 的选择
