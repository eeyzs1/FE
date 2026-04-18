# 第 8 课：布局系统

> 🎯 学习目标：掌握 Qwik City 的嵌套布局系统，理解布局与中间件的结合

---

## 一、布局基础

### 1.1 什么是布局？

布局（Layout）是多个页面共享的 UI 和请求处理逻辑。

```
┌─────────────────────────────────────────┐
│ Header（全局布局）                       │
├──────────┬──────────────────────────────┤
│ Sidebar  │ <Slot /> ← 页面内容插入这里   │
│ （布局）  │                              │
├──────────┴──────────────────────────────┤
│ Footer（全局布局）                       │
└─────────────────────────────────────────┘
```

### 1.2 创建布局

```tsx
// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <header>
        <nav>
          <Link href="/">首页</Link>
          <Link href="/about">关于</Link>
          <Link href="/blog">博客</Link>
        </nav>
      </header>
      <main>
        <Slot />
      </main>
      <footer>
        <p>© 2024 我的 Qwik 应用</p>
      </footer>
    </>
  );
});
```

**关键：** `<Slot />` 是页面内容插入的位置。

---

## 二、嵌套布局

### 2.1 目录结构

```
src/routes/
├── layout.tsx              → 全局布局（所有页面）
├── index.tsx               → 首页
├── about/
│   └── index.tsx           → /about
└── admin/
    ├── layout.tsx          → 管理后台布局（/admin/* 下的页面）
    ├── index.tsx           → /admin
    └── users/
        └── index.tsx       → /admin/users
```

### 2.2 管理后台布局

```tsx
// src/routes/admin/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="admin-layout">
      <aside class="sidebar">
        <h2>管理后台</h2>
        <nav>
          <Link href="/admin">仪表盘</Link>
          <Link href="/admin/users">用户管理</Link>
          <Link href="/admin/settings">设置</Link>
        </nav>
      </aside>
      <div class="content">
        <Slot />
      </div>
    </div>
  );
});
```

### 2.3 布局嵌套顺序

对于 `/admin/users`，渲染顺序为：

```
<RootLayout>           ← src/routes/layout.tsx
  <AdminLayout>        ← src/routes/admin/layout.tsx
    <UsersPage />      ← src/routes/admin/users/index.tsx
  </AdminLayout>
</RootLayout>
```

---

## 三、布局中间件

布局可以同时提供 UI 和请求处理：

```tsx
// src/routes/admin/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

// 中间件：检查认证
export const onRequest: RequestHandler = ({ cookie, redirect }) => {
  const token = cookie.get('auth-token');
  if (!token) {
    throw redirect(308, '/login');
  }
};

export default component$(() => {
  return (
    <div class="admin-layout">
      <aside class="sidebar">
        <h2>管理后台</h2>
      </aside>
      <main>
        <Slot />
      </main>
    </div>
  );
});
```

---

## 四、中间件执行顺序

对于 `/admin/users` 的请求，`onRequest` 的执行顺序：

```
1. src/routes/layout.tsx 的 onRequest
2. src/routes/admin/layout.tsx 的 onRequest
3. src/routes/admin/users/index.tsx 的 onRequest
4. src/routes/admin/users/index.tsx 的组件渲染
```

**完整执行顺序：**
```
1 → entry.ssr.tsx（SSR 入口）
2 → 插件（按字母顺序）
3 → server$ 调用
4 → root.tsx
5 → layout.tsx onRequest → onGet/onHttpVerb
6 → 全局 routeLoader$
7 → 路由级 routeLoader$
8 → JSX/组件渲染
```

---

## 五、错误边界（Error Boundary）

Qwik 支持路由级别的错误边界，当组件渲染抛出异常时，可以显示自定义的错误 UI，而不是整个页面崩溃。

### 5.1 路由级错误边界

在路由文件中导出 `ErrorBoundary` 组件：

```tsx
// src/routes/blog/[slug]/index.tsx
import { component$, type PropsOf } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const usePost = routeLoader$(async ({ params, error }) => {
  const post = await db.posts.findBySlug(params.slug);
  if (!post) {
    throw error(404, '文章不存在');
  }
  return post;
});

export const ErrorBoundary = component$((props: { error: Error }) => {
  return (
    <div class="error-container">
      <h2>出错了</h2>
      <p>{props.error.message}</p>
      <a href="/">返回首页</a>
    </div>
  );
});

export default component$(() => {
  const post = usePost();
  return (
    <article>
      <h1>{post.value.title}</h1>
      <p>{post.value.content}</p>
    </article>
  );
});
```

**关键点：**
- `ErrorBoundary` 必须是 `component$()` 组件
- `props.error` 包含抛出的错误对象
- 错误边界只捕获同一路由文件中组件渲染时的错误
- 中间件和 loader 中的错误也会被捕获

### 5.2 全局错误边界

在 `layout.tsx` 中定义的错误边界会捕获所有子路由的错误：

```tsx
// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';

export const ErrorBoundary = component$((props: { error: Error }) => {
  const is404 = props.error.message.includes('404');
  return (
    <div class="global-error">
      <h1>{is404 ? '页面不存在' : '服务器错误'}</h1>
      <p>{props.error.message}</p>
    </div>
  );
});

export default component$(() => {
  return (
    <>
      <header>导航栏</header>
      <main><Slot /></main>
    </>
  );
});
```

### 5.3 ServerError — 结构化服务端错误

在 loader 和 action 中，可以使用 `error()` 辅助函数抛出带有状态码的错误：

```tsx
import { routeLoader$, ServerError } from '@builder.io/qwik-city';

export const useProduct = routeLoader$(async ({ params, error }) => {
  const product = await db.products.findById(params.id);
  if (!product) {
    throw error(404, '产品不存在');
  }
  if (!product.isAvailable) {
    throw error(410, '产品已下架');
  }
  return product;
});
```

也可以直接使用 `ServerError` 类：

```tsx
import { ServerError } from '@builder.io/qwik-city';

throw new ServerError(403, '没有权限访问此资源');
```

---

## 六、动手实践

### 练习 1：全局布局

创建一个全局布局，包含：
- 顶部导航栏（首页、关于、博客链接）
- 主内容区域（`<Slot />`）
- 底部版权信息

### 练习 2：管理后台布局

创建 `/admin` 路由及其布局：
- 侧边栏导航
- 认证中间件（检查 cookie）
- 嵌套在全局布局中

### 练习 3：404 页面

创建一个 catch-all 路由处理 404：
```
src/routes/[...catchall]/index.tsx
```

---

## 七、大师洞察

### 布局 vs 组件的选择

- **布局**：需要中间件、影响路由、需要 `<Slot />` 插入页面内容
- **组件**：纯 UI 复用、不需要中间件、通过 Props 传递内容

### sharedMap 跨中间件共享数据

```tsx
// layout.tsx — 中间件中设置数据
export const onRequest: RequestHandler = ({ sharedMap, cookie }) => {
  const user = getUserFromCookie(cookie);
  if (user) sharedMap.set('user', user);
};

// layout.tsx — loader 中读取数据
export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get('user');
});

// layout.tsx — 组件中使用
export default component$(() => {
  const user = useUser();
  return <header>欢迎，{user.value?.name}</header>;
});
```

---

✅ 完成本课后，你应该能够：
- [ ] 创建全局和嵌套布局
- [ ] 在布局中使用 `<Slot />` 插入页面内容
- [ ] 在布局中添加中间件
- [ ] 理解中间件的执行顺序
- [ ] 使用 `sharedMap` 在中间件间共享数据
- [ ] 创建错误边界处理渲染异常
- [ ] 使用 `ServerError` 抛出结构化错误
