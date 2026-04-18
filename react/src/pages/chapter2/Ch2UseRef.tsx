import { useState, useEffect, useRef } from 'react'
import { Typography, Card, Divider, Button, Input } from 'antd'
import type { InputRef } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch2UseRef() {
  const [renderCount, setRenderCount] = useState(0)
  const renderCountRef = useRef(0)
  const inputRef = useRef<InputRef>(null)
  const [name, setName] = useState('')
  const [prevName, setPrevName] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [refDisplayCount, setRefDisplayCount] = useState(0)

  useEffect(() => {
    renderCountRef.current += 1
  })

  useEffect(() => {
    setPrevName(name)
  }, [name])

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const startTimer = () => {
    if (timerRef.current) return
    setIsRunning(true)
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
  }

  const resetTimer = () => {
    stopTimer()
    setSeconds(0)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📌 2.2 useRef</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        useRef 创建一个可变引用，跨渲染周期保持值，但修改不会触发重新渲染。
      </Paragraph>

      <Card title="💡 useRef vs useState" className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">useState</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>✅ 修改会触发重新渲染</li>
              <li>✅ 值在渲染间保持</li>
              <li>✅ 通过 setter 函数更新</li>
              <li>📌 用于驱动 UI 更新的数据</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">useRef</h4>
            <ul className="text-sm space-y-1 text-green-600">
              <li>❌ 修改不触发重新渲染</li>
              <li>✅ 值在渲染间保持</li>
              <li>✅ 直接修改 .current</li>
              <li>📌 用于不驱动 UI 的数据</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`const [state, setState] = useState(0)  // 修改 → 重新渲染
const ref = useRef(0)                // 修改 → 不重新渲染

setState(newState)  // 触发渲染
ref.current = newValue  // 不触发渲染`}</pre>
        </div>
      </Card>

      <Card title="🔬 ref 不触发重新渲染演示" className="mb-6">
        <Paragraph>点击按钮观察：修改 ref 不会更新 UI，必须通过 setState 手动同步：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const renderCountRef = useRef(0)

// ✅ 在 useEffect 中更新 ref（不在渲染期间）
useEffect(() => {
  renderCountRef.current += 1
})

// ⚠️ ref 变化不会触发重新渲染！
// 需要手动同步到 state 才能显示
const syncToUI = () => {
  setDisplayCount(renderCountRef.current)
}`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg text-center">
          <div className="text-4xl font-bold text-indigo-600">{refDisplayCount}</div>
          <div className="text-sm text-indigo-500 mt-1">ref 当前值（需手动同步到 UI）</div>
          <div className="mt-3 flex justify-center gap-2">
            <Button type="primary" onClick={() => setRenderCount(c => c + 1)}>
              触发渲染 (state: {renderCount})
            </Button>
            <Button onClick={() => setRefDisplayCount(renderCountRef.current)}>
              同步 ref 到 UI
            </Button>
          </div>
          <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-700">
            💡 点击"触发渲染"多次，再点"同步 ref 到 UI"——ref 默默记录了所有渲染次数！
          </div>
        </div>
      </Card>

      <Card title="🔄 追踪前一次值" className="mb-6">
        <Paragraph>用 useRef 在 useEffect 中保存上一次的值：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [name, setName] = useState('')
const prevNameRef = useRef('')

useEffect(() => {
  prevNameRef.current = name  // 在 effect 中更新
}, [name])

// 显示: 当前值 vs 上一次的值`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入名字观察前一次值..."
          />
          <div className="mt-2 flex gap-4 text-sm">
            <span>当前值: <Text strong>{name || '(空)'}</Text></span>
            <span>前一次值: <Text strong type="secondary">{prevName || '(空)'}</Text></span>
          </div>
        </div>
      </Card>

      <Card title="🎯 DOM 引用" className="mb-6">
        <Paragraph>useRef 最常见的用途是直接访问 DOM 元素：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const inputRef = useRef<HTMLInputElement>(null)

<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>
  聚焦输入框
</button>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex gap-2 mb-2">
            <Input ref={inputRef} placeholder="点击按钮聚焦这里..." />
            <Button type="primary" onClick={focusInput}>聚焦</Button>
          </div>
        </div>
      </Card>

      <Card title="⏱️ 存储定时器 ID" className="mb-6">
        <Paragraph>useRef 适合存储不需要驱动 UI 的可变值，如定时器 ID：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const timerRef = useRef(null)

const start = () => {
  timerRef.current = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)
}

const stop = () => {
  clearInterval(timerRef.current)
  timerRef.current = null
}`}</pre>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <div className="text-4xl font-mono font-bold text-green-700 mb-3">
            {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
          </div>
          <div className="flex justify-center gap-2">
            <Button type="primary" onClick={startTimer} disabled={isRunning}>开始</Button>
            <Button danger onClick={stopTimer} disabled={!isRunning}>暂停</Button>
            <Button onClick={resetTimer}>重置</Button>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>useRef 返回 <Text code>{'{ current: value }'}</Text> 对象，跨渲染保持</li>
          <li>修改 <Text code>.current</Text> 不会触发重新渲染</li>
          <li>三大用途：DOM 引用、存储可变值、追踪前一次渲染值</li>
          <li>不要在渲染过程中读写 ref，应在 useEffect 或事件处理函数中操作</li>
          <li>如果需要在 UI 中显示 ref 值，必须手动同步到 state</li>
        </ul>
      </Card>
    </div>
  )
}
