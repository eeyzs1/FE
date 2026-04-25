# SolidJS 大师之路 — 完整自学教程

> 本教程基于 [SolidJS 官方文档](https://docs.solidjs.com/) 精心设计，从零基础到精通，带你系统掌握 SolidJS 的每一个核心概念。
> 学完本教程，你将具备独立构建高性能 SolidJS 应用的能力。

---

## 目录

- [如何使用本教程](#如何使用本教程)
- [学习前准备](#学习前准备)
- [阶段一：入门基础（第1-3天）](#阶段一入门基础第1-3天)
- [阶段二：响应式系统核心（第4-8天）](#阶段二响应式系统核心第4-8天)
- [阶段三：组件与 JSX（第9-13天）](#阶段三组件与-jsx第9-13天)
- [阶段四：控制流与列表渲染（第14-16天）](#阶段四控制流与列表渲染第14-16天)
- [阶段五：异步数据与资源管理（第17-19天）](#阶段五异步数据与资源管理第17-19天)
- [阶段六：高级响应式（第20-23天）](#阶段六高级响应式第20-23天)
- [阶段七：DOM 操作与样式（第24-26天）](#阶段七dom-操作与样式第24-26天)
- [阶段八：TypeScript 与工程化（第27-29天）](#阶段八typescript-与工程化第27-29天)
- [阶段九：Solid Router（第30-32天）](#阶段九solid-router第30-32天)
- [阶段十：SolidStart 全栈框架（第33-36天）](#阶段十solidstart-全栈框架第33-36天)
- [阶段十一：综合实战项目（第37-41天）](#阶段十一综合实战项目第37-41天)
- [附录：核心 API 速查表](#附录核心-api-速查表)
- [附录：与 React 的关键差异](#附录与-react-的关键差异)
- [附录：与 Vue 的关键差异](#附录与-vue-的关键差异)
- [附录：性能优化专题](#附录性能优化专题)
- [附录：SolidJS 2.0 展望](#附录solidjs-20-展望)
- [附录：测试 SolidJS 应用](#附录测试-solidjs-应用)
- [附录：推荐学习资源](#附录推荐学习资源)

---

## 如何使用本教程

### 学习方法

1. **先读文档，再动手**：每个章节都配有官方文档链接，先通读官方文档理解概念，再在本项目中动手实践
2. **边学边改**：本项目已初始化完毕，直接修改 `src/App.tsx` 或创建新文件来实验
3. **完成练习**：每节末尾都有练习题，务必独立完成后再继续
4. **做笔记**：在关键概念处做自己的理解和总结

### 项目使用方式

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```

建议为每个阶段创建独立的组件文件，例如：
- `src/studies/01-hello-solid.tsx`
- `src/studies/02-signals.tsx`
- ...

然后在 `src/App.tsx` 中引入当前正在学习的组件。

---

## 学习前准备

### 前置知识

- HTML / CSS / JavaScript 基础（ES6+）
- 了解 TypeScript 基本类型注解
- 了解 npm/pnpm 包管理器基本用法
- 有 React/Vue 经验更佳（但非必须）

### 核心心智模型转变

如果你来自 React，请务必牢记以下关键差异：

| 概念 | React | SolidJS |
|------|-------|---------|
| 组件执行 | 每次状态变化都重新执行 | **只执行一次**（初始化时） |
| 状态更新 | 整个组件重新渲染 | **细粒度更新**（只更新变化的部分） |
| 虚拟 DOM | 有虚拟 DOM | **无虚拟 DOM**，直接操作真实 DOM |
| 状态读取 | 直接读取变量 | **调用函数**读取：`count()` |
| Props 解构 | 可以解构 | **不能解构**，会破坏响应性 |
| Hooks 规则 | 有调用顺序限制 | 无调用顺序限制，但需在响应式作用域内 |

---

## 阶段一：入门基础（第1-3天）

### 第1天：认识 SolidJS

**学习目标**：理解 SolidJS 的设计哲学和核心特性

**官方文档**：
- [What is Solid?](https://docs.solidjs.com/) — SolidJS 是什么
- [Quick Start](https://docs.solidjs.com/quick-start) — 快速开始

**核心知识点**：

1. **细粒度响应性（Fine-grained Reactivity）**
   - Solid 不使用虚拟 DOM，而是通过响应式系统精确追踪数据依赖
   - 当数据变化时，只更新与该数据直接关联的 DOM 节点
   - 对比 React：React 状态变化会重新执行整个组件函数，Solid 只更新具体变化的部分

2. **Solid 的四大特性**
   - **Performant（高性能）**：细粒度更新，只更新变化的部分
   - **Powerful（强大）**：更少的内存和处理器占用，灵活控制更新时机
   - **Pragmatic（务实）**：不强制特定结构，自由选择最佳策略
   - **Productive（高效）**：清晰可预测的 API

3. **项目结构理解**
   ```
   solid/
   ├── public/           # 静态资源
   ├── src/
   │   ├── App.tsx       # 主组件
   │   ├── App.css       # 主组件样式
   │   ├── index.tsx     # 入口文件（render 函数）
   │   └── index.css     # 全局样式
   ├── index.html        # HTML 模板
   ├── package.json      # 依赖配置
   └── vite.config.ts    # Vite 配置
   ```

**练习**：
1. 启动项目 `pnpm run dev`，确认开发服务器运行正常
2. 修改 `src/App.tsx`，将 "Get started" 改为 "Hello SolidJS!"，观察 HMR（热模块替换）效果
3. 理解 `src/index.tsx` 中 `render(() => <App />, root!)` 的作用

---

### 第2天：理解 JSX

**学习目标**：掌握 Solid 中 JSX 的写法和规则

**官方文档**：
- [Understanding JSX](https://docs.solidjs.com/concepts/understanding-jsx) — 理解 JSX

**核心知识点**：

1. **JSX 基本规则**
   - 必须返回**单一根元素**（与 HTML 不同，JSX 不允许顶层多个并列标签）
   - 所有标签必须**自闭合**：`<img />`、`<input />`、`<br />`
   - 使用花括号 `{}` 嵌入 JavaScript 表达式

2. **HTML 属性 vs JSX 属性**
   - HTML 属性：直接设置在 HTML 元素上，如 `class`、`onClick`
   - JSX 属性（Props）：传递数据给组件，如 `name="Ryan"`
   - 事件监听器使用驼峰命名：`onClick`、`onInput`
   - 内联样式使用双花括号：`style={{ color: 'red' }}`

3. **静态 Props vs 动态 Props**
   - 静态 Props：直接写死值，编译时确定
   - 动态 Props：依赖状态，运行时变化，如 `value={value()}`

4. **Solid JSX 的特殊性**
   - Solid 的 JSX 直接返回 DOM 元素（不是虚拟 DOM）
   - 动态表达式在 JSX 中按定义顺序应用

**练习**：
1. 创建一个组件，包含一个 `<h1>` 标题和一个带 `style` 属性的 `<p>`
2. 尝试在 JSX 中使用三元表达式：`{condition ? <A /> : <B />}`
3. 故意写一个未闭合的标签，观察编译错误

---

### 第3天：组件基础

**学习目标**：理解 Solid 组件的本质和生命周期

**官方文档**：
- [Components Basics](https://docs.solidjs.com/concepts/components/basics) — 组件基础

**核心知识点**：

1. **组件是函数**
   ```tsx
   function MyComponent() {
     return <div>Hello World</div>;
   }
   ```
   - 组件名必须**大写字母开头**，否则不被识别为组件
   - 组件可以嵌套组合

2. **组件树**
   ```
   App                    // 根组件
   ├── Header
   ├── Sidebar
   └── Content
       ├── Post
       │   ├── PostHeader
       │   └── PostContent
       └── Post
   ```

3. **组件生命周期 — 最重要的概念！**
   - **Solid 组件只执行一次**（首次渲染时）
   - 组件函数体中的代码只在初始化时运行
   - 状态变化不会重新执行组件函数，只会更新 JSX 中依赖该状态的部分
   - 这与 React 完全不同！

4. **初始化逻辑 vs 响应式逻辑**
   ```tsx
   function MyComponent() {
     // 初始化逻辑 — 只执行一次
     const [count, setCount] = createSignal(0);
     console.log(count()); // 只在首次渲染时打印

     return (
       <div>
         {/* 响应式逻辑 — count 变化时自动更新 */}
         <p>Count: {count()}</p>
         <button onClick={() => setCount(prev => prev + 1)}>+1</button>
       </div>
     );
   }
   ```

5. **条件渲染**
   - 条件语句必须放在 `return` 中，因为组件函数体只执行一次
   - 使用三元表达式或 `<Show>` 组件

**练习**：
1. 创建三个组件：`Header`、`Main`、`Footer`，在 `App` 中组合使用
2. 在组件函数体中添加 `console.log`，验证组件只执行一次
3. 尝试在组件函数体中使用 `if` 语句进行条件渲染，观察问题

---

## 阶段二：响应式系统核心（第4-8天）

### 第4天：响应性入门

**学习目标**：理解响应式编程的基本概念

**官方文档**：
- [Intro to Reactivity](https://docs.solidjs.com/concepts/intro-to-reactivity) — 响应性入门

**核心知识点**：

1. **什么是响应性？**
   - 响应性是指系统在数据变化时自动更新 UI 的能力
   - 传统方式：数据变化 → 手动更新 DOM
   - 响应式方式：数据变化 → 自动更新关联的 DOM

2. **信号（Signals）**
   - 信号是响应式系统的核心，负责存储和管理数据
   - 由 getter（读取）和 setter（修改）组成
   ```tsx
   const [count, setCount] = createSignal(0);
   //       ^ getter    ^ setter
   ```

3. **订阅者（Subscribers）**
   - 订阅者追踪信号变化并响应
   - 两个核心行为：**观察**（Observation）和**响应**（Response）
   - `createEffect` 就是一个订阅者

4. **追踪范围（Tracking Scope）**
   - 信号必须在追踪范围内访问才能被追踪
   - JSX 的 `return` 语句是一个追踪范围
   - `createEffect` 和 `createMemo` 也创建追踪范围
   - 在追踪范围外访问信号，变化不会触发更新

5. **组件只执行一次的深层含义**
   ```tsx
   function Counter() {
     const [count, setCount] = createSignal(0);
     // ❌ 这行只在初始化时执行，count 变化不会重新打印
     console.log("Count is:", count());
     return (
       <div>
         {/* ✅ JSX 中的 count() 会被追踪，变化时自动更新 */}
         <span>Count: {count()}</span>
         <button onClick={() => setCount(prev => prev + 1)}>+1</button>
       </div>
     );
   }
   ```

**练习**：
1. 创建一个信号，在 `createEffect` 中读取它，修改信号值观察效果
2. 尝试在追踪范围外读取信号，验证变化不会触发更新
3. 在 JSX 中使用信号，验证 UI 自动更新

---

### 第5天：Signals 深入

**学习目标**：精通 Signal 的各种用法

**官方文档**：
- [Signals](https://docs.solidjs.com/concepts/signals) — 信号详解

**核心知识点**：

1. **创建信号**
   ```tsx
   import { createSignal } from "solid-js";
   const [count, setCount] = createSignal(0);
   ```

2. **读取信号值**
   ```tsx
   console.log(count()); // 调用 getter 函数获取当前值
   ```
   - **注意**：`count` 是函数，`count()` 才是值！这是与 React 最大的区别之一

3. **修改信号值**
   ```tsx
   // 直接设置新值
   setCount(5);

   // 使用函数式更新（推荐，可获取前一个值）
   setCount(prev => prev + 1);
   ```

4. **信号的响应性**
   - 在追踪范围内调用 `count()` 时，信号会自动将当前依赖添加到订阅列表
   - 信号值变化时，通知所有订阅者重新求值

5. **信号可以存储任何类型的值**
   ```tsx
   const [name, setName] = createSignal("Alice");
   const [user, setUser] = createSignal({ name: "Bob", age: 25 });
   const [items, setItems] = createSignal([1, 2, 3]);
   ```

6. **Signal 的 `equals` 选项**
   ```tsx
   // 默认行为：新值 === 旧值时不触发更新
   const [count, setCount] = createSignal(0);

   // equals: false — 即使值相同也触发更新
   const [items, setItems] = createSignal([1, 2, 3], { equals: false });
   // 适合用 mutate 方法修改数组后仍需触发更新的场景

   // 自定义相等判断
   const [point, setPoint] = createSignal(
     { x: 0, y: 0 },
     { equals: (prev, next) => prev.x === next.x && prev.y === next.y }
   );
   ```

**练习**：
1. 实现一个计数器，包含增加、减少、重置功能
2. 实现一个温度转换器（摄氏 ↔ 华氏），使用两个信号
3. 实现一个简单的待办列表，用信号存储数组

---

### 第6天：Effects 效果

**学习目标**：掌握 Effect 的使用和生命周期

**官方文档**：
- [Effects](https://docs.solidjs.com/concepts/effects) — 效果详解
- [createEffect API](https://docs.solidjs.com/reference/basic-reactivity/create-effect) — createEffect 参考

**核心知识点**：

1. **创建 Effect**
   ```tsx
   import { createEffect } from "solid-js";

   createEffect(() => {
     console.log(count()); // count 变化时自动重新执行
   });
   ```
   - Effect 在创建时**立即执行一次**
   - 之后每当依赖的信号变化时重新执行

2. **自动依赖追踪**
   - Solid 自动追踪 Effect 中访问的所有响应式值
   - 无需手动声明依赖（与 React 的 useEffect 不同）

3. **管理多个信号**
   ```tsx
   createEffect(() => {
     console.log(count(), message()); // 任一信号变化都会触发
   });
   ```
   - 多个信号变化时，Effect 只执行一次（批处理）

4. **嵌套 Effect**
   ```tsx
   createEffect(() => {
     console.log("Outer");
     createEffect(() => {
       console.log("Inner:", count()); // 独立追踪
     });
   });
   ```
   - 内部 Effect 独立追踪自己的依赖
   - 内部信号变化不会触发外部 Effect

5. **Effect 的执行时机**
   - 初始运行：在渲染阶段完成后、浏览器绘制之前
   - 后续运行：依赖变化时
   - 多个依赖在同一批次中变化时，Effect 只运行一次

6. **onMount — 只执行一次的 Effect**
   ```tsx
   import { onMount } from "solid-js";

   onMount(() => {
     console.log("组件已挂载");
     // 不追踪依赖，只执行一次
   });
   ```

7. **onCleanup — 清理副作用**
   ```tsx
   import { onCleanup } from "solid-js";

   createEffect(() => {
     const timer = setInterval(() => console.log("tick"), 1000);
     onCleanup(() => clearInterval(timer)); // Effect 重新执行或组件卸载时清理
   });
   ```

**练习**：
1. 创建一个 Effect，在控制台打印信号值的变化
2. 使用 `onMount` 获取浏览器窗口大小
3. 使用 `onCleanup` 清理一个定时器
4. 创建嵌套 Effect，验证内部 Effect 独立追踪

---

### 第7天：Memos 派生值

**学习目标**：掌握 Memo 的使用和性能优化

**官方文档**：
- [createMemo API](https://docs.solidjs.com/reference/basic-reactivity/createMemo) — createMemo 参考

**核心知识点**：

1. **创建 Memo**
   ```tsx
   import { createMemo } from "solid-js";

   const [count, setCount] = createSignal(0);
   const doubleCount = createMemo(() => count() * 2);
   ```

2. **Memo 的特点**
   - **只读**：返回一个 getter 函数，不能直接修改
   - **缓存**：依赖不变时返回缓存值，不重新计算
   - **响应式**：依赖变化时自动重新计算
   - **纯函数**：计算函数不应修改其他响应式值

3. **Memo vs Effect**
   - Effect：执行副作用（不返回值）
   - Memo：计算派生值（返回值，可被其他响应式值追踪）

4. **Memo 的自定义相等判断**
   ```tsx
   const dateObject = createMemo(
     () => new Date(dateString()),
     undefined,
     {
       equals: (prev, next) => prev.getTime() === next.getTime(),
     }
   );
   ```

5. **访问前一次的值**
   ```tsx
   const trend = createMemo(
     (prev) => {
       const current = count();
       if (current > prev.prevCount) {
         return { prevCount: current, direction: "Up" as const };
       }
       if (current < prev.prevCount) {
         return { prevCount: current, direction: "Down" as const };
       }
       return prev;
     },
     { prevCount: 0, direction: "None" as const }
   );
   // 使用: trend().direction
   ```
   - `createMemo` 的回调函数接收上一次的**返回值**作为参数
   - 注意：返回值类型必须与初始值类型一致，否则后续调用时 `prev` 类型会不匹配

6. **何时使用 Memo**
   - 计算开销较大时
   - 派生值被多处使用时
   - 简单计算（如 `count() * 2`）可以直接在 JSX 中写，不需要 Memo

**练习**：
1. 创建一个 Memo，计算数组的过滤结果
2. 实现一个购物车总价计算器（多个商品价格求和）
3. 使用自定义 `equals` 判断优化 Memo

---

### 第8天：Stores 状态管理

**学习目标**：掌握 Store 管理复杂状态

**官方文档**：
- [Stores](https://docs.solidjs.com/concepts/stores) — Store 详解

**核心知识点**：

1. **为什么需要 Store？**
   - Signal 适合管理单一值
   - Store 适合管理复杂对象/数组，提供**细粒度响应性**
   - Store 中每个属性的变化都是独立追踪的

2. **创建 Store**
   ```tsx
   import { createStore } from "solid-js/store";

   const [store, setStore] = createStore({
     userCount: 3,
     users: [
       { id: 0, username: "felix909", location: "England" },
       { id: 1, username: "tracy634", location: "Canada" },
     ],
   });
   ```

3. **读取 Store 值**
   ```tsx
   // 直接访问属性（不需要调用函数！）
   console.log(store.userCount);       // 3
   console.log(store.users[0].username); // "felix909"
   ```
   - 与 Signal 不同，Store 属性直接访问（不需要 `()`）
   - 但在追踪范围内访问时仍然会被追踪

4. **更新 Store**
   ```tsx
   // 更新单个属性
   setStore("userCount", 5);

   // 使用函数更新
   setStore("users", (currentUsers) => [
     ...currentUsers,
     { id: 3, username: "michael584", location: "Nigeria" },
   ]);

   // 更新嵌套属性
   setStore("users", 0, "username", "newName");
   ```

5. **Store 的懒追踪**
   - Store 创建时不会立即为所有属性创建信号
   - 信号在属性被访问时才**懒创建**
   - 只有被访问的属性才会被追踪

6. **Store 与 Signal 的对比**
   | 特性 | Signal | Store |
   |------|--------|-------|
   | 读取 | `count()` | `store.count` |
   | 更新 | `setCount(1)` | `setStore("count", 1)` |
   | 粒度 | 整体更新 | 属性级细粒度更新 |
   | 适用场景 | 简单值 | 复杂对象/数组 |

**练习**：
1. 用 Store 实现一个用户管理系统（增删改查）
2. 实现嵌套 Store 的更新（如修改用户地址的街道字段）
3. 对比 Signal 和 Store 在更新数组某一项时的行为差异

---

## 阶段三：组件与 JSX（第9-13天）

### 第9天：事件处理与事件委托

**学习目标**：理解 Solid 的事件系统

**官方文档**：
- [Event Handling](https://docs.solidjs.com/concepts/components/event-handlers) — 事件处理

**核心知识点**：

1. **事件绑定方式**
   ```tsx
   // 驼峰命名（委托到 document，推荐）
   <button onClick={(e) => console.log("clicked")}>Click</button>

   // 全小写（直接绑定到元素）
   <button onclick={(e) => console.log("clicked")}>Click</button>
   ```

2. **事件委托机制**
   - `onClick`（驼峰）：事件委托到 `document`，性能更好
   - `onclick`（小写）：直接绑定到 DOM 元素
   - 委托事件在事件冒泡阶段处理
   - 使用 `onclick` 的场景：需要 `e.stopImmediatePropagation()` 阻止委托事件时

3. **事件类型**
   ```tsx
   <input
     onInput={(e: InputEvent & { currentTarget: HTMLInputElement }) => {
       console.log(e.currentTarget.value);
     }}
   />
   ```
   - 常用事件：`onClick`、`onInput`、`onChange`、`onSubmit`、`onKeyDown`
   - Solid 中 `onInput` 对应 React 的 `onChange`（实时输入）

4. **事件与响应式系统**
   - 事件处理器不是响应式的（不在追踪范围内）
   - 事件处理器中读取信号获取的是当前值
   - 不需要担心事件处理器中的闭包陷阱（与 React 不同）

**练习**：
1. 创建一个表单，使用 `onInput` 实时显示输入内容
2. 对比 `onClick`（委托）和 `onclick`（直接绑定）的区别
3. 使用 `onKeyDown` 实现快捷键功能

---

### 第10天：Props 属性传递

**学习目标**：掌握 Props 的正确使用方式

**官方文档**：
- [Props](https://docs.solidjs.com/concepts/components/props) — Props 详解

**核心知识点**：

1. **基本用法**
   ```tsx
   function App() {
     return <MyComponent name="Ryan Carniato" />;
   }

   function MyComponent(props) {
     return <div>Hello {props.name}</div>;
   }
   ```

2. **⚠️ 不能解构 Props！**
   ```tsx
   // ❌ 错误：解构会破坏响应性
   const { name } = props;

   // ❌ 错误：直接赋值也会破坏响应性
   const name = props.name;

   // ✅ 正确：包装为函数保持响应性
   const name = () => props.name;
   // 使用时：name()
   ```

3. **mergeProps — 合并 Props**
   ```tsx
   import { mergeProps } from "solid-js";

   function MyComponent(props) {
     const finalProps = mergeProps({ defaultName: "Ryan" }, props);
     return <div>Hello {finalProps.defaultName}</div>;
   }
   ```

4. **splitProps — 拆分 Props**
   ```tsx
   import { splitProps } from "solid-js";

   function ParentComponent(props) {
     const [greetingProps, personalInfoProps, restProps] = splitProps(
       props,
       ["name"],
       ["age"]
     );
     return (
       <div>
         <Greeting {...greetingProps} />
         <PersonalInfo {...personalInfoProps} />
       </div>
     );
   }
   ```

5. **children 辅助函数**
   ```tsx
   import { children } from "solid-js";

   function ColoredList(props) {
     const safeChildren = children(() => props.children);
     return <>{safeChildren()}</>;
   }
   ```
   - 多次访问 `props.children` 可能导致问题
   - `children()` 确保安全地获取子组件

6. **Props 是只读的**
   - 子组件不应直接修改 Props
   - 鼓励单向数据流

**练习**：
1. 创建一个 `Greeting` 组件，接收 `name` 和 `greeting` 两个 Props
2. 使用 `mergeProps` 为 Props 设置默认值
3. 使用 `splitProps` 将 Props 分组传递给不同子组件
4. 故意解构 Props，观察响应性丢失的问题

---

### 第11天：Context 上下文

**学习目标**：掌握 Context 解决 Prop Drilling 问题

**官方文档**：
- [createContext API](https://docs.solidjs.com/reference/component-apis/create-context) — createContext 参考

**核心知识点**：

1. **为什么需要 Context？**
   - Prop Drilling：多层嵌套组件传递 Props 非常繁琐
   - Context 提供依赖注入，跨组件层级传递数据

2. **创建和使用 Context**
   ```tsx
   import { createContext, useContext } from "solid-js";

   // 1. 创建 Context（建议在独立文件中，避免 HMR 问题）
   const ThemeContext = createContext<"light" | "dark">("light");

   // 2. 提供 Context
   function App() {
     return (
       <ThemeContext.Provider value="dark">
         <ChildComponent />
       </ThemeContext.Provider>
     );
   }

   // 3. 消费 Context
   function ChildComponent() {
     const theme = useContext(ThemeContext);
     return <div>Current theme: {theme}</div>;
   }
   ```

3. **Context 的最佳实践**
   - 在独立模块中定义 Context（避免 HMR 重新创建）
   - 使用 TypeScript 泛型确保类型安全
   - 可以将 Provider 和 Hook 封装在一起

4. **Context 与 Store 结合**
   ```tsx
   const CounterContext = createContext();

   function CounterProvider(props) {
     const [count, setCount] = createSignal(0);
     return (
       <CounterContext.Provider value={{ count, setCount }}>
         {props.children}
       </CounterContext.Provider>
     );
   }
   ```

**练习**：
1. 创建一个主题切换系统（亮色/暗色），使用 Context 传递主题
2. 创建一个多语言系统，使用 Context 传递当前语言
3. 将 Context + Store 结合，实现一个全局购物车状态

---

### 第11天：组件生命周期

**学习目标**：深入理解 Solid 组件的生命周期

**官方文档**：
- [onMount API](https://docs.solidjs.com/reference/lifecycle/on-mount) — onMount 参考
- [onCleanup API](https://docs.solidjs.com/reference/lifecycle/on-cleanup) — onCleanup 参考

**核心知识点**：

1. **Solid 生命周期的独特之处**
   - 没有 `constructor`、`componentDidMount`、`componentDidUpdate` 等
   - 组件函数本身就是"构造函数"（只执行一次）
   - 响应式系统替代了传统的生命周期方法

2. **onMount**
   ```tsx
   onMount(() => {
     // 组件首次渲染后执行，只执行一次
     // 不追踪依赖
     // 此时 ref 已经赋值
     // 不会在 SSR 中运行
   });
   ```

3. **onCleanup**
   ```tsx
   onCleanup(() => {
     // 组件卸载时执行
     // Effect 重新执行前也会调用
   });
   ```

4. **createRenderEffect**
   ```tsx
   import { createRenderEffect } from "solid-js";

   createRenderEffect(() => {
     // 渲染阶段同步执行（不同于 createEffect 的延迟执行）
     // 适合需要同步访问 DOM 的场景
   });
   ```

5. **执行顺序**
   ```
   组件函数体 → createRenderEffect → DOM 连接 → onMount → createEffect
   ```

**练习**：
1. 使用 `onMount` 在组件挂载后获取 DOM 元素的尺寸
2. 使用 `onCleanup` 清理事件监听器
3. 对比 `createEffect` 和 `createRenderEffect` 的执行时机

---

### 第13天：状态管理模式

**学习目标**：掌握 Solid 中的状态管理最佳实践

**官方文档**：
- [State Management](https://docs.solidjs.com/guides/state-management) — 状态管理指南

**核心知识点**：

1. **状态管理三要素**
   - **State（状态）**：数据的来源
   - **View（视图）**：状态的可视化表示
   - **Actions（动作）**：修改状态的事件

2. **单向数据流**
   ```
   Actions → State → View
   ```

3. **派生状态**
   ```tsx
   // 使用 createMemo 派生
   const doubleCount = createMemo(() => count() * 2);

   // 或直接在 JSX 中计算（简单计算无需 Memo）
   return <div>{count() * 2}</div>;
   ```

4. **使用 Effect 同步状态**
   ```tsx
   createEffect(() => {
     setDoubleCount(count() * 2); // 不推荐！
   });
   ```
   - **不推荐**在 Effect 中设置信号，可能导致无限循环
   - 优先使用 `createMemo` 计算派生值

5. **状态管理策略选择**
   - 局部状态：`createSignal`
   - 复杂对象：`createStore`
   - 跨组件共享：Context + Store
   - 全局状态：独立模块导出 Signal/Store

**练习**：
1. 实现一个完整的购物车状态管理（商品列表、数量、总价）
2. 使用 Context + Store 实现全局用户状态
3. 重构：将 Effect 中的信号设置改为 Memo

---

## 阶段四：控制流与列表渲染（第14-16天）

### 第14天：条件渲染

**学习目标**：掌握 Solid 的条件渲染方式

**官方文档**：
- [Conditional Rendering](https://docs.solidjs.com/concepts/control-flow/conditional-rendering) — 条件渲染

**核心知识点**：

1. **`<Show>` 组件**
   ```tsx
   import { Show } from "solid-js";

   <Show when={isLoggedIn()} fallback={<LoginButton />}>
     <UserProfile />
   </Show>
   ```
   - `when` 为真时渲染子元素
   - `fallback` 为假时渲染（可选）

2. **`<Show>` 的函数子元素**
   ```tsx
   <Show when={user()}>
     {(user) => <div>{user().name}</div>}
   </Show>
   ```
   - 函数子元素接收 `when` 的值（通过 Accessor）

3. **`<Show>` 的 `keyed` 属性**
   ```tsx
   <Show when={user()} keyed>
     {(user) => <div>{user.name}</div>}  {/* 直接访问，不需要调用 */}
   </Show>
   ```
   - `keyed={true}`：`when` 值变化时重新创建子元素
   - `keyed={false}`（默认）：只在真假切换时更新

4. **`<Switch>` / `<Match>`**
   ```tsx
   import { Switch, Match } from "solid-js";

   <Switch fallback={<p>Unknown</p>}>
     <Match when={status() === "loading"}>
       <p>Loading...</p>
     </Match>
     <Match when={status() === "error"}>
       <p>Error!</p>
     </Match>
     <Match when={status() === "success"}>
       <p>Success!</p>
     </Match>
   </Switch>
   ```
   - 类似 JavaScript 的 `switch/case`
   - 按顺序评估，第一个匹配的 `<Match>` 渲染

**练习**：
1. 实现一个登录/登出切换界面
2. 使用 `<Switch>/<Match>` 实现一个交通信号灯组件
3. 对比 `<Show>` 和三元表达式 `{condition ? <A /> : <B />}` 的区别

---

### 第15天：列表渲染

**学习目标**：掌握 For 和 Index 的使用场景

**官方文档**：
- [List Rendering](https://docs.solidjs.com/concepts/control-flow/list-rendering) — 列表渲染
- [For API](https://docs.solidjs.com/reference/components/for) — For 参考
- [Index API](https://docs.solidjs.com/reference/components/index-component) — Index 参考

**核心知识点**：

1. **`<For>` — 按 key 渲染列表**
   ```tsx
   import { For } from "solid-js";

   <For each={items()}>
     {(item, index) => (
       <li>
         {item.name} (#{index()})
       </li>
     )}
   </For>
   ```
   - 按值标识（value identity）映射
   - `item` 是直接值，`index` 是 Accessor
   - 列表重排时移动 DOM 节点而非重新创建
   - **适合**：对象数组，列表顺序/长度可能变化

2. **`<Index>` — 按索引渲染列表**
   ```tsx
   import { Index } from "solid-js";

   <Index each={items()}>
     {(item, index) => (
       <li>
         {item().name} (#{index})
       </li>
     )}
   </Index>
   ```
   - 按索引映射
   - `item` 是 Accessor，`index` 是数字
   - 更新某索引的值时只更新对应 DOM
   - **适合**：原始值数组（字符串/数字），列表长度稳定但内容变化

3. **For vs Index 选择指南**
   | 场景 | 推荐 | 原因 |
   |------|------|------|
   | 对象数组，顺序可能变 | `<For>` | 按值标识，DOM 可复用 |
   | 字符串/数字数组 | `<Index>` | 按索引，更新更高效 |
   | 输入框列表 | `<Index>` | 避免重排时丢失焦点 |
   | 静态列表 | `<For>` | 简单直接 |

4. **fallback 属性**
   ```tsx
   <For each={items()} fallback={<p>No items</p>}>
     {(item) => <li>{item.name}</li>}
   </For>
   ```

**练习**：
1. 使用 `<For>` 渲染一个用户列表，支持添加和删除用户
2. 使用 `<Index>` 渲染一个可编辑的输入框列表
3. 对比 `<For>` 和 `<Index>` 在列表重排时的行为差异

---

### 第16天：Error Boundary 与 Dynamic

**学习目标**：掌握错误边界和动态组件

**官方文档**：
- [Error Boundary](https://docs.solidjs.com/concepts/control-flow/error-boundary) — 错误边界
- [Dynamic API](https://docs.solidjs.com/reference/components/dynamic) — Dynamic 参考

**核心知识点**：

1. **`<ErrorBoundary>`**
   ```tsx
   import { ErrorBoundary } from "solid-js";

   <ErrorBoundary
     fallback={(error, reset) => (
       <div>
         <p>出错了: {error.message}</p>
         <button onClick={reset}>重试</button>
       </div>
     )}
   >
     <ErrorProneComponent />
   </ErrorBoundary>
   ```
   - 捕获子组件渲染时的错误
   - 不捕获事件处理器或 setTimeout 中的错误
   - `reset` 函数可重新渲染子组件

2. **`<Dynamic>`**
   ```tsx
   import { Dynamic } from "solid-js/web";

   const components = {
     home: HomePage,
     about: AboutPage,
     contact: ContactPage,
   };

   <Dynamic component={components[currentPage()]} />
   ```
   - 动态选择要渲染的组件
   - 类似 Vue 的 `<component :is="...">`

3. **`<Portal>`**
   ```tsx
   import { Portal } from "solid-js/web";

   <Portal>
     <div class="modal">模态框内容</div>
   </Portal>
   ```
   - 将子元素渲染到 DOM 的其他位置（默认 `document.body`）
   - 事件仍然通过组件层级传播
   - 适合模态框、通知、工具提示等

**练习**：
1. 创建一个会抛出错误的组件，用 `<ErrorBoundary>` 捕获并显示错误信息
2. 使用 `<Dynamic>` 实现一个简单的页面切换
3. 使用 `<Portal>` 实现一个模态框

---

## 阶段五：异步数据与资源管理（第17-19天）

### 第17天：createResource 数据获取

**学习目标**：掌握异步数据获取

**官方文档**：
- [Fetching Data](https://docs.solidjs.com/guides/fetching-data) — 数据获取指南

**核心知识点**：

1. **基本用法**
   ```tsx
   import { createSignal, createResource } from "solid-js";

   const fetchUser = async (id) => {
     const response = await fetch(`/api/users/${id}`);
     return response.json();
   };

   function App() {
     const [userId, setUserId] = createSignal(1);
     const [user] = createResource(userId, fetchUser);

     return <div>{JSON.stringify(user())}</div>;
   }
   ```

2. **Resource 的状态属性**
   - `user()` — 获取当前数据
   - `user.loading` — 是否正在加载
   - `user.error` — 错误信息
   - `user.state` — 状态：`unresolved` | `pending` | `ready` | `refreshing` | `errored`
   - `user.latest` — 最新数据（即使正在重新加载）

3. **条件渲染数据状态**
   ```tsx
   <Show when={user.loading}>
     <p>Loading...</p>
   </Show>
   <Switch>
     <Match when={user.error}>
       <span>Error: {user.error}</span>
     </Match>
     <Match when={user()}>
       <div>{user().name}</div>
     </Match>
   </Switch>
   ```

4. **mutate 和 refetch**
   ```tsx
   const [user, { mutate, refetch }] = createResource(userId, fetchUser);

   // 立即更新本地数据（乐观更新）
   mutate({ name: "Updated Name" });

   // 重新获取数据
   refetch();
   ```

**练习**：
1. 使用 `createResource` 从公开 API 获取数据并展示
2. 实现乐观更新：修改数据后立即更新 UI，同时发送请求
3. 实现一个搜索功能，输入关键词时自动获取搜索结果

---

### 第18天：Suspense 悬停

**学习目标**：掌握 Suspense 协调异步状态

**官方文档**：
- [Fetching Data](https://docs.solidjs.com/guides/fetching-data) — Suspense 部分

**核心知识点**：

1. **`<Suspense>` 基本用法**
   ```tsx
   import { Suspense } from "solid-js";

   <Suspense fallback={<div>Loading...</div>}>
     <UserProfile />
     <UserPosts />
   </Suspense>
   ```
   - 等待所有异步操作完成后显示内容
   - 避免显示部分加载的内容

2. **嵌套 Suspense**
   ```tsx
   <Suspense fallback={<div>Loading all...</div>}>
     <Suspense fallback={<div>Loading profile...</div>}>
       <ProfileDetails />
     </Suspense>
     <Suspense fallback={<div>Loading posts...</div>}>
       <ProfileTimeline />
     </Suspense>
   </Suspense>
   ```
   - 每层 Suspense 独立管理加载状态
   - 只有最近的祖先 Suspense 切换到 fallback

3. **`<SuspenseList>`** ⚠️ 实验性功能
   ```tsx
   import { SuspenseList } from "solid-js";

   <SuspenseList revealOrder="forwards" tail="collapsed">
     <Suspense fallback={<h2>Loading profile...</h2>}>
       <ProfileDetails />
     </Suspense>
     <Suspense fallback={<h2>Loading posts...</h2>}>
       <ProfileTimeline />
     </Suspense>
   </SuspenseList>
   ```
   - `revealOrder`：`"forwards"` | `"backwards"` | `"together"`
   - `tail`：`"collapsed"` | `"hidden"`
   - ⚠️ **注意**：`SuspenseList` 目前为实验性功能，在 SSR hydration 场景下可能存在问题，生产环境慎用

**练习**：
1. 创建一个页面，使用 `<Suspense>` 等待多个数据源加载
2. 使用嵌套 `<Suspense>` 实现分区域加载
3. 使用 `<SuspenseList>` 控制加载内容的显示顺序

---

### 第19天：useTransition 过渡

**学习目标**：掌握过渡效果

**官方文档**：
- [useTransition API](https://docs.solidjs.com/reference/reactive-utilities/useTransition) — useTransition 参考

**核心知识点**：

1. **基本用法**
   ```tsx
   import { useTransition } from "solid-js";

   const [pending, start] = useTransition();

   // pending() — 是否有过渡正在进行
   // start(fn) — 启动过渡
   ```

2. **过渡与 Suspense 配合**
   ```tsx
   function Example() {
     const [userId, setUserId] = createSignal(1);
     const [user] = createResource(userId, fetchUser);
     const [pending, start] = useTransition();

     return (
       <>
         <button
           onClick={async () => {
             await start(() => setUserId(2));
           }}
         >
           Load next user
         </button>
         <div>{pending() ? "Loading transition..." : "Ready"}</div>
         <Suspense fallback={<p>Loading user...</p>}>
           <pre>{JSON.stringify(user(), null, 2)}</pre>
         </Suspense>
       </>
     );
   }
   ```

3. **过渡的特点**
   - 延迟提交更新，直到所有异步过程完成
   - 与 Suspense 集成
   - 适合页面切换等场景

**练习**：
1. 使用 `useTransition` 实现平滑的数据切换
2. 在过渡期间显示加载指示器

---

## 阶段六：高级响应式（第20-23天）

### 第20天：细粒度响应性原理

**学习目标**：深入理解响应式系统的工作原理

**官方文档**：
- [Fine-grained Reactivity](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity) — 细粒度响应性

**核心知识点**：

1. **观察者模式**
   - 信号（Signals）维护一个订阅者列表
   - 效果（Effects）是订阅者
   - 信号变化时通知所有订阅者

2. **从零构建响应式系统**
   ```tsx
   let currentSubscriber = null;

   function createSignal(initialValue) {
     let value = initialValue;
     const subscribers = new Set();

     function getter() {
       if (currentSubscriber) {
         subscribers.add(currentSubscriber);
       }
       return value;
     }

     function setter(newValue) {
       if (value === newValue) return;
       value = newValue;
       for (const subscriber of subscribers) {
         subscriber();
       }
     }

     return [getter, setter];
   }

   function createEffect(fn) {
     const previousSubscriber = currentSubscriber;
     currentSubscriber = fn;
     fn();
     currentSubscriber = previousSubscriber;
   }
   ```

3. **响应式系统的关键元素**
   - **Signals**：可变变量，持有当前值和未来值
   - **Effects**：信号变化时触发的函数
   - **Stores**：代理对象，底层创建/读写信号
   - **Memos**：类似 Effect 但返回信号，通过缓存优化计算
   - **Resources**：在 Memo 基础上，将异步转为同步
   - **Render Effects**：立即执行的 Effect，专为渲染设计

**练习**：
1. 手动实现一个简化版的 `createSignal` 和 `createEffect`
2. 添加批处理功能到你的响应式系统
3. 解释为什么 Solid 的细粒度更新比 React 的虚拟 DOM diff 更高效

---

### 第21天：batch、untrack、on

**学习目标**：掌握响应式工具函数

**官方文档**：
- [batch API](https://docs.solidjs.com/reference/reactive-utilities/batch) — batch 参考
- [untrack API](https://docs.solidjs.com/reference/reactive-utilities/untrack) — untrack 参考

**核心知识点**：

1. **batch — 批量更新**
   ```tsx
   import { batch } from "solid-js";

   // 不使用 batch：每次 setCount 都触发 Effect
   setCount(1);  // Effect 运行一次
   setTotal(5);  // Effect 再运行一次

   // 使用 batch：合并为一次更新
   batch(() => {
     setCount(1);
     setTotal(5);
   }); // Effect 只运行一次
   ```

2. **untrack — 忽略追踪**
   ```tsx
   import { untrack } from "solid-js";

   createEffect(() => {
     console.log(
       props.id,                    // 追踪
       untrack(() => props.label)   // 不追踪
     );
   });
   ```
   - 在 `untrack` 中读取信号不会建立依赖
   - 适合读取不需要响应式追踪的值

3. **on — 显式声明依赖**
   ```tsx
   import { on } from "solid-js";

   createEffect(on(count, (value) => {
     console.log("Count changed to:", value);
   }));
   ```
   - 明确指定 Effect 依赖哪些信号
   - 避免意外追踪

4. **on 的 `defer` 选项**
   ```tsx
   // 默认：Effect 创建时立即执行一次
   createEffect(on(count, (value) => {
     console.log("Count changed to:", value);
   }));

   // defer: true — 跳过首次执行，只在后续变化时运行
   createEffect(on(count, (value) => {
     console.log("Count changed to:", value);
   }, { defer: true }));
   ```
   - `defer` 适合只在值变化时才需要执行逻辑的场景

**练习**：
1. 使用 `batch` 优化多个信号同时更新时的性能
2. 使用 `untrack` 避免不必要的 Effect 重新执行
3. 使用 `on` 显式控制 Effect 的依赖

---

### 第22天：createRoot 与 createMutable

**学习目标**：掌握高级状态管理工具

**官方文档**：
- [createRoot API](https://docs.solidjs.com/reference/reactive-utilities/createRoot) — createRoot 参考
- [createMutable API](https://docs.solidjs.com/reference/store-utilities/create-mutable) — createMutable 参考

**核心知识点**：

1. **createRoot — 创建独立响应式上下文**
   ```tsx
   import { createRoot } from "solid-js";

   const counter = createRoot((dispose) => {
     const [count, setCount] = createSignal(0);
     onCleanup(() => console.log("Disposed!"));
     return {
       count,
       increment: () => setCount(c => c + 1),
       dispose,
     };
   });
   ```
   - 创建独立的响应式上下文，需要手动释放
   - 适合在组件外创建响应式状态
   - 防止内存泄漏

2. **createMutable — 可变 Store**
   ```tsx
   import { createMutable } from "solid-js/store";

   const state = createMutable({
     someValue: 0,
     list: [],
   });

   // 直接修改！
   state.someValue = 5;
   state.list.push("item");
   ```
   - 不分离 getter 和 setter
   - 可直接修改属性
   - ⚠️ 可能破坏单向数据流，谨慎使用

3. **modifyMutable — 批量修改 Mutable**
   ```tsx
   import { modifyMutable, produce } from "solid-js/store";

   modifyMutable(state, produce((s) => {
     s.user.firstName = "Jane";
     s.user.lastName = "Doe";
   }));
   ```

**练习**：
1. 使用 `createRoot` 在组件外创建一个全局状态管理器
2. 使用 `createMutable` 创建一个可变状态，对比 `createStore` 的差异
3. 理解何时应该使用 `createStore` 而非 `createMutable`

---

### 第23天：produce 和 reconcile

**学习目标**：掌握 Store 的高级更新工具

**官方文档**：
- [Store Utilities](https://docs.solidjs.com/reference/store-utilities) — Store 工具函数

**核心知识点**：

1. **produce — 类似 Immer 的不可变更新**
   ```tsx
   import { produce } from "solid-js/store";

   setStore(produce((s) => {
     s.users.push({ id: 3, name: "New User" });
     s.userCount = s.users.length;
   }));
   ```
   - 在回调中可以"直接修改"状态
   - 实际上产生不可变更新

2. **reconcile — 智能对比更新**
   ```tsx
   import { reconcile } from "solid-js/store";

   setStore(reconcile(newData));
   ```
   - 将新数据与旧数据对比，只更新变化的部分
   - 适合从服务器获取完整数据后更新 Store

3. **unwrap — 获取原始数据**
   ```tsx
   import { unwrap } from "solid-js/store";

   const raw = unwrap(store);
   ```

**练习**：
1. 使用 `produce` 简化 Store 的复杂更新逻辑
2. 使用 `reconcile` 处理服务器返回的完整数据更新
3. 对比直接 `setStore` 和 `produce` 的写法差异

---

## 阶段七：DOM 操作与样式（第24-26天）

### 第24天：Refs 引用

**学习目标**：掌握 DOM 引用的各种方式

**官方文档**：
- [Refs](https://docs.solidjs.com/concepts/refs) — Refs 详解
- [ref API](https://docs.solidjs.com/reference/jsx-attributes/ref) — ref 参考

**核心知识点**：

1. **变量 Ref**
   ```tsx
   function Component() {
     let myElement!: HTMLParagraphElement;

     onMount(() => {
       console.log(myElement.clientWidth); // ref 已赋值
     });

     return <p ref={myElement}>My Element</p>;
   }
   ```
   - ref 在渲染时赋值，在 DOM 连接之前
   - 使用 `onMount` 或 `createEffect` 安全访问

2. **回调 Ref**
   ```tsx
   <p ref={(el) => {
     console.log(el); // 元素已创建但未连接到 DOM
   }}>My Element</p>
   ```

3. **转发 Ref**
   ```tsx
   // 父组件
   function Parent() {
     let canvasRef;
     return <Canvas ref={canvasRef} />;
   }

   // 子组件
   function Canvas(props) {
     return <canvas ref={props.ref} />;
   }
   ```

4. **Signal 作为 Ref**
   ```tsx
   const [element, setElement] = createSignal<HTMLDivElement>();

   <div ref={setElement}>Content</div>
   ```

**练习**：
1. 使用 ref 获取输入框元素并自动聚焦
2. 使用 ref 测量元素尺寸
3. 实现一个 Canvas 组件，通过 ref 暴露绘图方法

---

### 第25天：自定义指令

**学习目标**：掌握 use:* 自定义指令

**官方文档**：
- [use:* API](https://docs.solidjs.com/reference/jsx-attributes/use) — use:* 参考

**核心知识点**：

1. **创建指令**
   ```tsx
   function model(element, value) {
     const [field, setField] = value();
     const onInput = ({ currentTarget }) => setField(currentTarget.value);
     createRenderEffect(() => (element.value = field()));
     element.addEventListener("input", onInput);
     onCleanup(() => element.removeEventListener("input", onInput));
   }
   ```

2. **使用指令**
   ```tsx
   const [name, setName] = createSignal("");
   <input type="text" use:model={[name, setName]} />;
   ```

3. **TypeScript 类型扩展**
   ```tsx
   declare module "solid-js" {
     namespace JSX {
       interface Directives {
         model: [Accessor<string>, Setter<string>];
       }
     }
   }
   ```

4. **指令 vs Ref**
   - 指令是回调 ref 的语法糖
   - 指令提供更好的复用性
   - 指令只能用于原生元素，不能用于自定义组件

**练习**：
1. 创建一个 `use:clickOutside` 指令，点击元素外部时触发回调
2. 创建一个 `use:autosize` 指令，自动调整 textarea 高度
3. 创建一个 `use:tooltip` 指令，鼠标悬停显示提示

---

### 第26天：样式

**学习目标**：掌握 Solid 中的样式方案

**官方文档**：
- [Styling in Solid](https://docs.solidjs.com/guides/how-to-guides/styling-in-solid) — 样式指南

**核心知识点**：

1. **class 属性**
   ```tsx
   // 静态 class
   <div class="container">Content</div>

   // 动态 class（使用条件表达式）
   <div class={`box ${isActive() ? "active" : ""}`}>Content</div>

   // classList
   <div classList={{ active: isActive(), disabled: isDisabled() }}>
     Content
   </div>
   ```

2. **style 属性**
   ```tsx
   // 使用字符串
   <div style="color: red; font-size: 16px;">Content</div>

   // 使用对象（注意驼峰命名）
   <div style={{ color: "red", fontSize: "16px" }}>Content</div>

   // 动态样式
   <div style={{ color: theme() === "dark" ? "white" : "black" }}>Content</div>
   ```

3. **CSS 方案选择**
   - 传统 CSS / CSS Modules
   - SASS / LESS 预处理器
   - CSS-in-JS：Solid Styled Components、Solid Styled JSX
   - CSS 框架：Tailwind CSS、UnoCSS

**练习**：
1. 使用 `classList` 实现一个选项卡组件的样式切换
2. 使用动态 `style` 实现一个颜色选择器
3. 在项目中集成 Tailwind CSS 或 CSS Modules

---

## 阶段八：TypeScript 与工程化（第27-29天）

### 第27天：TypeScript 配置

**学习目标**：掌握 Solid + TypeScript 的配置

**官方文档**：
- [TypeScript](https://docs.solidjs.com/configuration/typescript) — TypeScript 配置

**核心知识点**：

1. **tsconfig.json 关键配置**
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "target": "ESNext",
       "module": "ESNext",
       "moduleResolution": "node",
       "jsx": "preserve",
       "jsxImportSource": "solid-js",
       "noEmit": true,
       "isolatedModules": true
     }
   }
   ```
   - `jsx: "preserve"` — 保留 JSX 原始形式（Solid 自己编译）
   - `jsxImportSource: "solid-js"` — 指定 JSX 类型来源

2. **混合 JSX 源**
   ```tsx
   /** @jsxImportSource solid-js */
   // 或
   /** @jsxImportSource react */
   ```

3. **Signal 类型**
   ```tsx
   const [count, setCount] = createSignal<number>(0);
   const [name, setName] = createSignal<string>(); // string | undefined

   import type { Signal, Accessor, Setter } from "solid-js";
   ```

4. **Component 类型**
   ```tsx
   import type { Component, JSX } from "solid-js";

   const MyComponent: Component<{ name: string }> = (props) => {
     return <div>{props.name}</div>;
   };
   ```

**练习**：
1. 为现有组件添加完整的 TypeScript 类型注解
2. 创建一个泛型组件
3. 为自定义指令添加类型声明

---

### 第28天：组件类型与 Props 类型

**学习目标**：精通 Solid 的 TypeScript 类型系统

**官方文档**：
- [TypeScript](https://docs.solidjs.com/configuration/typescript) — TypeScript 类型详解

**核心知识点**：

1. **Store 类型**
   ```tsx
   import { Store } from "solid-js/store";

   interface UserState {
     name: string;
     age: number;
   }

   const [store, setStore] = createStore<UserState>({
     name: "Alice",
     age: 25,
   });
   ```

2. **Event 类型**
   ```tsx
   <input onInput={(e: InputEvent & { currentTarget: HTMLInputElement }) => {
     setValue(e.currentTarget.value);
   }} />
   ```

3. **Ref 类型**
   ```tsx
   let myDiv!: HTMLDivElement;
   ```

4. **Props 类型最佳实践**
   ```tsx
   interface MyProps {
     name: string;
     age?: number;
     children?: JSX.Element;
   }

   function MyComponent(props: MyProps) {
     return <div>{props.name}</div>;
   }
   ```

**练习**：
1. 为一个复杂组件编写完整的 Props 类型
2. 使用泛型创建可复用的列表组件
3. 为 Store 添加嵌套类型定义

---

### 第29天：调试与开发工具

**学习目标**：掌握 Solid 的调试技巧

**核心知识点**：

1. **Solid DevTools**
   - 安装浏览器扩展
   - 查看组件树和信号值

2. **调试技巧**
   - 使用 `createEffect` 追踪信号变化
   - 使用 `name` 选项标识响应式原语
   - 使用 `console.log` 在 Effect 中观察依赖

3. **常见问题排查**
   - 信号不更新 → 检查是否在追踪范围内
   - 无限循环 → 检查 Effect 中是否设置了自身依赖的信号
   - Props 不更新 → 检查是否解构了 Props

**练习**：
1. 安装 Solid DevTools，检查组件的信号值
2. 故意创建一个无限循环的 Effect，理解原因并修复
3. 使用 `name` 选项为信号和 Effect 添加调试名称

---

## 阶段九：Solid Router（第30-32天）

### 第30天：路由基础

**学习目标**：掌握 Solid Router 的基本用法

**官方文档**：
- [Solid Router](https://docs.solidjs.com/solid-router) — 路由文档

**核心知识点**：

1. **安装路由**
   ```bash
   pnpm add @solidjs/router
   ```

2. **基本路由配置**
   ```tsx
   import { Router, Route } from "@solidjs/router";

   <Router>
     <Route path="/" component={Home} />
     <Route path="/about" component={About} />
     <Route path="/users/:id" component={User} />
   </Router>
   ```

3. **路由参数**
   ```tsx
   import { useParams } from "@solidjs/router";

   function User() {
     const params = useParams();
     return <div>User ID: {params.id}</div>;
   }
   ```

4. **导航**
   ```tsx
   import { useNavigate, A } from "@solidjs/router";

   // 声明式导航
   <A href="/about">About</A>

   // 编程式导航
   const navigate = useNavigate();
   navigate("/about");
   ```

**练习**：
1. 搭建一个多页面应用（首页、关于、联系）
2. 实现动态路由（如用户详情页 `/users/:id`）
3. 使用 `<A>` 组件实现导航栏

---

### 第31天：路由数据加载

**学习目标**：掌握路由数据加载和 query

**官方文档**：
- [Solid Router Data APIs](https://docs.solidjs.com/solid-router/data-fetching) — 数据获取
- [query API](https://docs.solidjs.com/solid-router/reference/data-apis/query) — query 参考
- [action API](https://docs.solidjs.com/solid-router/reference/data-apis/action) — action 参考

**核心知识点**：

1. **query — 声明式数据获取**
   ```tsx
   import { query, createAsync } from "@solidjs/router";

   const getUser = query(async (id: string) => {
     const res = await fetch(`/api/users/${id}`);
     return res.json();
   }, "user");

   function UserProfile() {
     const user = createAsync(() => getUser("1"));
     return <div>{user()?.name}</div>;
   }
   ```

2. **action — 数据变更**
   ```tsx
   import { action } from "@solidjs/router";

   const updateName = action(async (formData: FormData) => {
     const name = formData.get("name");
     await fetch("/api/update", { method: "POST", body: JSON.stringify({ name }) });
   }, "updateName");
   ```

3. **createAsync — 异步数据原语**
   ```tsx
   import { createAsync } from "@solidjs/router";

   const data = createAsync(() => fetchData());
   ```
   - 推荐的异步数据获取方式
   - 将在 Solid 2.0 中成为标准

**练习**：
1. 使用 `query` + `createAsync` 加载页面数据
2. 使用 `action` 处理表单提交
3. 实现数据缓存和重新验证

---

### 第32天：路由进阶

**学习目标**：掌握路由的高级功能

**核心知识点**：

1. **嵌套路由**
   ```tsx
   <Route path="/users" component={UsersLayout}>
     <Route path="/" component={UsersList} />
     <Route path="/:id" component={UserDetail} />
   </Route>
   ```

2. **路由守卫**
   - 使用 `preload` 预加载数据
   - 使用 `redirect` 重定向

3. **懒加载路由**
   ```tsx
   <Route path="/about" component={lazy(() => import("./About"))} />
   ```

**练习**：
1. 实现嵌套路由布局
2. 实现路由守卫（未登录时重定向）
3. 实现路由懒加载

---

## 阶段十：SolidStart 全栈框架（第33-36天）

### 第33天：SolidStart 入门

**学习目标**：了解 SolidStart 全栈框架

**官方文档**：
- [SolidStart](https://docs.solidjs.com/solid-start) — SolidStart 文档

**核心知识点**：

1. **SolidStart 是什么？**
   - Solid 的全栈框架
   - 基于 Solid Router
   - 支持 SSR、SSG、CSR
   - 文件系统路由

2. **创建 SolidStart 项目**
   ```bash
   pnpm create solid
   # 选择 SolidStart 项目
   ```

3. **项目结构**
   ```
   src/
   ├── entry-client.tsx    # 客户端入口
   ├── entry-server.tsx    # 服务端入口
   ├── app.tsx             # 应用根组件
   └── routes/             # 路由目录
       ├── index.tsx       # 首页
       └── about.tsx       # 关于页
   ```

**练习**：
1. 创建一个 SolidStart 项目
2. 理解项目结构和各入口文件的作用
3. 创建几个基本页面

---

### 第34天：文件系统路由

**学习目标**：掌握 SolidStart 的文件系统路由

**官方文档**：
- [Routing](https://docs.solidjs.com/solid-start/building-your-application/routing) — 路由详解

**核心知识点**：

1. **基本路由映射**
   ```
   routes/index.tsx          → /
   routes/blog.tsx           → /blog
   routes/blog/article.tsx   → /blog/article
   ```

2. **动态路由**
   ```
   routes/users/[id].tsx     → /users/:id
   ```

3. **嵌套布局**
   ```
   routes/blog.tsx           → 布局文件
   routes/blog/article.tsx   → 子路由
   ```

4. **路由分组**
   ```
   routes/users(details).tsx → 独立布局
   routes/users/[id].tsx     → 使用 details 布局
   ```

**练习**：
1. 创建一个博客应用的路由结构
2. 实现嵌套布局
3. 使用动态路由参数

---

### 第35天：Server Functions

**学习目标**：掌握服务端函数

**官方文档**：
- ["use server"](https://docs.solidjs.com/solid-start/reference/server/use-server) — use server 参考
- [Data Fetching](https://docs.solidjs.com/solid-start/building-your-application/data-fetching) — 数据获取
- [Data Mutation](https://docs.solidjs.com/solid-start/building-your-application/data-mutation) — 数据变更

**核心知识点**：

1. **函数级 "use server"**
   ```tsx
   const logHello = async (message: string) => {
     "use server";
     console.log(message); // 只在服务端执行
   };
   ```

2. **文件级 "use server"**
   ```tsx
   // 整个文件都是服务端函数
   "use server";

   export async function getUsers() {
     return db.users.findMany();
   }
   ```

3. **query + server function**
   ```tsx
   const getUser = query(async (id: string) => {
     "use server";
     return await db.users.get(id);
   }, "user");
   ```

4. **action + server function**
   ```tsx
   const updateProduct = action(async (id: string, formData: FormData) => {
     "use server";
     const name = formData.get("name")?.toString();
     await db.products.update(id, { name });
   }, "updateProduct");
   ```

5. **单次飞行变更（Single-flight Mutations）**
   - Action 更新数据后自动重新验证 query
   - 在同一个 HTTP 请求中完成

**练习**：
1. 创建一个服务端函数，从数据库读取数据
2. 使用 action 处理表单提交并更新数据
3. 实现乐观更新

---

### 第36天：SSR 与 Streaming

**学习目标**：掌握服务端渲染和流式传输

**官方文档**：
- [Streaming](https://docs.solidjs.com/solid-router/data-fetching/streaming) — 流式传输

**核心知识点**：

1. **SSR 模式**
   - `sync`：`renderToString`
   - `async`：`renderToStringAsync`
   - `stream`：`renderToStream`（默认）

2. **Streaming 工作原理**
   - 立即发送 HTML 骨架
   - 数据就绪后流式传输对应部分
   - 使用 `<Suspense>` 控制流式区域

3. **deferStream 选项**
   ```tsx
   const article = createAsync(() => getArticleQuery(), {
     deferStream: true, // 等待数据就绪后再发送 HTML
   });
   ```
   - 适合 SEO 关键内容

**练习**：
1. 配置不同的 SSR 模式，观察差异
2. 使用 `<Suspense>` 控制流式传输区域
3. 使用 `deferStream` 确保 SEO 关键内容在初始 HTML 中

---

## 阶段十一：综合实战项目（第37-41天）

### 实战项目：全栈待办事项应用

将前面学到的所有知识综合运用，构建一个完整的全栈应用：

**功能需求**：
1. 用户认证（登录/注册）
2. 待办事项 CRUD
3. 分类管理
4. 搜索和过滤
5. 主题切换（亮色/暗色）
6. 响应式布局

**技术要点**：
- `createSignal` + `createStore` 管理状态
- `createResource` / `createAsync` 获取数据
- `<For>` / `<Show>` / `<Switch>` 控制流
- Context 管理全局状态（主题、用户）
- `createMemo` 计算派生数据
- `onMount` / `onCleanup` 管理副作用
- ErrorBoundary 处理错误
- Suspense 处理加载状态
- Solid Router 管理页面
- Server Functions 处理数据
- TypeScript 类型安全

**进阶挑战**：
1. 添加拖拽排序功能
2. 实现离线模式（LocalStorage 备份）
3. 添加动画过渡效果
4. 实现无限滚动列表
5. 添加国际化支持

---

## 附录：核心 API 速查表

### 响应式原语

| API | 用途 | 返回值 |
|-----|------|--------|
| `createSignal(initial)` | 创建响应式状态 | `[getter, setter]` |
| `createEffect(fn)` | 创建副作用 | `void` |
| `createMemo(fn)` | 创建派生值 | `getter` |
| `createResource(source, fetcher)` | 创建异步资源 | `[data, { mutate, refetch }]` |

### 状态管理

| API | 用途 | 返回值 |
|-----|------|--------|
| `createStore(initial)` | 创建细粒度 Store | `[store, setStore]` |
| `createMutable(initial)` | 创建可变 Store | `mutable store` |
| `produce(fn)` | Immer 风格更新 | modifier |
| `reconcile(data)` | 智能对比更新 | modifier |

### 组件 API

| API | 用途 |
|-----|------|
| `createContext(default)` | 创建上下文 |
| `useContext(context)` | 消费上下文 |
| `children(fn)` | 安全获取子组件 |
| `mergeProps(...props)` | 合并 Props |
| `splitProps(props, ...keys)` | 拆分 Props |

### 生命周期

| API | 用途 | 执行时机 |
|-----|------|----------|
| `onMount(fn)` | 挂载后执行一次 | 首次渲染后 |
| `onCleanup(fn)` | 清理副作用 | 卸载/重新执行前 |
| `createRenderEffect(fn)` | 渲染阶段 Effect | 同步执行 |

### 控制流组件

| 组件 | 用途 |
|------|------|
| `<Show when={}>` | 条件渲染 |
| `<Switch>/<Match>` | 多条件渲染 |
| `<For each={}>` | Keyed 列表渲染 |
| `<Index each={}>` | Index 列表渲染 |
| `<ErrorBoundary>` | 错误捕获 |
| `<Suspense>` | 异步加载边界 |
| `<Dynamic component={}>` | 动态组件 |
| `<Portal>` | 传送门 |

### 工具函数

| API | 用途 |
|-----|------|
| `batch(fn)` | 批量更新 |
| `untrack(fn)` | 忽略追踪 |
| `on(source, fn)` | 显式依赖 |
| `useTransition()` | 过渡效果 |
| `createRoot(fn)` | 独立响应式上下文 |

---

## 附录：与 React 的关键差异

### 心智模型

| 概念 | React | SolidJS |
|------|-------|---------|
| 组件函数 | 每次渲染都执行 | **只执行一次** |
| 状态读取 | `count`（变量） | `count()`（函数调用） |
| 状态更新 | `setCount(1)` | `setCount(1)` |
| 副作用 | `useEffect(() => {}, [deps])` | `createEffect(() => {})`（自动追踪） |
| 派生值 | 直接计算或 `useMemo` | `createMemo(() => ...)` |
| Ref | `useRef` / `useRef` | `let ref` + `ref={ref}` |
| Context | `useContext` | `useContext`（相同） |
| 条件渲染 | `&&` 或三元 | `<Show>` 或三元 |
| 列表渲染 | `.map()` | `<For>` 或 `<Index>` |
| 错误边界 | 类组件 `componentDidCatch` | `<ErrorBoundary>` |
| Props 解构 | ✅ 可以 | ❌ **不能**（破坏响应性） |
| Hooks 规则 | 顶层调用、顺序固定 | 无限制，但需在响应式作用域 |
| 虚拟 DOM | 有 | **无** |
| 更新粒度 | 组件级 | **DOM 节点级** |

### 常见陷阱

1. **解构 Props**：`const { name } = props` 会丢失响应性
2. **在组件体中读取信号**：只在初始化时执行一次，不会响应变化
3. **在 Effect 中设置信号**：可能导致无限循环
4. **忘记调用信号**：`count` 是函数，`count()` 才是值
5. **使用 `.map()` 替代 `<For>`**：`.map()` 每次都重新创建所有元素

---

## 附录：与 Vue 的关键差异

| 概念 | Vue 3 | SolidJS |
|------|-------|---------|
| 响应式原理 | Proxy 拦截（ref/reactive） | Signal 函数调用追踪 |
| 状态读取 | `count.value` 或自动解包 | `count()`（必须调用函数） |
| 组件执行 | 响应式更新时重新执行渲染函数 | **只执行一次** |
| 虚拟 DOM | 有（优化后的更新策略） | **无**，直接操作真实 DOM |
| Props | 可解构（响应式 Proxy） | ❌ **不能解构**（破坏响应性） |
| 计算属性 | `computed(() => ...)` | `createMemo(() => ...)` |
| 副作用 | `watch` / `watchEffect` | `createEffect` |
| 条件渲染 | `v-if` / `v-show` | `<Show>` / 三元表达式 |
| 列表渲染 | `v-for` | `<For>` / `<Index>` |
| 模板 vs JSX | SFC 模板 | JSX |
| 组合式 API | `setup()` 函数 | 组件函数本身就是 setup |
| Store | Pinia / Vuex | `createStore` / Context |
| 生命周期 | `onMounted` / `onUnmounted` | `onMount` / `onCleanup` |
| 事件绑定 | `@click` | `onClick`（委托） / `onclick`（直接） |
| 样式作用域 | `<style scoped>` | CSS Modules / 其他方案 |

### Vue 转 Solid 的常见误区

1. **自动解包**：Vue 中 ref 在模板中自动解包，Solid 中必须 `count()`
2. **响应式对象**：Vue 的 `reactive()` 返回 Proxy 对象，Solid 的 `createStore` 返回的是普通对象（但被 Proxy 包装）
3. **v-model**：Vue 的 `v-model` 是语法糖，Solid 需要手动实现双向绑定或使用自定义指令
4. **Watch vs Effect**：Vue 的 `watch` 默认懒执行，Solid 的 `createEffect` 立即执行一次

---

## 附录：性能优化专题

### 1. 避免过度使用 createMemo

```tsx
// ❌ 不需要 Memo — 简单计算直接写在 JSX 中
const double = createMemo(() => count() * 2);
return <div>{double()}</div>;

// ✅ 直接计算即可
return <div>{count() * 2}</div>;
```

**何时使用 Memo**：
- 计算开销较大（如过滤大数组、复杂排序）
- 派生值被多处使用
- 需要引用稳定性（传给子组件作为 props）

### 2. 使用 untrack 避免不必要的追踪

```tsx
createEffect(() => {
  // 只追踪 count，不追踪 debugLabel
  console.log(untrack(() => debugLabel()));
  doSomething(count());
});
```

### 3. 使用 batch 合并更新

```tsx
// ❌ 每次 set 都触发 Effect
setFirstName("Alice");
setLastName("Smith");

// ✅ 合并为一次更新
batch(() => {
  setFirstName("Alice");
  setLastName("Smith");
});
```

### 4. 列表渲染优化

```tsx
// 对象数组用 <For>（按 key 复用 DOM）
<For each={users()}>{(user) => <UserCard user={user} />}</For>

// 原始值数组或输入框列表用 <Index>（避免重排丢失焦点）
<Index each={values()}>{(value) => <input value={value()} />}</Index>
```

### 5. 懒加载组件

```tsx
import { lazy } from "solid-js";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

// 配合 Suspense 使用
<Suspense fallback={<p>Loading...</p>}>
  <HeavyComponent />
</Suspense>
```

### 6. 虚拟列表

对于大数据量列表（1000+ 项），使用虚拟滚动库如 `@tanstack/solid-virtual`：

```tsx
import { createVirtualizer } from "@tanstack/solid-virtual";

const virtualizer = createVirtualizer({
  count: items().length,
  getScrollElement: () => scrollRef,
  estimateSize: () => 40,
});
```

### 7. 减少不必要的 DOM 操作

```tsx
// ❌ 每次都创建新对象
<div style={{ color: theme() === "dark" ? "white" : "black" }}>

// ✅ 使用 classList 切换类名（更高效）
<div classList={{ dark: theme() === "dark" }}>
```

---

## 附录：SolidJS 2.0 展望

> ⚠️ 以下内容基于 SolidJS 2.0 Beta，API 可能发生变化

SolidJS 2.0 是一次重大更新，核心改进在于**异步处理**的彻底重构。

### 核心变更

1. **`<Loading>` 替代 `<Suspense>` 的初始加载场景**
   - `<Suspense>` 专注于并发模式下的过渡
   - `<Loading>` 专注于首次加载的 fallback 展示
   - 更清晰的语义分离

2. **`isPending()` 表达式**
   ```tsx
   // 2.0 新 API
   const pending = isPending(() => someAsyncWork());
   // pending 是一个表达式，不是简单的布尔标志
   ```

3. **`createOptimistic` 和 `createOptimisticStore`**
   - 内置的乐观更新原语
   - 自动处理回滚逻辑

4. **异步计算作为一等公民**
   - 计算函数可以返回 Promise
   - 响应式图知道如何挂起/恢复工作

5. **Action 系统增强**
   - `action()` + 乐观原语的深度集成
   - 单次飞行变更（Single-flight Mutations）更加完善

### 迁移建议

- 1.x 的核心 API（createSignal、createEffect、createMemo、createStore 等）在 2.0 中保持不变
- `<Suspense>` 仍然可用，但语义更精确
- 建议关注 [SolidJS 2.0 Discussion](https://github.com/solidjs/solid/discussions/2596) 了解最新进展

---

## 附录：测试 SolidJS 应用

### 安装测试工具

```bash
pnpm add -D vitest @solidjs/testing-library jsdom
```

### 配置 vitest

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
});
```

### 组件测试示例

```tsx
import { render, fireEvent } from "@solidjs/testing-library";
import Counter from "./Counter";

test("counter increments", async () => {
  const { getByText } = render(() => <Counter />);
  const button = getByText("Count: 0");
  fireEvent.click(button);
  expect(getByText("Count: 1")).toBeInTheDocument();
});
```

### Signal 测试

```tsx
import { createRoot, createSignal } from "solid-js";

test("signal updates correctly", () => {
  createRoot((dispose) => {
    const [count, setCount] = createSignal(0);
    expect(count()).toBe(0);
    setCount(5);
    expect(count()).toBe(5);
    dispose();
  });
});
```

### Effect 测试

```tsx
import { createRoot, createSignal, createEffect } from "solid-js";

test("effect runs on signal change", () => {
  const effects: number[] = [];
  createRoot((dispose) => {
    const [count, setCount] = createSignal(0);
    createEffect(() => effects.push(count()));
    expect(effects).toEqual([0]); // 初始执行
    setCount(1);
    expect(effects).toEqual([0, 1]); // 变化后执行
    dispose();
  });
});
```

> 💡 **提示**：测试响应式逻辑时，务必在 `createRoot` 中运行，并在测试结束后 `dispose()` 防止内存泄漏。

---

## 附录：推荐学习资源

### 官方资源

- [SolidJS 官方文档](https://docs.solidjs.com/) — 最权威的学习来源
- [SolidJS 官方示例](https://docs.solidjs.com/quick-start) — 交互式 Playground
- [SolidJS GitHub](https://github.com/solidjs/solid) — 源码和 Issue
- [SolidJS Discord](https://discord.com/invite/solidjs) — 社区交流

### 学习路径建议

1. **第一遍**：快速浏览本教程，了解整体框架
2. **第二遍**：按章节逐一学习，完成每个练习
3. **第三遍**：做综合实战项目，查漏补缺
4. **持续**：阅读官方文档的 Reference 部分，深入 API 细节

### 学习技巧

- 每学一个概念，立即在项目中动手实验
- 遇到问题先查官方文档，再查 GitHub Issue
- 尝试用 Solid 重写之前用其他框架做过的项目
- 关注 SolidJS 的更新日志，了解新特性

---

> 💡 **记住**：成为大师的关键不是学完所有 API，而是深入理解**响应式系统**的工作原理。
> Solid 的核心就是细粒度响应性，理解了这一点，其他一切都水到渠成。

> 🎯 **目标**：学完本教程后，你应该能够：
> 1. 独立构建完整的 SolidJS 应用
> 2. 理解响应式系统的工作原理
> 3. 选择合适的状态管理策略
> 4. 优化应用性能
> 5. 使用 SolidStart 构建全栈应用
> 6. 排查和解决常见问题
