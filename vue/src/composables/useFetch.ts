import { ref, shallowRef, toValue, watch, type MaybeRefOrGetter } from 'vue'

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
    } catch (err: any) {
      if (err.name === 'AbortError') return
      error.value = err.message
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
