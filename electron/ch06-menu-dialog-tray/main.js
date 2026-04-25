const { app, BrowserWindow, ipcMain, Menu, dialog, Tray, nativeImage, Notification } = require('electron')
const path = require('node:path')

// ============================================================
// 第6章：菜单、对话框与系统托盘
// ============================================================
//
// 【核心概念】
// 1. Menu 模块
//    - 创建应用菜单（顶部菜单栏）
//    - 创建上下文菜单（右键菜单）
//    - Menu.buildFromTemplate() 从模板创建菜单
//    - MenuItem 的 role 属性提供预定义行为
//
// 2. Dialog 模块
//    - dialog.showOpenDialog(): 打开文件选择对话框
//    - dialog.showSaveDialog(): 保存文件对话框
//    - dialog.showMessageBox(): 消息对话框
//    - dialog.showErrorBox(): 错误对话框
//
// 3. Tray 模块
//    - 在系统托盘区显示图标
//    - 可以添加上下文菜单
//    - 支持点击事件和气泡通知
//
// 4. Notification 模块
//    - 发送系统原生通知
//    - 支持点击、关闭等事件
//
// 【运行方式】
// 在项目根目录执行：pnpm run ch06
// ============================================================

let mainWindow = null
let tray = null

function createTray() {
  const icon = nativeImage.createFromBuffer(
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEbSURBVFhH7ZY9DoMwDIUDC+fgCByAA3BRjsEROABH4Bic4CfxI4crUStVqpp8UuTYjl/sEJr8DWfOzMN5nh/xnPbSEbDfENgHCOyD2u8R2AU0eYXAPlD0FsFdwN8K7IJfF9gF9HmFwD5Q9BbBXcDfCuyCXxfYBfQA0u4R2Ac0eYbAPhD2FsFdQN8K7IJfFtgF9AnS7hHYBzR5hsA+EPYWwV1A3wrsgr8ttAvog6TdI7APaPIMgX0g7C2Cu4C+Fdhlvy20C+iDpN0jsA9o8gyBfSDsLYK7gL4V2AW/vLYL6IKk3SOwD2jyDIF9IOwtgruAvhXYBb+8tgvogqTdI7APaPIMgX0g7C2Cu4C+Fdhlvy20C+iDpN0jsA9o8gyBfSDsLYK7gL4V2AW/vLYL6IOk3SOwD2jyDIF9IOwtgruAvhXYBb+9tgrog6TdI7APaPIMgX0g7C2Cu4C+Fdhlvy20C+iDpN0jsA9o8gyBfSDsLYK7gL4V2AW/vbYL6IOk3SOwD2jyDIF9IOwtgruAvhXYBb+9tgrog6TdI7APaPIMgX0g7C2Cu4C+Fdhlvy20C+iDpN0jsA9o8gyBfSDsLYK7gL4V2AW/vbYL6IOk3SOwD2jyDIF9IOwtgruAvhXYBb+9tgrog6TdI7APaPIMgX0g7C2Cu4C+Fdhlvy20C+iDpN0jsA9o8gyBfSDsLYK7gL4V2AW/vbYL6IOk3SOwD2jyDIF9IOwtgruAvhXYBb+9tgrog6TdI7DvQPYx7QCFVYs6AAAAAElFTkSuQmCC',
      'base64'
    )
  )

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示主窗口', click: () => mainWindow?.show() },
    { label: '发送通知', click: () => sendNotification() },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ])
  tray.setToolTip('Electron 教程 - 第6章')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => mainWindow?.show())
}

function sendNotification() {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: 'Electron 教程',
      body: '这是来自系统托盘的通知！',
    })
    notification.show()
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: '第6章：菜单、对话框与系统托盘',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile('index.html')

  const appMenu = Menu.buildFromTemplate([
    {
      label: '文件',
      submenu: [
        { label: '新建', accelerator: 'CmdOrCtrl+N', click: () => mainWindow?.webContents.send('menu-action', 'new') },
        { label: '打开', accelerator: 'CmdOrCtrl+O', click: () => mainWindow?.webContents.send('menu-action', 'open') },
        { label: '保存', accelerator: 'CmdOrCtrl+S', click: () => mainWindow?.webContents.send('menu-action', 'save') },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            dialog.showMessageBoxSync(mainWindow, {
              type: 'info',
              title: '关于',
              message: 'Electron 大师教程',
              detail: '第6章：菜单、对话框与系统托盘\n\n基于 Electron 官方文档',
            })
          },
        },
      ],
    },
  ])
  Menu.setApplicationMenu(appMenu)
}

// --------------------------------------------------
// IPC 处理
// --------------------------------------------------

ipcMain.handle('show-open-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '选择文件',
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: '文本文件', extensions: ['txt', 'md'] },
      { name: '图片', extensions: ['jpg', 'png', 'gif'] },
      { name: '所有文件', extensions: ['*'] },
    ],
  })
  return result
})

ipcMain.handle('show-save-dialog', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: '保存文件',
    defaultPath: 'untitled.txt',
    filters: [
      { name: '文本文件', extensions: ['txt'] },
      { name: 'Markdown', extensions: ['md'] },
    ],
  })
  return result
})

ipcMain.handle('show-message-box', async (_event, type) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: type || 'info',
    title: '消息对话框',
    message: '这是一个消息对话框',
    detail: '你可以选择不同的按钮来响应不同的操作。',
    buttons: ['确定', '取消', '不再提示'],
    defaultId: 0,
    cancelId: 1,
  })
  return result
})

ipcMain.handle('show-error-box', () => {
  dialog.showErrorBox('错误', '这是一个错误对话框的演示。')
})

ipcMain.handle('send-notification', (_event, options) => {
  if (Notification.isSupported()) {
    const notification = new Notification(options)
    notification.show()
    return { supported: true }
  }
  return { supported: false }
})

app.whenReady().then(() => {
  createWindow()
  createTray()

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
