import { onMounted, onUnmounted, getCurrentScope, onScopeDispose } from 'vue'

export function useEventListener(
  target: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject,
) {
  if (getCurrentScope()) {
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
  } else {
    target.addEventListener(event, callback)
    onScopeDispose(() => target.removeEventListener(event, callback))
  }
}
