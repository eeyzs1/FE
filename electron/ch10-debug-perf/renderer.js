// ============================================================
// 第10章 渲染进程脚本
// ============================================================

const api = window.electronAPI

function bindButton(id, handler) {
  document.getElementById(id).addEventListener('click', async () => {
    const outputId = handler.outputId
    const output = document.getElementById(outputId)
    try {
      const result = await handler.action()
      if (output && result !== undefined) {
        output.textContent = result
      }
    } catch (err) {
      if (output) {
        output.textContent = '❌ 获取失败: ' + err.message
      }
    }
  })
}

bindButton('btn-metrics', {
  outputId: 'metrics-output',
  action: async () => {
    const metrics = await api.getAppMetrics()
    const header = ['PID', '类型', '内存', 'CPU'].map((h) => h.padEnd(12)).join('')
    const separator = '-'.repeat(48)
    const rows = metrics.map((m) =>
      [String(m.pid), m.type, m.memory, m.cpu].map((v) => v.padEnd(12)).join('')
    )
    return [header, separator, ...rows].join('\n')
  },
})

bindButton('btn-memory', {
  outputId: 'memory-output',
  action: async () => {
    const mem = await api.getProcessMemory()
    return Object.entries(mem).map(([k, v]) => `${k}: ${v}`).join('\n')
  },
})

bindButton('btn-gpu', {
  outputId: 'gpu-output',
  action: async () => {
    const status = await api.getGPUFeatureStatus()
    return Object.entries(status).map(([k, v]) => `${k}: ${v}`).join('\n')
  },
})

bindButton('btn-devtools', {
  outputId: 'debug-output',
  action: () => api.openDevTools(),
})

bindButton('btn-heap', {
  outputId: 'debug-output',
  action: async () => {
    const result = await api.takeHeapSnapshot()
    return result.message + '\n\n💡 ' + result.tip
  },
})
