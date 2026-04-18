import { useState } from 'react'
import { Typography, Card, Space, Menu, Dropdown, Button, Tag, Divider, Row, Col } from 'antd'
import type { MenuProps } from 'antd'
import {
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MailOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

type MenuItem = Required<MenuProps>['items'][number]

export default function Ch4MenuDropdown() {
  const [current, setCurrent] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  const dropdownItems: MenuProps['items'] = [
    { key: '1', label: '个人资料', icon: <UserOutlined /> },
    { key: '2', label: '账户设置', icon: <SettingOutlined /> },
    { key: '3', label: '消息中心', icon: <MailOutlined /> },
    { type: 'divider' },
    { key: '4', label: '退出登录', icon: <LogoutOutlined />, danger: true },
  ]

  const contextMenuItems: MenuProps['items'] = [
    { key: 'copy', label: '复制' },
    { key: 'paste', label: '粘贴' },
    { key: 'cut', label: '剪切' },
    { type: 'divider' },
    { key: 'delete', label: '删除', danger: true },
  ]

  const sidebarItems: MenuItem[] = [
    { key: 'dashboard', icon: <PieChartOutlined />, label: '仪表盘' },
    { key: 'data', icon: <DesktopOutlined />, label: '数据管理', children: [
      { key: 'data-list', label: '数据列表' },
      { key: 'data-import', label: '数据导入' },
      { key: 'data-export', label: '数据导出' },
    ]},
    { key: 'system', icon: <SettingOutlined />, label: '系统设置', children: [
      { key: 'user-manage', label: '用户管理' },
      { key: 'role-manage', label: '角色管理' },
      { key: 'permission', label: '权限配置' },
    ]},
    { key: 'app', icon: <AppstoreOutlined />, label: '应用中心' },
    { key: 'container', icon: <ContainerOutlined />, label: '容器管理' },
  ]

  const cascaderItems: MenuProps['items'] = [
    { key: '1', label: '文件' },
    { key: '2', label: '编辑' },
    { key: '3', label: '视图', children: [
      { key: '3-1', label: '缩放', children: [
        { key: '3-1-1', label: '100%' },
        { key: '3-1-2', label: '125%' },
        { key: '3-1-3', label: '150%' },
        { key: '3-1-4', label: '200%' },
      ]},
      { key: '3-2', label: '主题', children: [
        { key: '3-2-1', label: '浅色' },
        { key: '3-2-2', label: '深色' },
        { key: '3-2-3', label: '跟随系统' },
      ]},
    ]},
    { key: '4', label: '帮助' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧭 Menu / Dropdown 导航与下拉</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Menu 是导航的核心组件，Dropdown 是轻量级操作面板。两者常配合使用构建完整的导航体系。
      </Paragraph>

      <Card title="Menu 顶部导航" className="mb-6">
        <Paragraph className="mb-4">
          顶部导航（horizontal）适合：功能模块少（3-7个）、内容型网站、需要突出品牌。
        </Paragraph>
        <Menu mode="horizontal" onClick={onClick} selectedKeys={[current]} items={[
          { key: 'dashboard', label: '仪表盘', icon: <PieChartOutlined /> },
          { key: 'projects', label: '项目管理', icon: <AppstoreOutlined /> },
          { key: 'team', label: '团队协作', icon: <UserOutlined /> },
          { key: 'settings', label: '设置', icon: <SettingOutlined /> },
        ]} />
        <Paragraph className="mt-2 text-sm text-gray-500">
          当前选中: <Tag color="blue">{current}</Tag>
        </Paragraph>
      </Card>

      <Card title="Menu 侧边栏导航" className="mb-6">
        <Paragraph className="mb-4">
          侧边导航（inline）适合：功能模块多、层级深、后台管理系统。
        </Paragraph>
        <Row gutter={24}>
          <Col span={collapsed ? 6 : 10}>
            <div className="border rounded p-2">
              <Button type="text" size="small" onClick={() => setCollapsed(!collapsed)} className="mb-2">
                {collapsed ? '展开' : '收起'}
              </Button>
              <Menu
                mode="inline"
                onClick={onClick}
                selectedKeys={[current]}
                inlineCollapsed={collapsed}
                items={sidebarItems}
              />
            </div>
          </Col>
          <Col span={collapsed ? 18 : 14}>
            <Card size="small" title="侧边栏要点">
              <ul className="list-disc pl-5 space-y-2">
                <li><Text strong>inline 模式</Text>：子菜单内嵌展开，适合侧边栏</li>
                <li><Text strong>vertical 模式</Text>：子菜单浮层展开，适合空间有限</li>
                <li><Text strong>inlineCollapsed</Text>：收起为图标模式，节省空间</li>
                <li>层级建议不超过 3 层，超过则考虑用 Tabs 或步骤条</li>
                <li>配合 <Text code>openKeys</Text> 控制展开项，<Text code>selectedKeys</Text> 控制选中项</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Dropdown 下拉菜单" className="mb-6">
        <Paragraph className="mb-4">
          Dropdown 适合：操作集合、右键菜单、用户菜单。核心优势是节省页面空间。
        </Paragraph>

        <Space wrap size="large">
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
            <Button>
              用户菜单 <DownOutlined />
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: contextMenuItems }} trigger={['contextMenu']}>
            <div className="w-48 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 cursor-pointer">
              右键点击此区域
            </div>
          </Dropdown>

          <Dropdown menu={{ items: cascaderItems }} trigger={['hover']}>
            <Button type="dashed">
              多级菜单 <DownOutlined />
            </Button>
          </Dropdown>
        </Space>

        <Divider />

        <Paragraph>
          <Text strong>触发方式：</Text>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><Text code>hover</Text> —— 悬停触发，适合导航菜单</li>
            <li><Text code>click</Text> —— 点击触发，适合操作菜单</li>
            <li><Text code>contextMenu</Text> —— 右键触发，适合自定义右键菜单</li>
          </ul>
        </Paragraph>
      </Card>

      <Card title="实战：用户头像下拉菜单" className="mb-6">
        <Paragraph className="mb-4">
          最常见的 Dropdown 场景：右上角用户头像 + 下拉操作。
        </Paragraph>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">A</div>
          <Dropdown menu={{
            items: [
              { key: 'profile', label: '个人中心', icon: <UserOutlined /> },
              { key: 'settings', label: '账号设置', icon: <SettingOutlined /> },
              { type: 'divider' },
              { key: 'logout', label: '退出登录', icon: <LogoutOutlined />, danger: true },
            ],
          }} trigger={['click']}>
            <span className="cursor-pointer text-indigo-600">
              Admin <DownOutlined />
            </span>
          </Dropdown>
        </div>
      </Card>

      <Card title="API 速查">
        <Paragraph>
          <Text strong>Menu 核心属性：</Text>
          <Text code>mode</Text>（horizontal/inline/vertical）、<Text code>items</Text>（菜单项）、
          <Text code>selectedKeys</Text>（选中项）、<Text code>openKeys</Text>（展开项）、
          <Text code>inlineCollapsed</Text>（收起模式）、<Text code>onClick</Text>（点击回调）
        </Paragraph>
        <Paragraph>
          <Text strong>Dropdown 核心属性：</Text>
          <Text code>menu</Text>（菜单配置）、<Text code>trigger</Text>（触发方式）、
          <Text code>placement</Text>（弹出位置）、<Text code>arrow</Text>（箭头）、
          <Text code>disabled</Text>（禁用）
        </Paragraph>
      </Card>
    </div>
  )
}
