# 第 10 课：中间件与端点

> 🎯 学习目标：掌握 Qwik City 的中间件系统，能够构建 API 端点和处理跨切面逻辑

---

## 一、中间件基础

### 1.1 什么是中间件？

中间件是在请求到达页面组件之前执行的函数，用于处理：
- 认证和授权
- 日志记录
- 缓存控制
- 重定向
- Cookie 管理
- CORS 处理

### 1.2 定义中间件

```tsx
// src/routes/layout.tsx
import type { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async ({ next, url }) => {
  console.log('请求开始：', url.pathname);
  await next();
  console.log('请求结束：', url.pathname);
};
```

### 1.3 HTTP 方法特定的处理器

```tsx
export const onGet: RequestHandler = async ({ json }) => { ... };
export const onPost: RequestHandler = async ({ json }) => { ... };
export const onPut: RequestHandler = async ({ json }) => { ... };
export const onPatch: RequestHandler = async ({ json }) => { ... };
export const onDelete: RequestHandler = async ({ json }) => { ... };
```

如果同时定义了 `onRequest` 和 `onGet`，两者都会执行，`onRequest` 先执行。

---

## 二、RequestEvent API

每个中间件函数接收 `RequestEvent` 对象：

### 2.1 请求信息

```tsx
export const onRequest: RequestHandler = async ({ url, method, params, query, request }) => {
  console.log('URL:', url.toString());
  console.log('方法:', method);
  console.log('路由参数:', params);
  console.log('查询参数:', query.toString());
  console.log('请求头:', request.headers);
};
```

### 2.2 响应操作

```tsx
// JSON 响应
export const onGet: RequestHandler = async ({ json }) => {
  json(200, { message: 'Hello' });
};

// 文本响应
export const onGet: RequestHandler = async ({ text }) => {
  text(200, 'Hello World');
};

// HTML 响应
export const onGet: RequestHandler = async ({ html }) => {
  html(200, '<h1>Hello</h1>');
};

// 重定向
export const onRequest: RequestHandler = async ({ redirect, url }) => {
  throw redirect(308, '/login');
};

// 错误响应
export const onGet: RequestHandler = async ({ error }) => {
  throw error(404, '页面不存在');
};
```

### 2.3 Cookie 管理

```tsx
export const onGet: RequestHandler = async ({ cookie, json }) => {
  // 读取 Cookie
  const token = cookie.get('auth-token')?.value;

  // 设置 Cookie
  cookie.set('auth-token', 'new-token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 86400,
  });

  // 删除 Cookie
  cookie.delete('auth-token', { path: '/' });

  json(200, { token });
};
```

### 2.4 响应头和缓存

```tsx
export const onGet: RequestHandler = async ({ headers, cacheControl, json }) => {
  headers.set('X-Custom-Header', 'value');
  cacheControl({ maxAge: 3600, public: true });
  json(200, { data: 'cached' });
};
```

### 2.5 环境变量

```tsx
export const onGet: RequestHandler = async ({ env, json }) => {
  const apiKey = env.get('API_KEY');
  const dbUrl = env.get('DATABASE_URL');
  json(200, { hasKey: !!apiKey });
};
```

### 2.6 解析请求体

```tsx
export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = await parseBody();
  json(200, { received: body });
};
```

支持 `application/json`、`application/x-www-form-urlencoded`、`multipart/form-data`。

---

## 三、sharedMap — 跨中间件共享数据

```tsx
// src/routes/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, type RequestHandler } from '@builder.io/qwik-city';

interface User {
  id: string;
  name: string;
}

// 中间件：加载用户信息
export const onRequest: RequestHandler = async ({ sharedMap, cookie, redirect }) => {
  const token = cookie.get('auth-token');
  if (!token) {
    throw redirect(308, '/login');
  }
  const user = await getUserByToken(token.value);
  sharedMap.set('user', user);
};

// Loader：从 sharedMap 读取用户信息
export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get('user') as User;
});

// 组件：使用用户信息
export default component$(() => {
  const user = useUser();
  return (
    <>
      <header>欢迎，{user.value.name}</header>
      <main><Slot /></main>
    </>
  );
});
```

---

## 四、REST API 端点

### 4.1 基本 API

```tsx
// src/routes/api/users/index.ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ json }) => {
  const users = await db.users.findAll();
  json(200, users);
};

export const onPost: RequestHandler = async ({ parseBody, json }) => {
  const body = await parseBody() as { name: string; email: string };
  const user = await db.users.create(body);
  json(201, user);
};
```

### 4.2 带参数的 API

```tsx
// src/routes/api/users/[id]/index.ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ params, json, error }) => {
  const user = await db.users.findById(params.id);
  if (!user) throw error(404, 'User not found');
  json(200, user);
};

export const onPut: RequestHandler = async ({ params, parseBody, json }) => {
  const body = await parseBody();
  const user = await db.users.update(params.id, body);
  json(200, user);
};

export const onDelete: RequestHandler = async ({ params, json }) => {
  await db.users.delete(params.id);
  json(200, { deleted: true });
};
```

---

## 五、流式响应（SSE）

```tsx
// src/routes/api/stream/index.ts
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async (requestEvent) => {
  requestEvent.headers.set('content-type', 'text/event-stream');

  const stream = requestEvent.getWritableStream();
  const writer = stream.getWriter();
  const encoder = new TextEncoder();

  writer.write(encoder.encode('data: 开始\n\n'));
  await wait(1000);
  writer.write(encoder.encode('data: 1秒后\n\n'));
  await wait(1000);
  writer.write(encoder.encode('data: 2秒后\n\n'));
  writer.close();
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
```

---

## 六、认证中间件模式

```tsx
// src/routes/admin/layout.tsx
import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

const PUBLIC_PATHS = ['/login', '/register'];

export const onRequest: RequestHandler = async ({ cookie, url, redirect, sharedMap }) => {
  if (PUBLIC_PATHS.some(p => url.pathname.startsWith(p))) {
    return;
  }

  const token = cookie.get('auth-token');
  if (!token) {
    throw redirect(308, `/login?returnUrl=${encodeURIComponent(url.pathname)}`);
  }

  try {
    const user = verifyToken(token.value);
    sharedMap.set('user', user);
  } catch {
    cookie.delete('auth-token', { path: '/' });
    throw redirect(308, '/login');
  }
};

export default component$(() => {
  return (
    <div class="admin">
      <Slot />
    </div>
  );
});
```

---

## 七、中间件执行链

### 7.1 next() 的使用

```tsx
export const onRequest: RequestHandler = async ({ next, sharedMap, json }) => {
  const log: string[] = [];
  sharedMap.set('log', log);

  log.push('onRequest 开始');
  await next(); // 执行下一个中间件
  log.push('onRequest 结束');

  json(200, log);
  // 输出：["onRequest 开始", "onGET 开始", "onGET 结束", "onRequest 结束"]
};

export const onGet: RequestHandler = async ({ next, sharedMap }) => {
  const log = sharedMap.get('log') as string[];
  log.push('onGET 开始');
  await next();
  log.push('onGET 结束');
};
```

### 7.2 提前终止链

```tsx
export const onRequest: RequestHandler = async ({ redirect, cookie }) => {
  if (!isAuthenticated(cookie)) {
    throw redirect(308, '/login'); // throw 终止后续中间件
  }
  // 正常返回会隐式调用 next()
};
```

---

## 八、动手实践

### 练习 1：认证中间件

实现一个完整的认证流程：
- `/login` 页面（登录表单）
- 认证中间件（保护 `/admin/*` 路由）
- Cookie 管理（设置和验证 token）
- 未认证时重定向到登录页

### 练习 2：REST API

创建一个用户管理 API：
- `GET /api/users` — 列出所有用户
- `GET /api/users/[id]` — 获取单个用户
- `POST /api/users` — 创建用户
- `PUT /api/users/[id]` — 更新用户
- `DELETE /api/users/[id]` — 删除用户

### 练习 3：日志中间件

创建一个全局日志中间件：
- 记录每个请求的方法、URL、耗时
- 使用 `sharedMap` 传递计时信息

---

## 九、大师洞察

### 组件渲染也是一种"端点"

在 Qwik City 中，组件渲染可以被视为一个隐式的 HTML 端点。这意味着中间件可以拦截组件渲染：

```tsx
export const onRequest: RequestHandler = async ({ redirect }) => {
  if (!isLoggedIn()) {
    throw redirect(308, '/login'); // 阻止组件渲染
  }
};

export default component$(() => {
  return <div>受保护的内容</div>;
});
```

### throw vs return

- `throw` — 终止中间件链，立即返回响应
- `return`（正常返回）— 继续执行下一个中间件（隐式 `next()`）
- `await next()` — 显式调用下一个中间件，可以在前后添加逻辑

---

✅ 完成本课后，你应该能够：
- [ ] 定义中间件函数（onRequest、onGet 等）
- [ ] 使用 RequestEvent API 处理请求和响应
- [ ] 使用 sharedMap 在中间件间共享数据
- [ ] 创建 REST API 端点
- [ ] 实现认证中间件
- [ ] 理解中间件执行链和 next() 的作用
