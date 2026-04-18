# 第 7 课：路由系统

> 🎯 学习目标：掌握 Qwik City 的目录路由系统，理解 MPA/SPA 混合导航模型

---

## 一、目录路由基础

Qwik City 使用**基于目录的路由**，`src/routes/` 下的目录结构直接映射到 URL：

```
src/routes/
├── index.tsx                    → /
├── about/
│   └── index.tsx                → /about
├── blog/
│   ├── index.tsx                → /blog
│   └── [slug]/
│       └── index.tsx            → /blog/my-post
├── user/
│   └── [username]/
│       └── index.tsx            → /user/john
├── docs/
│   └── [...catchall]/
│       └── index.tsx            → /docs/any/nested/path
└── layout.tsx                   → 所有页面的布局
```

### 1.1 基本页面

```tsx
// src/routes/index.tsx
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <h1>首页</h1>;
});

export const head: DocumentHead = {
  title: '首页 - 我的 Qwik 应用',
  meta: [
    { name: 'description', content: '这是首页描述' },
  ],
};
```

### 1.2 动态路由参数 [param]

```tsx
// src/routes/blog/[slug]/index.tsx
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  return <h1>博客文章：{loc.params.slug}</h1>;
});
```

### 1.3 Catch-all 路由 [...catchall]

```tsx
// src/routes/docs/[...all]/index.tsx
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();
  return <p>文档路径：{loc.params.all}</p>;
});
```

匹配 `/docs/getting-started/installation`，`loc.params.all` 为 `getting-started/installation`。

---

## 二、页面 + 端点组合

`index.tsx` 可以同时导出组件和请求处理器：

```tsx
// src/routes/api/data/index.tsx
import { component$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = ({ json, query }) => {
  const format = query.get('format');
  if (format === 'json') {
    json(200, { message: 'Hello API' });
  }
};

export default component$(() => {
  return <h1>数据页面</h1>;
});
```

纯端点（不渲染组件）只需导出请求处理器，不需要 `export default`：

```tsx
// src/routes/api/users/index.ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ json }) => {
  const users = await db.users.findAll();
  json(200, users);
};
```

---

## 三、导航

### 3.1 <Link> 组件（推荐）

```tsx
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/about">关于</Link>
      <Link href="/blog/hello-world">博客文章</Link>
    </nav>
  );
});
```

**`<Link>` 的优势：**
- 使用原生 `<a>` 标签，可访问性好
- hover 时自动预加载目标页面
- 点击时执行 SPA 导航（不刷新整个页面）
- JS 禁用时也能工作（降级为普通链接）

### 3.2 预加载控制

```tsx
// 默认：hover 时预加载
<Link href="/about">关于</Link>

// 禁用预加载
<Link prefetch={false} href="/about">关于</Link>
```

### 3.3 强制刷新

```tsx
<Link reload>刷新当前页面</Link>
```

### 3.4 useNavigate() — 编程式导航

```tsx
import { component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const nav = useNavigate();

  return (
    <button onClick$={() => nav('/dashboard')}>
      登录后跳转
    </button>
  );
});
```

---

## 四、useLocation() — 获取当前路由信息

```tsx
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const loc = useLocation();

  return (
    <ul>
      <li>URL: {loc.url.href}</li>
      <li>路径: {loc.url.pathname}</li>
      <li>查询参数: {loc.url.search}</li>
      <li>路由参数: {JSON.stringify(loc.params)}</li>
      <li>正在导航: {loc.isNavigating ? '是' : '否'}</li>
    </ul>
  );
});
```

---

## 五、DocumentHead — 页面元信息

```tsx
import type { DocumentHead } from '@builder.io/qwik-city';

// 静态 head
export const head: DocumentHead = {
  title: '页面标题',
  meta: [
    { name: 'description', content: '页面描述' },
    { property: 'og:title', content: '社交分享标题' },
  ],
};

// 动态 head（基于路由参数）
export const head: DocumentHead = ({ params }) => {
  return {
    title: `文章 - ${params.slug}`,
    meta: [
      { name: 'description', content: `关于 ${params.slug} 的文章` },
    ],
  };
};
```

---

## 六、MPA 与 SPA 的融合

Qwik 的独特之处：**每条链接都可以独立选择 MPA 或 SPA 模式。**

```tsx
// SPA 导航（<Link> 组件）
<Link href="/about">SPA 导航到关于页</Link>

// MPA 导航（普通 <a> 标签）
<a href="/about">MPA 导航到关于页</a>
```

- `<Link>` → SPA 导航，不刷新页面
- `<a>` → MPA 导航，完整页面刷新

**首次访问**总是 MPA（完整 HTML 响应），之后通过 `<Link>` 导航时升级为 SPA。

---

## 七、滚动恢复

Qwik 提供一流的滚动恢复：
- SPA 导航后，前进/后退时自动恢复滚动位置
- 基于历史记录，不依赖 sessionStorage
- 即使清除浏览器数据也能正常工作
- 纯 MPA 页面不会加载滚动恢复脚本

---

## 八、动手实践

### 练习 1：多页面网站

创建以下页面结构：
- `/` — 首页
- `/about` — 关于页面
- `/blog` — 博客列表
- `/blog/[slug]` — 博客详情（使用 `routeLoader$` 加载模拟数据）

### 练习 2：导航栏

创建一个全局导航栏组件：
- 显示当前活跃页面的高亮
- 使用 `<Link>` 组件
- 响应式设计（移动端汉堡菜单）

### 练习 3：面包屑导航

实现一个面包屑组件，根据当前路由自动生成：
- `/blog/hello-world` → 首页 > 博客 > hello-world

---

## 九、大师洞察

### MPA/SPA 不是二选一

传统框架要求你在项目开始时就决定 MPA 还是 SPA。Qwik 让这个决定推迟到每条链接：
- 首次访问：MPA（SEO 友好、快速首屏）
- 后续导航：SPA（流畅体验、无刷新）
- 任何 `<a>` 标签都能降级为 MPA

### 路由重写（Rewrite Routes）

可以在 `vite.config.ts` 中配置路由重写，用于国际化或 SEO：

```ts
qwikCity({
  rewriteRoutes: [
    {
      prefix: 'it',
      paths: {
        'docs': 'documentazione',
        'products': 'prodotti',
      },
    },
  ],
})
```

---

✅ 完成本课后，你应该能够：
- [ ] 创建基于目录的路由结构
- [ ] 使用动态路由参数 `[param]`
- [ ] 使用 `<Link>` 和 `useNavigate()` 导航
- [ ] 使用 `useLocation()` 获取路由信息
- [ ] 配置 `DocumentHead` 设置页面元信息
- [ ] 理解 MPA/SPA 混合导航模型
