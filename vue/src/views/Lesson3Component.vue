<script setup lang="ts">
import { ref } from 'vue'
import ChildCard from '../components/ChildCard.vue'
import SlotDemo from '../components/SlotDemo.vue'

// ==================== 第3课：组件通信 ====================
//
// Vue 组件通信三大核心：
// 1. Props    — 父 → 子 传递数据（单向数据流）
// 2. Emit     — 子 → 父 发送事件
// 3. Slots    — 父 → 子 传递模板内容（内容分发）

const parentMessage = ref('来自父组件的问候！')
const childFeedback = ref('等待子组件回应...')
const scoreFromChild = ref(0)

function onChildRespond(msg: string) {
  childFeedback.value = msg
}

function onScoreChange(delta: number) {
  scoreFromChild.value += delta
}

// Slot 示例数据
const slotVariant = ref(1)
</script>

<template>
  <div class="lesson">
    <h1>📖 第3课：组件通信</h1>
    <p class="desc">Props 向下传数据，Emit 向上发事件，Slots 传递模板内容</p>

    <div class="section">
      <h2>🔹 Props — 父传子</h2>
      <div class="card">
        <p>父组件消息：<input v-model="parentMessage" /></p>
        <ChildCard
          :message="parentMessage"
          :score="scoreFromChild"
          @respond="onChildRespond"
          @change-score="onScoreChange"
        />
        <p>子组件反馈：<strong>{{ childFeedback }}</strong></p>
        <p class="tip">:message 是 v-bind:message 的缩写，将数据传给子组件</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Emit — 子传父</h2>
      <div class="card">
        <p>当前分数：<strong>{{ scoreFromChild }}</strong></p>
        <p class="tip">子组件通过 emit('change-score', delta) 通知父组件</p>
        <p class="tip">父组件用 @change-score="onScoreChange" 监听</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 Slots — 内容分发</h2>
      <div class="btn-group">
        <button @click="slotVariant = 1" :class="{ active: slotVariant === 1 }">默认插槽</button>
        <button @click="slotVariant = 2" :class="{ active: slotVariant === 2 }">具名插槽</button>
        <button @click="slotVariant = 3" :class="{ active: slotVariant === 3 }">作用域插槽</button>
      </div>

      <div class="card" v-if="slotVariant === 1">
        <SlotDemo>
          <p>✨ 这是通过默认插槽传入的内容</p>
        </SlotDemo>
        <p class="tip">子组件用 &lt;slot&gt;&lt;/slot&gt; 接收，父组件直接写内容</p>
      </div>

      <div class="card" v-if="slotVariant === 2">
        <SlotDemo>
          <template #header>
            <h3>🎯 这是头部内容</h3>
          </template>
          <template #footer>
            <p>📋 这是底部内容</p>
          </template>
        </SlotDemo>
        <p class="tip">用 #name（v-slot:name 的缩写）指定具名插槽</p>
      </div>

      <div class="card" v-if="slotVariant === 3">
        <SlotDemo>
          <template #default="{ items: slotItems }">
            <div v-for="(item, index) in slotItems" :key="item" class="tag">
              第{{ index + 1 }}项：{{ item }}
            </div>
          </template>
        </SlotDemo>
        <p class="tip">子组件通过 :items="data" 传数据给插槽，父组件用解构接收</p>
        <p class="tip">也可以不解构：#default="slotProps"，然后用 slotProps.items 访问</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 通信方式总结</h2>
      <div class="knowledge">
        <div class="point">
          <strong>Props</strong>
          <span>父→子，单向数据流，子组件不能修改</span>
        </div>
        <div class="point">
          <strong>Emit</strong>
          <span>子→父，触发事件，携带数据</span>
        </div>
        <div class="point">
          <strong>Slots</strong>
          <span>父→子，传递模板/内容，最灵活</span>
        </div>
        <div class="point">
          <strong>provide/inject</strong>
          <span>跨层级传递，祖先→后代（进阶）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.active { background: #2d7a5a; }
</style>
