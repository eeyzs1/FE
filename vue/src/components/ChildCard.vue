<script setup lang="ts">
// ==================== 子组件示例 ====================
//
// defineProps()  — 声明接收的 props
// defineEmits()  — 声明触发的事件
// withDefaults() — 设置 props 默认值

const props = withDefaults(defineProps<{
  message: string
  score: number
}>(), {
  message: '默认消息',
  score: 0
})

const emit = defineEmits<{
  respond: [msg: string]
  changeScore: [delta: number]
}>()

function reply() {
  emit('respond', `收到："${props.message}"，分数是 ${props.score}`)
}
</script>

<template>
  <div class="child-card">
    <p>📨 收到 props：<strong>{{ message }}</strong></p>
    <p>🏆 当前分数：<strong>{{ score }}</strong></p>
    <div class="btn-group">
      <button @click="reply">💬 回复父组件</button>
      <button @click="emit('changeScore', 1)">➕ 加分</button>
      <button @click="emit('changeScore', -1)">➖ 减分</button>
    </div>
  </div>
</template>

<style scoped>
.child-card {
  background: #e8f5e9;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  border: 2px dashed #42b883;
}
.child-card p { margin: 6px 0; }
.btn-group { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
</style>
