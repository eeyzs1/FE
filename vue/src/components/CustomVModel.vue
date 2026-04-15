<script setup lang="ts">
// ==================== CustomVModel 组件 ====================
// 带参数的 v-model：v-model:color
// 接收 color prop，触发 update:color 事件

defineProps<{
  color: string
}>()

defineEmits<{
  'update:color': [value: string]
}>()

const colorOptions = [
  { label: '🟢 绿色', value: 'green' },
  { label: '🔴 红色', value: 'red' },
  { label: '🔵 蓝色', value: 'blue' },
  { label: '🟡 黄色', value: 'orange' },
  { label: '🟣 紫色', value: 'purple' },
]
</script>

<template>
  <div class="color-picker">
    <p>选择颜色：</p>
    <div class="color-buttons">
      <button
          v-for="opt in colorOptions"
          :key="opt.value"
          @click="$emit('update:color', opt.value)"
          :class="['color-btn', { active: color === opt.value }]"
        >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.color-picker p { margin-bottom: 8px; font-weight: bold; }
.color-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.color-btn {
  padding: 8px 14px; border: 2px solid #e9ecef; border-radius: 8px;
  background: white; color: #333; font-size: 13px;
}
.color-btn.active { border-color: #42b883; background: #f0faf5; color: #42b883; }
.color-btn:hover { border-color: #42b883; }
</style>
