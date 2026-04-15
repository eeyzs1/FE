<script setup lang="ts">
import { ref, computed } from 'vue'

// ==================== 第6课：Vue Router 路由 ====================
//
// 这个页面本身就在使用 Vue Router！
// 你能从左侧导航点击来到这里，就是路由在工作
//
// 核心概念：
// 1. <RouterView />  — 路由出口，匹配的组件渲染在这里
// 2. <RouterLink />  — 路由链接，声明式导航（生成 <a> 标签）
// 3. useRouter()     — 编程式导航
// 4. useRoute()      — 获取当前路由信息
// 5. 路由参数        — 动态路由 /user/:id
// 6. 嵌套路由        — 路由中的路由

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// --- 编程式导航 ---
function goToLesson(num: number) {
  router.push(`/lesson${num}`)
}

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

// --- 动态路由参数 ---
const userId = ref('')
function goToUser() {
  if (userId.value.trim()) {
    router.push(`/lesson6/user/${userId.value.trim()}`)
  }
}

// --- 路由查询参数 ---
function goToWithQuery() {
  router.push({
    path: '/lesson6/search',
    query: { q: 'vue', page: '1' }
  })
}

// --- 路由信息（computed 自动响应） ---
const routeInfo = computed(() => ({
  path: route.path,
  name: route.name as string,
  params: { ...route.params },
  query: { ...route.query },
  fullPath: route.fullPath,
}))
</script>

<template>
  <div class="lesson">
    <h1>📖 第6课：Vue Router 路由</h1>
    <p class="desc">路由让单页应用拥有多个"页面"，你正在使用的导航就是路由！</p>

    <div class="section">
      <h2>🔹 RouterLink — 声明式导航</h2>
      <div class="card">
        <div class="link-group">
          <RouterLink to="/lesson1" class="nav-link">📖 第1课</RouterLink>
          <RouterLink :to="{ path: '/lesson2' }" class="nav-link">📖 第2课</RouterLink>
        </div>
        <p class="tip">RouterLink 生成 &lt;a&gt; 标签，但不会刷新页面（SPA 导航）</p>
        <p class="tip">:to 可以是字符串或对象，当前激活的链接会自动添加 .router-link-active 类</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 编程式导航 — useRouter()</h2>
      <div class="card">
        <div class="btn-group">
          <button @click="goToLesson(1)">跳转第1课</button>
          <button @click="goToLesson(3)">跳转第3课</button>
          <button @click="goBack">⬅️ 后退</button>
          <button @click="goForward">➡️ 前进</button>
        </div>
        <p class="tip">router.push() 跳转，router.back() 后退，router.forward() 前进</p>
        <p class="tip">下方路由信息用 computed 自动响应，无需手动刷新</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 动态路由参数</h2>
      <div class="card">
        <input v-model="userId" placeholder="输入用户ID" @keyup.enter="goToUser" />
        <button @click="goToUser">查看用户</button>
        <p class="tip">路由定义 /lesson6/user/:id，通过 route.params.id 获取</p>
        <div v-if="route.params.id" class="highlight">
          <p>当前用户 ID：<strong>{{ route.params.id }}</strong></p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>🔹 查询参数</h2>
      <div class="card">
        <button @click="goToWithQuery">搜索 "vue"</button>
        <div v-if="Object.keys(route.query).length" class="highlight">
          <p>查询参数：</p>
          <p v-for="(val, key) in route.query" :key="key">{{ key }} = {{ val }}</p>
        </div>
        <p class="tip">route.query 获取 ?q=vue&page=1 形式的参数</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 当前路由信息 — useRoute()</h2>
      <div class="card">
        <div class="route-info">
          <div class="info-row"><span>path:</span><code>{{ routeInfo.path }}</code></div>
          <div class="info-row"><span>name:</span><code>{{ routeInfo.name }}</code></div>
          <div class="info-row"><span>fullPath:</span><code>{{ routeInfo.fullPath }}</code></div>
          <div class="info-row"><span>params:</span><code>{{ JSON.stringify(routeInfo.params) }}</code></div>
          <div class="info-row"><span>query:</span><code>{{ JSON.stringify(routeInfo.query) }}</code></div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>📝 路由要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>RouterView</strong>
          <span>路由出口，匹配组件渲染的位置</span>
        </div>
        <div class="point">
          <strong>RouterLink</strong>
          <span>声明式导航，to 指定目标路由</span>
        </div>
        <div class="point">
          <strong>useRouter</strong>
          <span>编程式导航，push/replace/back</span>
        </div>
        <div class="point">
          <strong>useRoute</strong>
          <span>获取当前路由信息，params/query</span>
        </div>
        <div class="point">
          <strong>动态路由</strong>
          <span>/path/:id，通过 route.params.id 获取</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-group { display: flex; gap: 12px; flex-wrap: wrap; }
.nav-link {
  padding: 8px 16px; background: #42b883; color: white;
  border-radius: 8px; text-decoration: none; font-size: 14px;
  transition: all 0.2s;
}
.nav-link:hover { background: #369a6e; }
.highlight {
  background: #e8f5e9; padding: 12px; border-radius: 8px;
  margin-top: 12px; border-left: 3px solid #42b883;
}
.route-info { display: flex; flex-direction: column; gap: 6px; }
.info-row { display: flex; gap: 8px; align-items: center; }
.info-row span { min-width: 70px; color: #888; font-size: 13px; }
.info-row code { background: #e9ecef; padding: 2px 8px; border-radius: 4px; font-size: 13px; }
</style>
