<script lang="ts">
  let count: number = $state(0)

  function increment() {
    count += 1
  }

  function decrement() {
    count -= 1
  }

  function reset() {
    count = 0
  }
</script>

<div class="counter">
  <h2>计数器: {count}</h2>
  <div class="buttons">
    <button onclick={decrement}>-1</button>
    <button onclick={reset}>重置</button>
    <button onclick={increment}>+1</button>
  </div>

  {#if count > 10}
    <p class="high">数值很高！</p>
  {:else if count > 0}
    <p class="positive">正数</p>
  {:else if count < 0}
    <p class="negative">负数</p>
  {:else}
    <p class="zero">零</p>
  {/if}
</div>

<style>
  .counter {
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
    max-width: 300px;
    margin: 20px auto;
  }

  .buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 12px 0;
  }

  button {
    padding: 6px 16px;
    border-radius: 4px;
    border: 1px solid var(--border, #e5e4e7);
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
  }

  .high { color: #e74c3c; font-weight: bold; }
  .positive { color: #27ae60; }
  .negative { color: #e67e22; }
  .zero { color: #95a5a6; }
</style>
