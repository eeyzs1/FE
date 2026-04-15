<script setup lang="ts">
import { ref, reactive } from 'vue'

// ==================== 第1课：响应式基础 ====================
//
// Vue 3 有两种创建响应式数据的方式：
// 1. ref()   - 适用于所有类型，基本类型推荐
// 2. reactive() - 适用于对象/数组
//
// 关键区别：
// - ref 需要 .value 访问值（在 JS 中），在模板中自动解包
// - reactive 直接访问属性，但不能替换整个对象

// --- ref 示例 ---
const count = ref(0)
const message = ref('你好，Vue！')

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function resetCount() {
  count.value = 0
}

// --- reactive 示例 ---
const user = reactive({
  name: '张三',
  age: 25,
  hobbies: ['编程', '阅读', '游戏']
})

function addHobby() {
  const hobbies = ['游泳', '跑步', '绘画', '音乐', '烹饪']
  const random = hobbies[Math.floor(Math.random() * hobbies.length)]
  if (!user.hobbies.includes(random)) {
    user.hobbies.push(random)
  }
}

function growUp() {
  user.age++
}

// --- 模板语法要点 ---
// {{ }} 插值表达式 - 显示数据
// v-bind:href="url" 或 :href="url" - 绑定属性
// @click="handler" - 绑定事件
// v-if / v-show - 条件渲染（后续课程详解）
</script>

<template>
  <div class="lesson">
    <h1>📖 第1课：响应式基础</h1>
    <p class="desc">Vue 的核心是响应式系统 —— 数据变化，视图自动更新</p>

    <div class="section">
      <h2>🔹 ref() — 基本类型的响应式</h2>
      <div class="card">
        <p>计数器：<strong>{{ count }}</strong></p>
        <div class="btn-group">
          <button @click="decrement">➖ 减一</button>
          <button @click="increment">➕ 加一</button>
          <button @click="resetCount">🔄 重置</button>
        </div>
        <p class="tip">ref 在 &lt;script&gt; 中需要 .value 访问，在 template 中自动解包</p>
      </div>

      <div class="card">
        <p>消息：<strong>{{ message }}</strong></p>
        <input v-model="message" placeholder="输入消息" />
        <p class="tip">v-model 双向绑定，输入框的值和 message 同步</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 reactive() — 对象的响应式</h2>
      <div class="card">
        <p>姓名：<strong>{{ user.name }}</strong></p>
        <p>年龄：<strong>{{ user.age }}</strong></p>
        <p>爱好：{{ user.hobbies.join('、') }}</p>
        <div class="btn-group">
          <button @click="growUp">🎂 长大一岁</button>
          <button @click="addHobby">🎲 随机添加爱好</button>
        </div>
        <p class="tip">reactive 直接访问属性，无需 .value</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>ref()</strong>
          <span>适用于所有类型，基本类型推荐，通过 .value 读写</span>
        </div>
        <div class="point">
          <strong>reactive()</strong>
          <span>用于对象/数组，直接访问属性</span>
        </div>
        <div class="point">
          <strong>选择建议</strong>
          <span>优先 ref — 解构安全、可替换整个值；reactive 仅复杂对象时用</span>
        </div>
        <div class="point">
          <strong>{{ }}</strong>
          <span>模板插值，显示响应式数据</span>
        </div>
        <div class="point">
          <strong>v-model</strong>
          <span>双向绑定，表单输入同步数据</span>
        </div>
        <div class="point">
          <strong>@click</strong>
          <span>事件绑定，v-on:click 的缩写</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
input:focus {
  outline: none;
  border-color: #42b883;
}
</style>
