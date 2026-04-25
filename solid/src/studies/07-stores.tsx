import { createSignal, For } from "solid-js";
import { createStore, produce } from "solid-js/store";

interface User {
  id: number;
  username: string;
  location: string;
}

export default function StoresDemo() {
  const [userCount, setUserCount] = createSignal(3);
  let nextId = 3;
  const [store, setStore] = createStore({
    userCount: 3,
    users: [
      { id: 0, username: "felix909", location: "England" },
      { id: 1, username: "tracy634", location: "Canada" },
      { id: 2, username: "michael584", location: "Nigeria" },
    ] as User[],
  });

  const [newName, setNewName] = createSignal("");
  const [newLocation, setNewLocation] = createSignal("");

  const addUser = () => {
    if (!newName().trim()) return;
    nextId++;
    setStore("users", (currentUsers) => [
      ...currentUsers,
      {
        id: nextId,
        username: newName().trim(),
        location: newLocation().trim() || "Unknown",
      },
    ]);
    setStore("userCount", (c) => c + 1);
    setUserCount((c) => c + 1);
    setNewName("");
    setNewLocation("");
  };

  const updateUsername = (index: number, newName: string) => {
    setStore("users", index, "username", newName);
  };

  const removeUser = (id: number) => {
    setStore(
      "users",
      (currentUsers) => currentUsers.filter((u) => u.id !== id)
    );
    setStore("userCount", (c) => c - 1);
  };

  const addUserWithProduce = () => {
    nextId++;
    setStore(
      produce((s) => {
        s.users.push({
          id: nextId,
          username: `user_${Date.now()}`,
          location: "Produce Land",
        });
        s.userCount = s.users.length;
      })
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stores 状态管理</h1>

      <section>
        <h2>1. Store vs Signal</h2>
        <p>Signal userCount: {userCount()}</p>
        <p>Store userCount: {store.userCount}</p>
        <p style={{ color: "#888" }}>
          💡 Store 属性直接访问（不需要 ()），但仍然具有响应性
        </p>
      </section>

      <section>
        <h2>2. 用户列表（CRUD）</h2>
        <div style={{ "margin-bottom": "12px" }}>
          <input
            type="text"
            placeholder="用户名"
            value={newName()}
            onInput={(e) => setNewName(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="地区"
            value={newLocation()}
            onInput={(e) => setNewLocation(e.currentTarget.value)}
          />
          <button onClick={addUser}>添加</button>
        </div>
        <ul>
          <For each={store.users}>
            {(user, index) => (
              <li>
                <span>
                  {user.username} ({user.location})
                </span>
                <button
                  onClick={() => updateUsername(index(), `renamed_${user.id}`)}
                  style={{ "margin-left": "8px" }}
                >
                  改名
                </button>
                <button
                  onClick={() => removeUser(user.id)}
                  style={{ "margin-left": "4px" }}
                >
                  删除
                </button>
              </li>
            )}
          </For>
        </ul>
      </section>

      <section>
        <h2>3. produce 更新</h2>
        <button onClick={addUserWithProduce}>用 produce 添加用户</button>
        <p style={{ color: "#888" }}>
          💡 produce 类似 Immer，可以在回调中"直接修改"状态
        </p>
      </section>
    </div>
  );
}
