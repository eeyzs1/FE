import { createSignal, createResource, Suspense, Switch, Match, For } from "solid-js";

const fetchUser = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch user ${id}: ${res.status}`);
  return res.json() as Promise<{ id: number; name: string; email: string }>;
};

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json() as Promise<{ id: number; title: string; body: string }[]>;
};

function UserData({ userId }: { userId: number }) {
  const [user] = createResource(() => userId, fetchUser);

  return (
    <div>
      <Switch>
        <Match when={user.error}>
          <p style={{ color: "red" }}>错误: {user.error?.message}</p>
        </Match>
        <Match when={user.loading}>
          <p>加载用户数据中...</p>
        </Match>
        <Match when={user()}>
          <div style={{ padding: "12px", border: "1px solid #ddd", "border-radius": "4px" }}>
            <p><strong>姓名:</strong> {user()!.name}</p>
            <p><strong>邮箱:</strong> {user()!.email}</p>
          </div>
        </Match>
      </Switch>
    </div>
  );
}

export default function ResourceDemo() {
  const [userId, setUserId] = createSignal(1);
  const [posts] = createResource(fetchPosts);

  return (
    <div style={{ padding: "20px" }}>
      <h1>createResource 数据获取</h1>

      <section>
        <h2>1. 基本数据获取</h2>
        <div style={{ "margin-bottom": "8px" }}>
          <button onClick={() => setUserId((id) => Math.max(1, id - 1))}>上一个</button>
          <span style={{ margin: "0 8px" }}>用户 ID: {userId()}</span>
          <button onClick={() => setUserId((id) => Math.min(10, id + 1))}>下一个</button>
        </div>
        <UserData userId={userId()} />
      </section>

      <section>
        <h2>2. Suspense 配合</h2>
        <Suspense fallback={<p>🌀 加载文章中...</p>}>
          <For each={posts()}>
            {(post) => (
              <div style={{ padding: "8px", "border-bottom": "1px solid #eee" }}>
                <strong>{post.title}</strong>
                <p style={{ "font-size": "14px", color: "#666" }}>{post.body.slice(0, 100)}...</p>
              </div>
            )}
          </For>
        </Suspense>
      </section>

      <section>
        <h2>3. mutate 和 refetch</h2>
        <MutateRefetchDemo />
      </section>
    </div>
  );
}

function MutateRefetchDemo() {
  const [user, { mutate, refetch }] = createResource(() => 1, fetchUser);

  return (
    <div>
      <Suspense fallback={<p>加载中...</p>}>
        {user() && <p>当前用户: {user()?.name}</p>}
      </Suspense>
      <button onClick={() => mutate({ id: 1, name: "乐观更新的名字", email: "optimistic@test.com" })}>
        乐观更新 (mutate)
      </button>
      <button onClick={() => refetch()}>重新获取 (refetch)</button>
    </div>
  );
}
