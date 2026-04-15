<script setup lang="ts">
import { ref, type DirectiveBinding } from 'vue'
import CustomInput from '../components/CustomInput.vue'
import CustomVModel from '../components/CustomVModel.vue'
import AttrChild from '../components/AttrChild.vue'
import DefineModelDemo from '../components/DefineModelDemo.vue'

// ==================== 第11课：自定义指令 + 透传 Attributes + 组件 v-model ====================

// --- 自定义指令 ---
// 局部自定义指令：在 <script setup> 中以 v 开头的变量自动识别为指令
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
}

const vColor = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.style.color = binding.value
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.style.color = binding.value
  },
}

const vPermission = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    if (!binding.value) {
      el.style.display = 'none'
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    el.style.display = binding.value ? '' : 'none'
  },
}

const vDebounce = {
  mounted(el: HTMLElement, binding: DirectiveBinding<(value: string) => void>) {
    let timer: ReturnType<typeof setTimeout> | null = null
    const handler = binding.value
    const listener = (e: Event) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        handler((e.target as HTMLInputElement).value)
      }, 500)
    }
    el.addEventListener('input', listener)
    ;(el as any)._debounceCleanup = () => {
      if (timer) clearTimeout(timer)
      el.removeEventListener('input', listener)
    }
  },
  unmounted(el: HTMLElement) {
    ;(el as any)._debounceCleanup?.()
  },
}

// 指令演示数据
const focusDemoKey = ref(0)
const textColor = ref('#42b883')
const isAdmin = ref(true)
const debouncedValue = ref('')

function onDebouncedInput(val: string) {
  debouncedValue.value = val
}

// --- 透传 Attributes ---
const extraClass = ref('highlight')
const extraId = ref('my-custom-id')

// --- 组件 v-model ---
const username = ref('')
const selectedColor = ref('green')

// --- defineModel 演示 ---
const dmValue = ref('Hello')
const dmTitle = ref('Vue 3.4+')
const dmFormatted = ref('hello world')
</script>

<template>
  <div class="lesson">
    <h1>📖 第11课：自定义指令 + 透传 Attributes + 组件 v-model</h1>
    <p class="desc">扩展 Vue 的能力：自定义 DOM 操作、属性继承控制、组件级双向绑定</p>

    <div class="section">
      <h2>🔹 自定义指令 — v-focus</h2>
      <div class="card">
        <p>自动聚焦指令：元素挂载时自动获得焦点</p>
        <button @click="focusDemoKey++">🔄 重新创建输入框</button>
        <input :key="focusDemoKey" v-focus placeholder="我会自动聚焦" />
        <p class="tip">v-focus 在 mounted 钩子中调用 el.focus()</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 自定义指令 — v-color（动态值）</h2>
      <div class="card">
        <p>选择颜色：<input type="color" v-model="textColor" /></p>
        <p v-color="textColor" style="font-size: 20px; font-weight: bold;">
          这段文字的颜色由 v-color 指令控制
        </p>
        <p class="tip">指令通过 binding.value 接收动态参数</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 自定义指令 — v-permission（权限控制）</h2>
      <div class="card">
        <label class="toggle">
          <input type="checkbox" v-model="isAdmin" /> 管理员权限
        </label>
        <button v-permission="isAdmin">🔑 管理员专属按钮</button>
        <p v-permission="isAdmin" style="color: #f44336;">⚠️ 这段文字只有管理员能看到</p>
        <p class="tip">v-permission 在 mounted 中根据 binding.value 决定是否移除元素</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 自定义指令 — v-debounce（防抖）</h2>
      <div class="card">
        <input v-debounce="onDebouncedInput" placeholder="输入后 500ms 才触发" />
        <p>防抖后的值：<strong>{{ debouncedValue || '（空）' }}</strong></p>
        <p class="tip">v-debounce 在 mounted 中添加 input 事件监听，用 setTimeout 实现防抖</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 透传 Attributes ($attrs)</h2>
      <div class="card">
        <p>父组件传给子组件的 class、id、style 等非 prop 属性会自动"透传"到根元素</p>
        <AttrChild
          :class="extraClass"
          :id="extraId"
          data-testid="attr-demo"
          style="border: 3px solid #42b883;"
        >
          我是 AttrChild 的内容
        </AttrChild>
        <p class="tip">class、id、style、data-* 等属性自动传到子组件根元素</p>
        <p class="tip">子组件可用 inheritAttrs: false 禁用自动透传，用 v-bind="$attrs" 手动控制</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 组件 v-model — 自定义双向绑定</h2>
      <div class="card">
        <h3>基本组件 v-model（defineProps + defineEmits）</h3>
        <CustomInput v-model="username" />
        <p>用户名：{{ username || '（空）' }}</p>
        <p class="tip">v-model="username" 等价于 :modelValue="username" @update:modelValue="username = $event"</p>
      </div>

      <div class="card">
        <h3>带参数的 v-model</h3>
        <CustomVModel v-model:color="selectedColor" />
        <p>选中颜色：<span :style="{ color: selectedColor, fontWeight: 'bold' }">{{ selectedColor }}</span></p>
        <p class="tip">v-model:color="val" 等价于 :color="val" @update:color="val = $event"</p>
      </div>

      <div class="card">
        <h3>defineModel() — Vue 3.4+ 简化写法</h3>
        <DefineModelDemo
          v-model="dmValue"
          v-model:title="dmTitle"
          v-model:formattedText.capitalize="dmFormatted"
        />
        <div class="model-values">
          <p>v-model = <strong>{{ dmValue }}</strong></p>
          <p>v-model:title = <strong>{{ dmTitle }}</strong></p>
          <p>v-model:formattedText = <strong>{{ dmFormatted }}</strong></p>
        </div>
        <p class="tip">defineModel() 是 Vue 3.4+ 新增宏，替代 defineProps + defineEmits 的组合</p>
        <p class="tip">一行代码搞定：const model = defineModel() — 自动创建 prop + emit</p>
      </div>

      <div class="card">
        <h3>v-model 修饰符</h3>
        <p>Vue 内置修饰符：<code>.lazy</code> <code>.number</code> <code>.trim</code></p>
        <div class="code-block">
          <pre>// 内置修饰符
v-model.lazy="msg"    // 改用 change 事件而非 input
v-model.number="age"  // 自动转为数字
v-model.trim="name"   // 自动去除首尾空格

// 自定义修饰符
// 子组件通过 defineModel 的 modifiers 访问
const model = defineModel()
model.modifiers.capitalize // true/false

// 父组件使用
&lt;Child v-model.capitalize="text" /&gt;</pre>
        </div>
        <p class="tip">自定义修饰符让组件可以扩展 v-model 的行为</p>
      </div>

      <div class="card">
        <h3>多个 v-model</h3>
        <p>一个组件可以同时绑定多个 v-model：</p>
        <div class="code-block">
          <pre>// 父组件
&lt;UserForm
  v-model:first-name="first"
  v-model:last-name="last"
/&gt;

// 子组件（defineModel 写法）
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')

// 子组件（传统写法）
defineProps(['firstName', 'lastName'])
defineEmits(['update:firstName', 'update:lastName'])</pre>
        </div>
        <p class="tip">多个 v-model 让组件可以同时管理多个双向绑定的数据</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>自定义指令</strong><span>v-name 挂载 DOM 操作逻辑，有 mounted/updated 等钩子</span></div>
        <div class="point"><strong>binding.value</strong><span>指令接收的表达式值</span></div>
        <div class="point"><strong>binding.arg</strong><span>指令参数，如 v-color:bg 中的 "bg"</span></div>
        <div class="point"><strong>binding.modifiers</strong><span>修饰符，如 v-focus.lazy 中的 { lazy: true }</span></div>
        <div class="point"><strong>$attrs</strong><span>非 prop 的属性集合，可手动 v-bind="$attrs" 控制透传</span></div>
        <div class="point"><strong>inheritAttrs</strong><span>false 禁用自动透传，配合 v-bind="$attrs" 手动指定</span></div>
        <div class="point"><strong>组件 v-model</strong><span>modelValue prop + update:modelValue emit</span></div>
        <div class="point"><strong>defineModel()</strong><span>Vue 3.4+ 简化宏，一行代码替代 props + emits</span></div>
        <div class="point"><strong>v-model:arg</strong><span>命名 v-model，如 v-model:color 使用 color prop</span></div>
        <div class="point"><strong>v-model 修饰符</strong><span>内置 .lazy/.number/.trim，自定义通过 modifiers 访问</span></div>
        <div class="point"><strong>多个 v-model</strong><span>v-model:first + v-model:last 同时绑定多个数据</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlight { background: #fff3e0 !important; }
.model-values { margin-top: 8px; padding: 8px 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef; }
.model-values p { margin: 4px 0; font-size: 14px; }
</style>
