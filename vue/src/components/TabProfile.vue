<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
</script>

<template>
  <div class="tab-profile">
    <p>👤 个人信息 Tab</p>
    <input v-model="name" placeholder="姓名" />
    <input v-model="email" placeholder="邮箱" />
    <p v-if="name">姓名：{{ name }}</p>
    <p v-if="email">邮箱：{{ email }}</p>
  </div>
</template>

<style scoped>
.tab-profile input {
  padding: 8px 12px; border: 2px solid #e9ecef; border-radius: 8px;
  font-size: 14px; width: 100%; box-sizing: border-box; margin-top: 8px;
}
.tab-profile input:focus { outline: none; border-color: #42b883; }
.tab-profile p { margin: 6px 0; font-size: 14px; }
</style>
