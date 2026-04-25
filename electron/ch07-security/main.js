const { app, BrowserWindow, ipcMain, session } = require('electron')
const path = require('node:path')

// ============================================================
// 第7章：安全最佳实践
// ============================================================
//
// 【核心概念】Electron 安全的七大原则
//
// 1. 上下文隔离 (Context Isolation) ★最重要★
//    - contextIsolation: true (默认开启)
//    - Preload 脚本与渲染进程的 JS 运行在不同的上下文
//    - 防止渲染进程中的恶意代码访问 Preload 中的特权 API
//
// 2. 禁用 Node.js 集成
//    - nodeIntegration: false (默认关闭)
//    - 渲染进程不应直接使用 require() 或 Node.js API
//    - 通过 Preload + contextBridge 安全暴露必要功能
//
// 3. 启用沙箱 (Sandbox)
//    - sandbox: true (Electron 20+ 默认开启)
//    - 渲染进程运行在 Chromium 沙箱中
//    - 限制渲染进程对系统资源的访问
//
// 4. 内容安全策略 (CSP)
//    - 通过 HTTP 头或 meta 标签设置
//    - 限制脚本、样式、图片等资源的加载来源
//    - 防止 XSS 攻击
//
// 5. 不加载远程内容
//    - 优先加载本地文件
//    - 如果必须加载远程内容，使用 webSecurity: true
//    - 不要禁用同源策略
//
// 6. 安全的 IPC 通信
//    - 不要暴露整个 ipcRenderer
//    - 为每个 IPC 通道创建专门的封装函数
//    - 验证来自渲染进程的数据
//    - 使用 IPC 通道白名单
//
// 7. 验证和清理输入
//    - 永远不要信任来自渲染进程的数据
//    - 使用参数验证和类型检查
//    - 防止命令注入和路径遍历
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch07
// ============================================================

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第7章：安全最佳实践',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  })

  mainWindow.loadFile('index.html')
}

// --------------------------------------------------
// 安全示例：输入验证
// --------------------------------------------------
function validateFilePath(filePath) {
  if (typeof filePath !== 'string') {
    return { valid: false, error: '路径必须是字符串' }
  }
  if (filePath.includes('..')) {
    return { valid: false, error: '路径不能包含 .. (路径遍历攻击)' }
  }
  const allowedDir = app.getPath('userData')
  const resolved = path.resolve(filePath)
  if (!resolved.startsWith(allowedDir)) {
    return { valid: false, error: '只能在用户数据目录中操作' }
  }
  return { valid: true, path: resolved }
}

// --------------------------------------------------
// 安全示例：IPC 通道白名单
// 使用白名单验证 IPC 通道，防止未授权的通道被调用
// --------------------------------------------------
const ALLOWED_IPC_CHANNELS = new Set([
  'get-security-config',
  'test-input-validation',
  'get-csp-info',
])

// 在 ipcMain.handle 中间件中验证通道
const originalHandle = ipcMain.handle.bind(ipcMain)
ipcMain.handle = function (channel, handler) {
  originalHandle(channel, async (event, ...args) => {
    if (!ALLOWED_IPC_CHANNELS.has(channel)) {
      console.warn(`[安全警告] IPC 通道 "${channel}" 不在白名单中`)
      throw new Error(`IPC 通道 "${channel}" 未被授权`)
    }
    return handler(event, ...args)
  })
}

ipcMain.handle('get-security-config', () => {
  return {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
    webSecurity: true,
    allowRunningInsecureContent: false,
  }
})

ipcMain.handle('test-input-validation', (_event, input) => {
  const result = validateFilePath(input)
  return result
})

ipcMain.handle('get-csp-info', () => {
  return {
    description: 'CSP (Content Security Policy) 通过限制资源加载来源来防止 XSS 攻击',
    example: "Content-Security-Policy: default-src 'self'; script-src 'self'",
    recommendations: [
      "default-src 'self' - 只加载同源资源",
      "script-src 'self' - 只加载同源脚本",
      "style-src 'self' 'unsafe-inline' - 允许内联样式",
      "img-src 'self' data: - 允许同源和 data URI 图片",
      "connect-src 'self' - 只允许同源网络请求",
      "不要使用 'unsafe-inline' 或 'unsafe-eval'",
    ],
  }
})

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
        ],
      },
    })
  })

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
