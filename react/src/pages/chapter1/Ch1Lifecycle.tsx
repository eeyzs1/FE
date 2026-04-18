import { useState, useEffect, useRef } from 'react'
import { Typography, Card, Divider, Tag, Progress } from 'antd'

const { Title, Paragraph, Text } = Typography

function LifecycleDemo() {
  const [phase, setPhase] = useState<'mounting' | 'updating' | 'unmounting'>('mounting')
  const [logs, setLogs] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const logsRef = useRef<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); return 100 }
        return p + 2
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    logsRef.current = [...logsRef.current, `[${new Date().toLocaleTimeString()}] 组件挂载 (Mount)`]
    setLogs([...logsRef.current])
    return () => {
      logsRef.current = [...logsRef.current, `[${new Date().toLocaleTimeString()}] 组件卸载 (Unmount)`]
    }
  }, [])

  useEffect(() => {
    if (count > 0) {
      logsRef.current = [...logsRef.current, `[${new Date().toLocaleTimeString()}] State 更新: count = ${count} (Update)`]
      setLogs([...logsRef.current])
    }
  }, [count])

  return (
    <div className="p-4 bg-indigo-50 rounded-lg">
      <div className="flex gap-2 mb-3">
        <Tag color={phase === 'mounting' ? 'green' : 'default'}>Mounting</Tag>
        <Tag color={phase === 'updating' ? 'blue' : 'default'}>Updating</Tag>
        <Tag color={phase === 'unmounting' ? 'red' : 'default'}>Unmounting</Tag>
      </div>
      <Progress percent={progress} className="mb-3" />
      <div className="flex items-center gap-4 mb-3">
        <span className="text-2xl font-bold">{count}</span>
        <button
          className="px-3 py-1 bg-indigo-600 text-white rounded"
          onClick={() => { setCount(c => c + 1); setPhase('updating') }}
        >
          +1 触发更新
        </button>
      </div>
      <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs max-h-40 overflow-auto">
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  )
}

function TimerDemo() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isRunning])

  return (
    <div className="p-4 bg-green-50 rounded-lg text-center">
      <div className="text-4xl font-mono font-bold text-green-700 mb-3">
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-2">
        <button
          className={`px-4 py-2 rounded ${isRunning ? 'bg-yellow-500' : 'bg-green-600'} text-white`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? '暂停' : '开始'}
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => { setSeconds(0); setIsRunning(false) }}
        >
          重置
        </button>
      </div>
    </div>
  )
}

function WindowSizeDemo() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="p-4 bg-purple-50 rounded-lg text-center">
      <div className="text-lg font-bold text-purple-700">
        📐 窗口尺寸: {size.width} × {size.height}
      </div>
      <p className="text-sm text-purple-500 mt-1">调整浏览器窗口大小试试！</p>
    </div>
  )
}

export default function Ch1Lifecycle() {
  const [showLifecycle, setShowLifecycle] = useState(true)
  const [showTimer, setShowTimer] = useState(true)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🔄 1.5 生命周期</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        函数组件通过 useEffect Hook 来处理生命周期逻辑。理解组件的挂载、更新、卸载三个阶段至关重要。
      </Paragraph>

      <Card title="💡 三个生命周期阶段" className="mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🟢</div>
            <div className="font-bold text-green-700">Mounting</div>
            <div className="text-sm text-green-600">组件挂载</div>
            <div className="text-xs text-green-500 mt-1">DOM 插入后执行</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🔵</div>
            <div className="font-bold text-blue-700">Updating</div>
            <div className="text-sm text-blue-600">组件更新</div>
            <div className="text-xs text-blue-500 mt-1">state/props 变化时</div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🔴</div>
            <div className="font-bold text-red-700">Unmounting</div>
            <div className="text-sm text-red-600">组件卸载</div>
            <div className="text-xs text-red-500 mt-1">DOM 移除前执行</div>
          </div>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`useEffect(() => {
  // 🟢 Mounting: 组件挂载后执行
  // 🔵 Updating: 依赖项变化时执行
  
  return () => {
    // 🔴 Unmounting: 组件卸载前执行（清理函数）
  }
}, [dependencies]) // 依赖数组`}</pre>
        </div>
      </Card>

      <Card title="🔬 生命周期日志演示" className="mb-6">
        <Paragraph>观察组件在不同生命周期阶段的行为：</Paragraph>
        <div className="flex gap-2 mb-3">
          <button
            className={`px-3 py-1 rounded ${showLifecycle ? 'bg-green-600' : 'bg-gray-400'} text-white`}
            onClick={() => setShowLifecycle(!showLifecycle)}
          >
            {showLifecycle ? '卸载组件' : '挂载组件'}
          </button>
        </div>
        {showLifecycle && <LifecycleDemo />}
      </Card>

      <Card title="⏱️ useEffect 实战 - 计时器" className="mb-6">
        <Paragraph>useEffect 的清理函数用于清除副作用（定时器、事件监听等），防止内存泄漏。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    // ⚠️ 清理函数：组件卸载或 isRunning 变化时清除定时器
    return () => clearInterval(timer)
  }, [isRunning]) // 依赖 isRunning
}`}</pre>
        </div>
        <div className="flex gap-2 mb-3">
          <button
            className={`px-3 py-1 rounded ${showTimer ? 'bg-green-600' : 'bg-gray-400'} text-white`}
            onClick={() => setShowTimer(!showTimer)}
          >
            {showTimer ? '卸载计时器' : '挂载计时器'}
          </button>
        </div>
        {showTimer && <TimerDemo />}
      </Card>

      <Card title="📐 useEffect 实战 - 监听窗口尺寸" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`useEffect(() => {
  const handleResize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }
  window.addEventListener('resize', handleResize)
  // 清理函数：移除事件监听
  return () => window.removeEventListener('resize', handleResize)
}, []) // 空依赖数组 = 只在挂载时执行一次`}</pre>
        </div>
        <WindowSizeDemo />
      </Card>

      <Card title="📋 依赖数组的三种形式" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <Text code>useEffect(fn)</Text> — 没有依赖数组，每次渲染都执行
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text code>useEffect(fn, [])</Text> — 空依赖数组，只在挂载时执行一次
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Text code>useEffect(fn, [a, b])</Text> — 依赖项变化时执行
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>函数组件用 <Text code>useEffect</Text> 处理副作用和生命周期</li>
          <li>挂载 → 更新 → 卸载，三个阶段各有对应的处理方式</li>
          <li>return 的清理函数在卸载和下次 effect 执行前调用</li>
          <li>依赖数组决定了 effect 何时重新执行</li>
          <li>忘记清理副作用会导致内存泄漏</li>
          <li>useEffect 在浏览器绘制之后异步执行，不阻塞渲染</li>
        </ul>
      </Card>
    </div>
  )
}
