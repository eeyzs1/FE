<script lang="ts" generics="T extends { id: number; name: string }">
  let { items, onSelect }: { items: T[]; onSelect: (item: T) => void } = $props()

  let searchTerm = $state('')

  let filteredItems = $derived(
    items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )
</script>

<div class="generic-list">
  <input
    type="text"
    bind:value={searchTerm}
    placeholder="搜索..."
  />
  <ul>
    {#each filteredItems as item (item.id)}
      <li>
        <button onclick={() => onSelect(item)}>{item.name}</button>
      </li>
    {/each}
  </ul>
  <p class="count">显示 {filteredItems.length} / {items.length} 项</p>
</div>

<style>
  .generic-list {
    padding: 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 6px;
  }

  input[type="text"] {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    margin-bottom: 8px;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  li button {
    width: 100%;
    text-align: left;
    padding: 6px 8px;
    border: none;
    background: none;
    cursor: pointer;
  }

  li button:hover {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
  }

  .count { color: #95a5a6; font-size: 13px; margin-top: 4px; }
</style>
