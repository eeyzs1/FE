import { useState } from 'react'
import { Typography, Card, Divider, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

function Greeting({ name }: { name: string }) {
  return <div className="p-3 bg-blue-50 rounded-lg text-blue-700">你好, {name}! 👋</div>
}

function Farewell({ name }: { name: string }) {
  return <div className="p-3 bg-orange-50 rounded-lg text-orange-700">再见, {name}! 👋</div>
}

function UserCard({ name, role, avatar }: { name: string; role: string; avatar: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
        {avatar}
      </div>
      <div>
        <div className="font-semibold text-gray-800">{name}</div>
        <Tag color={role === 'admin' ? 'red' : role === 'editor' ? 'blue' : 'green'}>{role}</Tag>
      </div>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <span className="text-2xl font-bold text-green-700">{count}</span>
      <div className="mt-2 flex gap-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => setCount(count + 1)}>+1</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => setCount(count - 1)}>-1</button>
        <button className="px-3 py-1 bg-gray-600 text-white rounded" onClick={() => setCount(0)}>重置</button>
      </div>
    </div>
  )
}

export default function Ch1Components() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧩 1.2 组件基础</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        组件是 React 的核心构建块。它让你将 UI 拆分为独立、可复用的代码片段。
      </Paragraph>

      <Card title="💡 函数组件" className="mb-6">
        <Paragraph>React 推荐使用函数组件 + Hooks。函数组件是一个接收 props 并返回 JSX 的纯函数。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 最简单的函数组件
function Greeting({ name }) {
  return <div>你好, {name}! 👋</div>
}

// 使用箭头函数
const Farewell = ({ name }) => (
  <div>再见, {name}! 👋</div>
)`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Text strong>运行结果：</Text>
          <Greeting name="React 学习者" />
          <Farewell name="React 学习者" />
        </div>
      </Card>

      <Card title="🏗️ 组件组合" className="mb-6">
        <Paragraph>组件可以嵌套组合，构建复杂的 UI。这是 React 最强大的特性之一。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function UserCard({ name, role, avatar }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br 
        from-indigo-400 to-purple-500 flex items-center 
        justify-center text-white text-xl font-bold">
        {avatar}
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <Tag color={role === 'admin' ? 'red' : 'green'}>
          {role}
        </Tag>
      </div>
    </div>
  )
}`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Text strong>运行结果：</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <UserCard name="张三" role="admin" avatar="张" />
            <UserCard name="李四" role="editor" avatar="李" />
            <UserCard name="王五" role="user" avatar="王" />
          </div>
        </div>
      </Card>

      <Card title="📦 组件的独立性" className="mb-6">
        <Paragraph>每个组件拥有自己独立的状态，互不干扰。这是组件化的核心优势。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  )
}

// 两个 Counter 实例，状态完全独立
<Counter />
<Counter />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果（两个独立计数器）：</Text>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <Counter />
            <Counter />
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>组件名必须以大写字母开头（React 以此区分组件和 HTML 标签）</li>
          <li>函数组件是现代 React 的推荐写法</li>
          <li>组件必须返回一个根元素（可用 Fragment 包裹）</li>
          <li>组件可以嵌套组合，构建复杂 UI</li>
          <li>每个组件实例拥有独立的状态</li>
          <li>保持组件小而专注 —— 单一职责原则</li>
        </ul>
      </Card>
    </div>
  )
}
