// ============================================================
// 第7章 渲染进程脚本
// ============================================================

const api = window.electronAPI

async function refreshSecurityCheck() {
  const config = await api.getSecurityConfig()
  const container = document.getElementById('security-check')

  const checks = [
    { key: 'contextIsolation', value: config.contextIsolation, label: '上下文隔离', critical: true },
    { key: 'nodeIntegration', value: !config.nodeIntegration, label: 'Node.js 集成已禁用', critical: true },
    { key: 'sandbox', value: config.sandbox, label: '沙箱已启用', critical: true },
    { key: 'webSecurity', value: config.webSecurity, label: 'Web 安全已启用', critical: false },
    { key: 'allowRunningInsecureContent', value: !config.allowRunningInsecureContent, label: '不允许不安全内容', critical: false },
  ]

  container.innerHTML = checks
    .map((check) => {
      const statusClass = check.value ? 'safe' : 'danger'
      const valueClass = check.value ? 'good' : 'bad'
      const valueText = check.value ? '✅ 安全' : '❌ 危险'
      return `<div class="security-item">
        <div class="status ${statusClass}"></div>
        <span class="config-key">${check.label}</span>
        <span class="config-value ${valueClass}">${valueText}</span>
      </div>`
    })
    .join('')
}

document.getElementById('btn-check').addEventListener('click', refreshSecurityCheck)

document.getElementById('btn-validate').addEventListener('click', async () => {
  const input = document.getElementById('path-input').value
  const result = await api.testInputValidation(input)
  const output = document.getElementById('validation-output')
  if (result.valid) {
    output.textContent = `✅ 验证通过\n解析路径: ${result.path}`
  } else {
    output.textContent = `❌ 验证失败: ${result.error}`
  }
})

window.testPath = async function (input) {
  document.getElementById('path-input').value = String(input)
  const result = await api.testInputValidation(input)
  const output = document.getElementById('validation-output')
  if (result.valid) {
    output.textContent = `✅ 验证通过\n解析路径: ${result.path}`
  } else {
    output.textContent = `❌ 验证失败: ${result.error}`
  }
}

async function loadCSPInfo() {
  const info = await api.getCSPInfo()
  const container = document.getElementById('csp-info')
  container.innerHTML = `
    <p>${info.description}</p>
    <p><strong>示例:</strong></p>
    <div class="csp-item">${info.example}</div>
    <p style="margin-top:10px"><strong>推荐策略:</strong></p>
    ${info.recommendations.map((r) => `<div class="csp-item">${r}</div>`).join('')}
  `
}

refreshSecurityCheck()
loadCSPInfo()
