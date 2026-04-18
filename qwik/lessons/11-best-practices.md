# 第 11 课：最佳实践与性能优化

> 🎯 学习目标：掌握 Qwik 的最佳实践，写出高性能的 Qwik 应用

---

## 一、模板中内联操作

### ❌ 次优实现

```tsx
export default component$(() => {
  const signal = useSignal(0);
  const label = signal.value > 0 ? '正数' : '非正数';

  return (
    <div>
      <button onClick$={() => signal.value++}>+</button>
      <button onClick$={() => signal.value--}>-</button>
      <div>{label} - 当前值：{signal.value}</div>
    </div>
  );
});
```

**问题：** `label` 在组件函数中读取了 `signal.value`，导致整个组件函数在 signal 变化时重新执行。

### ✅ 优化实现

```tsx
export default component$(() => {
  const signal = useSignal(0);

  return (
    <div>
      <button onClick$={() => signal.value++}>+</button>
      <button onClick$={() => signal.value--}>-</button>
      <div>
        {signal.value > 0 ? '正数' : '非正数'} - 当前值：{signal.value}
      </div>
    </div>
  );
});
```

**原理：** 将操作内联到模板中，Qwik 可以更精确地追踪哪些 DOM 节点需要更新，避免不必要的组件重渲染。

---

## 二、将 Signal 读取移到 useComputed$ / useTask$ 中

### ❌ 次优实现

```tsx
export default component$(() => {
  const count = useSignal(1);
  const doubleCount = count.value * 2; // 在组件函数中读取 signal

  return <div>{doubleCount}</div>;
});
```

**问题：** `count.value` 在组件函数中被读取，导致组件函数在 count 变化时重新执行。

### ✅ 优化实现

```tsx
export default component$(() => {
  const count = useSignal(1);
  const doubleCount = useComputed$(() => count.value * 2);

  return <div>{doubleCount.value}</div>;
});
```

**原理：** `useComputed$` 创建了独立的响应式上下文，只有 `doubleCount` 的计算逻辑在 count 变化时重新执行，组件函数本身不会重新执行。

---

## 三、useVisibleTask$ 的替代方案

### 3.1 原则：useVisibleTask$ 是最后手段

`useVisibleTask$` 会在组件可见时急切执行代码，这违背了 Qwik 的延迟执行哲学。

### 3.2 替代方案优先级

#### 1️⃣ useTask$ — 能在服务器执行的逻辑

```tsx
// ✅ 用 useTask$ 替代 useVisibleTask$（如果逻辑可以在服务器执行）
useTask$(() => {
  // 初始化逻辑
});
```

#### 2️⃣ useOn / useOnWindow / useOnDocument — 事件监听

```tsx
// ❌ 不推荐
useVisibleTask$(({ cleanup }) => {
  const handler = (event: MouseEvent) => { /* ... */ };
  document.addEventListener('mousemove', handler);
  cleanup(() => document.removeEventListener('mousemove', handler));
});

// ✅ 推荐
useOnDocument('mousemove', $((event) => {
  const { clientX, clientY } = event as MouseEvent;
  // ...
}));
```

#### 3️⃣ useVisibleTask$ — 确实需要时才使用

```tsx
// 只在确实需要浏览器 API 且无法用事件监听时使用
useVisibleTask$(() => {
  // 初始化 WebGL 上下文
  // 初始化第三方库
});
```

---

## 四、避免直接访问 window.location

### ❌ 次优实现

```tsx
useVisibleTask$(() => {
  if (window.location.href.includes('foo')) {
    // ...
  }
});
```

### ✅ 优化实现

```tsx
const location = useLocation();

if (location.url.href.includes('foo')) {
  // ...
}
```

**原因：** `useLocation()` 可以在 SSR 时执行，而 `window.location` 只能在浏览器端使用，会导致额外的 JS 加载。

---

## 五、延迟核心执行（高级）

Qwik 的"核心"（core）是框架的运行时。默认情况下，某些操作会触发核心加载。你可以延迟核心加载：

### 5.1 useOn 替代 useVisibleTask$

```tsx
// useVisibleTask$ 总是要求核心
useVisibleTask$(() => console.log('需要核心'));

// useOn 可以延迟核心加载
useOnDocument('qidle', $(() => console.log('空闲时才需要核心')));
```

### 5.2 注意引用组件作用域的变量

```tsx
const Component = component$(() => {
  const ref = useSignal();
  const id = useId();

  // ❌ 引用了组件作用域变量，会在加载时执行核心
  useOnDocument('qidle', $(() => console.log(ref)));
  useOnDocument('qidle', $(() => console.log(id)));

  // ✅ 不引用组件作用域变量，不会在加载时执行核心
  useOnDocument('qidle', $(() => console.log('静态字符串')));
  useOnDocument('qidle', $(() => console.log(globalVariable)));
});
```

---

## 六、性能量化指标

### 6.1 Core Web Vitals

Google 定义的核心 Web 指标，是衡量用户体验的黄金标准：

| 指标 | 含义 | 目标值 | Qwik 优势 |
|---|---|---|---|
| LCP（Largest Contentful Paint） | 最大内容渲染时间 | < 2.5s | SSR + 可恢复性，无水合延迟 |
| FID（First Input Delay） | 首次输入延迟 | < 100ms | 按需加载，初始 JS 极小 |
| CLS（Cumulative Layout Shift） | 累积布局偏移 | < 0.1 | SSR 输出完整 HTML，无闪烁 |
| INP（Interaction to Next Paint） | 交互到下次绘制 | < 200ms | 细粒度更新，预加载策略 |

### 6.2 使用 Lighthouse 测试

```bash
# 使用 Chrome DevTools
# 1. 打开 Chrome DevTools (F12)
# 2. 切换到 Lighthouse 面板
# 3. 选择 Performance 类别
# 4. 点击 Analyze page load

# 使用命令行
npx lighthouse http://localhost:4173 --output=html --output-path=./lighthouse-report.html
```

### 6.3 使用 Chrome DevTools 分析

**Network 面板：**
- 筛选 JS 文件，观察首屏加载了多少 JS
- Qwik 应用首屏 JS 应该 < 10KB
- 观察 hover 时的预加载请求

**Performance 面板：**
- 录制页面加载过程
- 查找 "Parse HTML" 和 "Evaluate Script" 时间
- Qwik 应该几乎没有 "Evaluate Script" 开销

**Coverage 面板：**
- 打开 Coverage 面板（Ctrl+Shift+P → Coverage）
- 查看未使用的 JS/CSS 比例
- Qwik 应该有很高的"未使用"比例（因为按需加载）

### 6.4 Bundle 分析

```bash
# 构建后查看 chunk 大小
pnpm build
ls -la dist/build/

# 使用 rollup-plugin-visualizer 分析
pnpm add -D rollup-plugin-visualizer
```

```ts
// vite.config.ts 中添加
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    qwikCity(),
    qwikVite(),
    tsconfigPaths(),
    visualizer({ open: true, gzipSize: true }),
  ],
});
```

---

## 七、调试技巧

### 7.1 SSR vs 浏览器日志

```tsx
import { component$, isServer, isBrowser } from '@builder.io/qwik';

export default component$(() => {
  // ✅ 这行在 SSR 和浏览器都会执行
  console.log('组件渲染', isServer ? '服务器' : '浏览器');

  useTask$(() => {
    // ✅ 这行在 SSR 和浏览器都会执行
    console.log('useTask$ 执行', isServer ? '服务器' : '浏览器');
  });

  useVisibleTask$(() => {
    // ✅ 这行只在浏览器执行
    console.log('useVisibleTask$ 执行');
  });

  return <div>调试示例</div>;
});
```

### 7.2 VS Code Debugger

项目已包含 `.vscode/launch.json`，可以直接使用 VS Code 调试：

1. 在代码中设置断点
2. 按 F5 启动调试
3. 在浏览器中操作触发断点

### 7.3 常见错误解读

| 错误信息 | 原因 | 解决方案 |
|---|---|---|
| `Cannot read properties of undefined` | SSR 时访问了浏览器 API | 使用 `useVisibleTask$` 或 `isBrowser` 守卫 |
| `QRL doesn't have a resolved value` | QRL 引用未正确解析 | 检查 `$` 和 `component$` 是否正确使用 |
| `Event handler is not a QRL` | 事件处理器缺少 `$` | 使用 `onClick$` 而非 `onClick` |
| `Hydration mismatch` | SSR 和浏览器渲染不一致 | 确保组件函数是幂等的，避免随机值 |
| `Maximum call stack exceeded` | 无限循环的 `useTask$` | 检查 `track()` 是否导致了循环依赖 |

---

## 八、性能分析清单

### 6.1 开发阶段

- [ ] 使用 Chrome DevTools Network 面板观察 JS 加载
- [ ] 使用 `pnpm preview` 查看生产构建的表现
- [ ] 检查是否有不必要的 `useVisibleTask$`
- [ ] 检查是否在组件函数中读取了不需要的 signal

### 6.2 构建阶段

```bash
# 构建生产版本
pnpm build

# 查看 dist/ 目录中的 chunk 大小
ls -la dist/build/
```

### 6.3 运行时

- [ ] 首屏加载：应该只下载约 1KB 的 Qwik 运行时
- [ ] 交互时：只有相关的 chunk 被下载
- [ ] 预加载：hover 链接时应该看到 chunk 预加载
- [ ] 无水合：浏览器不应该重新执行框架代码

---

## 九、常见反模式与修复

### 反模式 1：在组件函数中做复杂计算

```tsx
// ❌
export default component$(() => {
  const items = useSignal<Item[]>([]);
  const sorted = items.value.sort((a, b) => a.name.localeCompare(b.name));
  return <List items={sorted} />;
});

// ✅
export default component$(() => {
  const items = useSignal<Item[]>([]);
  const sorted = useComputed$(() =>
    items.value.sort((a, b) => a.name.localeCompare(b.name))
  );
  return <List items={sorted.value} />;
});
```

### 反模式 2：不必要的 useVisibleTask$

```tsx
// ❌
useVisibleTask$(() => {
  document.addEventListener('keydown', handler);
  cleanup(() => document.removeEventListener('keydown', handler));
});

// ✅
useOnDocument('keydown', $(handler));
```

### 反模式 3：在 useVisibleTask$ 中访问 location

```tsx
// ❌
useVisibleTask$(() => {
  if (window.location.pathname === '/admin') { ... }
});

// ✅
const loc = useLocation();
if (loc.url.pathname === '/admin') { ... }
```

### 反模式 4：传递整个 Signal 而非值

```tsx
// ❌ 只读场景传整个 signal
<Child isVisible={isVisibleSig} />

// ✅ 只读场景只传值
<Child isVisible={isVisibleSig.value} />
```

---

## 十、动手实践

### 练习 1：重构优化

回顾之前课程中写的所有组件，应用以下优化：
1. 将模板外的 signal 读取移到 `useComputed$` 中
2. 将 `useVisibleTask$` 替换为 `useOn*` 或 `useTask$`
3. 将 `window.location` 替换为 `useLocation()`

### 练习 2：性能对比

1. 选择一个页面
2. 在优化前后分别运行 `pnpm preview`
3. 使用 Chrome DevTools 的 Performance 面板对比：
   - 首屏加载时间
   - JS 执行时间
   - 交互延迟

---

## 十一、大师洞察

### Qwik 的性能哲学

Qwik 的性能不是来自"更少的代码"，而是来自"更聪明的加载"：

1. **延迟一切**：代码只在需要时才加载
2. **预加载**：在用户可能交互之前预加载代码
3. **细粒度**：只重新渲染受影响的部分
4. **可恢复**：不重复服务器已经做过的工作

### 何时打破最佳实践

有些场景下 `useVisibleTask$` 是唯一选择：
- 初始化 WebGL/Canvas
- 集成不支持事件监听的第三方库
- 需要读取元素尺寸（`getBoundingClientRect`）

在这些情况下，添加 ESLint 忽略注释：

```tsx
// eslint-disable-next-line qwik/no-use-visible-task
useVisibleTask$(() => { ... });
```

---

✅ 完成本课后，你应该能够：
- [ ] 在模板中内联操作以优化响应式追踪
- [ ] 使用 `useComputed$` 替代组件函数中的计算
- [ ] 用 `useOn*` 替代 `useVisibleTask$` 注册事件
- [ ] 使用 `useLocation()` 替代 `window.location`
- [ ] 识别和修复常见反模式
- [ ] 使用 Core Web Vitals 和 Lighthouse 量化性能
- [ ] 使用 Chrome DevTools 分析 JS 加载和执行
- [ ] 理解常见错误信息并快速定位问题
