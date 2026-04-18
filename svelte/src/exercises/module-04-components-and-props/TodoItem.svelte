<script lang="ts">
  import type { Snippet } from 'svelte'

  let { todo, ontoggle, onremove, actions }: {
    todo: { id: number; text: string; done: boolean }
    ontoggle: () => void
    onremove: () => void
    actions?: Snippet
  } = $props()
</script>

<div class="item" class:done={todo.done}>
  <input type="checkbox" checked={todo.done} onchange={ontoggle} />
  <span>{todo.text}</span>
  {#if actions}
    {@render actions()}
  {/if}
  <button class="delete" onclick={onremove}>x</button>
</div>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .done span {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .delete {
    margin-left: auto;
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 16px;
  }
</style>
