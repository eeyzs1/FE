const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const Store = require('./store')

// ============================================================
// 第8章：数据持久化与文件系统
// ============================================================
//
// 【核心概念】
// 1. Electron 中的数据持久化方式
//    - localStorage / sessionStorage (渲染进程)
//    - IndexedDB (渲染进程)
//    - 文件系统 (主进程，通过 IPC)
//    - electron-store 等第三方库
//
// 2. 应用数据目录
//    - app.getPath('userData') — 存储应用配置
//    - app.getPath('documents') — 用户文档
//    - app.getPath('downloads') — 下载文件
//
// 3. 文件操作
//    - fs.readFileSync / fs.writeFileSync
//    - fs.readdir / fs.mkdir / fs.stat
//    - 路径处理: path.join / path.resolve / path.dirname
//
// 4. 简易 Store 类
//    - 基于 JSON 文件的键值存储
//    - 自动读写 userData 目录
//    - 支持默认值
//
// 【安全原则】
// ★ 文件操作必须验证路径，防止路径遍历攻击 ★
// ★ 限制可访问的目录范围 ★
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch08
// ============================================================

const store = new Store({
  defaults: {
    windowBounds: { width: 900, height: 700 },
    theme: 'dark',
    recentFiles: [],
    settings: {
      autoSave: true,
      fontSize: 14,
      language: 'zh-CN',
    },
  },
})

let mainWindow = null

// --------------------------------------------------
// 安全：路径验证 — 限制文件操作范围
// --------------------------------------------------
const ALLOWED_DIRS = () => [
  app.getPath('home'),
  app.getPath('userData'),
  app.getPath('documents'),
  app.getPath('downloads'),
  app.getPath('desktop'),
]

function validatePath(inputPath) {
  if (typeof inputPath !== 'string' || !inputPath.trim()) {
    return { valid: false, error: '路径必须是非空字符串' }
  }
  const resolved = path.resolve(inputPath)
  const isAllowed = ALLOWED_DIRS().some((dir) => resolved.startsWith(dir))
  if (!isAllowed) {
    return { valid: false, error: '只能在用户目录（主目录、文档、下载、桌面、应用数据）中操作' }
  }
  return { valid: true, path: resolved }
}

function createWindow() {
  const bounds = store.get('windowBounds')
  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    title: '第8章：数据持久化与文件系统',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize()
    store.set('windowBounds', { width, height })
  })
}

// --------------------------------------------------
// IPC 处理
// --------------------------------------------------

ipcMain.handle('store-get', (_event, key) => {
  return store.get(key)
})

ipcMain.handle('store-set', (_event, key, value) => {
  store.set(key, value)
  return { success: true }
})

ipcMain.handle('store-delete', (_event, key) => {
  store.delete(key)
  return { success: true }
})

ipcMain.handle('store-get-all', () => {
  return store.getAll()
})

ipcMain.handle('fs-read-dir', async (_event, dirPath) => {
  const safePath = dirPath || app.getPath('home')
  const validation = validatePath(safePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    const entries = fs.readdirSync(validation.path, { withFileTypes: true })
    const items = entries.map((entry) => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
      isFile: entry.isFile(),
      path: path.join(validation.path, entry.name),
    }))
    return { success: true, path: validation.path, items }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('fs-read-file', async (_event, filePath) => {
  const validation = validatePath(filePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    const stat = fs.statSync(validation.path)
    if (stat.size > 1024 * 100) {
      return { success: false, error: '文件太大（超过 100KB），不支持预览' }
    }
    const content = fs.readFileSync(validation.path, 'utf-8')
    return { success: true, content, size: stat.size }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('fs-write-file', async (_event, filePath, content) => {
  const validation = validatePath(filePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    const dir = path.dirname(validation.path)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(validation.path, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('fs-stat', async (_event, filePath) => {
  const validation = validatePath(filePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    const stat = fs.statSync(validation.path)
    return {
      success: true,
      isFile: stat.isFile(),
      isDirectory: stat.isDirectory(),
      size: stat.size,
      modified: stat.mtime.toLocaleString(),
      created: stat.birthtime.toLocaleString(),
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('get-data-path', () => {
  return {
    userData: app.getPath('userData'),
    home: app.getPath('home'),
    documents: app.getPath('documents'),
    downloads: app.getPath('downloads'),
    desktop: app.getPath('desktop'),
  }
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
