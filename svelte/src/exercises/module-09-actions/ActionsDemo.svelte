<script lang="ts">
  function clickOutside(node: HTMLElement, callback: () => void) {
    function handleClick(event: MouseEvent) {
      if (node && !node.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return {
      update(newCallback: () => void) {
        callback = newCallback
      },
      destroy() {
        document.removeEventListener('click', handleClick, true)
      }
    }
  }

  function longPress(node: HTMLElement, callback: () => void) {
    let timer: ReturnType<typeof setTimeout>

    function start() {
      timer = setTimeout(callback, 800)
    }

    function cancel() {
      clearTimeout(timer)
    }

    node.addEventListener('mousedown', start)
    node.addEventListener('mouseup', cancel)
    node.addEventListener('mouseleave', cancel)
    node.addEventListener('touchstart', start, { passive: true })
    node.addEventListener('touchend', cancel)
    node.addEventListener('touchcancel', cancel)

    return {
      destroy() {
        node.removeEventListener('mousedown', start)
        node.removeEventListener('mouseup', cancel)
        node.removeEventListener('mouseleave', cancel)
        node.removeEventListener('touchstart', start)
        node.removeEventListener('touchend', cancel)
        node.removeEventListener('touchcancel', cancel)
        clearTimeout(timer)
      }
    }
  }

  let showDropdown = $state(false)
  let longPressCount = $state(0)
</script>

<div class="action-demo">
  <h2>Actions 演示</h2>

  <div class="section">
    <h3>use:clickOutside</h3>
    <p>点击下拉菜单外部关闭</p>
    {#if showDropdown}
      <div class="dropdown" use:clickOutside={() => showDropdown = false}>
        <p>菜单项 1</p>
        <p>菜单项 2</p>
        <p>菜单项 3</p>
      </div>
    {/if}
    <button onclick={() => showDropdown = true}>打开菜单</button>
  </div>

  <div class="section">
    <h3>use:longPress</h3>
    <p>长按按钮 800ms 触发</p>
    <button use:longPress={() => longPressCount++}>
      长按我
    </button>
    <p>长按触发次数: {longPressCount}</p>
  </div>
</div>

<style>
  .action-demo {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .section {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .dropdown {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border: 1px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 4px;
    padding: 8px;
    margin: 8px 0;
  }

  .dropdown p {
    padding: 4px 8px;
    cursor: pointer;
  }

  .dropdown p:hover {
    background: rgba(170, 59, 255, 0.1);
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
