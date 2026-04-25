import { createSignal, For, Index } from "solid-js";

interface UserItem {
  id: number;
  name: string;
}

export default function ListRendering() {
  let nextUserId = 4;
  const [users, setUsers] = createSignal<UserItem[]>([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [colors, setColors] = createSignal(["red", "green", "blue"]);
  const [input, setInput] = createSignal("");

  const addUser = () => {
    if (!input().trim()) return;
    const id = nextUserId++;
    setUsers((prev) => [...prev, { id, name: input().trim() }]);
    setInput("");
  };

  const removeUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>列表渲染</h1>

      <section>
        <h2>1. For — 按 key 渲染（对象数组）</h2>
        <input
          type="text"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
          placeholder="添加用户"
        />
        <button onClick={addUser}>添加</button>
        <ul>
          <For each={users()}>
            {(user, index) => (
              <li>
                #{index()} {user.name}
                <button onClick={() => removeUser(user.id)} style={{ "margin-left": "8px" }}>
                  删除
                </button>
              </li>
            )}
          </For>
        </ul>
        <p style={{ color: "#888" }}>
          💡 For: item 是直接值，index 是 Accessor。按值标识映射，重排时移动 DOM 而非重新创建
        </p>
      </section>

      <section>
        <h2>2. Index — 按索引渲染（原始值数组）</h2>
        <ul>
          <Index each={colors()}>
            {(color, index) => (
              <li style={{ color: color() }}>
                {index}: {color()}
                <input
                  type="text"
                  value={color()}
                  onInput={(e) =>
                    setColors((prev) => {
                      const next = [...prev];
                      next[index] = e.currentTarget.value;
                      return next;
                    })
                  }
                  style={{ "margin-left": "8px" }}
                />
              </li>
            )}
          </Index>
        </ul>
        <p style={{ color: "#888" }}>
          💡 Index: item 是 Accessor，index 是数字。按索引映射，适合输入框列表（不会丢失焦点）
        </p>
      </section>

      <section>
        <h2>3. For 的 fallback</h2>
        <For each={users().filter((u) => u.name.startsWith("Z"))} fallback={<p>没有以 Z 开头的用户</p>}>
          {(user) => <li>{user.name}</li>}
        </For>
      </section>
    </div>
  );
}
