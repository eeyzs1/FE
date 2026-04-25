// ============================================================
// 第3章 渲染进程脚本 - IPC 通信演示
// ============================================================
//
// 【重要】渲染进程无法使用 require()！
// 所有需要 Node.js 的操作必须通过 IPC 让主进程执行。
// 文件路径等需要 Node.js 计算的值，也应通过 IPC 从主进程获取。
// ============================================================

const api = window.electronAPI

document.getElementById('btn-sysinfo').addEventListener('click', async () => {
  const output = document.getElementById('sysinfo-output')
  output.textContent = '正在获取系统信息...'
  const info = await api.getSystemInfo()
  output.innerHTML = Object.entries(info)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
})

document.getElementById('btn-send-msg').addEventListener('click', () => {
  const output = document.getElementById('send-msg-output')
  const messages = [
    '你好，主进程！',
    '这是一条来自渲染进程的消息',
    'Electron IPC 真棒！',
    '异步通信效率很高',
    '继续学习更多 IPC 模式吧',
  ]
  const msg = messages[Math.floor(Math.random() * messages.length)]
  api.sendMessage(msg)
  output.textContent = `✅ 已发送: "${msg}"\n(请查看主进程控制台)`
})

document.getElementById('btn-notification').addEventListener('click', () => {
  const area = document.getElementById('notification-area')
  area.innerHTML = ''
  api.startNotificationDemo()
})

api.onNotification((data) => {
  const area = document.getElementById('notification-area')
  const div = document.createElement('div')
  div.className = 'notification'
  div.textContent = `[${data.timestamp}] ${data.message}`
  area.appendChild(div)
})

document.getElementById('btn-long-task').addEventListener('click', async () => {
  const btn = document.getElementById('btn-long-task')
  const fill = document.getElementById('progress-fill')
  const output = document.getElementById('long-task-output')
  btn.disabled = true
  fill.style.width = '0%'
  output.textContent = '任务进行中...'

  api.startLongTask()
})

api.onTaskProgress((data) => {
  const fill = document.getElementById('progress-fill')
  const output = document.getElementById('long-task-output')
  fill.style.width = data.percent + '%'
  output.textContent = `进度: ${data.current}/${data.total} (${data.percent}%)`
})

// --------------------------------------------------
// 文件操作：通过 IPC 从主进程获取跨平台文件路径
// 渲染进程无法使用 require('path') 或 require('os')
// 所以必须通过 IPC 让主进程计算路径
// --------------------------------------------------
let DEMO_FILE_PATH = ''

async function initDemoFilePath() {
  DEMO_FILE_PATH = await api.getDemoFilePath()
}
initDemoFilePath()

document.getElementById('btn-write-file').addEventListener('click', async () => {
  const output = document.getElementById('file-output')
  const content = `Electron 教程测试文件\n创建时间: ${new Date().toLocaleString()}\n这是通过 IPC 让主进程写入的文件。`
  const result = await api.writeFile(DEMO_FILE_PATH, content)
  if (result.success) {
    output.textContent = `✅ 文件写入成功!\n路径: ${DEMO_FILE_PATH}`
  } else {
    output.textContent = `❌ 写入失败: ${result.error}`
  }
})

document.getElementById('btn-read-file').addEventListener('click', async () => {
  const output = document.getElementById('file-output')
  const result = await api.readFile(DEMO_FILE_PATH)
  if (result.success) {
    output.textContent = `✅ 文件读取成功!\n\n${result.content}`
  } else {
    output.textContent = `❌ 读取失败: ${result.error}\n(请先点击"写入测试文件")`
  }
})
