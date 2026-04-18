import { useState } from 'react'
import { Typography, Card, Divider, Tag, Button, Input, Checkbox } from 'antd'

const { Title, Paragraph, Text } = Typography

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Ch1Lists() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '学习 React 基础', completed: true },
    { id: 2, text: '学习 React Hooks', completed: false },
    { id: 3, text: '学习 Ant Design', completed: false },
  ])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    if (!newTodo.trim()) return
    setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const students = [
    { id: 1, name: '张三', score: 95, grade: 'A' },
    { id: 2, name: '李四', score: 82, grade: 'B' },
    { id: 3, name: '王五', score: 71, grade: 'C' },
    { id: 4, name: '赵六', score: 90, grade: 'A' },
    { id: 5, name: '钱七', score: 65, grade: 'D' },
  ]

  const gradeColor: Record<string, string> = {
    A: 'green', B: 'blue', C: 'orange', D: 'red',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📋 1.7 列表与 Key</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        使用 <Text code>map()</Text> 渲染列表，<Text code>key</Text> 帮助 React 识别哪些元素发生了变化。
      </Paragraph>

      <Card title="💡 map() 渲染列表" className="mb-6">
        <Paragraph>使用数组的 <Text code>map()</Text> 方法将数据数组转换为元素数组。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const students = [
  { id: 1, name: '张三', score: 95, grade: 'A' },
  { id: 2, name: '李四', score: 82, grade: 'B' },
  { id: 3, name: '王五', score: 71, grade: 'C' },
]

<ul>
  {students.map(student => (
    <li key={student.id}>
      {student.name} - {student.score}分 
      <Tag color={gradeColor[student.grade]}>
        {student.grade}
      </Tag>
    </li>
  ))}
</ul>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Text strong>运行结果：</Text>
          <ul className="mt-2 space-y-2">
            {students.map(student => (
              <li key={student.id} className="flex items-center gap-2 bg-white p-2 rounded">
                <span className="font-medium">{student.name}</span>
                <span className="text-gray-500">{student.score}分</span>
                <Tag color={gradeColor[student.grade]}>{student.grade}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card title="🔑 Key 的重要性" className="mb-6">
        <Paragraph>Key 帮助 React 高效地更新列表。没有 key，React 无法正确追踪元素的变化。</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// ✅ 正确：使用唯一 ID 作为 key
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// ❌ 错误：使用 index 作为 key（列表会增删时）
{items.map((item, index) => (
  <li key={index}>{item.name}</li>  
))}

// ❌ 错误：key 不唯一
{items.map(item => (
  <li key={item.type}>{item.name}</li>
))}`}</pre>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <Text strong>⚠️ Key 规则：</Text>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Key 在兄弟节点中必须唯一</li>
            <li>优先使用数据中的唯一 ID</li>
            <li>避免使用数组索引（当列表会增删排序时）</li>
            <li>Key 不会作为 props 传递给子组件</li>
          </ul>
        </div>
      </Card>

      <Card title="✅ 实战：Todo List" className="mb-6">
        <Paragraph>综合运用列表渲染、key、条件渲染和事件处理：</Paragraph>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <div className="flex gap-2 mb-3">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onPressEnter={addTodo}
              placeholder="添加新待办..."
            />
            <Button type="primary" onClick={addTodo}>添加</Button>
          </div>
          <div className="flex gap-2 mb-3">
            {(['all', 'active', 'completed'] as const).map(f => (
              <Button
                key={f}
                size="small"
                type={filter === f ? 'primary' : 'default'}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? '全部' : f === 'active' ? '未完成' : '已完成'}
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            {filteredTodos.length === 0 && (
              <p className="text-gray-400 text-center py-4">没有匹配的待办项</p>
            )}
            {filteredTodos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 bg-white p-2 rounded border">
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.text}
                </span>
                <Button size="small" danger onClick={() => deleteTodo(todo.id)}>删除</Button>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            共 {todos.length} 项，已完成 {todos.filter(t => t.completed).length} 项
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>使用 <Text code>map()</Text> 将数据数组转换为 JSX 元素数组</li>
          <li>每个列表项必须有唯一的 <Text code>key</Text></li>
          <li>优先使用数据 ID 作为 key，避免用索引</li>
          <li>列表增删时使用 <Text code>filter()</Text>、<Text code>map()</Text>、展开运算符</li>
          <li>条件渲染和列表渲染经常结合使用</li>
          <li>Key 只在兄弟节点间需要唯一，不需要全局唯一</li>
        </ul>
      </Card>
    </div>
  )
}
