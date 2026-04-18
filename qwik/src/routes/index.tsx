import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        ⚡ Qwik 大师修炼教程
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        从零到大师的 Qwik 完整学习路线，14 课掌握 Qwik 全栈开发
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '2rem',
      }}>
        <SectionCard title="🔰 基础篇" lessons={[
          { num: 1, title: '可恢复性', href: '/demo/counter' },
          { num: 2, title: '组件系统', href: '/demo/counter' },
          { num: 3, title: '状态管理', href: '/demo/counter' },
        ]} />
        <SectionCard title="⚡ 进阶篇" lessons={[
          { num: 4, title: '事件处理', href: '/demo/events' },
          { num: 5, title: '生命周期', href: '/demo/lifecycle' },
          { num: 6, title: '样式系统', href: '/demo/counter' },
        ]} />
        <SectionCard title="🏙️ 全栈篇" lessons={[
          { num: 7, title: '路由系统', href: '/demo/counter' },
          { num: 8, title: '布局系统', href: '/demo/counter' },
          { num: 9, title: '数据操作', href: '/demo/counter' },
          { num: 10, title: '中间件', href: '/demo/counter' },
        ]} />
        <SectionCard title="🎓 大师篇" lessons={[
          { num: 11, title: '最佳实践', href: '/demo/counter' },
          { num: 12, title: '毕业项目', href: '/demo/counter' },
          { num: 13, title: '部署', href: '/demo/counter' },
          { num: 14, title: '测试', href: '/demo/counter' },
        ]} />
      </div>

      <div style={{
        padding: '24px',
        background: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
      }}>
        <h2 style={{ marginBottom: '12px' }}>🚀 快速开始</h2>
        <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>从 <code>lessons/01-resumability.md</code> 开始按顺序阅读</li>
          <li>查看 <Link href="/demo/counter">计数器示例</Link> 体验 Qwik 的响应式</li>
          <li>查看 <Link href="/demo/events">事件示例</Link> 理解异步事件模型</li>
          <li>完成每课的动手练习</li>
        </ol>
      </div>
    </div>
  );
});

const SectionCard = component$(({ title, lessons }: { title: string; lessons: { num: number; title: string; href: string }[] }) => {
  return (
    <div style={{
      padding: '20px',
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
      background: 'var(--color-bg)',
    }}>
      <h3 style={{ marginBottom: '12px' }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lessons.map((l) => (
          <li key={l.num} style={{ marginBottom: '6px' }}>
            <Link href={l.href} style={{
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}>
              第 {l.num} 课：{l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Qwik 大师修炼教程',
  meta: [
    { name: 'description', content: '从零到大师的 Qwik 完整学习路线' },
  ],
};
