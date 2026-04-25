const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getAppMetrics: () => ipcRenderer.invoke('get-app-metrics'),
  getProcessMemory: () => ipcRenderer.invoke('get-process-memory'),
  getGPUFeatureStatus: () => ipcRenderer.invoke('get-gpu-feature-status'),
  openDevTools: () => ipcRenderer.invoke('open-devtools'),
  takeHeapSnapshot: () => ipcRenderer.invoke('take-heap-snapshot'),
})
