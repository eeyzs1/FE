import { useState } from 'react'
import { Typography, Card, Space, Button, Tag, Divider, Alert, Row, Col, Input, Tabs } from 'antd'
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

function ParamsDemo() {
  const params = useParams()
  return (
    <Card size="small" title="useParams() - 获取路由参数">
      <Paragraph>
        当前路由参数: {Object.keys(params).length > 0 ? JSON.stringify(params) : '(无参数)'}
      </Paragraph>
      <Paragraph className="text-sm text-gray-500">
        在路由定义中使用 <Text code>{'/user/:id'}</Text>，然后通过 <Text code>useParams()</Text> 获取 <Text code>{'{id}'}</Text> 的值
      </Paragraph>
    </Card>
  )
}

function SearchParamsDemo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const sort = searchParams.get('sort') || 'default'

  return (
    <Card size="small" title="useSearchParams() - 查询参数">
      <Paragraph>
        当前查询参数: page=<Tag color="blue">{page}</Tag> sort=<Tag color="green">{sort}</Tag>
      </Paragraph>
      <Space className="mt-2">
        <Button size="small" onClick={() => setSearchParams({ page: String(Number(page) + 1), sort })}>下一页</Button>
        <Button size="small" onClick={() => setSearchParams({ page, sort: sort === 'asc' ? 'desc' : 'asc' })}>
          切换排序: {sort === 'asc' ? '降序' : '升序'}
        </Button>
        <Button size="small" onClick={() => setSearchParams({})}>清除参数</Button>
      </Space>
      <Paragraph className="text-sm text-gray-500 mt-2">
        <Text code>useSearchParams()</Text> 用于读写 URL 查询字符串（?key=value），类似 useState 但状态在 URL 中
      </Paragraph>
    </Card>
  )
}

function LocationDemo() {
  const location = useLocation()
  return (
    <Card size="small" title="useLocation() - 当前位置信息">
      <Paragraph className="!mb-1">
        <Text code>pathname</Text>: <Tag>{location.pathname}</Tag>
      </Paragraph>
      <Paragraph className="!mb-1">
        <Text code>search</Text>: <Tag>{location.search || '(空)'}</Tag>
      </Paragraph>
      <Paragraph className="!mb-1">
        <Text code>hash</Text>: <Tag>{location.hash || '(空)'}</Tag>
      </Paragraph>
      <Paragraph className="text-sm text-gray-500 mt-2">
        <Text code>useLocation()</Text> 返回当前 URL 信息对象，常用于路由守卫、页面追踪、面包屑
      </Paragraph>
    </Card>
  )
}

export default function Ch2Router() {
  const navigate = useNavigate()
  const [inputPath, setInputPath] = useState('')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧭 React Router 路由</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        React Router 是 React 生态的标准路由方案。核心思想：<Text strong>一切皆组件</Text>。
        路由不是配置文件，而是 JSX 中的组件声明。
      </Paragraph>

      <Card title="路由核心概念" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card size="small" className="h-full" style={{ borderColor: '#6366f1' }}>
              <Title level={5} className="!text-indigo-600 !mb-2">BrowserRouter</Title>
              <Paragraph className="text-sm !mb-0">
                路由容器，使用 HTML5 history API。整个应用只需在最外层包裹一次。
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" className="h-full" style={{ borderColor: '#8b5cf6' }}>
              <Title level={5} className="!text-purple-600 !mb-2">Routes / Route</Title>
              <Paragraph className="text-sm !mb-0">
                Routes 是路由容器，Route 定义路径与组件的映射。v6 用 Routes 替代了 Switch。
              </Paragraph>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" className="h-full" style={{ borderColor: '#06b6d4' }}>
              <Title level={5} className="!text-cyan-600 !mb-2">Link / NavLink</Title>
              <Paragraph className="text-sm !mb-0">
                声明式导航。Link 跳转，NavLink 带激活状态。替代 a 标签，不会刷新页面。
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="useNavigate - 编程式导航" className="mb-6">
        <Paragraph className="mb-4">
          <Text code>useNavigate()</Text> 返回导航函数，用于编程式跳转。替代了 v5 的 useHistory。
        </Paragraph>
        <Space wrap>
          <Button type="primary" onClick={() => navigate('/')}>跳转首页</Button>
          <Button onClick={() => navigate(-1)}>后退一步</Button>
          <Button onClick={() => navigate(1)}>前进一步</Button>
          <Button onClick={() => navigate('/ch1/jsx')}>跳转 JSX 课时</Button>
          <Button onClick={() => navigate('/ch1/jsx', { replace: true })}>替换跳转（无历史）</Button>
        </Space>
        <Divider />
        <div className="flex gap-2 items-center">
          <Input
            placeholder="输入路径，如 /ch2/useeffect"
            value={inputPath}
            onChange={(e) => setInputPath(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => { if (inputPath) navigate(inputPath) }}>跳转</Button>
        </div>
        <Paragraph className="text-sm text-gray-500 mt-2">
          <Text strong>navigate(path)</Text> 推入历史栈 | <Text strong>navigate(path, {'{replace: true}'})</Text> 替换当前记录 | <Text strong>navigate(-1)</Text> 回退
        </Paragraph>
      </Card>

      <Card title="路由 Hooks 实战" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SearchParamsDemo />
          </Col>
          <Col span={12}>
            <LocationDemo />
          </Col>
          <Col span={12}>
            <ParamsDemo />
          </Col>
        </Row>
      </Card>

      <Card title="嵌套路由与 Outlet" className="mb-6">
        <Paragraph className="mb-4">
          嵌套路由是 React Router v6 的核心特性。通过 <Text code>Outlet</Text> 组件在父路由中渲染子路由。
        </Paragraph>
        <Card size="small" className="bg-gray-50">
          <pre className="text-sm !mb-0">{`// 路由定义
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />        {/* 默认子路由 */}
    <Route path="about" element={<About />} />
    <Route path="users" element={<Users />}>
      <Route path=":id" element={<UserDetail />} />  {/* /users/123 */}
    </Route>
    <Route path="*" element={<NotFound />} />  {/* 404 */}
  </Route>
</Routes>

// Layout 组件
function Layout() {
  return (
    <div>
      <nav>导航栏</nav>
      <Outlet />  {/* 子路由在这里渲染 */}
    </div>
  )
}`}</pre>
        </Card>
        <Alert
          type="info"
          message="Outlet 的本质"
          description="Outlet 是一个插槽，告诉 React Router '子路由的内容渲染在这里'。这实现了布局复用——导航栏、侧边栏只写一次，内容区域动态切换。"
          className="mt-3"
        />
      </Card>

      <Card title="路由守卫模式" className="mb-6">
        <Paragraph className="mb-4">
          React Router 没有内置守卫，但可以通过包装组件实现：
        </Paragraph>
        <Card size="small" className="bg-gray-50">
          <pre className="text-sm !mb-0">{`function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuth()  // 自定义 hook
  const location = useLocation()

  if (!isAuthenticated) {
    // 保存来源路径，登录后跳回
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

// 使用
<Route path="/admin" element={
  <RequireAuth><Admin /></RequireAuth>
} />`}</pre>
        </Card>
      </Card>

      <Card title="懒加载路由" className="mb-6">
        <Paragraph className="mb-4">
          用 <Text code>React.lazy</Text> + <Text code>Suspense</Text> 实现路由级代码分割，减小首屏包体积。
        </Paragraph>
        <Card size="small" className="bg-gray-50">
          <pre className="text-sm !mb-0">{`const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

<Suspense fallback={<Spin />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Suspense>`}</pre>
        </Card>
        <Alert
          type="success"
          message="本教程的路由就是懒加载模式"
          description="查看 App.tsx，所有页面组件都用 lazy() 导入，实现按需加载。"
          className="mt-3"
        />
      </Card>

      <Card title="v5 → v6 迁移要点" className="mb-6">
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="v5 (旧)" className="bg-red-50">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><Text code>Switch</Text> 包裹路由</li>
                <li><Text code>component={'{About}'}</Text></li>
                <li><Text code>useHistory()</Text></li>
                <li><Text code>Redirect</Text></li>
                <li><Text code>{`<Route path="/:id" />`}</Text></li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="v6 (新)" className="bg-green-50">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><Text code>Routes</Text> 替代 Switch</li>
                <li><Text code>element={'{<About />'}</Text></li>
                <li><Text code>useNavigate()</Text></li>
                <li><Text code>Navigate</Text> 组件</li>
                <li><Text code>相对路径</Text>，无需前缀 /</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
