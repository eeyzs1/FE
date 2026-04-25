export default function JsxBasics() {
  const name = "SolidJS";
  const items = ["React", "Vue", "Solid", "Svelte"];
  const isSolid = true;

  return (
    <div style={{ padding: "20px" }}>
      <h1>JSX 基础</h1>

      <section>
        <h2>1. 花括号嵌入表达式</h2>
        <p>Hello, {name}!</p>
        <p>2 + 2 = {2 + 2}</p>
        <p>当前时间: {new Date().toLocaleTimeString()}</p>
      </section>

      <section>
        <h2>2. 内联样式（双花括号 + 驼峰命名）</h2>
        <p style={{ color: "blue", "font-size": "18px", "font-weight": "bold" }}>
          蓝色粗体文字
        </p>
      </section>

      <section>
        <h2>3. 条件渲染 — 三元表达式</h2>
        <p>{isSolid ? "这是 Solid!" : "这不是 Solid"}</p>
      </section>

      <section>
        <h2>4. 列表渲染（基础 .map）</h2>
        <ul>
          {items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
        <p style={{ color: "#888" }}>
          ⚠️ 注意：.map() 每次都会重新创建所有元素，生产环境推荐使用 {"<For>"}
        </p>
      </section>

      <section>
        <h2>5. 自闭合标签</h2>
        <input type="text" placeholder="必须自闭合" />
        <br />
        <img src="/favicon.svg" alt="Solid" width="40" />
      </section>
    </div>
  );
}
