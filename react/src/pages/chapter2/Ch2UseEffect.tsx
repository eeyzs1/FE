import { useState, useEffect, useRef } from 'react'
import { Typography, Card, Divider, Tag, Select, Button } from 'antd'

const { Title, Paragraph } = Typography

function FetchDemo() {
  const [data, setData] = useState<{ userId: number; id: number; title: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [postId, setPostId] = useState(1)

  useEffect(() => {
    let cancelled = false
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(json => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [postId])

  const handleChangePost = (newId: number) => {
    setLoading(true)
    setData(null)
    setPostId(newId)
  }

  return (
    <div className="p-4 bg-indigo-50 rounded-lg">
      <div className="flex gap-2 mb-3">
        <Select value={postId} onChange={handleChangePost} className="w-32" options={[
          { value: 1, label: 'Post 1' },
          { value: 2, label: 'Post 2' },
          { value: 3, label: 'Post 3' },
        ]} />
        <Button onClick={() => handleChangePost((postId % 3) + 1)}>换一个</Button>
      </div>
      {loading ? (
        <div className="text-center py-4 text-indigo-500">加载中...</div>
      ) : data ? (
        <div className="bg-white p-3 rounded border">
          <Tag color="blue">ID: {data.id}</Tag>
          <p className="mt-2 text-gray-700">{data.title}</p>
        </div>
      ) : (
        <div className="text-gray-400">暂无数据</div>
      )}
    </div>
  )
}

function WindowTitleDemo() {
  const [title, setTitle] = useState('React 大师课')

  useEffect(() => {
    document.title = title
    return () => { document.title = 'React + Ant Design + TailwindCSS' }
  }, [title])

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <input
        className="border rounded px-3 py-1 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="修改页面标题..."
      />
      <p className="mt-2 text-sm text-green-600">看看浏览器标签页的标题！</p>
    </div>
  )
}

export default function Ch2UseEffect() {
  const [logs, setLogs] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const logsRef = useRef<string[]>([])

  useEffect(() => {
    logsRef.current = [...logsRef.current.slice(-8), `✅ Effect 执行: count=${count}, step=${step}`]
    setLogs([...logsRef.current])
  }, [count, step])

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>⚡ 2.1 useEffect</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        useEffect 是处理副作用的 Hook：数据获取、订阅、DOM 操作等。理解它的依赖机制是精通 React 的关键。
      </Paragraph>

      <Card title="💡 useEffect 执行时机" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`useEffect(() => {
  // 副作用逻辑（DOM 更新后执行）
  
  return () => {
    // 清理函数（下次 effect 执行前 或 卸载时执行）
  }
}, [dep1, dep2]) // 依赖数组`}</pre>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <div className="font-bold text-yellow-700">无依赖</div>
            <div className="text-xs text-yellow-600 mt-1">每次渲染后都执行</div>
            <code className="text-xs">useEffect(fn)</code>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="font-bold text-green-700">空依赖</div>
            <div className="text-xs text-green-600 mt-1">仅挂载时执行一次</div>
            <code className="text-xs">useEffect(fn, [])</code>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="font-bold text-blue-700">有依赖</div>
            <div className="text-xs text-blue-600 mt-1">依赖变化时执行</div>
            <code className="text-xs">useEffect(fn, [a])</code>
          </div>
        </div>
      </Card>

      <Card title="🔬 依赖追踪演示" className="mb-6">
        <Paragraph>观察 effect 何时执行（依赖 count 和 step）：</Paragraph>
        <div className="flex gap-4 mb-3">
          <Button type="primary" onClick={() => setCount(c => c + 1)}>count +1 (当前: {count})</Button>
          <Button onClick={() => setStep(s => s + 1)}>step +1 (当前: {step})</Button>
        </div>
        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs max-h-40 overflow-auto">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </Card>

      <Card title="🌐 实战：数据获取" className="mb-6">
        <Paragraph>useEffect 最常见的用途之一是在组件挂载时获取数据：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`useEffect(() => {
  let cancelled = false  // 防止竞态条件
  
  fetch(\`/api/posts/\${postId}\`)
    .then(res => res.json())
    .then(json => {
      if (!cancelled) {
        setData(json)
        setLoading(false)
      }
    })
  
  return () => { cancelled = true }  // 清理：取消过时请求
}, [postId])  // postId 变化时重新获取

// 💡 React 19 推荐使用 use() Hook + Suspense
// 处理数据获取，更优雅地解决加载状态`}</pre>
        </div>
        <FetchDemo />
      </Card>

      <Card title="📝 实战：修改页面标题" className="mb-6">
        <Paragraph>另一个常见用途是同步外部系统：</Paragraph>
        <WindowTitleDemo />
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>useEffect 在每次渲染后异步执行</li>
          <li>依赖数组决定 effect 何时重新执行</li>
          <li>清理函数用于取消订阅、清除定时器、取消请求</li>
          <li>数据获取要处理竞态条件（cancelled flag）</li>
          <li>不要对依赖撒谎 —— ESLint exhaustive-deps 规则</li>
          <li>如果只需要在挂载时执行一次，用空依赖数组</li>
          <li>React 19 推荐用 use() Hook + Suspense 替代 useEffect 数据获取</li>
        </ul>
      </Card>
    </div>
  )
}
