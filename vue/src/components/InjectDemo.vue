<script setup lang="ts">
import { inject, ref } from 'vue'
import { themeKey, appNameKey } from '../injectionKeys'

const theme = inject(themeKey, ref<'light' | 'dark'>('light'))
const appName = inject(appNameKey, ref(''))
</script>

<template>
  <div class="inject-child" :class="'theme-' + theme">
    <p>🧩 我是 InjectDemo 子组件</p>
    <p>inject 获取到的主题：<strong>{{ theme }}</strong></p>
    <p>inject 获取到的应用名：<strong>{{ appName }}</strong></p>
    <p class="note">这些数据来自祖先组件的 provide，无需中间层传递</p>
  </div>
</template>

<style scoped>
.inject-child { padding: 16px; border-radius: 8px; margin-top: 12px; transition: all 0.3s; }
.theme-light { background: #fff; color: #333; border: 2px solid #e9ecef; }
.theme-dark { background: #1a1a2e; color: #e0e0e0; border: 2px solid #444; }
.note { font-size: 12px; color: #888; font-style: italic; margin-top: 8px; }
</style>
