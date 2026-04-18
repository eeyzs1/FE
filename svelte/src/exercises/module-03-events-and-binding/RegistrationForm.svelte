<script lang="ts">
  type FormData = {
    username: string
    email: string
    password: string
    confirmPassword: string
    age: number
    agreeTerms: boolean
    gender: string
    hobbies: string[]
  }

  let form = $state<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 18,
    agreeTerms: false,
    gender: '',
    hobbies: [],
  })

  let errors = $state<Record<string, string>>({})
  let submitted = $state(false)

  let passwordMismatch = $derived(
    form.password.length > 0 && form.confirmPassword.length > 0 && form.password !== form.confirmPassword
  )

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  let canSubmit = $derived(
    form.username.length >= 3 &&
    emailRegex.test(form.email) &&
    form.password.length >= 6 &&
    !passwordMismatch &&
    form.agreeTerms
  )

  function validate() {
    errors = {}
    if (form.username.length < 3) errors.username = '用户名至少3个字符'
    if (!emailRegex.test(form.email)) errors.email = '请输入有效的邮箱'
    if (form.password.length < 6) errors.password = '密码至少6个字符'
    if (passwordMismatch) errors.confirmPassword = '两次密码不一致'
    if (!form.agreeTerms) errors.agreeTerms = '请同意条款'
    return Object.keys(errors).length === 0
  }

  function handleSubmit() {
    if (validate()) {
      submitted = true
    }
  }

  function reset() {
    form = { username: '', email: '', password: '', confirmPassword: '', age: 18, agreeTerms: false, gender: '', hobbies: [] }
    errors = {}
    submitted = false
  }

  const allHobbies = ['阅读', '编程', '运动', '音乐', '旅行', '烹饪']
</script>

<div class="form-app">
  <h2>用户注册</h2>

  {#if submitted}
    <div class="success">
      <h3>注册成功！</h3>
      <p>用户名: {form.username}</p>
      <p>邮箱: {form.email}</p>
      <p>年龄: {form.age}</p>
      <p>性别: {form.gender || '未选择'}</p>
      <p>爱好: {form.hobbies.join(', ') || '无'}</p>
      <button onclick={reset}>重新填写</button>
    </div>
  {:else}
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit() }}>
      <div class="field">
        <label for="username">用户名</label>
        <input id="username" type="text" bind:value={form.username} placeholder="至少3个字符" />
        {#if errors.username}<span class="error">{errors.username}</span>{/if}
      </div>

      <div class="field">
        <label for="email">邮箱</label>
        <input id="email" type="email" bind:value={form.email} placeholder="your@email.com" />
        {#if errors.email}<span class="error">{errors.email}</span>{/if}
      </div>

      <div class="field">
        <label for="password">密码</label>
        <input id="password" type="password" bind:value={form.password} placeholder="至少6个字符" />
        {#if errors.password}<span class="error">{errors.password}</span>{/if}
      </div>

      <div class="field">
        <label for="confirm-password">确认密码</label>
        <input id="confirm-password" type="password" bind:value={form.confirmPassword} />
        {#if passwordMismatch}<span class="error">密码不一致</span>{/if}
        {#if errors.confirmPassword}<span class="error">{errors.confirmPassword}</span>{/if}
      </div>

      <div class="field">
        <label for="age">年龄: {form.age}</label>
        <input id="age" type="range" bind:value={form.age} min="1" max="120" />
      </div>

      <div class="field">
        <span id="gender-label">性别</span>
        <div class="radio-group" role="radiogroup" aria-labelledby="gender-label">
          <label><input type="radio" bind:group={form.gender} value="male" /> 男</label>
          <label><input type="radio" bind:group={form.gender} value="female" /> 女</label>
          <label><input type="radio" bind:group={form.gender} value="other" /> 其他</label>
        </div>
      </div>

      <div class="field">
        <span id="hobby-label">爱好</span>
        <div class="checkbox-group" role="group" aria-labelledby="hobby-label">
          {#each allHobbies as hobby}
            <label>
              <input type="checkbox" bind:group={form.hobbies} value={hobby} />
              {hobby}
            </label>
          {/each}
        </div>
      </div>

      <div class="field">
        <label>
          <input type="checkbox" bind:checked={form.agreeTerms} />
          我同意服务条款
        </label>
        {#if errors.agreeTerms}<span class="error">{errors.agreeTerms}</span>{/if}
      </div>

      <button type="submit" disabled={!canSubmit}>注册</button>
    </form>
  {/if}
</div>

<style>
  .form-app {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .field {
    margin-bottom: 14px;
  }

  label {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .radio-group,
  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .radio-group label,
  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

  .error { color: #e74c3c; font-size: 12px; display: block; margin-top: 2px; }

  .success {
    background: rgba(39, 174, 96, 0.1);
    padding: 16px;
    border-radius: 6px;
  }

  button[type="submit"] {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background: var(--accent, #aa3bff);
    color: white;
    cursor: pointer;
    font-size: 16px;
  }

  button[type="submit"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
