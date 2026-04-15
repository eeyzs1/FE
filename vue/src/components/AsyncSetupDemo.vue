<script setup lang="ts">
// 异步 setup 组件 — Suspense 的更常见使用场景
// 当 setup 函数是 async 时，Suspense 会等待它完成

const data = await new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('🎉 异步数据加载完成！')
  }, 2000)
})
</script>

<template>
  <div class="async-setup-loaded">
    <p>{{ data }}</p>
    <p class="note">这个组件使用了 async setup()，Suspense 等待数据加载完成后才显示</p>
  </div>
</template>

<style scoped>
.async-setup-loaded {
  padding: 16px; background: #e8f5e9; border-radius: 8px;
  border: 2px solid #42b883; text-align: center;
}
.async-setup-loaded p { margin: 4px 0; }
.note { font-size: 12px; color: #666; font-style: italic; }
</style>
