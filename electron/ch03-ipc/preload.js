const { contextBridge, ipcRenderer } = require('electron')

// ============================================================
// 第3章 Preload 脚本 - IPC 安全桥接
// ============================================================
//
// 【核心概念】
// 1. 绝对不要直接暴露整个 ipcRenderer 给渲染进程！
//    ❌ contextBridge.exposeInMainWorld('ipc', ipcRenderer)
//    这会让恶意代码可以发送任何 IPC 消息
//
// 2. 正确做法：只暴露必要的封装方法
//    ✅ 为每个 IPC 通道创建专门的函数
//
// 3. 注意：ipcRenderer.on 的 event 对象不应暴露给渲染进程
//    ❌ ipcRenderer.on(channel, callback)
//    ✅ ipcRenderer.on(channel, (_event, ...args) => callback(...args))
// ============================================================

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message),

  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),

  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),

  getDemoFilePath: () => ipcRenderer.invoke('get-demo-file-path'),

  startNotificationDemo: () => ipcRenderer.send('start-notification-demo'),
  onNotification: (callback) => {
    ipcRenderer.on('notification-from-main', (_event, data) => callback(data))
  },

  startLongTask: () => ipcRenderer.invoke('long-task'),
  onTaskProgress: (callback) => {
    ipcRenderer.on('task-progress', (_event, data) => callback(data))
  },
})
