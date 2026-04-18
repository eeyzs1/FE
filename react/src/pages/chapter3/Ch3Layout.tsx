import { useState } from 'react'
import { Typography, Card, Divider, Layout as AntLayout, Menu, Button, Breadcrumb, Avatar, Dropdown } from 'antd'
import { HomeOutlined, SettingOutlined, UserOutlined, BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { Header, Sider, Content, Footer } = AntLayout

export default function Ch3Layout() {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: '仪表盘' },
    { key: '2', icon: <FileOutlined />, label: '文档管理', children: [
      { key: '2-1', label: '我的文档' },
      { key: '2-2', label: '共享文档' },
    ]},
    { key: '3', icon: <TeamOutlined />, label: '用户管理' },
    { key: '4', icon: <SettingOutlined />, label: '系统设置' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <Title level={2}>📐 3.7 Layout 布局</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Layout 提供了完整的页面布局方案：Header、Sider、Content、Footer。
      </Paragraph>

      <Card title="💡 Layout 组件体系" className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { comp: 'Layout', desc: '布局容器', color: 'indigo' },
            { comp: 'Header', desc: '顶部导航', color: 'blue' },
            { comp: 'Sider', desc: '侧边栏', color: 'green' },
            { comp: 'Content', desc: '内容区域', color: 'purple' },
            { comp: 'Footer', desc: '底部区域', color: 'orange' },
            { comp: 'Menu', desc: '导航菜单', color: 'cyan' },
            { comp: 'Breadcrumb', desc: '面包屑', color: 'pink' },
            { comp: 'Dropdown', desc: '下拉菜单', color: 'red' },
          ].map(item => (
            <div key={item.comp} className="p-2 bg-indigo-50 rounded text-center">
              <div className="font-mono text-xs font-bold text-indigo-700">{item.comp}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🏗️ 经典后台布局" className="mb-6">
        <Paragraph>下面是一个完整的后台管理系统布局演示：</Paragraph>
        <div className="mt-4 border rounded-xl overflow-hidden" style={{ height: 400 }}>
          <AntLayout className="h-full">
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={180}
              className="!bg-gray-900"
            >
              <div className="h-12 flex items-center justify-center text-white font-bold text-lg">
                {collapsed ? 'A' : 'Admin'}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
              />
            </Sider>
            <AntLayout>
              <Header className="!bg-white !px-4 flex items-center justify-between !h-12 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-lg cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </span>
                  <Breadcrumb items={[
                    { title: <><HomeOutlined /> 首页</> },
                    { title: '仪表盘' },
                  ]} />
                </div>
                <div className="flex items-center gap-3">
                  <Button shape="circle" icon={<BellOutlined />} size="small" />
                  <Dropdown menu={{ items: [
                    { key: '1', label: '个人中心' },
                    { key: '2', label: '设置' },
                    { type: 'divider' },
                    { key: '3', label: '退出登录', danger: true },
                  ]}}>
                    <Avatar icon={<UserOutlined />} className="cursor-pointer" />
                  </Dropdown>
                </div>
              </Header>
              <Content className="p-4 bg-gray-50 overflow-auto">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">仪表盘</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: '用户数', value: '1,234', color: '#4f46e5' },
                      { label: '订单数', value: '567', color: '#16a34a' },
                      { label: '收入', value: '¥89,012', color: '#ea580c' },
                    ].map(stat => (
                      <div key={stat.label} className="p-3 bg-gray-50 rounded text-center">
                        <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Content>
              <Footer className="!text-center !py-2 !bg-gray-50 text-xs text-gray-400">
                Ant Design Layout Demo ©2024
              </Footer>
            </AntLayout>
          </AntLayout>
        </div>
      </Card>

      <Card title="📋 常用布局模式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 经典后台布局
<Layout>
  <Sider collapsible />
  <Layout>
    <Header />
    <Content />
    <Footer />
  </Layout>
</Layout>

// 顶部导航布局
<Layout>
  <Header />
  <Content />
  <Footer />
</Layout>

// 双侧边栏布局
<Layout>
  <Sider />  // 一级导航
  <Layout>
    <Sider />  // 二级导航
    <Content />
  </Layout>
</Layout>`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Layout + Header + Sider + Content + Footer 组合使用</li>
          <li>Sider 支持 collapsible 折叠</li>
          <li>Menu 配合 Sider 使用，theme="dark" 暗色侧边栏</li>
          <li>Breadcrumb 面包屑导航，Dropdown 下拉菜单</li>
          <li>通过 CSS Grid/Flex + TailwindCSS 灵活调整布局</li>
          <li>响应式：Sider breakpoint 属性自动折叠</li>
        </ul>
      </Card>
    </div>
  )
}
