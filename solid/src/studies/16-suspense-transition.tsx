import { createSignal, createResource, Suspense, Show, useTransition } from "solid-js";

const fetchUser = async (id: number) => {
  await new Promise((r) => setTimeout(r, 800));
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user ${id}: ${res.status}`);
  return res.json() as Promise<{ id: number; name: string; email: string }>;
};

export default function SuspenseTransition() {
  const [userId, setUserId] = createSignal(1);
  const [user] = createResource(userId, fetchUser);
  const [pending, start] = useTransition();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Suspense 与 Transition</h1>

      <section>
        <h2>1. Suspense 基本用法</h2>
        <Suspense fallback={<p>🌀 加载用户数据中...</p>}>
          <Show when={user()}>
            <div style={{ padding: "12px", border: "1px solid #ddd", "border-radius": "4px" }}>
              <p><strong>姓名:</strong> {user()?.name}</p>
              <p><strong>邮箱:</strong> {user()?.email}</p>
            </div>
          </Show>
        </Suspense>
      </section>

      <section>
        <h2>2. useTransition — 平滑切换</h2>
        <div style={{ "margin-bottom": "8px" }}>
          <button
            onClick={() => start(() => setUserId((id) => Math.max(1, id - 1)))}
          >
            上一个
          </button>
          <span style={{ margin: "0 8px" }}>用户 ID: {userId()}</span>
          <button
            onClick={() => start(() => setUserId((id) => Math.min(10, id + 1)))}
          >
            下一个
          </button>
        </div>
        <p>
          {pending() ? "⏳ 过渡中..." : "✅ 就绪"}
        </p>
        <Suspense fallback={<p>🌀 加载中...</p>}>
          <Show when={user()}>
            <div style={{ padding: "12px", border: "1px solid #4a2c8a", "border-radius": "4px" }}>
              <p><strong>姓名:</strong> {user()?.name}</p>
              <p><strong>邮箱:</strong> {user()?.email}</p>
            </div>
          </Show>
        </Suspense>
        <p style={{ color: "#888" }}>
          💡 useTransition 延迟提交更新，直到异步数据就绪，避免回到 loading 状态
        </p>
      </section>
    </div>
  );
}
