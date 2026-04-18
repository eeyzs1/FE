<script lang="ts">
  import type { Snippet } from 'svelte'

  let { title, header, children, footer }: {
    title: string
    header?: Snippet
    children: Snippet
    footer?: Snippet
  } = $props()
</script>

<div class="card">
  <div class="card-header">
    {#if header}
      {@render header()}
    {:else}
      <h3>{title}</h3>
    {/if}
  </div>
  <div class="card-body">
    {@render children()}
  </div>
  {#if footer}
    <div class="card-footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style>
  .card {
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
    overflow: hidden;
  }

  .card-header {
    padding: 12px 16px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .card-header h3 {
    margin: 0;
    font-size: 16px;
  }

  .card-body {
    padding: 16px;
  }

  .card-footer {
    padding: 8px 16px;
    border-top: 1px solid var(--border, #e5e4e7);
    background: var(--accent-bg, rgba(170, 59, 255, 0.05));
    font-size: 13px;
    color: #95a5a6;
  }
</style>
