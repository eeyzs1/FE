const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  showMessageBox: (type) => ipcRenderer.invoke('show-message-box', type),
  showErrorBox: () => ipcRenderer.invoke('show-error-box'),
  sendNotification: (options) => ipcRenderer.invoke('send-notification', options),
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-action', (_event, action) => callback(action))
  },
})
