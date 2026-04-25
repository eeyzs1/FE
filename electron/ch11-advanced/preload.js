const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  heavyComputation: (data) => ipcRenderer.invoke('heavy-computation', data),
  getTheme: () => ipcRenderer.invoke('get-theme'),
  setTheme: (theme) => ipcRenderer.invoke('set-theme', theme),
  onThemeChanged: (callback) => {
    ipcRenderer.on('theme-changed', (_event, data) => callback(data))
  },
  getPowerState: () => ipcRenderer.invoke('get-power-state'),
  onPowerEvent: (callback) => {
    ipcRenderer.on('power-event', (_event, data) => callback(data))
  },
  getScreenInfo: () => ipcRenderer.invoke('get-screen-info'),

  registerShortcut: (accelerator, action) => ipcRenderer.invoke('register-shortcut', accelerator, action),
  unregisterShortcut: (accelerator) => ipcRenderer.invoke('unregister-shortcut', accelerator),
  isShortcutRegistered: (accelerator) => ipcRenderer.invoke('is-shortcut-registered', accelerator),
  onShortcutTriggered: (callback) => {
    ipcRenderer.on('shortcut-triggered', (_event, data) => callback(data))
  },

  openSecondWindow: () => ipcRenderer.invoke('open-second-window'),
  sendToSecondWindow: (message) => ipcRenderer.invoke('send-to-second-window', message),

  getDragDropInfo: () => ipcRenderer.invoke('get-drag-drop-info'),
})
