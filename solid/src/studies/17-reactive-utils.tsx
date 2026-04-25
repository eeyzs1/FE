import { createSignal, createEffect, batch, untrack, on } from "solid-js";

export default function ReactiveUtils() {
  const [count, setCount] = createSignal(0);
  const [total, setTotal] = createSignal(0);

  createEffect(() => {
    console.log("batch 演示 — count:", count(), "total:", total());
  });

  const incrementWithoutBatch = () => {
    setCount((c) => c + 1);
    setTotal((t) => t + 10);
  };

  const incrementWithBatch = () => {
    batch(() => {
      setCount((c) => c + 1);
      setTotal((t) => t + 10);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>batch / untrack / on</h1>

      <section>
        <h2>1. batch — 批量更新</h2>
        <p>Count: {count()}, Total: {total()}</p>
        <button onClick={incrementWithoutBatch}>不使用 batch（Effect 执行2次）</button>
        <button onClick={incrementWithBatch}>使用 batch（Effect 执行1次）</button>
        <p style={{ color: "#888" }}>
          💡 打开控制台观察：batch 合并多次信号更新，Effect 只触发一次
        </p>
      </section>

      <section>
        <h2>2. untrack — 忽略追踪</h2>
        <UntrackDemo />
      </section>

      <section>
        <h2>3. on — 显式声明依赖</h2>
        <OnDemo />
      </section>
    </div>
  );
}

function UntrackDemo() {
  const [a, setA] = createSignal(0);
  const [b, setB] = createSignal(0);

  createEffect(() => {
    console.log("untrack 演示 — a:", a(), "b (untracked):", untrack(() => b()));
  });

  return (
    <div>
      <p>A: {a()} (被追踪)</p>
      <p>B: {b()} (不被追踪)</p>
      <button onClick={() => setA((v) => v + 1)}>A+1 (触发 Effect)</button>
      <button onClick={() => setB((v) => v + 1)}>B+1 (不触发 Effect)</button>
      <p style={{ color: "#888" }}>
        💡 只有 A 变化时 Effect 才会重新执行，B 的变化被 untrack 忽略
      </p>
    </div>
  );
}

function OnDemo() {
  const [count, setCount] = createSignal(0);
  const [other, setOther] = createSignal(0);

  createEffect(
    on(count, (value) => {
      console.log("on 演示 — count 变为:", value, "other:", other());
    })
  );

  createEffect(
    on(count, (value) => {
      console.log("on + defer 演示 — count 变为:", value);
    }, { defer: true })
  );

  return (
    <div>
      <p>Count: {count()}</p>
      <p>Other: {other()}</p>
      <button onClick={() => setCount((c) => c + 1)}>Count+1</button>
      <button onClick={() => setOther((o) => o + 1)}>Other+1</button>
      <p style={{ color: "#888" }}>
        💡 on() 显式指定依赖，只有 count 变化时 Effect 才执行。<br />
        defer: true 跳过首次执行，只在后续变化时运行。
      </p>
    </div>
  );
}
