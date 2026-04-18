import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Typography, Card, Divider, Button } from 'antd'

const { Title, Paragraph, Text } = Typography

const ButtonItem = memo(({ id, label, onClick }: { id: number; label: string; onClick: (id: number) => void }) => {
  const renderCountRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    renderCountRef.current += 1
    setRenderCount(renderCountRef.current)
  }, [])

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded border text-sm">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">渲染: {renderCount}</span>
        <Button size="small" danger onClick={() => onClick(id)}>删除</Button>
      </div>
    </div>
  )
})

export default function Ch2UseCallback() {
  const [items, setItems] = useState(
    Array.from({ length: 5 }, (_, i) => ({ id: i + 1, label: `项目 ${i + 1}` }))
  )
  const [count, setCount] = useState(0)

  const deleteItemWithoutCallback = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const deleteItemWithCallback = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🔄 2.4 useCallback</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        useCallback 缓存函数引用，避免因函数重新创建导致子组件不必要的渲染。
      </Paragraph>

      <Card title="💡 useCallback 基础" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const memoizedCallback = useCallback(
  (a, b) => {
    doSomething(a, b)
  },
  [dep1, dep2]  // 依赖项
)

// 等价于
const memoizedCallback = useMemo(
  () => (a, b) => { doSomething(a, b) },
  [dep1, dep2]
)`}</pre>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <Text strong>{"useCallback(fn, deps) 等价于 useMemo(() => fn, deps)"}</Text>
          <p className="text-sm mt-1 text-blue-600">它缓存的是函数引用，不是函数返回值。</p>
        </div>
      </Card>

      <Card title="🔬 为什么需要 useCallback？" className="mb-6">
        <Paragraph>每次渲染都会创建新的函数引用，导致 memo 子组件重新渲染：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// ❌ 没有 useCallback：每次渲染都创建新函数
const handleClick = (id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}
// handleClick 每次都是新引用 → memo 失效

// ✅ 使用 useCallback：函数引用保持不变
const handleClick = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, []) // 依赖为空 → 函数引用永远不变`}</pre>
        </div>
      </Card>

      <Card title="📊 对比演示" className="mb-6">
        <Paragraph>点击 +1 按钮，观察子组件的渲染次数：</Paragraph>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-bold text-red-700 mb-2">❌ 无 useCallback</h4>
            <p className="text-xs text-red-500 mb-2">每次 count 变化，所有子组件都重新渲染</p>
            <div className="space-y-1">
              {items.map(item => (
                <ButtonItem key={item.id} id={item.id} label={item.label} onClick={deleteItemWithoutCallback} />
              ))}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">✅ 有 useCallback</h4>
            <p className="text-xs text-green-500 mb-2">count 变化时，子组件不会重新渲染</p>
            <div className="space-y-1">
              {items.map(item => (
                <ButtonItem key={item.id} id={item.id} label={item.label} onClick={deleteItemWithCallback} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <Button type="primary" onClick={() => setCount(c => c + 1)}>
            触发父组件渲染 (count: {count})
          </Button>
        </div>
      </Card>

      <Card title="📋 何时使用 useCallback？" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text strong>✅ 应该用的场景：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-green-700">
              <li>传递给 memo 子组件的回调函数</li>
              <li>作为 useEffect 的依赖项</li>
              <li>作为其他 useCallback/useMemo 的依赖项</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <Text strong>❌ 不需要用的场景：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-red-700">
              <li>传递给原生 DOM 元素的事件处理</li>
              <li>子组件没有用 memo 包裹</li>
              <li>函数不作为依赖项传递</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>useCallback 缓存函数引用，避免不必要的子组件渲染</li>
          <li>通常与 <Text code>React.memo</Text> 配合使用</li>
          <li>依赖项变化时返回新的函数引用</li>
          <li>不要滥用 —— 只在需要时使用</li>
          <li>{"useCallback(fn, deps) ≈ useMemo(() => fn, deps)"}</li>
        </ul>
      </Card>
    </div>
  )
}
