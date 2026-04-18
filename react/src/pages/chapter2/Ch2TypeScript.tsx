import { useState } from 'react'
import { Typography, Card, Space, Button, Tag, Divider, Alert, Row, Col, Input, Switch, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ApiResponse<T> {
  data: T | null
  status: Status
  message: string
}

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

function GenericApiDemo() {
  const [response, setResponse] = useState<ApiResponse<User[]>>({
    data: null,
    status: 'idle',
    message: '',
  })

  const fetchData = () => {
    setResponse({ data: null, status: 'loading', message: '加载中...' })
    setTimeout(() => {
      const mockData: User[] = [
        { id: 1, name: '张三', email: 'zhang@example.com', role: 'admin' },
        { id: 2, name: '李四', email: 'li@example.com', role: 'user' },
        { id: 3, name: '王五', email: 'wang@example.com', role: 'guest' },
      ]
      setResponse({ data: mockData, status: 'success', message: '获取成功' })
    }, 1000)
  }

  return (
    <Card size="small" title="泛型接口：ApiResponse<T>">
      <Button size="small" type="primary" onClick={fetchData}>模拟请求</Button>
      <div className="mt-2">
        <Tag color={response.status === 'success' ? 'green' : response.status === 'loading' ? 'blue' : response.status === 'error' ? 'red' : 'default'}>
          {response.status}
        </Tag>
        {response.data && (
          <div className="mt-1 text-sm">
            {response.data.map(u => (
              <div key={u.id}>{u.name} - {u.email} - <Tag color={u.role === 'admin' ? 'red' : u.role === 'user' ? 'blue' : 'default'}>{u.role}</Tag></div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

type EventName = 'click' | 'change' | 'submit' | 'focus' | 'blur'

interface EventHandler<T extends EventName> {
  type: T
  timestamp: number
  data: T extends 'change' ? string : T extends 'click' ? { x: number; y: number } : undefined
}

const typeCheckResults = [
  { code: 'const x: number = 42', valid: true, note: '基础类型注解' },
  { code: 'const name: string = "React"', valid: true, note: '字符串类型' },
  { code: 'const list: string[] = ["a", "b"]', valid: true, note: '数组类型' },
  { code: 'const tuple: [string, number] = ["age", 25]', valid: true, note: '元组类型' },
  { code: 'const any: any = "dangerous"', valid: true, note: 'any 绕过检查，应避免' },
  { code: 'const unknown: unknown = "safe"', valid: true, note: 'unknown 安全的 any' },
  { code: 'const x: number = "42"', valid: false, note: '类型不匹配' },
  { code: 'const obj: { name: string } = {}', valid: false, note: '缺少 name 属性' },
]

const utilityTypes = [
  { type: 'Partial<T>', desc: '所有属性变为可选', example: 'Partial<User>' },
  { type: 'Required<T>', desc: '所有属性变为必填', example: 'Required<User>' },
  { type: 'Pick<T, K>', desc: '只保留指定属性', example: 'Pick<User, "id" | "name">' },
  { type: 'Omit<T, K>', desc: '排除指定属性', example: 'Omit<User, "email">' },
  { type: 'Record<K, V>', desc: '键值对映射', example: 'Record<string, number>' },
  { type: 'ReturnType<T>', desc: '获取函数返回类型', example: 'ReturnType<typeof fn>' },
  { type: 'Parameters<T>', desc: '获取函数参数类型', example: 'Parameters<typeof fn>' },
  { type: 'Exclude<U, E>', desc: '从联合类型中排除', example: 'Exclude<"a"|"b", "a">' },
  { type: 'Extract<U, E>', desc: '从联合类型中提取', example: 'Extract<"a"|"b", "a">' },
  { type: 'NonNullable<T>', desc: '排除 null/undefined', example: 'NonNullable<string|null>' },
]

export default function Ch2TypeScript() {
  const [strictMode, setStrictMode] = useState(true)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📘 TypeScript 核心模式</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TypeScript 不是"给 JS 加类型注解"这么简单。它的核心价值是：<Text strong>在编译期捕获错误，用类型系统表达业务规则</Text>。
      </Paragraph>

      <Card title="为什么需要 TypeScript" className="mb-6">
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="❌ 没有 TS" className="h-full" style={{ borderColor: '#ef4444' }}>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>运行时才发现 <Text code>undefined is not a function</Text></li>
                <li>重构时漏改的地方不会报错</li>
                <li>函数参数含义靠注释或猜</li>
                <li>自动补全不完整</li>
                <li>多人协作时接口约定模糊</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="✅ 有 TS" className="h-full" style={{ borderColor: '#10b981' }}>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>编辑器实时标红类型错误</li>
                <li>重构时所有引用自动更新</li>
                <li>函数签名就是最好的文档</li>
                <li>精准的智能提示和补全</li>
                <li>接口变更立即影响所有调用方</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="基础类型速查" className="mb-6">
        <Table
          size="small"
          pagination={false}
          dataSource={typeCheckResults}
          columns={[
            { title: '代码', dataIndex: 'code', key: 'code', render: (code: string) => <Text code>{code}</Text> },
            { title: '有效', dataIndex: 'valid', key: 'valid', render: (v: boolean) => v ? <CheckCircleOutlined style={{ color: '#10b981' }} /> : <CloseCircleOutlined style={{ color: '#ef4444' }} /> },
            { title: '说明', dataIndex: 'note', key: 'note' },
          ]}
        />
      </Card>

      <Card title="接口与类型别名" className="mb-6">
        <Paragraph className="mb-4">
          <Text strong>interface</Text> vs <Text strong>type</Text> 的选择：
        </Paragraph>
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="interface（推荐）" className="bg-blue-50">
              <pre className="text-sm !mb-0">{`interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string  // 可选属性
  readonly createdAt: Date  // 只读
}

// 可以声明合并
interface User {
  phone?: string
}`}</pre>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="type（更灵活）" className="bg-purple-50">
              <pre className="text-sm !mb-0">{`type Status = 'idle' | 'loading' | 'success' | 'error'

type ApiResponse<T> = {
  data: T | null
  status: Status
  message: string
}

// 联合类型、交叉类型、映射类型
// 只有 type 能做这些`}</pre>
            </Card>
          </Col>
        </Row>
        <Alert
          type="info"
          message="选择原则"
          description="定义对象形状用 interface（可继承、可声明合并）；定义联合类型、交叉类型、映射类型用 type。React 组件 Props 用 interface。"
          className="mt-3"
        />
      </Card>

      <Card title="泛型：类型级别的函数" className="mb-6">
        <Paragraph className="mb-4">
          泛型的本质：<Text strong>类型参数化</Text>。就像函数参数化值一样，泛型参数化类型。
        </Paragraph>
        <GenericApiDemo />
        <Divider />
        <Card size="small" className="bg-gray-50">
          <pre className="text-sm !mb-0">{`// 泛型函数
function identity<T>(arg: T): T { return arg }
identity<string>("hello")  // 类型: string
identity(42)               // 自动推断: number

// 泛型约束
interface HasId { id: number }
function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id)
}

// 条件类型
type IsString<T> = T extends string ? true : false
type A = IsString<string>  // true
type B = IsString<number>  // false`}</pre>
        </Card>
      </Card>

      <Card title="内置工具类型" className="mb-6">
        <Paragraph className="mb-4">
          TypeScript 内置了 20+ 工具类型，掌握最常用的 10 个就能覆盖 90% 场景：
        </Paragraph>
        <Table
          size="small"
          pagination={false}
          dataSource={utilityTypes}
          columns={[
            { title: '工具类型', dataIndex: 'type', key: 'type', render: (t: string) => <Text code>{t}</Text> },
            { title: '说明', dataIndex: 'desc', key: 'desc' },
            { title: '示例', dataIndex: 'example', key: 'example', render: (e: string) => <Text code>{e}</Text> },
          ]}
        />
      </Card>

      <Card title="React + TypeScript 实战模式" className="mb-6">
        <Card size="small" className="bg-gray-50 mb-3">
          <pre className="text-sm !mb-0">{`// 1. 组件 Props 类型
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ variant, size = 'medium', ...props }) => {
  // ...
}

// 2. useState 类型推断
const [count, setCount] = useState<number>(0)        // 显式
const [name, setName] = useState('')                  // 自动推断 string
const [user, setUser] = useState<User | null>(null)   // 联合类型

// 3. useRef 类型
const inputRef = useRef<HTMLInputElement>(null)
const timerRef = useRef<ReturnType<typeof setInterval>>()

// 4. 事件处理
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

// 5. useReducer 类型
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + 1
    case 'decrement': return state - 1
    case 'set': return action.payload
  }
}

// 6. 泛型组件
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>{items.map(item => (
      <li key={keyExtractor(item)}>{renderItem(item)}</li>
    ))}</ul>
  )
}`}</pre>
        </Card>
      </Card>

      <Card title="严格模式配置" className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Switch checked={strictMode} onChange={setStrictMode} />
          <Text strong>strict: true</Text>
        </div>
        <Card size="small" className="bg-gray-50">
          <pre className="text-sm !mb-0">{`// tsconfig.json
{
  "compilerOptions": {
    "strict": true,              // 开启所有严格检查
    "noImplicitAny": true,       // 禁止隐式 any
    "strictNullChecks": true,    // null/undefined 需显式处理
    "strictFunctionTypes": true, // 函数类型严格协变
    "noUnusedLocals": true,      // 未使用变量报错
    "noUnusedParameters": true,  // 未使用参数报错
    "noImplicitReturns": true,   // 函数所有路径必须返回
    "noFallthroughCasesInSwitch": true  // switch 必须 break
  }
}`}</pre>
        </Card>
        <Alert
          type="warning"
          message="强烈建议开启 strict 模式"
          description="strict 模式虽然初期写代码会多一些类型声明，但它能在编译期捕获大量潜在 bug。项目越复杂，收益越大。"
          className="mt-3"
        />
      </Card>
    </div>
  )
}
