<script setup lang="ts">
import { ref, computed, nextTick, shallowRef, shallowReactive, triggerRef, defineAsyncComponent, effectScope, onScopeDispose, watchEffect } from 'vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第12课：异步组件 + effectScope + nextTick + shallowRef ====================

// --- 异步组件 ---
const AsyncComp = defineAsyncComponent({
  loader: () => new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        template: '<div class="async-box">✅ 异步组件加载完成！<p>我用了 defineAsyncComponent + Suspense</p></div>',
      })
    }, 2000)
  }),
  loadingComponent: {
    template: '<div class="loading-box">⏳ 加载中...</div>',
  },
  delay: 200,
  errorComponent: {
    template: '<div class="error-box">❌ 加载失败</div>',
  },
  timeout: 10000,
})

const showAsync = ref(false)

// --- nextTick ---
const items = ref<string[]>(['项目 A', '项目 B'])
const listRef = ref<HTMLUListElement | null>(null)
const nextTickLog = ref<string[]>([])

async function addItemWithScroll() {
  const newItem = `项目 ${String.fromCharCode(65 + items.value.length)}`
  items.value.push(newItem)
  nextTickLog.value.push(`1. 添加了 "${newItem}"，但 DOM 还没更新`)

  await nextTick()
  nextTickLog.value.push(`2. nextTick 后，DOM 已更新，列表高度：${listRef.value?.scrollHeight}px`)

  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight
  }
  if (nextTickLog.value.length > 6) nextTickLog.value.shift()
}

// --- shallowRef vs ref ---
const deepRef = ref({ nested: { count: 0 } })
const shallow = shallowRef({ nested: { count: 0 } })
const shallowLog = ref<string[]>([])

function mutateDeepRef() {
  deepRef.value.nested.count++
}

function mutateShallowWrong() {
  shallow.value.nested.count++
  shallowLog.value.push('❌ shallowRef 内部属性变化，视图不会更新！')
  if (shallowLog.value.length > 6) shallowLog.value.shift()
}

function mutateShallowRight() {
  shallow.value = { nested: { count: shallow.value.nested.count + 1 } }
  shallowLog.value.push('✅ 替换整个 .value，视图更新了！')
  if (shallowLog.value.length > 6) shallowLog.value.shift()
}

function triggerShallowRef() {
  shallow.value.nested.count++
  triggerRef(shallow)
  shallowLog.value.push('✅ triggerRef() 强制触发更新！')
  if (shallowLog.value.length > 6) shallowLog.value.shift()
}

// --- shallowReactive ---
const shallowState = shallowReactive({
  name: '浅层响应式',
  nested: { count: 0 },
})
const shallowReactiveLog = ref<string[]>([])

function mutateShallowReactiveTop() {
  shallowState.name = `浅层 ${Date.now() % 1000}`
  shallowReactiveLog.value.push('✅ 顶层属性变化，视图更新')
  if (shallowReactiveLog.value.length > 4) shallowReactiveLog.value.shift()
}

function mutateShallowReactiveNested() {
  shallowState.nested.count++
  shallowReactiveLog.value.push('❌ 嵌套属性变化，视图不更新')
  if (shallowReactiveLog.value.length > 4) shallowReactiveLog.value.shift()
}

// --- effectScope ---
const scopeLog = ref<string[]>([])
let sharedScope: ReturnType<typeof effectScope> | null = null
const scopeData = ref<{ count: number; doubled: number } | null>(null)
const scopeActive = ref(false)

function addScopeLog(msg: string) {
  scopeLog.value.push(msg)
  if (scopeLog.value.length > 8) scopeLog.value.shift()
}

function createScope() {
  if (sharedScope) {
    addScopeLog('⚠️ 作用域已存在，请先停止')
    return
  }
  sharedScope = effectScope()
  sharedScope.run(() => {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    const timer = setInterval(() => {
      count.value++
    }, 1000)
    onScopeDispose(() => {
      clearInterval(timer)
      addScopeLog('🧹 effectScope 已清理：定时器已清除')
    })
    scopeData.value = { count: count.value, doubled: doubled.value }
    watchEffect(() => {
      if (scopeData.value) {
        scopeData.value.count = count.value
        scopeData.value.doubled = doubled.value
      }
    })
    addScopeLog('✅ effectScope 已创建，定时器每秒+1')
  })
  scopeActive.value = true
}

function stopScope() {
  if (!sharedScope) {
    addScopeLog('⚠️ 没有活跃的作用域')
    return
  }
  sharedScope.stop()
  sharedScope = null
  scopeData.value = null
  scopeActive.value = false
  addScopeLog('🛑 effectScope 已停止')
}

const codeEffectScope = `// effectScope 将副作用分组管理
const scope = effectScope()
scope.run(() => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  const timer = setInterval(() => count.value++, 1000)

  // 作用域销毁时自动清理
  onScopeDispose(() => clearInterval(timer))
})

// 一次性清理所有副作用
scope.stop()  // 清除 timer + computed + watch`
</script>

<template>
  <div class="lesson">
    <h1>📖 第12课：异步组件 + effectScope + nextTick + shallowRef</h1>
    <p class="desc">性能优化利器：按需加载、作用域管理、DOM 更新时机、浅层响应式</p>

    <div class="section">
      <h2>🔹 异步组件 (defineAsyncComponent)</h2>
      <div class="card">
        <button @click="showAsync = !showAsync">
          {{ showAsync ? '卸载' : '加载' }}异步组件
        </button>
        <div v-if="showAsync" class="async-area">
          <AsyncComp />
        </div>
        <p class="tip">defineAsyncComponent 按需加载，配合 loadingComponent/errorComponent</p>
        <p class="tip">适合路由级代码分割和大型组件懒加载</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 nextTick — 等待 DOM 更新</h2>
      <div class="card">
        <button @click="addItemWithScroll">➕ 添加并滚动到底部</button>
        <ul ref="listRef" class="next-tick-list">
          <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
        <div class="log-area">
          <p v-for="(log, i) in nextTickLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">修改响应式数据后 DOM 不会立即更新，await nextTick() 等待 DOM 更新完成</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 shallowRef vs ref</h2>
      <div class="card">
        <div class="compare-grid">
          <div class="compare-col">
            <h3>ref（深层响应式）</h3>
            <p>nested.count = {{ deepRef.nested.count }}</p>
            <button @click="mutateDeepRef">➕ 嵌套属性+1</button>
            <p class="tip">ref 深层响应，嵌套属性变化也触发更新</p>
          </div>
          <div class="compare-col">
            <h3>shallowRef（浅层）</h3>
            <p>nested.count = {{ shallow.nested.count }}</p>
            <div class="btn-group">
              <button @click="mutateShallowWrong" class="warn">❌ 嵌套+1</button>
              <button @click="mutateShallowRight">✅ 替换.value</button>
              <button @click="triggerShallowRef">🔧 triggerRef</button>
            </div>
            <p class="tip">shallowRef 只追踪 .value 本身的变化</p>
          </div>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in shallowLog" :key="i" class="log-item">{{ log }}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 shallowReactive</h2>
      <div class="card">
        <p>name = {{ shallowState.name }}，nested.count = {{ shallowState.nested.count }}</p>
        <div class="btn-group">
          <button @click="mutateShallowReactiveTop">✅ 改顶层属性</button>
          <button @click="mutateShallowReactiveNested" class="warn">❌ 改嵌套属性</button>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in shallowReactiveLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">shallowReactive 只有顶层属性是响应式的，嵌套属性变化不触发更新</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 effectScope — 响应式作用域管理</h2>
      <div class="card">
        <p>effectScope 将多个响应式副作用（watch、computed）分组管理，一次性清理</p>
        <div class="btn-group">
          <button @click="createScope" :disabled="scopeActive">🟢 创建作用域</button>
          <button @click="stopScope" :disabled="!scopeActive" class="warn">🔴 停止作用域</button>
        </div>
        <div v-if="scopeData" class="scope-demo">
          <p>作用域内 count = <strong>{{ scopeData.count }}</strong>，doubled = <strong>{{ scopeData.doubled }}</strong></p>
          <p class="tip">定时器每秒自增，停止作用域后定时器和 computed 一起清理</p>
        </div>
        <div v-else class="scope-demo">
          <p class="tip">点击"创建作用域"开始演示</p>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in scopeLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <DemoBox title="effectScope — 响应式作用域管理" :code="codeEffectScope">
          <div class="btn-group">
            <button @click="createScope" :disabled="scopeActive">🟢 创建作用域</button>
            <button @click="stopScope" :disabled="!scopeActive" class="warn">🔴 停止作用域</button>
          </div>
          <div v-if="scopeData" class="scope-demo">
            <p>作用域内 count = <strong>{{ scopeData.count }}</strong>，doubled = <strong>{{ scopeData.doubled }}</strong></p>
            <p class="tip">定时器每秒自增，停止作用域后定时器和 computed 一起清理</p>
          </div>
          <div v-else class="scope-demo">
            <p class="tip">点击"创建作用域"开始演示</p>
          </div>
          <div class="log-area">
            <p v-for="(log, i) in scopeLog" :key="i" class="log-item">{{ log }}</p>
          </div>
        </DemoBox>
        <p class="tip">适用场景：composable 中创建多个 watch/computed，需要统一清理时</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>defineAsyncComponent</strong><span>按需加载组件，减少首屏体积</span></div>
        <div class="point"><strong>effectScope</strong><span>将响应式副作用分组管理，一次性清理</span></div>
        <div class="point"><strong>onScopeDispose</strong><span>作用域销毁时的清理回调</span></div>
        <div class="point"><strong>nextTick</strong><span>等待 DOM 更新完成后再执行操作</span></div>
        <div class="point"><strong>shallowRef</strong><span>只有 .value 变化才触发更新，忽略内部变化</span></div>
        <div class="point"><strong>shallowReactive</strong><span>只有顶层属性是响应式，嵌套不追踪</span></div>
        <div class="point"><strong>triggerRef</strong><span>强制 shallowRef 触发更新</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.warn { background: #ff9800; }
button.warn:hover { background: #e68900; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.async-area { margin-top: 12px; }
.next-tick-list {
  height: 100px; overflow-y: auto; border: 2px solid #e9ecef;
  border-radius: 8px; padding: 8px; list-style: none; margin-top: 8px;
}
.next-tick-list li { padding: 4px 8px; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
.scope-demo { margin: 12px 0; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef; }
.scope-demo p { margin: 4px 0; }
</style>
