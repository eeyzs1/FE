<script lang="ts">
  let { value = $bindable('') }: { value: string } = $props()
</script>

<div class="fancy-input">
  <input type="text" bind:value />
  <span class="char-count">{value.length} 字符</span>
</div>

<style>
  .fancy-input { display: flex; gap: 8px; align-items: center; }
  input { flex: 1; padding: 6px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; font-family: 'Comic Sans MS', cursive; color: deeppink; }
  .char-count { font-size: 12px; color: #95a5a6; }
</style>
