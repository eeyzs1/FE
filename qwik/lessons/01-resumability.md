# 第 1 课：理解 Qwik 的革命性思想 — 可恢复性（Resumability）

> 🎯 学习目标：理解 Qwik 为什么不同于其他框架，掌握可恢复性的核心概念

---

## 一、问题：传统框架的困境

### 1.1 水合（Hydration）是什么？

在 React/Next.js、Vue/Nuxt 等传统框架中，SSR 的工作流程是：

```
服务器渲染 HTML → 发送到浏览器 → 浏览器下载 JS → 重新执行框架代码 → 重新绑定事件监听器 → 页面可交互
```

最后三步（下载 JS → 重新执行 → 重新绑定）就是**水合（Hydration）**。

**水合的核心问题：**
- **重复工作**：服务器已经渲染过一次，浏览器又要重新执行一遍
- **全量下载**：即使页面只有 1 个按钮需要交互，也要下载整个应用的 JS
- **启动时间**：JS 越多，水合越慢，页面可交互时间（TTI）越长

### 1.2 应用越大，问题越严重

```
小型应用：水合可能只需 100ms，用户感知不到
中型应用：水合可能需要 500ms-1s，开始影响体验
大型应用：水合可能需要 2-5s+，用户明显感觉卡顿
```

这就是为什么很多大型 SPA 首屏加载很慢的原因。

---

## 二、Qwik 的解决方案：可恢复性（Resumability）

### 2.1 核心思想

Qwik 的哲学是：**服务器做过的事情，浏览器不需要重做。**

```
服务器渲染 HTML + 序列化状态 → 发送到浏览器 → 浏览器直接恢复执行（无需水合）
```

**关键区别：**
| | 水合（Hydration） | 可恢复性（Resumability） |
|---|---|---|
| 服务器工作 | 渲染 HTML | 渲染 HTML + 序列化状态和事件监听器 |
| 浏览器工作 | 重新执行框架 + 绑定事件 | 直接恢复，按需加载 |
| 初始 JS 体积 | 整个应用框架 | 约 1KB |
| 启动时间 | 与应用大小成正比 | 几乎恒定 |

### 2.2 Qwik 如何实现可恢复性

Qwik 在服务器端渲染时，会做三件关键的事：

1. **序列化组件状态**：把所有状态（signals、stores）序列化到 HTML 中
2. **序列化事件监听器**：把事件处理器变成引用（QRL），而不是内联函数
3. **序列化框架内部数据结构**：组件树、渲染边界等

打开浏览器查看 Qwik 页面的 HTML 源码，你会看到类似这样的内容：

```html
<!--qv q:sref=0 q:key=--><button on:click="/src/routes/index.tsx#count_value++" >Count: 0</button><!--/qv-->
<script type="qwik/json">
{"refs":{"0":"count value++"},"ctx":{"#1":{"s":[{"0":0}]}}}
</script>
```

- `on:click="/src/routes/index.tsx#count_value++"` — 这是一个 **QRL**，指向事件处理器的代码位置
- `<script type="qwik/json">` — 序列化的应用状态

**当用户点击按钮时：**
1. Qwik 运行时（~1KB）拦截点击事件
2. 根据 QRL 下载对应的 JS chunk
3. 执行事件处理器
4. 按需重新渲染受影响的组件

---

## 三、`$` 符号 — 惰性边界（Lazy Boundary）

### 3.1 为什么需要 `$`

`$` 是 Qwik 最独特的语法。它标记一个**惰性边界**，告诉 Optimizer：

> "这里的代码可以被延迟加载，不需要立即执行。"

### 3.2 `$` 出现的所有位置

```tsx
// 1. component$ — 组件定义
component$(() => { ... })

// 2. 事件处理器
<button onClick$={() => count.value++}>

// 3. $() — 创建可复用的 QRL
const increment = $(() => count.value++)

// 4. useTask$ — 生命周期
useTask$(({ track }) => { ... })

// 5. useVisibleTask$ — 浏览器端任务
useVisibleTask$(() => { ... })

// 6. useResource$ — 异步资源
useResource$(async ({ track }) => { ... })

// 7. useStylesScoped$ — 样式
useStylesScoped$(styles)

// 8. routeLoader$ — 数据加载
routeLoader$(async () => { ... })

// 9. routeAction$ — 服务端操作
routeAction$(async (data) => { ... })

// 10. server$ — 服务端函数
server$(() => { ... })

// 11. zod$ — 验证
zod$({ name: z.string() })
```

### 3.3 Optimizer 的工作原理

当你写：

```tsx
export const Counter = component$(() => {
  const count = useSignal(0);
  return <button onClick$={() => count.value++}>Count: {count.value}</button>;
});
```

Optimizer 会将其转换为：

```tsx
// 组件的渲染函数被提取到单独的 chunk
const Counter_onRender = () => (
  <button onClick$={qrl('./chunk-a.js', 'Counter_onClick')}>
    Count: {count.value}
  </button>
);

// 事件处理器被提取到单独的 chunk
const Counter_onClick = () => count.value++;

// 组件引用变为 QRL
const Counter = componentQrl(qrl('./chunk-b.js', 'Counter_onMount'));
const Counter_onMount = () => qrl('./chunk-c.js', 'Counter_onRender');
```

**关键效果：**
- `Counter` 组件不再直接引用 `Counter_onClick`
- `Counter_onClick` 可以被放到独立的 chunk 中
- 只有用户点击按钮时，才会下载 `Counter_onClick` 所在的 chunk

---

## 四、QRL（Qwik Resource Locator）

QRL 是 Qwik 的核心数据结构，它是一个**延迟引用**：

```typescript
// QRL 本质上是一个"指针"，指向代码的位置
// 格式：[chunk_url]#[symbol_name]
// 例如：/src/routes/index.tsx#Counter_onClick
```

QRL 的特点：
- **可序列化**：可以保存到 HTML 中
- **延迟加载**：只在需要时才下载和执行
- **预加载**：Qwik 会在用户 hover 链接时预加载对应的 chunk

---

## 五、动手实践

### 练习 1：观察 Qwik 的序列化

1. 启动开发服务器：`pnpm start`
2. 打开浏览器访问 `http://localhost:5173`
3. 右键 → 查看页面源代码
4. 搜索 `qwik/json`，观察序列化的状态
5. 搜索 `on:click`，观察 QRL 引用

### 练习 2：对比 Qwik 与 React 的初始加载

1. 打开 Chrome DevTools → Network 面板
2. 刷新页面，观察加载了多少 JS 文件
3. 注意：开发模式下 Qwik 会加载更多文件（Vite 的 HMR），这是正常的
4. 运行 `pnpm preview` 查看生产构建，对比 JS 体积

### 练习 3：理解 `$` 的代码分割效果

1. 在 `src/routes/index.tsx` 中创建一个简单的计数器组件
2. 运行 `pnpm build` 构建生产版本
3. 查看 `dist/` 目录，观察 Qwik 如何将代码分割成多个小 chunk

---

## 六、大师洞察

### Qwik 不是"写得少"，而是"加载得少"

Qwik 应用可能和 React 应用有同样多的代码，但关键区别是：
- React：所有代码在首屏就要下载和执行
- Qwik：代码按需下载，用户不交互的代码永远不会加载

### 可恢复性 vs 水合是根本性的架构差异

这不是一个可以通过插件或配置解决的问题。可恢复性要求从框架底层重新设计：
- 状态必须是可序列化的
- 事件处理器必须是可引用的（QRL）
- 组件必须是可独立加载的

这就是为什么现有框架（React、Vue）无法"添加"可恢复性——它们的架构假设与可恢复性根本矛盾。

### React → Qwik 概念对照表

如果你来自 React，以下对照表帮助你快速理解 Qwik 的对应概念：

| React | Qwik | 说明 |
|---|---|---|
| `useState` | `useSignal` / `useStore` | Qwik 是细粒度响应式，不需要 setter 函数 |
| `useEffect` | `useTask$` / `useVisibleTask$` | Qwik 区分 SSR/浏览器执行环境 |
| `useMemo` | `useComputed$` | 自动追踪依赖，无需手动声明 deps |
| `useRef` | `useSignal<Element>` | Qwik 用 signal 做 ref，统一响应式模型 |
| `useCallback` | `$()` | Qwik 的 `$()` 是惰性边界，自动代码分割 |
| `onClick` | `onClick$` | `$` 后缀标记惰性边界 |
| `<Suspense>` | `<Resource>` | Qwik 内建异步状态管理（pending/resolved/rejected） |
| `createContext` + `useContext` | `createContextId` + `useContext` | Qwik 需要显式创建 ID |
| `React.lazy` | 不需要 | `component$()` 自动实现延迟加载 |
| `next/getServerSideProps` | `routeLoader$` | Qwik 在组件渲染前获取数据 |
| `next/api` | `onGet`/`onPost` + `server$` | Qwik City 内建 API 端点 |
| 水合（Hydration） | 可恢复性（Resumability） | 核心架构差异，Qwik 不需要重新执行 |

---

## 七、关键术语速查

| 术语 | 含义 |
|---|---|
| Resumability | 可恢复性：服务器状态可直接在浏览器恢复，无需重执行 |
| Hydration | 水合：浏览器重新执行框架代码以使页面可交互 |
| QRL | Qwik Resource Locator：指向可延迟加载代码的引用 |
| Optimizer | Qwik 编译器：将 `$` 标记的代码拆分为可独立加载的 chunk |
| Lazy Boundary | 惰性边界：`$` 标记的代码分割点 |
| Serialization | 序列化：将运行时状态转换为可存储/传输的格式 |

---

## 八、延伸阅读

- [Think Qwik](https://qwik.dev/docs/think-qwik/) — Qwik 的设计哲学
- [Resumability vs Hydration](https://qwik.dev/docs/concepts/resumable/) — 深入对比

---

✅ 完成本课后，你应该能够：
- [ ] 解释水合（Hydration）的问题
- [ ] 解释 Qwik 的可恢复性如何解决这些问题
- [ ] 理解 `$` 符号的作用和 Optimizer 的工作原理
- [ ] 在浏览器中查看 Qwik 的序列化状态和 QRL 引用
