import { shallowRef } from 'vue'
import { useEventListener } from './useEventListener'

// ==================== useMouse Composable ====================
//
// 追踪鼠标位置，展示 composable 组合模式
//
// 这个 Composable 展示了：
// 1. 响应式状态（鼠标坐标）
// 2. 组合其他 composable（useEventListener）
// 3. 自动清理副作用（useEventListener 内部处理）
//
// 💡 最佳实践：
// - SSR 兼容：typeof window !== 'undefined' 防止服务端报错
// - 使用 shallowRef 存储原始值（x/y 坐标），避免深层响应式开销

export function useMouse() {
  const x = shallowRef(0)
  const y = shallowRef(0)

  function update(event: MouseEvent) {
    x.value = event.clientX
    y.value = event.clientY
  }

  if (typeof window !== 'undefined') {
    useEventListener(window, 'mousemove', update)
  }

  return { x, y }
}
