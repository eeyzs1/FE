const { contextBridge, ipcRenderer } = require('electron')

// ============================================================
// 第7章 Preload 脚本 - 安全 API 暴露示例
// ============================================================
//
// 【安全原则】
// 1. 只暴露必要的 API，不多不少
// 2. 不暴露 ipcRenderer 本身
// 3. 不暴露 event 对象
// 4. 对从渲染进程接收的数据进行验证
// ============================================================

contextBridge.exposeInMainWorld('electronAPI', {
  getSecurityConfig: () => ipcRenderer.invoke('get-security-config'),
  testInputValidation: (input) => ipcRenderer.invoke('test-input-validation', input),
  getCSPInfo: () => ipcRenderer.invoke('get-csp-info'),
})
