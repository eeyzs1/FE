<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// ==================== 第17课：TypeScript 与 Vue ====================
//
// Vue 3 + TypeScript 是官方推荐的开发方式
// 本项目就使用了 TypeScript + <script setup lang="ts">

// --- ref 类型标注 ---
const count = ref<number>(0)
const message = ref<string>('Hello TS!')
const isActive = ref<boolean>(true)

// ref 自动类型推导
// const autoString = ref('自动推导为 string') // 不需要手动标注
// const autoNumber = ref(42) // 自动推导为 number

// --- reactive 类型标注 ---
interface User {
  name: string
  age: number
  email: string
  address?: string
}

const user = reactive<User>({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
})

// --- computed 类型标注 ---
// const doubleCount = computed<number>(() => count.value * 2)
const userInfo = computed(() => `${user.name}, ${user.age}岁`)

// --- defineProps 类型标注 ---
// 在子组件中（这里展示语法）
const propsCode = [
  '// 方式1：泛型（推荐）',
  'defineProps<{',
  '  title: string',
  '  count?: number',
  '  items: string[]',
  '  callback: (id: number) => void',
  '  user: { name: string; age: number }',
  '}>()',
  '',
  '// 方式2：带默认值',
  'withDefaults(defineProps<{',
  '  title: string',
  '  count?: number',
  '}>(), {',
  '  count: 0,',
  '})',
  '',
  '// 方式3：复杂类型从外部导入',
  'interface Props {',
  '  options: SelectOption[]',
  '  modelValue: string',
  '}',
  'defineProps<Props>()',
].join('\n')

// --- defineEmits 类型标注 ---
const emitsCode = [
  '// 类型标注事件',
  'defineEmits<{',
  "  change: [value: string]",
  '  update: [id: number, data: object]',
  '  delete: [id: number]',
  '}>()',
  '',
  '// 使用',
  "emit('change', 'new value')",
  "emit('update', 1, { name: 'test' })",
].join('\n')

// --- 模板引用类型 ---
const inputRef = ref<HTMLInputElement | null>(null)
// const divRef = ref<HTMLDivElement | null>(null)

function focusInput() {
  inputRef.value?.focus()
}

// --- 事件处理类型 ---
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  message.value = target.value
}

// --- 组件类型 ---
type Status = 'idle' | 'loading' | 'success' | 'error'
const status = ref<Status>('idle')

// --- defineExpose 演示 ---
const exposeCount = ref(0)
function exposeReset() { exposeCount.value = 0 }
function exposeIncrement() { exposeCount.value++ }
defineExpose({ exposeCount, exposeReset, exposeIncrement })

// --- 泛型组件 ---
const genericCode = [
  '// 泛型组件（Vue 3.3+）',
  '<script setup lang="ts" generic="T extends string | number">',
  'defineProps<{',
  '  items: T[]',
  '  selected: T',
  '}>()',
  '</' + 'script>',
  '',
  '// 使用',
  '<List :items="[1, 2, 3]" :selected="1" />',
  "<List :items=\"['a', 'b']\" :selected=\"'a'\" />",
].join('\n')

const instanceTypeCode = [
  '// 获取组件实例类型',
  "import ChildComp from './ChildComp.vue'",
  '',
  '// 方式1：InstanceType + typeof',
  'type ChildInstance = InstanceType<typeof ChildComp>',
  '',
  '// 方式2：在模板 ref 中使用',
  'const childRef = ref<ChildInstance | null>(null)',
  '',
  '// 调用子组件暴露的方法',
  'childRef.value?.someMethod()',
].join('\n')
</script>

<template>
  <div class="lesson">
    <h1>📖 第17课：TypeScript 与 Vue</h1>
    <p class="desc">Vue 3 完全拥抱 TypeScript，类型安全让开发更可靠</p>

    <div class="section">
      <h2>🔹 ref 类型标注</h2>
      <div class="card">
        <p>显式标注：<code>ref&lt;number&gt;(0)</code></p>
        <p>自动推导：<code>ref('hello')</code> → 自动推导为 Ref&lt;string&gt;</p>
        <div class="ts-demo">
          <label>count (number)：<input type="number" v-model.number="count" /></label>
          <label>message (string)：<input v-model="message" /></label>
          <label>isActive (boolean)：<input type="checkbox" v-model="isActive" /></label>
        </div>
        <p>count: {{ count }} (typeof: number)</p>
        <p>message: {{ message }} (typeof: string)</p>
        <p>isActive: {{ isActive }} (typeof: boolean)</p>
        <p class="tip">简单类型可以自动推导，复杂类型建议显式标注</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 reactive + interface</h2>
      <div class="card">
        <div class="code-block">
          <pre>interface User {
  name: string
  age: number
  email: string
  address?: string    // 可选属性
}

const user = reactive&lt;User&gt;({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
})</pre>
        </div>
        <div class="ts-demo">
          <label>姓名：<input v-model="user.name" /></label>
          <label>年龄：<input type="number" v-model.number="user.age" /></label>
          <label>邮箱：<input v-model="user.email" /></label>
        </div>
        <p>{{ userInfo }}</p>
        <p class="tip">interface 定义类型，reactive&lt;T&gt; 标注，IDE 自动补全</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 defineProps 类型标注</h2>
      <div class="card">
        <div class="code-block">
          <pre>{{ propsCode }}</pre>
        </div>
        <p class="tip">推荐使用泛型方式 defineProps&lt;{}&gt;()，比选项式更类型安全</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 defineEmits 类型标注</h2>
      <div class="card">
        <div class="code-block">
          <pre>{{ emitsCode }}</pre>
        </div>
        <p class="tip">标注事件名和参数类型，调用 emit 时自动检查参数</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 模板引用 + 事件类型</h2>
      <div class="card">
        <input ref="inputRef" :value="message" @input="handleInput" placeholder="类型安全的事件处理" />
        <button @click="focusInput">🎯 聚焦</button>
        <div class="code-block">
          <pre>// 模板引用类型
const inputRef = ref&lt;HTMLInputElement | null&gt;(null)

// 事件处理类型
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  message.value = target.value
}</pre>
        </div>
        <p class="tip">DOM 相关操作需要正确的类型断言 (as HTMLInputElement)</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 联合类型 + 状态管理</h2>
      <div class="card">
        <p>状态：<strong>{{ status }}</strong></p>
        <div class="btn-group">
          <button @click="status = 'idle'">⏸️ idle</button>
          <button @click="status = 'loading'">⏳ loading</button>
          <button @click="status = 'success'">✅ success</button>
          <button @click="status = 'error'">❌ error</button>
        </div>
        <div class="code-block">
          <pre>type Status = 'idle' | 'loading' | 'success' | 'error'
const status = ref&lt;Status&gt;('idle')
// 只能赋值为这四个字符串，其他值会报错</pre>
        </div>
        <p class="tip">联合类型限制可选值，防止拼写错误，IDE 自动补全</p>
      </div>
    </div>

    <div class="section">
      <h2>� defineExpose — 暴露组件方法</h2>
      <div class="card">
        <p>默认情况下，组件通过 ref 获取的实例是空的。用 defineExpose 暴露方法/属性：</p>
        <p>exposeCount = <strong>{{ exposeCount }}</strong></p>
        <div class="btn-group">
          <button @click="exposeIncrement">➕ exposeIncrement</button>
          <button @click="exposeReset">🔄 exposeReset</button>
        </div>
        <div class="code-block">
          <pre>// 子组件：暴露方法和属性
const exposeCount = ref(0)
function exposeReset() { exposeCount.value = 0 }
function exposeIncrement() { exposeCount.value++ }
defineExpose({ exposeCount, exposeReset, exposeIncrement })

// 父组件：通过 ref 调用
const childRef = ref&lt;ChildInstance | null&gt;(null)
childRef.value?.exposeIncrement()
childRef.value?.exposeReset()</pre>
        </div>
        <p class="tip">defineExpose 让父组件可以通过模板 ref 调用子组件的方法</p>
        <p class="tip">&lt;script setup&gt; 组件默认是封闭的，必须显式 expose 才能从外部访问</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 泛型组件（Vue 3.3+）</h2>
      <div class="card">
        <div class="code-block">
          <pre>{{ genericCode }}</pre>
        </div>
        <p class="tip">generic 属性让组件可以接受类型参数，实现类型安全的复用</p>
        <p class="tip">Vue 3.3+ 支持，配合 defineProps 使用，无需手动声明泛型</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 InstanceType — 组件实例类型</h2>
      <div class="card">
        <div class="code-block">
          <pre>{{ instanceTypeCode }}</pre>
        </div>
        <p class="tip">InstanceType&lt;typeof Comp&gt; 获取组件暴露的类型，配合 defineExpose 使用</p>
      </div>
    </div>

    <div class="section">
      <h2>� TS + Vue 要点</h2>
      <div class="knowledge">
        <div class="point"><strong>lang="ts"</strong><span>&lt;script setup lang="ts"&gt; 启用 TypeScript</span></div>
        <div class="point"><strong>ref&lt;T&gt;</strong><span>泛型标注 ref 类型，简单值可自动推导</span></div>
        <div class="point"><strong>reactive&lt;T&gt;</strong><span>配合 interface 标注对象类型</span></div>
        <div class="point"><strong>defineProps&lt;{}&gt;</strong><span>泛型方式标注 Props，推荐</span></div>
        <div class="point"><strong>defineEmits&lt;{}&gt;</strong><span>标注事件名和参数类型</span></div>
        <div class="point"><strong>defineExpose</strong><span>暴露组件方法/属性给父组件 ref 访问</span></div>
        <div class="point"><strong>模板 ref</strong><span>ref&lt;HTMLElement | null&gt;(null)</span></div>
        <div class="point"><strong>事件类型</strong><span>e: Event，需要 as 断言具体元素类型</span></div>
        <div class="point"><strong>联合类型</strong><span>限制可选值，防止拼写错误</span></div>
        <div class="point"><strong>泛型组件</strong><span>generic="T" 属性，Vue 3.3+ 支持</span></div>
        <div class="point"><strong>InstanceType</strong><span>获取组件实例类型，配合 defineExpose</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ts-demo { display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
.ts-demo label { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.ts-demo input { flex: 1; }
.ts-demo input[type="checkbox"] { width: auto; flex: none; }
</style>
