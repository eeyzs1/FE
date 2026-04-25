// ============================================================
// 第4章 渲染进程脚本 - 窗口管理演示
// ============================================================

const api = window.electronAPI

async function refreshWindowInfo() {
  const info = await api.getWindowInfo()
  document.getElementById('w-width').textContent = info.width
  document.getElementById('w-height').textContent = info.height
  document.getElementById('w-x').textContent = info.x
  document.getElementById('w-y').textContent = info.y
  document.getElementById('w-maximized').textContent = info.isMaximized ? '是' : '否'
  document.getElementById('w-ontop').textContent = info.isAlwaysOnTop ? '是' : '否'
}

document.getElementById('btn-refresh-info').addEventListener('click', refreshWindowInfo)
document.getElementById('btn-minimize').addEventListener('click', () => api.minimizeWindow())
document.getElementById('btn-maximize').addEventListener('click', () => api.maximizeWindow())
document.getElementById('btn-ontop').addEventListener('click', async () => {
  const info = await api.getWindowInfo()
  await api.setAlwaysOnTop(!info.isAlwaysOnTop)
  refreshWindowInfo()
})

document.getElementById('btn-child').addEventListener('click', () => api.createChildWindow())
document.getElementById('btn-frameless').addEventListener('click', () => api.createFramelessWindow())
document.getElementById('btn-modal').addEventListener('click', () => api.createModalWindow())
document.getElementById('btn-transparent').addEventListener('click', () => api.createTransparentWindow())

const eventLog = document.getElementById('event-log')
function addEventLog(eventName, data) {
  const div = document.createElement('div')
  div.className = 'event-item'
  div.innerHTML = `<span class="event-name">${eventName}</span> ${JSON.stringify(data)}`
  eventLog.prepend(div)
}

api.onWindowEvent('resize', (data) => { addEventLog('resize', data); refreshWindowInfo() })
api.onWindowEvent('move', (data) => { addEventLog('move', data); refreshWindowInfo() })
api.onWindowEvent('maximize', () => { addEventLog('maximize', {}); refreshWindowInfo() })
api.onWindowEvent('unmaximize', () => { addEventLog('unmaximize', {}); refreshWindowInfo() })
api.onWindowEvent('focus', () => addEventLog('focus', {}))
api.onWindowEvent('blur', () => addEventLog('blur', {}))

refreshWindowInfo()
setInterval(refreshWindowInfo, 3000)
