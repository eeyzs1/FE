// ============================================================
// 渲染进程脚本 - 运行在浏览器环境中
// ============================================================
//
// 【核心概念】
// 1. 渲染进程的代码就像普通的网页 JavaScript
// 2. 通过 window.electronAPI 访问 Preload 暴露的 API
// 3. 渲染进程无法直接使用 require() 或 Node.js API
// 4. 所有与主进程的通信必须通过 IPC
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  const api = window.electronAPI

  if (api) {
    document.getElementById('platform').textContent = api.platform
    document.getElementById('node-version').textContent = api.versions.node
    document.getElementById('chrome-version').textContent = api.versions.chrome
    document.getElementById('electron-version').textContent = api.versions.electron
  }
})
