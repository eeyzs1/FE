<script setup lang="ts">
import { ref, provide, shallowRef, markRaw, useTemplateRef, useId, type Component } from 'vue'
import { themeKey, appNameKey } from '../injectionKeys'
import TabHome from '../components/TabHome.vue'
import TabProfile from '../components/TabProfile.vue'
import TabSettings from '../components/TabSettings.vue'
import InjectDemo from '../components/InjectDemo.vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第9课：模板引用 + provide/inject + 动态组件 ====================
//
// 模板引用 (Template Refs)：
// - 获取 DOM 元素或子组件实例的引用
// - 使用 ref attribute + ref() 变量
//
// provide/inject：
// - 跨层级组件通信（祖先 → 后代）
// - 解决 props 逐层传递的"prop drilling"问题
//
// 动态组件：
// - <component :is="..."> 动态切换组件
// - <KeepAlive> 缓存组件状态
//
// ⚠️ 常见错误：
// - 动态组件不用 shallowRef：导致深层响应式性能开销
// - 动态组件不用 markRaw：组件对象被代理导致警告
// - KeepAlive 不设 max：缓存过多组件导致内存泄漏
// - ref 在 mounted 前访问：值为 null
//
// 💡 最佳实践：
// - 动态组件用 shallowRef + markRaw 存储
// - KeepAlive 配合 include/exclude 精确控制缓存
// - Vue 3.5+ 推荐用 useTemplateRef 替代 ref(null)

// --- 模板引用 ---
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLUListElement | null>(null)
const scrollBox = ref<HTMLDivElement | null>(null)

function focusInput() {
  inputRef.value?.focus()
}

function scrollToBottom() {
  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight
  }
}

function scrollToTop() {
  if (scrollBox.value) {
    scrollBox.value.scrollTop = 0
  }
}

const logItems = Array.from({ length: 50 }, (_, i) => `日志条目 #${i + 1}`)

// --- Vue 3.5+ 新特性 ---
// useTemplateRef — 新的模板引用方式（Vue 3.5+）
const newInputRef = useTemplateRef<HTMLInputElement>('newInput')
function focusNewInput() {
  newInputRef.value?.focus()
}

const codeUseTemplateRef = `// 旧方式（仍然有效）
const inputRef = ref<HTMLInputElement | null>(null)
// template: <input ref="inputRef" />

// 新方式（Vue 3.5+，推荐）
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
// template: <input ref="inputRef" />
// ref 字符串必须与 useTemplateRef 参数一致`

// useId — 生成 SSR 安全的唯一 ID（Vue 3.5+）
const uniqueId = useId()

// --- provide/inject ---
const theme = ref<'light' | 'dark'>('light')
const appName = ref('Vue 3 教程')

provide(themeKey, theme)
provide(appNameKey, appName)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// --- 动态组件 ---
type TabName = 'home' | 'profile' | 'settings'
const currentTab = shallowRef<Component>(markRaw(TabHome))
const currentTabName = ref<TabName>('home')

const tabs: Record<TabName, { component: Component; label: string; icon: string }> = {
  home: { component: markRaw(TabHome), label: '首页', icon: '🏠' },
  profile: { component: markRaw(TabProfile), label: '个人', icon: '👤' },
  settings: { component: markRaw(TabSettings), label: '设置', icon: '⚙️' },
}

function switchTab(name: TabName) {
  currentTabName.value = name
  currentTab.value = tabs[name].component
}

// KeepAlive 演示
const keepAliveOn = ref(true)

// KeepAlive 高级选项
const keepAliveInclude = ref<string[]>(['TabHome', 'TabProfile'])
const keepAliveMax = ref(3)
const includeMode = ref<'all' | 'include' | 'exclude'>('all')
</script>

<template>
  <div class="lesson">
    <h1>📖 第9课：模板引用 + provide/inject + 动态组件</h1>
    <p class="desc">直接操作 DOM、跨层级通信、动态切换组件</p>

    <div class="section">
      <h2>🔹 模板引用 (Template Refs)</h2>
      <div class="card">
        <p>通过 ref attribute 获取 DOM 元素引用</p>
        <input ref="inputRef" placeholder="点击按钮聚焦我" />
        <div class="btn-group">
          <button @click="focusInput">🎯 聚焦输入框</button>
        </div>
        <p class="tip">使用 ref="inputRef" 绑定，const inputRef = ref(null) 接收</p>
      </div>

      <div class="card">
        <p>操作 DOM 滚动：</p>
        <div class="btn-group">
          <button @click="scrollToBottom">⬇️ 滚动到底部</button>
          <button @click="scrollToTop">⬆️ 滚动到顶部</button>
        </div>
        <ul ref="listRef" class="scroll-list">
          <li v-for="item in logItems" :key="item">{{ item }}</li>
        </ul>
        <p class="tip">通过 ref 获取 DOM 元素后可以调用 scrollTo 等原生方法</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Vue 3.5+ 新特性</h2>
      <div class="card">
        <h3>useTemplateRef() — 新的模板引用方式</h3>
        <p>Vue 3.5+ 推荐使用 <code>useTemplateRef()</code> 替代 <code>ref(null)</code> 获取模板引用</p>
        <input ref="newInput" placeholder="useTemplateRef 演示" />
        <div class="btn-group">
          <button @click="focusNewInput">🎯 useTemplateRef 聚焦</button>
        </div>
        <DemoBox title="useTemplateRef() — Vue 3.5+ 新的模板引用方式" :code="codeUseTemplateRef">
          <input ref="newInput" placeholder="useTemplateRef 演示" />
          <div class="btn-group">
            <button @click="focusNewInput">🎯 useTemplateRef 聚焦</button>
          </div>
        </DemoBox>
        <p class="tip">useTemplateRef 的优势：更明确的语义，避免 ref 变量名与模板 ref 绑定混淆</p>
      </div>

      <div class="card">
        <h3>useId() — SSR 安全的唯一 ID</h3>
        <p>生成的唯一 ID：<code>{{ uniqueId }}</code></p>
        <div class="code-block">
          <pre>import { useId } from 'vue'

const id = useId() // 例如 'v-0-0'
// 适合给表单元素生成唯一 id
// &lt;label :for="id"&gt;名称&lt;/label&gt;
// &lt;input :id="id" /&gt;</pre>
        </div>
        <p class="tip">useId 在 SSR 和客户端生成相同 ID，避免水合不匹配</p>
      </div>

      <div class="card">
        <h3>其他 Vue 3.3+ / 3.5+ 新特性</h3>
        <div class="code-block">
          <pre>// defineOptions（Vue 3.3+）
// 在 &lt;script setup&gt; 中声明组件选项
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false,
})

// Reactive Props Destructure（Vue 3.5+）
// 解构 props 时保持响应性
const { title, count = 0 } = defineProps&lt;{
  title: string
  count?: number
}&gt;()
// title 和 count 直接可用，且保持响应性
// 编译器自动转换为 props.title</pre>
        </div>
        <p class="tip">这些新特性让 Composition API 更完整，减少对选项式 API 的依赖</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 provide / inject — 跨层级通信</h2>
      <div class="card">
        <p>当前主题：<strong>{{ theme }}</strong></p>
        <button @click="toggleTheme">🔄 切换主题</button>
        <InjectDemo />
        <p class="tip">祖先组件 provide(themeKey, ref)，子组件 InjectDemo 通过 inject(themeKey) 获取</p>
        <p class="tip">使用 Symbol + InjectionKey 替代字符串 key，类型安全且避免冲突</p>
      </div>

      <div class="card">
        <h3>provide/inject vs props 对比</h3>
        <div class="compare">
          <div class="compare-item">
            <strong>Props</strong>
            <span>父→子，逐层传递（prop drilling）</span>
            <code>A → B → C → D</code>
          </div>
          <div class="compare-item">
            <strong>provide/inject</strong>
            <span>祖先→任意后代，跳过中间层</span>
            <code>A → D（B、C 无需感知）</code>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 动态组件 &lt;component :is&gt;</h2>
      <div class="card">
        <div class="tab-bar">
          <button
            v-for="(tab, name) in tabs"
            :key="name"
            @click="switchTab(name as TabName)"
            :class="['tab-btn', { active: currentTabName === name }]"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>
        <div class="tab-content">
          <component :is="currentTab" />
        </div>
        <p class="tip">&lt;component :is="componentRef"&gt; 动态渲染不同组件</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 KeepAlive — 缓存组件状态</h2>
      <div class="card">
        <label class="toggle">
          <input type="checkbox" v-model="keepAliveOn" /> 启用 KeepAlive
        </label>
        <div class="tab-bar">
          <button
            v-for="(tab, name) in tabs"
            :key="name"
            @click="switchTab(name as TabName)"
            :class="['tab-btn', { active: currentTabName === name }]"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>
        <div class="tab-content">
          <KeepAlive v-if="keepAliveOn">
            <component :is="currentTab" />
          </KeepAlive>
          <component :is="currentTab" v-else />
        </div>
        <p class="tip">KeepAlive 缓存组件实例，切换时不销毁，保留输入状态</p>
        <p class="tip">关闭 KeepAlive 后切换标签，输入内容会丢失</p>
      </div>

      <div class="card">
        <h3>KeepAlive 高级选项</h3>
        <div class="ka-controls">
          <div class="ka-control">
            <label>缓存模式：</label>
            <select v-model="includeMode">
              <option value="all">缓存全部</option>
              <option value="include">include（仅缓存指定组件）</option>
              <option value="exclude">exclude（排除指定组件）</option>
            </select>
          </div>
          <div class="ka-control" v-if="includeMode !== 'all'">
            <label>{{ includeMode === 'include' ? '包含' : '排除' }}的组件：</label>
            <label class="toggle" v-for="name in ['TabHome', 'TabProfile', 'TabSettings']" :key="name">
              <input
                type="checkbox"
                :checked="keepAliveInclude.includes(name)"
                @change="(e: Event) => {
                  const checked = (e.target as HTMLInputElement).checked
                  if (checked) keepAliveInclude.push(name)
                  else keepAliveInclude = keepAliveInclude.filter(n => n !== name)
                }"
              />
              {{ name }}
            </label>
          </div>
          <div class="ka-control">
            <label>max（最大缓存数）：<strong>{{ keepAliveMax }}</strong></label>
            <input type="range" v-model.number="keepAliveMax" min="1" max="5" />
            <p class="tip">超过 max 时，最久没访问的缓存会被销毁（LRU 策略）</p>
          </div>
        </div>
        <div class="tab-bar">
          <button
            v-for="(tab, name) in tabs"
            :key="name"
            @click="switchTab(name as TabName)"
            :class="['tab-btn', { active: currentTabName === name }]"
          >
            {{ tab.icon }} {{ tab.label }}
          </button>
        </div>
        <div class="tab-content">
          <KeepAlive
            v-if="keepAliveOn"
            :include="includeMode === 'include' ? keepAliveInclude : undefined"
            :exclude="includeMode === 'exclude' ? keepAliveInclude : undefined"
            :max="keepAliveMax"
          >
            <component :is="currentTab" />
          </KeepAlive>
          <component :is="currentTab" v-else />
        </div>
        <p class="tip">include/exclude：字符串/正则/数组，按组件 name 匹配</p>
        <p class="tip">max：最大缓存实例数，超出时销毁最久未访问的（LRU）</p>
      </div>

      <div class="card">
        <h3>onActivated / onDeactivated 生命周期</h3>
        <p>被 KeepAlive 缓存的组件切换时会触发激活/停用钩子，而非 mounted/unmounted</p>
        <div class="lifecycle-compare">
          <div class="lc-item">
            <strong>普通组件</strong>
            <span>显示 → mounted</span>
            <span>隐藏 → unmounted</span>
          </div>
          <div class="lc-item">
            <strong>KeepAlive 组件</strong>
            <span>首次显示 → mounted</span>
            <span>再次显示 → <em>onActivated</em></span>
            <span>隐藏 → <em>onDeactivated</em></span>
            <span>（不会 unmounted）</span>
          </div>
        </div>
        <p class="tip">切换到首页 Tab 可以看到 onActivated/onDeactivated 的日志输出</p>
        <p class="tip">onActivated 在 mounted 之后也会调用，onDeactivated 在 unmounted 之前也会调用</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>模板引用</strong><span>ref attribute + ref() 变量获取 DOM/组件实例</span></div>
        <div class="point"><strong>useTemplateRef</strong><span>Vue 3.5+ 新方式，更明确的模板引用语义</span></div>
        <div class="point"><strong>useId</strong><span>Vue 3.5+ 生成 SSR 安全的唯一 ID</span></div>
        <div class="point"><strong>defineOptions</strong><span>Vue 3.3+ 在 script setup 中声明组件选项</span></div>
        <div class="point"><strong>provide</strong><span>祖先组件提供数据，provide(injectionKey, value)</span></div>
        <div class="point"><strong>inject</strong><span>后代组件注入数据，inject(injectionKey, defaultValue)</span></div>
        <div class="point"><strong>InjectionKey</strong><span>使用 Symbol + InjectionKey 提供类型安全的 provide/inject</span></div>
        <div class="point"><strong>动态组件</strong><span>&lt;component :is&gt; 动态切换渲染的组件</span></div>
        <div class="point"><strong>KeepAlive</strong><span>缓存组件实例，避免重复创建销毁</span></div>
        <div class="point"><strong>include</strong><span>只缓存匹配名称的组件（字符串/正则/数组）</span></div>
        <div class="point"><strong>exclude</strong><span>不缓存匹配名称的组件</span></div>
        <div class="point"><strong>max</strong><span>最大缓存数，超出时 LRU 销毁最久未访问的</span></div>
        <div class="point"><strong>onActivated</strong><span>被缓存的组件重新激活时触发</span></div>
        <div class="point"><strong>onDeactivated</strong><span>被缓存的组件停用（切走）时触发</span></div>
        <div class="point"><strong>shallowRef</strong><span>动态组件用 shallowRef 避免深度响应式开销</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-list {
  height: 120px; overflow-y: auto; border: 2px solid #e9ecef;
  border-radius: 8px; padding: 8px; list-style: none; margin-top: 8px;
}
.scroll-list li { padding: 4px 8px; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
.compare { display: flex; gap: 12px; margin-top: 8px; }
.compare-item {
  flex: 1; padding: 12px; border-radius: 8px;
  background: white; border: 1px solid #e9ecef;
}
.compare-item strong { color: #42b883; display: block; margin-bottom: 4px; }
.compare-item span { font-size: 13px; color: #666; display: block; }
.compare-item code { font-size: 12px; color: #888; margin-top: 4px; display: block; }
.tab-bar { display: flex; gap: 4px; margin-bottom: 12px; }
.tab-btn {
  padding: 8px 16px; border: none; border-radius: 8px 8px 0 0;
  background: #e9ecef; color: #666; cursor: pointer;
  font-size: 14px; transition: all 0.2s;
}
.tab-btn.active { background: #42b883; color: white; }
.tab-btn:hover:not(.active) { background: #ddd; }
.tab-content {
  border: 2px solid #42b883; border-radius: 0 8px 8px 8px;
  padding: 16px; min-height: 80px;
}
.ka-controls { margin-bottom: 12px; }
.ka-control { margin: 8px 0; padding: 8px 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef; }
.ka-control label { font-size: 14px; color: #555; }
.ka-control select {
  padding: 4px 8px; border: 2px solid #e9ecef; border-radius: 6px;
  font-size: 13px; margin-left: 8px;
}
.ka-control input[type="range"] { width: 120px; margin-left: 8px; }
.lifecycle-compare { display: flex; gap: 12px; margin: 12px 0; }
.lc-item {
  flex: 1; padding: 12px; border-radius: 8px;
  background: white; border: 1px solid #e9ecef;
}
.lc-item strong { color: #42b883; display: block; margin-bottom: 6px; }
.lc-item span { font-size: 13px; color: #555; display: block; margin: 2px 0; }
.lc-item em { color: #42b883; font-weight: bold; font-style: normal; }
</style>
