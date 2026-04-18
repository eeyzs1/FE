# Astro 大师之路 — 自学指南

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器访问
# http://localhost:4321
```

---

## 项目结构

```
astro/
├── ASTRO_MASTERY_TUTORIAL.md    ← 📖 完整教程（30节课）
├── PROGRESS.md                  ← ✅ 学习进度追踪
├── README.md                    ← 📋 你正在读的文件
│
├── src/
│   ├── components/              ← 组件目录
│   │   ├── Card.astro           ← 第5课练习：Props 组件
│   │   ├── Greeting.astro       ← 第4课练习：基础组件
│   │   ├── Nav.astro            ← 第7课练习：条件渲染
│   │   ├── ThemeCard.astro      ← 第13课练习：动态样式
│   │   ├── Counter.tsx          ← 第19课练习：React 组件
│   │   ├── MouseFollower.tsx    ← 第20课练习：客户端指令
│   │   └── Welcome.astro        ← 默认欢迎组件
│   │
│   ├── layouts/                 ← 布局目录
│   │   ├── Layout.astro         ← 原始布局
│   │   └── BaseLayout.astro     ← 第6课练习：具名插槽布局
│   │
│   ├── pages/                   ← 页面路由目录
│   │   ├── index.astro          ← 首页 /
│   │   ├── about.astro          ← 第2课练习：/about
│   │   ├── playground.astro     ← 综合练习场：/playground
│   │   ├── blog/
│   │   │   ├── index.astro      ← 第8课练习：/blog
│   │   │   └── [slug].astro     ← 第9课练习：/blog/:slug
│   │   └── projects/
│   │       └── [id].astro       ← 第9课练习：/projects/:id
│   │
│   ├── content/                 ← 内容集合目录
│   │   └── blog/                ← 博客内容
│   │       ├── getting-started.md
│   │       ├── islands-architecture.md
│   │       └── content-collections.md
│   │
│   │   └── assets/                  ← 构建优化的资源
│   │       ├── astro.svg
│   │       └── background.svg
│   │
│   └── content.config.ts         ← 第16课练习：内容集合配置（Astro 6 新位置）
│
├── public/                      ← 静态资源（原样复制）
│   ├── favicon.ico
│   └── favicon.svg
│
├── astro.config.mjs             ← Astro 配置（已启用 React）
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 自学方法

### 第一步：阅读教程

打开 [ASTRO_MASTERY_TUTORIAL.md](./ASTRO_MASTERY_TUTORIAL.md)，这是你的主教材，包含 9 个阶段、30 节课。

### 第二步：边学边改

每节课都有「动手练习」，项目里已经预置了练习文件：

| 课次 | 练习内容 | 对应文件 |
|------|---------|---------|
| 第2课 | 创建 about 页面 | `src/pages/about.astro` ✅ 已创建 |
| 第4课 | 基础组件 | `src/components/Greeting.astro` ✅ 已创建 |
| 第5课 | Props 传参 | `src/components/Card.astro` ✅ 已创建 |
| 第6课 | 具名插槽 | `src/layouts/BaseLayout.astro` ✅ 已创建 |
| 第7课 | 条件渲染 | `src/components/Nav.astro` ✅ 已创建 |
| 第8课 | 文件路由 | `src/pages/blog/index.astro` ✅ 已创建 |
| 第9课 | 动态路由 | `src/pages/blog/[slug].astro` ✅ 已创建 |
| 第9课 | 动态路由 | `src/pages/projects/[id].astro` ✅ 已创建 |
| 第13课 | 动态样式 | `src/components/ThemeCard.astro` ✅ 已创建 |
| 第16课 | 内容集合 | `src/content.config.ts` ✅ 已创建 |
| 第19课 | React 集成 | `src/components/Counter.tsx` ✅ 已创建 |
| 第20课 | 客户端指令 | `src/components/MouseFollower.tsx` ✅ 已创建 |

**建议学习方式**：先读教程理解概念 → 打开对应文件阅读代码 → 尝试修改代码观察效果 → 完成练习中的扩展任务

### 第三步：使用 Playground

访问 `http://localhost:4321/playground` 可以看到所有组件的综合展示页面，方便你观察和调试。

### 第四步：追踪进度

打开 [PROGRESS.md](./PROGRESS.md)，每完成一课就标记进度，记录你的学习心得。

---

## 可用页面一览

启动 `pnpm dev` 后，你可以访问以下页面：

| URL | 说明 | 涉及课程 |
|-----|------|---------|
| `/` | 首页（默认欢迎页） | 第1课 |
| `/about` | 关于页 | 第2课 |
| `/playground` | 综合练习场 | 第4-20课 |
| `/blog` | 博客列表 | 第8课 |
| `/blog/first-post` | 博客文章 | 第9课 |
| `/blog/second-post` | 博客文章 | 第9课 |
| `/blog/third-post` | 博客文章 | 第9课 |
| `/projects/1` | 项目详情 | 第9课 |
| `/projects/2` | 项目详情 | 第9课 |
| `/projects/3` | 项目详情 | 第9课 |

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（localhost:4321） |
| `pnpm build` | 构建生产版本到 `./dist/` |
| `pnpm preview` | 预览构建结果 |
| `npx astro add <integration>` | 添加集成（如 tailwind, vue 等） |

---

## 学习资源

- 📖 [Astro 官方文档](https://docs.astro.build)
- 📖 [本教程主教材](./ASTRO_MASTERY_TUTORIAL.md)
- ✅ [学习进度追踪](./PROGRESS.md)
- 🎮 [Astro 在线演练场](https://astro.new)
- 💬 [Astro Discord 社区](https://astro.build/chat)
