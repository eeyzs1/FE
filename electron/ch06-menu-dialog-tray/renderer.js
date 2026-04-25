// ============================================================
// 第6章 渲染进程脚本
// ============================================================

const api = window.electronAPI

api.onMenuAction((action) => {
  const log = document.getElementById('menu-log')
  const div = document.createElement('div')
  div.className = 'menu-item'
  div.innerHTML = `菜单操作: <span class="menu-action">${action}</span> (时间: ${new Date().toLocaleTimeString()})`
  log.prepend(div)
})

document.getElementById('btn-open-dialog').addEventListener('click', async () => {
  const output = document.getElementById('open-dialog-output')
  const result = await api.showOpenDialog()
  if (result.canceled) {
    output.textContent = '用户取消了选择'
  } else {
    output.textContent = `选择的文件:\n${result.filePaths.join('\n')}`
  }
})

document.getElementById('btn-save-dialog').addEventListener('click', async () => {
  const output = document.getElementById('save-dialog-output')
  const result = await api.showSaveDialog()
  if (result.canceled) {
    output.textContent = '用户取消了保存'
  } else {
    output.textContent = `保存路径:\n${result.filePath}`
  }
})

document.getElementById('btn-msg-info').addEventListener('click', () => showMsgBox('info'))
document.getElementById('btn-msg-warning').addEventListener('click', () => showMsgBox('warning'))
document.getElementById('btn-msg-error').addEventListener('click', () => showMsgBox('error'))
document.getElementById('btn-msg-question').addEventListener('click', () => showMsgBox('question'))

async function showMsgBox(type) {
  const output = document.getElementById('msg-dialog-output')
  const result = await api.showMessageBox(type)
  output.textContent = `对话框类型: ${type}\n点击了按钮索引: ${result.response}\n复选框状态: ${result.checkboxChecked}`
}

document.getElementById('btn-notification').addEventListener('click', async () => {
  const output = document.getElementById('notification-output')
  const result = await api.sendNotification({
    title: 'Electron 教程通知',
    body: '这是来自第6章的系统通知！',
    icon: undefined,
  })
  output.textContent = result.supported
    ? '✅ 通知已发送（查看系统通知中心）'
    : '❌ 当前系统不支持通知'
})
