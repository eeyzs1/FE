import { useState, useEffect, useCallback } from 'react'
import { Typography, Card, Divider, Input, Button, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue]
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (!cancelled) { setData(json); setLoading(false) }
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '')
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="输入名字（自动保存到 localStorage）" />
      <p className="mt-2 text-sm text-green-600">刷新页面后数据仍然存在！当前值: <Text strong>{name || '(空)'}</Text></p>
    </div>
  )
}

function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="输入搜索词（500ms 防抖）"
      />
      <div className="mt-2 flex gap-4 text-sm">
        <span>即时值: <Text code>{searchTerm}</Text></span>
        <span>防抖值: <Text code>{debouncedSearch}</Text></span>
      </div>
    </div>
  )
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  return (
    <div className="p-4 bg-purple-50 rounded-lg text-center">
      <Text strong className="text-purple-700">📐 窗口: {width} × {height}</Text>
    </div>
  )
}

function FetchDemo() {
  const [postId, setPostId] = useState(1)
  const { data, loading, error } = useFetch<{ title: string; body: string }>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )

  return (
    <div className="p-4 bg-orange-50 rounded-lg">
      <div className="flex gap-2 mb-2">
        <Button size="small" onClick={() => setPostId(p => Math.max(1, p - 1))}>上一个</Button>
        <Tag color="blue">Post {postId}</Tag>
        <Button size="small" onClick={() => setPostId(p => p + 1)}>下一个</Button>
      </div>
      {loading && <p className="text-orange-600">加载中...</p>}
      {error && <p className="text-red-600">错误: {error}</p>}
      {data && !loading && <p className="text-sm text-gray-700">{data.title}</p>}
    </div>
  )
}

export default function Ch2CustomHooks() {
  const [isOn, toggle] = useToggle(false)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🛠️ 2.6 自定义 Hook</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        自定义 Hook 让你提取组件逻辑为可复用函数。命名以 <Text code>use</Text> 开头。
      </Paragraph>

      <Card title="💡 自定义 Hook 规则" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 命名必须以 use 开头
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  
  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  
  return [value, setStoredValue]
}

// 使用
const [name, setName] = useLocalStorage('name', '')`}</pre>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text strong>✅ 规则：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm">
              <li>函数名以 <Text code>use</Text> 开头</li>
              <li>内部可以调用其他 Hook</li>
              <li>只在 React 函数组件或自定义 Hook 中调用</li>
              <li>返回组件需要的值和方法</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card title="💾 useLocalStorage - 持久化状态" className="mb-6">
        <LocalStorageDemo />
      </Card>

      <Card title="⏱️ useDebounce - 防抖" className="mb-6">
        <DebounceDemo />
      </Card>

      <Card title="📐 useWindowSize - 窗口尺寸" className="mb-6">
        <WindowSizeDemo />
      </Card>

      <Card title="🔀 useToggle - 开关切换" className="mb-6">
        <div className="p-4 bg-indigo-50 rounded-lg text-center">
          <div
            className={`inline-block px-8 py-4 rounded-xl cursor-pointer transition-all text-xl font-bold ${
              isOn ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}
            onClick={toggle}
          >
            {isOn ? 'ON ✅' : 'OFF ❌'}
          </div>
        </div>
      </Card>

      <Card title="🌐 useFetch - 数据获取" className="mb-6">
        <FetchDemo />
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>自定义 Hook 提取可复用逻辑，减少代码重复</li>
          <li>命名以 <Text code>use</Text> 开头，遵循 Hook 规则</li>
          <li>常用自定义 Hook：useLocalStorage、useDebounce、useFetch、useToggle</li>
          <li>自定义 Hook 之间可以组合使用</li>
          <li>{"返回值设计要简洁，通常返回 [value, setter] 或 { value, method }"}</li>
          <li>TypeScript 泛型让自定义 Hook 更灵活</li>
        </ul>
      </Card>
    </div>
  )
}
