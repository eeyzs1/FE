<script lang="ts">
  import DynamicCounter from './DynamicCounter.svelte'
  import DynamicText from './DynamicText.svelte'
  import MouseTracker from './MouseTracker.svelte'

  let modals: { title: string; onClose: () => void }[] = $state([])

  function openModal(title: string) {
    modals = [...modals, { title, onClose: () => closeModal(title) }]
  }

  function closeModal(title: string) {
    modals = modals.filter(m => m.title !== title)
  }

  let windowWidth = $state(0)
  let scrollY = $state(0)

  let currentTag: string = $state('h2')

  let activeComponent: 'counter' | 'text' | null = $state(null)
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY />

<div class="advanced-demo">
  <h2>高级组件模式</h2>

  <div class="section">
    <h3>动态组件 & 模态框</h3>
    <button onclick={() => openModal('确认对话框')}>打开模态框 1</button>
    <button onclick={() => openModal('信息面板')}>打开模态框 2</button>

    {#each modals as modal (modal.title)}
      <div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" onkeydown={(e) => e.key === 'Escape' && closeModal(modal.title)}>
        <button class="modal-backdrop" onclick={() => closeModal(modal.title)} aria-label="关闭对话框"></button>
        <div class="modal-content">
          <h3>{modal.title}</h3>
          <p>这是 {modal.title} 的内容</p>
          <button onclick={() => closeModal(modal.title)}>关闭</button>
        </div>
      </div>
    {/each}
  </div>

  <div class="section">
    <h3>&lt;svelte:element&gt; — 动态 HTML 标签</h3>
    <p>当前标签: {currentTag}</p>
    <div class="tag-controls">
      {#each ['h1', 'h2', 'h3', 'p'] as tag}
        <button class:active={currentTag === tag} onclick={() => currentTag = tag}>{tag}</button>
      {/each}
    </div>
    <svelte:element this={currentTag}>我是动态 {currentTag} 标签</svelte:element>
  </div>

  <div class="section">
    <h3>动态组件切换（Svelte 5 runes 模式）</h3>
    <p class="hint">Svelte 5 runes 模式下组件天然动态，无需 svelte:component</p>
    <div class="tag-controls">
      <button class:active={activeComponent === 'counter'} onclick={() => activeComponent = 'counter'}>计数器</button>
      <button class:active={activeComponent === 'text'} onclick={() => activeComponent = 'text'}>文本</button>
      <button onclick={() => activeComponent = null}>清除</button>
    </div>
    {#if activeComponent === 'counter'}
      <DynamicCounter />
    {:else if activeComponent === 'text'}
      <DynamicText />
    {/if}
  </div>

  <div class="section">
    <h3>&lt;svelte:window&gt; 绑定</h3>
    <p>窗口宽度: {windowWidth}px</p>
    <p>滚动位置: {scrollY}px</p>
  </div>

  <div class="section">
    <h3>Renderless Component 模式</h3>
    <p class="hint">通过 $effect + snippet 实现无 UI 的逻辑复用组件</p>
    <MouseTracker>
      {#snippet children({ x, y })}
        <p>鼠标位置: {x}, {y}</p>
      {/snippet}
    </MouseTracker>
  </div>
</div>

<style>
  .advanced-demo {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .section {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    cursor: default;
    padding: 0;
  }

  .modal-content {
    position: relative;
    z-index: 1;
    background: var(--bg, #fff);
    padding: 24px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
  }

  .tag-controls {
    display: flex;
    gap: 4px;
    margin: 8px 0;
  }

  .tag-controls button, .section > button {
    padding: 4px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .tag-controls button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .hint {
    color: #95a5a6;
    font-size: 13px;
    margin-bottom: 8px;
  }
</style>
