<script setup lang="ts">
import { ref, computed } from 'vue'
import DemoBox from '../components/DemoBox.vue'

// ==================== 第5课：表单绑定与 v-model ====================
//
// v-model 是 Vue 表单的核心，实现双向绑定
// 本质是 :value + @input 的语法糖
//
// 不同表单元素的 v-model：
// - <input>    → value + input
// - <textarea> → value + input
// - <select>   → value + change
// - <checkbox> → checked + change
// - <radio>    → checked + change
//
// v-model 修饰符：
// .lazy  → 改用 change 事件（而非 input）
// .number → 自动转为数字
// .trim  → 自动去除首尾空格
//
// ⚠️ 常见错误：
// - v-model 绑定 null 给 select：应绑定空字符串 ''
// - 多个 checkbox 不绑定数组：v-model 应指向 string[]
// - 忘记 .number 修饰符：输入框值始终是字符串
//
// 💡 最佳实践：
// - 简单表单用 computed 验证，复杂表单用 VeeValidate
// - select 的 disabled option 用 value=""
// - 自定义组件 v-model 用 defineModel（Vue 3.4+）

// --- 文本输入 ---
const username = ref('')
const bio = ref('')

// --- 复选框 ---
const agreed = ref(false)
const skills = ref<string[]>([])
const allSkills = ['JavaScript', 'TypeScript', 'Vue', 'React', 'Node.js', 'Python']

const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜']
const selectedFruits = ref<string[]>([])

// --- 单选框 ---
const gender = ref('')
const genders = ['男', '女', '其他']

// --- 下拉选择 ---
const framework = ref('')
const frameworks = ['Vue', 'React', 'Angular', 'Svelte', 'Solid']

// --- 多选 ---
const selectedColors = ref<string[]>([])
const colors = [
  { label: '红色', value: 'red' },
  { label: '蓝色', value: 'blue' },
  { label: '绿色', value: 'green' },
  { label: '黄色', value: 'yellow' },
]

// --- 修饰符 ---
const ageInput = ref<string | number>('')
const rawAgeInput = ref('')
const lazyInput = ref('')
const lazyInputLazy = ref('')
const trimInput = ref('')
const rawTrimInput = ref('')

const ageNumber = computed(() => {
  const n = Number(ageInput.value)
  return isNaN(n) ? '无效数字' : n
})

// --- 表单验证 ---
const formName = ref('')
const formEmail = ref('')
const formAge = ref('')

const formNameError = computed(() => {
  if (!formName.value) return ''
  return formName.value.length < 2 ? '姓名至少2个字符' : ''
})

const formEmailError = computed(() => {
  if (!formEmail.value) return ''
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail.value) ? '' : '请输入有效的邮箱地址'
})

const formAgeError = computed(() => {
  if (!formAge.value) return ''
  const n = Number(formAge.value)
  if (isNaN(n)) return '请输入数字'
  return n < 1 || n > 150 ? '年龄应在1-150之间' : ''
})

const isFormValid = computed(() => {
  return formName.value && formEmail.value && formAge.value
    && !formNameError.value && !formEmailError.value && !formAgeError.value
})

function submitForm() {
  if (!isFormValid.value) return
  alert(`提交成功！\n姓名：${formName.value}\n邮箱：${formEmail.value}\n年龄：${formAge.value}`)
}

const codeCheckbox = `// 多个 checkbox 绑定同一个数组
const fruits = ['苹果', '香蕉', '橙子']
const selected = ref<string[]>([])

// 模板中：每个 checkbox 的 :value 不同，v-model 指向同一数组
// <input type="checkbox" :value="fruit" v-model="selected" />
// 勾选时 value 被 push 进数组，取消勾选时从数组中移除`

const codeFormValidation = `// 手动验证：computed + 条件渲染错误提示
const emailError = computed(() => {
  if (!email.value) return ''
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)
    ? '' : '请输入有效的邮箱地址'
})

// 验证库推荐：
// VeeValidate + yup — 功能最全
// Vuelidate — 轻量级`
</script>

<template>
  <div class="lesson">
    <h1>📖 第5课：表单绑定与 v-model</h1>
    <p class="desc">v-model 实现表单与数据的双向绑定，是 Vue 表单的核心</p>

    <div class="section">
      <h2>🔹 文本输入</h2>
      <div class="card">
        <label>用户名：<input v-model="username" placeholder="输入用户名" /></label>
        <label>简介：<textarea v-model="bio" placeholder="介绍一下自己" rows="3"></textarea></label>
        <p>用户名：<strong>{{ username || '（空）' }}</strong></p>
        <p>简介：{{ bio || '（空）' }}</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 复选框</h2>
      <div class="card">
        <label class="checkbox-label">
          <input type="checkbox" v-model="agreed" />
          我同意用户协议
        </label>
        <p>同意状态：{{ agreed ? '✅ 已同意' : '❌ 未同意' }}</p>

        <hr />
        <p>选择技能（多选）：</p>
        <div class="checkbox-group">
          <label v-for="skill in allSkills" :key="skill" class="checkbox-label">
            <input type="checkbox" :value="skill" v-model="skills" />
            {{ skill }}
          </label>
        </div>
        <p>已选：{{ skills.join('、') || '无' }}</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 多选框绑定数组（v-model + :value）</h2>
      <div class="card">
        <p>选择你喜欢的水果：</p>
        <div class="checkbox-group">
          <label v-for="fruit in fruits" :key="fruit" class="checkbox-label">
            <input type="checkbox" :value="fruit" v-model="selectedFruits" />
            {{ fruit }}
          </label>
        </div>
        <p>已选水果：{{ selectedFruits.join('、') || '无' }}</p>
        <DemoBox title="多个 checkbox 绑定同一个数组" :code="codeCheckbox">
          <p>选择你喜欢的水果：</p>
          <div class="checkbox-group">
            <label v-for="fruit in fruits" :key="fruit" class="checkbox-label">
              <input type="checkbox" :value="fruit" v-model="selectedFruits" />
              {{ fruit }}
            </label>
          </div>
          <p>已选水果：{{ selectedFruits.join('、') || '无' }}</p>
        </DemoBox>
        <p class="tip">当多个 checkbox 的 v-model 绑定同一个数组时，勾选会将 :value 的值加入数组，取消勾选会移除。这是 Vue 处理多选的惯用模式。</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 单选框</h2>
      <div class="card">
        <div class="radio-group">
          <label v-for="g in genders" :key="g" class="radio-label">
            <input type="radio" :value="g" v-model="gender" />
            {{ g }}
          </label>
        </div>
        <p>选择：{{ gender || '未选择' }}</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 下拉选择</h2>
      <div class="card">
        <select v-model="framework">
          <option disabled value="">请选择框架</option>
          <option v-for="fw in frameworks" :key="fw" :value="fw">{{ fw }}</option>
        </select>
        <p>选择：{{ framework || '未选择' }}</p>

        <hr />
        <p>多选颜色：</p>
        <select v-model="selectedColors" multiple>
          <option v-for="c in colors" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
        <p>已选：{{ selectedColors.join('、') || '无' }}</p>
      </div>
    </div>

    <div class="section">
      <h2>🔹 v-model 修饰符 — 实时对比</h2>
      <div class="card">
        <h3>.number — 自动转数字</h3>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>❌ 无修饰符（始终是字符串）</h4>
            <input v-model="rawAgeInput" placeholder="输入年龄" />
            <p>typeof = <strong>{{ typeof rawAgeInput }}</strong></p>
            <p>值 = "{{ rawAgeInput }}"</p>
            <p class="tip">输入 18 → typeof 仍是 string</p>
          </div>
          <div class="compare-col good">
            <h4>✅ .number（自动转数字）</h4>
            <input v-model.number="ageInput" placeholder="输入年龄" />
            <p>typeof = <strong>{{ typeof ageNumber }}</strong></p>
            <p>值 = {{ ageNumber }}</p>
            <p class="tip">输入 18 → typeof 为 number</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>.lazy — 失焦时才更新</h3>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>无修饰符（实时更新）</h4>
            <input v-model="lazyInput" placeholder="每次按键都更新" />
            <p>值：<strong>{{ lazyInput || '（空）' }}</strong></p>
            <p class="tip">每次按键都触发更新</p>
          </div>
          <div class="compare-col good">
            <h4>.lazy（失焦/回车时更新）</h4>
            <input v-model.lazy="lazyInputLazy" placeholder="失焦或回车时才更新" />
            <p>值：<strong>{{ lazyInputLazy || '（空）' }}</strong></p>
            <p class="tip">change 事件才触发，减少频繁更新</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>.trim — 自动去首尾空格</h3>
        <div class="compare-grid">
          <div class="compare-col bad">
            <h4>无修饰符（保留空格）</h4>
            <input v-model="rawTrimInput" placeholder="试试输入前后空格" />
            <p>值："{{ rawTrimInput }}"</p>
            <p>长度：<strong>{{ rawTrimInput.length }}</strong></p>
          </div>
          <div class="compare-col good">
            <h4>.trim（自动去空格）</h4>
            <input v-model.trim="trimInput" placeholder="试试输入前后空格" />
            <p>值："{{ trimInput }}"</p>
            <p>长度：<strong>{{ trimInput.length }}</strong></p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>� 表单验证</h2>
      <div class="card">
        <p>使用 computed 实现实时表单验证：</p>
        <div class="form-demo">
          <label>
            姓名：<input v-model="formName" placeholder="至少2个字符" />
            <span v-if="formNameError" class="error">{{ formNameError }}</span>
          </label>
          <label>
            邮箱：<input v-model="formEmail" placeholder="example@mail.com" />
            <span v-if="formEmailError" class="error">{{ formEmailError }}</span>
          </label>
          <label>
            年龄：<input v-model="formAge" placeholder="1-150" />
            <span v-if="formAgeError" class="error">{{ formAgeError }}</span>
          </label>
          <button @click="submitForm" :disabled="!isFormValid">✅ 提交</button>
        </div>
        <DemoBox title="computed 实现实时表单验证" :code="codeFormValidation">
          <div class="form-demo">
            <label>
              姓名：<input v-model="formName" placeholder="至少2个字符" />
              <span v-if="formNameError" class="error">{{ formNameError }}</span>
            </label>
            <label>
              邮箱：<input v-model="formEmail" placeholder="example@mail.com" />
              <span v-if="formEmailError" class="error">{{ formEmailError }}</span>
            </label>
            <label>
              年龄：<input v-model="formAge" placeholder="1-150" />
              <span v-if="formAgeError" class="error">{{ formAgeError }}</span>
            </label>
            <button @click="submitForm" :disabled="!isFormValid">✅ 提交</button>
          </div>
        </DemoBox>
        <p class="tip">简单表单用 computed 验证即可，复杂表单推荐 VeeValidate</p>
      </div>
    </div>

    <div class="section">
      <h2>� v-model 要点</h2>
      <div class="knowledge">
        <div class="point">
          <strong>本质</strong>
          <span>:value + @input 的语法糖</span>
        </div>
        <div class="point">
          <strong>.lazy</strong>
          <span>改用 change 事件，失焦/回车时才更新</span>
        </div>
        <div class="point">
          <strong>.number</strong>
          <span>自动将输入值转为数字类型</span>
        </div>
        <div class="point">
          <strong>.trim</strong>
          <span>自动去除输入值的首尾空白</span>
        </div>
        <div class="point">
          <strong>自定义组件</strong>
          <span>组件内 modelValue prop + update:modelValue emit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare-grid { display: flex; gap: 16px; margin-top: 8px; }
.compare-col { flex: 1; padding: 14px; border-radius: 8px; }
.compare-col.bad { background: #fff5f5; border: 2px solid #f4433633; }
.compare-col.good { background: #f0faf5; border: 2px solid #42b88333; }
.compare-col h4 { margin: 0 0 8px; font-size: 14px; }
label { display: block; margin: 8px 0; font-weight: 500; }
input[type="text"], textarea, select {
  width: 100%; padding: 8px 12px; border: 2px solid #e9ecef;
  border-radius: 8px; font-size: 14px; box-sizing: border-box;
  transition: border-color 0.2s; margin-top: 4px;
}
input:focus, textarea:focus, select:focus { outline: none; border-color: #42b883; }
select[multiple] { height: 100px; }
.checkbox-group { display: flex; flex-wrap: wrap; gap: 12px; }
.checkbox-label, .radio-label {
  display: inline-flex; align-items: center; gap: 4px;
  cursor: pointer; font-weight: normal;
}
.checkbox-label input, .radio-label input { width: auto; margin: 0; }
.radio-group { display: flex; gap: 16px; }
.form-demo { display: flex; flex-direction: column; gap: 8px; }
.form-demo label { position: relative; }
.error { color: #f44336; font-size: 12px; font-weight: normal; display: block; margin-top: 2px; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
