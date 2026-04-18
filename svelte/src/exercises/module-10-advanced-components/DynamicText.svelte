<script lang="ts">
  let text = $state('Hello Svelte!')
</script>

<div class="dynamic-text">
  <input type="text" bind:value={text} />
  <p>{text}</p>
</div>

<style>
  .dynamic-text {
    padding: 8px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-radius: 4px;
  }

  input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
</style>
