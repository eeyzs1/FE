<script setup lang="ts">
// ==================== AttrChild 组件 ====================
// 演示透传 Attributes
// 非 prop 的属性（class、id、style、data-*）会自动透传到根元素
// 注意：class 和 style 是特殊透传属性，无需在 defineProps 中声明即可接收
// 如果声明为 prop，则不会透传到根元素（而是作为 prop 处理）
// 通常做法：使用 inheritAttrs: false + v-bind="$attrs" 手动控制透传位置

// 这里不声明 class 为 prop，让它自动透传到根元素
defineProps<{}>()
</script>

<template>
  <div class="attr-child">
    <p>我是 AttrChild 组件</p>
    <p class="info">检查元素可以看到透传的 id、data-testid、style 等属性</p>
    <p class="info">class 和 style 会自动合并到根元素，无需声明为 prop</p>
    <slot />
  </div>
</template>

<style scoped>
.attr-child {
  background: #e8f5e9; border-radius: 12px; padding: 16px;
  border: 2px dashed #42b883; margin: 8px 0;
}
.attr-child p { margin: 4px 0; }
.info { font-size: 13px; color: #666; }
</style>
