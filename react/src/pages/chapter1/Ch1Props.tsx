import { useState } from 'react'
import { Typography, Card, Divider, Tag, Input, Switch, Slider } from 'antd'

const { Title, Paragraph, Text } = Typography

function UserProfile({ name, age, hobbies }: { name: string; age: number; hobbies: string[] }) {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <h3 className="text-lg font-bold text-indigo-700">{name}</h3>
      <p className="text-gray-600">年龄: {age}</p>
      <div className="flex gap-2 mt-2">
        {hobbies.map((hobby, i) => (
          <Tag key={i} color="blue">{hobby}</Tag>
        ))}
      </div>
    </div>
  )
}

function AlertBanner({ type, message }: { type: 'success' | 'warning' | 'error'; message: string }) {
  const colorMap = {
    success: 'bg-green-100 text-green-700 border-green-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    error: 'bg-red-100 text-red-700 border-red-300',
  }
  const iconMap = { success: '✅', warning: '⚠️', error: '❌' }

  return (
    <div className={`p-3 rounded-lg border ${colorMap[type]} flex items-center gap-2`}>
      <span>{iconMap[type]}</span>
      <span>{message}</span>
    </div>
  )
}

function ChildrenDemo({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="border-2 border-dashed border-purple-300 rounded-xl p-4 bg-purple-50">
      <h4 className="font-bold text-purple-700 mb-2">{title}</h4>
      <div>{children}</div>
    </div>
  )
}

export default function Ch1Props() {
  const [name, setName] = useState('小明')
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📨 1.3 Props 传参</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Props（Properties）是 React 中父组件向子组件传递数据的方式。Props 是只读的，子组件不能修改。
      </Paragraph>

      <Card title="💡 基本 Props 传递" className="mb-6">
        <Paragraph>父组件通过属性向子组件传递数据，子组件通过参数接收。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function UserProfile({ name, age, hobbies }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>年龄: {age}</p>
      <div>
        {hobbies.map((hobby, i) => (
          <Tag key={i}>{hobby}</Tag>
        ))}
      </div>
    </div>
  )
}

<UserProfile 
  name="张三" 
  age={25} 
  hobbies={['编程', '阅读', '游戏']} 
/>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果：</Text>
          <div className="mt-2">
            <UserProfile name="张三" age={25} hobbies={['编程', '阅读', '游戏']} />
          </div>
        </div>
      </Card>

      <Card title="🔀 Props 是只读的" className="mb-6">
        <Paragraph>Props 是单向数据流，子组件不能修改从父组件接收的 props。如果需要修改数据，应该使用 state。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// ❌ 错误：不能修改 props
function BadComponent({ name }) {
  name = '新名字' // 不要这样做！
  return <div>{name}</div>
}

// ✅ 正确：用 state 管理可变数据
function GoodComponent({ name }) {
  const [localName, setLocalName] = useState(name)
  return <div>{localName}</div>
}`}</pre>
        </div>
      </Card>

      <Card title="🎨 Props 实时联动" className="mb-6">
        <Paragraph>修改下面的控件，观察 props 如何实时传递给子组件：</Paragraph>
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-4">
            <Text strong className="w-20">姓名:</Text>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="max-w-xs" />
          </div>
          <div className="flex items-center gap-4">
            <Text strong className="w-20">暗黑模式:</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="flex items-center gap-4">
            <Text strong className="w-20">字体大小:</Text>
            <Slider min={12} max={32} value={fontSize} onChange={setFontSize} className="max-w-xs" />
          </div>
        </div>
        <div className={`mt-4 p-4 rounded-lg transition-all ${darkMode ? 'bg-gray-800 text-white' : 'bg-indigo-50'}`}>
          <Text strong style={{ fontSize }}>运行结果：</Text>
          <div className="mt-2" style={{ fontSize }}>
            你好, {name}! {darkMode ? '🌙' : '☀️'}
          </div>
        </div>
      </Card>

      <Card title="🎭 条件 Props 与联合类型" className="mb-6">
        <Paragraph>根据不同的 props 值，组件可以呈现不同的样式和行为。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function AlertBanner({ type, message }) {
  const colorMap = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  }
  return (
    <div className={\`p-3 rounded-lg \${colorMap[type]}\`}>
      {message}
    </div>
  )
}`}</pre>
        </div>
        <div className="mt-4 space-y-2">
          <AlertBanner type="success" message="操作成功！数据已保存。" />
          <AlertBanner type="warning" message="请注意，磁盘空间即将不足。" />
          <AlertBanner type="error" message="出错了！请检查网络连接。" />
        </div>
      </Card>

      <Card title="👶 children Props" className="mb-6">
        <Paragraph><Text code>children</Text> 是一个特殊的 prop，用于在组件标签之间传递内容。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`function Card({ children, title }) {
  return (
    <div className="border-2 border-dashed border-purple-300 
      rounded-xl p-4 bg-purple-50">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  )
}

<Card title="我的卡片">
  <p>这是通过 children 传入的内容</p>
  <button>可以放任何元素</button>
</Card>`}</pre>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ChildrenDemo title="卡片 A">
            <p className="text-purple-600">这是卡片 A 的内容</p>
            <button className="mt-2 px-3 py-1 bg-purple-500 text-white rounded">按钮</button>
          </ChildrenDemo>
          <ChildrenDemo title="卡片 B">
            <ul className="list-disc pl-4 text-purple-600">
              <li>项目 1</li>
              <li>项目 2</li>
              <li>项目 3</li>
            </ul>
          </ChildrenDemo>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Props 是父组件向子组件传递数据的方式</li>
          <li>Props 是只读的，子组件不能修改（单向数据流）</li>
          <li>可以使用解构赋值 <Text code>{'{ name, age }'}</Text> 简化代码</li>
          <li><Text code>children</Text> 是特殊 prop，用于传递组件内容</li>
          <li>TypeScript 中可以为 Props 定义类型接口</li>
          <li>默认值可以通过默认参数 <Text code>='默认值'</Text> 设置</li>
        </ul>
      </Card>
    </div>
  )
}
