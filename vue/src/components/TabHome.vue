<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

const message = ref('')
const activationLog = ref<string[]>([])

onActivated(() => {
  const time = new Date().toLocaleTimeString()
  activationLog.value.push(`🟢 激活 @ ${time}`)
  if (activationLog.value.length > 6) activationLog.value.shift()
})

onDeactivated(() => {
  const time = new Date().toLocaleTimeString()
  activationLog.value.push(`🔴 缓存 @ ${time}`)
  if (activationLog.value.length > 6) activationLog.value.shift()
})
</script>

<template>
  <div class="tab-home">
    <p>🏠 欢迎来到首页 Tab！</p>
    <input v-model="message" placeholder="输入内容（切换 Tab 后测试 KeepAlive）" />
    <p v-if="message">你输入了：{{ message }}</p>
    <div v-if="activationLog.length" class="activation-log">
      <p v-for="(log, i) in activationLog" :key="i" class="log-item">{{ log }}</p>
    </div>
  </div>
</template>

<style scoped>
.tab-home input {
  padding: 8px 12px; border: 2px solid #e9ecef; border-radius: 8px;
  font-size: 14px; width: 100%; box-sizing: border-box; margin-top: 8px;
}
.tab-home input:focus { outline: none; border-color: #42b883; }
.tab-home p { margin: 6px 0; font-size: 14px; }
.activation-log {
  background: #1e1e1e; border-radius: 6px; padding: 6px 10px;
  margin-top: 8px; max-height: 80px; overflow-y: auto;
}
.activation-log .log-item {
  font-family: monospace; font-size: 11px; color: #4ec9b0; margin: 2px 0;
}
</style>
