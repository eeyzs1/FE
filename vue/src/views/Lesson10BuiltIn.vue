<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import AsyncSetupDemo from '../components/AsyncSetupDemo.vue'

// ==================== 第10课：内置组件 ====================
//
// Vue 3 内置组件（无需注册即可使用）：
// 1. <Teleport>    — 将内容传送到 DOM 的其他位置
// 2. <Transition>  — 单元素/组件的进入/离开动画
// 3. <TransitionGroup> — 列表的进入/离开/排序动画
// 4. <Suspense>    — 协调异步依赖（实验性）

// --- Teleport 演示 ---
const showModal = ref(false)
const showTooltip = ref(false)
const teleportDisabled = ref(false)

// --- Transition 演示 ---
const showBox = ref(true)
const showSlide = ref(true)
const showJsHook = ref(true)
const jsHookLog = ref<string[]>([])

function onBeforeEnter(el: Element) {
  jsHookLog.value.push('beforeEnter')
  ;(el as HTMLElement).style.opacity = '0'
  ;(el as HTMLElement).style.height = '0'
}
function onEnter(el: Element, done: () => void) {
  jsHookLog.value.push('enter')
  const h = el.scrollHeight
  requestAnimationFrame(() => {
    ;(el as HTMLElement).style.transition = 'all 0.4s ease'
    ;(el as HTMLElement).style.opacity = '1'
    ;(el as HTMLElement).style.height = h + 'px'
  })
  setTimeout(done, 400)
}
function onBeforeLeave(el: Element) {
  jsHookLog.value.push('beforeLeave')
  ;(el as HTMLElement).style.height = el.scrollHeight + 'px'
}
function onLeave(el: Element, done: () => void) {
  jsHookLog.value.push('leave')
  requestAnimationFrame(() => {
    ;(el as HTMLElement).style.transition = 'all 0.3s ease'
    ;(el as HTMLElement).style.opacity = '0'
    ;(el as HTMLElement).style.height = '0'
  })
  setTimeout(done, 300)
}

// --- TransitionGroup 演示 ---
interface TodoItem {
  id: number
  text: string
}
const todoItems = ref<TodoItem[]>([
  { id: 1, text: '学习 Teleport' },
  { id: 2, text: '学习 Transition' },
  { id: 3, text: '学习 Suspense' },
])
let nextId = 4

function addTodoItem() {
  todoItems.value.push({ id: nextId++, text: `新项目 #${nextId - 1}` })
}

function removeTodoItem(id: number) {
  todoItems.value = todoItems.value.filter(t => t.id !== id)
}

// --- Suspense 演示 ---
const AsyncChild = defineAsyncComponent(() =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        template: '<div class="async-loaded">✅ 异步组件加载完成！耗时 2 秒</div>',
      })
    }, 2000)
  })
)

const showAsync = ref(false)
const showAsyncSetup = ref(false)
</script>

<template>
  <div class="lesson">
    <h1>📖 第10课：内置组件</h1>
    <p class="desc">Teleport 传送门、Transition 过渡动画、Suspense 异步协调</p>

    <div class="section">
      <h2>🔹 Teleport — 传送门</h2>
      <div class="card">
        <p>Teleport 将组件内容渲染到 DOM 的其他位置（如 body）</p>
        <div class="btn-group">
          <button @click="showModal = true">📂 打开模态框</button>
          <button @click="showTooltip = !showTooltip">💬 切换提示</button>
        </div>
        <p class="tip">模态框 Teleport 到 body，不受父元素 overflow:hidden 影响</p>
        <div class="btn-group" style="margin-top:8px">
          <button @click="teleportDisabled = !teleportDisabled">
            {{ teleportDisabled ? '启用' : '禁用' }} Teleport
          </button>
        </div>
        <p class="tip">:disabled="true" 时内容留在原位，常用于响应式布局（如移动端不传送）</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Transition — 进入/离开动画</h2>
      <div class="card">
        <div class="btn-group">
          <button @click="showBox = !showBox">{{ showBox ? '隐藏' : '显示' }}渐变盒子</button>
          <button @click="showSlide = !showSlide">{{ showSlide ? '隐藏' : '显示' }}滑动盒子</button>
        </div>

        <div class="transition-demos">
          <div class="demo-area">
            <p>渐变 (fade)：</p>
            <Transition name="fade">
              <div v-if="showBox" class="anim-box fade-box">Fade</div>
            </Transition>
          </div>

          <div class="demo-area">
            <p>滑动 (slide)：</p>
            <Transition name="slide">
              <div v-if="showSlide" class="anim-box slide-box">Slide</div>
            </Transition>
          </div>
        </div>
        <p class="tip">Transition 自动添加 v-enter-from/active/to 和 v-leave-from/active/to 类名</p>
      </div>

      <div class="card">
        <h3>JS 钩子 — 动态高度过渡</h3>
        <button @click="showJsHook = !showJsHook; jsHookLog = []">
          {{ showJsHook ? '隐藏' : '显示' }}JS钩子盒子
        </button>
        <Transition
          :css="false"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @before-leave="onBeforeLeave"
          @leave="onLeave"
        >
          <div v-if="showJsHook" class="js-hook-box">
            <p>我使用 JS 钩子实现动态高度过渡</p>
            <p>设置 :css="false" 跳过 CSS 检测，提升性能</p>
          </div>
        </Transition>
        <div v-if="jsHookLog.length" class="hook-log">
          <span>钩子调用顺序：</span>
          <span v-for="(log, i) in jsHookLog" :key="i" class="log-tag">{{ log }}</span>
        </div>
        <p class="tip">JS 钩子适合复杂动画（如动态高度、GSAP 集成），:css="false" 跳过 CSS 过渡检测</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 TransitionGroup — 列表动画</h2>
      <div class="card">
        <div class="btn-group">
          <button @click="addTodoItem">➕ 添加</button>
        </div>
        <TransitionGroup name="list" tag="div" class="list-container">
          <div v-for="item in todoItems" :key="item.id" class="list-item">
            <span>{{ item.text }}</span>
            <button class="del-btn" @click="removeTodoItem(item.id)">✕</button>
          </div>
        </TransitionGroup>
        <p class="tip">TransitionGroup 为列表项添加进入/离开/移动动画</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Suspense — 异步协调</h2>
      <div class="card">
        <h3>配合 defineAsyncComponent</h3>
        <button @click="showAsync = !showAsync">
          {{ showAsync ? '卸载' : '加载' }}异步组件
        </button>
        <div class="suspense-area" v-if="showAsync">
          <Suspense>
            <template #default>
              <AsyncChild />
            </template>
            <template #fallback>
              <div class="loading">⏳ 加载中...</div>
            </template>
          </Suspense>
        </div>
        <p class="tip">Suspense 在异步组件加载时显示 fallback 内容</p>
      </div>

      <div class="card">
        <h3>配合 async setup（更常见场景）</h3>
        <p>子组件的 setup 是 async 函数时，Suspense 会等待它完成</p>
        <button @click="showAsyncSetup = !showAsyncSetup">
          {{ showAsyncSetup ? '卸载' : '加载' }}async setup 组件
        </button>
        <div class="suspense-area" v-if="showAsyncSetup">
          <Suspense>
            <template #default>
              <AsyncSetupDemo />
            </template>
            <template #fallback>
              <div class="loading">⏳ 等待 async setup 完成...</div>
            </template>
          </Suspense>
        </div>
        <div class="code-block">
          <pre>// AsyncSetupDemo.vue
&lt;script setup&gt;
// async setup — Suspense 等待此函数完成
const data = await new Promise(resolve =&gt; {
  setTimeout(() =&gt; resolve('数据加载完成'), 2000)
})
&lt;/script&gt;

// 父组件
&lt;Suspense&gt;
  &lt;template #default&gt;
    &lt;AsyncSetupDemo /&gt;
  &lt;/template&gt;
  &lt;template #fallback&gt;
    &lt;div&gt;加载中...&lt;/div&gt;
  &lt;/template&gt;
&lt;/Suspense&gt;</pre>
        </div>
        <p class="tip">async setup 是 Suspense 更常见的使用场景，适合数据预加载</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>Teleport</strong><span>to="body" 将内容传送到指定 DOM 位置；:disabled 禁用传送</span></div>
        <div class="point"><strong>Transition</strong><span>单元素/组件的进入和离开过渡动画</span></div>
        <div class="point"><strong>TransitionGroup</strong><span>列表的进入/离开/排序移动动画</span></div>
        <div class="point"><strong>Suspense</strong><span>协调异步依赖，显示加载状态</span></div>
        <div class="point"><strong>CSS 类名</strong><span>v-enter-from/active/to + v-leave-from/active/to</span></div>
        <div class="point"><strong>JS 钩子</strong><span>@before-enter/@enter/@after-enter 等</span></div>
      </div>
    </div>
  </div>

  <!-- Teleport: 模态框传送到 body -->
  <Teleport to="body" :disabled="teleportDisabled">
    <Transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <h3>🎉 我是 Teleport 模态框</h3>
          <p>我虽然写在组件内部，但被传送到了 &lt;body&gt; 下</p>
          <p>这样就不会被父元素的 z-index 或 overflow 影响</p>
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Teleport: 提示框 -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showTooltip" class="tooltip-float">
        💡 我是 Teleport 提示框，也在 body 下
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.transition-demos { display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap; }
.demo-area { flex: 1; min-width: 200px; }
.anim-box {
  padding: 20px; border-radius: 8px; text-align: center;
  font-weight: bold; font-size: 18px; margin-top: 8px;
}
.fade-box { background: linear-gradient(135deg, #42b883, #35495e); color: white; }
.slide-box { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active { transition: all 0.4s ease-out; }
.slide-leave-active { transition: all 0.3s ease-in; }
.slide-enter-from { transform: translateX(-30px); opacity: 0; }
.slide-leave-to { transform: translateX(30px); opacity: 0; }
.list-container { position: relative; }
.list-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; background: white; border-radius: 8px;
  margin: 6px 0; border: 1px solid #e9ecef; transition: all 0.3s;
}
.del-btn {
  padding: 4px 10px; background: #f44336; font-size: 12px;
  border-radius: 6px;
}
.del-btn:hover { background: #d32f2f; }
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from { opacity: 0; transform: translateX(-30px); }
.list-leave-to { opacity: 0; transform: translateX(30px); }
.list-move { transition: transform 0.4s ease; }
.suspense-area { margin-top: 12px; }
.js-hook-box {
  background: linear-gradient(135deg, #ff9800, #f44336);
  color: white; padding: 16px; border-radius: 8px;
  margin-top: 8px; overflow: hidden;
}
.js-hook-box p { margin: 4px 0; }
.hook-log { margin-top: 8px; font-size: 13px; }
.log-tag {
  display: inline-block; background: #e3f2fd; color: #1565c0;
  padding: 2px 8px; border-radius: 4px; margin: 2px 4px 2px 0; font-size: 12px;
}
.async-loaded {
  background: #e8f5e9; padding: 16px; border-radius: 8px;
  border-left: 3px solid #42b883; font-weight: bold;
}
.loading {
  background: #fff3e0; padding: 16px; border-radius: 8px;
  color: #ff9800; font-weight: bold;
}
</style>

<style>
/* 非 scoped：Teleport 将内容传送到 body，scoped 样式无法作用于传送后的 DOM */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.modal-content {
  background: white; padding: 32px; border-radius: 16px;
  max-width: 400px; width: 90%; text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-content h3 { margin-bottom: 12px; }
.modal-content button { margin-top: 16px; }

.tooltip-float {
  position: fixed; bottom: 20px; right: 20px;
  background: #333; color: white; padding: 12px 20px;
  border-radius: 8px; z-index: 1001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>
