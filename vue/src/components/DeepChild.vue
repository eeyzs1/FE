<script setup lang="ts">
</script>

<template>
  <div class="deep-child">
    <p class="deep-target">🎯 我是 DeepChild 内部元素（.deep-target）</p>
    <p class="deep-label">🏷️ 我也是内部元素（.deep-label）</p>
  </div>
</template>

<style scoped>
.deep-child {
  padding: 16px; background: #e3f2fd;
  border-radius: 12px; border: 2px dashed #1976d2;
}
.deep-target { color: #1976d2; font-weight: bold; margin: 4px 0; transition: all 0.3s; }
.deep-label { color: #1565c0; font-size: 14px; margin: 4px 0; transition: all 0.3s; }
</style>
