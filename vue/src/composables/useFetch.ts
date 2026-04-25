import { ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue'

// ==================== useFetch Composable ====================
//
// 封装数据请求逻辑，包含加载状态、错误处理和自动刷新
//
// 💡 最佳实践：
// - 使用 shallowRef 存储原始值（isLoading/error），避免深层响应式开销
// - watch + AbortController + onCleanup 实现请求取消
// - catch (err: unknown) 配合 instanceof 缩窄类型，比 catch (err: any) 更安全
// - 接受 MaybeRefOrGetter<string> 让调用方可以传 ref 或 getter

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = shallowRef<string | null>(null)
  const isLoading = shallowRef(false)

  async function fetchData(signal?: AbortSignal) {
    const urlValue = toValue(url)
    if (!urlValue) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(urlValue, { signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data.value = await response.json()
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isLoading.value = false
    }
  }

  watch(() => toValue(url), (_newUrl, _oldUrl, onCleanup) => {
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    fetchData(controller.signal)
  }, { immediate: true })

  return { data, error, isLoading, refresh: () => fetchData() }
}
