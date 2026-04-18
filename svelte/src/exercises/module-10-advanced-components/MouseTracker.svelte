<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet<[{ x: number; y: number }]> } = $props()
  let x = $state(0)
  let y = $state(0)

  $effect(() => {
    const handler = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  })
</script>

{@render children({ x, y })}
