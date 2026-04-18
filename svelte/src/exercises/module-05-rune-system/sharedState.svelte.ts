export const counter = $state({ count: 0 })

export function increment() {
  counter.count += 1
}

export function decrement() {
  counter.count -= 1
}

export function reset() {
  counter.count = 0
}
