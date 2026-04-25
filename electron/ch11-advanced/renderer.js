// ============================================================
// 第11章 渲染进程脚本
// ============================================================

const api = window.electronAPI

document.getElementById('btn-compute-light').addEventListener('click', () => runComputation(1000000))
document.getElementById('btn-compute-heavy').addEventListener('click', () => runComputation(10000000))

async function runComputation(iterations) {
  const output = document.getElementById('compute-output')
  output.textContent = `计算中... (${iterations} 次迭代)\n注意：UI 不会被阻塞！`
  const startTime = Date.now()
  const result = await api.heavyComputation({ iterations })
  const totalTime = Date.now() - startTime
  output.textContent = `✅ 计算完成!\n迭代次数: ${result.iterations.toLocaleString()}\nWorker 耗时: ${result.duration}ms\n总耗时: ${totalTime}ms\n结果: ${result.result.toFixed(4)}`
}

async function refreshTheme() {
  const theme = await api.getTheme()
  document.getElementById('theme-output').textContent =
    `当前主题: ${theme.themeSource}\n暗色模式: ${theme.shouldUseDarkColors ? '是' : '否'}`
  document.querySelectorAll('.theme-btn').forEach((btn) => btn.classList.remove('active'))
  const activeBtn = document.getElementById(`btn-${theme.themeSource}`)
  if (activeBtn) activeBtn.classList.add('active')
}

document.getElementById('btn-dark').addEventListener('click', async () => {
  await api.setTheme('dark')
  refreshTheme()
})
document.getElementById('btn-light').addEventListener('click', async () => {
  await api.setTheme('light')
  refreshTheme()
})
document.getElementById('btn-system').addEventListener('click', async () => {
  await api.setTheme('system')
  refreshTheme()
})

api.onThemeChanged(() => refreshTheme())

document.getElementById('btn-power').addEventListener('click', async () => {
  const state = await api.getPowerState()
  const log = document.getElementById('power-log')
  const div = document.createElement('div')
  div.className = 'event-item'
  div.textContent = `当前状态: ${state.onBatteryPower ? '🔋 电池供电' : '🔌 交流电源'}`
  log.prepend(div)
})

api.onPowerEvent((data) => {
  const log = document.getElementById('power-log')
  const div = document.createElement('div')
  div.className = 'event-item'
  div.innerHTML = `<span class="event-type">${data.type}</span> — ${new Date().toLocaleTimeString()}`
  log.prepend(div)
})

document.getElementById('btn-screen').addEventListener('click', async () => {
  const info = await api.getScreenInfo()
  document.getElementById('screen-output').textContent =
    `主显示器:\n  分辨率: ${info.primary.size.width}x${info.primary.size.height}\n  工作区: ${info.primary.workArea.width}x${info.primary.workArea.height}\n  缩放: ${info.primary.scaleFactor}x\n  旋转: ${info.primary.rotation}°\n\n显示器数量: ${info.displayCount}\n光标位置: (${info.cursorPosition.x}, ${info.cursorPosition.y})`
})

// --------------------------------------------------
// 全局快捷键
// --------------------------------------------------
document.getElementById('btn-register-shortcut').addEventListener('click', async () => {
  const accelerator = document.getElementById('shortcut-input').value.trim()
  const output = document.getElementById('shortcut-output')
  if (!accelerator) {
    output.textContent = '请输入快捷键，例如: CommandOrControl+Shift+L'
    return
  }
  const result = await api.registerShortcut(accelerator, 'demo-action')
  if (result.success) {
    output.textContent = `✅ 已注册全局快捷键: ${result.accelerator}\n现在即使应用不在焦点，按此快捷键也会触发！`
  } else {
    output.textContent = `❌ 注册失败: ${result.error || '快捷键可能已被占用'}`
  }
})

document.getElementById('btn-unregister-shortcut').addEventListener('click', async () => {
  const accelerator = document.getElementById('shortcut-input').value.trim()
  const output = document.getElementById('shortcut-output')
  if (!accelerator) return
  await api.unregisterShortcut(accelerator)
  output.textContent = `✅ 已注销快捷键: ${accelerator}`
})

api.onShortcutTriggered((data) => {
  const output = document.getElementById('shortcut-output')
  output.textContent = `🔔 快捷键触发: ${data.accelerator}\n动作: ${data.action}\n时间: ${new Date().toLocaleTimeString()}`
})

// --------------------------------------------------
// 多窗口通信
// --------------------------------------------------
document.getElementById('btn-open-window').addEventListener('click', async () => {
  const result = await api.openSecondWindow()
  const output = document.getElementById('window-output')
  output.textContent = result.existed ? '第二窗口已存在，已聚焦' : '✅ 已打开第二窗口'
})

document.getElementById('btn-send-message').addEventListener('click', async () => {
  const message = document.getElementById('window-message').value || '你好，第二窗口！'
  const result = await api.sendToSecondWindow(message)
  const output = document.getElementById('window-output')
  output.textContent = result.success
    ? `✅ 已发送: "${message}"`
    : `❌ 发送失败: ${result.error}`
})

// --------------------------------------------------
// 文件拖放
// --------------------------------------------------
document.getElementById('btn-drag-drop').addEventListener('click', async () => {
  const info = await api.getDragDropInfo()
  const output = document.getElementById('drag-drop-output')
  output.textContent = `${info.description}\n\n示例代码:\n${info.example}`
})

const dropZone = document.getElementById('drop-zone')
if (dropZone) {
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('drag-over')
  })
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over')
  })
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropZone.classList.remove('drag-over')
    const files = Array.from(e.dataTransfer.files)
    const output = document.getElementById('drag-drop-output')
    if (files.length > 0) {
      output.textContent = files.map((f) => `📄 ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join('\n')
    } else {
      output.textContent = '没有拖入文件'
    }
  })
}

refreshTheme()
