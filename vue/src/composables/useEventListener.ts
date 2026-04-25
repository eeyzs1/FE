import { onMounted, onUnmounted, getCurrentScope } from 'vue'

// ==================== useEventListener Composable ====================
//
// 封装事件监听逻辑，自动在组件卸载时清理
//
// 💡 最佳实践：
// - 使用 getCurrentScope() 检测是否在 setup 上下文中
// - 在 setup 上下文中：用 onMounted/onUnmounted 自动管理
// - 非 setup 上下文（如异步回调中）：返回手动清理函数
// - 始终返回清理函数，让调用方可以在任何场景下手动清理

export function useEventListener<T extends Event = Event>(
  target: EventTarget,
  event: string,
  callback: (evt: T) => void,
): () => void {
  const listener = callback as EventListener
  if (getCurrentScope()) {
    onMounted(() => target.addEventListener(event, listener))
    onUnmounted(() => target.removeEventListener(event, listener))
  } else {
    target.addEventListener(event, listener)
    return () => target.removeEventListener(event, listener)
  }
  return () => {
    target.removeEventListener(event, listener)
  }
}
