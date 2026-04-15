<script setup lang="ts">
import { ref, reactive, computed, h } from 'vue'

// ==================== 第14课：深入响应式系统 + 渲染函数 ====================

// --- 深入响应式系统 ---
// Vue 3 的响应式基于 Proxy
// ref() → 包装为 { value: ... } 的响应式对象
// reactive() → 将对象转为 Proxy

// 响应式原理演示
const primitiveValue = ref(0)
const objectValue = reactive({ a: 1, b: { c: 2 } })

const trackLog = ref<string[]>([])
function logTrack(msg: string) {
  trackLog.value.push(msg)
  if (trackLog.value.length > 8) trackLog.value.shift()
}

// 演示：ref 的 .value 是如何工作的
function demonstrateRef() {
  trackLog.value = []
  logTrack('1. ref(0) 创建响应式包装对象')
  logTrack('2. .value 的 getter 执行 track()（追踪依赖）')
  logTrack('3. .value 的 setter 执行 trigger()（触发更新）')
  logTrack('4. 模板读取 count → 触发 getter → 收集当前组件为依赖')
  logTrack('5. 修改 count.value → 触发 setter → 通知组件重新渲染')
}

function demonstrateReactive() {
  trackLog.value = []
  logTrack('1. reactive({}) 创建 Proxy 代理对象')
  logTrack('2. 访问 proxy.a → Proxy get 拦截 → track()')
  logTrack('3. 修改 proxy.a = 2 → Proxy set 拦截 → trigger()')
  logTrack('4. 深层对象 proxy.b.c 也是响应式的（递归 Proxy）')
  logTrack('5. reactive 的局限：不能替换整个对象、解构丢失响应性')
}

// --- 响应式陷阱 ---
const state = reactive({ count: 0, nested: { value: 'hello' } })
const pitfallLog = ref<string[]>([])

function pitfallDestructure() {
  pitfallLog.value = []
  let { count } = state
  count++
  pitfallLog.value.push(`❌ 解构后 count 是普通变量，state.count 仍为 ${state.count}`)
}

function pitfallReassign() {
  pitfallLog.value = []
  pitfallLog.value.push('❌ 不能直接替换 reactive 对象，会丢失响应性')
  pitfallLog.value.push('✅ 应该修改属性：state.count = 100，或使用 ref')
}

// --- 渲染函数 ---
// h() 函数创建虚拟节点 (VNode)
// h(标签, 属性, 子内容)

const showRenderDemo = ref(false)
const renderCount = ref(0)

function createRenderVNode() {
  return h(
    'div',
    {
      style: {
        padding: '16px',
        background: '#e8f5e9',
        borderRadius: '8px',
        border: '2px solid #42b883',
      },
    },
    [
      h('p', { style: { fontWeight: 'bold', margin: '0 0 8px' } }, `🎨 渲染函数创建的 VNode #${renderCount.value}`),
      h('p', { style: { margin: 0, color: '#666', fontSize: '14px' } }, '等价于 <template> 中的 HTML'),
    ]
  )
}

const renderVNode = computed(() => createRenderVNode())

function triggerRender() {
  renderCount.value++
  showRenderDemo.value = true
}
</script>

<template>
  <div class="lesson">
    <h1>📖 第14课：深入响应式系统 + 渲染函数</h1>
    <p class="desc">理解 Vue 响应式底层原理，掌握 h() 渲染函数</p>

    <div class="section">
      <h2>🔹 响应式原理 — ref</h2>
      <div class="card">
        <p>当前值：{{ primitiveValue }}</p>
        <div class="btn-group">
          <button @click="primitiveValue++">➕ 加一</button>
          <button @click="demonstrateRef">📖 查看原理</button>
        </div>
        <div class="code-block">
          <pre>// ref 的内部原理（简化版）
const myRef = {
  _value: 0,
  get value() {
    track()    // 追踪：谁在读取我？
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()  // 触发：通知依赖更新
  }
}</pre>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in trackLog" :key="i" class="log-item">{{ log }}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 响应式原理 — reactive (Proxy)</h2>
      <div class="card">
        <p>objectValue: {{ JSON.stringify(objectValue) }}</p>
        <div class="btn-group">
          <button @click="objectValue.a++">修改 a</button>
          <button @click="objectValue.b.c++">修改 b.c</button>
          <button @click="demonstrateReactive">📖 查看原理</button>
        </div>
        <div class="code-block">
          <pre>// reactive 的内部原理（简化版）
const proxy = new Proxy(target, {
  get(target, key) {
    track(target, key)  // 追踪属性读取
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    trigger(target, key) // 触发属性更新
    return true
  }
})</pre>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in trackLog" :key="i" class="log-item">{{ log }}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 响应式陷阱</h2>
      <div class="card">
        <p>state.count = {{ state.count }}</p>
        <div class="btn-group">
          <button @click="state.count++">✅ 直接修改属性</button>
          <button @click="pitfallDestructure" class="warn">❌ 解构陷阱</button>
          <button @click="pitfallReassign" class="warn">❌ 替换陷阱</button>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in pitfallLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">解构 reactive 会丢失响应性，用 toRefs() 可以保留</p>
        <p class="tip">不能替换整个 reactive 对象，应该修改属性或使用 ref</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 渲染函数 h()</h2>
      <div class="card">
        <button @click="triggerRender">
          {{ showRenderDemo ? '隐藏' : '显示' }}渲染函数示例
        </button>
        <div v-if="showRenderDemo" class="render-demo">
          <component :is="renderVNode" />
        </div>
        <div class="code-block">
          <pre>// h() 创建虚拟节点
import { h } from 'vue'

// h(标签, 属性对象, 子内容)
const vnode = h('div', { class: 'box' }, 'Hello')

// 子内容可以是数组
const vnode2 = h('div', { class: 'card' }, [
  h('h2', null, '标题'),
  h('p', null, '内容'),
])

// 在 render 函数中使用
export default {
  render() {
    return h('div', null, `Count: ${this.count}`)
  }
}</pre>
        </div>
        <p class="tip">h() 是 createVNode() 的缩写，返回虚拟 DOM 节点</p>
        <p class="tip">模板编译后就是渲染函数，template 只是 h() 的语法糖</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Template vs 渲染函数 vs JSX</h2>
      <div class="card">
        <div class="compare-grid">
          <div class="compare-col">
            <h3>Template（推荐）</h3>
            <div class="code-block">
              <pre v-pre>&lt;template&gt;
  &lt;div class="box"&gt;
    &lt;p&gt;{{ message }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
            </div>
            <p>✅ 声明式、直观</p>
            <p>✅ 编译时优化</p>
          </div>
          <div class="compare-col">
            <h3>渲染函数 h()</h3>
            <div class="code-block">
              <pre v-pre>render() {
  return h('div', { class: 'box' }, [
    h('p', null, this.message)
  ])
}</pre>
            </div>
            <p>✅ 完全编程能力</p>
            <p>✅ 动态性更强</p>
          </div>
        </div>
        <p class="tip">99% 场景用 Template，需要动态性时用渲染函数或 JSX</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>Proxy</strong><span>Vue 3 响应式底层，拦截 get/set 操作</span></div>
        <div class="point"><strong>track/trigger</strong><span>get 时追踪依赖，set 时触发更新</span></div>
        <div class="point"><strong>ref 原理</strong><span>通过 .value 的 getter/setter 实现追踪</span></div>
        <div class="point"><strong>reactive 原理</strong><span>通过 Proxy 拦截对象属性访问</span></div>
        <div class="point"><strong>解构陷阱</strong><span>reactive 解构丢失响应性，用 toRefs()</span></div>
        <div class="point"><strong>h()</strong><span>创建虚拟节点，h(tag, props, children)</span></div>
        <div class="point"><strong>渲染函数</strong><span>template 的底层实现，完全编程能力</span></div>
        <div class="point"><strong>选择建议</strong><span>优先 template，需要动态性时用 h()/JSX</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.warn { background: #ff9800; }
button.warn:hover { background: #e68900; }
.render-demo { margin-top: 12px; }
.compare-col .code-block { margin-top: 8px; }
.compare-col p { font-size: 13px; margin: 4px 0; }
</style>
