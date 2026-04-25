<script setup lang="ts">
import { ref, computed } from 'vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第4课：条件渲染与列表渲染 ====================
//
// 条件渲染：
// v-if / v-else-if / v-else — 条件性渲染（真正的 DOM 销毁/创建）
// v-show                    — 切换 display（DOM 保留，仅 CSS 切换）
//
// 列表渲染：
// v-for="(item, index) in list" :key="item.id"
// — 必须提供唯一的 key
// — 可以遍历数组、对象、数字范围
//
// ⚠️ 常见错误：
// - v-for 没有 :key：导致渲染异常和性能问题
// - 用 index 作 key：列表增删时导致状态错乱
// - v-for 和 v-if 同时用在同一元素：v-for 优先级更高
// - 在 v-for 中直接修改 item 而非替换数组
//
// 💡 最佳实践：
// - key 使用唯一且稳定的标识（如 id），不要用 index
// - v-for 和 v-if 同时需要时，用 <template v-for> + 内部 v-if
// - 过滤列表用 computed，不要在模板中 filter

// --- 条件渲染示例 ---
const score = ref(75)
const showSecret = ref(false)

// --- 列表渲染示例 ---
interface Student {
  id: number
  name: string
  score: number
  active: boolean
}

const students = ref<Student[]>([
  { id: 1, name: '张三', score: 92, active: true },
  { id: 2, name: '李四', score: 85, active: true },
  { id: 3, name: '王五', score: 58, active: false },
  { id: 4, name: '赵六', score: 73, active: true },
  { id: 5, name: '钱七', score: 96, active: true },
])

const filterType = ref<'all' | 'active' | 'high'>('all')

const filteredStudents = computed(() => {
  switch (filterType.value) {
    case 'active': return students.value.filter(s => s.active)
    case 'high': return students.value.filter(s => s.score >= 80)
    default: return students.value
  }
})

const newStudentName = ref('')
function addStudent() {
  if (!newStudentName.value.trim()) return
  students.value.push({
    id: Date.now(),
    name: newStudentName.value.trim(),
    score: Math.floor(Math.random() * 40 + 60),
    active: true
  })
  newStudentName.value = ''
}

// --- v-for 变体示例 ---
const userInfo = ref({
  name: '张三',
  age: 25,
  city: '北京',
  job: '前端工程师',
})

const rangeCount = ref(5)

// --- template v-for ---
const groups = ref([
  { title: '前端', members: ['Vue', 'React', 'Angular'] },
  { title: '后端', members: ['Node.js', 'Python', 'Go'] },
])

function removeStudent(id: number) {
  students.value = students.value.filter(s => s.id !== id)
}

const codeVForObj = `// v-for 遍历对象 — (value, key, index)
<div v-for="(value, key, index) in userInfo" :key="key">
  {{ index }}: {{ key }} = {{ value }}
</div>

// 三个参数的顺序：value → key → index
// 也可以只用 (value, key)`

const codeVForRange = `// v-for 遍历数字范围 — 从 1 开始
<span v-for="n in 5" :key="n">{{ n }}</span>
// 渲染：1 2 3 4 5

// 注意：n 从 1 开始，不是 0`

const codeTemplateVFor = `// <template v-for> 不会产生额外 DOM 节点
<template v-for="group in groups" :key="group.title">
  <h4>{{ group.title }}</h4>
  <span v-for="m in group.members" :key="m">{{ m }}</span>
</template>

// 对比：用 <div v-for> 会多一层 div 包裹
// <template> 是"透明"的，只渲染内部内容`
</script>

<template>
  <div class="lesson">
    <h1>📖 第4课：条件渲染与列表渲染</h1>
    <p class="desc">v-if 控制元素是否存在，v-for 遍历数据生成列表</p>

    <div class="section">
      <h2>🔹 v-if / v-else-if / v-else</h2>
      <div class="card">
        <p>分数：<input v-model.number="score" type="range" min="0" max="100" /> {{ score }}</p>
        <p>等级：
          <span v-if="score >= 90" class="grade a">🅰️ A 优秀</span>
          <span v-else-if="score >= 80" class="grade b">🅱️ B 良好</span>
          <span v-else-if="score >= 60" class="grade c">🅲️ C 及格</span>
          <span v-else class="grade d">🅳️ D 不及格</span>
        </p>
        <p class="tip">v-if 是"真正的条件渲染"，会销毁和重建 DOM 元素</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-if vs v-show — 实时对比</h2>
      <div class="card">
        <label class="toggle"><input type="checkbox" v-model="showSecret" /> 切换显示</label>
        <div class="compare-grid">
          <div class="compare-col">
            <h4>v-if（销毁/创建 DOM）</h4>
            <p v-if="showSecret" class="secret">🎉 v-if 内容</p>
            <p v-else class="placeholder">（DOM 不存在）</p>
          </div>
          <div class="compare-col">
            <h4>v-show（CSS display 切换）</h4>
            <p v-show="showSecret" class="secret">🎉 v-show 内容</p>
            <p class="tip">打开 DevTools 可见：v-show 元素始终在 DOM 中，只是 display:none</p>
          </div>
        </div>
        <p class="tip">频繁切换用 v-show（只切换 CSS），条件很少变用 v-if（销毁/创建 DOM）</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-for — 列表渲染</h2>
      <div class="card">
        <div class="btn-group">
          <button @click="filterType = 'all'" :class="{ active: filterType === 'all' }">全部</button>
          <button @click="filterType = 'active'" :class="{ active: filterType === 'active' }">活跃</button>
          <button @click="filterType = 'high'" :class="{ active: filterType === 'high' }">高分(≥80)</button>
        </div>

        <div class="student-list">
          <div v-for="student in filteredStudents" :key="student.id" class="student-item">
            <span :class="{ inactive: !student.active }">{{ student.name }}</span>
            <span class="score">{{ student.score }}分</span>
            <button class="del-btn" @click="removeStudent(student.id)">✕</button>
          </div>
        </div>

        <div class="add-form">
          <input v-model="newStudentName" placeholder="输入学生姓名" @keyup.enter="addStudent" />
          <button @click="addStudent">➕ 添加</button>
        </div>
        <p class="tip">v-for 必须绑定 :key，用唯一标识确保渲染正确性</p>
      </div>
    </div>

    <div class="section">
      <h2>� v-for 变体</h2>

      <div class="card">
        <h3>遍历对象 (value, key, index)</h3>
        <div class="obj-list">
          <div v-for="(value, key, index) in userInfo" :key="key" class="obj-item">
            <span class="idx">{{ index }}</span>
            <span class="key">{{ key }}</span>
            <span class="val">{{ value }}</span>
          </div>
        </div>
        <DemoBox title="v-for 遍历对象 — (value, key, index)" :code="codeVForObj">
          <div class="obj-list">
            <div v-for="(value, key, index) in userInfo" :key="key" class="obj-item">
              <span class="idx">{{ index }}</span>
              <span class="key">{{ key }}</span>
              <span class="val">{{ value }}</span>
            </div>
          </div>
        </DemoBox>
      </div>

      <div class="card">
        <h3>遍历数字范围 (n in count)</h3>
        <label>范围：<input type="number" v-model.number="rangeCount" min="1" max="20" /></label>
        <div class="range-dots">
          <span v-for="n in rangeCount" :key="n" class="dot">{{ n }}</span>
        </div>
        <DemoBox title="v-for 遍历数字范围 — 从 1 开始" :code="codeVForRange">
          <label>范围：<input type="number" v-model.number="rangeCount" min="1" max="20" /></label>
          <div class="range-dots">
            <span v-for="n in rangeCount" :key="n" class="dot">{{ n }}</span>
          </div>
        </DemoBox>
      </div>

      <div class="card">
        <h3>template v-for（无额外 DOM 节点）</h3>
        <div v-for="group in groups" :key="group.title" class="group-block">
          <h4>{{ group.title }}</h4>
          <div class="group-members">
            <span v-for="member in group.members" :key="member" class="tag">{{ member }}</span>
          </div>
        </div>
        <DemoBox title="template v-for — 无额外 DOM 节点" :code="codeTemplateVFor">
          <div v-for="group in groups" :key="group.title" class="group-block">
            <h4>{{ group.title }}</h4>
            <div class="group-members">
              <span v-for="member in group.members" :key="member" class="tag">{{ member }}</span>
            </div>
          </div>
        </DemoBox>
        <p class="tip">template v-for 适合需要渲染多个同级元素但不想加包裹 div 的场景</p>
      </div>
    </div>

    <div class="section">
      <h2>📝 知识要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>v-if</strong>
          <span>条件为 false 时 DOM 不存在，切换开销大</span>
        </div>
        <div class="point">
          <strong>v-show</strong>
          <span>DOM 始终存在，只切换 display，初始开销大</span>
        </div>
        <div class="point">
          <strong>选择标准</strong>
          <span>频繁切换用 v-show，条件很少变用 v-if</span>
        </div>
        <div class="point">
          <strong>v-for + key</strong>
          <span>key 必须唯一且稳定，不要用 index 作 key</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare-grid { display: flex; gap: 16px; margin-top: 8px; }
.compare-col { flex: 1; padding: 14px; border-radius: 8px; border: 1px solid #e9ecef; background: white; }
.compare-col h4 { margin: 0 0 8px; font-size: 14px; color: #42b883; }
.placeholder { color: #bbb; font-style: italic; }
.toggle { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-weight: 500; }
.toggle input { width: auto; }
button.active { background: #2d7a5a; }
.grade { font-weight: bold; font-size: 18px; }
.grade.a { color: #4caf50; }
.grade.b { color: #2196f3; }
.grade.c { color: #ff9800; }
.grade.d { color: #f44336; }
.secret {
  background: #fff3e0; padding: 12px; border-radius: 8px;
  margin-top: 12px; font-weight: bold; color: #e65100;
}
.student-list { margin: 12px 0; }
.student-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; background: white; border-radius: 8px;
  margin: 6px 0; border: 1px solid #e9ecef;
}
.inactive { color: #bbb; text-decoration: line-through; }
.score { color: #42b883; font-weight: bold; }
.del-btn {
  padding: 4px 8px; background: #f44336; font-size: 12px;
  border-radius: 6px;
}
.del-btn:hover { background: #d32f2f; }
.add-form { display: flex; gap: 8px; margin-top: 12px; }
.add-form input {
  flex: 1; padding: 8px 12px; border: 2px solid #e9ecef;
  border-radius: 8px; font-size: 14px;
}
.add-form input:focus { outline: none; border-color: #42b883; }
.obj-list { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
.obj-item {
  display: flex; gap: 12px; align-items: center;
  padding: 8px 14px; background: white; border-radius: 8px;
  border: 1px solid #e9ecef; font-size: 14px;
}
.obj-item .idx {
  width: 24px; height: 24px; border-radius: 50%;
  background: #42b883; color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: bold;
}
.obj-item .key { min-width: 50px; color: #666; font-family: monospace; }
.obj-item .val { font-weight: bold; color: #333; }
.range-dots { display: flex; gap: 8px; margin: 10px 0; flex-wrap: wrap; }
.dot {
  width: 36px; height: 36px; border-radius: 50%;
  background: #42b883; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; font-size: 14px;
}
.group-block { padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 8px; }
.group-block h4 { margin: 0 0 8px; color: #42b883; font-size: 15px; }
.group-members { display: flex; gap: 6px; flex-wrap: wrap; }
.tag {
  background: #42b883; color: white; padding: 3px 10px;
  border-radius: 12px; font-size: 12px;
}
</style>
