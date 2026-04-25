const { app, BrowserWindow, ipcMain, shell, clipboard } = require('electron')
const path = require('node:path')
const os = require('node:os')

// ============================================================
// 第5章：应用生命周期与系统交互
// ============================================================
//
// 【核心概念】
// 1. app 模块控制整个应用的生命周期
//    - ready: 应用初始化完成
//    - window-all-closed: 所有窗口关闭
//    - before-quit: 应用即将退出
//    - will-quit: 应用将退出
//    - activate (macOS): 应用被激活
//
// 2. 单实例锁 (Single Instance Lock)
//    - 确保应用只运行一个实例
//    - 第二个实例启动时激活已有实例
//
// 3. 系统路径
//    - app.getPath('userData'): 用户数据目录
//    - app.getPath('documents'): 文档目录
//    - app.getPath('downloads'): 下载目录
//    - app.getPath('desktop'): 桌面目录
//
// 4. 系统交互
//    - shell.openExternal(): 用默认程序打开URL
//    - shell.openPath(): 用默认程序打开文件
//    - clipboard: 剪贴板操作
//    - app.showAboutPanel(): 显示关于面板
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch05
// ============================================================

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第5章：应用生命周期与系统交互',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')
}

app.on('ready', () => {
  console.log('[生命周期] app.ready - 应用初始化完成')
  createWindow()
})

app.on('window-all-closed', () => {
  console.log('[生命周期] window-all-closed - 所有窗口已关闭')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  console.log('[生命周期] before-quit - 应用即将退出')
})

app.on('will-quit', () => {
  console.log('[生命周期] will-quit - 应用将退出')
})

app.on('activate', () => {
  console.log('[生命周期] activate - 应用被激活')
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// --------------------------------------------------
// IPC 处理
// --------------------------------------------------

ipcMain.handle('get-app-info', () => {
  return {
    name: app.getName(),
    version: app.getVersion(),
    isPackaged: app.isPackaged,
    locale: app.getLocale(),
    path: {
      home: app.getPath('home'),
      appData: app.getPath('appData'),
      userData: app.getPath('userData'),
      documents: app.getPath('documents'),
      downloads: app.getPath('downloads'),
      desktop: app.getPath('desktop'),
      temp: app.getPath('temp'),
      exe: app.getPath('exe'),
    },
  }
})

ipcMain.handle('get-lifecycle-events', () => {
  return {
    isReady: app.isReady(),
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node,
  }
})

ipcMain.handle('open-external', async (_event, url) => {
  try {
    const parsedUrl = new URL(url)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { success: false, error: '只允许打开 http:// 和 https:// 链接' }
    }
    await shell.openExternal(url)
    return { success: true }
  } catch {
    return { success: false, error: '无效的 URL' }
  }
})

ipcMain.handle('open-path', async (_event, p) => {
  const result = await shell.openPath(p)
  return { success: result === '', error: result || null }
})

ipcMain.handle('clipboard-read', () => {
  return {
    text: clipboard.readText(),
    html: clipboard.readHTML(),
    rtf: clipboard.readRTF(),
    bookmark: clipboard.readBookmark(),
  }
})

ipcMain.handle('clipboard-write', (_event, text) => {
  clipboard.writeText(text)
  return { success: true }
})

ipcMain.handle('show-about-panel', () => {
  app.showAboutPanel()
})

ipcMain.handle('get-gpu-info', async () => {
  return await app.getGPUInfo('complete')
})

ipcMain.handle('relaunch-app', () => {
  app.relaunch()
  app.exit(0)
})
