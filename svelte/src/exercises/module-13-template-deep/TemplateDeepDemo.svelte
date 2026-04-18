<script lang="ts">
  let userId = $state('')
  let userPromise: Promise<{ name: string; email: string }> | null = $state(null)

  function fetchUser() {
    if (!userId.trim()) return
    userPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: `用户${userId}`, email: `${userId}@example.com` }), 1500)
    })
  }

  let showKeyDemo = $state(true)
  let keyCounter = $state(0)

  let htmlContent = $state('<strong>这是安全渲染的 HTML</strong>')

  let items = $state(['A', 'B', 'C'])
  let newItem = $state('')
  let keyedCount = $state(0)

  function addItem() {
    if (newItem.trim()) { items = [...items, newItem.trim()]; newItem = '' }
  }

  let activeTab: 'await' | 'key' | 'html' | 'spread' = $state('await')

  const baseProps = { class: 'demo-box', style: 'padding: 12px;' }
  const overrideProps = { class: 'demo-box highlighted', style: 'padding: 16px; border: 2px solid #aa3bff;' }
</script>

<div class="template-deep">
  <h2>模板语法深度</h2>
  <div class="tabs">
    <button class:active={activeTab === 'await'} onclick={() => activeTab = 'await'}>{'#await'}</button>
    <button class:active={activeTab === 'key'} onclick={() => activeTab = 'key'}>{'#key'}</button>
    <button class:active={activeTab === 'html'} onclick={() => activeTab = 'html'}>{'{@html}'}</button>
    <button class:active={activeTab === 'spread'} onclick={() => activeTab = 'spread'}>Spread</button>
  </div>

  {#if activeTab === 'await'}
    <div class="tab-content">
      <h3>{'#await'} — Promise 状态分支</h3>
      <p class="hint">根据 Promise 的三种状态（pending/fulfilled/rejected）渲染不同内容</p>
      <form onsubmit={(e) => { e.preventDefault(); fetchUser() }}>
        <input type="text" bind:value={userId} placeholder="输入用户 ID..." />
        <button type="submit">查询</button>
      </form>
      {#if userPromise}
        {#await userPromise}
          <p class="loading">加载中...</p>
        {:then user}
          <div class="result"><p>姓名: {user.name}</p><p>邮箱: {user.email}</p></div>
        {:catch error}
          <p class="error">错误: {error.message}</p>
        {/await}
      {/if}
    </div>
  {:else if activeTab === 'key'}
    <div class="tab-content">
      <h3>{'#key'} — 键控重新创建</h3>
      <p class="hint">当 key 值变化时，销毁并重新创建内部内容。适合强制重置组件状态。</p>
      <p>计数器: {keyCounter}</p>
      <button onclick={() => keyCounter++}>改变 key ({keyCounter})</button>
      {#key keyCounter}
        <KeyedCounter />
      {/key}
    </div>
  {:else if activeTab === 'html'}
    <div class="tab-content">
      <h3>{'{@html}'} — 原始 HTML 渲染</h3>
      <p class="hint">绕过 HTML 转义，直接渲染 HTML 字符串。⚠️ 必须确保内容安全，防止 XSS！</p>
      <input type="text" bind:value={htmlContent} style="width: 100%" />
      <div class="html-preview">
        <p>渲染结果:</p>
        {@html htmlContent}
      </div>
    </div>
  {:else if activeTab === 'spread'}
    <div class="tab-content">
      <h3>Spread 属性</h3>
      <p class="hint">用 {'{...obj}'} 批量传递属性，后写的属性优先级更高</p>
      <div {...baseProps}>基础样式</div>
      <div {...overrideProps}>覆盖样式</div>
      <p class="hint">{'{@const}'} 只能用在 {'{#if}'}/{'{#each}'} 等块内部，普通作用域用 script 中的 const</p>
    </div>
  {/if}
</div>

{#snippet KeyedCounter()}
  <div class="keyed-counter">
    <p>内部计数: {keyedCount}</p>
    <button onclick={() => keyedCount++}>+1</button>
    <p class="hint">key 变化时此组件会被销毁重建，计数归零</p>
  </div>
{/snippet}

<style>
  .template-deep { max-width: 500px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .tab-content { min-height: 150px; }
  form { display: flex; gap: 4px; margin-bottom: 8px; }
  input { padding: 4px 8px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; flex: 1; }
  button { padding: 4px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; }
  .loading { color: #f39c12; }
  .result { padding: 8px; background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-radius: 4px; }
  .error { color: #e74c3c; }
  .html-preview { margin-top: 8px; padding: 8px; background: var(--code-bg, #f4f3ec); border-radius: 4px; }
  .keyed-counter { margin-top: 8px; padding: 8px; background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-radius: 4px; }
  :global(.demo-box) { margin: 4px 0; border-radius: 4px; background: var(--accent-bg, rgba(170, 59, 255, 0.1)); }
  :global(.highlighted) { font-weight: bold; }
</style>
