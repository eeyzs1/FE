import { createSignal, Show, Switch, Match } from "solid-js";

export default function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [user, setUser] = createSignal<{ name: string; role: string } | null>(null);
  const [status, setStatus] = createSignal<"idle" | "loading" | "success" | "error">("idle");

  const login = () => {
    setIsLoggedIn(true);
    setUser({ name: "Alice", role: "admin" });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const simulateFetch = () => {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>条件渲染</h1>

      <section>
        <h2>1. Show 组件</h2>
        <Show
          when={isLoggedIn()}
          fallback={<button onClick={login}>登录</button>}
        >
          <div>
            <p>欢迎回来！</p>
            <button onClick={logout}>登出</button>
          </div>
        </Show>
      </section>

      <section>
        <h2>2. Show 的函数子元素</h2>
        <Show when={user()}>
          {(u) => <p>用户名: {u().name}, 角色: {u().role}</p>}
        </Show>
      </section>

      <section>
        <h2>3. Show 的 keyed 属性</h2>
        <Show when={user()} keyed>
          {(u) => <p>直接访问: {u.name} ({u.role})</p>}
        </Show>
        <p style={{ color: "#888" }}>
          💡 keyed=true 时，when 值变化会重新创建子元素；keyed=false（默认）只在真假切换时更新
        </p>
      </section>

      <section>
        <h2>4. Switch / Match</h2>
        <button onClick={simulateFetch}>模拟请求</button>
        <button onClick={() => setStatus("idle")}>重置</button>
        <Switch fallback={<p>未知状态</p>}>
          <Match when={status() === "idle"}>
            <p>空闲 — 点击按钮模拟请求</p>
          </Match>
          <Match when={status() === "loading"}>
            <p>加载中...</p>
          </Match>
          <Match when={status() === "success"}>
            <p style={{ color: "green" }}>成功！</p>
          </Match>
          <Match when={status() === "error"}>
            <p style={{ color: "red" }}>出错了</p>
          </Match>
        </Switch>
      </section>

      <section>
        <h2>5. 三元表达式 vs Show</h2>
        <p>{isLoggedIn() ? "已登录（三元表达式）" : "未登录（三元表达式）"}</p>
        <p style={{ color: "#888" }}>
          💡 三元表达式每次条件变化都会重新创建元素；Show 会保留 DOM 节点
        </p>
      </section>
    </div>
  );
}
