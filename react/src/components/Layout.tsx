import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, Typography, theme } from 'antd'
import {
  BookOutlined,
  CodeOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
  FormatPainterOutlined,
  RocketOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

const { Sider, Content, Header } = AntLayout
const { Title } = Typography

const menuItems = [
  {
    key: 'ch1',
    icon: <BookOutlined />,
    label: 'Ch1: React 核心基础',
    children: [
      { key: '/ch1/jsx', label: <Link to="/ch1/jsx">JSX 语法</Link> },
      { key: '/ch1/components', label: <Link to="/ch1/components">组件基础</Link> },
      { key: '/ch1/props', label: <Link to="/ch1/props">Props 传参</Link> },
      { key: '/ch1/state', label: <Link to="/ch1/state">State 状态</Link> },
      { key: '/ch1/lifecycle', label: <Link to="/ch1/lifecycle">生命周期</Link> },
      { key: '/ch1/events', label: <Link to="/ch1/events">事件处理</Link> },
      { key: '/ch1/lists', label: <Link to="/ch1/lists">列表与 Key</Link> },
      { key: '/ch1/error-boundary', label: <Link to="/ch1/error-boundary">Error Boundaries</Link> },
    ],
  },
  {
    key: 'ch2',
    icon: <CodeOutlined />,
    label: 'Ch2: React Hooks 深入',
    children: [
      { key: '/ch2/useeffect', label: <Link to="/ch2/useeffect">useEffect</Link> },
      { key: '/ch2/useref', label: <Link to="/ch2/useref">useRef</Link> },
      { key: '/ch2/usememo', label: <Link to="/ch2/usememo">useMemo</Link> },
      { key: '/ch2/usecallback', label: <Link to="/ch2/usecallback">useCallback</Link> },
      { key: '/ch2/usecontext', label: <Link to="/ch2/usecontext">useContext</Link> },
      { key: '/ch2/custom-hooks', label: <Link to="/ch2/custom-hooks">自定义 Hook</Link> },
      { key: '/ch2/react19', label: <Link to="/ch2/react19">React 19 新特性</Link> },
      { key: '/ch2/router', label: <Link to="/ch2/router">React Router</Link> },
      { key: '/ch2/typescript', label: <Link to="/ch2/typescript">TypeScript 模式</Link> },
    ],
  },
  {
    key: 'ch3',
    icon: <AppstoreOutlined />,
    label: 'Ch3: Ant Design 组件',
    children: [
      { key: '/ch3/button', label: <Link to="/ch3/button">Button 按钮</Link> },
      { key: '/ch3/input', label: <Link to="/ch3/input">Input 输入框</Link> },
      { key: '/ch3/select', label: <Link to="/ch3/select">Select 选择器</Link> },
      { key: '/ch3/datepicker', label: <Link to="/ch3/datepicker">DatePicker 日期</Link> },
      { key: '/ch3/checkbox-radio', label: <Link to="/ch3/checkbox-radio">Checkbox/Radio</Link> },
      { key: '/ch3/upload', label: <Link to="/ch3/upload">Upload 上传</Link> },
      { key: '/ch3/other-entry', label: <Link to="/ch3/other-entry">Slider/Rate/Switch</Link> },
      { key: '/ch3/form', label: <Link to="/ch3/form">Form 表单</Link> },
      { key: '/ch3/table', label: <Link to="/ch3/table">Table 表格</Link> },
      { key: '/ch3/modal', label: <Link to="/ch3/modal">Modal 弹窗</Link> },
      { key: '/ch3/message', label: <Link to="/ch3/message">Message 消息</Link> },
      { key: '/ch3/layout', label: <Link to="/ch3/layout">Layout 布局</Link> },
    ],
  },
  {
    key: 'ch4',
    icon: <ThunderboltOutlined />,
    label: 'Ch4: Ant Design 进阶',
    children: [
      { key: '/ch4/card-tabs', label: <Link to="/ch4/card-tabs">Card/Tabs</Link> },
      { key: '/ch4/tooltip-popover', label: <Link to="/ch4/tooltip-popover">Tooltip/Popover</Link> },
      { key: '/ch4/list-descriptions', label: <Link to="/ch4/list-descriptions">List/Descriptions</Link> },
      { key: '/ch4/badge-avatar-timeline', label: <Link to="/ch4/badge-avatar-timeline">Badge/Avatar/Tag</Link> },
      { key: '/ch4/tree-timeline', label: <Link to="/ch4/tree-timeline">Tree/Timeline</Link> },
      { key: '/ch4/notification', label: <Link to="/ch4/notification">Notification</Link> },
      { key: '/ch4/drawer', label: <Link to="/ch4/drawer">Drawer 抽屉</Link> },
      { key: '/ch4/alert-result', label: <Link to="/ch4/alert-result">Alert/Result</Link> },
      { key: '/ch4/progress-spin', label: <Link to="/ch4/progress-spin">Progress/Skeleton/Spin</Link> },
      { key: '/ch4/menu-dropdown', label: <Link to="/ch4/menu-dropdown">Menu/Dropdown</Link> },
      { key: '/ch4/pagination-steps', label: <Link to="/ch4/pagination-steps">Pagination/Steps</Link> },
      { key: '/ch4/theme', label: <Link to="/ch4/theme">主题定制</Link> },
      { key: '/ch4/intl', label: <Link to="/ch4/intl">国际化</Link> },
      { key: '/ch4/form-advanced', label: <Link to="/ch4/form-advanced">表单进阶</Link> },
      { key: '/ch4/protable', label: <Link to="/ch4/protable">ProTable</Link> },
    ],
  },
  {
    key: 'ch5',
    icon: <FormatPainterOutlined />,
    label: 'Ch5: TailwindCSS 核心',
    children: [
      { key: '/ch5/utility-first', label: <Link to="/ch5/utility-first">原子化思维</Link> },
      { key: '/ch5/layout', label: <Link to="/ch5/layout">布局系统</Link> },
      { key: '/ch5/typography', label: <Link to="/ch5/typography">排版工具类</Link> },
      { key: '/ch5/backgrounds-borders', label: <Link to="/ch5/backgrounds-borders">背景与边框</Link> },
      { key: '/ch5/filters-transforms', label: <Link to="/ch5/filters-transforms">滤镜与变换</Link> },
      { key: '/ch5/interactivity', label: <Link to="/ch5/interactivity">交互性</Link> },
      { key: '/ch5/responsive', label: <Link to="/ch5/responsive">响应式设计</Link> },
      { key: '/ch5/dark-mode', label: <Link to="/ch5/dark-mode">暗黑模式</Link> },
      { key: '/ch5/animation', label: <Link to="/ch5/animation">动画过渡</Link> },
      { key: '/ch5/custom', label: <Link to="/ch5/custom">自定义配置</Link> },
    ],
  },
  {
    key: 'ch6',
    icon: <RocketOutlined />,
    label: 'Ch6: 三者融合实战',
    children: [
      { key: '/ch6/dashboard', label: <Link to="/ch6/dashboard">数据仪表盘</Link> },
      { key: '/ch6/admin', label: <Link to="/ch6/admin">后台管理系统</Link> },
    ],
  },
  {
    key: 'ch7',
    icon: <CrownOutlined />,
    label: 'Ch7: 大师之路',
    children: [
      { key: '/ch7/perf', label: <Link to="/ch7/perf">性能优化</Link> },
      { key: '/ch7/pattern', label: <Link to="/ch7/pattern">设计模式</Link> },
      { key: '/ch7/deploy', label: <Link to="/ch7/deploy">部署与工程化</Link> },
      { key: '/ch7/testing', label: <Link to="/ch7/testing">测试基础</Link> },
    ],
  },
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { token } = theme.useToken()

  const openKeys = (() => {
    const path = location.pathname
    if (path.startsWith('/ch1')) return ['ch1']
    if (path.startsWith('/ch2')) return ['ch2']
    if (path.startsWith('/ch3')) return ['ch3']
    if (path.startsWith('/ch4')) return ['ch4']
    if (path.startsWith('/ch5')) return ['ch5']
    if (path.startsWith('/ch6')) return ['ch6']
    if (path.startsWith('/ch7')) return ['ch7']
    return []
  })()

  return (
    <AntLayout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        className="!bg-white border-r border-gray-200 overflow-auto"
        style={{ borderRight: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <Link to="/" className="no-underline">
            <Title level={4} className="!mb-0 !text-indigo-600">
              {collapsed ? 'R+A+T' : 'React 大师课'}
            </Title>
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={openKeys}
          items={menuItems}
          className="border-r-0"
        />
      </Sider>
      <AntLayout>
        <Header className="!bg-white !px-4 flex items-center border-b border-gray-200 h-14">
          <span
            className="text-xl cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <span className="ml-4 text-gray-500 text-sm">
            React + Ant Design + TailwindCSS 交互式教程 · {menuItems.reduce((sum, ch) => sum + (ch.children?.length || 0), 0)} 课时
          </span>
        </Header>
        <Content className="p-6 bg-gray-50 min-h-[calc(100vh-56px)] overflow-auto">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
