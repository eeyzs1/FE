<script lang="ts">
  import FancyInput from './FancyInput.svelte'

  let parentValue = $state('来自父组件的值')
  let canvas: HTMLCanvasElement | undefined = $state(undefined)
  let divEl: HTMLDivElement | undefined = $state(undefined)
  let divWidth = $state(0)
  let divHeight = $state(0)

  $effect(() => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#aa3bff'
    ctx.fillRect(10, 10, 80, 80)
  })

  $effect(() => {
    if (!divEl) return
    divWidth = divEl.offsetWidth
    divHeight = divEl.offsetHeight
  })

  let activeTab: 'bindable' | 'bindthis' | 'dimensions' = $state('bindable')
</script>

<div class="bindable-deep">
  <h2>双向绑定深度</h2>
  <div class="tabs">
    <button class:active={activeTab === 'bindable'} onclick={() => activeTab = 'bindable'}>$bindable</button>
    <button class:active={activeTab === 'bindthis'} onclick={() => activeTab = 'bindthis'}>bind:this</button>
    <button class:active={activeTab === 'dimensions'} onclick={() => activeTab = 'dimensions'}>尺寸绑定</button>
  </div>

  {#if activeTab === 'bindable'}
    <div class="tab-content">
      <h3>$bindable — 可绑定 Prop</h3>
      <p class="hint">用 $bindable 声明 prop 允许父组件使用 bind: 实现双向数据流</p>
      <p>父组件值: <strong>{parentValue}</strong></p>
      <FancyInput bind:value={parentValue} />
      <p class="hint">子组件修改值会自动同步到父组件。不使用 bind: 则只单向传递。</p>
    </div>
  {:else if activeTab === 'bindthis'}
    <div class="tab-content">
      <h3>bind:this — DOM/组件引用</h3>
      <p class="hint">获取 DOM 节点或组件实例的引用，在 $effect 或事件处理器中使用</p>
      <canvas bind:this={canvas} width="100" height="100" style="border: 1px solid #e5e4e7; border-radius: 4px;"></canvas>
      <p class="hint">Canvas 通过 bind:this 获取引用后，在 $effect 中绘制内容</p>
    </div>
  {:else if activeTab === 'dimensions'}
    <div class="tab-content">
      <h3>尺寸绑定 — 只读</h3>
      <p class="hint">绑定元素的 clientWidth/clientHeight/offsetWidth/offsetHeight</p>
      <div bind:this={divEl} class="measure-box">调整窗口大小观察变化</div>
      <p>宽度: {divWidth}px | 高度: {divHeight}px</p>
    </div>
  {/if}
</div>

<style>
  .bindable-deep { max-width: 500px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .tab-content { min-height: 150px; }
  .measure-box { padding: 20px; background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-radius: 4px; border: 1px dashed var(--accent, #aa3bff); text-align: center; }
</style>
