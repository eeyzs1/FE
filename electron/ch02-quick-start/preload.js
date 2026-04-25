const { contextBridge } = require('electron')

// ============================================================
// Preload 脚本 - 安全桥接主进程与渲染进程
// ============================================================
//
// 【核心概念】
// 1. Preload 脚本在渲染进程的网页内容加载之前运行
// 2. 它可以访问 Node.js API（如 require），但渲染进程不能
// 3. contextBridge.exposeInMainWorld 安全地将 API 暴露给渲染进程
// 4. 这是 Electron 推荐的安全通信方式
//
// 【为什么需要 Preload？】
// - 渲染进程默认运行在沙箱中，无法直接使用 Node.js
// - 直接暴露整个 ipcRenderer 是不安全的
// - 通过 contextBridge 只暴露必要的 API
// ============================================================

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
})
