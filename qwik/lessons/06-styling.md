# 第 6 课：样式系统

> 🎯 学习目标：掌握 Qwik 的样式管理方式，包括作用域样式、CSS Modules 和 Tailwind CSS

---

## 一、useStylesScoped$() — 作用域样式

### 1.1 基本用法

```tsx
// src/components/card/card.css
.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}
```

```tsx
// src/components/card/card.tsx
import { component$, useStylesScoped$, Slot } from '@builder.io/qwik';
import styles from './card.css?inline';

export const Card = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="card">
      <div class="title"><Slot name="title" /></div>
      <Slot />
    </div>
  );
});
```

**关键点：**
- `?inline` 查询参数告诉 Vite 将 CSS 内联为字符串
- `useStylesScoped$()` 将样式作用域到当前组件
- Qwik 会自动为组件的 DOM 元素添加唯一属性，实现样式隔离

### 1.2 作用域原理

渲染后的 HTML 大致如下：

```html
<div q:style="abc123" class="card">
  <div q:style="abc123" class="title">标题</div>
</div>
```

CSS 会被转换为：

```css
.card[q\:style="abc123"] { border: 1px solid #e2e8f0; ... }
.title[q\:style="abc123"] { font-size: 1.5rem; ... }
```

---

## 二、useStyles$() — 全局样式

```tsx
import { component$, useStyles$ } from '@builder.io/qwik';

export default component$(() => {
  useStyles$(`
    .global-alert {
      background: #fef3c7;
      padding: 12px;
      border-radius: 4px;
    }
  `);

  return <div class="global-alert">这是一条全局警告</div>;
});
```

**注意：** 全局样式会影响整个应用，谨慎使用。

---

## 三、CSS Modules

Qwik 原生支持 CSS Modules：

```tsx
// src/components/button/button.module.css
.primary {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

.secondary {
  background: #e5e7eb;
  color: #374151;
  padding: 8px 16px;
  border-radius: 4px;
}
```

```tsx
// src/components/button/button.tsx
import { component$ } from '@builder.io/qwik';
import styles from './button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = component$<ButtonProps>(({ variant = 'primary' }) => {
  return (
    <button class={styles[variant]}>
      点击
    </button>
  );
});
```

---

## 四、Tailwind CSS 集成

### 4.1 安装

```bash
pnpm qwik add tailwindcss
```

### 4.2 使用

```tsx
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">欢迎</h1>
        <p class="text-gray-600">这是一个使用 Tailwind CSS 的 Qwik 组件</p>
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          点击我
        </button>
      </div>
    </div>
  );
});
```

---

## 五、主题切换实现

```tsx
import { component$, useStore, useContextProvider, createContextId, useContext } from '@builder.io/qwik';

export const ThemeCtx = createContextId<{ dark: boolean }>('theme');

export default component$(() => {
  const theme = useStore({ dark: false });
  useContextProvider(ThemeCtx, theme);

  return (
    <div class={theme.dark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      <Header />
      <main class="p-8">
        <p>主题内容</p>
      </main>
    </div>
  );
});

const Header = component$(() => {
  const theme = useContext(ThemeCtx);

  return (
    <header class="flex justify-between p-4 border-b">
      <h1>Qwik App</h1>
      <button
        onClick$={() => theme.dark = !theme.dark}
        class="px-4 py-2 rounded border"
      >
        {theme.dark ? '☀️ 亮色' : '🌙 暗色'}
      </button>
    </header>
  );
});
```

---

## 六、Qwik UI — 组件库

`@qwik-ui/headless` 是 Qwik 官方的无头组件库，提供可访问的、无样式的 UI 原语：

### 6.1 已安装

本项目已包含 `@qwik-ui/headless` 依赖：

```json
// package.json
{
  "devDependencies": {
    "@qwik-ui/headless": "^0.7.4"
  }
}
```

### 6.2 使用示例 — Accordion

```tsx
import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger>第 1 节</Accordion.Trigger>
        <Accordion.Content>第 1 节的内容</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>第 2 节</Accordion.Trigger>
        <Accordion.Content>第 2 节的内容</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
});
```

### 6.3 使用示例 — Popover

```tsx
import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger>打开弹窗</Popover.Trigger>
      <Popover.Panel>
        <p>弹窗内容</p>
      </Popover.Panel>
    </Popover.Root>
  );
});
```

### 6.4 可用组件

`@qwik-ui/headless` 提供以下无头组件：

| 组件 | 说明 |
|---|---|
| `Accordion` | 手风琴/折叠面板 |
| `Popover` | 弹出层 |
| `Tooltip` | 工具提示 |
| `Tabs` | 选项卡 |
| `Toggle` | 开关 |
| `Select` | 下拉选择 |
| `Modal` | 模态框 |
| `Drawer` | 抽屉 |

**"无头"意味着：** 组件只提供行为和可访问性（键盘导航、ARIA 属性），不提供任何样式。你可以用 CSS Modules、Tailwind CSS 或任何样式方案来自定义外观。

---

## 七、动手实践

### 练习 1：作用域样式

为之前创建的 Card 组件添加作用域 CSS，实现以下效果：
- 卡片有阴影和圆角
- hover 时阴影加深
- 标题和内容有不同的字体大小

### 练习 2：安装 Tailwind CSS

运行 `pnpm qwik add tailwindcss`，然后用 Tailwind 类名重构之前的组件样式。

### 练习 3：主题切换

实现一个深色/浅色主题切换功能：
- 使用 Context 在组件树中共享主题状态
- 主题状态持久化到 localStorage
- 页面刷新后保持主题选择

---

## 八、大师洞察

### 样式的延迟加载

Qwik 的样式和组件一样是延迟加载的：
- 组件首次渲染时，其样式才会被注入到页面
- 如果组件从未渲染，其样式永远不会加载
- 这与传统框架（所有样式打包在一起）形成鲜明对比

### useStylesScoped$ vs CSS Modules 的选择

| 特性 | useStylesScoped$ | CSS Modules |
|---|---|---|
| 类型安全 | ❌ 类名是字符串 | ✅ 类名有自动补全 |
| 样式隔离 | ✅ 运行时属性选择器 | ✅ 构建时哈希类名 |
| 性能 | 略有运行时开销 | 构建时处理，无运行时开销 |
| 推荐度 | 简单场景 | ⭐ 日常开发推荐 |

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `useStylesScoped$()` 添加作用域样式
- [ ] 使用 CSS Modules 实现类型安全的样式
- [ ] 集成 Tailwind CSS
- [ ] 实现主题切换功能
- [ ] 使用 `@qwik-ui/headless` 无头组件库
