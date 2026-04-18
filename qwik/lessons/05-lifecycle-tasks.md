# 第 5 课：生命周期与任务 — useTask$ / useVisibleTask$ / useResource$

> 🎯 学习目标：掌握 Qwik 的生命周期系统，理解 Task → Render → VisibleTask 的执行流程

---

## 一、Qwik 的生命周期模型

Qwik 只有 **3 个生命周期阶段**：

```
useTask$ → RENDER → useVisibleTask$
    |                    |
    |--- SERVER 或浏览器 ---|--- 浏览器 ---|
```

| 阶段 | 时机 | 平台 | 阻塞渲染 |
|---|---|---|---|
| useTask$ | 渲染前 + 状态变化时 | 服务器 & 浏览器 | ✅ 是 |
| Render | Task 完成后 | 服务器 & 浏览器 | — |
| useVisibleTask$ | 渲染后 + 组件可见时 | 仅浏览器 | ❌ 否 |

**关键理解：** 由于可恢复性，组件只"挂载"一次。如果组件在 SSR 时已经执行了 `useTask$`，浏览器不会重新执行。

---

## 二、useTask$() — 渲染前任务

### 2.1 基本用法：初始化

```tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export default component$(() => {
  const data = useSignal<string[]>([]);

  useTask$(async () => {
    const res = await fetch('https://api.example.com/data');
    data.value = await res.json();
  });

  return <ul>{data.value.map((d, i) => <li key={i}>{d}</li>)}</ul>;
});
```

**特点：**
- 至少执行一次（组件首次渲染前）
- 阻塞渲染（直到完成才渲染组件）
- 没有 `track()` 时只执行一次，相当于 "onMount"

### 2.2 track() — 追踪状态变化

```tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export default component$(() => {
  const search = useSignal('');
  const results = useSignal<string[]>([]);

  useTask$(({ track }) => {
    const query = track(search);
    if (query.length < 2) {
      results.value = [];
      return;
    }
    fetch(`https://api.example.com/search?q=${query}`)
      .then(res => res.json())
      .then(data => results.value = data);
  });

  return (
    <>
      <input bind:value={search} placeholder="搜索..." />
      <ul>{results.value.map((r, i) => <li key={i}>{r}</li>)}</ul>
    </>
  );
});
```

**track() 的行为：**
- 传入 signal：`track(search)` — 追踪整个 signal
- 传入函数：`track(() => search.value)` — 追踪函数内读取的所有响应式值
- 传入 store：`track(store)` — 追踪 store 的所有属性变化

### 2.3 cleanup() — 清理副作用

```tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export default component$(() => {
  const text = useSignal('');
  const debouncedText = useSignal('');

  useTask$(({ track, cleanup }) => {
    const value = track(() => text.value);
    const id = setTimeout(() => (debouncedText.value = value), 500);
    cleanup(() => clearTimeout(id));
  });

  return (
    <>
      <input bind:value={text} />
      <p>防抖结果：{debouncedText.value}</p>
    </>
  );
});
```

**cleanup() 触发时机：**
- 新的 task 被触发时（状态变化导致重新执行）
- 组件从 DOM 中移除时

### 2.4 isServer / isBrowser — 环境判断

```tsx
import { component$, useSignal, useTask$, isServer } from '@builder.io/qwik';

export default component$(() => {
  const text = useSignal('初始文本');
  const isBold = useSignal(false);

  useTask$(({ track }) => {
    track(() => text.value);
    if (isServer) return; // 服务器端不执行
    isBold.value = true;
    setTimeout(() => (isBold.value = false), 1000);
  });

  return (
    <p style={{ fontWeight: isBold.value ? 'bold' : 'normal' }}>
      {text.value}
    </p>
  );
});
```

**服务端守卫模式：** `track()` 放在 `isServer` 判断之前，确保服务器端也能建立订阅，但不执行浏览器端逻辑。

---

## 三、useVisibleTask$() — 浏览器端可见任务

### 3.1 基本用法

```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const time = useSignal('');

  useVisibleTask$(({ cleanup }) => {
    const update = () => (time.value = new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    cleanup(() => clearInterval(id));
  });

  return <p>当前时间：{time.value}</p>;
});
```

**特点：**
- 仅在浏览器端执行
- 组件进入视口后才执行（使用 IntersectionObserver）
- 不阻塞渲染
- 至少执行一次

### 3.2 策略选项

```tsx
// 默认：组件可见时执行
useVisibleTask$(() => { ... });

// document-ready：文档就绪后立即执行（不等可见）
useVisibleTask$(() => { ... }, { strategy: 'document-ready' });

// document-idle：浏览器空闲时执行
useVisibleTask$(() => { ... }, { strategy: 'document-idle' });
```

### 3.3 ⚠️ useVisibleTask$ 是最后手段

```tsx
// ❌ 不推荐：不必要地使用 useVisibleTask$
useVisibleTask$(() => {
  document.addEventListener('mousemove', handler);
});

// ✅ 推荐：使用 useOnDocument
useOnDocument('mousemove', $(handler));
```

**替代方案优先级：**
1. `useTask$` — 能在服务器执行的逻辑
2. `useOn*` — 事件监听
3. `useVisibleTask$` — 确实需要浏览器 API 且无法用事件监听时

---

## 四、useResource$() — 异步资源加载

### 4.1 基本用法

```tsx
import {
  component$, useResource$, Resource, useSignal,
} from '@builder.io/qwik';

export default component$(() => {
  const userId = useSignal('1');

  const userResource = useResource$<any>(async ({ track }) => {
    track(() => userId.value);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId.value}`);
    return res.json();
  });

  return (
    <>
      <input type="number" bind:value={userId} min={1} max={10} />
      <Resource
        value={userResource}
        onPending={() => <p>加载中...</p>}
        onRejected={() => <p>加载失败！</p>}
        onResolved={(user) => (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
      />
    </>
  );
});
```

### 4.2 useResource$ 的 previous 参数

`useResource$` 回调可以接收 `previous` 参数，用于访问上一次的计算结果，避免重复请求：

```tsx
import { component$, useResource$, Resource, useSignal } from '@builder.io/qwik';

interface User {
  id: number;
  name: string;
  email: string;
}

export default component$(() => {
  const userId = useSignal(1);

  const userResource = useResource$<User>(async ({ track, previous }) => {
    const id = track(() => userId.value);

    // 如果 ID 没变，复用上次的结果
    if (previous?.id === id) {
      return previous.result;
    }

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  });

  return (
    <>
      <button onClick$={() => userId.value++}>下一个用户</button>
      <Resource
        value={userResource}
        onPending={() => <p>加载中...</p>}
        onRejected={() => <p>加载失败！</p>}
        onResolved={(user) => (
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        )}
      />
    </>
  );
});
```

**previous 的结构：**
- `previous.id` — 上一次 `track` 追踪到的值
- `previous.result` — 上一次成功计算的结果
- 首次执行时 `previous` 为 `undefined`

### 4.3 useResource$ vs useTask$

| 特性 | useTask$ | useResource$ |
|---|---|---|
| 返回值 | 无（修改外部状态） | 有（返回 Resource 对象） |
| 阻塞渲染 | ✅ 是 | ❌ 否 |
| 加载状态 | 需手动管理 | 自动（pending/resolved/rejected） |
| 适用场景 | 初始化、副作用 | 异步数据获取 |

### 4.4 useResource$ vs routeLoader$

| 特性 | useResource$ | routeLoader$ |
|---|---|---|
| 执行时机 | 组件渲染时 | 路由处理时（更早） |
| 首屏数据 | 可以但不是最优 | ✅ 最优（SSR 前就获取） |
| 交互触发 | ✅ 适合 | 不适合 |
| 阻塞 SSR | 不阻塞 | 阻塞（确保数据在 HTML 中） |

**选择策略：**
- 首屏需要的数据 → `routeLoader$`
- 用户交互触发的数据 → `useResource$`

---

## 五、完整生命周期流程图

### SSR 场景

```
服务器：
  useTask$() 执行 → RENDER → HTML 输出 → 暂停

浏览器（恢复）：
  useVisibleTask$() 执行（组件可见时）

浏览器（状态变化）：
  useTask$() 重新执行 → RENDER → DOM 更新
```

### 纯浏览器场景（SPA 导航）

```
浏览器：
  useTask$() 执行 → RENDER → useVisibleTask$() 执行
```

---

## 六、动手实践

### 练习 1：防抖搜索

使用 `useTask$` + `cleanup` 实现一个防抖搜索：
- 输入框输入关键词
- 停止输入 300ms 后才执行搜索
- 显示搜索结果

### 练习 2：实时时钟

使用 `useVisibleTask$` 实现一个实时时钟组件：
- 每秒更新时间
- 组件不可见时不运行（默认行为）
- 清理定时器

### 练习 3：用户信息加载器

使用 `useResource$` + `<Resource />` 实现：
- 输入用户 ID（1-10）
- 加载并显示用户信息
- 处理加载中、加载失败、加载成功三种状态

### 练习 4：服务端守卫模式

使用 `useTask$` + `isServer` 实现一个只在浏览器端执行的动画效果：
- 组件渲染后，文字颜色渐变
- SSR 时直接显示最终状态

---

## 七、大师洞察

### 为什么 Qwik 没有 "onMount"？

传统框架的 `onMount` 在 SSR + 浏览器各执行一次（水合需要重新挂载）。Qwik 的可恢复性意味着组件只挂载一次：
- SSR 时 `useTask$` 执行 → 浏览器不需要重新挂载
- 没有 `track()` 的 `useTask$` 就相当于 `onMount`

### useTask$ 的阻塞特性

`useTask$` 会阻塞渲染直到完成。这在 SSR 时是好事（确保数据在 HTML 中），但如果 task 执行时间很长，会导致首屏延迟。对于不阻塞渲染的异步操作，使用 `useResource$`。

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `useTask$` 执行初始化和响应式副作用
- [ ] 使用 `track()` 追踪状态变化
- [ ] 使用 `cleanup()` 清理副作用
- [ ] 使用 `useVisibleTask$` 执行浏览器端任务
- [ ] 使用 `useResource$` + `<Resource />` 处理异步数据
- [ ] 理解 SSR 和浏览器中的生命周期差异
