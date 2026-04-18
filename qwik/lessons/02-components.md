# 第 2 课：组件系统 — component$() 与 JSX

> 🎯 学习目标：掌握 Qwik 组件的完整 API，理解组件的惰性加载机制

---

## 一、component$() — 组件定义

### 1.1 基本用法

```tsx
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return <div>Hello Qwik!</div>;
});
```

**关键点：**
- `component$()` 中的 `$` 是惰性边界标记
- 组件函数只在需要渲染时才被下载和执行
- `routes/` 下的 `index.tsx`、`layout.tsx`、`root.tsx` 必须使用 `export default`
- 其他组件可以使用 `export const` 或 `export function`

### 1.2 为什么不能用普通函数？

```tsx
// ❌ 错误：普通函数无法被 Optimizer 拆分
const MyComponent = () => <div>Hello</div>;

// ✅ 正确：component$ 创建惰性边界
const MyComponent = component$(() => <div>Hello</div>);
```

普通函数会被打包进父组件的 chunk，导致父组件引用子组件，子组件又引用孙组件……最终整个应用都在一个 chunk 里。`component$()` 打破了这个传递依赖链。

---

## 二、Props — 组件通信

### 2.1 基本类型 Props

```tsx
import { component$ } from '@builder.io/qwik';

interface GreetingProps {
  name: string;
  age?: number;
}

export const Greeting = component$<GreetingProps>(({ name, age = 18 }) => {
  return (
    <div>
      <p>你好，{name}！</p>
      <p>年龄：{age}</p>
    </div>
  );
});

export default component$(() => {
  return <Greeting name="Qwik" age={5} />;
});
```

### 2.2 传递 Signal 作为 Props

```tsx
import { component$, useSignal, type Signal } from '@builder.io/qwik';

interface CounterProps {
  count: Signal<number>;
  label: string;
}

export const CounterDisplay = component$<CounterProps>(({ count, label }) => {
  return (
    <div>
      <p>{label}: {count.value}</p>
    </div>
  );
});

export default component$(() => {
  const count = useSignal(0);
  return (
    <>
      <button onClick$={() => count.value++}>+1</button>
      <CounterDisplay count={count} label="计数" />
    </>
  );
});
```

**⚠️ 重要规则：**
- 如果只需要读取值，传 `signal.value` 而非整个 `signal`
- 如果需要双向绑定（子组件也要修改），传整个 `signal`

```tsx
// ❌ 避免：只读场景传整个 signal
<Child isClosed={isClosedSig} />

// ✅ 推荐：只读场景只传值
<Child isClosed={isClosedSig.value} />
```

### 2.3 传递对象作为 Props

```tsx
interface ItemProps {
  details: {
    name: string;
    price: number;
  };
}

export const Item = component$<ItemProps>(({ details }) => {
  // 引用类型内部可以修改（浅不可变，内部可变）
  details.price = 4.99;
  return <p>{details.name}: ¥{details.price}</p>;
});
```

Props 是**浅不可变**的：原始类型（string、number、boolean）不可修改，但引用类型（object、array）的内部属性可以修改。

---

## 三、组件组合

### 3.1 父子组件

```tsx
import { component$ } from '@builder.io/qwik';

const Child = component$(() => {
  return <p>我是子组件</p>;
});

export default component$(() => {
  return (
    <div>
      <h1>我是父组件</h1>
      <Child />
    </div>
  );
});
```

**注意：** Qwik 组件已经通过 `component$` 自动实现延迟加载，不需要手动 `dynamic import`。

### 3.2 <Slot /> — 内容投影

```tsx
import { component$, Slot } from '@builder.io/qwik';

const Card = component$(() => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <Slot />
    </div>
  );
});

export default component$(() => {
  return (
    <Card>
      <h2>卡片标题</h2>
      <p>卡片内容</p>
    </Card>
  );
});
```

### 3.3 具名 Slot

```tsx
import { component$, Slot } from '@builder.io/qwik';

const Layout = component$(() => {
  return (
    <div>
      <header><Slot name="header" /></header>
      <main><Slot /></main>
      <footer><Slot name="footer" /></footer>
    </div>
  );
});

export default component$(() => {
  return (
    <Layout>
      <div q:slot="header">导航栏</div>
      <p>主内容（默认 Slot）</p>
      <div q:slot="footer">页脚</div>
    </Layout>
  );
});
```

---

## 四、内联组件（Inline Components）

```tsx
import { component$ } from '@builder.io/qwik';

// 内联组件：普通函数，没有 component$()
const MyButton = (props: { text: string }) => {
  return <button>{props.text}</button>;
};

export default component$(() => {
  return (
    <p>
      一些文字：
      <MyButton text="点击我" />
    </p>
  );
});
```

**内联组件的限制：**
- ❌ 不能使用 `useSignal`、`useStore` 等 `use*` 方法
- ❌ 不能使用 `<Slot />` 内容投影
- ✅ 会随父组件一起打包（无需额外网络请求）

**适用场景：** 简单的纯展示型组件，不需要状态和投影。

---

## 五、点标记组件（Dot Notation Components）

```tsx
// components/scene/index.ts
export { SceneComponent as Root } from './scene-root';
export { SceneTitle as Title } from './scene-title';
```

```tsx
// 使用时
import * as Scene from './components/scene';

export default component$(() => {
  return (
    <Scene.Root>
      <Scene.Title>标题</Scene.Title>
    </Scene.Root>
  );
});
```

---

## 六、ref — 获取 DOM 元素引用

```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const divRef = useSignal<Element>();
  const width = useSignal(0);

  useVisibleTask$(() => {
    if (divRef.value) {
      const rect = divRef.value.getBoundingClientRect();
      width.value = Math.round(rect.width);
    }
  });

  return (
    <div ref={divRef} style={{ border: '1px solid red', width: '200px' }}>
      这个盒子的宽度是 {width.value}px
    </div>
  );
});
```

---

## 七、useId() — 跨 SSR/Client 的一致 ID

```tsx
import { component$, useId, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const id = useId();
  const elemId = `${id}-my-input`;

  return (
    <div>
      <label htmlFor={elemId}>名字：</label>
      <input id={elemId} type="text" />
    </div>
  );
});
```

`useId()` 确保 SSR 和浏览器生成的 ID 一致，避免水合不匹配。

---

## 八、多态组件（Polymorphic Components）

多态组件可以根据 Props 渲染不同的 HTML 元素，同时保持类型安全：

```tsx
import { component$, Slot, type PropsOf } from '@builder.io/qwik';

type DivProps = PropsOf<'div'>;
type AnchorProps = PropsOf<'a'>;

interface PolymorphicProps {
  as?: 'div' | 'a';
  href?: string;
}

export const Poly = component$<PolymorphicProps & DivProps>(({ as: Tag = 'div', href, ...rest }) => {
  if (Tag === 'a') {
    return <a href={href} {...rest}><Slot /></a>;
  }
  return <div {...rest}><Slot /></div>;
});

export default component$(() => {
  return (
    <>
      <Poly>默认 div</Poly>
      <Poly as="a" href="/blog">链接</Poly>
    </>
  );
});
```

**关键点：**
- `PropsOf<'div'>` 提取原生 HTML 元素的 Props 类型
- 多态组件在 Qwik 中需要手动处理不同标签的 Props 差异
- 对于复杂的多态需求，推荐使用 `@qwik-ui/headless` 组件库

---

## 九、动手实践

### 练习 1：创建基础组件

在 `src/components/` 中创建以下组件：

1. **Header 组件** — 显示网站标题和导航
2. **Footer 组件** — 显示版权信息
3. **Button 组件** — 支持 `variant`（primary/secondary）和 `size`（sm/md/lg）

### 练习 2：实现 Card 组件

创建一个 `Card` 组件，使用 `<Slot />` 实现内容投影：
- 支持默认 Slot（内容区域）
- 支持名为 `header` 的 Slot（卡片头部）

### 练习 3：自动聚焦输入框

使用 `ref` + `useVisibleTask$` 实现一个页面加载后自动聚焦的输入框。

---

## 十、大师洞察

### component$() 如何打破传递依赖

```
普通函数：
Parent → 直接引用 Child → 直接引用 GrandChild → 整棵树在一个 chunk

component$()：
Parent → QRL(Child) → QRL(GrandChild) → 每个组件在独立 chunk
```

QRL 是一个间接引用，就像"地址"而非"实物"。拿着地址不等于要把实物带在身上，需要时再按地址去找。

### 组件渲染的响应式

Qwik 组件的渲染是**细粒度响应式**的：
- 如果状态只绑定到 DOM 文本/属性 → 直接更新 DOM，不重新执行组件函数
- 如果状态导致 DOM 结构变化 → 重新执行组件函数

这意味着组件函数可能执行 0 次或多次，所以函数应该是**幂等**的。

---

✅ 完成本课后，你应该能够：
- [ ] 使用 `component$()` 创建组件
- [ ] 通过 Props 传递数据（包括 Signal）
- [ ] 使用 `<Slot />` 实现内容投影
- [ ] 使用 `ref` 获取 DOM 元素
- [ ] 理解内联组件与标准组件的区别
