<script setup lang="ts">
import { ref, reactive, toRef, toRefs, shallowRef, shallowReactive, triggerRef } from 'vue'

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

function removeHobby() {
  const random = user.hobbies[Math.floor(Math.random() * user.hobbies.length)]
  if (user.hobbies.includes(random)) {
    user.hobbies.splice(user.hobbies.indexOf(random), 1)
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

// --- toRef / toRefs 演示 ---
// reactive 解构会丢失响应性，用 toRef/toRefs 保持
const { name: userName, age: userAge } = toRefs(user)
// toRef 也可以单独转换一个属性
const nameRef = toRef(user, 'name')

// --- shallowRef 演示 ---
// shallowRef 只追踪 .value 的替换，不追踪内部属性变化
const shallowList = shallowRef<string[]>(['A', 'B', 'C'])
function pushShallow() {
  shallowList.value.push('D')
  triggerRef(shallowList)
}
function replaceShallow() {
  shallowList.value = [...shallowList.value, 'E']
}

// --- shallowReactive 演示 ---
// shallowReactive 只有根级属性是响应式的
const shallowState = shallowReactive({
  rootProp: '根级属性（响应式）',
  nested: { deep: '深层属性（非响应式）' }
})
const shallowLog = ref<string[]>([])
function mutateRoot() {
  shallowState.rootProp = `更新 ${Date.now() % 1000}`
  shallowLog.value.push('✅ rootProp 变更 → 视图更新')
  if (shallowLog.value.length > 5) shallowLog.value.shift()
}
function mutateNested() {
  shallowState.nested.deep = `更新 ${Date.now() % 1000}`
  shallowLog.value.push('⚠️ nested.deep 变更 → 视图可能不更新！')
  if (shallowLog.value.length > 5) shallowLog.value.shift()
}
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
          <button @click="removeHobby">❌删除爱好</button>
        </div>
        <p class="tip">reactive 直接访问属性，无需 .value</p>
      </div>
    </div>

    <div class="section">
      <h2>� toRef / toRefs — 解构保持响应性</h2>
      <div class="card">
        <p>reactive 对象直接解构会丢失响应性，必须用 toRefs：</p>
        <p>userName（toRefs）：{{ userName }} | userAge（toRefs）：{{ userAge }}</p>
        <div class="code-block">
          <pre>// ❌ 直接解构 — 丢失响应性
const { name, age } = user
name = '李四'  // 不会触发更新！

// ✅ toRefs — 每个属性变成 ref，保持响应性
const { name: userName, age: userAge } = toRefs(user)
userName.value = '李四'  // 触发更新！

// ✅ toRef — 单独转换一个属性
const nameRef = toRef(user, 'name')
nameRef.value = '王五'  // 触发更新！

// toRefs 常用于 composable 返回值解构
// const { x, y } = toRefs(useMouse())</pre>
        </div>
        <p class="tip">toRef/toRefs 创建的 ref 与原 reactive 属性保持同步，修改任一方另一方也变</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 shallowRef / shallowReactive — 浅层响应式</h2>
      <div class="card">
        <h3>shallowRef — 只追踪 .value 替换</h3>
        <p>数组内容：{{ shallowList.join(', ') }}</p>
        <div class="btn-group">
          <button @click="pushShallow">push + triggerRef</button>
          <button @click="replaceShallow">替换整个数组</button>
        </div>
        <div class="code-block">
          <pre>// shallowRef：只有 .value 替换才触发更新
const list = shallowRef(['A', 'B', 'C'])

// ❌ 修改内部属性不会触发更新
list.value.push('D')  // 视图不更新！

// ✅ 方式1：替换整个 .value
list.value = [...list.value, 'D']

// ✅ 方式2：修改后手动触发
list.value.push('D')
triggerRef(list)  // 强制更新</pre>
        </div>
        <p class="tip">shallowRef 适合大型数据结构（如第三方库返回的对象），避免深层响应式的性能开销</p>
      </div>

      <div class="card">
        <h3>shallowReactive — 只有根级属性响应式</h3>
        <p>rootProp：<strong>{{ shallowState.rootProp }}</strong></p>
        <p>nested.deep：<strong>{{ shallowState.nested.deep }}</strong></p>
        <div class="btn-group">
          <button @click="mutateRoot">✏️ 修改根级属性</button>
          <button @click="mutateNested">⚠️ 修改深层属性</button>
        </div>
        <div class="log-area" v-if="shallowLog.length">
          <p v-for="(log, i) in shallowLog" :key="i" class="log-item">{{ log }}</p>
        </div>
        <p class="tip">shallowReactive 的根级属性是响应式的，但嵌套对象内部的变更不会触发视图更新</p>
      </div>
    </div>

    <div class="section">
      <h2>� 知识要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>ref()</strong>
          <span>适用于所有类型，基本类型推荐，通过 .value 读写</span>
        </div>
        <div class="point">
          <strong>reactive()</strong>
          <span>用于对象/数组，直接访问属性，解构需 toRefs</span>
        </div>
        <div class="point">
          <strong>toRef/toRefs</strong>
          <span>将 reactive 属性转为 ref，解构保持响应性</span>
        </div>
        <div class="point">
          <strong>shallowRef</strong>
          <span>浅层 ref，只有 .value 替换才触发更新，配合 triggerRef</span>
        </div>
        <div class="point">
          <strong>shallowReactive</strong>
          <span>浅层 reactive，只有根级属性响应式</span>
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
