# 第 9 课：数据加载与操作 — Loaders & Actions

> 🎯 学习目标：掌握 Qwik City 的服务端数据加载和操作机制，构建完整的 CRUD 应用

---

## 一、routeLoader$() — 服务端数据加载

### 1.1 基本用法

```tsx
// src/routes/blog/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const usePosts = routeLoader$(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json() as Promise<{ id: number; title: string; body: string }[]>;
});

export default component$(() => {
  const posts = usePosts();

  return (
    <ul>
      {posts.value.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body.slice(0, 100)}...</p>
        </li>
      ))}
    </ul>
  );
});
```

**关键点：**
- `routeLoader$` 在服务器端**组件渲染前**执行
- 返回一个 `use` hook，在组件中调用获取数据
- 数据通过 Signal 返回（`posts.value`）
- SSR 时数据直接嵌入 HTML，浏览器端不需要重新获取
- **必须导出**，且只能在 `index.tsx` 或 `layout.tsx` 中声明

### 1.2 访问请求信息

```tsx
export const usePost = routeLoader$(async ({ params, query, cookie, env }) => {
  // params — 路由参数
  const slug = params.slug;

  // query — 查询参数
  const page = query.get('page') || '1';

  // cookie — Cookie
  const token = cookie.get('auth-token');

  // env — 环境变量
  const apiKey = env.get('API_KEY');

  const res = await fetch(`https://api.example.com/posts/${slug}`);
  return res.json();
});
```

### 1.3 routeLoader$ vs useResource$

| 特性 | routeLoader$ | useResource$ |
|---|---|---|
| 执行时机 | 组件渲染前（更早） | 组件渲染时 |
| SSR | ✅ 数据在 HTML 中 | ✅ 但可能显示加载状态 |
| 交互触发 | ❌ 只在路由加载时 | ✅ 可以追踪状态变化 |
| 阻塞渲染 | ✅ 确保数据在 HTML 中 | ❌ 不阻塞 |
| 推荐场景 | 首屏数据 | 用户交互触发的数据 |

---

## 二、routeAction$() — 服务端操作

### 2.1 基本用法 + Form

```tsx
// src/routes/contact/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeAction$, Form, zod$, z } from '@builder.io/qwik-city';

export const useSubmitContact = routeAction$(
  async (data) => {
    // data 已经经过 Zod 验证，类型安全
    await db.contacts.create({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    return { success: true };
  },
  zod$({
    name: z.string().min(2, '名字至少 2 个字符'),
    email: z.string().email('邮箱格式不正确'),
    message: z.string().min(10, '消息至少 10 个字符'),
  })
);

export default component$(() => {
  const action = useSubmitContact();

  return (
    <Form action={action}>
      <div>
        <label>名字</label>
        <input name="name" />
        {action.value?.failed && <p class="error">{action.value.fieldErrors?.name}</p>}
      </div>
      <div>
        <label>邮箱</label>
        <input name="email" type="email" />
        {action.value?.failed && <p class="error">{action.value.fieldErrors?.email}</p>}
      </div>
      <div>
        <label>消息</label>
        <textarea name="message"></textarea>
        {action.value?.failed && <p class="error">{action.value.fieldErrors?.message}</p>}
      </div>
      <button type="submit">提交</button>
      {action.value?.success && <p class="success">提交成功！</p>}
    </Form>
  );
});
```

### 2.2 <Form> 组件的特性

- 基于 HTML 原生 `<form>`，JS 禁用时也能工作
- JS 启用时拦截提交，执行 SPA 导航
- 自动处理加载状态
- 支持 `action.value` 读取返回值
- 支持 `action.formData` 保留表单数据

### 2.3 编程式调用 action

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { routeAction$ } from '@builder.io/qwik-city';

export const useDeletePost = routeAction$(async ({ id }) => {
  await db.posts.delete(id);
  return { success: true };
});

export default component$(() => {
  const deleteAction = useDeletePost();

  return (
    <button
      onClick$={async () => {
        const { value } = await deleteAction.submit({ id: '123' });
        if (value?.success) {
          console.log('删除成功');
        }
      }}
    >
      删除
    </button>
  );
});
```

### 2.4 fail() — 返回失败响应

```tsx
import { routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLogin = routeAction$(
  async (data, { fail }) => {
    const user = await db.users.findByEmail(data.email);
    if (!user) {
      return fail(401, {
        message: '用户不存在',
      });
    }
    if (!verifyPassword(data.password, user.password)) {
      return fail(401, {
        message: '密码错误',
      });
    }
    return { success: true, userId: user.id };
  },
  zod$({
    email: z.string().email(),
    password: z.string().min(6),
  })
);
```

### 2.5 onSubmitCompleted$ — 操作完成回调

```tsx
<Form
  action={action}
  onSubmitCompleted$={() => {
    editingId.value = '';
  }}
  spaReset
>
  <input name="text" value={item.text} />
  <button type="submit">保存</button>
</Form>
```

---

## 三、globalAction$() — 全局操作

```tsx
// src/components/auth/login.tsx
import { globalAction$ } from '@builder.io/qwik-city';

// 可以在任何文件中声明（不限于 routes/）
export const useLogin = globalAction$(async (data, { cookie }) => {
  const user = await authenticate(data.email, data.password);
  cookie.set('auth-token', user.token, { httpOnly: true });
  return { success: true };
});
```

| | routeAction$ | globalAction$ |
|---|---|---|
| 声明位置 | 仅 `routes/` 下的 `index.tsx` / `layout.tsx` | `src/` 下的任何文件 |
| 作用域 | 当前路由 | 全局 |
| 访问路由信息 | ✅ | ❌ |
| 推荐场景 | 路由特定操作 | 跨路由共享操作（如登录） |

---

## 四、server$() — 服务端函数

```tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { server$ } from '@builder.io/qwik-city';

// 定义服务端函数
const saveToDatabase = server$(async (data: any) => {
  // 这段代码只在服务器端执行
  await db.items.create(data);
  return { id: '123' };
});

export default component$(() => {
  const result = useSignal('');

  return (
    <button
      onClick$={async () => {
        const res = await saveToDatabase({ name: '测试' });
        result.value = res.id;
      }}
    >
      保存到数据库
    </button>
  );
});
```

**`server$()` 的特点：**
- 代码只在服务器端执行
- 可以在组件、事件处理器、task 中使用
- 返回 Promise，结果会自动传回浏览器
- 适合不需要作为 action 的简单服务端逻辑

---

## 五、文件上传

### 5.1 使用 Form 上传

```tsx
import { component$ } from '@builder.io/qwik';
import { routeAction$, Form } from '@builder.io/qwik-city';

export const useUpload = routeAction$(async ({ file }) => {
  const uploadedFile = file as File;
  const buffer = await uploadedFile.arrayBuffer();
  // 保存文件...
  return { success: true, size: buffer.byteLength };
});

export default component$(() => {
  const action = useUpload();
  return (
    <Form action={action}>
      <input type="file" name="file" />
      <button type="submit">上传</button>
      {action.value?.success && <p>上传成功！文件大小：{action.value.size} bytes</p>}
    </Form>
  );
});
```

### 5.2 编程式上传

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { routeAction$ } from '@builder.io/qwik-city';

export const useUpload = routeAction$(async ({ file }) => {
  return { success: true };
});

export default component$(() => {
  const action = useUpload();
  const fileRef = useSignal<HTMLInputElement>();

  return (
    <div>
      <input type="file" ref={fileRef} />
      <button
        onClick$={async () => {
          const file = fileRef.value?.files?.[0];
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            await action.submit(formData);
          }
        }}
      >
        上传
      </button>
    </div>
  );
});
```

---

## 六、TypeScript 类型安全

Qwik 的 `routeLoader$` 和 `routeAction$` + `zod$` 提供了端到端的类型推导：

### 6.1 routeLoader$ 的类型推导

```tsx
interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePosts = routeLoader$(async (): Promise<Post[]> => {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
});

export default component$(() => {
  const posts = usePosts();
  // posts.value 的类型自动推导为 Post[]
  return (
    <ul>
      {posts.value.map((post) => (
        <li key={post.id}>
          {/* ✅ post.title 有类型检查 */}
          <h2>{post.title}</h2>
        </li>
      ))}
    </ul>
  );
});
```

### 6.2 routeAction$ + zod$ 的类型推导

```tsx
import { routeAction$, zod$, z, Form } from '@builder.io/qwik-city';

export const useCreatePost = routeAction$(
  async (data) => {
    // data 的类型自动从 zod schema 推导
    // data.title: string
    // data.body: string
    await db.posts.create({ title: data.title, body: data.body });
    return { id: '123' };
  },
  zod$({
    title: z.string().min(1, '标题不能为空'),
    body: z.string().min(10, '内容至少 10 个字符'),
  })
);

export default component$(() => {
  const action = useCreatePost();
  // action.value 的类型自动推导
  return (
    <Form action={action}>
      <input name="title" />
      <textarea name="body"></textarea>
      <button type="submit">创建</button>
    </Form>
  );
});
```

**关键：** `zod$()` 不仅提供运行时验证，还为 `data` 参数和 `action.value` 提供编译时类型。这是 Qwik 全栈类型安全的核心。

### 6.3 ServerError — loader 中的错误处理

在 `routeLoader$` 中，可以使用 `error()` 辅助函数抛出带有 HTTP 状态码的结构化错误：

```tsx
import { routeLoader$, ServerError } from '@builder.io/qwik-city';

export const useProduct = routeLoader$(async ({ params, error }) => {
  const product = await db.products.findById(params.id);

  if (!product) {
    throw error(404, '产品不存在');
  }

  if (!product.isPublished) {
    throw error(403, '产品未发布');
  }

  return product;
});
```

也可以直接使用 `ServerError` 类（适用于 loader 外部）：

```tsx
import { ServerError } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async ({ url }) => {
  if (!isAllowed(url)) {
    throw new ServerError(403, '禁止访问');
  }
};
```

**ServerError 的特点：**
- 携带 HTTP 状态码，可以被错误边界捕获
- 错误消息会序列化到客户端
- 配合 `ErrorBoundary` 组件实现优雅的错误 UI

---

## 七、动手实践

### 练习 1：博客 CRUD

构建一个完整的博客系统：
- `GET /blog` — 使用 `routeLoader$` 加载文章列表
- `POST /blog/create` — 使用 `routeAction$` + `Form` 创建文章
- `DELETE /blog/[id]` — 使用编程式 `action.submit()` 删除文章
- 使用 Zod 验证创建表单

### 练习 2：联系表单

创建一个联系表单页面：
- 姓名、邮箱、消息字段
- Zod 验证
- 成功/失败反馈
- 使用 `fail()` 处理错误

### 练习 3：搜索功能

结合 `routeLoader$` 和查询参数实现搜索：
- `/blog?q=keyword` 搜索博客文章
- 使用 `query.get('q')` 获取搜索关键词

---

## 八、大师洞察

### 渐进增强：Form 的哲学

Qwik 的 `<Form>` 基于 HTML 原生 `<form>`，这意味着：
- JS 禁用时 → 正常提交表单，页面刷新
- JS 启用时 → SPA 体验，无刷新提交

这就是**渐进增强**：基础功能总是可用的，JS 只是增强体验。

### routeLoader$ 的执行时机

`routeLoader$` 在组件渲染前**急切地**执行，即使它的 use-hook 没有在任何组件中被调用。这意味着你不应该在不需要数据的路由中声明 loader。

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `routeLoader$` 加载服务端数据
- [ ] 使用 `routeAction$` + `<Form>` 处理表单提交
- [ ] 使用 Zod 验证表单数据
- [ ] 使用 `fail()` 返回错误响应
- [ ] 使用 `server$()` 执行服务端逻辑
- [ ] 实现文件上传功能
- [ ] 理解 `routeAction$` vs `globalAction$` 的区别
- [ ] 利用 `zod$` 实现端到端类型安全
- [ ] 使用 `ServerError` / `error()` 处理 loader 错误
