<script setup lang="ts">
// ==================== CustomInput 组件 ====================
// 组件 v-model 的标准实现：
// 1. 接收 modelValue prop
// 2. 触发 update:modelValue 事件

defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="custom-input">
    <label>自定义输入组件：</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="输入用户名"
    />
  </div>
</template>

<style scoped>
.custom-input { display: flex; align-items: center; gap: 8px; }
.custom-input label { font-weight: bold; font-size: 14px; white-space: nowrap; }
.custom-input input {
  flex: 1; padding: 8px 12px; border: 2px solid #e9ecef;
  border-radius: 8px; font-size: 14px; transition: border-color 0.2s;
}
.custom-input input:focus { outline: none; border-color: #42b883; }
</style>
