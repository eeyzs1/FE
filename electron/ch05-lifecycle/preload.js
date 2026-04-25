const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  getLifecycleEvents: () => ipcRenderer.invoke('get-lifecycle-events'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  openPath: (p) => ipcRenderer.invoke('open-path', p),
  clipboardRead: () => ipcRenderer.invoke('clipboard-read'),
  clipboardWrite: (text) => ipcRenderer.invoke('clipboard-write', text),
  showAboutPanel: () => ipcRenderer.invoke('show-about-panel'),
  getGPUInfo: () => ipcRenderer.invoke('get-gpu-info'),
  relaunchApp: () => ipcRenderer.invoke('relaunch-app'),
})
