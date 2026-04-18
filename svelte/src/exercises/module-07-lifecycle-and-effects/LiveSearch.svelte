<script lang="ts">
  import { untrack } from 'svelte'

  let query = $state('')
  let results: string[] = $state([])
  let loading = $state(false)
  let error = $state('')

  const mockData = [
    'Svelte 5 Runes', 'SvelteKit 路由', 'Svelte Store', 'Svelte Actions',
    'Svelte Transitions', 'Svelte Snippets', 'Svelte SSR', 'Svelte 编译器',
    'TypeScript 集成', 'Vite 构建工具', '响应式原理', '组件设计模式',
  ]

  let searchVersion = 0

  async function search(q: string) {
    if (q.trim().length < 2) {
      results = []
      return
    }

    const currentVersion = ++searchVersion

    loading = true
    error = ''

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (currentVersion !== searchVersion) return

      results = mockData.filter(item =>
        item.toLowerCase().includes(q.toLowerCase())
      )
    } catch {
      error = '搜索出错，请重试'
    } finally {
      if (currentVersion === searchVersion) {
        loading = false
      }
    }
  }

  $effect(() => {
    const q = query
    const timer = setTimeout(() => search(q), 300)
    return () => clearTimeout(timer)
  })

  let preCount = $state(0)
  let preLog: string[] = $state([])

  $effect.pre(() => {
    preLog = [...preLog, `DOM 更新前: count=${preCount}`]
    if (preLog.length > 8) preLog = preLog.slice(-8)
  })

  let untrackCount = $state(0)
  let untrackOther = $state(0)
  let untrackLog: string[] = $state([])

  $effect(() => {
    const c = untrackCount
    untrack(() => {
      untrackLog = [...untrackLog, `追踪 count=${c}，忽略 other=${untrackOther}`]
      if (untrackLog.length > 6) untrackLog = untrackLog.slice(-6)
    })
  })

  let rootLog: string[] = $state([])
  let rootCount = $state(0)
  let rootDestroyed = $state(false)

  const destroy = $effect.root(() => {
    $effect(() => {
      if (rootDestroyed) return
      rootLog = [...rootLog, `root 内 effect: count=${rootCount}`]
      if (rootLog.length > 6) rootLog = rootLog.slice(-6)
    })
  })

  function handleDestroy() {
    rootDestroyed = true
    destroy()
  }

  let activeTab: 'search' | 'pre' | 'untrack' | 'root' | 'pitfalls' = $state('search')
</script>

<div class="effect-deep">
  <h2>生命周期与副作用深度</h2>
  <div class="tabs">
    <button class:active={activeTab === 'search'} onclick={() => activeTab = 'search'}>搜索防抖</button>
    <button class:active={activeTab === 'pre'} onclick={() => activeTab = 'pre'}>$effect.pre</button>
    <button class:active={activeTab === 'untrack'} onclick={() => activeTab = 'untrack'}>untrack</button>
    <button class:active={activeTab === 'root'} onclick={() => activeTab = 'root'}>$effect.root</button>
    <button class:active={activeTab === 'pitfalls'} onclick={() => activeTab = 'pitfalls'}>陷阱</button>
  </div>

  {#if activeTab === 'search'}
    <div class="tab-content">
      <h3>$effect — 响应式副作用</h3>
      <p class="hint">自动追踪依赖，依赖变化时重新执行。返回函数作为清理逻辑。</p>
      <div class="search-box">
        <input type="text" bind:value={query} placeholder="搜索 Svelte 相关内容..." />
        {#if loading}
          <span class="spinner">搜索中...</span>
        {/if}
      </div>
      {#if error}
        <p class="error">{error}</p>
      {/if}
      {#if results.length > 0}
        <ul class="results">
          {#each results as result}
            <li>{result}</li>
          {/each}
        </ul>
      {:else if query.length >= 2 && !loading}
        <p class="no-results">未找到相关结果</p>
      {/if}
    </div>

  {:else if activeTab === 'pre'}
    <div class="tab-content">
      <h3>$effect.pre — DOM 更新前执行</h3>
      <p class="hint">$effect 在 DOM 更新后执行，$effect.pre 在 DOM 更新前执行。适合在渲染前修改状态。</p>
      <button onclick={() => preCount++}>count: {preCount}</button>
      <div class="log-area">
        <p class="log-title">$effect.pre 日志:</p>
        {#each preLog as log}
          <p class="log-entry">{log}</p>
        {/each}
      </div>
      <p class="hint">典型场景：在 DOM 更新前读取元素旧尺寸，与更新后对比实现动画。</p>
    </div>

  {:else if activeTab === 'untrack'}
    <div class="tab-content">
      <h3>untrack — 选择性忽略依赖</h3>
      <p class="hint">在 $effect 中读取某些值但不将其作为依赖。避免不必要的重新执行。</p>
      <div class="controls">
        <button onclick={() => untrackCount++}>追踪的 count: {untrackCount}</button>
        <button onclick={() => untrackOther++}>忽略的 other: {untrackOther}</button>
      </div>
      <div class="log-area">
        <p class="log-title">日志（点击 other 不会触发新日志）:</p>
        {#each untrackLog as log}
          <p class="log-entry">{log}</p>
        {/each}
      </div>
    </div>

  {:else if activeTab === 'root'}
    <div class="tab-content">
      <h3>$effect.root — 非追踪作用域</h3>
      <p class="hint">创建一个不自动追踪依赖的 effect 作用域。内部的 $effect 仍正常追踪。返回销毁函数。</p>
      <div class="controls">
        <button onclick={() => rootCount++}>count: {rootCount}</button>
        <button onclick={handleDestroy} disabled={rootDestroyed}>销毁 root</button>
      </div>
      <div class="log-area">
        <p class="log-title">日志（销毁后不再更新）:</p>
        {#each rootLog as log}
          <p class="log-entry">{log}</p>
        {/each}
      </div>
      <p class="hint">用途：创建可手动销毁的副作用组，或与第三方库集成时控制生命周期。</p>
    </div>

  {:else if activeTab === 'pitfalls'}
    <div class="tab-content">
      <h3>$effect 使用陷阱</h3>
      <div class="pitfall">
        <h4>❌ 用 $effect 同步状态</h4>
        <pre class="code-block">// 错误：用 effect 派生状态
$effect(() =&gt; &#123;
  fullName = firstName + ' ' + lastName
&#125;)

// 正确：用 $derived
let fullName = $derived(firstName + ' ' + lastName)</pre>
      </div>
      <div class="pitfall">
        <h4>❌ 在 $effect 中写入自身依赖</h4>
        <pre class="code-block">// 错误：无限循环
$effect(() =&gt; &#123;
  count = count + 1 // count 是依赖又被写入
&#125;)</pre>
      </div>
      <div class="pitfall">
        <h4>✅ $effect 的正确用途</h4>
        <pre class="code-block">// DOM 操作、网络请求、订阅外部系统
$effect(() =&gt; &#123;
  const controller = new AbortController()
  fetch('/api?q=' + query, &#123; signal: controller.signal &#125;)
  return () =&gt; controller.abort()
&#125;)</pre>
      </div>
    </div>
  {/if}
</div>

<style>
  .effect-deep {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .tabs button {
    padding: 6px 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .tabs button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .tab-content { min-height: 200px; }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0 8px; }

  .search-box {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  input[type="text"] {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    font-size: 16px;
  }

  .spinner { color: var(--accent, #aa3bff); font-size: 14px; }

  .results {
    list-style: none;
    padding: 0;
    margin-top: 12px;
  }

  .results li {
    padding: 8px 12px;
    border-bottom: 1px solid var(--border, #e5e4e7);
    cursor: pointer;
  }

  .results li:hover {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
  }

  .error { color: #e74c3c; }
  .no-results { color: #95a5a6; font-style: italic; }

  .controls {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .controls button {
    padding: 6px 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
  }

  .log-area {
    margin-top: 8px;
    padding: 8px;
    background: var(--code-bg, #f4f3ec);
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
  }

  .log-title { font-weight: bold; font-size: 13px; margin: 0 0 4px; }
  .log-entry { font-family: var(--mono, monospace); font-size: 12px; margin: 2px 0; }

  .pitfall {
    margin-bottom: 12px;
    padding: 8px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.05));
    border-radius: 4px;
  }

  .pitfall h4 { margin: 0 0 4px; font-size: 14px; }

  .code-block {
    background: var(--code-bg, #f4f3ec);
    padding: 8px;
    border-radius: 4px;
    font-family: var(--mono, monospace);
    font-size: 12px;
    overflow-x: auto;
    white-space: pre;
    line-height: 1.4;
  }

  h3 { font-size: 16px; margin: 0 0 4px; }
</style>
