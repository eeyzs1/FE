import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <header style={{
        height: 'var(--header-height)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        background: 'var(--color-bg)',
        zIndex: 100,
      }}>
        <Link href="/" style={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          color: 'var(--color-text)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          ⚡ Qwik 大师修炼
        </Link>
        <nav style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '20px',
        }}>
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            首页
          </Link>
          <Link href="/demo" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            示例
          </Link>
        </nav>
      </header>
      <main style={{
        flex: 1,
        maxWidth: 'var(--max-width)',
        width: '100%',
        margin: '0 auto',
        padding: '32px 24px',
      }}>
        <Slot />
      </main>
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '24px',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        fontSize: '0.85rem',
      }}>
        ⚡ Qwik 大师修炼教程 — 让用户下载得更少
      </footer>
    </>
  );
});
