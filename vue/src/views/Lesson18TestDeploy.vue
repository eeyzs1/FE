<script setup lang="ts">
import { ref } from 'vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第18课：测试 + 性能优化 + 生产部署 ====================

// --- 测试 ---
const testCode = `// Vue 推荐的测试工具：
// 1. Vitest — 单元测试（与 Vite 深度集成）
// 2. Vue Test Utils — 组件测试工具
// 3. Cypress / Playwright — E2E 测试

// 安装
// pnpm add -D vitest @vue/test-utils

// 单元测试示例 (Counter.spec.ts)
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// import Counter from './Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter, { props: { initial: 0 } })
    expect(wrapper.text()).toContain('0')
  })

  it('increments on click', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })
})

// 运行测试
// pnpm test`

// --- 性能优化 ---
const optimizationItems = ref([
  { category: '📦 代码分割', technique: '路由懒加载', desc: '() => import("./views/Page.vue")', done: true },
  { category: '📦 代码分割', technique: '异步组件', desc: 'defineAsyncComponent()', done: true },
  { category: '⚡ 渲染优化', technique: 'v-once', desc: '只渲染一次，永不更新', done: false },
  { category: '⚡ 渲染优化', technique: 'v-memo', desc: '条件性缓存子树', done: false },
  { category: '⚡ 渲染优化', technique: 'shallowRef', desc: '避免深层响应式开销', done: true },
  { category: '⚡ 渲染优化', technique: 'KeepAlive', desc: '缓存组件实例', done: true },
  { category: '📊 虚拟列表', technique: '虚拟滚动', desc: '只渲染可见区域项目', done: false },
  { category: '🖼️ 资源优化', technique: '图片懒加载', desc: 'loading="lazy"', done: false },
  { category: '🖼️ 资源优化', technique: '组件懒加载', desc: 'Suspense + 异步组件', done: true },
])

// --- 生产部署 ---
const deploySteps = ref([
  { step: '1. 类型检查', cmd: 'vue-tsc --noEmit', desc: '确保 TypeScript 无类型错误' },
  { step: '2. 构建生产包', cmd: 'vite build', desc: '输出到 dist/ 目录，自动压缩和 tree-shake' },
  { step: '3. 预览构建结果', cmd: 'vite preview', desc: '本地预览生产构建' },
  { step: '4. 部署到服务器', cmd: '上传 dist/', desc: 'Nginx / Vercel / Netlify / Cloudflare Pages' },
])

const currentDeployStep = ref(-1)
function simulateDeploy() {
  currentDeployStep.value = -1
  const interval = setInterval(() => {
    currentDeployStep.value++
    if (currentDeployStep.value >= deploySteps.value.length) {
      clearInterval(interval)
    }
  }, 800)
}

// --- v-once 和 v-memo 演示 ---
const renderCount = ref(0)
const staticContent = ref('我不会变')
const dynamicContent = ref('我会变')

function triggerRender() {
  renderCount.value++
  dynamicContent.value = `更新 ${renderCount.value}`
}

const codeVMemo = `// v-once — 只渲染一次，后续跳过
<div v-once>{{ staticContent }}</div>

// v-memo — 条件满足时才更新
<div v-memo="[renderCount > 3]">
  {{ dynamicContent }}
</div>

// v-memo=[] 等价于 v-once
// v-memo 适合大型列表/表格的性能优化`
</script>

<template>
  <div class="lesson">
    <h1>📖 第18课：测试 + 性能优化 + 生产部署</h1>
    <p class="desc">从开发到上线：测试保证质量，优化提升性能，部署交付产品</p>

    <div class="section">
      <h2>🔹 测试</h2>
      <div class="card">
        <div class="test-types">
          <div class="test-type">
            <strong>单元测试</strong>
            <span>测试单个函数/组件</span>
            <code>Vitest + @vue/test-utils</code>
          </div>
          <div class="test-type">
            <strong>组件测试</strong>
            <span>测试组件交互行为</span>
            <code>mount() + trigger() + expect()</code>
          </div>
          <div class="test-type">
            <strong>E2E 测试</strong>
            <span>测试完整用户流程</span>
            <code>Cypress / Playwright</code>
          </div>
        </div>
        <div class="code-block">
          <pre>{{ testCode }}</pre>
        </div>
        <p class="tip">Vitest 与 Vite 共享配置，零配置即可使用</p>
        <p class="tip">✅ 本项目已安装 vitest + @vue/test-utils，运行 pnpm test 查看实际测试结果</p>
        <p class="tip">测试文件位于 src/composables/__tests__/useCounter.spec.ts</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 性能优化清单</h2>
      <div class="card">
        <div class="opt-list">
          <div
            v-for="item in optimizationItems"
            :key="item.technique"
            class="opt-item"
            :class="{ done: item.done }"
          >
            <span class="opt-cat">{{ item.category }}</span>
            <span class="opt-tech">{{ item.technique }}</span>
            <code>{{ item.desc }}</code>
            <span class="opt-status">{{ item.done ? '✅' : '📋' }}</span>
          </div>
        </div>
        <p class="tip">✅ 本项目已使用，📋 可进一步优化</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-once 和 v-memo</h2>
      <div class="card">
        <DemoBox title="v-once 和 v-memo 实时对比" :code="codeVMemo">
          <p>渲染次数：{{ renderCount }}</p>
          <button @click="triggerRender">🔄 触发重新渲染</button>
          <div class="demo-area">
            <div class="demo-box">
              <p>普通内容（每次渲染都更新）：{{ dynamicContent }}</p>
            </div>
            <div class="demo-box" v-once>
              <p>v-once 内容（只渲染一次）：{{ staticContent }}，渲染时值：{{ renderCount }}</p>
            </div>
            <div class="demo-box" v-memo="[renderCount > 3]">
              <p>v-memo 内容（renderCount > 3 时才更新）：{{ dynamicContent }}</p>
            </div>
          </div>
        </DemoBox>
        <p class="tip">v-once 适合纯静态内容，v-memo 适合有条件的缓存</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 生产部署流程</h2>
      <div class="card">
        <button @click="simulateDeploy">🚀 模拟部署流程</button>
        <div class="deploy-pipeline">
          <div
            v-for="(step, i) in deploySteps"
            :key="step.step"
            class="deploy-step"
            :class="{
              active: i <= currentDeployStep,
              current: i === currentDeployStep,
              success: currentDeployStep >= deploySteps.length
            }"
          >
            <span class="step-name">{{ step.step }}</span>
            <code>{{ step.cmd }}</code>
            <span class="step-desc">{{ step.desc }}</span>
            <span class="step-icon">
              {{ i < currentDeployStep ? '✅' : i === currentDeployStep ? '⏳' : '⬜' }}
            </span>
          </div>
        </div>
        <div v-if="currentDeployStep >= deploySteps.length" class="success-box">
          🎉 部署完成！生产包已上传到服务器
        </div>
        <div class="code-block">
          <pre># 完整部署命令
pnpm build              # 构建
pnpm preview            # 预览
# 然后上传 dist/ 到服务器

# Vercel 一键部署
npx vercel

# Nginx 配置示例
server {
  listen 80;
  root /var/www/dist;
  location / {
    try_files $uri $uri/ /index.html;  # SPA 路由回退
  }
}</pre>
        </div>
        <p class="tip">SPA 部署关键：所有路由都要回退到 index.html</p>
      </div>
    </div>

    <div class="section">
      <h2>� 项目组织最佳实践</h2>
      <div class="card">
        <h3>推荐目录结构</h3>
        <div class="code-block">
          <pre>src/
├── api/              # API 请求封装
│   ├── request.ts    # axios 实例 + 拦截器
│   └── user.ts       # 用户相关 API
├── assets/           # 静态资源（图片、全局 CSS）
├── components/       # 通用组件
│   ├── common/       # 基础组件（Button、Input）
│   └── business/     # 业务组件
├── composables/      # 组合式函数（use 开头）
├── layouts/          # 布局组件
├── router/           # 路由配置
├── stores/           # Pinia 状态管理
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
└── views/            # 页面组件</pre>
        </div>
      </div>

      <div class="card">
        <h3>命名规范</h3>
        <div class="code-block">
          <pre>// 组件命名：PascalCase（大驼峰）
UserProfile.vue、TodoList.vue

// composable 命名：use 前缀 + camelCase
useCounter()、useFetch()、useUserStore()

// 事件命名：kebab-case
emit('update:model-value')
emit('item-deleted')

// CSS 类名：kebab-case
.user-profile、.todo-list

// 常量：UPPER_SNAKE_CASE
const MAX_RETRY = 3</pre>
        </div>
        <p class="tip">团队统一规范比选择哪种规范更重要，推荐使用 ESLint + Prettier 自动化</p>
      </div>

      <div class="card">
        <h3>API 层封装</h3>
        <div class="code-block">
          <pre>// api/request.ts — axios 实例
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response?.status === 401) {
      // 跳转登录
    }
    return Promise.reject(err)
  }
)

export default request

// api/user.ts — 业务 API
import request from './request'
export const getUser = (id: number) => request.get(`/users/${id}`)</pre>
        </div>
        <p class="tip">API 层封装让请求逻辑与组件解耦，方便统一处理鉴权、错误、loading</p>
      </div>
    </div>

    <div class="section">
      <h2>�📝 知识要点</h2>
      <div class="knowledge">
        <div class="point"><strong>Vitest</strong><span>单元测试框架，与 Vite 深度集成</span></div>
        <div class="point"><strong>@vue/test-utils</strong><span>组件测试工具，mount/trigger/expect</span></div>
        <div class="point"><strong>v-once</strong><span>只渲染一次，跳过后续更新</span></div>
        <div class="point"><strong>v-memo</strong><span>条件满足时才更新子树</span></div>
        <div class="point"><strong>代码分割</strong><span>路由懒加载 + 异步组件</span></div>
        <div class="point"><strong>shallowRef</strong><span>避免深层响应式的性能开销</span></div>
        <div class="point"><strong>vite build</strong><span>构建生产包，自动压缩 + tree-shake</span></div>
        <div class="point"><strong>SPA 部署</strong><span>所有路由回退 index.html</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-types { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.test-type {
  display: flex; gap: 10px; align-items: baseline;
  padding: 10px 14px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef;
}
.test-type strong { min-width: 80px; color: #42b883; }
.test-type span { font-size: 13px; color: #666; min-width: 120px; }
.test-type code { font-size: 12px; background: #e9ecef; padding: 2px 6px; border-radius: 4px; }
.opt-list { display: flex; flex-direction: column; gap: 6px; }
.opt-item {
  display: flex; gap: 8px; align-items: center;
  padding: 8px 12px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef; font-size: 13px;
}
.opt-item.done { background: #f0faf5; }
.opt-cat { min-width: 80px; font-weight: bold; }
.opt-tech { min-width: 90px; color: #42b883; font-weight: bold; }
.opt-item code { font-size: 12px; background: #e9ecef; padding: 2px 6px; border-radius: 4px; flex: 1; }
.opt-status { font-size: 16px; }
.demo-area { display: flex; flex-direction: column; gap: 8px; margin: 12px 0; }
.demo-box {
  padding: 12px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef;
}
.demo-box p { margin: 4px 0; font-size: 14px; }
.deploy-pipeline { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.deploy-step {
  display: flex; gap: 8px; align-items: center;
  padding: 10px 14px; border-radius: 8px;
  background: white; border: 1px solid #e9ecef;
  transition: all 0.3s; opacity: 0.5;
}
.deploy-step.active { opacity: 1; background: #f0faf5; border-color: #42b883; }
.deploy-step.current { background: #e8f5e9; box-shadow: 0 0 0 2px rgba(66,184,131,0.3); }
.step-name { font-weight: bold; min-width: 110px; color: #42b883; }
.deploy-step code { font-size: 12px; background: #e9ecef; padding: 2px 6px; border-radius: 4px; min-width: 180px; }
.step-desc { font-size: 13px; color: #666; flex: 1; }
.step-icon { font-size: 18px; }
.success-box {
  background: #e8f5e9; padding: 16px; border-radius: 8px;
  text-align: center; font-weight: bold; color: #2e7d32;
  border: 2px solid #42b883; margin-top: 8px;
}
</style>
