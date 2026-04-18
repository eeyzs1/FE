<script lang="ts">
  let { onadd }: { onadd: (text: string) => void } = $props()
  let text = $state('')

  function handleSubmit(e: Event) {
    e.preventDefault()
    if (!text.trim()) return
    onadd(text.trim())
    text = ''
  }
</script>

<form onsubmit={handleSubmit}>
  <input type="text" bind:value={text} placeholder="添加新任务..." />
  <button type="submit">添加</button>
</form>

<style>
  form {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  input[type="text"] {
    flex: 1;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid var(--border, #e5e4e7);
  }

  button {
    padding: 6px 14px;
    border-radius: 4px;
    border: 1px solid var(--border, #e5e4e7);
    cursor: pointer;
  }

  button:hover {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
  }
</style>
