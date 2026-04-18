<script lang="ts">
  let activeTab: 'routing' | 'pages' | 'layouts' | 'state' = $state('routing')
</script>

<div class="sveltekit-basics">
  <h2>SvelteKit 基础</h2>
  <p class="warning">⚠️ SvelteKit 需要独立项目。以下为概念演示和代码示例，请运行 <code>npx sv create</code> 创建 SvelteKit 项目实践。</p>

  <div class="tabs">
    <button class:active={activeTab === 'routing'} onclick={() => activeTab = 'routing'}>路由</button>
    <button class:active={activeTab === 'pages'} onclick={() => activeTab = 'pages'}>页面</button>
    <button class:active={activeTab === 'layouts'} onclick={() => activeTab = 'layouts'}>布局</button>
    <button class:active={activeTab === 'state'} onclick={() => activeTab = 'state'}>$app/state</button>
  </div>

  {#if activeTab === 'routing'}
    <div class="tab-content">
      <h3>文件系统路由</h3>
      <p class="hint">SvelteKit 基于文件系统自动生成路由，目录结构即路由结构</p>
      <pre class="code-block">src/routes/
├── +page.svelte          → /
├── about/
│   └── +page.svelte      → /about
├── blog/
│   ├── +page.svelte      → /blog
│   └── [slug]/
│       └── +page.svelte  → /blog/:slug
└── api/
    └── health/
        └── +server.js    → GET /api/health</pre>
      <p class="hint">[slug] 是动态参数，+server.js 是 API 端点</p>
    </div>
  {:else if activeTab === 'pages'}
    <div class="tab-content">
      <h3>+page.svelte + +page.js</h3>
      <p class="hint">页面组件 + 数据加载函数</p>
      <pre class="code-block">&lt;!-- +page.svelte --&gt;
&lt;script lang="ts"&gt;
  import type &#123; PageProps &#125; from './$types'
  let &#123; data &#125;: PageProps = $props()
&lt;/script&gt;

&lt;h1&gt;&#123;data.title&#125;&lt;/h1&gt;

// +page.js — 通用 load（浏览器+服务端）
// +page.server.js — 服务端 load（可访问数据库）</pre>
    </div>
  {:else if activeTab === 'layouts'}
    <div class="tab-content">
      <h3>+layout.svelte — 共享布局</h3>
      <p class="hint">布局包裹子页面，支持嵌套。必须包含 &#123;@render children()&#125;</p>
      <pre class="code-block">&lt;!-- src/routes/+layout.svelte --&gt;
&lt;script lang="ts"&gt;
  import type &#123; LayoutProps &#125; from './$types'
  let &#123; children &#125;: LayoutProps = $props()
&lt;/script&gt;

&lt;nav&gt;
  &lt;a href="/"&gt;首页&lt;/a&gt;
  &lt;a href="/about"&gt;关于&lt;/a&gt;
&lt;/nav&gt;

&#123;@render children()&#125;</pre>
    </div>
  {:else if activeTab === 'state'}
    <div class="tab-content">
      <h3>$app/state — 页面状态</h3>
      <p class="hint">访问当前 URL、参数、错误等页面级状态</p>
      <pre class="code-block">import &#123; page &#125; from '$app/state'

page.url      // 当前 URL 对象
page.params   // 路由参数 &#123; slug: '...' &#125;
page.status   // HTTP 状态码
page.error    // 错误对象
page.data     // 合并后的 load 数据</pre>
    </div>
  {/if}
</div>

<style>
  .sveltekit-basics { max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .warning { background: rgba(243, 156, 18, 0.1); padding: 8px; border-radius: 4px; font-size: 13px; margin-bottom: 12px; }
  .warning code { background: var(--code-bg, #f4f3ec); padding: 2px 4px; border-radius: 3px; }
  .tab-content { min-height: 150px; }
  .code-block { background: var(--code-bg, #f4f3ec); padding: 12px; border-radius: 6px; font-family: var(--mono, monospace); font-size: 13px; overflow-x: auto; white-space: pre; line-height: 1.5; }
</style>
