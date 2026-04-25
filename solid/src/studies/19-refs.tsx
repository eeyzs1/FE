import { createSignal, onMount, createEffect, Show } from "solid-js";

export default function RefsDemo() {
  let variableRef!: HTMLInputElement;
  const [element, setElement] = createSignal<HTMLDivElement>();
  const [refInfo, setRefInfo] = createSignal("");

  onMount(() => {
    if (variableRef) {
      variableRef.focus();
      setRefInfo(`变量 Ref: input 元素已聚焦，value = "${variableRef.value}"`);
    }
  });

  createEffect(() => {
    const el = element();
    if (el) {
      console.log("Signal Ref 元素尺寸:", el.clientWidth, "x", el.clientHeight);
    }
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Refs 引用</h1>

      <section>
        <h2>1. 变量 Ref</h2>
        <input
          ref={variableRef}
          type="text"
          value="自动聚焦的输入框"
          style={{ padding: "4px 8px" }}
        />
        <p>{refInfo()}</p>
      </section>

      <section>
        <h2>2. 回调 Ref</h2>
        <p
          ref={(el) => {
            console.log("回调 Ref: 元素已创建，文本内容:", el.textContent);
          }}
        >
          这段文字使用了回调 Ref
        </p>
      </section>

      <section>
        <h2>3. Signal 作为 Ref</h2>
        <div
          ref={setElement}
          style={{ width: "200px", height: "80px", background: "#f0f0f0", "border-radius": "4px", display: "flex", "align-items": "center", "justify-content": "center" }}
        >
          Signal Ref 的 div
        </div>
        <Show when={element()}>
          <p>元素宽度: {element()?.clientWidth}px</p>
        </Show>
      </section>

      <section>
        <h2>4. 转发 Ref</h2>
        <ForwardRefDemo />
      </section>
    </div>
  );
}

function CustomInput(props: { ref?: HTMLInputElement; value?: string; onInput?: (e: InputEvent) => void }) {
  return (
    <input
      ref={props.ref}
      type="text"
      value={props.value}
      onInput={props.onInput}
      style={{ padding: "4px 8px" }}
    />
  );
}

function ForwardRefDemo() {
  let inputRef!: HTMLInputElement;

  return (
    <div>
      <CustomInput
        ref={inputRef}
        value="转发 Ref 的输入框"
      />
      <button onClick={() => inputRef?.focus()}>聚焦输入框</button>
    </div>
  );
}
