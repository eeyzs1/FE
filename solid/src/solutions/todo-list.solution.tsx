import { createSignal, For, Show } from "solid-js";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function TodoListSolution() {
  let nextId = 1;
  const [todos, setTodos] = createSignal<Todo[]>([]);
  const [input, setInput] = createSignal("");

  const addTodo = () => {
    if (!input().trim()) return;
    const id = nextId++;
    setTodos((prev) => [...prev, { id, text: input().trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const remaining = () => todos().filter((t) => !t.done).length;

  return (
    <div style={{ padding: "20px", "max-width": "400px" }}>
      <h2>待办列表 — 参考答案</h2>
      <div style={{ "margin-bottom": "12px" }}>
        <input
          type="text"
          value={input()}
          onInput={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="添加待办事项"
          style={{ width: "200px", "margin-right": "8px" }}
        />
        <button onClick={addTodo}>添加</button>
      </div>
      <p>剩余: {remaining()}</p>
      <ul style={{ "list-style": "none", padding: 0 }}>
        <For each={todos()}>
          {(todo) => (
            <li style={{ display: "flex", "align-items": "center", gap: "8px", padding: "4px 0" }}>
              <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
              <span style={{ "text-decoration": todo.done ? "line-through" : "none", flex: 1 }}>
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>×</button>
            </li>
          )}
        </For>
      </ul>
      <Show when={todos().length === 0}>
        <p style={{ color: "#888" }}>暂无待办事项</p>
      </Show>
    </div>
  );
}
