# Svelte 大师之路 — 完整自学教程

> 从零基础到 Svelte 大师的系统化学习路径，基于 Svelte 5 + TypeScript + Vite

---

## 项目环境

- **Svelte**: v5.53+ (Rune 系统)
- **TypeScript**: v5.9+
- **Vite**: v8+
- **SvelteKit**: v2.55+ (阶段四启用)
- **Skeleton UI**: v4.13+ (模块15启用)

### 启动开发服务器

```bash
pnpm dev
```

### 类型检查

```bash
pnpm check
```

### 构建项目

```bash
pnpm build
```

---

## 如何使用本教程

1. **按顺序学习** — 模块之间有依赖关系，不要跳过
2. **每个模块先读理论** — 理解原理后再看练习文件
3. **动手修改练习文件** — 在 `src/exercises/` 中找到对应模块的组件
4. **在 App.svelte 中引入练习** — 修改 `src/App.svelte` 导入当前学习的组件
5. **完成挑战任务** — 每个模块末尾有挑战，独立完成才算掌握
6. **参考官方文档** — 每个模块都附有官方文档链接，遇到问题先查文档

### 切换练习模块

启动开发服务器后，在浏览器中通过左侧导航栏切换不同模块的练习组件。也可以直接编辑 `src/App.svelte` 修改 `activeModuleId` 的默认值：

```svelte
<script>
  // 修改默认显示的模块
  let activeModuleId = $state('01')  // '01' ~ '11'
</script>
```

---

## 学习路线图

```
入门 → 模块1~4 (Svelte 基础)
  ↓
进阶 → 模块5~7 (响应式深入)
  ↓
高级 → 模块8~11 (高级特性)
  ↓
全栈 → 模块12~14 (SvelteKit)
  ↓
大师 → 模块15~18 (工程化 + 毕业项目)
```

---

## 阶段一：Svelte 5 基础奠基

---

### 模块 1：初识 Svelte — 编译型框架的哲学

**目标**: 理解 Svelte 的核心设计理念，能解释 Svelte 与其他框架的本质区别

#### 1.1 Svelte vs React/Vue：编译时 vs 运行时

| 特性 | React/Vue | Svelte |
|------|-----------|--------|
| 工作方式 | 运行时框架（浏览器中执行虚拟DOM diff） | 编译时框架（构建时生成原生DOM操作代码） |
| 包体积 | 需要框架运行时（React ~40KB, Vue ~33KB） | 无运行时（编译后只有业务代码） |
| 响应式 | 需要手动触发（setState/refs） | 编译器自动追踪依赖 |
| 性能 | 虚拟DOM diff 开销 | 精准DOM更新，无diff开销 |

**关键理解**: Svelte 不是在浏览器里"运行"的框架，而是一个**编译器**。你写的 `.svelte` 文件在构建时被转换成高效的 JavaScript 代码，直接操作 DOM。

#### 1.2 Svelte 5 Rune 系统

Svelte 5 引入了 **Rune**（符文）系统，替代了旧版的 `$:` 响应式声明：

```svelte
<!-- Svelte 4 (旧版) -->
<script>
  let count = 0;
  $: doubled = count * 2;  // 响应式声明
</script>

<!-- Svelte 5 (Rune) -->
<script>
  let count = $state(0);        // 响应式状态
  let doubled = $derived(count * 2);  // 派生状态
</script>
```

**为什么引入 Rune？**
- 旧版 `$:` 基于编译器魔法，不够显式
- Rune 让响应式意图更清晰
- 支持在 `.js/.ts` 文件中使用响应式
- 更好的 TypeScript 支持

**五大核心 Rune**:
| Rune | 用途 | 类比 |
|------|------|------|
| `$state()` | 声明响应式状态 | React 的 useState |
| `$derived()` | 声明派生计算值 | Vue 的 computed |
| `$effect()` | 声明副作用 | React 的 useEffect |
| `$props()` | 接收组件属性 | React 的 props 参数 |
| `$bindable()` | 声明可双向绑定的 prop | Vue 的 v-model prop |

#### 1.3 项目结构解析

```
svelte/
├── index.html          # 入口 HTML，挂载点 <div id="app">
├── src/
│   ├── main.ts         # 应用入口，mount(App, { target })
│   ├── App.svelte      # 根组件
│   ├── app.css         # 全局样式
│   ├── lib/            # 可复用组件库
│   │   └── Counter.svelte  # 示例计数器组件
│   └── exercises/      # 教程练习文件
├── public/             # 静态资源
├── svelte.config.js    # Svelte 配置
├── vite.config.ts      # Vite 构建配置
└── package.json        # 依赖管理
```

#### 1.4 Svelte 组件结构

每个 `.svelte` 文件由三部分组成：

```svelte
<script lang="ts">
  // 逻辑层：状态、函数、导入
</script>

<!-- 模板层：HTML 标记 -->
<div>...</div>

<style>
  /* 样式层：自动作用域隔离 */
</style>
```

**练习文件**: `src/exercises/module-01-svelte-philosophy/CounterExplore.svelte`

#### 挑战任务

1. 修改 CounterExplore 组件，添加一个 `step` 变量控制每次增减的步长
2. 添加一个 `min` 和 `max` 限制，让计数器不能超出范围
3. 用 `$derived` 创建一个 `isEven` 变量，显示当前数值是否为偶数

#### 官方文档

- [Svelte 概览](https://svelte.dev/docs/svelte/overview)
- [Runes](https://svelte.dev/docs/svelte/what-are-runes)

---

### 模块 2：模板语法 — 声明式 UI 的艺术

**目标**: 掌握 Svelte 所有模板语法，能灵活组合构建复杂 UI

#### 2.1 插值与表达式

```svelte
<p>{name}</p>                          <!-- 变量插值 -->
<p>{count * 2}</p>                     <!-- 表达式 -->
<p>{count > 0 ? '正' : '非正'}</p>      <!-- 三元表达式 -->
<img src={imageUrl} alt={desc} />       <!-- 属性绑定 -->
<button disabled={!canClick}>点击</button> <!-- 动态属性 -->
```

**属性简写**: 当属性名与变量名相同时，可简写

```svelte
<script>
  let src = '/image.png';
  let alt = '描述';
</script>

<!-- 完整写法 -->
<img src={src} alt={alt} />
<!-- 简写 -->
<img {src} {alt} />
```

#### 2.2 条件渲染

```svelte
{#if count > 10}
  <p>数值很高！</p>
{:else if count > 0}
  <p>正数</p>
{:else}
  <p>零或负数</p>
{/if}
```

**注意**: 条件块会完全销毁/重建 DOM，如果只是隐藏/显示，考虑用 CSS `display` 代替。

#### 2.3 列表渲染

```svelte
<!-- 基础用法 -->
{#each items as item}
  <p>{item.name}</p>
{/each}

<!-- 带索引 -->
{#each items as item, i}
  <p>{i}: {item.name}</p>
{/each}

<!-- 带 key（推荐！优化列表更新性能） -->
{#each items as item (item.id)}
  <p>{item.name}</p>
{/each}

<!-- else 块（列表为空时显示） -->
{#each items as item (item.id)}
  <p>{item.name}</p>
{:else}
  <p>暂无数据</p>
{/each}
```

#### 2.4 异步块

```svelte
{#await fetchData()}
  <p>加载中...</p>
{:then data}
  <p>数据: {data.name}</p>
{:catch error}
  <p>错误: {error.message}</p>
{/await}

<!-- 也可以直接等待 Promise -->
{#await fetchData() then data}
  <p>{data.name}</p>
{/await}
```

#### 2.5 HTML 注入

```svelte
{@html rawHtmlString}
```

**安全警告**: `{@html}` 不会转义 HTML，存在 XSS 风险。只用于可信内容，永远不要直接注入用户输入！

#### 2.6 常用特殊标签

```svelte
{@debug variableName}  <!-- 控制台输出调试 -->
{@const x = computed}  <!-- 模板内常量 -->
```

**练习文件**: `src/exercises/module-02-template-syntax/TodoList.svelte`

#### 挑战任务

1. 为 TodoList 添加一个「编辑」功能，双击任务文本可以编辑
2. 添加 `{#await}` 块，模拟从 API 加载初始数据（用 setTimeout 模拟延迟）
3. 使用 `{@debug}` 在控制台输出 filter 变化

#### 官方文档

- [模板语法](https://svelte.dev/docs/svelte/basic-markup)
- [if/each/await](https://svelte.dev/docs/svelte/if)
- [{@html}](https://svelte.dev/docs/svelte/@html)

---

### 模块 3：事件处理与双向绑定

**目标**: 熟练处理用户交互，掌握 Svelte 的事件系统和绑定机制

#### 3.1 事件监听

```svelte
<button onclick={handleClick}>点击</button>
<button onclick={() => count += 1}>+1</button>
<input oninput={(e) => text = e.currentTarget.value} />
```

**事件修饰符** (Svelte 5 中通过函数包装或直接在 handler 中处理):

```svelte
<!-- 阻止默认行为 -->
<form onsubmit={(e) => { e.preventDefault(); save() }}>

<!-- 只触发一次 -->
<button onclick={(e) => { handler(); e.target.disabled = true }}>一次性</button>
```

#### 3.2 双向绑定

```svelte
<!-- 文本输入 -->
<input bind:value={name} />
<textarea bind:value={content}></textarea>

<!-- 复选框 -->
<input type="checkbox" bind:checked={agreed} />

<!-- 单选框组 -->
<input type="radio" bind:group={selected} value="a" />
<input type="radio" bind:group={selected} value="b" />

<!-- 复选框组 -->
<input type="checkbox" bind:group={hobbies} value="编程" />
<input type="checkbox" bind:group={hobbies} value="音乐" />

<!-- 范围滑块 -->
<input type="range" bind:value={level} min="0" max="100" />

<!-- 选择框 -->
<select bind:value={selected}>
  <option value="a">A</option>
  <option value="b">B</option>
</select>
```

#### 3.3 DOM 元素绑定

```svelte
<script>
  let inputEl: HTMLInputElement;
</script>

<input bind:this={inputEl} />
<button onclick={() => inputEl.focus()}>聚焦</button>
```

#### 3.4 组件事件（Svelte 5 回调模式）

Svelte 5 不再使用 `createEventDispatcher`，而是通过**回调函数 props** 传递事件：

```svelte
<!-- Child.svelte -->
<script>
  let { onAction }: { onAction: (data: string) => void } = $props()
</script>
<button onclick={() => onAction('hello')}>触发</button>

<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte'
  function handleAction(data: string) {
    console.log(data) // 'hello'
  }
</script>
<Child onAction={handleAction} />
```

**练习文件**: `src/exercises/module-03-events-and-binding/RegistrationForm.svelte`

#### 挑战任务

1. 为注册表单添加「密码强度指示器」（弱/中/强，根据长度和字符类型判断）
2. 添加 `bind:this` 实现页面加载后自动聚焦到用户名输入框
3. 实现一个自定义的「确认密码匹配」实时验证提示

#### 官方文档

- [事件处理](https://svelte.dev/docs/svelte/dom-events)
- [绑定](https://svelte.dev/docs/svelte/bind)
- [组件事件](https://svelte.dev/docs/svelte/component-events)

---

### 模块 4：组件化思维 — Props 与组合

**目标**: 掌握组件拆分、Props 传递、Snippet 插槽等组合模式

#### 4.1 $props() Rune

```svelte
<script lang="ts">
  // 基础用法
  let { name, age }: { name: string; age: number } = $props()

  // 默认值
  let { title = '默认标题' }: { title?: string } = $props()

  // 剩余属性
  let { class: className, ...rest }: { class?: string; [key: string]: any } = $props()
</script>
```

#### 4.2 Snippet 与 {@render}（Svelte 5 新特性）

Svelte 5 用 `snippet` + `{@render}` 替代了旧版的 `<slot>`：

```svelte
<!-- Card.svelte -->
<script>
  let { header, children }: {
    header: Snippet
    children: Snippet
  } = $props()
</script>

<div class="card">
  <div class="header">{@render header()}</div>
  <div class="body">{@render children()}</div>
</div>

<!-- 使用 -->
<Card>
  {#snippet header()}
    <h1>标题</h1>
  {/snippet}
  <p>内容</p>
</Card>
```

**内联 snippet**:

```svelte
<FancyList {items}>
  {#snippet item(data)}
    <span>{data.name}</span>
  {/snippet}
</FancyList>
```

#### 4.3 组件设计原则

1. **单一职责**: 每个组件只做一件事
2. **Props 向下，事件向上**: 数据通过 props 下传，通过回调函数上传
3. **合理拆分**: 太大就拆，太小就合，以可复用性为判断标准
4. **类型安全**: 始终为 Props 定义 TypeScript 接口

**练习文件**: `src/exercises/module-04-components-and-props/` 目录下的三个组件

#### 挑战任务

1. 将 TodoList 进一步拆分：添加 `TodoFilter.svelte` 过滤组件
2. 使用 `snippet` + `{@render}` 为 `TodoItem` 添加可自定义的「操作按钮」插槽
3. 创建一个 `Card.svelte` 通用卡片组件，支持 `header`/`footer` snippet

#### 官方文档

- [$props](https://svelte.dev/docs/svelte/$props)
- [Snippet](https://svelte.dev/docs/svelte/snippet)
- [{@render}](https://svelte.dev/docs/svelte/@render)

---

## 阶段二：Svelte 5 响应式深入

---

### 模块 5：Rune 系统精通 ⭐ 最重要的模块

**目标**: 彻底掌握 Svelte 5 的核心响应式系统，理解每个 Rune 的适用场景

#### 5.1 $state — 细粒度响应式状态

```svelte
<script>
  // 原始值
  let count = $state(0)

  // 对象 — Svelte 5 自动深度代理
  let user = $state({ name: 'Alice', address: { city: '北京' } })
  user.name = 'Bob'        // 触发更新
  user.address.city = '上海' // 也触发更新！

  // 数组 — 同样自动代理
  let items = $state([1, 2, 3])
  items.push(4)            // 触发更新
  items[0] = 10            // 触发更新
</script>
```

**关键理解**: Svelte 5 的 `$state` 对象使用 Proxy 实现深度响应式，不需要像 React 那样创建新对象。

#### 5.2 $state.raw — 跳过深度响应式

```svelte
<script>
  // 不需要响应式的内部属性
  let element = $state.raw<HTMLElement>(undefined!)

  // 大型数据结构，不需要深度追踪
  let bigData = $state.raw(largeDataSet)
</script>
```

**适用场景**: DOM 引用、不需要触发更新的大型数据、性能优化。

#### 5.3 $derived — 派生状态

```svelte
<script>
  let items = $state([{ price: 10, qty: 2 }, { price: 20, qty: 1 }])

  // 简单表达式
  let total = $derived(items.reduce((sum, i) => sum + i.price * i.qty, 0))

  // 复杂逻辑用 $derived.by
  let stats = $derived.by(() => {
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const count = items.reduce((sum, i) => sum + i.qty, 0)
    return { total, count, average: count > 0 ? total / count : 0 }
  })
</script>
```

**重要**: `$derived` 是只读的，不能直接赋值。它会在依赖变化时自动重新计算。

#### 5.4 $effect — 副作用

```svelte
<script>
  let count = $state(0)

  // 基本用法：依赖自动追踪
  $effect(() => {
    console.log(`count 变为 ${count}`)
    // 返回清理函数
    return () => console.log('清理')
  })

  // $effect.pre — 在 DOM 更新前执行
  $effect.pre(() => {
    console.log('DOM 即将更新')
  })
</script>
```

**$effect 的规则**:
1. 在组件初始化时执行一次
2. 依赖变化时重新执行
3. 返回函数作为清理逻辑
4. 不要在 $effect 中修改它依赖的状态（避免无限循环）
5. 只在组件顶层调用，不要在条件/循环中调用

#### 5.5 $effect.tracking 与 $inspect

```svelte
<script>
  let value = $state(0)

  // 调试：检查当前是否在追踪响应式依赖
  console.log($effect.tracking()) // false（不在 effect 中）

  $effect(() => {
    console.log($effect.tracking()) // true
    console.log(value)
  })

  // $inspect — 开发调试
  $inspect(value) // value 变化时自动 console.log
</script>
```

#### 5.6 $bindable — 可双向绑定的 Prop

```svelte
<!-- CustomInput.svelte -->
<script>
  let { value = $bindable('') }: { value?: string } = $props()
</script>
<input bind:value />

<!-- 使用 -->
<CustomInput bind:value={name} />
```

**练习文件**: `src/exercises/module-05-rune-system/ShoppingCart.svelte`

#### 挑战任务

1. 为购物车添加 `$effect`，当总价超过 200 时自动应用 10% 折扣
2. 使用 `$state.snapshot` 实现购物车的「撤销」功能（保存历史快照）
3. 使用 `$inspect` 调试 `cart` 数组的变化

#### 官方文档

- [$state](https://svelte.dev/docs/svelte/$state)
- [$derived](https://svelte.dev/docs/svelte/$derived)
- [$effect](https://svelte.dev/docs/svelte/$effect)
- [$props](https://svelte.dev/docs/svelte/$props)
- [$bindable](https://svelte.dev/docs/svelte/$bindable)

---

### 模块 6：Store 与全局状态管理

**目标**: 理解 Svelte Store 机制，掌握 Context API，能设计全局状态架构

#### 6.1 Svelte Store 基础

```ts
import { writable, readable, derived } from 'svelte/store'

// writable — 可读写
const count = writable(0)
count.set(5)
count.update(n => n + 1)

// readable — 只读
const time = readable(new Date(), (set) => {
  const interval = setInterval(() => set(new Date()), 1000)
  return () => clearInterval(interval)
})

// derived — 派生
const double = derived(count, ($count) => $count * 2)
```

#### 6.2 Store 自动订阅

```svelte
<script>
  import { count } from './stores'
</script>

<!-- $ 前缀自动订阅/取消订阅 -->
<p>{$count}</p>
<button onclick={() => count.update(n => n + 1)}>+1</button>
```

#### 6.3 自定义 Store

```ts
function createCounter(initial = 0) {
  const { subscribe, set, update } = writable(initial)
  return {
    subscribe,
    increment: () => update(n => n + 1),
    decrement: () => update(n => n - 1),
    reset: () => set(initial),
  }
}
```

#### 6.4 Context API

```svelte
<!-- Parent.svelte -->
<script>
  import { setContext } from 'svelte'
  const theme = $state({ mode: 'dark' })
  setContext('theme', theme)
</script>

<!-- Child.svelte -->
<script>
  import { getContext } from 'svelte'
  const theme = getContext('theme')
</script>
```

**Rune vs Store 选择指南**:
| 场景 | 推荐 |
|------|------|
| 组件内部状态 | `$state` |
| 父子组件通信 | Props + 回调 |
| 跨层级共享 | Context + `$state` |
| 全局状态（简单） | Store |
| 全局状态（复杂） | Store + Context |

**练习文件**: `src/exercises/module-06-store-and-context/`

#### 挑战任务

1. 将模块 5 的购物车改写为 Store + Context 架构
2. 创建一个 `themeStore`，实现深色/浅色主题切换
3. 创建一个自定义 Store `createAsyncStore`，封装异步数据加载逻辑（loading/error/data）

#### 官方文档

- [Store](https://svelte.dev/docs/svelte/stores)
- [Context](https://svelte.dev/docs/svelte/context)

---

### 模块 7：生命周期与副作用模式

**目标**: 掌握 Svelte 组件生命周期，能用 $effect 优雅处理副作用

#### 7.1 生命周期函数

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    console.log('组件挂载')
    // 返回清理函数等同于 onDestroy
    return () => console.log('组件销毁')
  })

  onDestroy(() => {
    console.log('组件销毁')
  })
</script>
```

#### 7.2 $effect 替代生命周期的模式

```svelte
<script>
  // 等同于 onMount
  $effect(() => {
    console.log('组件挂载后执行')
  })

  // 等同于 watch
  let userId = $state(1)
  $effect(() => {
    fetchUserData(userId) // userId 变化时自动重新获取
  })

  // 清理模式
  $effect(() => {
    const controller = new AbortController()
    fetch(`/api/user/${userId}`, { signal: controller.signal })
    return () => controller.abort() // 清理：取消请求
  })
</script>
```

#### 7.3 常见副作用模式

```svelte
<script>
  // 定时器
  $effect(() => {
    const timer = setInterval(() => tick(), 1000)
    return () => clearInterval(timer)
  })

  // 事件监听
  $effect(() => {
    const handler = (e: MouseEvent) => { x = e.clientX }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  })

  // localStorage 同步
  $effect(() => {
    localStorage.setItem('key', JSON.stringify(data))
  })
</script>
```

**练习文件**: `src/exercises/module-07-lifecycle-and-effects/LiveSearch.svelte`

#### 挑战任务

1. 为 LiveSearch 添加请求缓存（相同查询 5 秒内不重复请求）
2. 实现一个 `useMousePosition` 效果，追踪鼠标位置
3. 实现一个 `useOnlineStatus` 效果，检测网络连接状态

#### 官方文档

- [生命周期](https://svelte.dev/docs/svelte/lifecycle)
- [$effect](https://svelte.dev/docs/svelte/$effect)

---

## 阶段三：Svelte 高级特性

---

### 模块 8：过渡与动画

**目标**: 掌握 Svelte 内置过渡/动画系统，能创建流畅的交互体验

#### 8.1 内置过渡

```svelte
<script>
  import { fade, fly, slide, blur, scale, draw, crossfade } from 'svelte/transition'
</script>

{#if visible}
  <div transition:fade={{ duration: 300 }}>淡入淡出</div>
{/if}

<!-- 进出分离 -->
{#if visible}
  <div
    in:fly={{ x: 200, duration: 400 }}
    out:fade={{ duration: 200 }}
  >飞入淡出</div>
{/if}
```

#### 8.2 缓动函数

```svelte
<script>
  import { elasticOut, bounceOut } from 'svelte/easing'
</script>

<div transition:fly={{ duration: 600, easing: elasticOut }}>
  弹性效果
</div>
```

#### 8.3 flip 动画

```svelte
<script>
  import { flip } from 'svelte/animate'
</script>

{#each items as item (item.id)}
  <li animate:flip={{ duration: 200 }}>
    {item.text}
  </li>
{/each}
```

#### 8.4 Motion：tweened / spring

```svelte
<script>
  import { tweened, spring } from 'svelte/motion'

  let progress = tweened(0, { duration: 400 })
  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.5 })
</script>

<progress value={$progress}></progress>
<div style="transform: translate({$coords.x}px, {$coords.y}px)"></div>
```

**练习文件**: `src/exercises/module-08-transitions-and-animations/TransitionDemo.svelte`

#### 挑战任务

1. 实现一个「卡片翻转」效果（正面/背面切换）
2. 使用 `crossfade` 实现两个列表之间的项目移动动画
3. 用 `spring` 实现一个可拖拽的弹性元素

#### 官方文档

- [过渡](https://svelte.dev/docs/svelte/transition)
- [动画](https://svelte.dev/docs/svelte/animate)
- [Motion](https://svelte.dev/docs/svelte/motion)
- [缓动函数](https://svelte.dev/docs/svelte/easing)

---

### 模块 9：Actions — 指令式 DOM 增强

**目标**: 理解 Action 机制，能编写可复用的 DOM 指令

#### 9.1 Action 基础

```svelte
<script>
  function autofocus(node: HTMLElement) {
    node.focus()
  }
</script>

<input use:autofocus />
```

#### 9.2 Action 完整签名

```ts
function action(
  node: HTMLElement,           // 绑定的 DOM 元素
  parameters: any              // 传入的参数
): {
  update?: (newParams: any) => void,  // 参数更新时
  destroy?: () => void                 // 元素销毁时
} {}
```

#### 9.3 常见 Action 示例

```ts
// 点击外部关闭
function clickOutside(node: HTMLElement, callback: () => void) {
  function onClick(e: MouseEvent) {
    if (!node.contains(e.target as Node)) callback()
  }
  document.addEventListener('click', onClick, true)
  return { destroy() { document.removeEventListener('click', onClick, true) } }
}

// 长按
function longPress(node: HTMLElement, callback: () => void) {
  let timer: number
  node.addEventListener('mousedown', () => { timer = setTimeout(callback, 800) })
  node.addEventListener('mouseup', () => clearTimeout(timer))
  node.addEventListener('mouseleave', () => clearTimeout(timer))
  return { destroy() { clearTimeout(timer) } }
}

// 拖拽
function draggable(node: HTMLElement) {
  let offsetX: number, offsetY: number
  node.style.cursor = 'grab'
  function onMouseDown(e: MouseEvent) {
    offsetX = e.clientX - node.offsetLeft
    offsetY = e.clientY - node.offsetTop
    node.style.cursor = 'grabbing'
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  function onMouseMove(e: MouseEvent) {
    node.style.position = 'absolute'
    node.style.left = `${e.clientX - offsetX}px`
    node.style.top = `${e.clientY - offsetY}px`
  }
  function onMouseUp() {
    node.style.cursor = 'grab'
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }
  node.addEventListener('mousedown', onMouseDown)
  return { destroy() { node.removeEventListener('mousedown', onMouseDown) } }
}
```

**练习文件**: `src/exercises/module-09-actions/ActionsDemo.svelte`

#### 挑战任务

1. 实现 `use:tooltip` Action，鼠标悬停显示提示文字
2. 实现 `use:lazy` Action，图片懒加载（IntersectionObserver）
3. 实现 `use:shortcut` Action，键盘快捷键绑定

#### 官方文档

- [Actions](https://svelte.dev/docs/svelte/use)

---

### 模块 10：高级组件模式

**目标**: 掌握 Svelte 特殊元素和高级组件设计模式

#### 10.1 特殊元素

```svelte
<!-- 动态组件 -->
{#if component}
  <svelte:component this={component} {props} />
{/if}

<!-- 动态 HTML 标签 -->
<svelte:element this={tagName}>内容</svelte:element>

<!-- 窗口绑定 -->
<svelte:window bind:innerWidth bind:innerHeight bind:scrollY onkeydown={handleKey} />

<!-- 文档头部 -->
<svelte:head>
  <title>页面标题</title>
  <meta name="description" content="描述" />
</svelte:head>

<!-- 组件选项 -->
<svelte:options immutable={true} />
```

#### 10.2 Renderless Component 模式

```svelte
<!-- MouseTracker.svelte — 无 UI，只提供数据 -->
<script>
  let { children }: { children: Snippet<{ x: number; y: number }> } = $props()
  let x = $state(0), y = $state(0)

  $effect(() => {
    const handler = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  })
</script>

{@render children({ x, y })}

<!-- 使用 -->
<MouseTracker>
  {#snippet { x, y }}
    <p>鼠标位置: {x}, {y}</p>
  {/snippet}
</MouseTracker>
```

**练习文件**: `src/exercises/module-10-advanced-components/AdvancedDemo.svelte`

#### 挑战任务

1. 创建一个 `VisibilityDetector.svelte`，使用 IntersectionObserver 检测元素可见性
2. 创建一个 `KeyboardShortcuts.svelte`，使用 `<svelte:window>` 监听快捷键
3. 创建一个 Renderless `AsyncData.svelte`，封装异步数据加载（loading/error/data）

#### 官方文档

- [svelte:component](https://svelte.dev/docs/svelte/svelte-component)
- [svelte:element](https://svelte.dev/docs/svelte/svelte-element)
- [svelte:window](https://svelte.dev/docs/svelte/svelte-window)
- [svelte:head](https://svelte.dev/docs/svelte/svelte-head)

---

### 模块 11：TypeScript 深度集成

**目标**: 在 Svelte 项目中充分利用 TypeScript 的类型安全

#### 11.1 组件 Props 类型化

```svelte
<!-- 基础类型 -->
<script lang="ts">
  let { name, age }: { name: string; age: number } = $props()
</script>

<!-- 使用接口 -->
<script lang="ts">
  interface Props {
    title: string
    items: Array<{ id: number; name: string }>
    onClose?: () => void
  }
  let props: Props = $props()
</script>

<!-- 泛型组件 -->
<script lang="ts" generics="T extends { id: number }">
  let { items, onSelect }: { items: T[]; onSelect: (item: T) => void } = $props()
</script>
```

#### 11.2 Snippet 类型化

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte'

  let { header, children }: {
    header: Snippet
    children: Snippet<{ item: string }>
  } = $props()
</script>
```

#### 11.3 svelte-check

```bash
pnpm check
```

自动检查 `.svelte` 文件中的 TypeScript 错误。

**练习文件**: `src/exercises/module-11-typescript-deep/GenericList.svelte`

#### 挑战任务

1. 为 GenericList 添加 `onSort` 回调 prop，支持按字段排序
2. 创建一个类型安全的 `FormBuilder.svelte`，根据传入的字段定义自动生成表单
3. 运行 `pnpm check`，确保所有练习文件无类型错误

#### 官方文档

- [TypeScript](https://svelte.dev/docs/svelte/typescript)
- [svelte-check](https://svelte.dev/docs/svelte/compiler-modules#svelte-check)

---

## 阶段四：SvelteKit 全栈开发

> **注意**: 此阶段需要将项目迁移为 SvelteKit 项目。你已安装了 `@sveltejs/kit`。
> 迁移方法：运行 `npx sv create` 创建新 SvelteKit 项目，或参考官方迁移指南。

---

### 模块 12：SvelteKit 路由与页面

**目标**: 掌握 SvelteKit 的文件系统路由，构建多页面应用

#### 12.1 SvelteKit 项目结构

```
src/
├── routes/              # 路由目录
│   ├── +layout.svelte   # 根布局
│   ├── +page.svelte     # 首页 (/)
│   ├── about/
│   │   └── +page.svelte # /about
│   ├── blog/
│   │   ├── +page.svelte # /blog
│   │   └── [slug]/
│   │       └── +page.svelte # /blog/xxx
│   └── api/
│       └── +server.ts   # API 端点
├── lib/                 # $lib 别名
└── app.html             # HTML 模板
```

#### 12.2 文件系统路由规则

| 文件 | 路径 | 用途 |
|------|------|------|
| `+page.svelte` | 对应路由的页面组件 | 渲染 UI |
| `+page.ts` | 页面的 load 函数（客户端） | 加载数据 |
| `+page.server.ts` | 页面的 load 函数（服务端） | 服务端数据加载 |
| `+layout.svelte` | 布局组件 | 共享 UI |
| `+layout.ts` | 布局数据加载 | 共享数据 |
| `+error.svelte` | 错误页面 | 错误处理 |
| `+server.ts` | API 端点 | REST API |

#### 12.3 动态路由

```
routes/blog/[slug]/+page.svelte   → /blog/hello-world
routes/shop/[id]/+page.svelte     → /shop/42
routes/files/[...path]/+page.svelte → /files/a/b/c (Rest 参数)
```

#### 12.4 页面导航

```svelte
<script>
  import { goto, pushState, replaceState } from '$app/navigation'
  import { page } from '$app/stores'
</script>

<a href="/about">关于</a>
<button onclick={() => goto('/about')}>跳转</button>
<p>当前路径: {$page.url.pathname}</p>
```

#### 挑战任务

1. 创建一个多页面应用：首页、关于页、博客列表页、博客详情页
2. 实现一个导航栏组件，高亮当前页面
3. 使用 `[slug]` 动态路由实现博客文章详情

#### 官方文档

- [SvelteKit 路由](https://svelte.dev/docs/kit/routing)
- [页面](https://svelte.dev/docs/kit/page)
- [布局](https://svelte.dev/docs/kit/layouts)

---

### 模块 13：数据加载与 SSR

**目标**: 理解 SvelteKit 的数据流，掌握 SSR/CSR/预渲染

#### 13.1 Load 函数

```ts
// +page.ts (客户端 + 服务端)
export async function load({ fetch, params, url }) {
  const res = await fetch(`/api/posts/${params.slug}`)
  const post = await res.json()
  return { post }
}

// +page.server.ts (仅服务端)
export async function load({ locals, params }) {
  // 可以访问数据库、环境变量等
  const post = await db.posts.findUnique({ where: { slug: params.slug } })
  return { post }
}
```

#### 13.2 页面中使用数据

```svelte
<script>
  let { data } = $props()
</script>

<h1>{data.post.title}</h1>
<p>{data.post.content}</p>
```

#### 13.3 表单 Actions

```ts
// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get('name')
    // 处理表单提交...
    return { success: true }
  }
}
```

#### 13.4 API 路由

```ts
// routes/api/posts/+server.ts
import { json } from '@sveltejs/kit'

export async function GET() {
  const posts = await db.posts.findMany()
  return json(posts)
}

export async function POST({ request }) {
  const body = await request.json()
  const post = await db.posts.create({ data: body })
  return json(post, { status: 201 })
}
```

#### 挑战任务

1. 创建一个博客 API（GET /api/posts, GET /api/posts/[slug], POST /api/posts）
2. 使用 `+page.server.ts` 的 load 函数在服务端获取博客数据
3. 实现文章评论的表单 Action

#### 官方文档

- [Load](https://svelte.dev/docs/kit/load)
- [Actions](https://svelte.dev/docs/kit/form-actions)
- [API 路由](https://svelte.dev/docs/kit/server)

---

### 模块 14：SvelteKit 高级特性

**目标**: 掌握 SvelteKit 的高级功能，能构建生产级应用

#### 14.1 环境变量

```ts
import { env } from '$env/dynamic/private'  // 服务端私有变量
import { env } from '$env/static/public'    // 公开变量 (PUBLIC_ 前缀)
```

#### 14.2 Hooks

```ts
// src/hooks.server.ts
export async function handle({ event, resolve }) {
  // 请求前处理（认证、日志等）
  const response = await resolve(event)
  // 响应后处理（设置 header 等）
  return response
}

export async function handleError({ error, event }) {
  // 错误处理和日志
  return { message: '服务器错误' }
}
```

#### 14.3 渲染模式

```svelte
<!-- +page.ts -->
export const ssr = true     // 服务端渲染（默认）
export const csr = true     // 客户端渲染（默认）
export const prerender = true  // 构建时预渲染
export const ssr = false    // 纯 CSR（SPA 模式）
```

#### 14.4 部署适配器

```bash
pnpm add -D @sveltejs/adapter-node    # Node.js 服务器
pnpm add -D @sveltejs/adapter-static  # 静态站点
pnpm add -D @sveltejs/adapter-vercel  # Vercel
pnpm add -D @sveltejs/adapter-cloudflare  # Cloudflare Pages
```

#### 挑战任务

1. 使用 Hooks 实现简单的认证中间件
2. 配置环境变量，区分开发/生产环境
3. 使用 `adapter-static` 构建一个预渲染的静态博客

#### 官方文档

- [Hooks](https://svelte.dev/docs/kit/hooks)
- [适配器](https://svelte.dev/docs/kit/adapters)
- [环境变量](https://svelte.dev/docs/kit/modules#$env)

---

## 阶段五：工程化与最佳实践

---

### 模块 15：样式系统与 UI 框架

**目标**: 掌握 Svelte 样式方案，能集成 UI 框架

#### 15.1 样式作用域

```svelte
<style>
  /* 自动作用域 — 只影响当前组件 */
  p { color: red; }

  /* 全局样式 */
  :global(.red) { color: red; }

  /* 作用域 + 全局组合 */
  :global(body.dark) p { color: white; }
</style>
```

#### 15.2 CSS 变量主题

```svelte
<style>
  :root {
    --primary: #aa3bff;
    --bg: #fff;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --primary: #c084fc;
      --bg: #16171d;
    }
  }
</style>
```

#### 15.3 Skeleton UI

你已安装 `@skeletonlabs/skeleton`，可直接使用其组件系统。

#### 挑战任务

1. 使用 CSS 变量实现深色/浅色主题切换
2. 集成 Tailwind CSS 到项目
3. 使用 Skeleton UI 组件重构已有的练习组件

---

### 模块 16：测试与质量保障

**目标**: 掌握 Svelte 组件测试方法，建立质量保障流程

#### 16.1 Vitest + Svelte Testing Library

```bash
pnpm add -D vitest @testing-library/svelte jsdom
```

```ts
import { render, fireEvent } from '@testing-library/svelte'
import Counter from './Counter.svelte'

test('increments on click', async () => {
  const { getByText } = render(Counter)
  const button = getByText('Count is 0')
  await fireEvent.click(button)
  expect(getByText('Count is 1')).toBeInTheDocument()
})
```

#### 16.2 E2E 测试

```bash
pnpm add -D @playwright/test
```

#### 挑战任务

1. 为 Counter 组件编写单元测试
2. 为 TodoList 编写集成测试（添加、完成、删除）
3. 配置 Playwright 编写一个简单的 E2E 测试

---

## 阶段六：大师级实战

---

### 模块 17：性能优化与调试

**目标**: 能分析和优化 Svelte 应用性能

#### 核心知识点

1. **编译产物分析**: 理解 Svelte 编译输出的 JS 代码
2. **响应式优化**: 避免不必要的 `$effect` 和 `$derived`
3. **虚拟滚动**: 处理大数据列表
4. **代码分割**: SvelteKit 自动代码分割
5. **Web Vitals**: LCP、FID、CLS 优化
6. **DevTools**: Svelte DevTools 扩展使用

#### 挑战任务

1. 使用 Chrome DevTools 分析应用性能瓶颈
2. 实现一个虚拟滚动列表（10,000+ 条数据）
3. 优化首屏加载时间，目标 LCP < 2.5s

---

### 模块 18：毕业项目 — 全栈 SvelteKit 应用

**目标**: 独立完成一个生产级全栈应用

#### 项目建议：个人知识管理系统

**功能需求**:
1. 用户认证（注册/登录/登出）
2. 笔记 CRUD（创建/读取/更新/删除）
3. Markdown 编辑与预览
4. 标签系统
5. 全文搜索
6. 深色/浅色主题
7. 响应式设计
8. PWA 离线支持

**技术栈**:
- SvelteKit + Svelte 5 Runes
- TypeScript
- SQLite + Prisma (数据库)
- Tailwind CSS / Skeleton UI
- Vitest + Playwright (测试)

#### 开发步骤

1. 规划项目结构与数据模型
2. 搭建 SvelteKit 项目骨架
3. 实现数据库模型与 API
4. 实现认证系统
5. 实现核心功能（笔记 CRUD）
6. 添加搜索与标签
7. 样式与主题
8. 测试与优化
9. 部署上线

---

## 附录

### A. 官方资源

| 资源 | 链接 |
|------|------|
| Svelte 官方文档 | https://svelte.dev/docs/svelte/overview |
| SvelteKit 官方文档 | https://svelte.dev/docs/kit/introduction |
| Svelte CLI 文档 | https://svelte.dev/docs/cli/overview |
| Svelte AI/MCP 文档 | https://svelte.dev/docs/ai/overview |
| Svelte 交互式教程 | https://svelte.dev/tutorial |
| Svelte Playground | https://svelte.dev/playground |
| Svelte Discord | https://svelte.dev/chat |

### B. 推荐学习顺序

```
1. 本教程模块 1-4 → 官方交互式教程（巩固基础）
2. 本教程模块 5-7 → 实际项目练习（深入响应式）
3. 本教程模块 8-11 → 研究 Svelte 编译产物（理解原理）
4. 本教程模块 12-14 → SvelteKit 文档（全栈开发）
5. 本教程模块 15-18 → 开源项目阅读（大师进阶）
```

### C. 练习文件索引

| 模块 | 文件路径 | 核心知识点 |
|------|----------|-----------|
| 1 | `src/exercises/module-01-svelte-philosophy/CounterExplore.svelte` | $state, 条件渲染 |
| 2 | `src/exercises/module-02-template-syntax/TodoList.svelte` | if/each/derived |
| 3 | `src/exercises/module-03-events-and-binding/RegistrationForm.svelte` | 事件, bind, 表单 |
| 4 | `src/exercises/module-04-components-and-props/` | Props, 组件拆分 |
| 5 | `src/exercises/module-05-rune-system/ShoppingCart.svelte` | $state/$derived/$effect |
| 6 | `src/exercises/module-06-store-and-context/` | Store, Context |
| 7 | `src/exercises/module-07-lifecycle-and-effects/LiveSearch.svelte` | $effect, 异步, 防抖 |
| 8 | `src/exercises/module-08-transitions-and-animations/TransitionDemo.svelte` | transition, animate |
| 9 | `src/exercises/module-09-actions/ActionsDemo.svelte` | use:action |
| 10 | `src/exercises/module-10-advanced-components/AdvancedDemo.svelte` | 动态组件, svelte:window |
| 11 | `src/exercises/module-11-typescript-deep/GenericList.svelte` | 泛型, TypeScript |

### D. IDE 推荐

- [VS Code](https://code.visualstudio.com/) + [Svelte 扩展](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- Svelte 扩展提供：语法高亮、类型检查、格式化、HMR 支持
