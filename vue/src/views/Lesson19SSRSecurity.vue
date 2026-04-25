<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import ErrorChild from '../components/ErrorChild.vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第19课：SSR + 无障碍 + 安全 + 动画技巧 ====================

// --- SSR (服务端渲染) ---
const ssrCode = `// SSR vs CSR 对比
// CSR (客户端渲染) — 默认方式
// 浏览器下载空 HTML → 加载 JS → 渲染页面
// 优点：交互快  缺点：首屏慢、SEO 差

// SSR (服务端渲染)
// 服务器渲染 HTML → 浏览器显示 → 激活交互(hydration)
// 优点：首屏快、SEO 好  缺点：服务器成本高

// Nuxt 3 — Vue SSR 框架（推荐）
// pnpm dlx nuxi@latest init my-app

// Nuxt 自动提供：
// - 文件路由（pages/ 目录自动生成路由）
// - 自动导入（组件/composable 无需 import）
// - SSR/SSG 切换
// - 服务端 API（server/api/）
// - SEO 头部管理（useHead()）`

// --- 无障碍 (Accessibility) ---
const a11yItems = ref([
  { rule: '语义化 HTML', desc: '用 <button> 而非 <div @click>', example: '<button>提交</button>' },
  { rule: 'ARIA 属性', desc: '为非语义元素添加角色和标签', example: 'role="button" aria-label="关闭"' },
  { rule: '键盘导航', desc: '所有交互元素可通过 Tab/Enter 操作', example: 'tabindex="0" @keyup.enter' },
  { rule: '焦点管理', desc: '模态框打开时聚焦，关闭时恢复', example: 'ref.focus() / ref.blur()' },
  { rule: '颜色对比度', desc: '文字与背景对比度 ≥ 4.5:1', example: 'color: #333 on #fff' },
  { rule: 'alt 文本', desc: '所有图片提供替代文本', example: '<img alt="产品图片" />' },
  { rule: '表单标签', desc: '每个表单控件关联 label', example: '<label for="name">姓名</label>' },
  { rule: '屏幕阅读器', desc: '用 aria-live 通知动态内容变化', example: 'aria-live="polite"' },
])

// --- 安全 ---
const securityItems = ref([
  { risk: 'XSS (跨站脚本)', desc: 'v-html 渲染用户输入', defense: '永远不要 v-html 用户输入，用 {{ }} 自动转义' },
  { risk: 'URL 注入', desc: '动态 URL 可能注入 javascript:', defense: '校验 URL 协议，只允许 https://' },
  { risk: 'CSRF', desc: '跨站请求伪造', defense: '使用 CSRF Token，SameSite Cookie' },
  { risk: '敏感信息泄露', desc: 'API Key 暴露在前端', defense: '用 .env + VITE_ 前缀，敏感操作放后端' },
  { risk: '依赖安全', desc: '第三方包漏洞', defense: 'pnpm audit 定期检查' },
])

// --- 错误处理 ---
const capturedError = ref<string | null>(null)
const errorLog = ref<string[]>([])

onErrorCaptured((err, _instance, info) => {
  const msg = `捕获错误：${err.message}（来源：${info}）`
  capturedError.value = msg
  errorLog.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (errorLog.value.length > 6) errorLog.value.shift()
  return false
})

const showErrorChild = ref(false)

function simulateError() {
  showErrorChild.value = true
}

function clearError() {
  capturedError.value = null
  showErrorChild.value = false
}

// --- 动画技巧 ---
const showBounce = ref(false)
const showFlip = ref(false)
const showStagger = ref(false)
const staggerItems = ref(['A', 'B', 'C', 'D', 'E'])
const xssInput = ref('<b>加粗文字</b>')

function toggleBounce() {
  showBounce.value = !showBounce.value
}

function toggleFlip() {
  showFlip.value = !showFlip.value
}

function toggleStagger() {
  showStagger.value = !showStagger.value
}

const codeXss = `// ❌ 危险：v-html 渲染用户输入
<div v-html="userInput"></div>  // 可能注入脚本

// ✅ 安全：自动转义
<div>{{ userInput }}</div>  // 自动转义 HTML

// ❌ 危险：动态 URL
<a :href="userUrl">链接</a>  // 可能是 javascript:alert(1)

// ✅ 安全：校验协议
<a :href="sanitizeUrl(userUrl)">链接</a>

// 环境变量
VITE_API_URL=https://api.example.com  // ✅ 前缀 VITE_ 暴露给前端
SECRET_KEY=xxx                          // ❌ 不要暴露给前端`

const codeErrorCaptured = `// 组件级错误捕获
onErrorCaptured((err, instance, info) => {
  console.error('捕获到后代组件错误：', err)
  // return false 阻止错误继续向上传播
  // return true 或不返回则继续传播
  return false
})

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误：', err)
  // 上报错误到监控服务
}

// 错误边界模式（Vue 没有内置，需手动实现）
// 1. onErrorCaptured 捕获错误
// 2. 设置 error 状态
// 3. 条件渲染：正常内容 vs 错误回退 UI`
</script>

<template>
  <div class="lesson">
    <h1>📖 第19课：SSR + 无障碍 + 安全 + 动画技巧</h1>
    <p class="desc">从开发到生产：服务端渲染、无障碍、安全防护、动画进阶</p>

    <div class="section">
      <h2>🔹 SSR 服务端渲染</h2>
      <div class="card">
        <div class="ssr-compare">
          <div class="compare-col">
            <h3>CSR（默认）</h3>
            <div class="flow">空 HTML → 下载 JS → 渲染页面</div>
            <p>✅ 交互快、开发简单</p>
            <p>❌ 首屏慢、SEO 差</p>
          </div>
          <div class="compare-col">
            <h3>SSR</h3>
            <div class="flow">服务端 HTML → 浏览器显示 → 激活交互</div>
            <p>✅ 首屏快、SEO 好</p>
            <p>❌ 服务器成本、开发复杂</p>
          </div>
        </div>
        <div class="code-block">
          <pre>{{ ssrCode }}</pre>
        </div>
        <p class="tip">大多数场景 CSR 够用，SEO 要求高时用 Nuxt 3</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 无障碍 (Accessibility / a11y)</h2>
      <div class="card">
        <div class="a11y-list">
          <div v-for="item in a11yItems" :key="item.rule" class="a11y-item">
            <strong>{{ item.rule }}</strong>
            <span>{{ item.desc }}</span>
            <code>{{ item.example }}</code>
          </div>
        </div>
        <p class="tip">无障碍不仅是道德要求，也是法律要求，且改善所有用户体验</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 安全</h2>
      <div class="card">
        <div class="security-list">
          <div v-for="item in securityItems" :key="item.risk" class="security-item">
            <span class="risk">{{ item.risk }}</span>
            <span class="desc">{{ item.desc }}</span>
            <span class="defense">{{ item.defense }}</span>
          </div>
        </div>
        <DemoBox title="XSS 防护 — v-html vs {{ }} 安全对比" :code="codeXss">
          <div class="security-demo">
            <label>模拟用户输入：<input v-model="xssInput" placeholder="试试输入 <script>alert(1)</script>" style="width:100%" /></label>
            <div class="compare-row">
              <div class="compare-col">
                <h4>❌ v-html 渲染</h4>
                <div class="unsafe-output" v-html="xssInput"></div>
              </div>
              <div class="compare-col">
                <h4>✅ {{ }} 自动转义</h4>
                <div class="safe-output">{{ xssInput }}</div>
              </div>
            </div>
            <p class="tip">输入 <code>&lt;img src=x onerror=alert(1)&gt;</code> 看看区别！v-html 会执行，{{ }} 会转义</p>
          </div>
        </DemoBox>
        <p class="tip">Vue 模板 {{ }} 自动转义 HTML，这是最基本的安全保障</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 错误处理</h2>
      <div class="card">
        <h3>onErrorCaptured — 捕获后代组件错误</h3>
        <p>在祖先组件中捕获后代组件抛出的错误，防止整个应用崩溃</p>
        <DemoBox title="onErrorCaptured — 捕获后代组件错误" :code="codeErrorCaptured">
          <div class="btn-group">
            <button @click="simulateError" class="warn">💥 模拟子组件错误</button>
            <button @click="clearError" v-if="capturedError">🧹 清除错误</button>
          </div>
          <div v-if="capturedError" class="error-box">
            <p>❌ {{ capturedError }}</p>
          </div>
          <div v-if="showErrorChild && !capturedError">
            <ErrorChild />
          </div>
          <div v-if="errorLog.length" class="log-area">
            <p v-for="(log, i) in errorLog" :key="i" class="log-item">{{ log }}</p>
          </div>
        </DemoBox>
        <p class="tip">onErrorCaptured 只能捕获后代组件的错误，不能捕获自身错误</p>
        <p class="tip">生产环境建议配合 app.config.errorHandler 全局兜底</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 动画技巧</h2>
      <div class="card">
        <h3>弹跳动画</h3>
        <button @click="toggleBounce">{{ showBounce ? '隐藏' : '显示' }}弹跳</button>
        <Transition name="bounce">
          <div v-if="showBounce" class="anim-box bounce-box">🏀 弹跳！</div>
        </Transition>
      </div>

      <div class="card">
        <h3>翻转动画</h3>
        <button @click="toggleFlip">{{ showFlip ? '隐藏' : '显示' }}翻转</button>
        <Transition name="flip">
          <div v-if="showFlip" class="anim-box flip-box">🃏 翻转！</div>
        </Transition>
      </div>

      <div class="card">
        <h3>交错动画</h3>
        <button @click="toggleStagger">{{ showStagger ? '隐藏' : '显示' }}交错</button>
        <TransitionGroup name="stagger" tag="div" class="stagger-container" v-if="showStagger">
          <div v-for="(item, i) in staggerItems" :key="item" class="stagger-item" :style="{ transitionDelay: i * 80 + 'ms' }">
            {{ item }}
          </div>
        </TransitionGroup>
        <div class="code-block">
          <pre>// 交错动画：通过 transition-delay 实现
&lt;div v-for="(item, i) in items"
  :style="{ transitionDelay: i * 80 + 'ms' }"
&gt;

// CSS 动画库推荐：
// - Animate.css — 预设动画
// - @vueuse/motion — Vue 动画组合式函数
// - GSAP — 专业动画库
// - Lottie — 播放 AE 动画</pre>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>CSR vs SSR</strong><span>CSR 交互快，SSR 首屏快 + SEO 好</span></div>
        <div class="point"><strong>Nuxt 3</strong><span>Vue SSR 框架，文件路由 + 自动导入</span></div>
        <div class="point"><strong>语义化 HTML</strong><span>用原生标签，避免 div 一把梭</span></div>
        <div class="point"><strong>ARIA</strong><span>为非语义元素添加角色和标签</span></div>
        <div class="point"><strong>键盘导航</strong><span>所有交互可通过 Tab/Enter 操作</span></div>
        <div class="point"><strong>XSS 防护</strong><span>不用 v-html 渲染用户输入</span></div>
        <div class="point"><strong>onErrorCaptured</strong><span>捕获后代组件错误，防止应用崩溃</span></div>
        <div class="point"><strong>errorHandler</strong><span>全局错误处理，上报监控服务</span></div>
        <div class="point"><strong>环境变量</strong><span>VITE_ 前缀暴露前端，敏感信息放后端</span></div>
        <div class="point"><strong>动画技巧</strong><span>CSS keyframes + transition-delay 交错动画</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.security-demo { margin-top: 8px; }
.compare-row { display: flex; gap: 12px; margin-top: 8px; }
.compare-row .compare-col { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #e9ecef; background: white; }
.compare-row .compare-col h4 { margin: 0 0 8px; font-size: 14px; }
.unsafe-output { padding: 8px; background: #fff3f3; border: 1px solid #ffcdd2; border-radius: 4px; min-height: 30px; }
.safe-output { padding: 8px; background: #f0faf5; border: 1px solid #c8e6c9; border-radius: 4px; min-height: 30px; }
.ssr-compare { display: flex; gap: 16px; margin-bottom: 12px; }
.compare-col p { font-size: 13px; margin: 4px 0; }
.flow { font-size: 13px; color: #42b883; font-weight: bold; margin: 8px 0; }
.error-box { padding: 12px; background: #fff3f3; border: 2px solid #f44336; border-radius: 8px; margin: 12px 0; color: #c62828; }
.error-box p { margin: 4px 0; }
.a11y-list { display: flex; flex-direction: column; gap: 6px; }
.a11y-item {
  display: flex; gap: 8px; align-items: baseline;
  padding: 8px 12px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef; font-size: 13px;
}
.a11y-item strong { min-width: 100px; color: #42b883; }
.a11y-item span { flex: 1; color: #555; }
.a11y-item code { font-size: 12px; background: #e9ecef; padding: 2px 6px; border-radius: 4px; }
.security-list { display: flex; flex-direction: column; gap: 6px; }
.security-item {
  display: flex; gap: 8px; align-items: baseline;
  padding: 8px 12px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef; font-size: 13px;
}
.security-item .risk { min-width: 120px; color: #f44336; font-weight: bold; }
.security-item .desc { flex: 1; color: #555; }
.security-item .defense { color: #4caf50; font-weight: bold; }
.anim-box {
  padding: 20px; text-align: center; font-weight: bold;
  font-size: 18px; border-radius: 12px; margin-top: 12px;
}
.bounce-box { background: linear-gradient(135deg, #42b883, #35495e); color: white; }
.flip-box { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.bounce-enter-active { animation: bounce-in 0.5s; }
.bounce-leave-active { animation: bounce-in 0.5s reverse; }
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
.flip-enter-active { animation: flip-in 0.6s; }
.flip-leave-active { animation: flip-in 0.6s reverse; }
@keyframes flip-in {
  0% { transform: rotateY(0); }
  100% { transform: rotateY(360deg); }
}
.stagger-container { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.stagger-item {
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  background: #42b883; color: white; border-radius: 8px; font-weight: bold; font-size: 18px;
}
.stagger-enter-active { transition: all 0.4s ease; }
.stagger-leave-active { transition: all 0.3s ease; }
.stagger-enter-from { opacity: 0; transform: translateY(20px); }
.stagger-leave-to { opacity: 0; transform: translateY(-20px); }
</style>
