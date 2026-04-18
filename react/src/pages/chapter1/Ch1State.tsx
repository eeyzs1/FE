import { useState } from 'react'
import { Typography, Card, Divider, Button, Input, Space, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch1State() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isToggled, setIsToggled] = useState(false)

  const addItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()])
      setInputValue('')
    }
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>💾 1.4 State 状态</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        State 是组件内部的私有数据，当 state 变化时，React 会自动重新渲染组件。
      </Paragraph>

      <Card title="💡 useState 基础" className="mb-6">
        <Paragraph><Text code>useState</Text> 是最基础的 Hook，用于在函数组件中添加状态。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [state, setState] = useState(initialValue)

// state: 当前状态值
// setState: 更新状态的函数
// initialValue: 初始值

// 示例
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)`}</pre>
        </div>
      </Card>

      <Card title="🔢 数字状态 - 计数器" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [count, setCount] = useState(0)

// 直接设置新值
<button onClick={() => setCount(0)}>重置</button>

// 基于当前值更新（函数式更新）
<button onClick={() => setCount(c => c + 1)}>+1</button>
<button onClick={() => setCount(c => c - 1)}>-1</button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-center">
          <div className="text-5xl font-bold text-indigo-600 mb-4">{count}</div>
          <Space>
            <Button type="primary" onClick={() => setCount(c => c + 1)}>+1</Button>
            <Button danger onClick={() => setCount(c => c - 1)}>-1</Button>
            <Button onClick={() => setCount(c => c + 10)}>+10</Button>
            <Button onClick={() => setCount(0)}>重置</Button>
          </Space>
        </div>
      </Card>

      <Card title="📝 字符串状态 - 实时输入" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [text, setText] = useState('')

<input value={text} onChange={(e) => setText(e.target.value)} />
<p>你输入了: {text}</p>
<p>字符数: {text.length}</p>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入一些文字..."
            className="mb-3"
          />
          <div className="flex gap-4 text-sm">
            <span>你输入了: <Text strong>{text || '(空)'}</Text></span>
            <span>字符数: <Text strong>{text.length}</Text></span>
            <span>字节数: <Text strong>{new Blob([text]).size}</Text></span>
          </div>
        </div>
      </Card>

      <Card title="📋 数组状态 - 待办列表" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [items, setItems] = useState([])

// 添加（展开运算符）
setItems([...items, newItem])

// 删除（filter）
setItems(items.filter((_, i) => i !== index))

// 修改（map）
setItems(items.map((item, i) => 
  i === index ? newItem : item
))`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <div className="flex gap-2 mb-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={addItem}
              placeholder="添加新项目..."
            />
            <Button type="primary" onClick={addItem}>添加</Button>
          </div>
          <div className="space-y-2">
            {items.length === 0 && (
              <p className="text-gray-400 text-center py-4">暂无项目，添加一个吧！</p>
            )}
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                <span>
                  <Tag color="blue">{index + 1}</Tag>
                  {item}
                </span>
                <Button size="small" danger onClick={() => removeItem(index)}>删除</Button>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              共 {items.length} 个项目
            </div>
          )}
        </div>
      </Card>

      <Card title="🔀 布尔状态 - 开关切换" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [isToggled, setIsToggled] = useState(false)

// 切换
setIsToggled(!isToggled)
// 或函数式
setIsToggled(prev => !prev)`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <div
            className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
              isToggled
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setIsToggled(!isToggled)}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{isToggled ? '🟢' : '🔴'}</div>
              <div className="text-xl font-bold">
                {isToggled ? '已开启' : '已关闭'}
              </div>
              <div className="text-sm mt-1 opacity-80">点击切换</div>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>State 是组件私有的，改变时会触发重新渲染</li>
          <li>不要直接修改 state，必须使用 setState</li>
          <li>State 更新是异步的，需要用函数式更新来基于旧值计算</li>
          <li>数组/对象更新时要用展开运算符 <Text code>...</Text> 创建新引用</li>
          <li>多个 state 值可以拆分为多个 useState 调用</li>
          <li>setState 传入相同的值时，React 会跳过渲染（浅比较）</li>
        </ul>
      </Card>
    </div>
  )
}
