import { createSignal, createRoot, onCleanup, For } from "solid-js";
import { createMutable, createStore, produce, reconcile, unwrap } from "solid-js/store";

export default function AdvancedStore() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>高级响应式工具</h1>

      <section>
        <h2>1. createRoot — 独立响应式上下文</h2>
        <CreateRootDemo />
      </section>

      <section>
        <h2>2. createMutable vs createStore</h2>
        <MutableVsStoreDemo />
      </section>

      <section>
        <h2>3. produce 和 reconcile</h2>
        <ProduceReconcileDemo />
      </section>
    </div>
  );
}

function CreateRootDemo() {
  const counter = createRoot((dispose) => {
    const [count, setCount] = createSignal(0);
    onCleanup(() => console.log("createRoot: 已释放！"));
    return { count, increment: () => setCount((c) => c + 1), dispose };
  });

  return (
    <div>
      <p>组件外的计数器: {counter.count()}</p>
      <button onClick={counter.increment}>+1</button>
      <button onClick={counter.dispose}>释放（dispose）</button>
      <p style={{ color: "#888" }}>
        💡 createRoot 创建独立响应式上下文，适合在组件外创建全局状态。需要手动 dispose 防止内存泄漏。
      </p>
    </div>
  );
}

function MutableVsStoreDemo() {
  const mutable = createMutable({ count: 0, items: [] as string[] });
  const [store, setStore] = createStore({ count: 0, items: [] as string[] });

  return (
    <div>
      <div style={{ "margin-bottom": "12px" }}>
        <p><strong>createMutable:</strong> {mutable.count}</p>
        <button onClick={() => mutable.count++}>直接修改 mutable.count++</button>
        <button onClick={() => mutable.items.push(`item-${mutable.items.length}`)}>直接 push</button>
      </div>
      <div>
        <p><strong>createStore:</strong> {store.count}</p>
        <button onClick={() => setStore("count", (c) => c + 1)}>setStore("count", c =&gt; c + 1)</button>
        <button onClick={() => setStore("items", (items) => [...items, `item-${items.length}`])}>setStore 不可变更新</button>
      </div>
      <p style={{ color: "#888" }}>
        ⚠️ createMutable 允许直接修改，可能破坏单向数据流，谨慎使用。推荐使用 createStore。
      </p>
    </div>
  );
}

function ProduceReconcileDemo() {
  let nextId = 3;
  const [store, setStore] = createStore({
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  });

  const addWithProduce = () => {
    nextId++;
    setStore(
      produce((s) => {
        s.users.push({ id: nextId, name: `User ${s.users.length + 1}` });
      })
    );
  };

  const updateWithReconcile = () => {
    const serverData = {
      users: [
        { id: 1, name: "Alice (Updated)" },
        { id: 2, name: "Bob (Updated)" },
        { id: 3, name: "Charlie (New)" },
      ],
    };
    setStore(reconcile(serverData));
  };

  const showRaw = () => {
    console.log("Raw store data:", unwrap(store));
  };

  return (
    <div>
      <ul>
        <For each={store.users}>
          {(u) => <li>{u.name}</li>}
        </For>
      </ul>
      <button onClick={addWithProduce}>produce 添加</button>
      <button onClick={updateWithReconcile}>reconcile 更新（模拟服务端数据）</button>
      <button onClick={showRaw}>unwrap 查看原始数据（控制台）</button>
      <p style={{ color: "#888" }}>
        💡 produce 类似 Immer 的写法；reconcile 智能对比新旧数据，只更新变化的部分
      </p>
    </div>
  );
}
