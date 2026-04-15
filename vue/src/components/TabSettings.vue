<script setup lang="ts">
import { ref } from 'vue'

const notifications = ref(true)
const darkMode = ref(false)
const language = ref('中文')
</script>

<template>
  <div class="tab-settings">
    <p>⚙️ 设置 Tab</p>
    <label class="setting-item">
      <input type="checkbox" v-model="notifications" /> 通知
    </label>
    <label class="setting-item">
      <input type="checkbox" v-model="darkMode" /> 暗色模式
    </label>
    <label class="setting-item">
      语言：<select v-model="language">
        <option>中文</option>
        <option>English</option>
        <option>日本語</option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.tab-settings p { margin: 6px 0; font-size: 14px; }
.setting-item {
  display: flex; align-items: center; gap: 8px;
  margin: 8px 0; font-size: 14px; cursor: pointer;
}
.setting-item input { width: auto; }
.setting-item select {
  padding: 4px 8px; border: 2px solid #e9ecef; border-radius: 6px;
  font-size: 13px;
}
</style>
