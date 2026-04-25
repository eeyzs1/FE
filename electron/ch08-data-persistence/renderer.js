// ============================================================
// 第8章 渲染进程脚本
// ============================================================

const api = window.electronAPI
let currentDir = ''

document.getElementById('btn-store-set').addEventListener('click', async () => {
  const key = document.getElementById('store-key').value
  const value = document.getElementById('store-value').value
  if (!key) return
  let parsedValue = value
  try { parsedValue = JSON.parse(value) } catch {}
  await api.storeSet(key, parsedValue)
  document.getElementById('store-output').textContent = `✅ 已设置 ${key} = ${JSON.stringify(parsedValue)}`
})

document.getElementById('btn-store-get').addEventListener('click', async () => {
  const key = document.getElementById('store-key').value
  const value = await api.storeGet(key)
  document.getElementById('store-output').textContent = `${key} = ${JSON.stringify(value, null, 2)}`
})

document.getElementById('btn-store-delete').addEventListener('click', async () => {
  const key = document.getElementById('store-key').value
  await api.storeDelete(key)
  document.getElementById('store-output').textContent = `✅ 已删除 ${key}`
})

document.getElementById('btn-store-all').addEventListener('click', async () => {
  const data = await api.storeGetAll()
  document.getElementById('store-output').textContent = JSON.stringify(data, null, 2)
})

async function loadDir(dirPath) {
  const result = await api.fsReadDir(dirPath)
  if (!result.success) {
    document.getElementById('file-list').innerHTML = `<div style="padding:10px;color:#f44">❌ ${result.error}</div>`
    return
  }
  currentDir = result.path
  document.getElementById('current-path').textContent = currentDir
  document.getElementById('file-content').style.display = 'none'

  const parentDir = currentDir.split(/[/\\]/).slice(0, -1).join(/[/\\]/.test(currentDir) ? '/' : '\\')

  let html = `<div class="file-item" onclick="loadDir('${parentDir.replace(/\\/g, '\\\\')}')">
    <span class="file-icon">📁</span> <span>..</span>
  </div>`

  result.items.forEach((item) => {
    const icon = item.isDirectory ? '📁' : '📄'
    const escapedPath = item.path.replace(/\\/g, '\\\\')
    html += `<div class="file-item" onclick="${item.isDirectory ? `loadDir('${escapedPath}')` : `readFile('${escapedPath}')`}">
      <span class="file-icon">${icon}</span> <span>${item.name}</span>
    </div>`
  })

  document.getElementById('file-list').innerHTML = html
}

window.loadDir = loadDir

window.readFile = async function (filePath) {
  const result = await api.fsReadFile(filePath)
  const output = document.getElementById('file-content')
  output.style.display = 'block'
  if (result.success) {
    output.textContent = `📄 ${filePath}\n大小: ${result.size} 字节\n\n${result.content}`
  } else {
    output.textContent = `❌ ${result.error}`
  }
}

document.getElementById('btn-home').addEventListener('click', async () => {
  const paths = await api.getDataPath()
  loadDir(paths.home)
})
document.getElementById('btn-desktop').addEventListener('click', async () => {
  const paths = await api.getDataPath()
  loadDir(paths.desktop)
})
document.getElementById('btn-documents').addEventListener('click', async () => {
  const paths = await api.getDataPath()
  loadDir(paths.documents)
})
document.getElementById('btn-downloads').addEventListener('click', async () => {
  const paths = await api.getDataPath()
  loadDir(paths.downloads)
})

document.getElementById('btn-write').addEventListener('click', async () => {
  const filePath = document.getElementById('write-path').value
  const content = document.getElementById('write-content').value
  if (!filePath) return
  const result = await api.fsWriteFile(filePath, content)
  document.getElementById('write-output').textContent = result.success
    ? `✅ 文件已写入: ${filePath}`
    : `❌ 写入失败: ${result.error}`
})

document.getElementById('btn-paths').addEventListener('click', async () => {
  const paths = await api.getDataPath()
  document.getElementById('paths-output').textContent = Object.entries(paths)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
})

;(async () => {
  const paths = await api.getDataPath()
  loadDir(paths.home)
})()
