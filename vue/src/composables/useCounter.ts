import { shallowRef, computed, readonly } from 'vue'

// ==================== useCounter Composable ====================
//
// Composable 的标准模式：
// 1. 用 ref/reactive 创建响应式状态
// 2. 用 computed 创建派生状态
// 3. 定义操作方法
// 4. 返回 readonly 状态 + 操作方法，防止外部直接修改

export function useCounter(initialValue: number = 0) {
  const count = shallowRef(initialValue)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count: readonly(count), doubled, increment, decrement, reset }
}
