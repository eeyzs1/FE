<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
  code?: string
}>()

const showCode = ref(false)
</script>

<template>
  <div class="demo-box">
    <div class="demo-header" v-if="title">
      <span class="demo-badge">🎯 实时演示</span>
      <span class="demo-title">{{ title }}</span>
      <button v-if="code" class="toggle-code-btn" @click="showCode = !showCode">
        {{ showCode ? '隐藏代码' : '查看代码' }}
      </button>
    </div>
    <div class="demo-content">
      <slot />
    </div>
    <div v-if="code && showCode" class="demo-code">
      <pre>{{ code }}</pre>
    </div>
  </div>
</template>

<style scoped>
.demo-box {
  border: 2px solid #42b883;
  border-radius: 12px;
  overflow: hidden;
  margin: 12px 0;
  background: white;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: #f0faf5;
  border-bottom: 1px solid #e0f2e9;
}

.demo-badge {
  background: #42b883;
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}

.demo-title {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  flex: 1;
}

.toggle-code-btn {
  padding: 4px 12px;
  border: 1px solid #42b883;
  border-radius: 6px;
  background: white;
  color: #42b883;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.toggle-code-btn:hover {
  background: #42b883;
  color: white;
}

.demo-content {
  padding: 16px;
}

.demo-code {
  background: #1e1e1e;
  padding: 14px;
  border-top: 1px solid #e0f2e9;
}

.demo-code pre {
  color: #d4d4d4;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
  white-space: pre;
}
</style>
