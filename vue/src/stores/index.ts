import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Todo {
  id: number
  text: string
  done: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

// ==================== Pinia Store 示例 ====================
//
// Pinia 是 Vue 官方推荐的状态管理库
// 用 defineStore 定义 store，支持两种风格：
// 1. Setup Store（组合式，推荐）— 用 ref/computed/function
// 2. Option Store（选项式）— 用 state/getters/actions

// --- Setup Store 风格（推荐）---
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = 0 }

  return { count, doubled, increment, decrement, reset }
})

// --- Option Store 风格（适合 Vue 2 / Vuex 迁移）---
// 与 Setup Store 功能完全一致，写法不同
export const useCounterOptionStore = defineStore('counterOption', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubled: (state) => state.count * 2,
  },
  actions: {
    increment() { this.count++ },
    decrement() { this.count-- },
    reset() { this.count = 0 },
  },
})

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addItem(product: Omit<Product, 'quantity'>) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeItem(id: number) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalItems, totalPrice, addItem, removeItem, clearCart }
})

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([
    { id: 1, text: '学习 Vue 3 响应式', done: true, priority: 'high', createdAt: new Date() },
    { id: 2, text: '掌握 computed 和 watch', done: true, priority: 'high', createdAt: new Date() },
    { id: 3, text: '理解组件通信', done: false, priority: 'medium', createdAt: new Date() },
    { id: 4, text: '完成 TodoApp 实战', done: false, priority: 'high', createdAt: new Date() },
  ])

  const filter = ref<'all' | 'active' | 'done'>('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active': return todos.value.filter(t => !t.done)
      case 'done': return todos.value.filter(t => t.done)
      default: return todos.value
    }
  })

  const stats = computed(() => ({
    total: todos.value.length,
    done: todos.value.filter(t => t.done).length,
    active: todos.value.filter(t => !t.done).length,
    progress: todos.value.length
      ? Math.round((todos.value.filter(t => t.done).length / todos.value.length) * 100)
      : 0,
  }))

  function addTodo(text: string, priority: 'low' | 'medium' | 'high') {
    const trimmed = text.trim()
    if (!trimmed) return
    todos.value.push({
      id: Date.now(),
      text: trimmed,
      done: false,
      priority,
      createdAt: new Date(),
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function removeTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function clearDone() {
    todos.value = todos.value.filter(t => !t.done)
  }

  return { todos, filter, filteredTodos, stats, addTodo, toggleTodo, removeTodo, clearDone }
})
