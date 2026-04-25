const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')

// ============================================================
// 第3章：进程模型与 IPC 通信
// ============================================================
//
// 【核心概念】
// Electron 继承了 Chromium 的多进程架构：
//
// 1. 主进程（Main Process）
//    - 应用的入口点，运行在 Node.js 环境中
//    - 可以使用 require() 和所有 Node.js API
//    - 负责创建窗口、管理应用生命周期
//    - 通过 ipcMain 接收渲染进程的消息
//
// 2. 渲染进程（Renderer Process）
//    - 每个 BrowserWindow 对应一个渲染进程
//    - 运行网页内容（HTML/CSS/JS）
//    - 默认无法直接使用 Node.js API
//    - 通过 ipcRenderer 向主进程发送消息
//
// 3. Preload 脚本
//    - 在渲染进程加载网页内容之前运行
//    - 可以访问 Node.js API
//    - 通过 contextBridge 安全地暴露 API 给渲染进程
//
// 4. IPC 通信模式
//    - ipcRenderer.send() / ipcMain.on()     → 异步单向通信
//    - ipcRenderer.invoke() / ipcMain.handle() → 异步双向通信（推荐）
//    - ipcRenderer.sendSync()                  → 同步通信（不推荐，会阻塞）
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch03
// ============================================================

let mainWindow = null

// --------------------------------------------------
// 安全：路径验证 — 防止路径遍历攻击
// --------------------------------------------------
function validateFilePath(filePath) {
  if (typeof filePath !== 'string' || !filePath.trim()) {
    return { valid: false, error: '路径必须是非空字符串' }
  }
  const resolved = path.resolve(filePath)
  const allowedDirs = [os.homedir(), app.getPath('userData')]
  const isAllowed = allowedDirs.some((dir) => resolved.startsWith(dir))
  if (!isAllowed) {
    return { valid: false, error: '只能在用户主目录或应用数据目录中操作' }
  }
  return { valid: true, path: resolved }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第3章：IPC 通信',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  mainWindow.loadFile('index.html')
}

// --------------------------------------------------
// IPC 示例 1：异步单向通信 (send/on)
// 渲染进程发送消息，主进程只接收不回复
// --------------------------------------------------
ipcMain.on('message-from-renderer', (_event, message) => {
  console.log('[主进程] 收到渲染进程消息:', message)
})

// --------------------------------------------------
// IPC 示例 2：异步双向通信 (invoke/handle) ★推荐★
// 渲染进程发送请求，主进程处理后返回结果
// --------------------------------------------------
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    arch: process.arch,
    cpuCount: os.cpus().length,
    totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
    freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB',
    uptime: Math.round(os.uptime() / 3600) + ' 小时',
    hostname: os.hostname(),
  }
})

// --------------------------------------------------
// IPC 示例 3：文件操作（通过 IPC 让主进程执行 Node.js 操作）
// 渲染进程无法直接操作文件系统，必须通过 IPC 请求主进程
// ★ 重要：必须验证路径，防止路径遍历攻击 ★
// --------------------------------------------------
ipcMain.handle('read-file', async (_event, filePath) => {
  const validation = validateFilePath(filePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    const content = fs.readFileSync(validation.path, 'utf-8')
    return { success: true, content }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('write-file', async (_event, filePath, content) => {
  const validation = validateFilePath(filePath)
  if (!validation.valid) {
    return { success: false, error: validation.error }
  }
  try {
    fs.writeFileSync(validation.path, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// --------------------------------------------------
// 获取演示文件路径（跨平台）
// --------------------------------------------------
ipcMain.handle('get-demo-file-path', () => {
  return path.join(os.homedir(), 'electron-tutorial-test.txt')
})

// --------------------------------------------------
// IPC 示例 4：通知推送（主进程主动向渲染进程发送消息）
// --------------------------------------------------
ipcMain.on('start-notification-demo', () => {
  let count = 0
  const interval = setInterval(() => {
    count++
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('notification-from-main', {
        message: `这是来自主进程的第 ${count} 条通知`,
        timestamp: new Date().toLocaleTimeString(),
      })
    }
    if (count >= 5) clearInterval(interval)
  }, 2000)
})

// --------------------------------------------------
// IPC 示例 5：进度报告（长时间任务）
// --------------------------------------------------
ipcMain.handle('long-task', async (_event) => {
  const steps = 10
  for (let i = 1; i <= steps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('task-progress', {
        current: i,
        total: steps,
        percent: Math.round((i / steps) * 100),
      })
    }
  }
  return { completed: true }
})

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
