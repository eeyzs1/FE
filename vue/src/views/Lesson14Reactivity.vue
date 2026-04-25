<script setup lang="ts">
import { ref, reactive, computed, h, markRaw, toRaw, isReactive, isRef, isProxy, watch } from 'vue'
import DemoBox from '../components/DemoBox.vue'

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
const refStep = ref(0)
let refStepTimer: ReturnType<typeof setTimeout> | null = null

watch(primitiveValue, () => {
  trackLog.value = []
  logTrack('📖 模板读取 primitiveValue → getter → track() 追踪依赖')
  refStep.value = 1
  if (refStepTimer) clearTimeout(refStepTimer)
  refStepTimer = setTimeout(() => {
    refStep.value = 2
    logTrack('📖 依赖收集完成：当前组件被记录为依赖')
  }, 400)
  refStepTimer = setTimeout(() => {
    refStep.value = 3
    logTrack('📖 primitiveValue 被修改 → setter → trigger() 通知更新')
  }, 800)
  refStepTimer = setTimeout(() => {
    refStep.value = 4
    logTrack('📖 组件重新渲染 → 页面显示新值')
  }, 1200)
})

const reactiveStep = ref(0)
let reactiveStepTimer: ReturnType<typeof setTimeout> | null = null

watch(() => ({ ...objectValue }), () => {
  trackLog.value = []
  logTrack('📖 访问 objectValue.a → Proxy get 拦截 → track()')
  reactiveStep.value = 1
  if (reactiveStepTimer) clearTimeout(reactiveStepTimer)
  reactiveStepTimer = setTimeout(() => {
    reactiveStep.value = 2
    logTrack('📖 依赖收集：记录当前组件为 objectValue.a 的依赖')
  }, 400)
  reactiveStepTimer = setTimeout(() => {
    reactiveStep.value = 3
    logTrack('📖 修改 objectValue.a → Proxy set 拦截')
  }, 800)
  reactiveStepTimer = setTimeout(() => {
    reactiveStep.value = 4
    logTrack('📖 trigger() → 通知所有依赖 → 组件重新渲染')
  }, 1200)
}, { deep: true })

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

const codeRenderVNode = `// h() 创建虚拟节点
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
    return h('div', null, \`Count: \${this.count}\`)
  }
}`

// --- 响应式工具函数 ---
const rawObj = { name: '原始对象', items: [1, 2, 3] }
const markedObj = markRaw(rawObj)
const reactiveFromMarked = reactive(markedObj)

const checkRef = ref(42)
const checkReactive = reactive({ x: 1 })
const checkPlain = { y: 2 }

const checkResults = computed(() => ({
  isRef_ref: isRef(checkRef),
  isReactive_ref: isReactive(checkRef),
  isRef_reactive: isRef(checkReactive),
  isReactive_reactive: isReactive(checkReactive),
  isRef_plain: isRef(checkPlain),
  isReactive_plain: isReactive(checkPlain),
  isReactive_marked: isReactive(reactiveFromMarked),
  isProxy_marked: isProxy(reactiveFromMarked),
}))

const rawFromReactive = toRaw(checkReactive)
const isSameObject = rawFromReactive === checkReactive
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
          <button @click="primitiveValue--">➖ 减一</button>
          <button @click="primitiveValue = 0">� 重置</button>
        </div>
        <div class="reactivity-visual">
          <div class="rv-step" :class="{ active: refStep >= 1 }">
            <span class="rv-num">1</span>
            <span class="rv-label">读取 .value</span>
            <span class="rv-action">→ track() 追踪依赖</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: refStep >= 2 }">
            <span class="rv-num">2</span>
            <span class="rv-label">收集依赖</span>
            <span class="rv-action">→ 记录"谁在用我"</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: refStep >= 3 }">
            <span class="rv-num">3</span>
            <span class="rv-label">修改 .value</span>
            <span class="rv-action">→ trigger() 通知更新</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: refStep >= 4 }">
            <span class="rv-num">4</span>
            <span class="rv-label">重新渲染</span>
            <span class="rv-action">→ 页面更新</span>
          </div>
        </div>
        <p class="tip">点击 ➕/➖ 按钮，观察上方流程自动高亮：读取→追踪→修改→触发→渲染</p>
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
          <button @click="objectValue.a = 0; objectValue.b.c = 0">🔄 重置</button>
        </div>
        <div class="reactivity-visual">
          <div class="rv-step" :class="{ active: reactiveStep >= 1 }">
            <span class="rv-num">1</span>
            <span class="rv-label">Proxy.get</span>
            <span class="rv-action">→ 拦截属性读取</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: reactiveStep >= 2 }">
            <span class="rv-num">2</span>
            <span class="rv-label">track()</span>
            <span class="rv-action">→ 追踪该属性依赖</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: reactiveStep >= 3 }">
            <span class="rv-num">3</span>
            <span class="rv-label">Proxy.set</span>
            <span class="rv-action">→ 拦截属性修改</span>
          </div>
          <div class="rv-arrow">→</div>
          <div class="rv-step" :class="{ active: reactiveStep >= 4 }">
            <span class="rv-num">4</span>
            <span class="rv-label">trigger()</span>
            <span class="rv-action">→ 通知依赖更新</span>
          </div>
        </div>
        <p class="tip">修改任意属性，观察 Proxy 拦截流程自动高亮</p>
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
        <DemoBox title="h() 渲染函数创建 VNode" :code="codeRenderVNode">
          <button @click="triggerRender">
            {{ showRenderDemo ? '隐藏' : '显示' }}渲染函数示例
          </button>
          <div v-if="showRenderDemo" class="render-demo">
            <component :is="renderVNode" />
          </div>
        </DemoBox>
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
      <h2>� 响应式工具函数</h2>

      <div class="card">
        <h3>isRef / isReactive / isProxy — 类型检测</h3>
        <div class="check-grid">
          <div class="check-item">
            <span>isRef(ref(42))</span>
            <span :class="checkResults.isRef_ref ? 'tag-yes' : 'tag-no'">{{ checkResults.isRef_ref }}</span>
          </div>
          <div class="check-item">
            <span>isReactive(ref(42))</span>
            <span :class="checkResults.isReactive_ref ? 'tag-yes' : 'tag-no'">{{ checkResults.isReactive_ref }}</span>
          </div>
          <div class="check-item">
            <span>isRef(reactive({}))</span>
            <span :class="checkResults.isRef_reactive ? 'tag-yes' : 'tag-no'">{{ checkResults.isRef_reactive }}</span>
          </div>
          <div class="check-item">
            <span>isReactive(reactive({}))</span>
            <span :class="checkResults.isReactive_reactive ? 'tag-yes' : 'tag-no'">{{ checkResults.isReactive_reactive }}</span>
          </div>
          <div class="check-item">
            <span>isReactive(普通对象)</span>
            <span :class="checkResults.isReactive_plain ? 'tag-yes' : 'tag-no'">{{ checkResults.isReactive_plain }}</span>
          </div>
          <div class="check-item">
            <span>isReactive(markRaw对象)</span>
            <span :class="checkResults.isReactive_marked ? 'tag-yes' : 'tag-no'">{{ checkResults.isReactive_marked }}</span>
          </div>
        </div>
        <p class="tip">isRef() 检测是否为 ref 对象，isReactive() 检测是否为 reactive 代理，isProxy() 检测是否为任何 Proxy</p>
      </div>

      <div class="card">
        <h3>markRaw — 标记对象永不转为响应式</h3>
        <p>markRaw 后的对象即使传给 reactive 也不会被代理：</p>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>❌ 不用 markRaw</h4>
            <p>isReactive(reactive(obj))</p>
            <p>= <strong>{{ isReactive(reactive({ name: '普通对象' })) }}</strong></p>
            <p class="tip">普通对象传给 reactive 会被代理</p>
          </div>
          <div class="compare-col good">
            <h4>✅ 使用 markRaw</h4>
            <p>isReactive(reactive(markRaw(obj)))</p>
            <p>= <strong>{{ checkResults.isReactive_marked }}</strong></p>
            <p class="tip">markRaw 后即使传给 reactive 也不会被代理</p>
          </div>
        </div>
        <p class="tip">典型场景：第三方库实例（如 ECharts、Mapbox GL），避免 Vue 深层代理导致的性能问题</p>
      </div>

      <div class="card">
        <h3>toRaw — 获取原始对象</h3>
        <p>toRaw 从 reactive 代理中取出原始对象（不触发响应式）：</p>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>reactive 对象</h4>
            <p>isProxy(checkReactive)</p>
            <p>= <strong>{{ isProxy(checkReactive) }}</strong></p>
            <p class="tip">reactive 返回的是 Proxy 代理</p>
          </div>
          <div class="compare-col good">
            <h4>toRaw 取出原始对象</h4>
            <p>rawFromReactive === checkReactive</p>
            <p>= <strong>{{ isSameObject }}</strong></p>
            <p class="tip">toRaw 返回原始对象，修改不触发更新</p>
          </div>
        </div>
        <p class="tip">toRaw 返回的原始对象修改不会触发视图更新，仅在需要绕过响应式时使用</p>
      </div>
    </div>

    <div class="section">
      <h2>� 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>Proxy</strong><span>Vue 3 响应式底层，拦截 get/set 操作</span></div>
        <div class="point"><strong>track/trigger</strong><span>get 时追踪依赖，set 时触发更新</span></div>
        <div class="point"><strong>ref 原理</strong><span>通过 .value 的 getter/setter 实现追踪</span></div>
        <div class="point"><strong>reactive 原理</strong><span>通过 Proxy 拦截对象属性访问</span></div>
        <div class="point"><strong>解构陷阱</strong><span>reactive 解构丢失响应性，用 toRefs()</span></div>
        <div class="point"><strong>h()</strong><span>创建虚拟节点，h(tag, props, children)</span></div>
        <div class="point"><strong>渲染函数</strong><span>template 的底层实现，完全编程能力</span></div>
        <div class="point"><strong>选择建议</strong><span>优先 template，需要动态性时用 h()/JSX</span></div>
        <div class="point"><strong>markRaw</strong><span>标记对象永不转为响应式，用于第三方库实例</span></div>
        <div class="point"><strong>toRaw</strong><span>从 reactive 代理获取原始对象，修改不触发更新</span></div>
        <div class="point"><strong>isReactive</strong><span>检测是否为 reactive 代理对象</span></div>
        <div class="point"><strong>isRef</strong><span>检测是否为 ref 对象</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reactivity-visual {
  display: flex; align-items: center; gap: 8px; margin: 16px 0;
  padding: 16px; background: #f8f9fa; border-radius: 12px; flex-wrap: wrap;
}
.rv-step {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 12px; border-radius: 8px; background: white;
  border: 2px solid #e9ecef; transition: all 0.3s; opacity: 0.4;
}
.rv-step.active { opacity: 1; border-color: #42b883; background: #f0faf5; }
.rv-num {
  width: 24px; height: 24px; border-radius: 50%; background: #42b883;
  color: white; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: bold;
}
.rv-step.active .rv-num { background: #2d7a5a; }
.rv-label { font-weight: bold; font-size: 13px; color: #333; }
.rv-action { font-size: 12px; color: #888; }
.rv-arrow { font-size: 18px; color: #42b883; font-weight: bold; }
.compare-grid { display: flex; gap: 16px; margin-top: 8px; }
.compare-col { flex: 1; padding: 14px; border-radius: 8px; }
.compare-col.bad { background: #fff5f5; border: 2px solid #f4433633; }
.compare-col.good { background: #f0faf5; border: 2px solid #42b88333; }
.compare-col h4 { margin: 0 0 8px; font-size: 14px; }
button.warn { background: #ff9800; }
button.warn:hover { background: #e68900; }
.render-demo { margin-top: 12px; }
.compare-col .code-block { margin-top: 8px; }
.check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
.check-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: white; border-radius: 6px; border: 1px solid #e9ecef; font-size: 13px; }
.tag-yes { color: #42b883; font-weight: bold; font-size: 13px; }
.tag-no { color: #f44336; font-weight: bold; font-size: 13px; }
.compare-col p { font-size: 13px; margin: 4px 0; }
</style>
