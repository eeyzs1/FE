import { createSignal, Index } from "solid-js";

export default function StylingDemo() {
  const [isActive, setIsActive] = createSignal(false);
  const [isDisabled, setIsDisabled] = createSignal(false);
  const [theme, setTheme] = createSignal<"light" | "dark">("light");
  const [fontSize, setFontSize] = createSignal(16);
  const [activeTab, setActiveTab] = createSignal(0);

  const tabs = ["首页", "关于", "设置"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>样式</h1>

      <section>
        <h2>1. class 属性</h2>
        <p>静态 class:</p>
        <div class="container" style={{ padding: "8px", background: "#f0f0f0", "border-radius": "4px" }}>
          静态 class 示例
        </div>

        <p>动态 class（条件表达式）:</p>
        <div
          class={`box ${isActive() ? "active" : ""}`}
          style={{
            padding: "8px",
            background: isActive() ? "#4a2c8a" : "#f0f0f0",
            color: isActive() ? "white" : "black",
            "border-radius": "4px",
            transition: "all 0.3s",
          }}
        >
          {isActive() ? "激活" : "未激活"}
        </div>
        <button onClick={() => setIsActive(!isActive())}>切换激活状态</button>
      </section>

      <section>
        <h2>2. classList</h2>
        <div
          classList={{
            active: isActive(),
            disabled: isDisabled(),
          }}
          style={{
            padding: "8px",
            background: isDisabled() ? "#ccc" : isActive() ? "#4a2c8a" : "#f0f0f0",
            color: isDisabled() ? "#888" : isActive() ? "white" : "black",
            "border-radius": "4px",
            transition: "all 0.3s",
          }}
        >
          classList: active={isActive() ? "true" : "false"}, disabled={isDisabled() ? "true" : "false"}
        </div>
        <button onClick={() => setIsActive(!isActive())}>Toggle Active</button>
        <button onClick={() => setIsDisabled(!isDisabled())}>Toggle Disabled</button>
      </section>

      <section>
        <h2>3. 动态 style</h2>
        <div
          style={{
            padding: "12px",
            "font-size": `${fontSize()}px`,
            color: theme() === "dark" ? "white" : "black",
            background: theme() === "dark" ? "#333" : "#fff",
            border: "1px solid #ddd",
            "border-radius": "4px",
            transition: "all 0.3s",
          }}
        >
          动态样式演示 — 字号: {fontSize()}px, 主题: {theme()}
        </div>
        <div style={{ "margin-top": "8px" }}>
          <button onClick={() => setFontSize(Math.max(12, fontSize() - 2))}>A-</button>
          <button onClick={() => setFontSize(Math.min(32, fontSize() + 2))}>A+</button>
          <button onClick={() => setTheme(theme() === "light" ? "dark" : "light")}>切换主题</button>
        </div>
      </section>

      <section>
        <h2>4. 选项卡组件（classList 实战）</h2>
        <div style={{ display: "flex", "border-bottom": "2px solid #ddd" }}>
          <Index each={tabs}>
            {(tab, i) => (
              <button
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  "border-bottom": activeTab() === i ? "2px solid #4a2c8a" : "2px solid transparent",
                  color: activeTab() === i ? "#4a2c8a" : "#666",
                  "font-weight": activeTab() === i ? "bold" : "normal",
                  "margin-bottom": "-2px",
                }}
                onClick={() => setActiveTab(i)}
              >
                {tab()}
              </button>
            )}
          </Index>
        </div>
        <div style={{ padding: "16px", border: "1px solid #ddd", "border-top": "none", "border-radius": "0 0 4px 4px" }}>
          {tabs[activeTab()]}的内容
        </div>
      </section>
    </div>
  );
}
