<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore, useCounterOptionStore, useCartStore } from '../stores/index'

// ==================== 第13课：状态管理 Pinia + 插件 ====================
//
// Pinia — Vue 官方状态管理
// - 跨组件共享状态
// - 支持 DevTools 调试
// - TypeScript 友好
// - 比 Vuex 更轻量、更简洁
//
// 插件 (Plugins) — 扩展 Vue 应用
// - app.use() 注册插件
// - 全局注册组件、指令、provide 等

const counter = useCounterStore()
const counterOption = useCounterOptionStore()
const cart = useCartStore()

// --- 购物车演示 ---
const products = [
  { id: 1, name: 'Vue 书籍', price: 59 },
  { id: 2, name: 'TypeScript 指南', price: 79 },
  { id: 3, name: 'Vite 实战', price: 49 },
  { id: 4, name: 'Pinia 手册', price: 39 },
]

// --- 插件演示 ---
const pluginLog = ref<string[]>([])

function simulatePluginInstall() {
  pluginLog.value = []
  pluginLog.value.push('📦 模拟 app.use(myPlugin, { theme: "dark" })')
  pluginLog.value.push('📦 插件可以：')
  pluginLog.value.push('  1. app.provide() 全局注入')
  pluginLog.value.push('  2. app.directive() 注册全局指令')
  pluginLog.value.push('  3. app.component() 注册全局组件')
  pluginLog.value.push('  4. app.config.globalProperties 添加全局属性')
  pluginLog.value.push('  5. Pinia 就是作为插件安装的：app.use(createPinia())')
}

// --- storeToRefs 演示 ---
// 直接解构 store 会丢失响应性，必须用 storeToRefs
const { count: counterCount, doubled: counterDoubled } = storeToRefs(counter)
// 方法可以直接解构（不需要 storeToRefs）
const { increment, decrement, reset } = counter

// --- $subscribe 演示 ---
const subscribeLog = ref<string[]>([])
counter.$subscribe((mutation, state) => {
  subscribeLog.value.push(`📋 ${mutation.type}: count = ${state.count}`)
  if (subscribeLog.value.length > 6) subscribeLog.value.shift()
})

// --- $onAction 演示 ---
const actionLog = ref<string[]>([])
counter.$onAction(({ name, after }) => {
  actionLog.value.push(`⚡ 调用 ${name}()`)
  after(() => {
    actionLog.value.push(`✅ ${name}() 完成，count = ${counter.count}`)
    if (actionLog.value.length > 6) actionLog.value.shift()
  })
})
</script>

<template>
  <div class="lesson">
    <h1>📖 第13课：状态管理 Pinia + 插件</h1>
    <p class="desc">Pinia 跨组件共享状态，插件扩展 Vue 应用能力</p>

    <div class="section">
      <h2>🔹 Pinia — 计数器 Store</h2>
      <div class="card">
        <p>计数：<strong>{{ counter.count }}</strong>，双倍：<strong>{{ counter.doubled }}</strong></p>
        <div class="btn-group">
          <button @click="counter.decrement">➖</button>
          <button @click="counter.reset">🔄 重置</button>
          <button @click="counter.increment">➕</button>
        </div>
        <p class="tip">useCounterStore() 返回的 store 是响应式的，可在任何组件中使用</p>
        <p class="tip">多个组件共享同一个 store 实例，数据自动同步</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Pinia — 购物车 Store</h2>
      <div class="card">
        <h3>商品列表</h3>
        <div class="product-list">
          <div v-for="p in products" :key="p.id" class="product-item">
            <span>{{ p.name }}</span>
            <span class="price">¥{{ p.price }}</span>
            <button @click="cart.addItem(p)">🛒 加入购物车</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>🛒 购物车 ({{ cart.totalItems }} 件)</h3>
        <div v-if="cart.items.length">
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <span class="price">¥{{ item.price * item.quantity }}</span>
            <button class="del-btn" @click="cart.removeItem(item.id)">✕</button>
          </div>
          <div class="cart-total">
            <span>总计：</span>
            <strong>¥{{ cart.totalPrice }}</strong>
          </div>
          <button @click="cart.clearCart" class="clear-btn">🗑️ 清空购物车</button>
        </div>
        <p v-else class="empty">购物车为空</p>
        <p class="tip">computed 自动计算 totalItems 和 totalPrice</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Pinia Store 要点</h2>
      <div class="card">
        <div class="code-block">
          <pre>// 定义 Store
const useStore = defineStore('name', () => {
  const state = ref(0)          // state
  const getter = computed(...)   // getter
  function action() { ... }      // action
  return { state, getter, action }
})

// 使用 Store
const store = useStore()
store.count       // 读取 state
store.doubled     // 读取 getter
store.increment() // 调用 action
store.$reset()    // 重置到初始值
store.$patch({})  // 批量修改</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 storeToRefs — 解构保持响应性</h2>
      <div class="card">
        <p>直接解构 store 会丢失响应性，必须用 <code>storeToRefs</code>：</p>
        <div class="code-block">
          <pre>// ❌ 直接解构 — 丢失响应性
const { count, doubled } = useCounterStore()
count++ // 不会触发更新！

// ✅ storeToRefs — 保持响应性
const { count, doubled } = storeToRefs(useCounterStore())
count.value++ // 正确触发更新

// 方法可以直接解构（不需要 storeToRefs）
const { increment, decrement } = useCounterStore()</pre>
        </div>
        <p>storeToRefs 解构后的值：count = <strong>{{ counterCount }}</strong>，doubled = <strong>{{ counterDoubled }}</strong></p>
        <div class="btn-group">
          <button @click="increment">➕ increment</button>
          <button @click="decrement">➖ decrement</button>
          <button @click="reset">🔄 reset</button>
        </div>
        <p class="tip">storeToRefs 只提取 state 和 getter，方法直接从 store 解构即可</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 $subscribe — 监听状态变化</h2>
      <div class="card">
        <p>当 counter store 变化时，$subscribe 自动触发：</p>
        <div class="btn-group">
          <button @click="counter.increment">➕ 增加</button>
          <button @click="counter.decrement">➖ 减少</button>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in subscribeLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!subscribeLog.length" class="tip">操作计数器后查看订阅日志</p>
        </div>
        <p class="tip">$subscribe 类似 watch，但监听整个 store 的 state 变化</p>
        <p class="tip">mutation.type 可以是 'direct'（直接修改）或 'patch object'/'patch function'（$patch 修改）</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 $onAction — 监听 action 调用</h2>
      <div class="card">
        <p>当 counter store 的 action 被调用时，$onAction 自动触发：</p>
        <div class="log-area">
          <p v-for="(log, i) in actionLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!actionLog.length" class="tip">操作计数器后查看 action 日志</p>
        </div>
        <p class="tip">$onAction 可以在 action 执行前后做处理，类似中间件</p>
        <p class="tip">典型场景：日志记录、错误处理、权限校验</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Setup Store vs Option Store</h2>
      <div class="card">
        <p>Pinia 支持两种定义风格，功能完全一致：</p>
        <div class="compare-grid">
          <div class="compare-col">
            <strong>Setup Store（推荐）</strong>
            <div class="code-block">
              <pre>defineStore('id', () => {
  const count = ref(0)
  const doubled = computed(
    () => count.value * 2
  )
  function increment() {
    count.value++
  }
  return { count, doubled, increment }
})</pre>
            </div>
          </div>
          <div class="compare-col">
            <strong>Option Store（Vuex 风格）</strong>
            <div class="code-block">
              <pre>defineStore('id', {
  state: () => ({ count: 0 }),
  getters: {
    doubled: (state) =>
      state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})</pre>
            </div>
          </div>
        </div>
        <p class="tip">Setup Store 更灵活，可使用任意 composable；Option Store 更直观，适合 Vuex 迁移</p>
      </div>

      <div class="card">
        <h3>Option Store 实时演示</h3>
        <p>Option Store 计数器：<strong>{{ counterOption.count }}</strong>，双倍：<strong>{{ counterOption.doubled }}</strong></p>
        <div class="btn-group">
          <button @click="counterOption.decrement">➖</button>
          <button @click="counterOption.reset">🔄 重置</button>
          <button @click="counterOption.increment">➕</button>
        </div>
        <p class="tip">两种风格的 store 可以共存，按需选择</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Pinia 插件</h2>
      <div class="card">
        <p>Pinia 插件可以在每个 store 创建时扩展功能：</p>
        <div class="code-block">
          <pre>// 创建 Pinia 日志插件
function piniaLogger({ store }) {
  // 1. 监听所有 action
  store.$onAction(({ name, after }) => {
    console.log(`[${store.$id}] ${name}() 开始`)
    after(() => console.log(`[${store.$id}] ${name}() 完成`))
  })

  // 2. 监听所有 state 变化
  store.$subscribe((mutation) => {
    console.log(`[${store.$id}] ${mutation.type}`, mutation.storeId)
  })
}

// 注册插件
const pinia = createPinia()
pinia.use(piniaLogger)</pre>
        </div>
        <p class="tip">Pinia 插件通过 pinia.use() 注册，在每个 store 创建时自动执行</p>
        <p class="tip">常见用途：持久化（pinia-plugin-persistedstate）、日志、错误处理</p>
      </div>

      <div class="card">
        <h3>Vue 插件 (Plugins)</h3>
        <button @click="simulatePluginInstall">📦 模拟插件安装</button>
        <div class="log-area">
          <p v-for="(log, i) in pluginLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!pluginLog.length" class="tip">点击按钮查看插件安装过程</p>
        </div>
        <p class="tip">Vue 插件通过 app.use() 注册，install 函数接收 app 实例和选项</p>
        <p class="tip">Pinia、Router 都是通过 Vue 插件机制注册的：app.use(createPinia())</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>defineStore</strong><span>定义 store，第一个参数是唯一 ID</span></div>
        <div class="point"><strong>Setup Store</strong><span>ref→state, computed→getter, function→action（推荐）</span></div>
        <div class="point"><strong>Option Store</strong><span>state/getters/actions 选项式，适合 Vuex 迁移</span></div>
        <div class="point"><strong>store 实例</strong><span>全局单例，多组件共享，响应式</span></div>
        <div class="point"><strong>$reset()</strong><span>重置 store 到初始状态</span></div>
        <div class="point"><strong>$patch()</strong><span>批量修改 state，支持对象或函数</span></div>
        <div class="point"><strong>storeToRefs</strong><span>解构 store 保持响应性，方法可直接解构</span></div>
        <div class="point"><strong>$subscribe</strong><span>监听 store state 变化，类似 watch</span></div>
        <div class="point"><strong>$onAction</strong><span>监听 action 调用，可在执行前后处理</span></div>
        <div class="point"><strong>插件 install</strong><span>接收 app 和 options，扩展 Vue 能力</span></div>
        <div class="point"><strong>app.use()</strong><span>注册插件，自动调用 install 方法</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clear-btn { background: #f44336; margin-top: 8px; }
.clear-btn:hover { background: #d32f2f; }
.del-btn { padding: 4px 10px; background: #f44336; font-size: 12px; border-radius: 6px; }
.del-btn:hover { background: #d32f2f; }
.empty { text-align: center; color: #888; padding: 16px; }
.product-list { display: flex; flex-direction: column; gap: 8px; }
.product-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef;
}
.product-item span { flex: 1; }
.price { color: #42b883; font-weight: bold; }
.cart-item {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 14px; background: white; border-radius: 8px;
  margin: 6px 0; border: 1px solid #e9ecef;
}
.cart-item span { flex: 1; }
.cart-total {
  display: flex; justify-content: space-between;
  padding: 12px 14px; background: #f0faf5; border-radius: 8px;
  margin-top: 12px; font-size: 16px;
}
.cart-total strong { color: #42b883; }
</style>
