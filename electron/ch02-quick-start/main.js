const { app, BrowserWindow } = require('electron')
const path = require('node:path')

// ============================================================
// 第2章：快速入门 - 第一个 Electron 应用
// ============================================================
//
// 【核心概念】
// 1. Electron 应用的入口是主进程（Main Process）
// 2. 主进程通过 app 模块控制应用生命周期
// 3. 主进程通过 BrowserWindow 创建窗口，每个窗口对应一个渲染进程
// 4. app.whenReady() 等待 Electron 初始化完成
// 5. 窗口通过 loadFile() 加载本地 HTML 文件
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch02
// ============================================================

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: '我的第一个 Electron 应用',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
