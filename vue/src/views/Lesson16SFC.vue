<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import SlottedChild from '../components/SlottedChild.vue'
import DeepChild from '../components/DeepChild.vue'

// ==================== 第16课：SFC 深入 + 工具链 + 渲染机制 ====================

// --- SFC (单文件组件) ---
// .vue 文件 = <template> + <script setup> + <style scoped>
// 这是 Vue 的标志性功能

// --- SFC CSS 功能演示 ---
// 1. v-bind() in CSS — 在 style 中绑定响应式数据
const themeColor = ref('#42b883')
const borderRadius = ref(12)

// 2. CSS Modules — 自动生成唯一类名
// 使用 <style module>，通过 $style.xxx 访问

// 3. :deep() — 穿透 scoped 样式到子组件
// 4. :slotted() — 控制 slot 内容样式
// 5. :global() — 声明全局样式

// --- 工具链 ---
// Vite — 开发服务器 + 构建工具
// vue-tsc — TypeScript 类型检查
// Vue DevTools — 浏览器调试扩展

// --- 渲染机制 ---
// 1. 编译：template → render() 函数
// 2. 挂载：render() → Virtual DOM → Real DOM
// 3. 更新：数据变化 → 重新 render → diff → patch

const renderSteps = ref([
  { step: '1. 编译', desc: 'template 编译为 render() 函数', icon: '⚙️' },
  { step: '2. 创建 VNode', desc: 'render() 返回虚拟 DOM 树', icon: '🌳' },
  { step: '3. 挂载', desc: 'VNode → 真实 DOM（首次渲染）', icon: '🖥️' },
  { step: '4. 依赖追踪', desc: '追踪 render 中使用的响应式数据', icon: '🔍' },
  { step: '5. 触发更新', desc: '数据变化 → 重新 render → 新 VNode', icon: '🔄' },
  { step: '6. Diff + Patch', desc: '对比新旧 VNode，最小化 DOM 更新', icon: '✨' },
])

const currentStep = ref(0)
function nextStep() {
  currentStep.value = (currentStep.value + 1) % renderSteps.value.length
}

// --- :slotted() / :deep() 演示 ---
const slottedItems = ref(['Vue', 'React', 'Angular'])
function addSlottedItem() {
  slottedItems.value.push(`新项${slottedItems.value.length + 1}`)
}
function removeSlottedItem() {
  if (slottedItems.value.length) slottedItems.value.pop()
}
const deepEnabled = ref(false)
function resetSteps() {
  currentStep.value = 0
}

// --- 虚拟 DOM 演示 ---
const vdomItems = ref(['A', 'B', 'C'])
const patchLog = ref<string[]>([])
function addVdomItem() {
  const letter = String.fromCharCode(65 + vdomItems.value.length)
  vdomItems.value.push(letter)
  patchLog.value.push(`➕ 新增节点 "${letter}"，只 patch 新节点`)
  if (patchLog.value.length > 6) patchLog.value.shift()
}
function removeVdomItem() {
  if (vdomItems.value.length > 0) {
    const removed = vdomItems.value.pop()
    patchLog.value.push(`➖ 移除节点 "${removed}"，只卸载该节点`)
    if (patchLog.value.length > 6) patchLog.value.shift()
  }
}
function shuffleVdom() {
  vdomItems.value = [...vdomItems.value].sort(() => Math.random() - 0.5)
  patchLog.value.push('🔀 重新排序，通过 key 最小化移动操作')
  if (patchLog.value.length > 6) patchLog.value.shift()
}

// --- v-once 演示 ---
const onceCount = ref(0)
const onceRenderTime = ref(new Date().toLocaleTimeString())

// --- v-memo 演示 ---
const memoItems = ref([
  { id: 1, name: '项目 A', selected: false },
  { id: 2, name: '项目 B', selected: true },
  { id: 3, name: '项目 C', selected: false },
  { id: 4, name: '项目 D', selected: false },
])

let memoRenderCount = 0
onUpdated(() => {
  memoRenderCount++
})
function toggleMemoItem(id: number) {
  const item = memoItems.value.find(i => i.id === id)
  if (item) item.selected = !item.selected
}
</script>

<template>
  <div class="lesson">
    <h1>📖 第16课：SFC 深入 + 工具链 + 渲染机制</h1>
    <p class="desc">理解 .vue 文件结构、开发工具链、Vue 渲染流程</p>

    <div class="section">
      <h2>🔹 SFC 单文件组件结构</h2>
      <div class="card">
        <div class="code-block">
          <pre v-pre>// SFC 结构
MyComponent.vue
┌─────────────────────────────────────┐
│ &lt;script setup lang="ts"&gt;           │ ← 逻辑
│ import { ref } from 'vue'           │
│ const count = ref(0)                │
│ &lt;/script&gt;                           │
│                                     │
│ &lt;template&gt;                          │ ← 结构
│   &lt;button @click="count++"&gt;        │
│     {{ count }}                     │
│   &lt;/button&gt;                         │
│ &lt;/template&gt;                         │
│                                     │
│ &lt;style scoped&gt;                      │ ← 样式
│ button { background: #42b883; }     │
│ &lt;/style&gt;                            │
└─────────────────────────────────────┘</pre>
        </div>
        <p class="tip">SFC 将逻辑、结构、样式封装在一个文件中，是 Vue 的标志性功能</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 SFC CSS 功能</h2>
      <div class="card">
        <h3>v-bind() in CSS</h3>
        <div class="style-controls">
          <label>颜色：<input type="color" v-model="themeColor" /></label>
          <label>圆角：<input type="range" v-model.number="borderRadius" min="0" max="30" /> {{ borderRadius }}px</label>
        </div>
        <div class="css-demo">
          我的样式由 CSS 中的 v-bind() 控制
        </div>
        <div class="code-block">
          <pre>&lt;style scoped&gt;
.css-demo {
  color: v-bind(themeColor);
  border-radius: v-bind(borderRadius + 'px');
  border: 2px solid v-bind(themeColor);
}
&lt;/style&gt;</pre>
        </div>
      </div>

      <div class="card">
        <h3>CSS Modules 实际演示</h3>
        <p>使用 <code>&lt;style module&gt;</code> 后，类名会自动生成唯一标识，通过 <code>$style.类名</code> 访问：</p>
        <div :class="$style.moduleDemo">
          <p :class="$style.moduleTitle">🎨 这是 CSS Modules 控制的样式</p>
          <p :class="$style.moduleText">类名会被自动转换为唯一值，如 _title_1a2b3c</p>
        </div>
        <div class="code-block">
          <pre>&lt;template&gt;
  &lt;div :class="$style.moduleDemo"&gt;
    &lt;p :class="$style.moduleTitle"&gt;标题&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style module&gt;
.moduleDemo { padding: 16px; background: #f0f8ff; border-radius: 8px; }
.moduleTitle { color: #1a73e8; font-weight: bold; }
&lt;/style&gt;</pre>
        </div>
        <p class="tip">CSS Modules 避免样式冲突，适合大型项目；scoped 更简单，适合中小项目</p>
      </div>

      <div class="card">
        <h3>:slotted() — 控制插槽内容样式</h3>
        <p>父组件传入的插槽内容，子组件可以用 :slotted() 设置样式：</p>
        <div class="btn-group">
          <button @click="addSlottedItem">➕ 添加</button>
          <button @click="removeSlottedItem">➖ 移除</button>
        </div>
        <SlottedChild>
          <p v-for="item in slottedItems" :key="item" class="slotted-item">{{ item }}</p>
        </SlottedChild>
        <div class="code-block">
          <pre>// 子组件 &lt;style scoped&gt;
// 普通 scoped 选择器无法影响插槽内容
// :slotted() 可以穿透到插槽内容

:slotted(.slotted-item) {
  background: #e8f5e9;
  border-left: 3px solid #42b883;
  color: #42b883;
  font-weight: bold;
}

// ❌ .slotted-item { } — 不生效！
// ✅ :slotted(.slotted-item) { } — 生效！</pre>
        </div>
        <p class="tip">:slotted() 只影响通过插槽传入的内容，不影响子组件自身的内容</p>
      </div>

      <div class="card">
        <h3>:deep() — 穿透 scoped 样式到子组件</h3>
        <p>scoped 样式无法影响子组件内部，:deep() 可以穿透：</p>
        <label class="toggle">
          <input type="checkbox" v-model="deepEnabled" />
          {{ deepEnabled ? '✅ :deep() 已启用' : '❌ :deep() 未启用' }}
        </label>
        <div :class="{ 'deep-active': deepEnabled }">
          <DeepChild />
        </div>
        <div class="code-block">
          <pre>// 父组件 &lt;style scoped&gt;
// 普通 scoped 选择器无法影响子组件内部
// :deep() 可以穿透到子组件内部

.deep-active :deep(.deep-target) {
  color: #e91e63 !important;  // 粉红色
  font-size: 18px;
}
.deep-active :deep(.deep-label) {
  color: #e91e63 !important;
  text-decoration: underline;
}

// ❌ .deep-target { } — 不生效！
// ✅ :deep(.deep-target) { } — 生效！</pre>
        </div>
        <p class="tip">:deep() 应该尽量避免使用，它破坏了 scoped 的封装性。仅在需要覆盖第三方组件样式时使用。</p>
      </div>

      <div class="card">
        <h3>:global() — 在 scoped 中声明全局样式</h3>
        <div class="code-block">
          <pre>// &lt;style scoped&gt; 中声明全局样式
:global(.global-class) {
  color: green;
}

// 等价于在 &lt;style&gt;（非 scoped）中定义
// 但可以和 scoped 样式写在同一个块中</pre>
        </div>
        <p class="tip">:global() 很少使用，通常直接写一个非 scoped 的 &lt;style&gt; 块更清晰</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 工具链</h2>
      <div class="card">
        <div class="tool-list">
          <div class="tool-item">
            <strong>Vite</strong>
            <span>开发服务器 + 构建工具，极速 HMR</span>
          </div>
          <div class="tool-item">
            <strong>vue-tsc</strong>
            <span>Vue TypeScript 类型检查，pnpm build 时运行</span>
          </div>
          <div class="tool-item">
            <strong>Vue DevTools</strong>
            <span>浏览器扩展，查看组件树/状态/事件/路由</span>
          </div>
          <div class="tool-item">
            <strong>Volar</strong>
            <span>VSCode 扩展，.vue 文件语法高亮 + 智能提示</span>
          </div>
          <div class="tool-item">
            <strong>ESLint + Prettier</strong>
            <span>代码规范 + 格式化（推荐配置）</span>
          </div>
        </div>
        <p class="tip">本项目使用 Vite + vue-tsc，运行 pnpm dev 启动开发服务器</p>
      </div>

      <div class="card">
        <h3>Vue DevTools 使用指南</h3>
        <p>安装 Vue DevTools 浏览器扩展后，按 F12 打开开发者工具：</p>
        <div class="devtools-steps">
          <div class="dt-step"><strong>1. 组件树</strong><span>查看组件层级关系、props、emit 事件</span></div>
          <div class="dt-step"><strong>2. 响应式状态</strong><span>实时查看和修改 ref/reactive/computed 的值</span></div>
          <div class="dt-step"><strong>3. Pinia</strong><span>查看所有 store 的 state/getters/actions</span></div>
          <div class="dt-step"><strong>4. 路由</strong><span>查看当前路由、参数、查询字符串</span></div>
          <div class="dt-step"><strong>5. 时间线</strong><span>追踪组件事件、路由变化、Pinia 操作</span></div>
          <div class="dt-step"><strong>6. 性能</strong><span>组件渲染耗时分析，找出性能瓶颈</span></div>
        </div>
        <p class="tip">在组件状态面板中可以直接修改 ref 的值，实时预览效果</p>
        <p class="tip">选中页面元素 → 右键"在 DevTools 中查看" → 快速定位组件</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 渲染机制</h2>
      <div class="card">
        <p>Vue 从 template 到 DOM 的完整流程：</p>
        <div class="render-pipeline">
          <div
            v-for="(step, i) in renderSteps"
            :key="step.step"
            class="pipeline-step"
            :class="{ active: i <= currentStep, current: i === currentStep }"
            @click="currentStep = i"
          >
            <span class="step-icon">{{ step.icon }}</span>
            <span class="step-name">{{ step.step }}</span>
            <span class="step-desc">{{ step.desc }}</span>
          </div>
        </div>
        <div class="btn-group">
          <button @click="nextStep">▶️ 下一步</button>
          <button @click="resetSteps">🔄 重置</button>
        </div>
        <p class="tip">点击每个步骤查看详情，或点击"下一步"依次查看</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 虚拟 DOM + Diff 算法</h2>
      <div class="card">
        <p>虚拟 DOM 是 JavaScript 对象，描述真实 DOM 的结构</p>
        <div class="btn-group">
          <button @click="addVdomItem">➕ 添加</button>
          <button @click="removeVdomItem">➖ 移除</button>
          <button @click="shuffleVdom">🔀 打乱</button>
        </div>
        <div class="vdom-demo">
          <TransitionGroup name="list" tag="div" class="vdom-list">
            <div v-for="item in vdomItems" :key="item" class="vdom-item">
              {{ item }}
            </div>
          </TransitionGroup>
        </div>
        <div class="log-area">
          <p v-for="(log, i) in patchLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!patchLog.length" class="tip">操作列表查看 patch 日志</p>
        </div>
        <p class="tip">Vue 的 Diff 算法只比较同层级节点，通过 :key 高效复用 DOM</p>
        <p class="tip">key 必须唯一且稳定，不要用 index 作 key</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-once — 只渲染一次</h2>
      <div class="card">
        <p>v-once 让元素/组件只渲染一次，后续更新时跳过，当作静态内容</p>
        <div class="once-demo">
          <div class="once-item">
            <p>普通渲染：onceCount = <strong>{{ onceCount }}</strong></p>
            <p>渲染时间：{{ new Date().toLocaleTimeString() }}</p>
          </div>
          <div class="once-item" v-once>
            <p>v-once 渲染：onceCount = <strong>{{ onceCount }}</strong></p>
            <p>渲染时间：{{ onceRenderTime }}（不会更新）</p>
          </div>
        </div>
        <button @click="onceCount++">➕ 增加 onceCount</button>
        <p class="tip">v-once 区域的值不会随 onceCount 变化而更新</p>
        <p class="tip">适用场景：纯静态内容（如版权信息、固定文案），减少不必要的 diff</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-memo — 条件性跳过更新</h2>
      <div class="card">
        <p>v-memo 接受依赖数组，依赖不变时跳过该元素的更新</p>
        <div class="memo-list">
          <div
            v-for="item in memoItems"
            :key="item.id"
            v-memo="[item.selected]"
            class="memo-item"
            :class="{ selected: item.selected }"
          >
            <span>{{ item.name }}</span>
            <button @click="toggleMemoItem(item.id)">
              {{ item.selected ? '✅ 已选' : '⬜ 未选' }}
            </button>
          </div>
        </div>
        <p class="tip">v-memo="[item.selected]"：只有 selected 变化时才重新渲染该行</p>
        <p class="tip">其他数据变化（如 memoRenderCount）不会触发该行的重新渲染</p>
        <div class="code-block">
          <pre v-pre>// v-memo 语法
&lt;div v-memo="[item.selected]"&gt;
  {{ item.name }} - {{ item.selected }}
&lt;/div&gt;

// 依赖数组为空 = 永远不更新（类似 v-once）
&lt;div v-memo="[]"&gt;静态内容&lt;/div&gt;

// 典型场景：v-for 中大量数据，只有部分变化
// 配合 v-memo 跳过不需要更新的行</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 渲染函数 & JSX</h2>
      <div class="card">
        <p>除了 template，Vue 还支持用 JavaScript 写渲染函数：</p>
        <div class="code-block">
          <pre>// 渲染函数（h = createElement）
import { h, ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return () =&gt; h('div', [
      h('p', `Count: ${count.value}`),
      h('button', { onClick: () =&gt; count.value++ }, '+1')
    ])
  }
}

// JSX（需要 @vitejs/plugin-vue-jsx）
const App = defineComponent(() =&gt; {
  const count = ref(0)
  return () =&gt; (
    &lt;div&gt;
      &lt;p&gt;Count: {count.value}&lt;/p&gt;
      &lt;button onClick={() =&gt; count.value++}&gt;+1&lt;/button&gt;
    &lt;/div&gt;
  )
})</pre>
        </div>
        <p class="tip">99% 场景用 template 就够了，渲染函数/JSX 适合动态性极强的场景</p>
        <p class="tip">如：根据配置动态生成表单、高度灵活的列表渲染等</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>SFC</strong><span>单文件组件，template + script + style 一体化</span></div>
        <div class="point"><strong>scoped</strong><span>样式只作用于当前组件，通过 data-v-xxx 属性实现</span></div>
        <div class="point"><strong>:deep()</strong><span>穿透 scoped 样式到子组件，慎用</span></div>
        <div class="point"><strong>:slotted()</strong><span>控制插槽内容的样式，子组件 scoped 中使用</span></div>
        <div class="point"><strong>v-bind() in CSS</strong><span>在 style 中绑定响应式数据</span></div>
        <div class="point"><strong>Vite</strong><span>开发服务器 + 构建工具，ESM 原生支持</span></div>
        <div class="point"><strong>编译</strong><span>template → render() 函数（编译时优化）</span></div>
        <div class="point"><strong>虚拟 DOM</strong><span>JavaScript 对象描述 DOM，Diff 后最小化更新</span></div>
        <div class="point"><strong>:key</strong><span>帮助 Diff 算法识别节点，必须唯一稳定</span></div>
        <div class="point"><strong>v-once</strong><span>只渲染一次，后续更新跳过，适合静态内容</span></div>
        <div class="point"><strong>v-memo</strong><span>依赖不变时跳过更新，适合 v-for 中部分变化</span></div>
        <div class="point"><strong>渲染函数</strong><span>h() 创建 VNode，JSX 是语法糖，适合动态场景</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.style-controls { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
.style-controls label { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.css-demo {
  color: v-bind(themeColor);
  border-radius: v-bind(borderRadius + 'px');
  border: 2px solid v-bind(themeColor);
  padding: 20px; text-align: center; background: white;
  transition: all 0.3s; font-weight: bold; font-size: 16px;
}
.tool-list { display: flex; flex-direction: column; gap: 8px; }
.tool-item {
  display: flex; gap: 12px; align-items: baseline;
  padding: 10px 14px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef;
}
.tool-item strong { min-width: 120px; color: #42b883; }
.tool-item span { color: #555; font-size: 14px; }
.render-pipeline { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.pipeline-step {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 8px;
  background: white; border: 1px solid #e9ecef;
  cursor: pointer; transition: all 0.3s; opacity: 0.4;
}
.pipeline-step.active { opacity: 1; background: #f0faf5; border-color: #42b883; }
.pipeline-step.current { background: #e8f5e9; border-color: #42b883; box-shadow: 0 0 0 2px rgba(66,184,131,0.3); }
.step-icon { font-size: 20px; }
.step-name { font-weight: bold; min-width: 100px; color: #42b883; }
.step-desc { font-size: 13px; color: #666; }
.vdom-list { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
.vdom-item {
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  background: #42b883; color: white; border-radius: 8px; font-weight: bold; font-size: 18px;
}
.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-enter-from { opacity: 0; transform: scale(0.5); }
.list-leave-to { opacity: 0; transform: scale(0.5); }
.list-move { transition: transform 0.3s; }
.once-demo { display: flex; gap: 16px; margin: 12px 0; flex-wrap: wrap; }
.once-item {
  flex: 1; padding: 16px; border-radius: 8px; background: white;
  border: 2px solid #e9ecef; min-width: 200px;
}
.once-item p { margin: 4px 0; font-size: 14px; }
.memo-list { display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
.memo-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; border-radius: 8px; background: white;
  border: 1px solid #e9ecef; transition: all 0.2s;
}
.memo-item.selected { border-color: #42b883; background: #f0faf5; }
.memo-item span { font-size: 14px; }
.devtools-steps { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.dt-step {
  display: flex; gap: 10px; align-items: baseline;
  padding: 8px 12px; background: white; border-radius: 6px;
  border: 1px solid #e9ecef;
}
.dt-step strong { min-width: 100px; color: #1a73e8; }
.dt-step span { color: #555; font-size: 13px; }
.deep-active :deep(.deep-target) {
  color: #e91e63 !important; font-size: 18px;
}
.deep-active :deep(.deep-label) {
  color: #e91e63 !important; text-decoration: underline;
}
</style>

<style module>
.moduleDemo { padding: 16px; background: #f0f8ff; border-radius: 8px; border: 1px solid #b8d4f0; }
.moduleTitle { color: #1a73e8; font-weight: bold; font-size: 16px; margin: 0 0 8px; }
.moduleText { color: #555; font-size: 14px; margin: 0; }
</style>
