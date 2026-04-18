import { useState, useMemo } from 'react'
import { Typography, Card, Divider, InputNumber, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

function expensiveCalculation(n: number): number {
  let result = 0
  for (let i = 0; i < n * 1000000; i++) {
    result += Math.sqrt(i)
  }
  return Math.round(result)
}

interface Item {
  id: number
  name: string
  category: string
  price: number
}

const mockItems: Item[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `商品 ${i + 1}`,
  category: ['电子', '服装', '食品', '图书'][i % 4],
  price: Math.round(Math.random() * 1000),
}))

export default function Ch2UseMemo() {
  const [number, setNumber] = useState(10)
  const [dark, setDark] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const calculation = useMemo(() => expensiveCalculation(number), [number])

  const filteredItems = useMemo(() => {
    console.log('过滤计算执行...')
    return mockItems.filter(item => {
      const matchCategory = filterCategory === 'all' || item.category === filterCategory
      const matchSearch = item.name.includes(searchTerm)
      return matchCategory && matchSearch
    })
  }, [filterCategory, searchTerm])

  const stats = useMemo(() => ({
    total: filteredItems.length,
    avgPrice: filteredItems.length > 0
      ? Math.round(filteredItems.reduce((sum, item) => sum + item.price, 0) / filteredItems.length)
      : 0,
    maxPrice: filteredItems.length > 0 ? Math.max(...filteredItems.map(i => i.price)) : 0,
  }), [filteredItems])

  const theme = { backgroundColor: dark ? '#333' : '#fff', color: dark ? '#fff' : '#333' }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧠 2.3 useMemo</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        useMemo 缓存计算结果，只在依赖项变化时重新计算。避免在每次渲染时执行昂贵的计算。
      </Paragraph>

      <Card title="💡 useMemo 基础" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// 只有 a 或 b 变化时，才会重新计算
// 否则返回缓存的值`}</pre>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <Text strong>⚠️ useMemo 是性能优化手段，不是语义保证。React 可能选择"忘记"某些 memoized 值。</Text>
        </div>
      </Card>

      <Card title="🔬 昂贵计算缓存" className="mb-6">
        <Paragraph>切换暗黑模式不会重新计算（因为 number 没变）：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [number, setNumber] = useState(10)
const [dark, setDark] = useState(false)

// 昂贵计算，只依赖 number
const calculation = useMemo(() => {
  return expensiveCalculation(number)  // 耗时操作
}, [number])

// 切换 dark 不会重新执行 expensiveCalculation！`}</pre>
        </div>
        <div className="p-4 rounded-lg transition-colors" style={theme}>
          <div className="flex items-center gap-4 mb-3">
            <Text style={{ color: theme.color }}>Number:</Text>
            <InputNumber min={1} max={50} value={number} onChange={(v) => setNumber(v ?? 1)} />
            <button
              className="px-3 py-1 rounded bg-gray-500 text-white"
              onClick={() => setDark(!dark)}
            >
              {dark ? '☀️ 亮色' : '🌙 暗色'}
            </button>
          </div>
          <div style={{ color: theme.color }}>
            计算结果: <Text strong style={{ color: theme.color }}>{calculation}</Text>
          </div>
        </div>
      </Card>

      <Card title="📊 列表过滤缓存" className="mb-6">
        <Paragraph>useMemo 常用于缓存过滤/排序后的列表：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const filteredItems = useMemo(() => {
  return items.filter(item => {
    const matchCategory = category === 'all' || item.category === category
    const matchSearch = item.name.includes(searchTerm)
    return matchCategory && matchSearch
  })
}, [category, searchTerm])

const stats = useMemo(() => ({
  total: filteredItems.length,
  avgPrice: avg(filteredItems.map(i => i.price)),
}), [filteredItems])`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex gap-2 mb-3 flex-wrap">
            {['all', '电子', '服装', '食品', '图书'].map(cat => (
              <Tag
                key={cat}
                color={filterCategory === cat ? 'blue' : 'default'}
                className="cursor-pointer"
                onClick={() => setFilterCategory(cat)}
              >
                {cat === 'all' ? '全部' : cat}
              </Tag>
            ))}
            <input
              className="border rounded px-2 py-1 ml-2"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-white p-3 rounded text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
              <div className="text-xs text-gray-500">商品数量</div>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <div className="text-2xl font-bold text-green-600">¥{stats.avgPrice}</div>
              <div className="text-xs text-gray-500">平均价格</div>
            </div>
            <div className="bg-white p-3 rounded text-center">
              <div className="text-2xl font-bold text-orange-600">¥{stats.maxPrice}</div>
              <div className="text-xs text-gray-500">最高价格</div>
            </div>
          </div>
          <div className="max-h-40 overflow-auto">
            {filteredItems.slice(0, 10).map(item => (
              <div key={item.id} className="flex justify-between bg-white p-2 rounded mb-1 text-sm">
                <span>{item.name}</span>
                <span><Tag>{item.category}</Tag> ¥{item.price}</span>
              </div>
            ))}
            {filteredItems.length > 10 && (
              <div className="text-center text-gray-400 text-sm py-2">
                还有 {filteredItems.length - 10} 个...
              </div>
            )}
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>useMemo 缓存计算结果，避免不必要的重复计算</li>
          <li>依赖项变化时才重新计算，否则返回缓存值</li>
          <li>适用于：昂贵计算、引用相等性、大量数据过滤/排序</li>
          <li>不要过度使用 —— 简单计算不需要 memoize</li>
          <li>useMemo 是性能优化，不是语义保证</li>
        </ul>
      </Card>
    </div>
  )
}
