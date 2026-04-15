<script setup lang="ts">
// ==================== 全局注册组件示例 ====================
// 这个组件在 main.ts 中通过 app.component() 全局注册
// 所有组件无需 import 即可直接使用
</script>

<template>
  <button class="global-btn">
    <slot>全局按钮</slot>
  </button>
</template>

<style scoped>
.global-btn {
  padding: 10px 20px; border: none; border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white; cursor: pointer; font-size: 14px;
  transition: all 0.2s; font-weight: bold;
}
.global-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
