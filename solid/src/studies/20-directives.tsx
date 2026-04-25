import { createSignal, createRenderEffect, onCleanup } from "solid-js";
import type { Accessor, Setter } from "solid-js";

export function model(element: HTMLInputElement, value: () => [Accessor<string>, Setter<string>]) {
  const [field, setField] = value();
  const onInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    setField(target.value);
  };
  createRenderEffect(() => (element.value = field()));
  element.addEventListener("input", onInput);
  onCleanup(() => element.removeEventListener("input", onInput));
}

export function clickOutside(element: HTMLElement, callback: () => void) {
  const onClick = (e: MouseEvent) => {
    if (!element.contains(e.target as Node)) {
      callback();
    }
  };
  document.addEventListener("click", onClick);
  onCleanup(() => document.removeEventListener("click", onClick));
}

export function autosize(element: HTMLTextAreaElement) {
  const adjust = () => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };
  element.addEventListener("input", adjust);
  createRenderEffect(() => adjust());
  onCleanup(() => element.removeEventListener("input", adjust));
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [Accessor<string>, Setter<string>];
      clickOutside: () => void;
      autosize: true;
    }
  }
}

export default function DirectivesDemo() {
  const [name, setName] = createSignal("");
  const [message, setMessage] = createSignal("自动调整高度的文本框");
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>自定义指令</h1>

      <section>
        <h2>1. use:model — 双向绑定</h2>
        <input type="text" use:model={[name, setName]} placeholder="输入名字" />
        <p>名字: {name()}</p>
      </section>

      <section>
        <h2>2. use:clickOutside — 点击外部关闭</h2>
        <div
          style={{ position: "relative", display: "inline-block" }}
          use:clickOutside={() => setDropdownOpen(false)}
        >
          <button onClick={() => setDropdownOpen(!dropdownOpen())}>
            {dropdownOpen() ? "关闭" : "打开"}下拉菜单
          </button>
          {dropdownOpen() && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                background: "white",
                border: "1px solid #ddd",
                "border-radius": "4px",
                padding: "8px",
                "box-shadow": "0 2px 8px rgba(0,0,0,0.15)",
                "z-index": "100",
              }}
            >
              <p>菜单项 1</p>
              <p>菜单项 2</p>
              <p>菜单项 3</p>
            </div>
          )}
        </div>
        <p style={{ color: "#888" }}>💡 点击菜单外部区域会自动关闭</p>
      </section>

      <section>
        <h2>3. use:autosize — 自动调整高度</h2>
        <textarea
          use:autosize
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          style={{ width: "300px", "min-height": "40px", resize: "none" }}
          placeholder="输入多行文字..."
        />
      </section>

      <p style={{ color: "#888" }}>
        💡 自定义指令是回调 ref 的语法糖，提供更好的复用性。只能用于原生元素，不能用于自定义组件。
      </p>
    </div>
  );
}
