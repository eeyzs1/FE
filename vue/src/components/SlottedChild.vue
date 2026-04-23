<script setup lang="ts">
</script>

<template>
  <div class="slotted-child">
    <p class="child-title">📦 我是 SlottedChild 子组件</p>
    <slot>
      <p class="child-default">默认插槽内容</p>
    </slot>
    <p class="child-footer">子组件底部（不受 :slotted() 影响）</p>
  </div>
</template>

<style scoped>
.slotted-child {
  padding: 16px; background: #fff3e0;
  border-radius: 12px; border: 2px dashed #ff9800;
}
.child-title { font-weight: bold; color: #ff9800; margin: 0 0 8px; }
.child-default { color: #999; font-style: italic; margin: 4px 0; }
.child-footer { font-size: 12px; color: #999; margin: 8px 0 0; border-top: 1px dashed #ff9800; padding-top: 8px; }

:slotted(.slotted-item) {
  background: #e8f5e9; padding: 6px 10px;
  border-radius: 6px; border-left: 3px solid #42b883;
  margin: 4px 0; color: #42b883; font-weight: bold;
}
</style>
