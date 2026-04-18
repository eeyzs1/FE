import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const demos = [
    { href: '/demo/counter', title: '计数器 & 状态管理', desc: 'useSignal、useStore、useComputed$、bind:value', icon: '🔢' },
    { href: '/demo/events', title: '事件处理', desc: 'onClick$、$()、preventdefault:click、document 事件', icon: '🖱️' },
    { href: '/demo/lifecycle', title: '生命周期', desc: 'useVisibleTask$、useResource$、Resource 组件', icon: '⏱️' },
  ];

  return (
    <div>
      <h1>可运行示例</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        交互式演示 Qwik 核心概念，配合课程文档学习
      </p>

      <div style={{ display: 'grid', gap: '16px' }}>
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            style={{
              display: 'block',
              padding: '20px',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <h3 style={{ marginBottom: '4px' }}>
              {demo.icon} {demo.title}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {demo.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: '示例 - Qwik 教程',
};
