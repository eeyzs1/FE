import { createSignal, ErrorBoundary, Show } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";

function BuggyComponent(): never {
  throw new Error("这个组件故意抛出错误！");
}

const pages: Record<string, () => import("solid-js").JSX.Element> = {
  home: () => <div>🏠 首页内容</div>,
  about: () => <div>ℹ️ 关于页面</div>,
  contact: () => <div>📧 联系页面</div>,
};

export default function ErrorBoundaryDynamic() {
  const [showBuggy, setShowBuggy] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal<keyof typeof pages>("home");
  const [showModal, setShowModal] = createSignal(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Error Boundary / Dynamic / Portal</h1>

      <section>
        <h2>1. ErrorBoundary</h2>
        <button onClick={() => setShowBuggy(!showBuggy())}>
          {showBuggy() ? "隐藏" : "显示"}错误组件
        </button>
        <ErrorBoundary
          fallback={(error, reset) => (
            <div style={{ padding: "12px", background: "#fee", "border-radius": "4px" }}>
              <p>❌ 捕获到错误: {error.message}</p>
              <button onClick={reset}>重试</button>
            </div>
          )}
        >
          <Show when={showBuggy()}>
            <BuggyComponent />
          </Show>
        </ErrorBoundary>
        <Show when={!showBuggy()}>
          <p>✅ 正常运行中</p>
        </Show>
      </section>

      <section>
        <h2>2. Dynamic — 动态组件</h2>
        <div style={{ "margin-bottom": "8px" }}>
          <button onClick={() => setCurrentPage("home")}>首页</button>
          <button onClick={() => setCurrentPage("about")}>关于</button>
          <button onClick={() => setCurrentPage("contact")}>联系</button>
        </div>
        <div style={{ padding: "16px", border: "1px solid #ddd", "border-radius": "4px" }}>
          <Dynamic component={pages[currentPage()]} />
        </div>
      </section>

      <section>
        <h2>3. Portal — 模态框</h2>
        <button onClick={() => setShowModal(true)}>打开模态框</button>
        <Show when={showModal()}>
          <Portal>
            <div
              style={{
                position: "fixed",
                inset: "0",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                "z-index": "1000",
              }}
              onClick={() => setShowModal(false)}
            >
              <div
                style={{ background: "white", padding: "24px", "border-radius": "8px", "min-width": "300px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>模态框标题</h3>
                <p>这个模态框通过 Portal 渲染到 document.body</p>
                <button onClick={() => setShowModal(false)}>关闭</button>
              </div>
            </div>
          </Portal>
        </Show>
      </section>
    </div>
  );
}
