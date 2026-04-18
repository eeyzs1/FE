import { Typography, Card, Divider, Tag } from 'antd'

const { Title, Paragraph } = Typography

export default function Ch7Pattern() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🏗️ 7.2 设计模式</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        掌握 React 企业级设计模式，构建可维护、可扩展的前端架构。
      </Paragraph>

      <Card title="💡 组件设计模式" className="mb-6">
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-bold text-indigo-700 mb-2">1. Compound Component（复合组件）</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`const Tabs = ({ children }) => { /* ... */ }
Tabs.Tab = ({ label, children }) => { /* ... */ }

<Tabs>
  <Tabs.Tab label="详情">内容1</Tabs.Tab>
  <Tabs.Tab label="评论">内容2</Tabs.Tab>
</Tabs>`}</pre>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">2. Render Props（渲染属性）</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`const Mouse = ({ render }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  // ... 监听鼠标位置
  return render(pos)
}

<Mouse render={({ x, y }) => (
  <div>鼠标位置: {x}, {y}</div>
)} />`}</pre>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">3. HOC（高阶组件）</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth()
    if (!user) return <Navigate to="/login" />
    return <WrappedComponent {...props} user={user} />
  }
}

const ProtectedPage = withAuth(Dashboard)`}</pre>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">4. Custom Hook 模式</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`const useTable = (fetchFn) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
  
  const refresh = async () => { /* ... */ }
  useEffect(() => { refresh() }, [pagination])
  
  return { data, loading, pagination, setPagination, refresh }
}`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📂 项目架构模式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`src/
├── components/          # 通用组件
│   ├── Layout/
│   ├── Table/
│   └── Form/
├── pages/              # 页面组件
│   ├── Dashboard/
│   └── Admin/
├── hooks/              # 自定义 Hooks
│   ├── useAuth.ts
│   ├── useTable.ts
│   └── useFetch.ts
├── services/           # API 服务
│   ├── user.ts
│   └── order.ts
├── stores/             # 状态管理
│   ├── useAuthStore.ts
│   └── useAppStore.ts
├── utils/              # 工具函数
│   ├── format.ts
│   └── validate.ts
├── types/              # TypeScript 类型
│   ├── api.d.ts
│   └── models.d.ts
└── constants/          # 常量
    └── index.ts`}</pre>
        </div>
      </Card>

      <Card title="🌟 状态管理选型" className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-2xl mb-2">🪝</div>
            <div className="font-bold text-blue-700">Context + Hooks</div>
            <div className="text-xs text-gray-500 mt-1">中小项目</div>
            <Tag color="blue" className="mt-2">简单</Tag>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-2xl mb-2">🐻</div>
            <div className="font-bold text-green-700">Zustand</div>
            <div className="text-xs text-gray-500 mt-1">中大项目</div>
            <Tag color="green" className="mt-2">推荐</Tag>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-bold text-purple-700">Redux Toolkit</div>
            <div className="text-xs text-gray-500 mt-1">大型项目</div>
            <Tag color="purple" className="mt-2">重量级</Tag>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-amber-50 to-orange-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>复合组件模式：通过 children 组合，而非 props 传递</li>
          <li>自定义 Hook 模式：提取可复用逻辑</li>
          <li>HOC 模式：增强组件能力（权限、日志等）</li>
          <li>清晰的目录结构是可维护性的基础</li>
          <li>状态管理选型：小项目 Context，大项目 Zustand</li>
          <li>单一职责原则：一个组件/Hook 只做一件事</li>
        </ul>
      </Card>
    </div>
  )
}
