<script lang="ts">
  let count = $state(0)
</script>

<div class="mini-counter">
  <button onclick={() => count--}>-</button>
  <span>{count}</span>
  <button onclick={() => count++}>+</button>
</div>

<style>
  .mini-counter {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-radius: 4px;
  }

  .mini-counter span {
    font-family: var(--mono, monospace);
    font-size: 18px;
    min-width: 30px;
    text-align: center;
  }

  button {
    width: 28px;
    height: 28px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
