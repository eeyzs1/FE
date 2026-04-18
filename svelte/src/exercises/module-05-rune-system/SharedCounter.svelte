<script lang="ts">
  import { counter, increment, decrement, reset } from './sharedState.svelte'
</script>

<div class="shared-demo">
  <p>共享计数器: <strong>{counter.count}</strong></p>
  <div class="controls">
    <button onclick={decrement}>-</button>
    <button onclick={increment}>+</button>
    <button onclick={reset}>重置</button>
  </div>
  <p class="hint">此状态在 .svelte.ts 文件中声明，所有组件共享同一实例。注意：不能直接 export 会被重新赋值的 $state 变量。</p>
</div>

<style>
  .shared-demo {
    padding: 12px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-radius: 6px;
  }

  .controls {
    display: flex;
    gap: 4px;
    margin: 8px 0;
  }

  .controls button {
    padding: 4px 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
  }

  .hint { color: #95a5a6; font-size: 13px; margin-top: 4px; }
</style>
