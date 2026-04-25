import { createSignal, createEffect, onMount, onCleanup } from "solid-js";

export default function EffectsDemo() {
  const [count, setCount] = createSignal(0);
  const [message, setMessage] = createSignal("Hello");

  createEffect(() => {
    console.log("基本 Effect: count =", count());
  });

  createEffect(() => {
    console.log("多依赖 Effect: count =", count(), ", message =", message());
  });

  onMount(() => {
    console.log("onMount: 组件已挂载");
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Effects 效果</h1>

      <section>
        <h2>1. 基本 Effect</h2>
        <p>Count: {count()}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </section>

      <section>
        <h2>2. 多依赖 Effect</h2>
        <p>Message: {message()}</p>
        <input
          type="text"
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </section>

      <section>
        <h2>3. onCleanup 示例</h2>
        <TimerDemo />
      </section>

      <p style={{ color: "#888" }}>
        💡 打开控制台观察 Effect 的执行时机
      </p>
    </div>
  );
}

function TimerDemo() {
  const [seconds, setSeconds] = createSignal(0);
  const [running, setRunning] = createSignal(false);
  let timer: ReturnType<typeof setInterval> | undefined;

  createEffect(() => {
    if (running()) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timer);
      timer = undefined;
    }
    onCleanup(() => {
      clearInterval(timer);
      timer = undefined;
    });
  });

  return (
    <div>
      <p>计时器: {seconds()}秒</p>
      <button onClick={() => setRunning(!running())}>
        {running() ? "暂停" : "开始"}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>重置</button>
    </div>
  );
}
