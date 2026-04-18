import { setContext, getContext } from 'svelte'
import { writable, derived } from 'svelte/store'

type CartItem = { id: number; name: string; price: number; quantity: number }

function createCartStore() {
  const items = writable<CartItem[]>([])
  const subtotal = derived(items, ($items) =>
    $items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
  const itemCount = derived(items, ($items) =>
    $items.reduce((sum, item) => sum + item.quantity, 0)
  )

  return {
    items,
    subtotal,
    itemCount,
    add(item: Omit<CartItem, 'quantity'>) {
      items.update(($items) => {
        const existing = $items.find(i => i.id === item.id)
        if (existing) {
          existing.quantity += 1
          return $items
        }
        return [...$items, { ...item, quantity: 1 }]
      })
    },
    remove(id: number) {
      items.update(($items) => $items.filter(i => i.id !== id))
    },
    updateQuantity(id: number, delta: number) {
      items.update(($items) =>
        $items.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
      )
    },
    clear() {
      items.set([])
    },
  }
}

const CART_KEY = Symbol('cart')

export function provideCart() {
  const store = createCartStore()
  setContext(CART_KEY, store)
  return store
}

export function useCart() {
  return getContext<ReturnType<typeof createCartStore>>(CART_KEY)
}
