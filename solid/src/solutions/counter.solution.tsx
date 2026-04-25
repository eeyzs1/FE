import { createSignal } from "solid-js";

export default function CounterSolution() {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>计数器 — 参考答案</h2>
      <p style={{ "font-size": "48px", "font-weight": "bold" }}>{count()}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount(0)}>重置</button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
}
