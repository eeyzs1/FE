const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('node:path')

// ============================================================
// 第4章：窗口管理深度解析
// ============================================================
//
// 【核心概念】
// 1. BrowserWindow 是 Electron 窗口管理的核心类
// 2. 每个窗口实例对应一个独立的渲染进程
// 3. 窗口有丰富的配置选项：尺寸、位置、样式、行为等
// 4. 窗口间可以建立父子关系
// 5. 支持无边框窗口、透明窗口、模态窗口等
// 6. webPreferences 控制渲染进程的安全策略
//
// 【关键 API】
// - new BrowserWindow(options)  创建窗口
// - win.loadFile() / win.loadURL()  加载内容
// - win.setSize() / win.getSize()  控制尺寸
// - win.setPosition() / win.getPosition()  控制位置
// - win.on('event', callback)  监听窗口事件
// - BrowserWindow.getAllWindows()  获取所有窗口
// - BrowserWindow.getFocusedWindow()  获取焦点窗口
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch04
// ============================================================

let mainWindow = null

function createMainWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    x: Math.round((screenWidth - 1000) / 2),
    y: Math.round((screenHeight - 700) / 2),
    minWidth: 600,
    minHeight: 400,
    title: '第4章：窗口管理',
    backgroundColor: '#1a1a2e',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('resize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const [width, height] = mainWindow.getSize()
      mainWindow.webContents.send('window-event-resize', { width, height })
    }
  })

  mainWindow.on('move', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const [x, y] = mainWindow.getPosition()
      mainWindow.webContents.send('window-event-move', { x, y })
    }
  })

  mainWindow.on('maximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('window-event-maximize', {})
    }
  })

  mainWindow.on('unmaximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('window-event-unmaximize', {})
    }
  })

  mainWindow.on('focus', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('window-event-focus', {})
    }
  })

  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('window-event-blur', {})
    }
  })
}

// --------------------------------------------------
// 子窗口 HTML 内容（内联生成，避免额外文件）
// --------------------------------------------------
function getChildWindowHTML(title, body) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #16213e;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
    }
    h2 { color: #00d2ff; margin-bottom: 10px; }
    p { opacity: 0.8; font-size: 0.9em; text-align: center; padding: 0 20px; }
  </style>
</head>
<body>
  ${body}
</body>
</html>`
}

// --------------------------------------------------
// IPC 处理
// --------------------------------------------------

ipcMain.handle('create-child-window', () => {
  const childWindow = new BrowserWindow({
    width: 500,
    height: 350,
    parent: mainWindow,
    title: '子窗口',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  childWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(
    getChildWindowHTML('子窗口', '<h2>👶 子窗口</h2><p>我是子窗口，始终显示在父窗口之上。<br>关闭父窗口时我也会关闭。</p>')
  ))
  return { created: true }
})

ipcMain.handle('create-frameless-window', () => {
  const framelessWindow = new BrowserWindow({
    width: 500,
    height: 350,
    frame: false,
    title: '无边框窗口',
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  framelessWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(
    getChildWindowHTML('无边框窗口', '<h2>🔲 无边框窗口</h2><p>我没有标题栏和边框。<br>适合自定义 UI，如音乐播放器、启动器等。<br><br>提示：可以通过 -webkit-app-region: drag 实现自定义拖拽区域。</p>')
  ))
  return { created: true }
})

ipcMain.handle('create-modal-window', () => {
  const modalWindow = new BrowserWindow({
    width: 450,
    height: 300,
    parent: mainWindow,
    modal: true,
    title: '模态窗口',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  modalWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(
    getChildWindowHTML('模态窗口', '<h2>🔒 模态窗口</h2><p>我是模态窗口，关闭我之前无法操作父窗口。<br>常用于确认对话框、设置面板等。</p>')
  ))
  return { created: true }
})

ipcMain.handle('create-transparent-window', () => {
  const transparentWindow = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    title: '透明窗口',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  transparentWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(
    `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
  <title>透明窗口</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: rgba(26, 26, 46, 0.85);
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      border-radius: 20px;
      border: 2px solid rgba(0, 210, 255, 0.5);
      overflow: hidden;
    }
    h2 { color: #00d2ff; margin-bottom: 10px; }
    p { opacity: 0.8; font-size: 0.9em; text-align: center; padding: 0 20px; }
  </style>
</head>
<body>
  <h2>💎 透明窗口</h2>
  <p>我是透明窗口，可以实现不规则形状和半透明效果。<br>常用于悬浮窗、通知气泡等。</p>
</body>
</html>`
  ))
  return { created: true }
})

ipcMain.handle('get-window-info', () => {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return { error: '主窗口不存在' }
  }
  const [width, height] = mainWindow.getSize()
  const [x, y] = mainWindow.getPosition()
  return {
    width,
    height,
    x,
    y,
    isMaximized: mainWindow.isMaximized(),
    isAlwaysOnTop: mainWindow.isAlwaysOnTop(),
  }
})

ipcMain.handle('minimize-window', () => {
  mainWindow?.minimize()
  return { success: true }
})

ipcMain.handle('maximize-window', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
  return { success: true }
})

ipcMain.handle('set-always-on-top', (_event, flag) => {
  mainWindow?.setAlwaysOnTop(flag)
  return { success: true }
})

ipcMain.handle('set-window-size', (_event, width, height) => {
  mainWindow?.setSize(width, height)
  return { success: true }
})

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
