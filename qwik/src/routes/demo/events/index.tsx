import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const clickCount = useSignal(0);
  const lastEvent = useSignal('');
  const inputText = useSignal('');
  const mousePos = useSignal({ x: 0, y: 0, _lastUpdate: 0 });

  const handleClick = $((event: Event, el: Element) => {
    clickCount.value++;
    lastEvent.value = `click on <${el.tagName.toLowerCase()}>`;
  });

  return (
    <div>
      <h1>事件处理示例</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        演示 onClick$、$()、preventdefault:click、bind:value 和事件对象
      </p>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>onClick$ — 点击事件</h2>
        <p>点击次数：<strong>{clickCount.value}</strong></p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>上次事件：{lastEvent.value}</p>
        <button
          onClick$={handleClick}
          style={{ marginTop: '12px', padding: '8px 16px', border: '1px solid var(--color-primary)', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}
        >
          点击我
        </button>
      </section>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>preventdefault:click — 阻止默认行为</h2>
        <a
          href="https://qwik.dev"
          preventdefault:click
          onClick$={() => { lastEvent.value = '链接点击被阻止！'; }}
          style={{ color: 'var(--color-primary)', cursor: 'pointer' }}
        >
          点击这个链接不会跳转（preventdefault:click）
        </a>
      </section>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>bind:value — 双向绑定</h2>
        <input
          type="text"
          bind:value={inputText}
          placeholder="输入文字..."
          style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '4px', width: '100%', maxWidth: '300px' }}
        />
        <p style={{ marginTop: '8px' }}>
          实时值：<strong>{inputText.value || '（空）'}</strong>
        </p>
      </section>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}
        document:onMouseMove$={(ev) => {
          const mouseEvent = ev as MouseEvent;
          const now = Date.now();
          if (!mousePos.value._lastUpdate || now - mousePos.value._lastUpdate > 50) {
            mousePos.value = { x: mouseEvent.clientX, y: mouseEvent.clientY, _lastUpdate: now };
          }
        }}
      >
        <h2>document:onMouseMove$ — 全局事件</h2>
        <p>移动鼠标查看坐标：</p>
        <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
          X: {mousePos.value.x}, Y: {mousePos.value.y}
        </p>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: '事件示例 - Qwik 教程',
};
