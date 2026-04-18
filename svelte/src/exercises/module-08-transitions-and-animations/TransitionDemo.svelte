<script lang="ts">
  import { fade, fly, slide, scale } from 'svelte/transition'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { tweened, spring } from 'svelte/motion'
  import { quintOut } from 'svelte/easing'

  type Item = { id: number; text: string }

  let items: Item[] = $state([])
  let nextId = $state(1)
  let showPanel = $state(true)
  let transitionType: 'fade' | 'fly' | 'slide' | 'scale' = $state('fade')

  function addItem() {
    items = [...items, { id: nextId++, text: `项目 ${nextId - 1}` }]
  }

  function removeItem(id: number) {
    items = items.filter(item => item.id !== id)
  }

  const [send, receive] = crossfade({
    duration: () => 300,
  })

  let listA: Item[] = $state([
    { id: 1, text: '苹果' },
    { id: 2, text: '香蕉' },
    { id: 3, text: '橙子' },
  ])
  let listB: Item[] = $state([])

  function moveToB(id: number) {
    const item = listA.find(i => i.id === id)
    if (item) {
      listA = listA.filter(i => i.id !== id)
      listB = [...listB, item]
    }
  }

  function moveToA(id: number) {
    const item = listB.find(i => i.id === id)
    if (item) {
      listB = listB.filter(i => i.id !== id)
      listA = [...listA, item]
    }
  }

  let progress = tweened(0, { duration: 400, easing: quintOut })
  let coords = spring({ x: 100, y: 100 }, { stiffness: 0.1, damping: 0.5 })

  let activeTab: 'transitions' | 'crossfade' | 'motion' = $state('transitions')
</script>

<div class="transition-demo">
  <h2>过渡与动画</h2>

  <div class="tabs">
    <button class:active={activeTab === 'transitions'} onclick={() => activeTab = 'transitions'}>过渡效果</button>
    <button class:active={activeTab === 'crossfade'} onclick={() => activeTab = 'crossfade'}>Crossfade</button>
    <button class:active={activeTab === 'motion'} onclick={() => activeTab = 'motion'}>Motion</button>
  </div>

  {#if activeTab === 'transitions'}
    <div class="tab-content">
      <div class="controls">
        <label for="transition-select">过渡类型:</label>
        <select id="transition-select" bind:value={transitionType}>
          <option value="fade">Fade</option>
          <option value="fly">Fly</option>
          <option value="slide">Slide</option>
          <option value="scale">Scale</option>
        </select>

        <button onclick={addItem}>添加项目</button>
        <button onclick={() => showPanel = !showPanel}>切换面板</button>
      </div>

      {#if showPanel}
        <div class="panel">
          {#if transitionType === 'fade'}
            <div transition:fade={{ duration: 300 }}>
              <p>使用了 fade 过渡效果。</p>
            </div>
          {:else if transitionType === 'fly'}
            <div transition:fly={{ x: 200, duration: 300 }}>
              <p>使用了 fly 过渡效果。</p>
            </div>
          {:else if transitionType === 'slide'}
            <div transition:slide={{ duration: 300 }}>
              <p>使用了 slide 过渡效果。</p>
            </div>
          {:else if transitionType === 'scale'}
            <div transition:scale={{ duration: 300 }}>
              <p>使用了 scale 过渡效果。</p>
            </div>
          {/if}
        </div>
      {/if}

      <ul class="item-list">
        {#each items as item (item.id)}
          <li animate:flip={{ duration: 200 }}>
            {#if transitionType === 'fade'}
              <div transition:fade={{ duration: 200 }}>
                <span>{item.text}</span>
                <button class="remove" onclick={() => removeItem(item.id)}>x</button>
              </div>
            {:else if transitionType === 'fly'}
              <div transition:fly={{ x: 50, duration: 200 }}>
                <span>{item.text}</span>
                <button class="remove" onclick={() => removeItem(item.id)}>x</button>
              </div>
            {:else if transitionType === 'slide'}
              <div transition:slide={{ duration: 200 }}>
                <span>{item.text}</span>
                <button class="remove" onclick={() => removeItem(item.id)}>x</button>
              </div>
            {:else}
              <div transition:scale={{ duration: 200 }}>
                <span>{item.text}</span>
                <button class="remove" onclick={() => removeItem(item.id)}>x</button>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>

  {:else if activeTab === 'crossfade'}
    <div class="tab-content">
      <p class="hint">crossfade 实现两个列表之间的项目移动动画</p>
      <div class="crossfade-lists">
        <div class="crossfade-list">
          <h3>列表 A</h3>
          {#each listA as item (item.id)}
            <div class="crossfade-item" transition:send={{ key: item.id }}>
              <span>{item.text}</span>
              <button onclick={() => moveToB(item.id)}>→</button>
            </div>
          {/each}
          {#if listA.length === 0}
            <p class="empty">空列表</p>
          {/if}
        </div>
        <div class="crossfade-list">
          <h3>列表 B</h3>
          {#each listB as item (item.id)}
            <div class="crossfade-item" transition:receive={{ key: item.id }}>
              <span>{item.text}</span>
              <button onclick={() => moveToA(item.id)}>←</button>
            </div>
          {/each}
          {#if listB.length === 0}
            <p class="empty">空列表</p>
          {/if}
        </div>
      </div>
    </div>

  {:else if activeTab === 'motion'}
    <div class="tab-content">
      <h3>tweened — 进度条</h3>
      <progress value={$progress}></progress>
      <div class="motion-controls">
        <button onclick={() => progress.set(0)}>0%</button>
        <button onclick={() => progress.set(0.25)}>25%</button>
        <button onclick={() => progress.set(0.5)}>50%</button>
        <button onclick={() => progress.set(0.75)}>75%</button>
        <button onclick={() => progress.set(1)}>100%</button>
      </div>

      <h3>spring — 弹性元素</h3>
      <p class="hint">点击按钮移动弹性方块</p>
      <div class="spring-container">
        <div
          class="spring-box"
          style="transform: translate({$coords.x}px, {$coords.y}px)"
        ></div>
      </div>
      <div class="motion-controls">
        <button onclick={() => coords.set({ x: 100, y: 100 })}>左上</button>
        <button onclick={() => coords.set({ x: 200, y: 100 })}>右上</button>
        <button onclick={() => coords.set({ x: 100, y: 200 })}>左下</button>
        <button onclick={() => coords.set({ x: 200, y: 200 })}>右下</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .transition-demo {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .tabs button {
    padding: 6px 14px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .tabs button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .tab-content {
    min-height: 200px;
  }

  .controls {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  select {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid var(--border, #e5e4e7);
  }

  .panel {
    padding: 16px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-radius: 6px;
    margin-bottom: 12px;
  }

  .item-list {
    list-style: none;
    padding: 0;
  }

  .item-list li {
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .item-list li > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
  }

  .remove {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
  }

  .hint {
    color: #95a5a6;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .crossfade-lists {
    display: flex;
    gap: 16px;
  }

  .crossfade-list {
    flex: 1;
    padding: 8px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
  }

  .crossfade-list h3 {
    font-size: 14px;
    margin: 0 0 8px;
  }

  .crossfade-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .crossfade-item button {
    padding: 2px 8px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }

  .empty {
    color: #95a5a6;
    font-style: italic;
    font-size: 13px;
  }

  progress {
    width: 100%;
    height: 20px;
    margin-bottom: 8px;
  }

  .motion-controls {
    display: flex;
    gap: 4px;
    margin: 8px 0;
  }

  .motion-controls button {
    padding: 4px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .spring-container {
    width: 300px;
    height: 250px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    position: relative;
    margin: 8px 0;
    overflow: hidden;
  }

  .spring-box {
    width: 40px;
    height: 40px;
    background: var(--accent, #aa3bff);
    border-radius: 6px;
  }
</style>
