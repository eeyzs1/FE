<script setup lang="ts">
import { ref, reactive, computed, watch, watchEffect, type WatchStopHandle } from 'vue'

// ==================== 第2课：计算属性与侦听器 ====================
//
// computed() — 计算属性
// - 基于响应式数据自动计算新值
// - 有缓存：依赖不变就不重新计算
// - 适合"派生数据"的场景
//
// watch() — 侦听器
// - 监听响应式数据变化，执行副作用
// - 适合"数据变化时做某事"的场景（如API调用、DOM操作）
// - watchEffect() 自动追踪依赖
// - 高级选项：deep / immediate / once / flush
// - 可停止侦听、清理副作用

const firstName = ref('三')
const lastName = ref('张')

// --- computed 示例 ---
const fullName = computed(() => lastName.value + firstName.value)

const numbers = ref<number[]>([])
function addNumber() {
  numbers.value.push(Math.floor(Math.random() * 100))
}

const sum = computed(() => numbers.value.reduce((a, b) => a + b, 0))
const average = computed(() =>
  numbers.value.length ? (sum.value / numbers.value.length).toFixed(1) : '0'
)

// 可写的 computed
const fullNameWritable = computed({
  get: () => lastName.value + firstName.value,
  set: (val: string) => {
    lastName.value = val[0] || ''
    firstName.value = val.slice(1) || ''
  }
})

// --- watch 示例 ---
const searchQuery = ref('')
const searchResults = ref<string[]>([])
const allItems = ['Vue', 'React', 'Angular', 'Svelte', 'Solid', 'Vite', 'Nuxt', 'Vuetify']

watch(searchQuery, (newVal, oldVal) => {
  console.log(`搜索词变化: "${oldVal}" → "${newVal}"`)
  if (newVal) {
    searchResults.value = allItems.filter(item =>
      item.toLowerCase().includes(newVal.toLowerCase())
    )
  } else {
    searchResults.value = []
  }
})

// 监听多个源
const x = ref(0)
const y = ref(0)
const positionLog = ref<string[]>([])

watch([x, y], ([newX, newY]) => {
  positionLog.value.push(`(${newX}, ${newY})`)
  if (positionLog.value.length > 5) {
    positionLog.value.shift()
  }
})

function moveRandom() {
  x.value = Math.floor(Math.random() * 100)
  y.value = Math.floor(Math.random() * 100)
}

// --- watchEffect 示例 ---
// watchEffect 自动追踪回调中使用的响应式数据，无需指定数据源
const searchQueryEffect = ref('')
const searchResultsEffect = ref<string[]>([])

watchEffect(() => {
  if (searchQueryEffect.value) {
    searchResultsEffect.value = allItems.filter(item =>
      item.toLowerCase().includes(searchQueryEffect.value.toLowerCase())
    )
  } else {
    searchResultsEffect.value = []
  }
})

// --- deep 选项 ---
// 默认 watch 只监听引用变化，deep: true 可以深度监听对象内部变化
const deepObj = ref({ a: { b: 1 } })
const deepLog = ref<string[]>([])

watch(
  deepObj,
  (newVal) => {
    deepLog.value.push(`deepObj 变化: a.b = ${newVal.a.b}`)
    if (deepLog.value.length > 6) deepLog.value.shift()
  },
  { deep: true }
)

function mutateDeep() {
  deepObj.value.a.b++
}

// --- immediate 选项 ---
// 默认 watch 只在数据变化时触发，immediate: true 会在创建时立即执行一次
const immediateVal = ref('Hello')
const immediateLog = ref<string[]>([])

watch(
  immediateVal,
  (newVal) => {
    immediateLog.value.push(`值: "${newVal}"`)
    if (immediateLog.value.length > 6) immediateLog.value.shift()
  },
  { immediate: true }
)

// --- once 选项 ---
// once: true 让侦听器只触发一次后自动停止
const onceVal = ref(0)
const onceLog = ref<string[]>([])

watch(
  onceVal,
  (newVal) => {
    onceLog.value.push(`once 触发: ${newVal}（只触发一次！）`)
  },
  { once: true }
)

// --- flush 选项 ---
// flush 控制回调的执行时机：
// 'pre'（默认）：DOM 更新前执行
// 'post'：DOM 更新后执行（需要访问更新后的 DOM 时使用）
// 'sync'：同步执行（性能差，慎用）
const flushVal = ref(0)
const flushLog = ref<string[]>([])

watch(
  flushVal,
  (newVal) => {
    flushLog.value.push(`flush:post 回调，值=${newVal}`)
    if (flushLog.value.length > 6) flushLog.value.shift()
  },
  { flush: 'post' }
)

// --- 清理副作用 (onWatcherCleanup) ---
// 当侦听器重新执行前，可以清理上一次的副作用（如取消请求、清除定时器）
const cleanupInput = ref('')
const cleanupLog = ref<string[]>([])

watch(cleanupInput, (newVal, oldVal, onCleanup) => {
  const timer = window.setTimeout(() => {
    cleanupLog.value.push(`✅ 搜索 "${newVal}" 完成`)
    if (cleanupLog.value.length > 6) cleanupLog.value.shift()
  }, 1000)

  onCleanup(() => {
    clearTimeout(timer)
    if (oldVal !== undefined) {
      cleanupLog.value.push(`🧹 取消搜索 "${oldVal}"`)
      if (cleanupLog.value.length > 6) cleanupLog.value.shift()
    }
  })
})

// --- 停止侦听器 ---
// watch/watchEffect 返回一个 stop 函数，调用后停止侦听
const stoppableVal = ref(0)
const stoppableLog = ref<string[]>([])
let stopHandle: WatchStopHandle | null = null

// --- getter 语法 ---
// 监听 reactive 对象的某个属性时，必须使用 getter 函数
const state = reactive({ count: 0, name: 'Vue' })
const getterLog = ref<string[]>([])

watch(
  () => state.count,
  (newVal) => {
    getterLog.value.push(`state.count 变为 ${newVal}`)
    if (getterLog.value.length > 6) getterLog.value.shift()
  }
)

function startWatcher() {
  stoppableLog.value = []
  stopHandle = watch(stoppableVal, (newVal) => {
    stoppableLog.value.push(`侦听到变化: ${newVal}`)
    if (stoppableLog.value.length > 6) stoppableLog.value.shift()
  })
  stoppableLog.value.push('▶️ 侦听器已启动')
}

function stopWatcher() {
  if (stopHandle) {
    stopHandle()
    stopHandle = null
    stoppableLog.value.push('⏹️ 侦听器已停止')
  }
}

startWatcher()
</script>

<template>
  <div class="lesson">
    <h1>📖 第2课：计算属性与侦听器</h1>
    <p class="desc">computed 自动派生数据，watch 监听变化执行副作用</p>

    <div class="section">
      <h2>🔹 computed() — 计算属性</h2>
      <div class="card">
        <p>姓：<input v-model="lastName" placeholder="姓" /></p>
        <p>名：<input v-model="firstName" placeholder="名" /></p>
        <p>全名：<strong>{{ fullName }}</strong></p>
        <p class="tip">computed 自动追踪依赖，依赖变化时才重新计算，有缓存</p>
      </div>

      <div class="card">
        <div class="btn-group">
          <button @click="addNumber">🎲 添加随机数</button>
          <button @click="numbers = []">🗑️ 清空</button>
        </div>
        <p>数字列表：{{ numbers.length ? numbers.join(', ') : '空' }}</p>
        <p>求和：<strong>{{ sum }}</strong> | 平均值：<strong>{{ average }}</strong></p>
        <p class="tip">sum 和 average 都是 computed，依赖 numbers 自动更新</p>
      </div>

      <div class="card">
        <p>可写 computed：<input v-model="fullNameWritable" /></p>
        <p>姓={{ lastName }} 名={{ firstName }}</p>
        <p class="tip">computed 也可以写：提供 get + set 实现</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 watch() — 侦听器</h2>
      <div class="card">
        <input v-model="searchQuery" placeholder="搜索框架..." />
        <div v-if="searchResults.length" class="results">
          <span v-for="r in searchResults" :key="r" class="tag">{{ r }}</span>
        </div>
        <p v-else-if="searchQuery" class="tip">没有匹配结果</p>
        <p class="tip">watch 监听 searchQuery 变化，触发搜索逻辑</p>
      </div>

      <div class="card">
        <p>坐标：({{ x }}, {{ y }})</p>
        <button @click="moveRandom">🎯 随机移动</button>
        <p>移动记录：{{ positionLog.join(' → ') || '暂无' }}</p>
        <p class="tip">watch([x, y]) 同时监听多个响应式数据</p>
      </div>
    </div>

    <div class="section">
      <h2>� watchEffect() — 自动追踪依赖</h2>
      <div class="card">
        <input v-model="searchQueryEffect" placeholder="用 watchEffect 搜索..." />
        <div v-if="searchResultsEffect.length" class="results">
          <span v-for="r in searchResultsEffect" :key="r" class="tag">{{ r }}</span>
        </div>
        <p v-else-if="searchQueryEffect" class="tip">没有匹配结果</p>
        <p class="tip">watchEffect 不需要指定数据源，自动追踪回调中使用的响应式数据</p>
        <p class="tip">watchEffect 会在创建时立即执行一次（类似 immediate）</p>
      </div>

      <div class="card">
        <h3>watch vs watchEffect 对比</h3>
        <div class="compare-grid">
          <div class="compare-col">
            <strong>watch</strong>
            <span>需要指定数据源</span>
            <span>可获取旧值</span>
            <span>默认懒执行</span>
            <span>精确控制监听什么</span>
          </div>
          <div class="compare-col">
            <strong>watchEffect</strong>
            <span>自动追踪依赖</span>
            <span>无法获取旧值</span>
            <span>立即执行一次</span>
            <span>适合"数据变化就执行"的场景</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 watch 高级选项</h2>
      <div class="card">
        <h3>deep — 深度监听</h3>
        <p>deepObj.a.b = <strong>{{ deepObj.a.b }}</strong></p>
        <button @click="mutateDeep">➕ 修改嵌套属性</button>
        <div class="log-area">
          <p v-for="(log, i) in deepLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!deepLog.length" class="tip">deep: true 让 watch 能监听到对象内部属性变化</p>
        </div>
        <p class="tip">默认 watch(ref(obj)) 只在 .value 被替换时触发，deep: true 可监听内部变化</p>
      </div>

      <div class="card">
        <h3>immediate — 立即执行</h3>
        <input v-model="immediateVal" placeholder="修改我试试" />
        <div class="log-area">
          <p v-for="(log, i) in immediateLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">immediate: true 让 watch 在创建时立即执行一次（注意日志第一条是初始值）</p>
      </div>

      <div class="card">
        <h3>once — 只触发一次</h3>
        <p>onceVal = <strong>{{ onceVal }}</strong></p>
        <button @click="onceVal++">➕ 增加</button>
        <div class="log-area">
          <p v-for="(log, i) in onceLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!onceLog.length" class="tip">点击按钮后只会触发一次</p>
        </div>
        <p class="tip">once: true 让侦听器只触发一次后自动停止</p>
      </div>

      <div class="card">
        <h3>flush — 执行时机</h3>
        <p>flushVal = <strong>{{ flushVal }}</strong></p>
        <button @click="flushVal++">➕ 增加</button>
        <div class="log-area">
          <p v-for="(log, i) in flushLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">flush: 'pre'(默认) DOM更新前 | 'post' DOM更新后 | 'sync' 同步执行</p>
        <p class="tip">需要访问更新后的 DOM 时用 flush: 'post'</p>
      </div>

      <div class="card">
        <h3>getter 语法 — 监听 reactive 属性</h3>
        <p>state.count = <strong>{{ state.count }}</strong> | state.name = <strong>{{ state.name }}</strong></p>
        <div class="btn-group">
          <button @click="state.count++">➕ count++</button>
          <button @click="state.name += '!'">✏️ name += '!</button>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in getterLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!getterLog.length" class="tip">只有 count 变化会触发，name 变化不会</p>
        </div>
        <p class="tip">watch(() => state.count, ...) 用 getter 函数精确监听 reactive 的某个属性</p>
        <p class="tip">❌ watch(state.count, ...) 无效，丢失响应性</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 清理副作用 & 停止侦听器</h2>
      <div class="card">
        <h3>清理副作用（onCleanup）</h3>
        <input v-model="cleanupInput" placeholder="快速输入模拟搜索防抖..." />
        <div class="log-area">
          <p v-for="(log, i) in cleanupLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!cleanupLog.length" class="tip">快速输入时，上一次搜索会被取消</p>
        </div>
        <p class="tip">watch 回调的第三个参数 onCleanup：侦听器重新执行前清理上次的副作用</p>
        <p class="tip">典型场景：取消未完成的 API 请求、清除定时器</p>
      </div>

      <div class="card">
        <h3>停止侦听器</h3>
        <p>stoppableVal = <strong>{{ stoppableVal }}</strong></p>
        <div class="btn-group">
          <button @click="stoppableVal++">➕ 增加</button>
          <button @click="startWatcher" class="btn-start">▶️ 启动侦听</button>
          <button @click="stopWatcher" class="btn-stop">⏹️ 停止侦听</button>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in stoppableLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">watch/watchEffect 返回 stop 函数，调用后停止侦听</p>
        <p class="tip">在 setup 中同步创建的侦听器会在组件卸载时自动停止，无需手动停止</p>
      </div>
    </div>

    <div class="section">
      <h2>� computed vs watch vs watchEffect</h2>
      <div class="knowledge">
        <div class="point">
          <strong>computed</strong>
          <span>派生数据，有缓存，返回值，纯函数</span>
        </div>
        <div class="point">
          <strong>watch</strong>
          <span>副作用，需指定数据源，可获取旧值，可异步</span>
        </div>
        <div class="point">
          <strong>watchEffect</strong>
          <span>副作用，自动追踪依赖，立即执行，无旧值</span>
        </div>
        <div class="point">
          <strong>deep</strong>
          <span>深度监听对象内部变化</span>
        </div>
        <div class="point">
          <strong>immediate</strong>
          <span>创建时立即执行一次回调</span>
        </div>
        <div class="point">
          <strong>once</strong>
          <span>只触发一次后自动停止</span>
        </div>
        <div class="point">
          <strong>flush</strong>
          <span>'pre' DOM更新前 | 'post' DOM更新后 | 'sync' 同步</span>
        </div>
        <div class="point">
          <strong>onCleanup</strong>
          <span>清理上一次副作用（取消请求/定时器）</span>
        </div>
        <div class="point">
          <strong>停止侦听</strong>
          <span>watch() 返回 stop 函数，调用即停止</span>
        </div>
        <div class="point">
          <strong>getter 语法</strong>
          <span>watch(() => obj.prop, ...) 监听 reactive 的某个属性</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-start { background: #2196f3; }
.btn-start:hover { background: #1976d2; }
.btn-stop { background: #f44336; }
.btn-stop:hover { background: #d32f2f; }
.results { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.tag {
  background: #42b883;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
}
</style>
