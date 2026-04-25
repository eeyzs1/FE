import { createSignal } from "solid-js";

export default function HelloSolid() {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello SolidJS!</h1>
      <p>
        欢迎来到 SolidJS 大师之路！这是一个基本的 SolidJS 组件。
      </p>
      <p>
        点击按钮观察计数器变化 — 只有 <code>{'{count()}'}</code> 对应的 DOM 节点会更新，其他部分不会重新渲染。
      </p>
      <button onClick={() => setCount((c) => c + 1)}>
        Count: {count()}
      </button>
      <p style={{ "margin-top": "16px", color: "#888" }}>
        💡 关键概念：组件函数只执行一次，count() 变化时只更新这个数字
      </p>
    </div>
  );
}
