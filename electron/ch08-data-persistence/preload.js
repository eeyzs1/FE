const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  storeGet: (key) => ipcRenderer.invoke('store-get', key),
  storeSet: (key, value) => ipcRenderer.invoke('store-set', key, value),
  storeDelete: (key) => ipcRenderer.invoke('store-delete', key),
  storeGetAll: () => ipcRenderer.invoke('store-get-all'),
  fsReadDir: (dirPath) => ipcRenderer.invoke('fs-read-dir', dirPath),
  fsReadFile: (filePath) => ipcRenderer.invoke('fs-read-file', filePath),
  fsWriteFile: (filePath, content) => ipcRenderer.invoke('fs-write-file', filePath, content),
  fsStat: (filePath) => ipcRenderer.invoke('fs-stat', filePath),
  getDataPath: () => ipcRenderer.invoke('get-data-path'),
})
