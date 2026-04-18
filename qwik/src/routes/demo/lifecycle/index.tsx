import { component$, useSignal, useVisibleTask$, useResource$, Resource } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default component$(() => {
  const time = useSignal('');
  const userId = useSignal('1');

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const update = () => (time.value = new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    cleanup(() => clearInterval(id));
  });

  const userResource = useResource$<User>(async ({ track }) => {
    const id = track(() => userId.value);
    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId < 1 || numericId > 10) {
      throw new Error('用户 ID 必须在 1-10 之间');
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${numericId}`, {
        signal: controller.signal,
      });
      if (!res.ok) {
        throw new Error(`请求失败：${res.status}`);
      }
      return res.json();
    } finally {
      clearTimeout(timeoutId);
    }
  });

  return (
    <div>
      <h1>生命周期示例</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        演示 useVisibleTask$、useResource$ 和 Resource 组件
      </p>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>useVisibleTask$ — 实时时钟</h2>
        <p style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)' }}>
          🕐 {time.value}
        </p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '8px' }}>
          使用 useVisibleTask$ + setInterval 实现，组件销毁时自动清理
        </p>
      </section>

      <section style={{ marginBottom: '2rem', padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
        <h2>useResource$ — 异步数据加载</h2>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ marginRight: '8px' }}>用户 ID（1-10）：</label>
          <input
            type="number"
            bind:value={userId}
            min={1}
            max={10}
            style={{ padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: '4px', width: '80px' }}
          />
        </div>
        <Resource
          value={userResource}
          onPending={() => <p style={{ color: 'var(--color-text-secondary)' }}>⏳ 加载中...</p>}
          onRejected={(reason) => <p style={{ color: '#ef4444' }}>❌ {reason.message || '加载失败'}</p>}
          onResolved={(user) => (
            <div style={{ padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
              <p><strong>姓名：</strong>{user.name}</p>
              <p><strong>邮箱：</strong>{user.email}</p>
              <p><strong>电话：</strong>{user.phone}</p>
              <p><strong>网站：</strong>{user.website}</p>
            </div>
          )}
        />
      </section>
    </div>
  );
});

export const head: DocumentHead = {
  title: '生命周期示例 - Qwik 教程',
};
