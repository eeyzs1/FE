<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, onUpdated, toValue, type Ref } from 'vue'
import { useCounter } from '../composables/useCounter'
import { useMouse } from '../composables/useMouse'
import { useFetch } from '../composables/useFetch'
import { useOnline } from '../composables/useOnline'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第7课：生命周期与 Composables ====================
//
// 生命周期钩子：
// onMounted()    — 组件挂载后（DOM 可访问）
// onUpdated()    — 组件更新后
// onUnmounted()  — 组件卸载前（清理副作用）
// 还有：onBeforeMount, onBeforeUpdate, onBeforeUnmount
//
// Composables（组合式函数）：
// - 以 use 开头的函数
// - 封装可复用的有状态逻辑
// - 利用响应式 API + 生命周期钩子
// - 是 Vue 3 Composition API 的精华
//
// Composable 最佳实践：
// - 接受 ref/getter 参数（用 toValue 解包）
// - 返回 ref 而非 reactive
// - 在 composable 内部处理副作用清理
//
// ⚠️ 常见错误：
// - 在 onUpdated 中修改响应式数据导致无限循环
// - 忘记在 onUnmounted 中清理定时器/事件监听
// - composable 返回 reactive 对象（解构丢失响应性）
//
// 💡 最佳实践：
// - onMounted 最常用：发请求、操作 DOM、添加事件监听
// - composable 返回 readonly(ref) 防止外部直接修改状态
// - 使用 SSR 时注意 window/navigator 的存在性检查

// --- 生命周期演示 ---
const mountTime = ref('')
const updateCount = ref(0)
const logs = ref<string[]>([])
const testValue = ref(0)

function addLog(msg: string) {
  const time = new Date().toLocaleTimeString()
  logs.value.push(`[${time}] ${msg}`)
  if (logs.value.length > 10) logs.value.shift()
}

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString()
  addLog('✅ onMounted — 组件已挂载，DOM 可访问')
})

onUpdated(() => {
  updateCount.value++
  console.log(`🔄 onUpdated — 组件已更新（第${updateCount.value}次）`)
})

onUnmounted(() => {
  addLog('👋 onUnmounted — 组件即将卸载')
})

// --- Composable 演示 ---
const { count, doubled, increment, decrement, reset } = useCounter(0)
const { x, y } = useMouse()

// --- 自定义 Composable 演示 ---
const { isOnline } = useOnline()

// --- toValue 演示 ---
// toValue() 将 ref/getter/普通值统一解包为值
const rawValue = ref(42)
const getterValue = () => rawValue.value * 2
const plainValue = 100

const toValueResults = computed(() => ({
  ref: toValue(rawValue),
  getter: toValue(getterValue),
  plain: toValue(plainValue),
}))

// --- Composable 最佳实践演示 ---
// 演示：接受 ref/getter 作为参数的 composable
function useDoubled(source: Ref<number> | (() => number)) {
  return computed(() => toValue(source) * 2)
}

const baseNum = ref(5)
const doubledFromRef = useDoubled(baseNum)
const doubledFromGetter = useDoubled(() => baseNum.value + 10)

// --- useFetch Composable ---
const fetchUrl = ref('https://jsonplaceholder.typicode.com/todos/1')
const { data: fetchData, error: fetchError, isLoading: fetchLoading, refresh: fetchRefresh } = useFetch<any>(fetchUrl)

// --- 副作用清理演示 ---
const showTimerDemo = ref(false)
const leakyCount = ref(0)
const cleanCount = ref(0)
let leakyTimer: ReturnType<typeof setInterval> | null = null
let cleanTimer: ReturnType<typeof setInterval> | null = null

watch(showTimerDemo, (show) => {
  if (show) {
    leakyCount.value = 0
    cleanCount.value = 0
    if (leakyTimer) clearInterval(leakyTimer)
    leakyTimer = setInterval(() => {
      leakyCount.value++
      console.log('⚠️ 泄漏的定时器仍在运行:', leakyCount.value)
    }, 1000)
    cleanTimer = setInterval(() => {
      cleanCount.value++
    }, 1000)
  } else {
    if (cleanTimer) {
      clearInterval(cleanTimer)
      cleanTimer = null
    }
  }
})
</script>

<template>
  <div class="lesson">
    <h1>📖 第7课：生命周期与 Composables</h1>
    <p class="desc">生命周期钩子让组件在不同阶段执行逻辑，Composables 封装可复用逻辑</p>

    <div class="section">
      <h2>🔹 生命周期钩子</h2>
      <div class="card">
        <p>🕐 挂载时间：<strong>{{ mountTime || '未挂载' }}</strong></p>
        <p>🔄 更新次数：<strong>{{ updateCount }}</strong>（onUpdated 每次更新自增，也可在 console 查看）</p>
        <button @click="testValue++">触发更新（{{ testValue }}）</button>
        <div class="log-box">
          <p v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!logs.length" class="tip">暂无日志</p>
        </div>
        <p class="tip">onMounted 最常用：发请求、操作 DOM、添加事件监听</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Composable — useCounter</h2>
      <div class="card">
        <p>计数：<strong>{{ count }}</strong>，双倍：<strong>{{ doubled }}</strong></p>
        <div class="btn-group">
          <button @click="decrement">➖</button>
          <button @click="reset">🔄</button>
          <button @click="increment">➕</button>
        </div>
        <p class="tip">useCounter 封装了计数逻辑，可在任何组件中复用</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Composable — useMouse</h2>
      <div class="card">
        <p>鼠标位置：X = <strong>{{ x }}</strong>，Y = <strong>{{ y }}</strong></p>
        <div class="mouse-tracker" :style="{ '--mx': x + 'px', '--my': y + 'px' }">
          <div class="mouse-dot"></div>
        </div>
        <p class="tip">useMouse 封装了鼠标追踪逻辑，自动清理事件监听</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 网络状态 Composable</h2>
      <div class="card">
        <p>网络状态：<strong :class="isOnline ? 'online' : 'offline'">
          {{ isOnline ? '🟢 在线' : '🔴 离线' }}
        </strong></p>
        <p class="tip">这也是一个简单的 Composable 模式：监听浏览器事件 + 响应式状态</p>
      </div>
    </div>

    <div class="section">
      <h2>� toValue() — 统一解包 ref/getter/值</h2>
      <div class="card">
        <p>toValue() 可以统一处理 ref、getter 函数和普通值：</p>
        <div class="to-value-demo">
          <div class="tv-item">
            <strong>toValue(ref(42))</strong>
            <span>{{ toValueResults.ref }}</span>
          </div>
          <div class="tv-item">
            <strong>toValue(() => ref*2)</strong>
            <span>{{ toValueResults.getter }}</span>
          </div>
          <div class="tv-item">
            <strong>toValue(100)</strong>
            <span>{{ toValueResults.plain }}</span>
          </div>
        </div>
        <p class="tip">toValue 让 composable 可以接受 ref、getter 或普通值作为参数，更灵活</p>
        <div class="code-block">
          <pre>// Composable 接受灵活参数
function useDoubled(source: Ref&lt;number&gt; | (() =&gt; number)) {
  return computed(() =&gt; toValue(source) * 2)
}

// 使用时可以传 ref 或 getter
const doubled = useDoubled(ref(5))       // 传 ref
const doubled = useDoubled(() =&gt; val*2)  // 传 getter</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Composable 最佳实践</h2>
      <div class="card">
        <h3>1. 接受 ref/getter 参数（用 toValue 解包）</h3>
        <p>baseNum = <strong>{{ baseNum }}</strong></p>
        <button @click="baseNum++">➕ baseNum+1</button>
        <div class="practice-demo">
          <div class="pd-item">
            <span>useDoubled(baseNum) =</span>
            <strong>{{ doubledFromRef }}</strong>
          </div>
          <div class="pd-item">
            <span>useDoubled(() => baseNum+10) =</span>
            <strong>{{ doubledFromGetter }}</strong>
          </div>
        </div>
        <p class="tip">同一个 composable，可以传 ref 也可以传 getter，toValue 统一处理</p>
      </div>

      <div class="card">
        <h3>2. 返回 ref 而非 reactive</h3>
        <div class="code-block">
          <pre>// ✅ 推荐：返回 ref
function useCounter() {
  const count = ref(0)
  return { count }  // 解构后仍保持响应性
}

// ❌ 不推荐：返回 reactive
function useCounter() {
  const state = reactive({ count: 0 })
  return state  // 解构后失去响应性！
}

// ✅ 如果必须用 reactive，返回 toRefs
function useCounter() {
  const state = reactive({ count: 0 })
  return { ...toRefs(state) }  // 解构安全</pre>
        </div>
        <p class="tip">返回 ref 可以安全解构，reactive 解构后失去响应性</p>
      </div>

      <div class="card">
        <h3>3. 副作用清理 — 定时器泄漏 vs 正确清理</h3>
        <p>切换组件模拟卸载，观察定时器是否被正确清理：</p>
        <label class="toggle"><input type="checkbox" v-model="showTimerDemo" /> 显示定时器组件</label>
        <div v-if="showTimerDemo" class="timer-demo">
          <div class="compare-grid">
            <div class="compare-col bad">
              <h4>❌ 不清理定时器</h4>
              <p>计数：<strong>{{ leakyCount }}</strong></p>
              <p class="tip">隐藏组件后定时器仍在运行！打开控制台可见日志</p>
            </div>
            <div class="compare-col good">
              <h4>✅ onUnmounted 清理</h4>
              <p>计数：<strong>{{ cleanCount }}</strong></p>
              <p class="tip">隐藏组件后定时器被清除，不再运行</p>
            </div>
          </div>
        </div>
        <p v-else class="tip">勾选上方复选框显示定时器组件，然后取消勾选观察差异</p>
        <p class="tip">onUnmounted 是清理定时器、事件监听、WebSocket 等副作用的关键钩子</p>
      </div>

      <div class="card">
        <h3>4. useFetch — 实际应用示例</h3>
        <input v-model="fetchUrl" placeholder="输入 API URL" />
        <button @click="fetchRefresh" :disabled="fetchLoading">
          {{ fetchLoading ? '⏳ 加载中...' : '📡 发起请求' }}
        </button>
        <div v-if="fetchData" class="fetch-result">
          <p>✅ 请求成功！</p>
          <pre class="json-display">{{ JSON.stringify(fetchData, null, 2) }}</pre>
        </div>
        <div v-if="fetchError" class="fetch-error">
          <p>❌ 请求失败：{{ fetchError }}</p>
        </div>
        <p class="tip">useFetch 是最经典的 composable 示例：封装请求逻辑 + 加载状态 + 错误处理</p>
        <p class="tip">修改 URL 后会自动重新请求（watch 监听），也可点击按钮手动刷新</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 VueUse — Composable 工具库</h2>
      <div class="card">
        <p>VueUse 是 Vue 生态最流行的工具库（GitHub 20k+ stars），提供 200+ composable 函数</p>
        <p>本项目手动实现的 composable 都有对应的 VueUse 版本：</p>
        <div class="vueuse-compare">
          <div class="vu-item">
            <strong>useMouse</strong>
            <span>本项目手动实现</span>
            <code>@vueuse/core → useMouse()</code>
          </div>
          <div class="vu-item">
            <strong>useOnline</strong>
            <span>本项目手动实现</span>
            <code>@vueuse/core → useOnline()</code>
          </div>
          <div class="vu-item">
            <strong>useFetch</strong>
            <span>本项目手动实现</span>
            <code>@vueuse/core → useFetch()</code>
          </div>
        </div>
        <div class="code-block">
          <pre>// 安装 VueUse
// pnpm add @vueuse/core

// 使用示例
import { useMouse, useOnline, useFetch } from '@vueuse/core'

const { x, y } = useMouse()
const isOnline = useOnline()
const { data, error, isLoading } = useFetch('/api/users').json()</pre>
        </div>
        <p class="tip">何时自己写？学习阶段或特殊需求；何时用 VueUse？生产项目优先用成熟方案</p>
        <p class="tip">常用 VueUse composable：useStorage、useDark、useIntersectionObserver、useDebounceFn</p>
      </div>
    </div>

    <div class="section">
      <h2>� 生命周期 & Composables 要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>onMounted</strong>
          <span>DOM 就绪，发请求、操作 DOM、加监听</span>
        </div>
        <div class="point">
          <strong>onUnmounted</strong>
          <span>清理副作用，移除监听、清除定时器</span>
        </div>
        <div class="point">
          <strong>Composable</strong>
          <span>以 use 开头，封装可复用有状态逻辑</span>
        </div>
        <div class="point">
          <strong>核心模式</strong>
          <span>响应式数据 + 生命周期钩子 + 返回状态和方法</span>
        </div>
        <div class="point">
          <strong>toValue</strong>
          <span>统一解包 ref/getter/普通值，让 composable 更灵活</span>
        </div>
        <div class="point">
          <strong>返回 ref</strong>
          <span>composable 返回 ref 而非 reactive，解构安全</span>
        </div>
        <div class="point">
          <strong>副作用清理</strong>
          <span>watch onCleanup / onScopeDispose 清理副作用</span>
        </div>
        <div class="point">
          <strong>优势</strong>
          <span>替代 Mixins，逻辑清晰、无命名冲突、类型安全</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare-grid { display: flex; gap: 16px; margin-top: 8px; }
.compare-col { flex: 1; padding: 14px; border-radius: 8px; }
.compare-col.bad { background: #fff5f5; border: 2px solid #f4433633; }
.compare-col.good { background: #f0faf5; border: 2px solid #42b88333; }
.compare-col h4 { margin: 0 0 8px; font-size: 14px; }
.toggle { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-weight: 500; }
.toggle input { width: auto; }
.mouse-tracker {
  width: 100%; height: 150px; background: #e8f5e9;
  border-radius: 12px; position: relative; overflow: hidden;
  margin-top: 12px;
}
.mouse-dot {
  width: 20px; height: 20px; background: #42b883;
  border-radius: 50%; position: absolute;
  left: var(--mx); top: var(--my);
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
}
.online { color: #4caf50; }
.offline { color: #f44336; }
.to-value-demo { display: flex; gap: 12px; margin: 12px 0; flex-wrap: wrap; }
.tv-item {
  flex: 1; padding: 12px; border-radius: 8px; background: white;
  border: 1px solid #e9ecef; text-align: center; min-width: 140px;
}
.tv-item strong { display: block; font-size: 12px; color: #42b883; margin-bottom: 4px; }
.tv-item span { display: block; font-size: 24px; font-weight: bold; color: #333; }
.practice-demo { display: flex; gap: 12px; margin: 12px 0; flex-wrap: wrap; }
.pd-item {
  flex: 1; padding: 10px 14px; border-radius: 8px; background: white;
  border: 1px solid #e9ecef; display: flex; justify-content: space-between; align-items: center;
}
.pd-item span { font-size: 13px; color: #555; }
.pd-item strong { color: #42b883; font-size: 18px; }
.fetch-result { margin-top: 12px; }
.json-display {
  background: #1e1e1e; color: #4ec9b0; padding: 12px; border-radius: 8px;
  font-size: 12px; max-height: 150px; overflow-y: auto;
}
.fetch-error { margin-top: 12px; color: #f44336; }
.vueuse-compare { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.vu-item {
  display: flex; gap: 8px; align-items: baseline;
  padding: 8px 12px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef; font-size: 13px;
}
.vu-item strong { min-width: 90px; color: #42b883; }
.vu-item span { flex: 1; color: #555; }
.vu-item code { font-size: 12px; background: #e9ecef; padding: 2px 6px; border-radius: 4px; color: #1a73e8; }
</style>
