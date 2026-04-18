# 🚀 Astro 大师之路 — 从零到精通完整教程

> **适用版本**: Astro 6.x | **你的项目**: 已初始化 Astro 6 + React 集成
> **官方文档**: https://docs.astro.build

---

## 📚 教程总览

本教程分为 **9 大阶段、30 节课**，每节课包含：核心概念讲解 → 代码示例 → 动手练习。

学完后你将掌握 Astro 的所有核心能力，能独立构建生产级网站。

| 阶段 | 主题 | 课时 | 难度 |
|------|------|------|------|
| 1 | 基础认知 | 1-3 | ⭐ |
| 2 | 组件与模板 | 4-7 | ⭐⭐ |
| 3 | 路由与页面 | 8-11 | ⭐⭐ |
| 4 | 样式系统 | 12-14 | ⭐⭐ |
| 5 | 数据与内容集合 | 15-18 | ⭐⭐⭐ |
| 6 | 框架集成（React 等） | 19-21 | ⭐⭐⭐ |
| 7 | 高级模式 | 22-25 | ⭐⭐⭐⭐ |
| 8 | 性能优化与部署 | 26-28 | ⭐⭐⭐⭐ |
| 9 | 毕业项目 | 29-30 | ⭐⭐⭐⭐⭐ |

---

## 阶段 1：基础认知（第 1-3 课）

### 第 1 课：Astro 是什么？为什么选择 Astro？

**核心概念**：

Astro 是一个**内容驱动的静态网站生成器**，它的核心理念是：

1. **默认零 JavaScript** — Astro 生成的页面默认不包含任何 JS，只有纯 HTML+CSS
2. **岛屿架构（Islands Architecture）** — 页面上的交互组件像"岛屿"一样独立存在，互不干扰
3. **内容优先** — 专为内容型网站（博客、文档、营销页）设计
4. **框架无关** — 可以在同一项目中混用 React、Vue、Svelte 等任何框架

**Astro vs 其他框架**：

| 特性 | Astro | Next.js | Nuxt |
|------|-------|---------|------|
| 默认输出 | 纯 HTML | SSR/SSG | SSR/SSG |
| JS 体积 | 极小（按需） | 中等 | 中等 |
| 框架支持 | 任意框架 | 仅 React | 仅 Vue |
| 适用场景 | 内容型网站 | 全栈应用 | 全栈应用 |

**动手练习 1**：启动你的开发服务器

```bash
pnpm dev
```

打开浏览器访问 `http://localhost:4321`，你将看到 Astro 的默认欢迎页面。

---

### 第 2 课：项目结构详解

你当前的项目结构如下，理解每个文件/目录的作用：

```
astro/
├── public/              # 静态资源目录（原样复制到输出）
│   ├── favicon.ico      # 网站图标
│   └── favicon.svg
├── src/
│   ├── assets/          # 需要构建处理的资源（会被优化）
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/      # 可复用的组件
│   │   └── Welcome.astro
│   ├── layouts/         # 页面布局模板
│   │   └── Layout.astro
│   └── pages/           # 页面路由（核心！）
│       └── index.astro
├── astro.config.mjs     # Astro 配置文件
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

**关键区别**：
- `public/` vs `src/assets/`：
  - `public/` 中的文件**原样复制**，不经过任何处理，通过绝对路径 `/favicon.svg` 引用
  - `src/assets/` 中的文件**会被构建优化**（压缩、哈希命名），通过 import 引用

**动手练习 2**：在 `src/pages/` 下创建 `about.astro`，观察路由如何自动生成。

---

### 第 3 课：Astro 配置文件

打开 `astro.config.mjs`：

```js
import { defineConfig } from 'astro/config';

export default defineConfig({});
```

这是最简配置。`defineConfig` 提供类型提示和配置校验。主要配置项：

```js
export default defineConfig({
  site: 'https://example.com',       // 网站URL（用于生成 sitemap 等）
  output: 'static',                   // 'static' | 'server' | 'hybrid'
  build: {
    format: 'directory',              // 'directory' | 'file'
  },
  integrations: [],                   // 集成列表
});
```

**`output` 三种模式**：
- `static`（默认）— 纯静态 HTML，构建时生成所有页面
- `server` — 所有页面默认服务端渲染（SSR）
- `hybrid` — 默认静态，按需开启 SSR

**动手练习 3**：在配置中添加 `site` 字段，设置为你喜欢的域名。

---

## 阶段 2：组件与模板（第 4-7 课）

### 第 4 课：Astro 组件基础

Astro 组件是 `.astro` 文件，由两部分组成：

```astro
---
// 组件脚本（服务端执行，不会发送到浏览器）
const greeting = 'Hello';
---

<!-- 组件模板（HTML） -->
<div>{greeting}</div>

<style>
  /* 组件样式（默认 scoped） */
  div { color: red; }
</style>
```

**三个区域**：
1. **`---` 之间的代码块**（Frontmatter）— 服务端执行的 JavaScript/TypeScript
2. **HTML 模板**— 使用类 JSX 语法
3. **`<style>` 标签**— 默认作用域隔离的 CSS

**关键规则**：
- Frontmatter 中的代码**只在服务端运行**，永远不会出现在浏览器中
- 你可以在 Frontmatter 中做任何 Node.js 的事情：读文件、调 API、查数据库
- 模板中使用 `{}` 插值，类似 JSX

**动手练习 4**：创建 `src/components/Greeting.astro`，显示当前时间和问候语。

---

### 第 5 课：Props — 组件参数传递

组件通过 `Astro.props` 接收外部传入的数据：

```astro
---
// 定义 Props 类型
interface Props {
  title: string;
  count?: number;  // 可选属性
}

const { title, count = 0 } = Astro.props;
---

<div>
  <h2>{title}</h2>
  <p>Count: {count}</p>
</div>
```

使用组件时传入 props：

```astro
---
import Card from '../components/Card.astro';
---

<Card title="Hello" count={42} />
```

**注意**：传递字符串可以直接用 `title="Hello"`，传递数字/布尔/对象必须用 `{}`。

**动手练习 5**：创建一个 `Card.astro` 组件，接收 `title`、`description`、`imageUrl` 三个 props，渲染一个卡片。

---

### 第 6 课：插槽（Slots）— 组件内容分发

`<slot />` 允许组件接收"子内容"：

```astro
<!-- Layout.astro -->
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<html>
  <head><title>{title}</title></head>
  <body>
    <slot />  <!-- 子内容会渲染在这里 -->
  </body>
</html>
```

使用时：

```astro
<Layout title="My Page">
  <p>这段内容会出现在 slot 的位置</p>
</Layout>
```

**具名插槽**：

```astro
<!-- BaseLayout.astro -->
<header><slot name="header" /></header>
<main><slot /></main>            <!-- 默认插槽 -->
<footer><slot name="footer" /></footer>
```

```astro
<BaseLayout>
  <nav slot="header">导航栏</nav>
  <p>主内容</p>                    <!-- 进入默认插槽 -->
  <p slot="footer">版权信息</p>
</BaseLayout>
```

**动手练习 6**：修改你的 `Layout.astro`，添加 `header` 和 `footer` 具名插槽。

---

### 第 7 课：模板语法完整指南

Astro 模板支持以下语法：

**1. 表达式插值**：
```astro
<p>{1 + 1}</p>
<p>{name.toUpperCase()}</p>
```

**2. 动态属性**：
```astro
<div class={isActive ? 'active' : ''}>
<img src={imageUrl} alt={description} />
```

**3. 条件渲染**：
```astro
{isLoggedIn && <p>Welcome back!</p>}
{isAdmin ? <AdminPanel /> : <UserPanel />}
```

**4. 列表渲染**：
```astro
<ul>
  {items.map((item) => (
    <li>{item.name}</li>
  ))}
</ul>
```

**5. 动态 HTML**（谨慎使用）：
```astro
<div set:html={rawHtmlContent} />
```

**6. Fragment**：
```astro
---
const items = ['a', 'b', 'c'];
---
<Fragment>
  {items.map(item => <span>{item}</span>)}
</Fragment>
```

**动手练习 7**：创建一个 `Nav.astro` 组件，根据当前路径高亮对应导航项。

---

## 阶段 3：路由与页面（第 8-11 课）

### 第 8 课：文件路由系统

Astro 使用**基于文件的路由**，`src/pages/` 下的文件结构直接映射为 URL：

```
src/pages/
├── index.astro          → /
├── about.astro          → /about
├── blog/
│   ├── index.astro      → /blog
│   └── post.astro       → /blog/post
└── contact.astro        → /contact
```

**规则**：
- `index.astro` 对应目录的根路径
- 文件名即为路由路径
- 支持 `.astro`、`.md`、`.mdx` 文件

**动手练习 8**：创建以下页面结构：
- `/` 首页
- `/about` 关于页
- `/blog` 博客列表页
- `/blog/first-post` 第一篇博客

---

### 第 9 课：动态路由

使用 `[param]` 语法创建动态路由：

```astro
---
// src/pages/blog/[slug].astro
const { slug } = Astro.params;
---

<h1>Blog Post: {slug}</h1>
```

**静态模式下**，必须使用 `getStaticPaths()` 告诉 Astro 要生成哪些页面：

```astro
---
export function getStaticPaths() {
  return [
    { params: { slug: 'first-post' } },
    { params: { slug: 'second-post' } },
  ];
}

const { slug } = Astro.params;
---

<h1>{slug}</h1>
```

**Rest 参数** `[...slug]` 匹配多级路径：

```astro
---
// src/pages/docs/[...slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: 'getting-started' } },
    { params: { slug: 'api/reference' } },     // 匹配 /docs/api/reference
    { params: { slug: 'api/reference/auth' } }, // 匹配 /docs/api/reference/auth
  ];
}

const { slug } = Astro.params; // 数组: ['api', 'reference']
---
```

**动手练习 9**：创建 `src/pages/projects/[id].astro`，为 3 个项目生成静态页面。

---

### 第 10 课：页面跳转与导航

Astro 使用标准 HTML `<a>` 标签进行导航：

```astro
<a href="/about">About</a>
<a href="/blog/my-post">Blog Post</a>
```

**View Transitions**（Astro 的页面过渡动画）：

在布局中启用：

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

启用后，页面间导航会自动添加过渡动画，且不会丢失页面状态。

**`transition:animate` 指令**：

```astro
<div transition:animate="slide">内容</div>
```

内置动画：`fade`、`slide`、`none`，也支持自定义动画。

**动手练习 10**：在你的 Layout 中添加 View Transitions，体验页面切换动画。

---

### 第 11 课：API 路由（服务端端点）

在 `src/pages/` 下创建 `.ts` 文件定义 API 端点：

```ts
// src/pages/api/hello.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(JSON.stringify({ message: 'Hello!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(JSON.stringify({ received: body }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

访问 `/api/hello` 即可获取数据。

**注意**：API 路由在 `output: 'static'` 模式下不可用，需要 `server` 或 `hybrid` 模式。

**动手练习 11**：将项目切换到 `hybrid` 模式，创建一个返回当前时间的 API 端点。

---

## 阶段 4：样式系统（第 12-14 课）

### 第 12 课：Scoped CSS

Astro 的 `<style>` 标签默认是**作用域隔离**的：

```astro
<style>
  h1 { color: red; }  /* 只影响当前组件的 h1 */
</style>
```

编译后 Astro 会自动添加唯一属性选择器，确保样式不泄漏。

**全局样式**使用 `:global()`：

```astro
<style>
  :global(h1) { color: red; }  /* 影响所有 h1 */
</style>
```

或使用 `<style is:global>`：

```astro
<style is:global>
  h1 { color: red; }  /* 全局生效 */
</style>
```

**动手练习 12**：创建两个组件，各自有 `<style> h1 { color: ... }`，验证样式互不影响。

---

### 第 13 课：CSS 变量与动态样式

在 Frontmatter 中定义变量，通过 `style` 属性传递：

```astro
---
const color = 'red';
---

<div style={`--color: ${color}`}>
  <p>Colored text</p>
</div>

<style>
  p { color: var(--color); }
</style>
```

**`define:vars` 指令**（更优雅的方式）：

```astro
---
const color = 'red';
const size = '16px';
---

<div>
  <p>Styled text</p>
</div>

<style define:vars={{ color, size }}>
  p {
    color: var(--color);
    font-size: var(--size);
  }
</style>
```

**动手练习 13**：创建一个 `ThemeCard.astro`，通过 props 接收主题色，用 `define:vars` 应用。

---

### 第 14 课：集成 CSS 框架

Astro 支持主流 CSS 方案：

**Tailwind CSS**：
```bash
npx astro add tailwind
```

**CSS Modules**（自动支持）：
```astro
---
import styles from './my.module.css';
---

<div class={styles.container}>Content</div>
```

**Sass/SCSS**：
```bash
pnpm add sass
```

然后直接使用 `<style lang="scss">`。

**动手练习 14**：安装 Sass，创建一个使用 SCSS 变量和嵌套的组件。

---

## 阶段 5：数据与内容集合（第 15-18 课）

### 第 15 课：数据获取

在 Frontmatter 中获取数据（只在构建时执行）：

```astro
---
// 获取远程数据
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
</ul>
```

**本地数据**：

```astro
---
// 读取本地 JSON
import data from '../data/products.json';
---

<ul>
  {data.map(item => <li>{item.name}</li>)}
</ul>
```

**`Astro.glob()` 批量导入**：

```astro
---
const posts = await Astro.glob('../content/blog/*.md');
---

<ul>
  {posts.map(post => <li><a href={post.url}>{post.frontmatter.title}</a></li>)}
</ul>
```

**动手练习 15**：使用 `fetch` 从公共 API（如 JSONPlaceholder）获取数据并展示。

---

### 第 16 课：内容集合（Content Collections）— Astro 的杀手级功能

内容集合是 Astro 最强大的功能之一，提供**类型安全**的内容管理。

**第一步**：创建内容目录

> ⚠️ **Astro 6 重要变化**：配置文件从 `src/content/config.ts` 移到了 `src/content.config.ts`（项目根 `src/` 下），且必须为每个集合定义 `loader`。

```
src/
├── content.config.ts   # 集合配置（Astro 6 新位置！）
├── content/
│   └── blog/           # 博客集合
│       ├── first-post.md
│       └── second-post.md
```

**第二步**：定义 Schema（Astro 6 方式）

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**关键变化**：
- 配置文件位置：`src/content.config.ts`（不再是 `src/content/config.ts`）
- 使用 `loader` 替代 `type`：`glob()` loader 对应原来的 `type: 'content'`
- 需要从 `astro/loaders` 导入 `glob`

**第三步**：编写 Markdown 内容

```markdown
---
title: "My First Post"
description: "Learning Astro"
pubDate: 2024-01-15
tags: ["astro", "tutorial"]
---

# Hello World

This is my first blog post!
```

**动手练习 16**：查看 `src/content.config.ts` 和 `src/content/blog/` 目录，理解 Astro 6 的内容集合配置方式。

---

### 第 17 课：查询与渲染内容集合

**查询集合**：

```astro
---
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
// 只获取非草稿文章
const publishedPosts = await getCollection('blog', ({ data }) => !data.draft);
---

<ul>
  {publishedPosts.map(post => (
    <li>
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
      <time>{post.data.pubDate.toLocaleDateString()}</time>
    </li>
  ))}
</ul>
```

**渲染单篇文章**：

```astro
---
// src/pages/blog/[slug].astro
import { getCollection, render } from 'astro:content';

export function getStaticPaths() {
  return getCollection('blog').then(posts =>
    posts.map(post => ({ params: { slug: post.id } }))
  );
}

const { slug } = Astro.params;
const post = await getCollection('blog').then(posts =>
  posts.find(p => p.id === slug)
);
const { Content } = await render(post);
---

<article>
  <h1>{post.data.title}</h1>
  <time>{post.data.pubDate.toLocaleDateString()}</time>
  <Content />
</article>
```

**动手练习 17**：创建博客列表页和文章详情页，使用内容集合渲染。

---

### 第 18 课：Live Collections（Astro 6 新特性）

Astro 6 引入了 **Live Collections**，用于从外部数据源（API、数据库）获取数据，同时保持类型安全。

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  loader: async () => {
    const response = await fetch('https://api.example.com/products');
    const data = await response.json();
    return {
      entries: data.map(item => [String(item.id), item]),
    };
  },
  schema: z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
  }),
});

export const collections = { products };
```

使用方式与普通集合完全一致：

```astro
---
import { getCollection } from 'astro:content';
const products = await getCollection('products');
---
```

**动手练习 18**：创建一个 Live Collection，从 JSONPlaceholder API 加载用户数据。

---

## 阶段 6：框架集成（第 19-21 课）

### 第 19 课：React 集成

你的项目已经安装了 `@astrojs/react`。在配置中启用：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

创建 React 组件：

```tsx
// src/components/Counter.tsx
import { useState } from 'react';

export default function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

在 Astro 中使用：

```astro
---
import Counter from '../components/Counter';
---

<Counter client:load initialCount={0} />
```

**动手练习 19**：创建一个 React 计数器组件，在 Astro 页面中使用它。

---

### 第 20 课：客户端指令（Client Directives）— 岛屿架构的核心

客户端指令控制 React 组件**何时/是否在浏览器中 hydrate**：

| 指令 | 何时加载 JS | 适用场景 |
|------|------------|---------|
| `client:load` | 页面加载时立即 | 需要立即交互的组件 |
| `client:idle` | 浏览器空闲时 | 非关键交互组件 |
| `client:visible` | 组件进入视口时 | 页面下方的组件 |
| `client:media="(max-width: 768px)"` | 匹配媒体查询时 | 响应式组件 |
| `client:only="react"` | 仅在客户端渲染 | 依赖浏览器 API 的组件 |

**不加客户端指令** = 纯静态 HTML，零 JS！这是 Astro 的默认行为。

```astro
<!-- 纯静态渲染，0 JS -->
<ReactComponent />

<!-- 页面加载时 hydrate -->
<ReactComponent client:load />

<!-- 进入视口时才 hydrate -->
<ReactComponent client:visible />
```

**动手练习 20**：创建两个 React 组件，一个用 `client:load`，一个用 `client:visible`，观察加载时机差异。

---

### 第 21 课：混合使用多个框架

Astro 可以在同一页面中混用不同框架：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [react(), vue(), svelte()],
});
```

```astro
---
import ReactCounter from '../components/ReactCounter';
import VueToggle from '../components/VueToggle.vue';
import SvelteModal from '../components/SvelteModal.svelte';
---

<ReactCounter client:load />
<VueToggle client:idle />
<SvelteModal client:visible />
```

**动手练习 21**：安装 Vue 集成，在同一页面中使用 React 和 Vue 组件。

---

## 阶段 7：高级模式（第 22-25 课）

### 第 22 课：SSR 与混合渲染

将项目切换到 `hybrid` 模式：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'hybrid',
});
```

`hybrid` 模式下，页面默认静态，可以按需开启 SSR：

```astro
---
// src/pages/api/time.ts — 强制 SSR
export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ time: new Date().toISOString() }));
};
---
```

```astro
---
// src/pages/dynamic-page.astro — 强制 SSR
export const prerender = false;

const time = new Date().toISOString();
---

<p>Server time: {time}</p>
```

**动手练习 22**：切换到 hybrid 模式，创建一个显示服务器时间的动态页面。

---

### 第 23 课：中间件（Middleware）

中间件在每个请求前后执行，适合认证、日志、重定向等：

```ts
// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // 请求前
  const startTime = performance.now();

  // 调用下一个中间件或页面
  const response = await next();

  // 请求后
  const duration = performance.now() - startTime;
  response.headers.set('X-Response-Time', `${duration}ms`);

  return response;
});
```

**重定向示例**：

```ts
export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.cookies.get('auth-token')) {
    return context.redirect('/login');
  }
  return next();
});
```

**动手练习 23**：创建中间件，在响应头中添加自定义 header。

---

### 第 24 课：Astro Actions（类型安全的 RPC）

Astro 6 的 Actions 提供了类型安全的服务器函数调用：

```ts
// src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  greet: defineAction({
    input: z.object({ name: z.string() }),
    handler: async ({ name }) => {
      return `Hello, ${name}!`;
    },
  }),
};
```

在组件中调用：

```astro
---
import { actions } from 'astro:actions';

const result = await actions.greet({ name: 'World' });
---

<p>{result.data}</p>
```

**动手练习 24**：创建一个 Action，接收邮箱地址并返回验证结果。

---

### 第 25 课：Astro DB

Astro 内置了数据库支持（基于 LibSQL）：

```ts
// src/db/config.ts
import { defineDb } from 'astro:db';

export default defineDb({
  tables: {
    Comments: {
      columns: {
        id: { type: 'number', primaryKey: true },
        author: { type: 'text' },
        body: { type: 'text' },
        createdAt: { type: 'date' },
      },
    },
  },
});
```

```ts
// src/db/seed.ts
import { defineSeed } from 'astro:db';
import { Comments } from './config';

export default defineSeed(async ({ insert }) => {
  await insert(Comments, [
    { id: 1, author: 'Alice', body: 'Great post!', createdAt: new Date() },
  ]);
});
```

**动手练习 25**：创建一个简单的评论表，实现增删查功能。

---

## 阶段 8：性能优化与部署（第 26-28 课）

### 第 26 课：图片优化

Astro 内置了 `<Image />` 组件：

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/photo.jpg';
---

<Image
  src={myImage}
  alt="描述文字"
  width={800}
  height={600}
  loading="lazy"       // 懒加载
/>
```

**自动优化**：Astro 会自动生成 WebP/AVIF 格式，创建响应式 srcset。

**外部图片**：

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src="https://example.com/photo.jpg"
  alt="描述"
  width={800}
  height={600}
/>
```

需要在配置中授权域名：

```js
export default defineConfig({
  image: {
    domains: ['example.com'],
  },
});
```

**动手练习 26**：使用 `<Image />` 组件优化项目中的图片。

---

### 第 27 课：字体优化

Astro 6 内置了字体优化：

```astro
---
import { Font } from 'astro:assets';
---

<head>
  <Font
    cssVariable="--font-body"
    family="Inter"
    subsets={['latin']}
    weights={[400, 700]}
  />
</head>

<style>
  body { font-family: var(--font-body); }
</style>
```

**动手练习 27**：为你的项目添加自定义字体。

---

### 第 28 课：构建与部署

**构建项目**：

```bash
pnpm build
```

输出到 `dist/` 目录，包含纯静态 HTML/CSS/JS 文件。

**预览构建结果**：

```bash
pnpm preview
```

**部署选项**：

| 平台 | 命令 | 特点 |
|------|------|------|
| Vercel | `npx astro add vercel` | 零配置部署 |
| Netlify | `npx astro add netlify` | 零配置部署 |
| Cloudflare | `npx astro add cloudflare` | 边缘部署 |
| GitHub Pages | 手动配置 | 免费 |
| 自托管 | 上传 dist/ | 完全控制 |

**动手练习 28**：构建项目并本地预览，检查所有页面是否正常。

---

## 阶段 9：毕业项目（第 29-30 课）

### 第 29 课：构建个人博客

综合运用所学知识，构建一个完整的个人博客：

**功能需求**：
1. ✅ 首页 — 展示最新文章列表
2. ✅ 博客列表页 — 分页展示所有文章
3. ✅ 文章详情页 — Markdown 渲染 + 目录
4. ✅ 关于页 — 个人介绍
5. ✅ 内容集合 — 类型安全的文章管理
6. ✅ View Transitions — 页面切换动画
7. ✅ 响应式设计 — 移动端适配
8. ✅ SEO — meta 标签、Open Graph
9. ✅ RSS 订阅 — `@astrojs/rss`
10. ✅ 暗色模式 — CSS 变量切换

**动手练习 29**：按照以上需求，完成个人博客项目。

---

### 第 30 课：进阶挑战 — 全栈应用

将博客升级为全栈应用：

**进阶功能**：
1. ✅ 评论系统 — Astro DB + Actions
2. ✅ 搜索功能 — 客户端搜索
3. ✅ 管理后台 — React 组件 + API 路由
4. ✅ 认证系统 — 中间件 + Cookie
5. ✅ 实时通知 — Server-Sent Events
6. ✅ 国际化 — 多语言支持
7. ✅ 性能监控 — Core Web Vitals
8. ✅ 部署上线 — Vercel/Netlify

**动手练习 30**：选择 3-5 个进阶功能，实现你的全栈应用。

---

## 🎓 学习建议

### 学习节奏
- **阶段 1-2**（基础）：每课 30-60 分钟
- **阶段 3-4**（进阶）：每课 1-2 小时
- **阶段 5-6**（核心）：每课 2-3 小时
- **阶段 7-8**（高级）：每课 2-4 小时
- **阶段 9**（实战）：1-2 周

### 学习方法
1. **先理解概念** — 阅读讲解部分
2. **动手实践** — 完成每课的练习
3. **查阅文档** — 遇到问题参考官方文档
4. **反复练习** — 尝试不同的实现方式
5. **构建项目** — 最终目标是独立完成毕业项目

### 关键资源
- 📖 [Astro 官方文档](https://docs.astro.build)
- 🎮 [Astro Playground](https://astro.new)
- 💬 [Astro Discord](https://astro.build/chat)
- 📦 [Astro 集成列表](https://astro.build/integrations)
- 🌟 [Awesome Astro](https://github.com/one-aalam/awesome-astro)

---

> 🏆 **恭喜你踏上 Astro 大师之路！** 按照本教程一步步学习，你将掌握 Astro 的所有核心能力。
> 记住：**实践是最好的老师**，每节课的动手练习一定要完成！
