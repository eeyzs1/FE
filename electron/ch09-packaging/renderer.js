// ============================================================
// 第9章 渲染进程脚本
// ============================================================

const api = window.electronAPI

document.getElementById('btn-info').addEventListener('click', async () => {
  const info = await api.getPackagingInfo()
  const container = document.getElementById('app-info')
  container.innerHTML = Object.entries(info)
    .map(([key, value]) => `<div class="info-item"><span class="info-key">${key}</span><br><span class="info-value">${value}</span></div>`)
    .join('')
})

document.getElementById('btn-check-update').addEventListener('click', async () => {
  const result = await api.checkForUpdates()
  const output = document.getElementById('update-output')
  output.textContent = result.message || JSON.stringify(result, null, 2)
  if (result.tip) {
    output.textContent += '\n\n💡 ' + result.tip
  }
})

api.onUpdateStatus((data) => {
  const output = document.getElementById('update-output')
  switch (data.status) {
    case 'available':
      output.textContent = `🆕 发现新版本: ${data.version}\n正在下载...`
      break
    case 'not-available':
      output.textContent = '✅ 已是最新版本'
      break
    case 'downloading':
      output.textContent = `📥 下载中: ${data.percent.toFixed(1)}%`
      break
    case 'downloaded':
      output.textContent = '✅ 更新已下载，重启应用后安装'
      break
    case 'error':
      output.textContent = `❌ 更新错误: ${data.error}`
      break
  }
})
