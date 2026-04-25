import { createSignal, For } from "solid-js";

export default function SignalsDeep() {
  const [count, setCount] = createSignal(0);
  const [message, setMessage] = createSignal("Hello");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Signals 深入</h1>

      <section>
        <h2>1. 基本信号操作</h2>
        <p>Count: {count()}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount(0)}>重置</button>
      </section>

      <section>
        <h2>2. 信号存储对象</h2>
        <p>Message: {message()}</p>
        <input
          type="text"
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
      </section>

      <section>
        <h2>3. 信号存储数组</h2>
        <SignalArrayDemo />
      </section>
    </div>
  );
}

function SignalArrayDemo() {
  const [items, setItems] = createSignal<string[]>(["Apple", "Banana"]);
  const [input, setInput] = createSignal("");

  const addItem = () => {
    if (input().trim()) {
      setItems((prev) => [...prev, input().trim()]);
      setInput("");
    }
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && addItem()}
      />
      <button onClick={addItem}>添加</button>
      <ul>
        <For each={items()}>
          {(item, index) => (
            <li>
              {item}
              <button onClick={() => removeItem(index())} style={{ "margin-left": "8px" }}>
                删除
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
