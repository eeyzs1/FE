const { app, BrowserWindow, ipcMain, autoUpdater } = require('electron')
const path = require('node:path')

// ============================================================
// 第9章：打包与分发
// ============================================================
//
// 【核心概念】
// 1. Electron Forge — 官方推荐的打包工具
//    - 集成打包、分发、自动更新
//    - 支持多种 Maker（Windows: Squirrel, MSI; macOS: DMG, zip; Linux: AppImage, deb）
//    - 支持多种 Publisher（GitHub, S3, etc.）
//
// 2. 打包流程
//    - 开发完成 → 配置 forge.config.js → 运行 make → 生成安装包
//    - 命令: electron-forge make
//    - 命令: electron-forge package (仅打包，不生成安装包)
//
// 3. 自动更新 (autoUpdater)
//    - 基于 electron-updater 或 Forge 内置更新器
//    - 检查更新 → 下载 → 安装
//    - 需要配置更新服务器
//
// 4. 代码签名
//    - Windows: 代码签名证书
//    - macOS: Apple Developer 证书
//    - 防止 SmartScreen 警告
//
// 5. 关键配置
//    - package.json 中的 author, description, main
//    - forge.config.js 中的 packagerConfig, makers
//    - .ico / .icns 图标文件
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch09
//
// 【打包命令参考】
// pnpm add -D @electron-forge/cli
// pnpm exec electron-forge import
// pnpm exec electron-forge make
// ============================================================

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第9章：打包与分发',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')
}

ipcMain.handle('get-packaging-info', () => {
  return {
    isPackaged: app.isPackaged,
    appPath: app.getAppPath(),
    exePath: app.getPath('exe'),
    name: app.getName(),
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
  }
})

// --------------------------------------------------
// 自动更新示例
// --------------------------------------------------
ipcMain.handle('check-for-updates', () => {
  if (!app.isPackaged) {
    return {
      supported: true,
      message: '自动更新仅在打包后的应用中可用。开发模式下无法检查更新。',
      tip: '打包发布后，应用会自动检查并下载更新。',
    }
  }

  try {
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()
    return { supported: true, message: '正在检查更新...' }
  } catch (error) {
    return { supported: false, error: error.message }
  }
})

autoUpdater.on('update-available', (info) => {
  mainWindow?.webContents.send('update-status', {
    status: 'available',
    version: info.version,
  })
})

autoUpdater.on('update-not-available', () => {
  mainWindow?.webContents.send('update-status', {
    status: 'not-available',
  })
})

autoUpdater.on('download-progress', (progress) => {
  mainWindow?.webContents.send('update-status', {
    status: 'downloading',
    percent: progress.percent,
  })
})

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('update-status', {
    status: 'downloaded',
  })
})

autoUpdater.on('error', (error) => {
  mainWindow?.webContents.send('update-status', {
    status: 'error',
    error: error.message,
  })
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
