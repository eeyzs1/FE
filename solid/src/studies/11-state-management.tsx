import { createSignal, createMemo, For, Switch, Match } from "solid-js";
import { createStore } from "solid-js/store";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function StateManagementDemo() {
  const [todos, setTodos] = createStore<Todo[]>([
    { id: 1, text: "学习 SolidJS", done: false },
    { id: 2, text: "完成练习", done: true },
    { id: 3, text: "构建项目", done: false },
  ]);
  const [input, setInput] = createSignal("");
  const [filter, setFilter] = createSignal<"all" | "active" | "done">("all");

  const filteredTodos = createMemo(() => {
    const f = filter();
    if (f === "active") return todos.filter((t) => !t.done);
    if (f === "done") return todos.filter((t) => t.done);
    return [...todos];
  });

  const remaining = createMemo(() => todos.filter((t) => !t.done).length);

  const addTodo = () => {
    if (!input().trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input().trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      (t) => t.id === id,
      "done",
      (done) => !done
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>状态管理模式</h1>

      <section>
        <h2>待办事项 — 综合状态管理示例</h2>

        <div style={{ "margin-bottom": "12px" }}>
          <input
            type="text"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="添加待办事项"
          />
          <button onClick={addTodo}>添加</button>
        </div>

        <div style={{ "margin-bottom": "12px" }}>
          <button onClick={() => setFilter("all")}>全部</button>
          <button onClick={() => setFilter("active")}>未完成</button>
          <button onClick={() => setFilter("done")}>已完成</button>
          <span style={{ "margin-left": "12px" }}>剩余: {remaining()}</span>
        </div>

        <ul style={{ "list-style": "none", padding: 0 }}>
          <For each={filteredTodos()}>
            {(todo) => (
              <li style={{ padding: "4px 0", display: "flex", "align-items": "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span style={{ "text-decoration": todo.done ? "line-through" : "none", flex: 1 }}>
                  {todo.text}
                </span>
                <button onClick={() => removeTodo(todo.id)}>删除</button>
              </li>
            )}
          </For>
        </ul>
      </section>

      <section>
        <h2>状态管理策略总结</h2>
        <Switch>
          <Match when={filter() === "all"}>
            <p>当前查看: 所有待办事项</p>
          </Match>
          <Match when={filter() === "active"}>
            <p>当前查看: 未完成的待办事项</p>
          </Match>
          <Match when={filter() === "done"}>
            <p>当前查看: 已完成的待办事项</p>
          </Match>
        </Switch>
        <p style={{ color: "#888" }}>
          💡 本示例综合使用了: createStore + createMemo + For + Switch/Match
        </p>
      </section>
    </div>
  );
}
