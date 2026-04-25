<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第8课：Class/Style 绑定 + 事件处理 ====================
//
// :class 和 :style 是 Vue 中非常常用的动态绑定
// 事件处理有丰富的修饰符，让事件操作更简洁

// --- Class 绑定 ---
const isActive = ref(true)
const hasError = ref(false)
const isBold = ref(true)

// classObject 示例（在模板中可用 :class="classObject"）
const classObject = reactive({
  active: true,
  'text-danger': false,
  rounded: true,
})

const currentTheme = ref<'light' | 'dark' | 'colorful'>('light')

const themeClass = computed(() => ({
  'theme-light': currentTheme.value === 'light',
  'theme-dark': currentTheme.value === 'dark',
  'theme-colorful': currentTheme.value === 'colorful',
}))

const activeClass = ref('active')
const errorClass = ref('text-danger')
const useArray = ref(false)

// --- Style 绑定 ---
const fontColor = ref('#42b883')
const fontSize = ref(16)
const bgColor = ref('#f8f9fa')

const styleObject = reactive({
  color: fontColor,
  fontSize: computed(() => fontSize.value + 'px'),
  backgroundColor: bgColor,
  padding: '20px',
  borderRadius: '12px',
  transition: 'all 0.3s',
})

// --- 事件处理 ---
const clickCount = ref(0)
const eventLog = ref<string[]>([])

function addLog(msg: string) {
  const time = new Date().toLocaleTimeString()
  eventLog.value.unshift(`[${time}] ${msg}`)
  if (eventLog.value.length > 8) eventLog.value.pop()
}

function onClick() {
  clickCount.value++
  addLog('普通点击')
}

function onDoubleClick() {
  addLog('🖱️ 双击！')
}

function onRightClick(e: Event) {
  e.preventDefault()
  addLog('🖱️ 右键点击')
}

function onKeyEnter() {
  addLog('⌨️ 按下 Enter')
}

function onKeyEscape() {
  addLog('⌨️ 按下 Escape')
}

function onKeyCtrlS(e: Event) {
  e.preventDefault()
  addLog('⌨️ Ctrl+S 组合键')
}

// 事件修饰符演示
// const items = ref(['苹果', '香蕉', '橘子'])
function onParentClick() {
  addLog('👆 父元素点击（.stop 可阻止冒泡）')
}
function onChildClick() {
  addLog('👆 子元素点击')
}
function onSubmit() {
  addLog('📝 表单提交（.prevent 阻止默认行为）')
}

// 滚动演示
const scrollCount = ref(0)
function onScrollOnce() {
  scrollCount.value++
  addLog(`📜 滚动事件触发（.once 只触发一次）`)
}
</script>

<template>
  <div class="lesson">
    <h1>📖 第8课：Class/Style 绑定 + 事件处理</h1>
    <p class="desc">动态控制样式和类名，掌握事件修饰符让交互更优雅</p>

    <div class="section">
      <h2>🔹 :class 对象语法</h2>
      <div class="card">
        <div class="toggle-group">
          <label class="toggle">
            <input type="checkbox" v-model="isActive" /> active
          </label>
          <label class="toggle">
            <input type="checkbox" v-model="hasError" /> text-danger
          </label>
          <label class="toggle">
            <input type="checkbox" v-model="isBold" /> bold
          </label>
        </div>
        <div
          class="demo-box"
          :class="{ active: isActive, 'text-danger': hasError, bold: isBold }"
        >
          我是一个动态 class 的盒子
        </div>
        <code>:class="{ active: isActive, 'text-danger': hasError }"</code>
      </div>

      <div class="card">
        <h3>:class 绑定 reactive 对象</h3>
        <div class="toggle-group">
          <label class="toggle">
            <input type="checkbox" v-model="classObject.active" /> active
          </label>
          <label class="toggle">
            <input type="checkbox" v-model="classObject['text-danger']" /> text-danger
          </label>
          <label class="toggle">
            <input type="checkbox" v-model="classObject.rounded" /> rounded
          </label>
        </div>
        <div class="demo-box" :class="classObject">
          我是一个 reactive classObject 的盒子
        </div>
        <code>:class="classObject"（reactive 对象直接绑定）</code>
        <p class="tip">也可以直接绑定 reactive 对象，但推荐用 computed 更灵活</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 :class 计算属性</h2>
      <div class="card">
        <div class="btn-group">
          <button @click="currentTheme = 'light'" :class="{ active: currentTheme === 'light' }">☀️ 亮色</button>
          <button @click="currentTheme = 'dark'" :class="{ active: currentTheme === 'dark' }">🌙 暗色</button>
          <button @click="currentTheme = 'colorful'" :class="{ active: currentTheme === 'colorful' }">🌈 彩色</button>
        </div>
        <div :class="themeClass" class="theme-box">
          主题切换演示（computed 返回 class 对象）
        </div>
        <p class="tip">推荐用 computed 返回 class 对象，逻辑更清晰</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 :class 数组语法</h2>
      <div class="card">
        <label class="toggle">
          <input type="checkbox" v-model="useArray" /> 启用 errorClass
        </label>
        <div :class="[activeClass, useArray ? errorClass : '']" class="demo-box">
          数组语法：[activeClass, conditionalClass]
        </div>
        <p class="tip">数组语法可以用三元表达式或嵌套对象做条件判断</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 :style 绑定</h2>
      <div class="card">
        <div class="style-controls">
          <label>颜色：<input type="color" v-model="fontColor" /></label>
          <label>字号：<input type="range" v-model.number="fontSize" min="12" max="32" /> {{ fontSize }}px</label>
          <label>背景：<input type="color" v-model="bgColor" /></label>
        </div>
        <div :style="styleObject">
          动态样式演示：拖动滑块和选色器实时变化
        </div>
        <p class="tip">:style 绑定对象，camelCase 写 CSS 属性名（fontSize → font-size）</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 事件处理基础</h2>
      <div class="card">
        <p>点击次数：{{ clickCount }}</p>
        <div class="btn-group">
          <button @click="onClick">👆 点击</button>
          <button @dblclick="onDoubleClick">🖱️ 双击</button>
          <button @contextmenu="onRightClick">🖱️ 右键</button>
        </div>
        <input @keyup.enter="onKeyEnter" @keyup.esc="onKeyEscape" placeholder="按 Enter 或 Esc" />
        <p class="tip">@keyup.enter 是按键修饰符，只在按 Enter 时触发</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 事件修饰符</h2>
      <div class="card">
        <div class="modifier-list">
          <div class="modifier-item">
            <strong>.stop</strong>
            <span>阻止事件冒泡</span>
            <div class="parent-box" @click="onParentClick">
              <button @click.stop="onChildClick">子按钮（.stop 阻止冒泡）</button>
            </div>
          </div>
          <div class="modifier-item">
            <strong>.prevent</strong>
            <span>阻止默认行为</span>
            <form @submit.prevent="onSubmit">
              <input placeholder="输入后按回车" />
              <button type="submit">提交（.prevent 阻止页面刷新）</button>
            </form>
          </div>
          <div class="modifier-item">
            <strong>.once</strong>
            <span>事件只触发一次</span>
            <button @click.once="onScrollOnce">只触发一次（已触发 {{ scrollCount }} 次）</button>
          </div>
          <div class="modifier-item">
            <strong>.ctrl / .alt / .shift</strong>
            <span>组合键修饰符</span>
            <button @click.ctrl="onKeyCtrlS">按住 Ctrl 点击</button>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>📝 事件日志</h2>
      <div class="log-box">
        <p v-for="(log, i) in eventLog" :key="i" class="log-item">{{ log }}</p>
        <p v-if="!eventLog.length" class="tip">触发事件后这里会显示日志</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>:class 对象</strong><span>{ active: isActive } 动态切换类名</span></div>
        <div class="point"><strong>:class 数组</strong><span>[classA, classB] 应用多个类名</span></div>
        <div class="point"><strong>:style 对象</strong><span>{ color: 'red', fontSize: '16px' }</span></div>
        <div class="point"><strong>.stop</strong><span>阻止事件冒泡（等同于 e.stopPropagation()）</span></div>
        <div class="point"><strong>.prevent</strong><span>阻止默认行为（等同于 e.preventDefault()）</span></div>
        <div class="point"><strong>.once</strong><span>事件只触发一次，之后自动解绑</span></div>
        <div class="point"><strong>.enter/.esc</strong><span>按键修饰符，监听特定按键</span></div>
        <div class="point"><strong>.ctrl/.alt</strong><span>系统修饰键，组合键触发</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.active { background: #2d7a5a; }
.toggle-group { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
.demo-box {
  padding: 16px; border-radius: 8px; margin: 12px 0;
  background: white; border: 2px solid #e9ecef; transition: all 0.3s;
}
.demo-box.active { border-color: #42b883; background: #f0faf5; }
.demo-box.text-danger { color: #f44336; border-color: #f44336; }
.demo-box.bold { font-weight: bold; }
.demo-box.rounded { border-radius: 20px; }
.theme-box { padding: 20px; border-radius: 8px; margin: 12px 0; transition: all 0.3s; }
.theme-light { background: #fff; color: #333; border: 1px solid #e9ecef; }
.theme-dark { background: #1a1a2e; color: #e0e0e0; border: 1px solid #333; }
.theme-colorful { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.style-controls { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
.style-controls label { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.style-controls input[type="color"] { width: 36px; height: 36px; border: none; cursor: pointer; }
.style-controls input[type="range"] { width: 120px; }
code { background: #e9ecef; padding: 2px 8px; border-radius: 4px; font-size: 13px; }
.modifier-list { display: flex; flex-direction: column; gap: 16px; }
.modifier-item { display: flex; flex-direction: column; gap: 6px; }
.modifier-item strong { color: #42b883; }
.modifier-item span { font-size: 13px; color: #888; }
.parent-box {
  background: #e8f5e9; padding: 16px; border-radius: 8px;
  border: 2px dashed #42b883; cursor: pointer;
}
.parent-box button { margin-top: 8px; }
</style>
