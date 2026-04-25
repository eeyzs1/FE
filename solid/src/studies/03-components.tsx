import { createSignal, onMount } from "solid-js";

function Header() {
  console.log("Header 组件执行 — 只执行一次！");
  return <header style={{ padding: "10px", background: "#4a2c8a", color: "white" }}>Header 组件</header>;
}

function Main(props: { children?: import("solid-js").JSX.Element }) {
  console.log("Main 组件执行 — 只执行一次！");
  return <main style={{ padding: "20px", "min-height": "200px" }}>{props.children}</main>;
}

function Footer() {
  console.log("Footer 组件执行 — 只执行一次！");
  return <footer style={{ padding: "10px", background: "#f0f0f0", "text-align": "center" }}>Footer 组件</footer>;
}

export default function ComponentBasics() {
  const [count, setCount] = createSignal(0);

  onMount(() => {
    console.log("App 组件已挂载 — onMount 只执行一次");
  });

  console.log("App 组件执行 — 只执行一次！count =", count());

  return (
    <div>
      <Header />
      <Main>
        <h2>组件基础</h2>
        <p>打开浏览器控制台，观察组件执行次数</p>
        <button onClick={() => setCount((c) => c + 1)}>
          点击 {count()} 次
        </button>
        <p style={{ color: "#888" }}>
          💡 点击按钮后，控制台不会再次打印 "组件执行" — 因为组件只执行一次！
        </p>
      </Main>
      <Footer />
    </div>
  );
}
