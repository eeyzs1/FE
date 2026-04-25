import { createSignal, mergeProps, splitProps, children } from "solid-js";
import type { JSX } from "solid-js";

interface GreetingProps {
  name: string;
  greeting?: string;
  age?: number;
}

function Greeting(props: GreetingProps) {
  const merged = mergeProps({ greeting: "Hello" }, props);
  return (
    <div style={{ padding: "8px", border: "1px solid #ddd", "border-radius": "4px", "margin-bottom": "8px" }}>
      <p>{merged.greeting}, {merged.name}! {merged.age ? `Age: ${merged.age}` : ""}</p>
    </div>
  );
}

interface ParentProps {
  name: string;
  age: number;
  email: string;
}

function PropsSplitter(props: ParentProps) {
  const [nameProps, ageProps, restProps] = splitProps(props, ["name"], ["age"]);
  return (
    <div style={{ padding: "8px", border: "1px solid #ddd", "border-radius": "4px" }}>
      <p>姓名: {nameProps.name}</p>
      <p>年龄: {ageProps.age}</p>
      <p>其他: {JSON.stringify(restProps)}</p>
    </div>
  );
}

function ChildrenDemo(props: { children: JSX.Element }) {
  const safeChildren = children(() => props.children);
  return (
    <div style={{ padding: "8px", border: "1px dashed #4a2c8a", "border-radius": "4px" }}>
      <p>使用 children() 安全获取子组件:</p>
      {safeChildren()}
    </div>
  );
}

function DestructureBadDemo(props: { name: string; count: () => number }) {
  return (
    <div style={{ padding: "8px", border: "1px solid red", "border-radius": "4px" }}>
      <p>✅ 正确: {props.name} - {props.count()}</p>
    </div>
  );
}

export default function PropsDemo() {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Props 属性传递</h1>

      <section>
        <h2>1. 基本 Props</h2>
        <Greeting name="Ryan" />
        <Greeting name="Amy" greeting="Hi" />
        <Greeting name="Bob" greeting="Hey" age={25} />
      </section>

      <section>
        <h2>2. mergeProps — 默认值</h2>
        <Greeting name="Default Greeting User" />
      </section>

      <section>
        <h2>3. splitProps — 拆分 Props</h2>
        <PropsSplitter name="Alice" age={30} email="alice@example.com" />
      </section>

      <section>
        <h2>4. children 辅助函数</h2>
        <ChildrenDemo>
          <span>这是子组件内容</span>
        </ChildrenDemo>
      </section>

      <section>
        <h2>5. Props 不能解构演示</h2>
        <button onClick={() => setCount((c) => c + 1)}>Count: {count()}</button>
        <DestructureBadDemo name="Test" count={count} />
        <p style={{ color: "#888" }}>
          ⚠️ 如果在子组件中解构 props（如 const {"{ count }"} = props），响应性会丢失！
        </p>
      </section>
    </div>
  );
}
