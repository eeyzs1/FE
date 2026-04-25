import { createSignal, onMount, onCleanup } from "solid-js";

export default function LifecycleDemo() {
  const [count, setCount] = createSignal(0);
  let divRef!: HTMLDivElement;

  onMount(() => {
    console.log("onMount: 组件已挂载，divRef 尺寸:", divRef.clientWidth, "x", divRef.clientHeight);
  });

  onCleanup(() => {
    console.log("onCleanup: 组件即将卸载");
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>组件生命周期</h1>

      <section>
        <h2>1. onMount — 获取 DOM 尺寸</h2>
        <div
          ref={divRef}
          style={{ width: "300px", height: "100px", background: "#f0f0f0", "border-radius": "4px", display: "flex", "align-items": "center", "justify-content": "center" }}
        >
          这个 div 的宽度: {divRef?.clientWidth ?? "loading..."}px
        </div>
      </section>

      <section>
        <h2>2. onCleanup — 事件监听器清理</h2>
        <WindowSizeDemo />
      </section>

      <section>
        <h2>3. 执行顺序</h2>
        <p>Count: {count()}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <p style={{ color: "#888" }}>
          💡 打开控制台观察执行顺序：<br />
          组件函数体 → createRenderEffect → DOM 连接 → onMount → createEffect
        </p>
      </section>
    </div>
  );
}

function WindowSizeDemo() {
  const [size, setSize] = createSignal({ width: window.innerWidth, height: window.innerHeight });

  onMount(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handler);
    onCleanup(() => window.removeEventListener("resize", handler));
  });

  return (
    <p>
      窗口尺寸: {size().width} x {size().height}
    </p>
  );
}
