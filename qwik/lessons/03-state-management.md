# 第 3 课：状态管理 — Signals 与 Stores

> 🎯 学习目标：掌握 Qwik 的响应式状态管理系统，理解 Signal 和 Store 的区别与用法

---

## 一、useSignal() — 响应式单一值

### 1.1 基本用法

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);

  return (
    <div>
      <p>计数：{count.value}</p>
      <button onClick$={() => count.value++}>+1</button>
    </div>
  );
});
```

**关键点：**
- `useSignal(initialValue)` 返回一个 `{ value: T }` 对象
- 修改 `.value` 会自动触发依赖它的 UI 更新
- 初始值可以是任何类型：`string`、`number`、`boolean`、`object`、`undefined`

### 1.2 不同类型的 Signal

```tsx
const name = useSignal('Qwik');           // string
const count = useSignal(0);               // number
const isVisible = useSignal(false);       // boolean
const user = useSignal<{ name: string } | undefined>(undefined); // object
const items = useSignal<string[]>([]);    // array
```

### 1.3 bind: 双向绑定

Qwik 提供了 `bind:property` 语法实现双向绑定：

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const name = useSignal('Qwik');
  const checked = useSignal(false);

  return (
    <div>
      <input type="text" bind:value={name} />
      <p>你好，{name.value}！</p>

      <label>
        <input type="checkbox" bind:checked={checked} />
        同意条款：{checked.value ? '✅' : '❌'}
      </label>
    </div>
  );
});
```

`bind:value={name}` 等价于：
```tsx
<input value={name.value} onInput$={(_, el) => name.value = el.value} />
```

---

## 二、useStore() — 响应式对象

### 2.1 基本用法

```tsx
import { component$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const state = useStore({
    count: 0,
    name: 'Qwik',
    items: ['苹果', '香蕉'],
  });

  return (
    <div>
      <button onClick$={() => state.count++}>计数：{state.count}</button>
      <input bind:value={state.name} />
      <p>名字：{state.name}</p>
      <button onClick$={() => state.items.push('橙子')}>添加橙子</button>
      <ul>
        {state.items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
});
```

### 2.2 深度响应式

`useStore()` 默认是**深度响应式**的，嵌套对象和数组的修改也会触发更新：

```tsx
import { component$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const store = useStore({
    nested: {
      fields: { are: 'also tracked' },
    },
    list: ['Item 1'],
  });

  return (
    <>
      <p>{store.nested.fields.are}</p>
      <button onClick$={() => { store.nested.fields.are = 'tracked'; }}>
        修改嵌套属性（会触发更新）
      </button>
      <button onClick$={() => { store.list.push(`Item ${store.list.length + 1}`); }}>
        添加列表项（会触发更新）
      </button>
    </>
  );
});
```

### 2.3 浅层响应式

当嵌套层级很深时，深度追踪的 Proxy 开销可能影响性能。可以使用 `{ deep: false }`：

```tsx
const shallowStore = useStore(
  {
    nested: { fields: { are: 'not tracked' } },
    list: ['Item 1'],
  },
  { deep: false }
);

// ⚠️ 浅层模式下，修改嵌套属性不会触发更新
shallowStore.nested.fields.are = 'changed'; // ❌ 不会触发更新
shallowStore.nested = { fields: { are: 'changed' } }; // ✅ 会触发更新（顶层属性）
```

### 2.4 ⚠️ 解构会破坏响应性

```tsx
// ❌ 错误：解构后失去响应性
const { count } = useStore({ count: 0 });
count++; // 不会触发 UI 更新！

// ✅ 正确：保持对 store 的引用
const state = useStore({ count: 0 });
state.count++; // 会触发 UI 更新
```

---

## 三、计算状态

### 3.1 useComputed$() — 同步计算

```tsx
import { component$, useComputed$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const name = useSignal('qwik');
  const capitalizedName = useComputed$(() => {
    return name.value.toUpperCase();
  });

  return (
    <>
      <input type="text" bind:value={name} />
      <p>原始：{name.value}</p>
      <p>大写：{capitalizedName.value}</p>
    </>
  );
});
```

**特点：**
- 同步计算，自动追踪依赖
- 只有依赖变化时才重新计算
- 类似其他框架的 `memo` / `computed`

### 3.2 useResource$() — 异步计算

```tsx
import { component$, useResource$, Resource, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const postId = useSignal('1');

  const postResource = useResource$<string>(async ({ track }) => {
    track(() => postId.value);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId.value}`);
    const data = await res.json();
    return data.title;
  });

  return (
    <>
      <input type="number" bind:value={postId} min={1} max={100} />
      <Resource
        value={postResource}
        onPending={() => <p>加载中...</p>}
        onRejected={() => <p>加载失败</p>}
        onResolved={(title) => <h2>{title}</h2>}
      />
    </>
  );
});
```

**useResource$ 的特点：**
- 异步计算，不阻塞渲染
- 返回 Resource 对象，配合 `<Resource />` 组件使用
- 支持 `track()` 追踪依赖
- 支持 `cleanup()` 清理副作用（如 AbortController）

### 3.3 useResource$ 高级用法 — AbortController

```tsx
import { component$, useResource$, Resource, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const query = useSignal('');

  const jokes = useResource$<string[]>(async ({ track, cleanup }) => {
    track(() => query.value);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    if (query.value.length < 3) return [];

    const res = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${query.value}`,
      { signal: controller.signal }
    );
    const json = await res.json();
    return json.result.map((j: any) => j.value);
  });

  return (
    <>
      <input bind:value={query} placeholder="搜索笑话..." />
      <Resource
        value={jokes}
        onPending={() => <p>搜索中...</p>}
        onResolved={(jokes) => (
          <ul>{jokes.map((j, i) => <li key={i}>{j}</li>)}</ul>
        )}
      />
    </>
  );
});
```

---

## 四、状态传递

### 4.1 通过 Props 传递

```tsx
import { component$, useStore } from '@builder.io/qwik';

export default component$(() => {
  const userData = useStore({ count: 0 });
  return <Child userData={userData} />;
});

interface ChildProps {
  userData: { count: number };
}

export const Child = component$<ChildProps>(({ userData }) => {
  return (
    <>
      <button onClick$={() => userData.count++}>+1</button>
      <p>计数：{userData.count}</p>
    </>
  );
});
```

### 4.2 通过 Context 传递（避免 Props Drilling）

```tsx
import {
  component$, useStore, createContextId, useContext, useContextProvider,
} from '@builder.io/qwik';

export const CounterCtx = createContextId<{ count: number }>('counter');

export default component$(() => {
  const state = useStore({ count: 0 });
  useContextProvider(CounterCtx, state);
  return <DeepChild />;
});

const DeepChild = component$(() => {
  const state = useContext(CounterCtx);
  return (
    <button onClick$={() => state.count++}>计数：{state.count}</button>
  );
});
```

---

## 五、noSerialize() — 不可序列化的数据

```tsx
import {
  component$, useStore, useSignal, noSerialize, useVisibleTask$, type NoSerialize,
} from '@builder.io/qwik';

export default component$(() => {
  const store = useStore<{ editor: NoSerialize<any> }>({
    editor: undefined,
  });

  useVisibleTask$(() => {
    // 第三方库实例不能被序列化
    const editorInstance = someThirdPartyLib.create();
    store.editor = noSerialize(editorInstance);
  });

  return <div>编辑器已加载：{store.editor ? '✅' : '❌'}</div>;
});
```

**使用场景：** Monaco Editor、Chart.js 实例、WebSocket 连接等不可序列化的浏览器端对象。

**注意：** `noSerialize()` 标记的值在 SSR→浏览器切换时会变为 `undefined`，需要在浏览器端重新初始化。

---

## 六、Store 方法

Store 可以包含方法，但必须使用 QRL 和 `this`：

```tsx
import { component$, useStore, $, type QRL } from '@builder.io/qwik';

type CountStore = { count: number; increment: QRL<(this: CountStore) => void> };

export default component$(() => {
  const state = useStore<CountStore>({
    count: 0,
    increment: $(function (this: CountStore) {
      this.count++;
    }),
  });

  return (
    <>
      <button onClick$={() => state.increment()}>+1</button>
      <p>计数：{state.count}</p>
    </>
  );
});
```

**⚠️ 必须使用 `function(){}` 而非箭头函数**，因为箭头函数没有自己的 `this` 绑定。

---

## 七、untrack() — 读取值但不追踪

默认情况下，在 `useTask$` 或 `useComputed$` 中读取 signal/store 的值会自动创建响应式订阅。但有时你只需要"读取一次"当前值，不希望值的变化触发重新执行：

```tsx
import { component$, useSignal, useTask$, untrack } from '@builder.io/qwik';

export default component$(() => {
  const search = useSignal('');
  const count = useSignal(0);

  useTask$(({ track }) => {
    const query = track(() => search.value);
    // 读取 count 但不追踪其变化
    const currentCount = untrack(count);
    console.log(`搜索: ${query}, 当前计数: ${currentCount}`);
  });

  return (
    <>
      <input bind:value={search} placeholder="搜索..." />
      <button onClick$={() => count.value++}>计数：{count.value}</button>
    </>
  );
});
```

**untrack 的两种用法：**

```tsx
// 1. 直接传入 signal 或 store（Qwik 1.19+）
const currentCount = untrack(count);

// 2. 传入函数（适用于复杂读取）
const value = untrack(() => someStore.computedProperty);
```

**典型场景：**
- 在 `useTask$` 中读取辅助值，但不希望它触发副作用重新执行
- 在 `useComputed$` 中读取某个值参与计算，但不希望该值变化时重新计算
- 调试时查看当前状态，不产生副作用

---

## 八、动手实践

### 练习 1：计数器

创建一个计数器组件：
- 显示当前计数值
- 提供 +1、-1、重置按钮
- 当计数为负数时显示红色，正数显示绿色，零显示灰色

### 练习 2：Todo 应用

使用 `useStore` 构建一个完整的 Todo 应用：
- 添加新 Todo
- 标记完成/未完成
- 删除 Todo
- 显示未完成数量（使用 `useComputed$`）

### 练习 3：实时搜索

使用 `useResource$` 实现一个搜索功能：
- 输入框输入关键词
- 实时搜索 API（如 `https://jsonplaceholder.typicode.com/users?name_like=xxx`）
- 显示加载状态和结果
- 使用 AbortController 取消过期请求

---

## 九、大师洞察

### useSignal vs useStore 的选择

| 场景 | 推荐 | 原因 |
|---|---|---|
| 单一原始值 | `useSignal` | 更轻量，语义清晰 |
| 多个相关字段 | `useStore` | 逻辑聚合，便于管理 |
| 需要深度追踪 | `useStore` | `useSignal` 不追踪嵌套 |
| 只需浅层追踪 | `useStore({ deep: false })` | 性能更优 |

### useResource$ vs routeLoader$ 的选择

| 场景 | 推荐 | 原因 |
|---|---|---|
| 首屏数据（SSR） | `routeLoader$` | 在组件渲染前就开始获取 |
| 用户交互触发的数据 | `useResource$` | 按需获取，不阻塞首屏 |
| 需要加载状态 UI | `useResource$` | 配合 `<Resource />` 组件 |

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `useSignal` 和 `useStore` 管理状态
- [ ] 使用 `bind:value` 实现双向绑定
- [ ] 使用 `useComputed$` 创建同步计算值
- [ ] 使用 `useResource$` + `<Resource />` 处理异步数据
- [ ] 通过 Props 和 Context 传递状态
- [ ] 使用 `noSerialize` 处理不可序列化数据
- [ ] 使用 `untrack()` 读取值但不创建响应式依赖
