import { createContext, useContext, createSignal } from "solid-js";
import type { JSX } from "solid-js";

const ThemeContext = createContext<{ theme: () => "light" | "dark"; toggle: () => void }>();

function ThemeProvider(props: { children: JSX.Element }) {
  const [theme, setTheme] = createSignal<"light" | "dark">("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

function ThemedCard() {
  const ctx = useContext(ThemeContext)!;
  return (
    <div
      style={{
        padding: "16px",
        background: ctx.theme() === "dark" ? "#333" : "#fff",
        color: ctx.theme() === "dark" ? "#fff" : "#333",
        border: `1px solid ${ctx.theme() === "dark" ? "#555" : "#ddd"}`,
        "border-radius": "8px",
        transition: "all 0.3s",
      }}
    >
      <p>当前主题: {ctx.theme()}</p>
      <button onClick={ctx.toggle}>切换主题</button>
    </div>
  );
}

export default function ThemeToggleSolution() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>主题切换 — 参考答案</h2>
      <ThemeProvider>
        <ThemedCard />
        <ThemedCard />
        <p style={{ color: "#888", "margin-top": "8px" }}>
          💡 两个卡片共享同一个主题状态
        </p>
      </ThemeProvider>
    </div>
  );
}
