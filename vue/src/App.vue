<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const lessons = [
  { path: '/lesson1', label: '第1课', title: '响应式基础' },
  { path: '/lesson2', label: '第2课', title: '计算属性与侦听器' },
  { path: '/lesson3', label: '第3课', title: '组件通信' },
  { path: '/lesson4', label: '第4课', title: '条件与列表渲染' },
  { path: '/lesson5', label: '第5课', title: '表单绑定' },
  { path: '/lesson6', label: '第6课', title: 'Vue Router' },
  { path: '/lesson7', label: '第7课', title: '生命周期与Composables' },
  { path: '/lesson8', label: '第8课', title: 'Class/Style与事件' },
  { path: '/lesson9', label: '第9课', title: '模板引用与动态组件' },
  { path: '/lesson10', label: '第10课', title: '内置组件' },
  { path: '/lesson11', label: '第11课', title: '自定义指令与组件v-model' },
  { path: '/lesson12', label: '第12课', title: '异步组件与性能优化' },
  { path: '/lesson13', label: '第13课', title: 'Pinia状态管理' },
  { path: '/lesson14', label: '第14课', title: '深入响应式与渲染函数' },
  { path: '/lesson15', label: '第15课', title: '模板语法与组件注册' },
  { path: '/lesson16', label: '第16课', title: 'SFC与渲染机制' },
  { path: '/lesson17', label: '第17课', title: 'TypeScript与Vue' },
  { path: '/lesson18', label: '第18课', title: '测试与生产部署' },
  { path: '/lesson19', label: '第19课', title: 'SSR与安全动画' },
  { path: '/todo', label: '实战', title: 'TodoApp 综合实战' },
]

const currentIndex = computed(() => lessons.findIndex(l => l.path === route.path))
const currentLesson = computed(() => lessons.find(l => l.path === route.path))
const prevLesson = computed(() => currentIndex.value > 0 ? lessons[currentIndex.value - 1] : null)
const nextLesson = computed(() => currentIndex.value < lessons.length - 1 ? lessons[currentIndex.value + 1] : null)
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar" :class="{ open: menuOpen }">
      <div class="sidebar-header">
        <h2>🎓 Vue 3 教程</h2>
        <button class="close-btn" @click="menuOpen = false">✕</button>
      </div>
      <nav class="nav">
        <RouterLink
          v-for="lesson in lessons"
          :key="lesson.path"
          :to="lesson.path"
          class="nav-item"
          :class="{ active: route.path === lesson.path }"
          @click="menuOpen = false"
        >
          <span class="nav-label">{{ lesson.label }}</span>
          <span class="nav-title">{{ lesson.title }}</span>
        </RouterLink>
      </nav>
    </aside>

    <main class="main">
      <header class="top-bar">
        <button class="menu-btn" @click="menuOpen = !menuOpen">☰</button>
        <span class="current-lesson">
          {{ currentLesson?.label || '首页' }}
          {{ currentLesson?.title || '' }}
        </span>
      </header>
      <RouterView />
      <div v-if="currentIndex >= 0" class="lesson-nav">
        <RouterLink v-if="prevLesson" :to="prevLesson.path" class="nav-prev">
          ← {{ prevLesson.label }} {{ prevLesson.title }}
        </RouterLink>
        <span v-else></span>
        <RouterLink v-if="nextLesson" :to="nextLesson.path" class="nav-next">
          {{ nextLesson.label }} {{ nextLesson.title }} →
        </RouterLink>
      </div>
    </main>

    <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: #1a1a2e;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
  transition: transform 0.3s;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.sidebar-header h2 {
  font-size: 18px;
  color: #42b883;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  display: none;
}

.nav {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  color: #aaa;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 14px;
}

.nav-item:hover {
  background: rgba(255,255,255,0.08);
  color: white;
}

.nav-item.active {
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
}

.nav-label {
  font-weight: bold;
  min-width: 45px;
}

.nav-title {
  font-size: 13px;
  opacity: 0.8;
}

.main {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  background: white;
}

.top-bar {
  display: none;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 50;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  padding: 4px;
  color: #333;
}

.current-lesson {
  font-weight: bold;
  color: #42b883;
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 90;
}

.lesson-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.lesson-nav a {
  padding: 10px 20px;
  border-radius: 8px;
  background: #42b883;
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.lesson-nav a:hover {
  background: #369a6e;
  transform: translateY(-1px);
}

.nav-next {
  margin-left: auto;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .close-btn {
    display: block;
  }
  .main {
    margin-left: 0;
  }
  .top-bar {
    display: flex;
  }
  .overlay {
    display: block;
  }
}
</style>
