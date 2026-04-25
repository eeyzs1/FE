const { contextBridge, ipcRenderer } = require('electron')

// ============================================================
// 第4章 Preload 脚本 - 窗口操作 API
// ============================================================

contextBridge.exposeInMainWorld('electronAPI', {
  createChildWindow: (options) => ipcRenderer.invoke('create-child-window', options),
  createFramelessWindow: () => ipcRenderer.invoke('create-frameless-window'),
  createModalWindow: () => ipcRenderer.invoke('create-modal-window'),
  createTransparentWindow: () => ipcRenderer.invoke('create-transparent-window'),
  getWindowInfo: () => ipcRenderer.invoke('get-window-info'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  setAlwaysOnTop: (flag) => ipcRenderer.invoke('set-always-on-top', flag),
  setWindowSize: (width, height) => ipcRenderer.invoke('set-window-size', width, height),
  onWindowEvent: (eventName, callback) => {
    ipcRenderer.on(`window-event-${eventName}`, (_event, data) => callback(data))
  },
})
