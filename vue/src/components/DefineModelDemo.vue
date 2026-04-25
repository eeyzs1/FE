<script setup lang="ts">
// ==================== DefineModelDemo 组件 ====================
// 使用 defineModel() 宏（Vue 3.4+）
// 替代 defineProps + defineEmits 的简化写法

const modelValue = defineModel<string>({ required: true })
const title = defineModel<string>('title', { required: true })
const formattedText = defineModel<string>('formattedText', {
  required: true,
  set(value) {
    const mods = (formattedText as unknown as { modifiers?: Record<string, boolean> }).modifiers
    return mods?.capitalize
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : value
  },
})
</script>

<template>
  <div class="define-model-demo">
    <div class="demo-section">
      <label>基本 v-model (defineModel)：</label>
      <input
        :value="modelValue"
        @input="modelValue = ($event.target as HTMLInputElement).value"
        placeholder="输入内容"
      />
    </div>
    <div class="demo-section">
      <label>v-model:title：</label>
      <input
        :value="title"
        @input="title = ($event.target as HTMLInputElement).value"
        placeholder="输入标题"
      />
    </div>
    <div class="demo-section">
      <label>v-model.formattedText.capitalize：</label>
      <input
        :value="formattedText"
        @input="formattedText = ($event.target as HTMLInputElement).value"
        placeholder="输入内容（capitalize 修饰符会首字母大写）"
      />
    </div>
  </div>
</template>

<style scoped>
.define-model-demo { display: flex; flex-direction: column; gap: 10px; }
.demo-section { display: flex; flex-direction: column; gap: 4px; }
.demo-section label { font-size: 13px; font-weight: bold; color: #42b883; }
.demo-section input {
  padding: 8px 12px; border: 2px solid #e9ecef; border-radius: 8px;
  font-size: 14px; transition: border-color 0.2s;
}
.demo-section input:focus { outline: none; border-color: #42b883; }
</style>
