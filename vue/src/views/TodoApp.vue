<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores'
import TodoItem from '../components/TodoItem.vue'

// ==================== 综合实战：TodoApp ====================
//
// 综合运用前面课程的所有知识：
// - ref / reactive（第1课）
// - computed（第2课）
// - 组件通信 props/emit（第3课）
// - v-for / v-if（第4课）
// - v-model（第5课）
// - 路由导航（第6课）
// - 生命周期（第7课）
// - Pinia 状态管理（第13课）

const todoStore = useTodoStore()
const { filteredTodos, stats, filter } = storeToRefs(todoStore)
const { addTodo, toggleTodo, removeTodo, clearDone } = todoStore

const newTodoText = ref('')
const newTodoPriority = ref<'low' | 'medium' | 'high'>('medium')

function handleAddTodo() {
  addTodo(newTodoText.value, newTodoPriority.value)
  newTodoText.value = ''
}
</script>

<template>
  <div class="todo-app">
    <h1>🎯 综合实战：TodoApp</h1>
    <p class="desc">综合运用全部课程知识构建完整应用，使用 Pinia 管理状态</p>

    <div class="stats-bar">
      <div class="stat">
        <span class="stat-num">{{ stats.total }}</span>
        <span class="stat-label">总计</span>
      </div>
      <div class="stat">
        <span class="stat-num done">{{ stats.done }}</span>
        <span class="stat-label">完成</span>
      </div>
      <div class="stat">
        <span class="stat-num active">{{ stats.active }}</span>
        <span class="stat-label">待办</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar" :style="{ width: stats.progress + '%' }"></div>
        <span class="progress-text">{{ stats.progress }}%</span>
      </div>
    </div>

    <div class="add-section">
      <input
        v-model="newTodoText"
        placeholder="添加新待办..."
        @keyup.enter="handleAddTodo"
        class="todo-input"
      />
      <select v-model="newTodoPriority" class="priority-select">
        <option value="low">🟢 低</option>
        <option value="medium">🟡 中</option>
        <option value="high">🔴 高</option>
      </select>
      <button @click="handleAddTodo" class="add-btn">添加</button>
    </div>

    <div class="filter-bar">
      <button
        v-for="f in (['all', 'active', 'done'] as const)"
        :key="f"
        @click="filter = f"
        :class="['filter-btn', { active: filter === f }]"
      >
        {{ f === 'all' ? '全部' : f === 'active' ? '待办' : '已完成' }}
      </button>
      <button @click="clearDone" class="clear-btn" v-if="stats.done > 0">
        🗑️ 清除已完成
      </button>
    </div>

    <div class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
      <p v-if="!filteredTodos.length" class="empty">
        {{ filter === 'all' ? '🎉 没有待办，添加一个吧！' : '📭 没有匹配的待办' }}
      </p>
    </div>

    <div class="knowledge-section">
      <h2>📝 本应用用到的知识点</h2>
      <div class="knowledge">
        <div class="point"><strong>第1课</strong><span>ref 响应式数据</span></div>
        <div class="point"><strong>第2课</strong><span>computed 派生统计数据</span></div>
        <div class="point"><strong>第3课</strong><span>TodoItem 组件 props/emit</span></div>
        <div class="point"><strong>第4课</strong><span>v-for 列表 + v-if 条件</span></div>
        <div class="point"><strong>第5课</strong><span>v-model 表单绑定</span></div>
        <div class="point"><strong>第6课</strong><span>路由导航到此页面</span></div>
        <div class="point"><strong>第7课</strong><span>可扩展为 composable</span></div>
        <div class="point"><strong>第13课</strong><span>Pinia 状态管理 + storeToRefs</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-app { max-width: 720px; margin: 0 auto; padding: 32px 20px; }

.stats-bar {
  display: flex; gap: 16px; align-items: center;
  background: #f8f9fa; border-radius: 12px; padding: 16px;
  margin-bottom: 20px; border: 1px solid #e9ecef; flex-wrap: wrap;
}
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 24px; font-weight: bold; color: #333; }
.stat-num.done { color: #4caf50; }
.stat-num.active { color: #ff9800; }
.stat-label { font-size: 12px; color: #888; }
.progress-wrap {
  flex: 1; min-width: 120px; height: 28px;
  background: #e9ecef; border-radius: 14px;
  position: relative; overflow: hidden;
}
.progress-bar {
  height: 100%; background: linear-gradient(90deg, #42b883, #4caf50);
  border-radius: 14px; transition: width 0.3s;
}
.progress-text {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px; font-weight: bold; color: #333;
}

.add-section { display: flex; gap: 8px; margin-bottom: 16px; }
.todo-input {
  flex: 1; padding: 10px 14px; border: 2px solid #e9ecef;
  border-radius: 10px; font-size: 15px; transition: border-color 0.2s;
}
.todo-input:focus { outline: none; border-color: #42b883; }
.priority-select {
  padding: 10px; border: 2px solid #e9ecef; border-radius: 10px;
  font-size: 14px; background: white;
}
.add-btn {
  padding: 10px 20px; border: none; border-radius: 10px;
  background: #42b883; color: white; cursor: pointer;
  font-size: 15px; transition: all 0.2s;
}
.add-btn:hover { background: #369a6e; }

.filter-bar { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.filter-btn {
  padding: 6px 14px; border: 2px solid #e9ecef; border-radius: 8px;
  background: white; color: #666; cursor: pointer; font-size: 13px;
  transition: all 0.2s;
}
.filter-btn.active { border-color: #42b883; color: #42b883; background: #f0faf5; }
.filter-btn:hover { border-color: #42b883; }
.clear-btn {
  padding: 6px 14px; border: 2px solid #f44336; border-radius: 8px;
  background: white; color: #f44336; cursor: pointer; font-size: 13px;
  margin-left: auto; transition: all 0.2s;
}
.clear-btn:hover { background: #fff5f5; }

.todo-list { margin-bottom: 32px; }
.empty { text-align: center; color: #888; padding: 32px; }

.knowledge-section { margin-top: 32px; }
</style>
