import { shallowRef } from 'vue'
import { useEventListener } from './useEventListener'

// ==================== useMouse Composable ====================
//
// 这个 Composable 展示了：
// 1. 响应式状态（鼠标坐标）
// 2. 组合其他 composable（useEventListener）
// 3. 自动清理副作用（useEventListener 内部处理）

export function useMouse() {
  const x = shallowRef(0)
  const y = shallowRef(0)

  function update(event: MouseEvent) {
    x.value = event.clientX
    y.value = event.clientY
  }

  useEventListener(window, 'mousemove', update)

  return { x, y }
}
