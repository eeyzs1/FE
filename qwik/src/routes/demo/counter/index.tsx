import { component$, useSignal, useStore, useComputed$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const count = useSignal(0);
  const store = useStore({
    items: [
      { id: 1, text: '学习 Qwik' },
      { id: 2, text: '写代码' },
      { id: 3, text: '喝咖啡' },
    ],
    nextId: 4,
  });
  const newItem = useSignal('');
  const doubleCount = useComputed$(() => count.value * 2);

  return (
    <div>
      <h1>计数器 & 状态管理示例</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        演示 useSignal、useStore、useComputed$ 和 bind:value
      </p>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>useSignal — 计数器</h2>
        <p style={{ fontSize: '2rem', margin: '12px 0' }}>
          计数：<strong>{count.value}</strong>
        </p>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          双倍：<strong>{doubleCount.value}</strong>（useComputed$）
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button
            onClick$={() => count.value--}
            style={{ padding: '8px 16px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-bg)' }}
          >
            -1
          </button>
          <button
            onClick$={() => count.value = 0}
            style={{ padding: '8px 16px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-bg)' }}
          >
            重置
          </button>
          <button
            onClick$={() => count.value++}
            style={{ padding: '8px 16px', border: '1px solid var(--color-primary)', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}
          >
            +1
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>useStore — Todo 列表</h2>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="text"
            bind:value={newItem}
            placeholder="添加新任务..."
            style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
          />
          <button
            onClick$={() => {
              if (newItem.value.trim()) {
                store.items.push({ id: store.nextId, text: newItem.value.trim() });
                store.nextId++;
                newItem.value = '';
              }
            }}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', background: 'var(--color-primary)', color: 'white' }}
          >
            添加
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {store.items.map((item) => (
            <li key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <span>{item.text}</span>
              <button
                onClick$={() => {
                  const idx = store.items.findIndex((i) => i.id === item.id);
                  if (idx !== -1) store.items.splice(idx, 1);
                }}
                style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          共 {store.items.length} 项
        </p>
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: '计数器示例 - Qwik 教程',
};
