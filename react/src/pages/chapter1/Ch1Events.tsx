import { useState, useEffect, useRef } from 'react'
import { Typography, Card, Divider, Input, Button, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch1Events() {
  const [clickCount, setClickCount] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [keyInfo, setKeyInfo] = useState('')
  const [formValues, setFormValues] = useState({ username: '', email: '' })
  const lastClickRef = useRef<Date | null>(null)
  const [lastClickTime, setLastClickTime] = useState<string>('')

  useEffect(() => {
    if (lastClickRef.current) {
      setLastClickTime(lastClickRef.current.toLocaleTimeString())
    }
  }, [clickCount])

  const handleClick = () => {
    setClickCount(c => c + 1)
    lastClickRef.current = new Date()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyInfo(`按键: ${e.key}, Code: ${e.code}, Ctrl: ${e.ctrlKey}, Shift: ${e.shiftKey}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`提交数据: ${JSON.stringify(formValues, null, 2)}`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🖱️ 1.6 事件处理</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        React 事件处理与原生 DOM 事件类似，但使用驼峰命名和合成事件（SyntheticEvent）。
      </Paragraph>

      <Card title="💡 事件处理基础" className="mb-6">
        <Paragraph>React 事件采用驼峰命名，传入函数引用而非字符串。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// HTML 原生写法
<button onclick="handleClick()">

// React 写法（驼峰命名 + 函数引用）
<button onClick={handleClick}>

// 内联箭头函数（需要传参时使用）
<button onClick={(e) => handleClick(id, e)}>`}</pre>
        </div>
      </Card>

      <Card title="🖱️ 鼠标事件" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [clickCount, setClickCount] = useState(0)
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

<button onClick={(e) => setClickCount(c => c + 1)}>
  点击了 {clickCount} 次
</button>

<div onMouseMove={(e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  setMousePos({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  })
}}>
  鼠标位置: ({mousePos.x}, {mousePos.y})
</div>`}</pre>
        </div>
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg text-center">
            <Button type="primary" size="large" onClick={handleClick}>
              点击了 {clickCount} 次
            </Button>
            {lastClickTime && (
              <div className="mt-2 text-sm text-gray-500">
                上次点击: {lastClickTime}
              </div>
            )}
          </div>
          <div
            className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center cursor-crosshair relative overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-indigo-700">
                ({mousePos.x}, {mousePos.y})
              </div>
              <div className="text-sm text-indigo-500">移动鼠标查看坐标</div>
            </div>
            <div
              className="absolute w-4 h-4 bg-indigo-500 rounded-full pointer-events-none transition-all duration-75"
              style={{
                left: mousePos.x - 8,
                top: mousePos.y - 8,
              }}
            />
          </div>
        </div>
      </Card>

      <Card title="⌨️ 键盘事件" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const handleKeyDown = (e) => {
  console.log('按键:', e.key, 'Code:', e.code)
  console.log('Ctrl:', e.ctrlKey, 'Shift:', e.shiftKey)
}

<Input onKeyDown={handleKeyDown} />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Input
            placeholder="在这里按下键盘..."
            onKeyDown={handleKeyDown}
            className="mb-2"
          />
          {keyInfo && (
            <div className="p-2 bg-white rounded text-sm font-mono">{keyInfo}</div>
          )}
        </div>
      </Card>

      <Card title="📝 表单事件" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [formValues, setFormValues] = useState({ username: '', email: '' })

const handleChange = (field, value) => {
  setFormValues(prev => ({ ...prev, [field]: value }))
}

const handleSubmit = (e) => {
  e.preventDefault() // 阻止默认提交行为
  console.log(formValues)
}

<form onSubmit={handleSubmit}>
  <input value={formValues.username}
    onChange={(e) => handleChange('username', e.target.value)} />
  <input value={formValues.email}
    onChange={(e) => handleChange('email', e.target.value)} />
  <button type="submit">提交</button>
</form>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <Input
                value={formValues.username}
                onChange={(e) => setFormValues(prev => ({ ...prev, username: e.target.value }))}
                placeholder="输入用户名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">邮箱</label>
              <Input
                value={formValues.email}
                onChange={(e) => setFormValues(prev => ({ ...prev, email: e.target.value }))}
                placeholder="输入邮箱"
                type="email"
              />
            </div>
            <Space>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button onClick={() => setFormValues({ username: '', email: '' })}>重置</Button>
            </Space>
            <div className="mt-2 p-2 bg-white rounded text-sm font-mono">
              表单数据: {JSON.stringify(formValues)}
            </div>
          </form>
        </div>
      </Card>

      <Card title="🛡️ 事件修饰" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 阻止默认行为
e.preventDefault()

// 阻止事件冒泡
e.stopPropagation()

// React 17+ 事件委托到 root 节点（非 document）
// React 事件是合成事件，兼容所有浏览器`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>React 事件使用驼峰命名：onClick, onChange, onSubmit</li>
          <li>事件处理函数接收合成事件对象 <Text code>SyntheticEvent</Text></li>
          <li>需要传参时使用箭头函数：<Text code>{'onClick={() => fn(arg)}'}</Text></li>
          <li>表单提交要调用 <Text code>e.preventDefault()</Text></li>
          <li>受控组件：通过 value + onChange 控制 input 的值</li>
          <li>React 合成事件兼容所有浏览器，无需担心兼容性</li>
        </ul>
      </Card>
    </div>
  )
}
