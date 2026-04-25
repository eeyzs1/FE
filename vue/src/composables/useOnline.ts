import { shallowRef } from 'vue'
import { useEventListener } from './useEventListener'

// ==================== useOnline Composable ====================
//
// 监听网络在线/离线状态
//
// 💡 最佳实践：
// - SSR 兼容：typeof navigator !== 'undefined' 防止服务端报错
// - SSR 兼容：typeof window !== 'undefined' 防止 window 不存在
// - 使用 shallowRef 存储布尔值，避免深层响应式开销

export function useOnline() {
  const isOnline = shallowRef(typeof navigator !== 'undefined' ? navigator.onLine : true)

  function handleOnline() { isOnline.value = true }
  function handleOffline() { isOnline.value = false }

  if (typeof window !== 'undefined') {
    useEventListener(window, 'online', handleOnline)
    useEventListener(window, 'offline', handleOffline)
  }

  return { isOnline }
}
