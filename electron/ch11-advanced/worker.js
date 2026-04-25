// ============================================================
// Worker 进程 — 在 UtilityProcess 中运行 CPU 密集型任务
// ============================================================
//
// 【核心概念】
// UtilityProcess 运行在独立的 Node.js 环境中：
// - 不会阻塞主进程
// - 不会阻塞渲染进程
// - 通过消息传递通信
// - 适合加密、压缩、图片处理等任务
// ============================================================

process.parentPort.on('message', (e) => {
  const { type, data } = e.data

  if (type === 'compute') {
    const startTime = Date.now()

    let result = 0
    for (let i = 0; i < data.iterations; i++) {
      result += Math.sqrt(i) * Math.sin(i)
    }

    const duration = Date.now() - startTime

    process.parentPort.postMessage({
      type: 'result',
      iterations: data.iterations,
      result: result,
      duration: duration,
    })
  }
})
