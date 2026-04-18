<script lang="ts">
  import { SvelteMap, SvelteSet, SvelteDate, SvelteURL, MediaQuery } from 'svelte/reactivity'

  let fruits = new SvelteSet<string>()
  let scores = new SvelteMap<string, number>()
  let now = new SvelteDate()
  let url = new SvelteURL('https://svelte.dev/docs')
  let isWide = new MediaQuery('min-width: 800px')

  let fruitInput = $state('')
  let scoreName = $state('')
  let scoreValue = $state(0)

  function addFruit() {
    if (fruitInput.trim()) { fruits.add(fruitInput.trim()); fruitInput = '' }
  }
  function removeFruit(f: string) { fruits.delete(f) }
  function addScore() {
    if (scoreName.trim()) { scores.set(scoreName.trim(), scoreValue); scoreName = ''; scoreValue = 0 }
  }

  $effect(() => {
    const interval = setInterval(() => now.setTime(Date.now()), 1000)
    return () => clearInterval(interval)
  })

  let activeTab: 'set' | 'map' | 'date' | 'url' | 'media' = $state('set')
</script>

<div class="reactive-builtins">
  <h2>svelte/reactivity — 响应式内置类型</h2>
  <div class="tabs">
    <button class:active={activeTab === 'set'} onclick={() => activeTab = 'set'}>SvelteSet</button>
    <button class:active={activeTab === 'map'} onclick={() => activeTab = 'map'}>SvelteMap</button>
    <button class:active={activeTab === 'date'} onclick={() => activeTab = 'date'}>SvelteDate</button>
    <button class:active={activeTab === 'url'} onclick={() => activeTab = 'url'}>SvelteURL</button>
    <button class:active={activeTab === 'media'} onclick={() => activeTab = 'media'}>MediaQuery</button>
  </div>

  {#if activeTab === 'set'}
    <div class="tab-content">
      <h3>SvelteSet — 响应式集合</h3>
      <p class="hint">自动追踪 has/add/delete，无需手动触发更新</p>
      <form onsubmit={(e) => { e.preventDefault(); addFruit() }}>
        <input type="text" bind:value={fruitInput} placeholder="添加水果..." />
        <button type="submit">添加</button>
      </form>
      <ul>{#each fruits as fruit}<li>{fruit} <button onclick={() => removeFruit(fruit)}>x</button></li>{/each}</ul>
      <p>集合大小: {fruits.size}</p>
      <p>包含苹果: {fruits.has('苹果') ? '是' : '否'}</p>
    </div>
  {:else if activeTab === 'map'}
    <div class="tab-content">
      <h3>SvelteMap — 响应式映射</h3>
      <p class="hint">自动追踪 get/set/has/delete，适合键值对场景</p>
      <form onsubmit={(e) => { e.preventDefault(); addScore() }}>
        <input type="text" bind:value={scoreName} placeholder="名字" />
        <input type="number" bind:value={scoreValue} placeholder="分数" />
        <button type="submit">添加</button>
      </form>
      <ul>{#each scores as [name, score]}<li>{name}: {score} <button onclick={() => scores.delete(name)}>x</button></li>{/each}</ul>
      <p>条目数: {scores.size}</p>
    </div>
  {:else if activeTab === 'date'}
    <div class="tab-content">
      <h3>SvelteDate — 响应式日期</h3>
      <p class="hint">读取日期属性时自动追踪，修改时自动更新</p>
      <p class="clock">{now.toLocaleTimeString()}</p>
      <p class="hint">每秒自动更新，无需手动刷新</p>
    </div>
  {:else if activeTab === 'url'}
    <div class="tab-content">
      <h3>SvelteURL — 响应式 URL</h3>
      <p class="hint">修改 URL 部分自动更新其他部分</p>
      <div class="url-fields">
        <label>协议: <input bind:value={url.protocol} /></label>
        <label>主机: <input bind:value={url.hostname} /></label>
        <label>路径: <input bind:value={url.pathname} /></label>
      </div>
      <p class="url-result">完整 URL: {url.href}</p>
    </div>
  {:else if activeTab === 'media'}
    <div class="tab-content">
      <h3>MediaQuery — 响应式媒体查询</h3>
      <p class="hint">在 JS 中响应 CSS 媒体查询变化</p>
      <p>当前屏幕: <strong>{isWide.current ? '宽屏 (≥800px)' : '窄屏 (<800px)'}</strong></p>
      <p class="hint">调整浏览器窗口大小观察变化</p>
    </div>
  {/if}
</div>

<style>
  .reactive-builtins { max-width: 500px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .tab-content { min-height: 150px; }
  form { display: flex; gap: 4px; margin-bottom: 8px; }
  input { padding: 4px 8px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; }
  button { padding: 4px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; }
  ul { list-style: none; padding: 0; }
  li { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid var(--border, #e5e4e7); }
  .clock { font-size: 32px; font-family: var(--mono, monospace); text-align: center; }
  .url-fields { display: flex; flex-direction: column; gap: 4px; }
  .url-fields label { display: flex; gap: 8px; align-items: center; font-size: 14px; }
  .url-result { margin-top: 8px; padding: 8px; background: var(--code-bg, #f4f3ec); border-radius: 4px; font-size: 13px; word-break: break-all; }
</style>
