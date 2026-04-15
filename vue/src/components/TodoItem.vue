<script setup lang="ts">
import type { Todo } from '../stores'

defineProps<{
  todo: Todo
}>()

defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()

const priorityMap: Record<Todo['priority'], { emoji: string; label: string }> = {
  low: { emoji: '🟢', label: '低' },
  medium: { emoji: '🟡', label: '中' },
  high: { emoji: '🔴', label: '高' },
}
</script>

<template>
  <div class="todo-item" :class="{ done: todo.done }">
    <label class="checkbox-wrap">
      <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo.id)" />
      <span class="checkmark"></span>
    </label>
    <span class="priority">{{ priorityMap[todo.priority].emoji }}</span>
    <span class="text">{{ todo.text }}</span>
    <button class="remove-btn" @click="$emit('remove', todo.id)">✕</button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; background: white; border-radius: 10px;
  margin: 6px 0; border: 1px solid #e9ecef;
  transition: all 0.2s;
}
.todo-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.todo-item.done { opacity: 0.6; }
.todo-item.done .text { text-decoration: line-through; color: #aaa; }

.checkbox-wrap {
  position: relative; display: flex; align-items: center; cursor: pointer;
}
.checkbox-wrap input { display: none; }
.checkmark {
  width: 22px; height: 22px; border: 2px solid #ddd;
  border-radius: 6px; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.checkbox-wrap input:checked + .checkmark {
  background: #42b883; border-color: #42b883;
}
.checkbox-wrap input:checked + .checkmark::after {
  content: '✓'; color: white; font-size: 14px; font-weight: bold;
}

.priority { font-size: 14px; }
.text { flex: 1; font-size: 15px; }
.remove-btn {
  width: 28px; height: 28px; border: none; border-radius: 6px;
  background: transparent; color: #ccc; cursor: pointer;
  font-size: 14px; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.remove-btn:hover { background: #fff5f5; color: #f44336; }
</style>
