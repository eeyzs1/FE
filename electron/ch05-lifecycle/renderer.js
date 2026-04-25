// ============================================================
// 第5章 渲染进程脚本
// ============================================================

const api = window.electronAPI

document.getElementById('btn-app-info').addEventListener('click', async () => {
  const info = await api.getAppInfo()
  const list = document.getElementById('path-list')
  list.innerHTML = `
    <div class="path-item"><span class="path-key">应用名称</span><br><span class="path-value">${info.name}</span></div>
    <div class="path-item"><span class="path-key">版本</span><br><span class="path-value">${info.version}</span></div>
    <div class="path-item"><span class="path-key">语言</span><br><span class="path-value">${info.locale}</span></div>
    <div class="path-item"><span class="path-key">是否打包</span><br><span class="path-value">${info.isPackaged}</span></div>
    <div class="path-item"><span class="path-key">Home</span><br><span class="path-value">${info.path.home}</span></div>
    <div class="path-item"><span class="path-key">AppData</span><br><span class="path-value">${info.path.appData}</span></div>
    <div class="path-item"><span class="path-key">UserData</span><br><span class="path-value">${info.path.userData}</span></div>
    <div class="path-item"><span class="path-key">Documents</span><br><span class="path-value">${info.path.documents}</span></div>
    <div class="path-item"><span class="path-key">Downloads</span><br><span class="path-value">${info.path.downloads}</span></div>
    <div class="path-item"><span class="path-key">Desktop</span><br><span class="path-value">${info.path.desktop}</span></div>
    <div class="path-item"><span class="path-key">Temp</span><br><span class="path-value">${info.path.temp}</span></div>
    <div class="path-item"><span class="path-key">Exe</span><br><span class="path-value">${info.path.exe}</span></div>
  `
})

document.getElementById('btn-open-url').addEventListener('click', async () => {
  await api.openExternal('https://www.electronjs.org')
})

document.getElementById('btn-open-desktop').addEventListener('click', async () => {
  const info = await api.getAppInfo()
  await api.openPath(info.path.desktop)
})

document.getElementById('btn-clipboard-write').addEventListener('click', async () => {
  const text = document.getElementById('clipboard-input').value
  if (text) {
    await api.clipboardWrite(text)
    document.getElementById('clipboard-output').textContent = `✅ 已复制: "${text}"`
  }
})

document.getElementById('btn-clipboard-read').addEventListener('click', async () => {
  const data = await api.clipboardRead()
  document.getElementById('clipboard-output').textContent =
    `文本: ${data.text || '(空)'}\nHTML: ${data.html ? '(有内容)' : '(空)'}\n书签: ${data.bookmark ? JSON.stringify(data.bookmark) : '(空)'}`
})

document.getElementById('btn-about').addEventListener('click', () => api.showAboutPanel())

document.getElementById('btn-gpu').addEventListener('click', async () => {
  const output = document.getElementById('gpu-output')
  output.textContent = '获取中...'
  try {
    const info = await api.getGPUInfo()
    output.textContent = JSON.stringify(info, null, 2).substring(0, 500) + '...'
  } catch (e) {
    output.textContent = `获取失败: ${e.message}`
  }
})

document.getElementById('btn-relaunch').addEventListener('click', () => {
  if (confirm('确定要重启应用吗？')) {
    api.relaunchApp()
  }
})
