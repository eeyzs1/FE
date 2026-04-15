<script setup lang="ts">
import { ref } from 'vue'
import GlobalButton from '../components/GlobalButton.vue'

// ==================== 第15课：模板语法详解 + 组件基础 + 组件注册 ====================

// --- 模板语法 ---
const rawHtml = ref('<span style="color: #42b883; font-weight: bold;">这是通过 v-html 渲染的 HTML</span>')
const dynamicId = ref('my-element')
const isButtonDisabled = ref(false)
const attributeName = ref('href')
const url = ref('https://cn.vuejs.org')
const eventName = ref('click')
const message = ref('Hello Vue!')
const numberValue = ref(42)
const ok = ref(true)

// 模板表达式
const items = ref(['苹果', '香蕉', '橘子'])
const now = ref(new Date().toLocaleTimeString())

function updateTime() {
  now.value = new Date().toLocaleTimeString()
}

// --- 同名简写 ---
// 当 attribute 名和变量名相同时，可以简写
const disabled = ref(false)
const id = ref('same-name-demo')
const title = ref('同名简写提示')

// --- 布尔型 Attribute ---
// disabled, readonly, required, checked 等布尔属性
// :disabled="false" 不会渲染 disabled attribute
// :disabled="true" 或仅写 disabled 会渲染
const boolDisabled = ref(false)
const boolRequired = ref(true)

// --- 组件基础 ---
// --- 组件注册 ---
</script>

<template>
  <div class="lesson">
    <h1>📖 第15课：模板语法详解 + 组件基础 + 组件注册</h1>
    <p class="desc">深入理解 Vue 模板的所有语法，掌握组件的创建与注册方式</p>

    <div class="section">
      <h2>🔹 插值 — {{ }} 和 v-html</h2>
      <div class="card">
        <p>文本插值：<strong>{{ message }}</strong></p>
        <p>JavaScript 表达式：<strong>{{ numberValue + 1 }}</strong></p>
        <p>三元表达式：<strong>{{ ok ? '是' : '否' }}</strong></p>
        <p>调用方法：<strong>{{ items.join(', ') }}</strong></p>
        <p>原始 HTML：<span v-html="rawHtml"></span></p>
        <p class="tip">v-html 会渲染真实 HTML，注意 XSS 风险，不要用于用户输入</p>
        <p class="tip">{{ }} 中只能放单个表达式，不能放语句（如 if/for）</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Attribute 绑定 — v-bind</h2>
      <div class="card">
        <p>动态 id：<code>:id="dynamicId"</code> → <span :id="dynamicId">id="{{ dynamicId }}"</span></p>
        <p>动态 disabled：<code>:disabled="isButtonDisabled"</code></p>
        <button :disabled="isButtonDisabled">我{{ isButtonDisabled ? '被禁用' : '可用' }}</button>
        <label class="toggle"><input type="checkbox" v-model="isButtonDisabled" /> 切换 disabled</label>

        <hr />
        <p>动态 attribute 名：<code>:[attributeName]="url"</code></p>
        <a :[attributeName]="url" target="_blank">{{ url }}</a>

        <hr />
        <p>不带参数的 v-bind 批量绑定：</p>
        <div v-bind="{ id: 'container', class: 'demo-box' }">批量绑定的 div</div>
        <p class="tip">:attr 是 v-bind:attr 的缩写</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 同名简写 & 布尔型 Attribute</h2>
      <div class="card">
        <h3>同名简写（Vue 3.4+）</h3>
        <p>当 attribute 名和绑定的变量名相同时，可以省略值：</p>
        <div class="code-block">
          <pre>// 完整写法
&lt;button :disabled="disabled"&gt;按钮&lt;/button&gt;
&lt;div :id="id" :title="title"&gt;内容&lt;/div&gt;

// 同名简写（Vue 3.4+）
&lt;button :disabled&gt;按钮&lt;/button&gt;
&lt;div :id :title&gt;内容&lt;/div&gt;

// 等价于 :disabled="disabled"、:id="id"、:title="title"</pre>
        </div>
        <p>实际演示：</p>
        <button :disabled="disabled" :id="id" :title="title">
          disabled={{ disabled }}, id={{ id }}
        </button>
        <label class="toggle"><input type="checkbox" v-model="disabled" /> 切换 disabled</label>
        <p class="tip">同名简写让模板更简洁，但仅适用于变量名和属性名相同的情况</p>
      </div>

      <div class="card">
        <h3>布尔型 Attribute</h3>
        <p>布尔型 attribute（disabled, required, readonly, checked 等）的特殊行为：</p>
        <div class="bool-demo">
          <div class="bool-item">
            <input :disabled="boolDisabled" placeholder=":disabled 控制" />
            <label class="toggle"><input type="checkbox" v-model="boolDisabled" /> disabled={{ boolDisabled }}</label>
          </div>
          <div class="bool-item">
            <input :required="boolRequired" placeholder=":required 控制" />
            <label class="toggle"><input type="checkbox" v-model="boolRequired" /> required={{ boolRequired }}</label>
          </div>
        </div>
        <div class="code-block">
          <pre>// :disabled="false" → 不会渲染 disabled attribute
// :disabled="true"  → 渲染 disabled attribute
// 直接写 disabled   → 等价于 :disabled="true"

// 空字符串也是 truthy
&lt;input disabled="" /&gt;  // 也是禁用的</pre>
        </div>
        <p class="tip">布尔型 attribute 只需要存在就生效，值是什么不重要</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 DOM 模板注意事项</h2>
      <div class="card">
        <p>在 DOM 中直接写模板（而非 SFC 的 &lt;template&gt;）时有一些限制：</p>
        <div class="code-block">
          <pre>// 1. 组件名必须是 kebab-case
//    SFC 中: &lt;MyComponent /&gt;
//    DOM 中: &lt;my-component&gt;&lt;/my-component&gt;

// 2. 自闭合标签
//    SFC 中: &lt;MyComponent /&gt;
//    DOM 中: &lt;my-component&gt;&lt;/my-component&gt;  // 必须有闭合标签

// 3. 限制性的元素嵌套
//    &lt;table&gt; 内只能用 &lt;tr&gt;, &lt;td&gt; 等
//    需要用 is="vue:" 来挂载组件
//    &lt;tr is="vue:my-row"&gt;&lt;/tr&gt;

// 4. 大小写
//    prop 名在 DOM 中必须用 kebab-case
//    :myProp → :my-prop（DOM 中自动转换）</pre>
        </div>
        <p class="tip">使用 SFC（.vue 文件）可以避免以上所有问题，推荐使用 SFC</p>
        <p class="tip">is="vue:" 语法用于在受限 HTML 元素（如 table/ul/select）内使用 Vue 组件</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 事件绑定 — v-on</h2>
      <div class="card">
        <p>当前时间：{{ now }}</p>
        <button @click="updateTime">🕐 更新时间</button>
        <p>动态事件名：<code>@[eventName]="handler"</code></p>
        <button @[eventName]="updateTime">动态事件按钮</button>
        <label>事件名：<input v-model="eventName" /></label>
        <p class="tip">@event 是 v-on:event 的缩写</p>
        <p class="tip">内联处理器：@click="count++"，方法处理器：@click="handleClick"</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 模板表达式限制</h2>
      <div class="card">
        <div class="code-block">
          <pre v-pre>// ✅ 可以使用的：
{{ number + 1 }}              // 算术运算
{{ ok ? 'yes' : 'no' }}      // 三元表达式
{{ message.split('').reverse().join('') }}  // 方法调用
{{ Date.now() }}              // 全局对象

// ❌ 不能使用的：
{{ var a = 1 }}               // 语句，不是表达式
{{ if (ok) { return 'yes' } }} // 控制流语句

// 模板中可以访问的全局对象：
// Math, Date, JSON, parseInt, isNaN, etc.
// 不能访问：window, document, console 等</pre>
        </div>
        <p class="tip">复杂逻辑应该放在 computed 中，不要写在模板表达式里</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 组件基础</h2>
      <div class="card">
        <p>组件是 Vue 应用的构建块，每个 .vue 文件就是一个组件</p>
        <div class="code-block">
          <pre>// 组件三要素
MyComponent.vue:
├── &lt;script setup&gt;  → 逻辑（JS/TS）
├── &lt;template&gt;      → 结构（HTML）
└── &lt;style scoped&gt;  → 样式（CSS）

// 使用组件
import MyComponent from './MyComponent.vue'
// 在 template 中直接使用 &lt;MyComponent /&gt;</pre>
        </div>
        <p class="tip">&lt;script setup&gt; 中的导入组件自动注册，无需 components 选项</p>
      </div>

      <div class="card">
        <h3>组件通过 Props 接收数据，通过 Emits 发送事件</h3>
        <div class="code-block">
          <pre>// 父组件
&lt;ChildComponent
  :title="myTitle"        ← 传 prop
  @update="onUpdate"      ← 监听事件
&gt;
  &lt;template #footer&gt;      ← 传插槽
    底部内容
  &lt;/template&gt;
&lt;/ChildComponent&gt;

// 子组件
defineProps(['title'])              ← 接收 prop
defineEmits(['update'])             ← 声明事件
emit('update', newValue)            ← 触发事件
&lt;slot name="footer"&gt;&lt;/slot&gt;       ← 插槽出口</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 组件注册</h2>
      <div class="card">
        <h3>局部注册（推荐）</h3>
        <div class="code-block">
          <pre>// 在 &lt;script setup&gt; 中导入即注册
import MyComponent from './MyComponent.vue'
// template 中可直接使用 &lt;MyComponent /&gt;

// 优点：按需导入，tree-shaking 友好</pre>
        </div>

        <h3>全局注册</h3>
        <div class="code-block">
          <pre>// main.ts 中
import { createApp } from 'vue'
import GlobalButton from './components/GlobalButton.vue'

const app = createApp(App)
app.component('GlobalButton', GlobalButton)
// 之后所有组件都能直接用 &lt;GlobalButton /&gt;

// 缺点：无法 tree-shake，类型推导困难</pre>
        </div>

        <p>全局注册的组件演示：</p>
        <GlobalButton>我是全局注册的按钮</GlobalButton>
        <p class="tip">优先使用局部注册，全局注册只用于频繁使用的通用组件</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>{{ }}</strong><span>文本插值，自动转义 HTML</span></div>
        <div class="point"><strong>v-html</strong><span>渲染原始 HTML，注意 XSS 风险</span></div>
        <div class="point"><strong>v-bind</strong><span>动态绑定 attribute，缩写 :attr</span></div>
        <div class="point"><strong>v-on</strong><span>绑定事件，缩写 @event</span></div>
        <div class="point"><strong>动态参数</strong><span>:[attrName]="val" 和 @[eventName]="fn"</span></div>
        <div class="point"><strong>同名简写</strong><span>Vue 3.4+ :disabled 等价于 :disabled="disabled"</span></div>
        <div class="point"><strong>布尔型 Attribute</strong><span>disabled/required 等，存在即生效，值为 false 不渲染</span></div>
        <div class="point"><strong>DOM 模板</strong><span>必须 kebab-case、必须有闭合标签、用 is="vue:" 挂载组件</span></div>
        <div class="point"><strong>表达式限制</strong><span>只能单个表达式，不能语句</span></div>
        <div class="point"><strong>局部注册</strong><span>import 导入，推荐，tree-shake 友好</span></div>
        <div class="point"><strong>全局注册</strong><span>app.component()，所有组件可用</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-box { padding: 12px; background: #e8f5e9; border-radius: 8px; margin: 8px 0; }
.bool-demo { display: flex; gap: 16px; margin: 12px 0; flex-wrap: wrap; }
.bool-item { flex: 1; min-width: 200px; }

.bool-item input[type="text"],
.bool-item input:not([type]) {
  margin-bottom: 4px;
}
</style>
