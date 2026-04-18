import { useState } from 'react'
import { Typography, Card, Divider, Tag, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch1JSX() {
  const [count, setCount] = useState(0)

  const name = 'React 大师'
  const element = <h1 className="text-2xl font-bold text-indigo-600">你好, {name}!</h1>

  const formatName = (user: { firstName: string; lastName: string }) =>
    `${user.firstName} ${user.lastName}`

  const user = { firstName: '三', lastName: '张' }
  const greetingElement = <h2 className="text-xl text-purple-600">欢迎, {formatName(user)}!</h2>

  const isLoggedIn = true
  const conditionalElement = isLoggedIn
    ? <Tag color="green">已登录</Tag>
    : <Tag color="red">未登录</Tag>

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>
        📝 1.1 JSX 语法
      </Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        JSX 是 JavaScript 的语法扩展，它让你可以在 JS 中书写类似 HTML 的代码。
        React 通过 JSX 来描述 UI 应该是什么样子。
      </Paragraph>

      <Card title="💡 JSX 基本语法" className="mb-6">
        <Paragraph>JSX 看起来像 HTML，但它实际上是 JavaScript。浏览器不能直接识别 JSX，Babel 会将其转译为 <Text code>React.createElement()</Text> 调用。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// JSX 写法（推荐）
const element = <h1>Hello, world!</h1>

// 等价的 React.createElement 写法
const element = React.createElement(
  'h1', null, 'Hello, world!'
)`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果：</Text>
          <div className="mt-2">{element}</div>
        </div>
      </Card>

      <Card title="🔧 在 JSX 中使用表达式" className="mb-6">
        <Paragraph>你可以在 JSX 中使用大括号 <Text code>{'{}'}</Text> 嵌入任何 JavaScript 表达式。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const name = 'React 大师'
const element = <h1>你好, {name}!</h1>

const formatName = (user) => \`\${user.firstName} \${user.lastName}\`
const user = { firstName: '三', lastName: '张' }
const greeting = <h2>欢迎, {formatName(user)}!</h2>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果：</Text>
          <div className="mt-2">
            {element}
            {greetingElement}
          </div>
        </div>
      </Card>

      <Card title="🔀 JSX 中的条件渲染" className="mb-6">
        <Paragraph>在 JSX 中可以使用三元运算符、逻辑与（&&）等进行条件渲染。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const isLoggedIn = true

// 方式1：三元运算符
{isLoggedIn ? <Tag color="green">已登录</Tag> : <Tag color="red">未登录</Tag>}

// 方式2：逻辑与
{isLoggedIn && <span>欢迎回来！</span>}`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg flex items-center gap-4">
          <Text strong>运行结果：</Text>
          <Space>
            {conditionalElement}
            {isLoggedIn && <span>欢迎回来！</span>}
          </Space>
        </div>
      </Card>

      <Card title="🎨 JSX 中的样式" className="mb-6">
        <Paragraph>JSX 中使用 <Text code>className</Text> 代替 <Text code>class</Text>，内联样式使用驼峰命名对象。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 使用 className（推荐搭配 TailwindCSS）
<div className="text-red-500 font-bold p-4 bg-blue-100">

// 内联样式（驼峰命名）
<div style={{ backgroundColor: '#f0f0f0', fontSize: '16px' }}>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg flex gap-4">
          <div className="text-red-500 font-bold p-4 bg-blue-100 rounded">className 样式</div>
          <div style={{ backgroundColor: '#f0f0f0', fontSize: '16px' }} className="p-4 rounded">内联样式</div>
        </div>
      </Card>

      <Card title="⚡ JSX 中的事件处理" className="mb-6">
        <Paragraph>JSX 中的事件使用驼峰命名，如 <Text code>onClick</Text>、<Text code>onChange</Text>。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [count, setCount] = useState(0)

<button onClick={() => setCount(count + 1)}>
  点击了 {count} 次
</button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果：</Text>
          <div className="mt-2">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setCount(count + 1)}
            >
              点击了 {count} 次
            </button>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>JSX 是 JavaScript 的语法扩展，不是模板语言</li>
          <li>使用 <Text code>{'{}'}</Text> 在 JSX 中嵌入 JavaScript 表达式</li>
          <li>使用 <Text code>className</Text> 代替 <Text code>class</Text></li>
          <li>JSX 中的事件使用驼峰命名（onClick, onChange）</li>
          <li>JSX 会自动转义，防止 XSS 攻击</li>
          <li>JSX 必须有一个根元素，可以用 <Text code>{'<>'}</Text> Fragment 包裹</li>
        </ul>
      </Card>
    </div>
  )
}
