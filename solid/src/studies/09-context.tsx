import { createContext, useContext, createSignal } from "solid-js";
import type { JSX } from "solid-js";

const ThemeContext = createContext<() => "light" | "dark">();

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  const currentTheme = () => theme?.() ?? "light";
  return (
    <div
      style={{
        padding: "16px",
        background: currentTheme() === "dark" ? "#333" : "#fff",
        color: currentTheme() === "dark" ? "#fff" : "#333",
        "border-radius": "4px",
      }}
    >
      <p>当前主题: {currentTheme()}</p>
    </div>
  );
}

interface CounterValue {
  count: () => number;
  increment: () => void;
  decrement: () => void;
}

const CounterContext = createContext<CounterValue>();

function CounterProvider(props: { children: JSX.Element }) {
  const [count, setCount] = createSignal(0);
  const value: CounterValue = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
  };

  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
}

function CounterDisplay() {
  const ctx = useContext(CounterContext)!;
  return (
    <div style={{ padding: "8px", border: "1px solid #ddd", "border-radius": "4px" }}>
      <p>Context 中的计数器: {ctx.count()}</p>
      <button onClick={ctx.increment}>+1</button>
      <button onClick={ctx.decrement}>-1</button>
    </div>
  );
}

export default function ContextDemo() {
  const [theme, setTheme] = createSignal<"light" | "dark">("light");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Context 上下文</h1>

      <section>
        <h2>1. 主题 Context</h2>
        <button onClick={() => setTheme(theme() === "light" ? "dark" : "light")}>
          切换主题
        </button>
        <ThemeContext.Provider value={theme}>
          <ThemedComponent />
        </ThemeContext.Provider>
      </section>

      <section>
        <h2>2. Context + Store 模式</h2>
        <CounterProvider>
          <CounterDisplay />
          <CounterDisplay />
          <p style={{ color: "#888" }}>
            💡 两个 CounterDisplay 共享同一个 Context 状态
          </p>
        </CounterProvider>
      </section>
    </div>
  );
}
