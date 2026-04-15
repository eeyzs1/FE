<script setup lang="ts">
// ==================== 插槽示例组件 ====================
//
// <slot />          — 默认插槽
// <slot name="x" /> — 具名插槽
// <slot :data="x"/> — 作用域插槽（向父组件暴露数据）

const items = ['Vue', 'React', 'Angular', 'Svelte']
</script>

<template>
  <div class="slot-demo">
    <div v-if="$slots.header" class="slot-header">
      <slot name="header" />
    </div>

    <div class="slot-default">
      <slot :items="items">
        <div v-for="(item, index) in items" :key="item" class="default-item">
          <span>第{{ index + 1 }}项：{{ item }}</span>
        </div>
      </slot>
    </div>

    <div v-if="$slots.footer" class="slot-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.slot-demo {
  background: #fff3e0;
  border-radius: 12px;
  padding: 16px;
  border: 2px dashed #ff9800;
}
.slot-header { border-bottom: 1px dashed #ff9800; padding-bottom: 8px; margin-bottom: 8px; }
.slot-footer { border-top: 1px dashed #ff9800; padding-top: 8px; margin-top: 8px; }
.default-item {
  padding: 4px 8px;
  background: #ffe0b2;
  border-radius: 6px;
  margin: 4px 0;
  font-size: 14px;
}
</style>
