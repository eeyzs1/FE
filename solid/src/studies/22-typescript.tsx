import { createSignal } from "solid-js";
import type { Component, JSX } from "solid-js";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  keyFn: (item: T) => string | number;
}

function GenericList<T>(props: GenericListProps<T>) {
  return (
    <ul style={{ "list-style": "none", padding: 0 }}>
      {props.items.map((item, i) => (
        <li style={{ padding: "4px 0" }}>
          {props.renderItem(item, i)}
        </li>
      ))}
    </ul>
  );
}

interface User {
  id: number;
  name: string;
  email: string;
}

const MyComponent: Component<{ name: string; age?: number; children?: JSX.Element }> = (props) => {
  return (
    <div style={{ padding: "8px", border: "1px solid #4a2c8a", "border-radius": "4px", margin: "4px 0" }}>
      <p>Name: {props.name}</p>
      {props.age && <p>Age: {props.age}</p>}
      {props.children}
    </div>
  );
};

export default function TypeScriptDemo() {
  const [users] = createSignal<User[]>([
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" },
    { id: 3, name: "Charlie", email: "charlie@test.com" },
  ]);

  const [count, setCount] = createSignal<number>(0);
  const [name, setName] = createSignal<string>();

  return (
    <div style={{ padding: "20px" }}>
      <h1>TypeScript 与 SolidJS</h1>

      <section>
        <h2>1. Signal 类型</h2>
        <p>count: {count()} (类型: number)</p>
        <p>name: {name() ?? "undefined"} (类型: string | undefined)</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setName("Alice")}>设置 name</button>
      </section>

      <section>
        <h2>2. Component 类型</h2>
        <MyComponent name="TypeScript Demo" age={25}>
          <p>这是 children</p>
        </MyComponent>
      </section>

      <section>
        <h2>3. 泛型组件</h2>
        <GenericList
          items={users()}
          keyFn={(u) => u.id}
          renderItem={(user) => (
            <span>
              <strong>{user.name}</strong> — {user.email}
            </span>
          )}
        />
      </section>

      <section>
        <h2>4. Event 类型</h2>
        <input
          type="text"
          onInput={(e: InputEvent & { currentTarget: HTMLInputElement }) => {
            console.log("Input value:", e.currentTarget.value);
          }}
          placeholder="带类型的事件处理"
        />
      </section>
    </div>
  );
}
