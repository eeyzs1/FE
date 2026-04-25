<script setup lang="ts">
import { ref, provide } from 'vue'
import { themeKey, appNameKey } from '../injectionKeys'
import ChildCard from '../components/ChildCard.vue'
import SlotDemo from '../components/SlotDemo.vue'
import CustomInput from '../components/CustomInput.vue'
import CustomVModel from '../components/CustomVModel.vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第3课：组件通信 ====================
//
// Vue 组件通信是核心中的核心，本课覆盖所有通信方式：
// 1. Props     — 父 → 子 传递数据（单向数据流）
// 2. Emit      — 子 → 父 发送事件
// 3. Slots     — 父 → 子 传递模板内容（内容分发）
// 4. v-model   — 双向绑定（Props + Emit 的语法糖）
// 5. provide/inject — 跨层级通信（祖先 → 后代）
// 6. defineExpose — 父组件调用子组件方法
//
// ⚠️ 常见错误：
// - 直接修改 props：props.xxx = 'new' 会触发警告
// - emit 事件名用 camelCase：模板中必须用 kebab-case
// - provide 用字符串 key：无法保证类型安全，应使用 InjectionKey
//
// 💡 最佳实践：
// - 遵循单向数据流：子组件通过 emit 通知父组件修改
// - provide/inject 使用 Symbol + InjectionKey 保证类型安全
// - 复杂表单用 v-model + defineModel，简单展示用 props

// ========== Props 演示 ==========
const parentMessage = ref('来自父组件的问候！')
const childFeedback = ref('等待子组件回应...')
const scoreFromChild = ref(0)

function onChildRespond(msg: string) {
  childFeedback.value = msg
  addLog('子组件回复: ' + msg)
}

function onScoreChange(delta: number) {
  scoreFromChild.value += delta
  addLog('分数变化: ' + delta)
}

// Props 验证演示
const validatedTitle = ref('动态标题')
const validatedCount = ref(10)
const validatedVisible = ref(true)
const validatedTags = ref(['Vue', 'TypeScript'])

const codePropsValidation = `// Props 支持的类型：
defineProps<{
  // 基础类型
  title: string              // 字符串
  count: number              // 数字
  visible: boolean           // 布尔值

  // 复杂类型
  tags: string[]             // 数组
  user: { name: string }     // 对象字面量
  callback: (id: number) => void  // 函数
  status?: 'active' | 'inactive'  // 可选 + 联合类型
}>()

// 设置默认值
withDefaults(defineProps<{
  title: string
  count?: number            // 可选才有默认值
}>(), {
  count: 0                  // 默认值
})`

// ========== Slots 演示 ==========
const slotVariant = ref(1)

// ========== v-model 演示 ==========
const customUsername = ref('')
const customColor = ref('green')

// ========== provide/inject 演示 ==========
const themeMode = ref<'light' | 'dark'>('light')
provide(themeKey, themeMode)
provide(appNameKey, ref('Vue 教学项目'))

function toggleTheme() {
  themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
}

// ========== 事件日志 ==========
const eventLog = ref<string[]>([])
function addLog(msg: string) {
  eventLog.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (eventLog.value.length > 8) eventLog.value.shift()
}
</script>

<template>
  <div class="lesson">
    <h1>📖 第3课：组件通信</h1>
    <p class="desc">Props 向下传数据、Emit 向上发事件、Slots 传递模板、v-model 双向绑定、provide/inject 跨层级通信</p>

    <!-- ==================== 一、Props ==================== -->
    <div class="section">
      <h2>🔹 一、Props — 父传子（单向数据流）</h2>

      <!-- 基础 Props -->
      <div class="card">
        <h3>1. 基础 Props 传递</h3>
        <p>父组件通过 <code>:propName</code>（v-bind 缩写）向子组件传值：</p>
        <div class="demo-row">
          <label>父组件消息：<input v-model="parentMessage" /></label>
        </div>
        <ChildCard
          :message="parentMessage"
          :score="scoreFromChild"
          @respond="onChildRespond"
          @change-score="onScoreChange"
        />
        <p>子组件反馈：<strong>{{ childFeedback }}</strong></p>
        <p class="tip">子组件收到 props 后只读使用，不能修改。需要修改时通过 emit 通知父组件。</p>
        <div class="code-block">
          <pre>// 父组件模板
&lt;ChildCard
  :message="parentMessage"       <!-- 传字符串 -->
  :score="scoreFromChild"        <!-- 传数字 -->
  @respond="onChildRespond"      <!-- 监听事件 -->
  @change-score="onScoreChange"  <!-- kebab-case 事件名 -->
/&gt;

// 子组件 script
const props = withDefaults(defineProps&lt;{
  message: string               // 必填字符串
  score: number                 // 必填数字
}&gt;(), {
  message: '默认消息',           // 默认值
  score: 0                      // 默认值
})

const emit = defineEmits&lt;{
  respond: [msg: string]
  changeScore: [delta: number]
}&gt;()</pre>
        </div>
      </div>

      <!-- Props 类型验证 -->
      <div class="card">
        <h3>2. Props 类型验证</h3>
        <p>Vue 的泛型 defineProps 自动进行类型检查：</p>
        <div class="demo-row">
          <label>标题：<input v-model="validatedTitle" /></label>
          <label>数量：<input type="number" v-model.number="validatedCount" /></label>
          <label class="toggle">
            <input type="checkbox" v-model="validatedVisible" /> 显示
          </label>
        </div>
        <div class="props-preview" :class="{ hidden: !validatedVisible }">
          <p><strong>{{ validatedTitle }}</strong></p>
          <p>数量：{{ validatedCount }} | 标签：{{ validatedTags.join(', ') }}</p>
        </div>
        <div class="btn-group">
          <button @click="validatedTags.push('Pinia')">➕ 添加标签</button>
          <button @click="validatedTags.pop()" :disabled="!validatedTags.length">➖ 移除标签</button>
        </div>
        <DemoBox title="Props 类型验证 — defineProps 泛型" :code="codePropsValidation">
          <p>标题：<strong>{{ validatedTitle }}</strong></p>
          <p>数量：<strong>{{ validatedCount }}</strong> (typeof: {{ typeof validatedCount }})</p>
          <p>标签：<span v-for="t in validatedTags" :key="t" style="background:#42b883;color:white;padding:2px 8px;border-radius:10px;margin:2px;font-size:12px;">{{ t }}</span></p>
          <p class="tip">传入错误类型时 TypeScript 会报错，Vue 运行时也会警告</p>
        </DemoBox>
        <p class="tip">传入错误类型时 TypeScript 会报错，Vue 运行时也会警告。这就是类型安全的好处。</p>
      </div>

      <!-- 单向数据流原则 -->
      <div class="card">
        <h3>3. 单向数据流原则</h3>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>❌ 错误做法：直接修改 props</h4>
            <pre>// 子组件中直接修改 props —— 不允许！
props.message = '新消息'  // 警告！
props.count++             // 警告！</pre>
            <p>Props 是只读的，直接修改会导致不可预测的行为</p>
          </div>
          <div class="compare-col good">
            <h4>✅ 正确做法：emit 通知父组件修改</h4>
            <pre>// 子组件通知父组件
emit('update:message', '新消息')
emit('increment')

// 父组件监听并更新
&lt;Child @update:message="msg = $event" /&gt;</pre>
            <p>保持单向数据流，数据流向清晰可追踪</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 二、Emit ==================== -->
    <div class="section">
      <h2>🔹 二、Emit — 子传父（触发事件）</h2>
      <div class="card">
        <h3>Emit 的工作原理</h3>
        <p>当前分数：<strong>{{ scoreFromChild }}</strong></p>
        <p>事件日志：</p>
        <div class="log-area">
          <p v-for="(log, i) in eventLog" :key="i" class="log-item">{{ log }}</p>
          <p v-if="!eventLog.length" class="tip">操作上方 ChildCard 组件查看日志</p>
        </div>
        <div class="code-block">
          <pre>// ===== 子组件定义事件 =====
const emit = defineEmits&lt;{
  // 事件名: [参数类型列表]
  respond: [msg: string]           // 无返回值的事件
  changeScore: [delta: number]     // 携带一个参数
  update: [id: number, data: object]  // 携带多个参数
  delete: [id: number]             // 删除类事件
}&gt;()

// 触发事件
emit('respond', '你好父组件！')
emit('changeScore', 1)
emit('update', 42, { name: 'test' })

// ===== 父组件监听事件 =====
&lt;ChildCard
  @respond="onRespond"
  @change-score="onScoreChange"
  @delete="id => handleDelete(id)"
/&gt;

// 内联写法
&lt;ChildCard @change-score="score += $event" /&gt;</pre>
        </div>
        <p class="tip">defineEmits 的泛型声明让 TypeScript 自动校验事件名和参数类型，写错会报错。</p>
        <p class="tip">事件命名推荐 kebab-case（change-score），在 JS 中自动转为 camelCase（changeScore）。</p>
      </div>
    </div>

    <!-- ==================== 三、Slots ==================== -->
    <div class="section">
      <h2>🔹 三、Slots — 内容分发（父→子传模板）</h2>
      <div class="btn-group">
        <button @click="slotVariant = 1" :class="{ active: slotVariant === 1 }">默认插槽</button>
        <button @click="slotVariant = 2" :class="{ active: slotVariant === 2 }">具名插槽</button>
        <button @click="slotVariant = 3" :class="{ active: slotVariant === 3 }">作用域插槽</button>
      </div>

      <!-- 默认插槽 -->
      <div class="card" v-if="slotVariant === 1">
        <h3>默认插槽（Default Slot）</h3>
        <SlotDemo>
          <p>✨ 这是通过默认插槽传入的内容，完全由父组件决定</p>
          <p>🎯 子组件用 &lt;slot&gt;&lt;/slot&gt; 占位，父组件填充内容</p>
        </SlotDemo>
        <div class="code-block">
          <pre>// 子组件 SlotDemo.vue
&lt;template&gt;
  &lt;div class="wrapper"&gt;
    &lt;h3&gt;标题&lt;/h3&gt;
    &lt;slot&gt;&lt;/slot&gt;          &lt;!-- 占位符 --&gt;
    &lt;p&gt;底部&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 父组件使用
&lt;SlotDemo&gt;
  &lt;p&gt;这里的内容会替换 &lt;slot&gt;&lt;/p&gt; 的位置&lt;/p&gt;
&lt;/SlotDemo&gt;

// 渲染结果：
// &lt;div class="wrapper"&gt;
//   &lt;h3&gt;标题&lt;/h3&gt;
//   &lt;p&gt;这里的内容会替换 &lt;slot&gt;&lt;/slot&gt; 的位置&lt;/p&gt;
//   &lt;p&gt;底部&lt;/p&gt;
// &lt;/div&gt;</pre>
        </div>
        <p class="tip">如果父组件不传内容，&lt;slot&gt; 会显示子组件写的后备（fallback）内容。</p>
      </div>

      <!-- 具名插槽 -->
      <div class="card" v-if="slotVariant === 2">
        <h3>具名插槽（Named Slots）</h3>
        <SlotDemo>
          <template #header>
            <h3 style="color:#ff9800;margin:0;">🎯 这是自定义头部（#header 插槽）</h3>
          </template>
          <template #footer>
            <p style="color:#666;margin:8px 0 0;">📋 这是自定义底部（#footer 插槽）</p>
          </template>
        </SlotDemo>
        <div class="code-block">
          <pre>// 子组件有多个 &lt;slot name="xxx"&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;slot name="header" /&gt;    &lt;!-- 头部位置 --&gt;
    &lt;slot /&gt;                   &lt;!-- 默认插槽 --&gt;
    &lt;slot name="footer" /&gt;    &lt;!-- 底部位置 --&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 父组件用 #name 指定插入哪个插槽
&lt;SlotDemo&gt;
  &lt;template #header&gt;
    &lt;h3&gt;我的头部&lt;/h3&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;p&gt;我的底部&lt;/p&gt;
  &lt;/template&gt;
  &lt;!-- 没有 template 包裹的内容进默认插槽 --&gt;
&lt;/SlotDemo&gt;</pre>
        </div>
        <p class="tip"><code>#name</code> 是 <code>v-slot:name</code> 的缩写，只能用在 &lt;template&gt; 上。</p>
      </div>

      <!-- 作用域插槽 -->
      <div class="card" v-if="slotVariant === 3">
        <h3>作用域插槽（Scoped Slots）</h3>
        <p class="tip">作用域插槽让<strong>子组件</strong>可以向<strong>父组件</strong>暴露数据，父组件决定如何渲染这些数据。</p>
        <SlotDemo>
          <template #default="{ items: slotItems }">
            <div class="scoped-list">
              <div v-for="(item, index) in slotItems" :key="item" class="scoped-item">
                <span class="rank">{{ index + 1 }}</span>
                <span class="name">{{ item }}</span>
                <span class="badge">框架</span>
              </div>
            </div>
          </template>
        </SlotDemo>
        <div class="code-block">
          <pre v-pre>// 子组件：通过 :items="data" 绑定数据到插槽
&lt;slot :items="items" /&gt;
// 等价于
&lt;slot :items="items" item-name="items" /&gt;

// 父组件：解构接收子组件暴露的数据
&lt;SlotDemo&gt;
  &lt;template #default="{ items }"&gt;
    &lt;div v-for="item in items"&gt;{{ item }}&lt;/div&gt;
  &lt;/template&gt;
&lt;/SlotDemo&gt;

// 也可以不解构，用 slotProps 访问
&lt;SlotDemo&gt;
  &lt;template #default="slotProps"&gt;
    &lt;div v-for="item in slotProps.items"&gt;{{ item }}&lt;/div&gt;
  &lt;/template&gt;
&lt;/SlotDemo&gt;

// 解构时可以重命名
&lt;template #default="{ items: myList }"&gt;
  &lt;div v-for="item in myList"&gt;{{ item }}&lt;/div&gt;
&lt;/template&gt;</pre>
        </div>
        <p class="tip">作用域插槽是 Vue 最强大的模式之一——它让子组件只负责<strong>提供数据</strong>，父组件负责<strong>渲染逻辑</strong>，实现了完美的关注点分离。</p>
        <p class="tip">典型场景：表格组件（子组件提供行数据，父组件决定每列怎么显示）、列表组件等。</p>
      </div>
    </div>

    <!-- ==================== 四、组件 v-model ==================== -->
    <div class="section">
      <h2>� 四、组件 v-model（双向绑定）</h2>
      <p class="desc">v-model 是 <code>:modelValue</code> + <code>@update:modelValue</code> 的语法糖</p>

      <div class="card">
        <h3>基础 v-model（单个绑定）</h3>
        <CustomInput v-model="customUsername" />
        <p>父组件接收到的值：<strong>{{ customUsername || '(空)' }}</strong></p>
        <div class="code-block">
          <pre>// ===== 子组件实现 v-model =====
// 步骤1：声明 modelValue prop
defineProps&lt;{ modelValue: string }&gt;()

// 步骤2：声明 update:modelValue 事件
defineEmits&lt;{ 'update:modelValue': [value: string] }&gt;()

// 步骤3：模板中使用
&lt;input
  :value="modelValue"
  @input="$emit('update:modelValue',
    ($event.target as HTMLInputElement).value)"
/&gt;

// ===== 父组件使用 =====
// 下面两行完全等价：
&lt;CustomInput v-model="username" /&gt;

&lt;CustomInput
  :model-value="username"
  @update:model-value="username = $event"
/&gt;</pre>
        </div>
      </div>

      <div class="card">
        <h3>带参数的 v-model（多个绑定）</h3>
        <CustomVModel v-model:color="customColor" />
        <p>选中的颜色：<strong>{{ customColor }}</strong></p>
        <div class="code-block">
          <pre>// ===== 子组件：带参数的 v-model =====
// 接收 color prop（注意不是 modelValue）
defineProps&lt;{ color: string }&gt;()

// 触发 update:color 事件
defineEmits&lt;{ 'update:color': [value: string] }&gt;()

// 触发更新
$emit('update:color', 'red')

// ===== 父组件使用 =====
&lt;CustomVModel v-model:color="selectedColor" /&gt;

// 等价于：
&lt;CustomVModel
  :color="selectedColor"
  @update:color="selectedColor = $event"
/&gt;

// 可以同时使用多个 v-model 参数
&lt;Editor
  v-model:title="doc.title"
  v-model:content="doc.content"
  v-model:readonly="doc.readonly"
/&gt;</pre>
        </div>
        <p class="tip">v-model 的参数形式让一个组件可以暴露多个双向绑定属性，非常适合表单类组件。</p>
      </div>

      <div class="card">
        <h3>v-model 修饰符</h3>
        <p>Vue 3.4+ 支持 defineModel 宏，简化 v-model 实现：</p>
        <div class="code-block">
          <pre>// Vue 3.4+ 使用 defineModel（更简洁）
const modelValue = defineModel&lt;string&gt;({ required: true })
// 直接读写即可，无需手动 emit
console.log(modelValue.value)  // 读取
modelValue.value = '新值'     // 写入（自动触发 update）

// 带参数和修饰符
const title = defineModel&lt;string&gt;('title')
const formattedText = defineModel&lt;string&gt;('formattedText')</pre>
        </div>
      </div>
    </div>

    <!-- ==================== 五、provide/inject ==================== -->
    <div class="section">
      <h2>🔹 五、provide/inject — 跨层级通信</h2>
      <div class="card">
        <h3>解决"Props 逐层透传"问题</h3>
        <p>当深层子组件需要祖先的数据时，一层层传 props 很麻烦：</p>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>❌ Props 逐层透传</h4>
            <pre>&lt;App&gt;         ← theme 在这里
  &lt;Layout&gt;     ← 透传 theme
    &lt;Page&gt;      ← 透传 theme
      &lt;Button&gt;  ← 才用到 theme
&lt;/App&gt;</pre>
            <p>中间层不需要 theme 但被迫接收再传出</p>
          </div>
          <div class="compare-col good">
            <h4>✅ provide/inject 跨层级</h4>
            <pre>&lt;App&gt;         ← provide('theme', theme)
  &lt;Layout&gt;     ← 无需关心
    &lt;Page&gt;      ← 无需关心
      &lt;Button&gt;  ← inject('theme') 直接获取
&lt;/App&gt;</pre>
            <p>中间层完全不感知，按需注入</p>
          </div>
        </div>

        <div class="demo-row" style="margin-top:12px;">
          <span>当前主题：<strong>{{ themeMode === 'light' ? '☀️ 浅色' : '🌙 深色' }}</strong></span>
          <button @click="toggleTheme(); addLog('主题切换: ' + themeMode)">
            🔄 切换主题
          </button>
        </div>
        <div class="code-block">
          <pre>// ===== 祖先组件 provide 数据 =====
import { ref, provide } from 'vue'

const theme = ref&lt;'light' | 'dark'&gt;('light')

// provide(key, value) — 提供
// key 可以是字符串或 InjectionKey（类型安全）
provide('theme', theme)

// 用 InjectionKey 保证类型安全
import type { InjectionKey } from 'vue'
const themeKey: InjectionKey&lt;Ref&lt;'light' | 'dark'&gt;&gt; = Symbol('theme')
provide(themeKey, theme)


// ===== 后代组件 inject 数据 =====
import { inject } from 'vue'

// 方式1：字符串 key + 默认值
const theme = inject&lt;'light' | 'dark'&gt;('theme', 'light')

// 方式2：InjectionKey（类型安全，无默认值时为 undefined）
const theme = inject(themeKey)

// 方式3：InjectionKey + 默认值
const theme = inject(themeKey, ref('light'))


// ⚠️ 重要：inject 的响应性
// 如果 provide 的是 ref，inject 得到的也是 ref
// 修改 inject 的值会影响所有使用者（共享同一个引用）
const theme = inject&lt;Ref&lt;'light' | 'dark'&gt;&gt;('theme')
function toggle() { theme.value = theme.value === 'light' ? 'dark' : 'light' }</pre>
        </div>
        <p class="tip">provide/inject 不是响应式系统，但 <strong>如果 provide 的是 ref，则 inject 后修改 ref.value 是响应式的</strong>。</p>
        <p class="tip">典型应用场景：主题切换、国际化(i18n)、全局配置、权限信息等跨多层级共享的状态。</p>
      </div>
    </div>

    <!-- ==================== 六、通信方式对比 ==================== -->
    <div class="section">
      <h2>🔹 六、通信方式选择指南</h2>
      <div class="card">
        <table class="comm-table">
          <thead>
            <tr>
              <th>方式</th>
              <th>方向</th>
              <th>适用场景</th>
              <th>特点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Props</strong></td>
              <td>父 → 子</td>
              <td>传递数据给子组件</td>
              <td>单向、只读、类型安全</td>
            </tr>
            <tr>
              <td><strong>Emit</strong></td>
              <td>子 → 父</td>
              <td>通知父组件事件</td>
              <td>携带数据、松耦合</td>
            </tr>
            <tr>
              <td><strong>v-model</strong></td>
              <td>双向</td>
              <td>表单控件、编辑器</td>
              <td>Props+Emit 语法糖</td>
            </tr>
            <tr>
              <td><strong>Slots</strong></td>
              <td>父 → 子</td>
              <td>自定义内容布局</td>
              <td>最灵活的内容分发</td>
            </tr>
            <tr>
              <td><strong>provide/inject</strong></td>
              <td>祖先 → 后代</td>
              <td>跨层级状态共享</td>
              <td>跳过中间层</td>
            </tr>
            <tr>
              <td><strong>Pinia Store</strong></td>
              <td>任意组件</td>
              <td>全局/跨组件状态</td>
              <td>第13课详细讲解</td>
            </tr>
            <tr>
              <td><strong>$refs + expose</strong></td>
              <td>父 → 子</td>
              <td>调用子组件方法</td>
              <td>命令式交互</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ==================== 要点总结 ==================== -->
    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>defineProps</strong><span>声明接收的 props，支持泛型类型标注和 withDefaults 默认值</span></div>
        <div class="point"><strong>单向数据流</strong><span>Props 只读，子组件不能直接修改，需通过 emit 通知父组件</span></div>
        <div class="point"><strong>defineEmits</strong><span>声明可触发的事件，泛型标注参数类型，TS 自动校验</span></div>
        <div class="point"><strong>默认插槽</strong><span>&lt;slot&gt; 占位，父组件写入的内容替换它，不传则显示后备内容</span></div>
        <div class="point"><strong>具名插槽</strong><span>&lt;slot name="x"/&gt;，父组件用 &lt;template #x&gt; 指定位置</span></div>
        <div class="point"><strong>作用域插槽</strong><span>子组件 :data="val" 绑定数据，父组件 { data } 解构接收并决定渲染</span></div>
        <div class="point"><strong>组件 v-model</strong><span>:modelValue + @update:modelValue 的语法糖，支持参数和修饰符</span></div>
        <div class="point"><strong>defineModel</strong><span>Vue 3.4+ 宏，简化 v-model 实现，直接读写即可</span></div>
        <div class="point"><strong>provide/inject</strong><span>跨层级通信，祖先 provide、后代 inject，ref 保持响应性</span></div>
        <div class="point"><strong>InjectionKey</strong><span>用 Symbol 定义 provide/inject 的 key，保证类型安全</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.active { background: #2d7a5a; }
.demo-row {
  display: flex; gap: 12px; align-items: center;
  flex-wrap: wrap; margin: 12px 0;
}
.demo-row label { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.props-preview {
  padding: 16px; background: #e8f5e9; border-radius: 8px;
  border: 2px dashed #42b883; margin: 8px 0; transition: all 0.3s;
}
.props-preview.hidden { opacity: 0.3; text-decoration: line-through; }
.compare-grid { display: flex; gap: 16px; margin-top: 8px; }
.compare-col {
  flex: 1; padding: 14px; border-radius: 8px;
}
.compare-col.bad { background: #fff5f5; border: 2px solid #f4433633; }
.compare-col.good { background: #f0faf5; border: 2px solid #42b88333; }
.compare-col h4 { margin: 0 0 8px; font-size: 14px; }
.compare-col pre {
  font-size: 11px; background: #1e1e1e; color: #d4d4d4;
  padding: 10px; border-radius: 6px; overflow-x: auto; margin: 0;
}
.compare-col p { font-size: 12px; color: #666; margin: 8px 0 0; }
.scoped-list { display: flex; flex-direction: column; gap: 6px; }
.scoped-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; background: white; border-radius: 6px;
  border: 1px solid #e9ecef;
}
.rank {
  width: 24px; height: 24px; border-radius: 50%;
  background: #42b883; color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: bold;
}
.name { font-weight: bold; }
.badge {
  margin-left: auto; font-size: 11px; padding: 2px 8px;
  background: #fff3e0; color: #ff9800; border-radius: 10px;
}
.comm-table {
  width: 100%; border-collapse: collapse; font-size: 13px;
}
.comm-table th {
  background: #42b883; color: white; padding: 10px;
  text-align: left; font-weight: normal;
}
.comm-table td {
  padding: 10px; border-bottom: 1px solid #e9ecef;
  vertical-align: top;
}
.comm-table tr:hover td { background: #f8f9fa; }
.log-area {
  background: #1e1e1e; border-radius: 8px; padding: 8px;
  margin: 8px 0; max-height: 120px; overflow-y: auto;
}
</style>
