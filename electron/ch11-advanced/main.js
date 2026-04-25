const { app, BrowserWindow, ipcMain, utilityProcess, screen, powerMonitor, nativeTheme, globalShortcut } = require('electron')
const path = require('node:path')

// ============================================================
// 第11章：高级主题与实战项目
// ============================================================
//
// 【核心概念】
// 1. UtilityProcess — 实用进程
//    - 在独立进程中运行 CPU 密集型任务
//    - 不阻塞主进程和渲染进程
//    - 可以通过 MessagePort 与渲染进程通信
//
// 2. 系统主题监听
//    - nativeTheme.on('updated') 监听系统暗色/亮色切换
//    - nativeTheme.shouldUseDarkColors 判断当前主题
//
// 3. 电源监控
//    - powerMonitor.on('suspend') 系统挂起
//    - powerMonitor.on('resume') 系统恢复
//    - powerMonitor.on('on-ac') / powerMonitor.on('on-battery')
//    - ★ 必须在 app.whenReady() 之后使用 ★
//
// 4. 全局快捷键
//    - globalShortcut.register() 注册全局快捷键
//    - 即使应用不在焦点也能响应
//    - 必须在 app.whenReady() 之后注册
//
// 5. 多窗口管理
//    - 窗口间通信
//    - 窗口状态保存与恢复
//
// 6. 拖放支持
//    - 自定义拖放行为
//    - 文件拖入处理
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch11
// ============================================================

let mainWindow = null
let secondWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第11章：高级主题',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')
}

// --------------------------------------------------
// UtilityProcess 示例：CPU 密集型计算
// --------------------------------------------------
ipcMain.handle('heavy-computation', async (_event, data) => {
  return new Promise((resolve) => {
    const child = utilityProcess.fork(path.join(__dirname, 'worker.js'))
    child.on('message', (result) => {
      resolve(result)
      child.kill()
    })
    child.postMessage({ type: 'compute', data })
  })
})

// --------------------------------------------------
// 系统主题
// --------------------------------------------------
ipcMain.handle('get-theme', () => {
  return {
    shouldUseDarkColors: nativeTheme.shouldUseDarkColors,
    themeSource: nativeTheme.themeSource,
  }
})

ipcMain.handle('set-theme', (_event, theme) => {
  nativeTheme.themeSource = theme
  return { themeSource: nativeTheme.themeSource }
})

nativeTheme.on('updated', () => {
  mainWindow?.webContents.send('theme-changed', {
    shouldUseDarkColors: nativeTheme.shouldUseDarkColors,
    themeSource: nativeTheme.themeSource,
  })
})

// --------------------------------------------------
// 全局快捷键
// --------------------------------------------------
ipcMain.handle('register-shortcut', (_event, accelerator, action) => {
  try {
    const success = globalShortcut.register(accelerator, () => {
      mainWindow?.webContents.send('shortcut-triggered', { accelerator, action })
    })
    return { success, accelerator }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('unregister-shortcut', (_event, accelerator) => {
  globalShortcut.unregister(accelerator)
  return { success: true }
})

ipcMain.handle('is-shortcut-registered', (_event, accelerator) => {
  return globalShortcut.isRegistered(accelerator)
})

// --------------------------------------------------
// 多窗口通信
// --------------------------------------------------
ipcMain.handle('open-second-window', () => {
  if (secondWindow && !secondWindow.isDestroyed()) {
    secondWindow.focus()
    return { existed: true }
  }

  secondWindow = new BrowserWindow({
    width: 500,
    height: 400,
    title: '第二窗口',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  secondWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
  <title>第二窗口</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    h2 { color: #ffab91; margin-bottom: 10px; }
    p { opacity: 0.8; font-size: 0.9em; text-align: center; padding: 0 20px; }
    #messages {
      background: #16213e;
      border-radius: 8px;
      padding: 12px;
      margin-top: 12px;
      max-width: 400px;
      width: 90%;
      max-height: 150px;
      overflow-y: auto;
      font-size: 0.85em;
    }
    .msg { padding: 4px 0; border-bottom: 1px solid rgba(255,171,145,0.1); }
  </style>
</head>
<body>
  <h2>🪟 第二窗口</h2>
  <p>我是独立窗口，可以与主窗口通信。</p>
  <div id="messages"><div class="msg">等待消息...</div></div>
</body>
</html>`))

  secondWindow.on('closed', () => {
    secondWindow = null
  })

  return { existed: false }
})

ipcMain.handle('send-to-second-window', (_event, message) => {
  if (secondWindow && !secondWindow.isDestroyed()) {
    secondWindow.webContents.executeJavaScript(
      `document.getElementById('messages').innerHTML = '<div class="msg">${message} — ${new Date().toLocaleTimeString()}</div>' + document.getElementById('messages').innerHTML`
    )
    return { success: true }
  }
  return { success: false, error: '第二窗口未打开' }
})

// --------------------------------------------------
// 文件拖放处理
// --------------------------------------------------
ipcMain.handle('get-drag-drop-info', () => {
  return {
    description: '在渲染进程中，可以通过监听 dragover 和 drop 事件来处理文件拖放',
    example: `// 渲染进程中处理文件拖放
document.addEventListener('drop', (e) => {
  e.preventDefault()
  const files = Array.from(e.dataTransfer.files)
  files.forEach(file => {
    console.log('拖入文件:', file.name, file.path, file.size)
  })
})
document.addEventListener('dragover', (e) => {
  e.preventDefault()
})`,
  }
})

// --------------------------------------------------
// 屏幕信息
// --------------------------------------------------
ipcMain.handle('get-screen-info', () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const allDisplays = screen.getAllDisplays()
  return {
    primary: {
      size: primaryDisplay.size,
      workArea: primaryDisplay.workArea,
      scaleFactor: primaryDisplay.scaleFactor,
      rotation: primaryDisplay.rotation,
    },
    displayCount: allDisplays.length,
    cursorPosition: screen.getCursorScreenPoint(),
  }
})

app.whenReady().then(() => {
  createWindow()

  // --------------------------------------------------
  // 电源监控 — 必须在 app.whenReady() 之后注册
  // --------------------------------------------------
  ipcMain.handle('get-power-state', () => {
    return {
      onBatteryPower: powerMonitor.isOnBatteryPower?.() || false,
    }
  })

  powerMonitor.on('suspend', () => {
    mainWindow?.webContents.send('power-event', { type: 'suspend' })
  })

  powerMonitor.on('resume', () => {
    mainWindow?.webContents.send('power-event', { type: 'resume' })
  })

  powerMonitor.on('on-ac', () => {
    mainWindow?.webContents.send('power-event', { type: 'on-ac' })
  })

  powerMonitor.on('on-battery', () => {
    mainWindow?.webContents.send('power-event', { type: 'on-battery' })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
