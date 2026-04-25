import { createSignal, createMemo } from "solid-js";

export default function MemosDemo() {
  const [count, setCount] = createSignal(0);
  const [items, setItems] = createSignal<number[]>([1, 2, 3, 4, 5]);

  const doubleCount = createMemo(() => count() * 2);

  const trend = createMemo(
    (prev: { prevCount: number; direction: string }) => {
      const current = count();
      if (current > prev.prevCount) {
        return { prevCount: current, direction: "Up" };
      }
      if (current < prev.prevCount) {
        return { prevCount: current, direction: "Down" };
      }
      return prev;
    },
    { prevCount: 0, direction: "None" }
  );

  const evenItems = createMemo(() => items().filter((n) => n % 2 === 0));

  const sum = createMemo(() => items().reduce((a, b) => a + b, 0));

  const dateObject = createMemo(
    () => new Date(Date.now() + count() * 1000),
    undefined,
    {
      equals: (prev, next) => prev.getTime() === next.getTime(),
    }
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Memos 派生值</h1>

      <section>
        <h2>1. 基本 Memo</h2>
        <p>Count: {count()}</p>
        <p>Double: {doubleCount()}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
      </section>

      <section>
        <h2>2. 访问前一次的值（趋势判断）</h2>
        <p>趋势: {trend().direction}</p>
      </section>

      <section>
        <h2>3. 过滤和求和</h2>
        <p>数组: [{items().join(", ")}]</p>
        <p>偶数: [{evenItems().join(", ")}]</p>
        <p>总和: {sum()}</p>
        <button onClick={() => setItems((prev) => [...prev, prev.length + 1])}>
          添加元素
        </button>
      </section>

      <section>
        <h2>4. 自定义 equals 判断</h2>
        <p>时间对象: {dateObject().toLocaleTimeString()}</p>
      </section>

      <p style={{ color: "#888" }}>
        💡 Memo 是只读的、缓存的派生值。简单计算（如 count() * 2）可以直接写在 JSX 中，无需 Memo
      </p>
    </div>
  );
}
