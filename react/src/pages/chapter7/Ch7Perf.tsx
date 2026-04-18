import { Typography, Card, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch7Perf() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>⚡ 7.1 性能优化</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        掌握 React 性能优化的核心策略，让你的应用飞速运行。
      </Paragraph>

      <Card title="💡 性能优化策略" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🧠', title: 'React.memo', desc: '避免不必要的重渲染', color: 'indigo' },
            { icon: '💾', title: 'useMemo', desc: '缓存计算结果', color: 'green' },
            { icon: '🔄', title: 'useCallback', desc: '缓存函数引用', color: 'blue' },
            { icon: '📦', title: '懒加载', desc: 'React.lazy + Suspense', color: 'purple' },
            { icon: '🖼️', title: '虚拟列表', desc: '大数据量渲染优化', color: 'orange' },
            { icon: '🔑', title: 'Key 优化', desc: '正确的 key 减少 diff', color: 'red' },
          ].map(item => (
            <div key={item.title} className="p-3 bg-gray-50 rounded-lg flex items-start gap-3">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🧠 React.memo" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const MyComponent = memo(function MyComponent({ name }) {
  // 只有 name 变化时才重新渲染
  return <div>{name}</div>
})

// 自定义比较函数
const MyComponent = memo(({ name, age }) => {
  return <div>{name} - {age}</div>
}, (prevProps, nextProps) => {
  // 返回 true = 不重新渲染
  return prevProps.name === nextProps.name 
    && prevProps.age === nextProps.age
})`}</pre>
        </div>
      </Card>

      <Card title="📦 代码分割与懒加载" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { lazy, Suspense } from 'react'

// 懒加载组件
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// 使用
<Suspense fallback={<div>加载中...</div>}>
  <HeavyComponent />
</Suspense>

// 路由级懒加载
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Admin = lazy(() => import('./pages/Admin'))

<Route path="/dashboard" element={
  <Suspense fallback={<Spin />}>
    <Dashboard />
  </Suspense>
} />`}</pre>
        </div>
      </Card>

      <Card title="🖼️ 虚拟列表" className="mb-6">
        <Paragraph>当列表数据量很大时（1000+），使用虚拟列表只渲染可见区域：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 推荐库：react-window / react-virtuoso
import { FixedSizeList } from 'react-window'

<FixedSizeList
  height={400}
  width="100%"
  itemCount={10000}
  itemSize={35}
>
  {({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
</FixedSizeList>`}</pre>
        </div>
      </Card>

      <Card title="📋 性能分析工具" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Text strong>1. React DevTools Profiler</Text>
            <p className="text-sm text-gray-500 mt-1">Chrome 扩展，可视化组件渲染时间和原因</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <Text strong>2. Chrome Performance Tab</Text>
            <p className="text-sm text-gray-500 mt-1">录制性能，分析渲染瓶颈</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Text strong>3. React Strict Mode</Text>
            <p className="text-sm text-gray-500 mt-1">开发模式检测不安全的生命周期和副作用</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Text strong>4. Lighthouse</Text>
            <p className="text-sm text-gray-500 mt-1">综合性能、可访问性、SEO 评估</p>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-amber-50 to-orange-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>先测量，再优化 —— 不要过早优化</li>
          <li>React.memo 避免不必要的重渲染</li>
          <li>useMemo 缓存计算，useCallback 缓存函数</li>
          <li>React.lazy + Suspense 实现代码分割</li>
          <li>虚拟列表处理大数据量渲染</li>
          <li>正确的 key 帮助 React 高效 diff</li>
        </ul>
      </Card>
    </div>
  )
}
