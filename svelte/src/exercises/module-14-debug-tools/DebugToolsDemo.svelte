<script lang="ts">
  let count = $state(0)
  let message = $state('hello')
  let logs: string[] = $state([])

  $inspect(count).with((type, value) => {
    logs = [...logs, `[${type}] count = ${value}`]
    if (logs.length > 10) logs = logs.slice(-10)
  })

  let isTracking = $derived($effect.tracking())

  let uid = $props.id()

  let activeTab: 'inspect' | 'tracking' | 'propsid' = $state('inspect')
</script>

<div class="debug-tools">
  <h2>调试与开发工具</h2>
  <div class="tabs">
    <button class:active={activeTab === 'inspect'} onclick={() => activeTab = 'inspect'}>$inspect</button>
    <button class:active={activeTab === 'tracking'} onclick={() => activeTab = 'tracking'}>$effect.tracking</button>
    <button class:active={activeTab === 'propsid'} onclick={() => activeTab = 'propsid'}>$props.id()</button>
  </div>

  {#if activeTab === 'inspect'}
    <div class="tab-content">
      <h3>$inspect — 响应式调试</h3>
      <p class="hint">类似 console.log，但在依赖变化时自动重新执行。仅开发环境有效。</p>
      <button onclick={() => count++}>count: {count}</button>
      <input type="text" bind:value={message} placeholder="输入消息..." />
      <div class="log-area">
        <p class="log-title">$inspect 日志:</p>
        {#each logs as log}
          <p class="log-entry">{log}</p>
        {/each}
      </div>
    </div>
  {:else if activeTab === 'tracking'}
    <div class="tab-content">
      <h3>$effect.tracking — 追踪上下文检测</h3>
      <p class="hint">判断当前代码是否在追踪上下文（effect 或模板）中执行</p>
      <p>组件初始化时: false</p>
      <p>模板中: {$effect.tracking()} → <strong>{isTracking ? '追踪中' : '未追踪'}</strong></p>
      <p class="hint">用于 createSubscriber 等高级抽象，只在被追踪时才注册监听器</p>
    </div>
  {:else if activeTab === 'propsid'}
    <div class="tab-content">
      <h3>$props.id() — 唯一实例 ID</h3>
      <p class="hint">为每个组件实例生成唯一 ID，SSR 时服务端/客户端一致</p>
      <label for="{uid}-name">姓名:</label>
      <input id="{uid}-name" type="text" />
      <label for="{uid}-email">邮箱:</label>
      <input id="{uid}-email" type="text" />
      <p class="hint">当前组件 ID: {uid}</p>
    </div>
  {/if}
</div>

<style>
  .debug-tools { max-width: 500px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .tab-content { min-height: 150px; }
  button { padding: 4px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; }
  input { padding: 4px 8px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; margin: 4px 0; }
  label { display: block; font-size: 14px; margin-top: 8px; }
  .log-area { margin-top: 8px; padding: 8px; background: var(--code-bg, #f4f3ec); border-radius: 4px; max-height: 200px; overflow-y: auto; }
  .log-title { font-weight: bold; font-size: 13px; margin: 0 0 4px; }
  .log-entry { font-family: var(--mono, monospace); font-size: 12px; margin: 2px 0; }
</style>
