const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// ============================================================
// 第10章：调试、测试与性能优化
// ============================================================
//
// 【核心概念】
// 1. 调试方法
//    - DevTools: Ctrl+Shift+I 打开开发者工具
//    - 主进程调试: electron --inspect=5858
//    - VS Code 调试: 配置 launch.json
//    - console.log / console.time / console.timeEnd
//
// 2. 性能分析
//    - Chrome DevTools Performance 面板
//    - Chrome DevTools Memory 面板（堆快照）
//    - app.getAppMetrics() — 进程资源使用
//    - process.getCPUUsage() — CPU 使用率
//    - process.memoryUsage() — 内存使用
//
// 3. 性能优化
//    - 窗口懒加载（show: false + ready-to-show）
//    - 后台节流（backgroundThrottling）
//    - 减少渲染进程负担
//    - 使用 webview 隔离重内容
//    - 预加载和缓存
//
// 4. 测试
//    - Playwright / Spectron 进行 E2E 测试
//    - Jest 进行单元测试
//    - 测试主进程和渲染进程
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch10
// ============================================================

let mainWindow = null

function createWindow() {
  console.time('app-startup')

  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第10章：调试、测试与性能优化',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    console.timeEnd('app-startup')
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.handle('get-app-metrics', async () => {
  try {
    return app.getAppMetrics().map((metric) => ({
      pid: metric.pid,
      type: metric.type,
      memory: Math.round(metric.memory.workingSetSize / 1024) + ' MB',
      cpu: metric.cpu.percentCPUUsage.toFixed(2) + '%',
    }))
  } catch (err) {
    console.error('Failed to get app metrics:', err)
    throw err
  }
})

ipcMain.handle('get-process-memory', async () => {
  try {
    const mem = process.memoryUsage()
    return {
      rss: Math.round(mem.rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + ' MB',
      external: Math.round(mem.external / 1024 / 1024) + ' MB',
      arrayBuffers: Math.round(mem.arrayBuffers / 1024 / 1024) + ' MB',
    }
  } catch (err) {
    console.error('Failed to get process memory:', err)
    throw err
  }
})

ipcMain.handle('get-gpu-feature-status', async () => {
  try {
    return app.getGPUFeatureStatus()
  } catch (err) {
    console.error('Failed to get GPU feature status:', err)
    throw err
  }
})

ipcMain.handle('open-devtools', () => {
  if (!mainWindow || mainWindow.isDestroyed()) return
  if (app.isPackaged) {
    console.warn('open-devtools is disabled in production')
    return
  }
  mainWindow.webContents.openDevTools()
})

ipcMain.handle('take-heap-snapshot', () => {
  return {
    message: '请在 DevTools 中手动操作: Memory → Take Heap Snapshot',
    tip: '也可以使用 Chrome DevTools Protocol 自动化',
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
