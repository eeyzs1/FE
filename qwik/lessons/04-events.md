# 第 4 课：事件处理 — Qwik 的异步事件模型

> 🎯 学习目标：掌握 Qwik 独特的事件处理机制，理解异步事件模型的限制与解决方案

---

## 一、基本事件绑定

### 1.1 内联事件处理器

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);

  return (
    <button onClick$={() => count.value++}>
      点击了 {count.value} 次
    </button>
  );
});
```

**注意 `onClick$` 末尾的 `$`：**
- 这是惰性边界标记
- 事件处理器的代码不会在页面加载时执行
- 只有用户点击按钮时，对应的 JS chunk 才会被下载和执行
- 但 Qwik 会在用户 hover 按钮时预加载该 chunk，避免点击延迟

### 1.2 常用事件

```tsx
// 鼠标事件
<div onClick$={() => {}} onDblClick$={() => {}} onMouseEnter$={() => {}} />

// 键盘事件
<input onKeyPress$={() => {}} onKeyDown$={() => {}} onKeyUp$={() => {}} />

// 表单事件
<input onInput$={() => {}} onChange$={() => {}} onFocus$={() => {}} onBlur$={() => {}} />
<form onSubmit$={() => {}} />

// 其他
<div onScroll$={() => {}} onDragStart$={() => {}} />
```

---

## 二、可复用事件处理器 — $()

```tsx
import { component$, useSignal, $ } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);

  // 使用 $() 创建可复用的 QRL
  const increment = $(() => count.value++);
  const log = $((ev: Event) => console.log('事件：', ev));

  return (
    <>
      <button onClick$={increment}>+1</button>
      <button onClick$={[log, increment]}>记录并 +1</button>
    </>
  );
});
```

**⚠️ 提取事件处理器时必须用 `$()` 包裹：**

```tsx
// ❌ 错误：直接提取函数，丢失惰性边界
const increment = () => count.value++;
<button onClick$={increment} />

// ✅ 正确：用 $() 包裹
const increment = $(() => count.value++);
<button onClick$={increment} />
```

---

## 三、多事件处理器

```tsx
import { component$, useSignal, $ } from '@builder.io/qwik';

export default component$(() => {
  const count = useSignal(0);
  const print = $((ev) => console.log('点击！', ev));
  const increment = $(() => count.value++);

  return (
    <button onClick$={[print, increment, $(() => console.log('第三个处理器'))]}>
      计数：{count.value}
    </button>
  );
});
```

---

## 四、事件对象

### 4.1 标准事件对象

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const position = useSignal<{ x: number; y: number }>();

  return (
    <div
      onClick$={(event) => {
        position.value = { x: event.x, y: event.y };
      }}
      style={{ height: '100vh' }}
    >
      <p>点击位置：({position.value?.x}, {position.value?.y})</p>
    </div>
  );
});
```

### 4.2 ⚠️ 异步事件的限制

由于 Qwik 的事件处理是**异步**的（需要先下载 JS chunk），以下 API 不能直接使用：

```tsx
// ❌ 不能使用
event.preventDefault()
event.stopPropagation()
event.currentTarget
```

### 4.3 preventDefault 和 stopPropagation 的声明式方案

```tsx
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <a
      href="/docs"
      preventdefault:click
      stoppropagation:click
      onClick$={() => {
        alert('导航被阻止了！');
      }}
    >
      点击不会跳转
    </a>
  );
});
```

### 4.4 currentTarget 的替代方案

Qwik 事件处理器的第二个参数就是 `currentTarget`：

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const tagName = useSignal('');

  return (
    <section
      onClick$={(event, currentTarget) => {
        tagName.value = currentTarget.tagName;
      }}
    >
      <p>点击的元素标签：{tagName.value}</p>
      <button>按钮 A</button>
      <button>按钮 B</button>
    </section>
  );
});
```

---

## 五、Window 和 Document 事件

### 5.1 JSX 中使用前缀

```tsx
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const scrollY = useSignal(0);
  const mouseX = useSignal(0);

  return (
    <div
      window:onScroll$={() => {
        scrollY.value = window.scrollY;
      }}
      document:onMouseMove$={(ev) => {
        mouseX.value = (ev as MouseEvent).clientX;
      }}
    >
      <p>滚动位置：{scrollY}</p>
      <p>鼠标 X：{mouseX}</p>
    </div>
  );
});
```

### 5.2 useOn / useOnWindow / useOnDocument

当需要在自定义 Hook 中注册事件时使用：

```tsx
import { $, component$, useOnDocument, useStore } from '@builder.io/qwik';

function useMousePosition() {
  const position = useStore({ x: 0, y: 0 });
  useOnDocument(
    'mousemove',
    $((event) => {
      const { clientX, clientY } = event as MouseEvent;
      position.x = clientX;
      position.y = clientY;
    })
  );
  return position;
}

export default component$(() => {
  const pos = useMousePosition();
  return <div>鼠标位置：({pos.x}, {pos.y})</div>;
});
```

**优势：**
- 声明式注册，无需手动清理
- 组件销毁时自动移除监听器
- 不需要 `useVisibleTask$`

---

## 六、自定义事件 Props

```tsx
import { component$, Slot, useStore, type QRL } from '@builder.io/qwik';

// 父组件
export default component$(() => {
  return (
    <TripleClickButton onTripleClick$={() => alert('三击！')}>
      三击我
    </TripleClickButton>
  );
});

// 子组件
interface TripleClickButtonProps {
  onTripleClick$?: QRL<() => void>;
}

export const TripleClickButton = component$<TripleClickButtonProps>(
  ({ onTripleClick$ }) => {
    const state = useStore({ clicks: 0, lastClickTime: 0 });

    return (
      <button
        onClick$={() => {
          const now = Date.now();
          if (now - state.lastClickTime > 500) state.clicks = 0;
          state.lastClickTime = now;
          state.clicks++;
          if (state.clicks === 3) {
            onTripleClick$?.();
            state.clicks = 0;
          }
        }}
      >
        <Slot />
      </button>
    );
  }
);
```

**关键：** 自定义事件 Props 的类型必须使用 `QRL<FunctionType>`，不能用普通函数类型。

---

## 七、同步事件处理

某些事件（如 `dragstart`）必须同步处理，Qwik 的异步模型无法满足。Qwik 提供了两种解决方案：

### 7.1 sync$() — 可恢复的同步事件（推荐）

`sync$()` 允许你同步处理事件，同时保持可恢复性：

```tsx
import { component$, sync$, $ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div
      draggable
      onDragStart={sync$((event) => {
        event.dataTransfer?.setData('text/plain', 'hello');
      })}
      onDragEnd={sync$(() => {
        console.log('拖动结束');
      })}
    >
      拖动我
    </div>
  );
});
```

**sync$() 的限制：**
- ❌ 不能闭包引用任何状态（signal、store 等）
- ❌ 不能访问任何非浏览器函数（不能使用 import）
- ✅ 可以通过元素属性传递状态

```tsx
import { component$, sync$, $, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const dragId = useSignal('item-1');

  return (
    <div
      draggable
      data-drag-id={dragId.value}
      onDragStart={sync$((event, elm) => {
        const id = elm.dataset.dragId;
        event.dataTransfer?.setData('text/plain', id || '');
      })}
    >
      拖动我（ID: {dragId.value}）
    </div>
  );
});
```

**通过 `data-*` 属性传递状态**是 `sync$()` 与组件状态通信的标准模式。

### 7.2 useVisibleTask$ — 急切注册（备选方案）

当 `sync$()` 的限制无法满足时（如需要访问组件状态），可以使用 `useVisibleTask$`：

```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const dragRef = useSignal<HTMLElement>();
  const status = useSignal('');

  useVisibleTask$(({ cleanup }) => {
    if (!dragRef.value) return;

    const onDragStart = () => (status.value = '拖动开始');
    const onDragEnd = () => (status.value = '拖动结束');

    dragRef.value.addEventListener('dragstart', onDragStart);
    dragRef.value.addEventListener('dragend', onDragEnd);

    cleanup(() => {
      dragRef.value?.removeEventListener('dragstart', onDragStart);
      dragRef.value?.removeEventListener('dragend', onDragEnd);
    });
  });

  return (
    <div>
      <div draggable ref={dragRef}>拖动我！</div>
      <p>{status.value}</p>
    </div>
  );
});
```

**⚠️ 这是反模式！** 因为 `useVisibleTask$` 会急切加载代码，违背可恢复性。只在 `sync$()` 无法满足需求时使用。

### 7.3 三种方案对比

| 方案 | 同步执行 | 可恢复 | 可访问状态 | 推荐度 |
|---|---|---|---|---|
| `preventdefault:click` | ✅ | ✅ | ❌ | ⭐⭐⭐ 仅阻止默认行为 |
| `sync$()` | ✅ | ✅ | ❌（需用 data-* 传递） | ⭐⭐⭐ 需要同步逻辑 |
| `useVisibleTask$` | ✅ | ❌ | ✅ | ⭐ 仅作最后手段 |

---

## 八、动手实践

### 练习 1：三击检测器

实现一个组件，检测用户在 300ms 内的三击操作，显示"三击 detected！"提示。

### 练习 2：全局键盘快捷键

使用 `useOnDocument` 实现以下快捷键：
- `Ctrl+K` → 聚焦搜索框
- `Escape` → 清空搜索框

### 练习 3：可拖拽元素

实现一个可以拖拽移动的 div 元素（提示：需要使用 `mousedown`、`mousemove`、`mouseup` 事件组合）。

### 练习 4：自定义表单组件

创建一个 `TextInput` 组件，支持以下自定义事件 Props：
- `onValueChange$: QRL<(value: string) => void>` — 值变化时触发
- `onEnter$: QRL<() => void>` — 按下回车时触发

---

## 九、大师洞察

### 为什么事件处理是异步的？

Qwik 的事件处理器可能需要先从服务器下载 JS chunk，这个过程是异步的。这意味着：

1. **`event.preventDefault()` 不可用**：因为等到代码下载完执行时，浏览器默认行为可能已经发生了。解决方案是声明式的 `preventdefault:click`，它在 HTML 层面就阻止了默认行为。

2. **`event.currentTarget` 不可用**：因为事件对象在异步处理后可能已经被浏览器回收。Qwik 通过第二个参数提供 `currentTarget`。

3. **预加载策略**：Qwik 会在用户 hover 元素时预加载事件处理器的 chunk，这样点击时代码已经在缓存中，不会有延迟。

### 事件处理器的代码分割效果

```tsx
// 这两个按钮的事件处理器会在不同的 chunk 中
<button onClick$={() => heavyFunctionA()}>功能 A</button>
<button onClick$={() => heavyFunctionB()}>功能 B</button>
```

如果用户只点击了"功能 A"，那么 `heavyFunctionB` 的代码永远不会被下载。

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `onClick$` 等绑定事件
- [ ] 使用 `$()` 创建可复用事件处理器
- [ ] 使用 `preventdefault:click` 和 `stoppropagation:click`
- [ ] 使用 `sync$()` 处理同步事件
- [ ] 使用 `useOnDocument` / `useOnWindow` 注册全局事件
- [ ] 创建自定义事件 Props
- [ ] 理解异步事件模型的限制和解决方案
