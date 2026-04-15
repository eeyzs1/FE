import { shallowRef } from 'vue'
import { useEventListener } from './useEventListener'

export function useOnline() {
  const isOnline = shallowRef(typeof navigator !== 'undefined' ? navigator.onLine : true)

  function handleOnline() { isOnline.value = true }
  function handleOffline() { isOnline.value = false }

  useEventListener(window, 'online', handleOnline)
  useEventListener(window, 'offline', handleOffline)

  return { isOnline }
}
