import { Typography, Card, Divider, Badge, Avatar, Tag, Space, Timeline } from 'antd'
import { ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const treeData = [
  { title: 'src', key: 'src', children: [
    { title: 'components', key: 'comp', children: [
      { title: 'Layout.tsx', key: 'layout', isLeaf: true },
      { title: 'Header.tsx', key: 'header', isLeaf: true },
    ]},
    { title: 'pages', key: 'pages', children: [
      { title: 'Home.tsx', key: 'home', isLeaf: true },
      { title: 'Admin.tsx', key: 'admin', isLeaf: true },
    ]},
    { title: 'App.tsx', key: 'app', isLeaf: true },
  ]},
]

export default function Ch4BadgeAvatarTimeline() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🏷️ 4.4 Badge 徽标 & Avatar 头像 & Timeline 时间轴</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Badge 展示状态徽标，Avatar 展示用户头像，Timeline 展示时间线 —— 三者是信息展示的常用辅助组件。
      </Paragraph>

      <Card title="💡 Badge 徽标" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Badge count={5}>
  <Button>消息</Button>
</Badge>

<Badge dot>       // 小红点
<Badge count={0} showZero>  // 显示0
<Badge status="success" text="成功" />
<Badge color="blue">`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Space size="large">
            <Badge count={5}><div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">📧</div></Badge>
            <Badge count={99}><div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">🔔</div></Badge>
            <Badge dot><div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">💬</div></Badge>
            <Badge count={0} showZero><div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">📋</div></Badge>
          </Space>
          <Divider className="!my-4" />
          <Space>
            <Badge status="success" text="成功" />
            <Badge status="error" text="错误" />
            <Badge status="default" text="默认" />
            <Badge status="processing" text="处理中" />
            <Badge status="warning" text="警告" />
          </Space>
        </div>
      </Card>

      <Card title="👤 Avatar 头像" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Avatar size={64} icon={<UserOutlined />} />
<Avatar src="https://..." />
<Avatar style={{ backgroundColor: '#f56a29' }}>U</Avatar>
<Avatar.Group maxCount={3}>
  <Avatar>A</Avatar>
  <Avatar>B</Avatar>
  <Avatar>C</Avatar>
  <Avatar>D</Avatar>
</Avatar.Group>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-4">
          <Space>
            <Avatar size={64} style={{ backgroundColor: '#6366f1' }}>U</Avatar>
            <Avatar size={48} style={{ backgroundColor: '#8b5cf6' }}>A</Avatar>
            <Avatar size={40} style={{ backgroundColor: '#06b6d4' }}>T</Avatar>
            <Avatar size={32} style={{ backgroundColor: '#10b981' }}>D</Avatar>
          </Space>
          <div>
            <Text strong>头像组：</Text>
            <Avatar.Group maxCount={3} maxStyle={{ backgroundColor: '#f56a29' }}>
              <Avatar style={{ backgroundColor: '#6366f1' }}>张</Avatar>
              <Avatar style={{ backgroundColor: '#8b5cf6' }}>李</Avatar>
              <Avatar style={{ backgroundColor: '#06b6d4' }}>王</Avatar>
              <Avatar style={{ backgroundColor: '#10b981' }}>赵</Avatar>
              <Avatar style={{ backgroundColor: '#f59e0b' }}>钱</Avatar>
            </Avatar.Group>
          </div>
          <div>
            <Text strong>带徽标头像：</Text>
            <Space className="ml-2">
              <Badge status="success" dot><Avatar style={{ backgroundColor: '#6366f1' }}>在</Avatar></Badge>
              <Badge status="default" dot><Avatar style={{ backgroundColor: '#9ca3af' }}>离</Avatar></Badge>
              <Badge status="processing" dot><Avatar style={{ backgroundColor: '#06b6d4' }}>忙</Avatar></Badge>
            </Space>
          </div>
        </div>
      </Card>

      <Card title="🕐 Timeline 时间轴" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Timeline
  items={[
    { color: 'green', children: '创建项目 2024-01-01' },
    { color: 'blue', children: '开发阶段' },
    { color: 'gray', children: '测试阶段' },
    { color: 'red', children: '修复 Bug' },
  ]}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <Timeline items={[
            { color: 'green', children: <><Tag color="green">完成</Tag> 项目初始化 <span className="text-gray-400 text-xs">2024-01-01</span></> },
            { color: 'green', children: <><Tag color="green">完成</Tag> 基础功能开发</> },
            { color: 'blue', children: <><Tag color="blue">进行中</Tag> 高级功能开发 <SyncOutlined spin className="text-blue-500 ml-1" /></> },
            { color: 'gray', children: <><Tag>待开始</Tag> 性能优化</> },
            { color: 'gray', children: <><Tag>待开始</Tag> 部署上线</> },
          ]} />
          <Timeline mode="right" items={[
            { color: 'green', children: '第一步：安装依赖' },
            { color: 'green', children: '第二步：配置项目' },
            { color: 'blue', children: '第三步：开发功能' },
            { color: 'red', children: '第四步：修复问题' },
            { color: 'gray', children: '第五步：部署上线' },
          ]} />
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Badge：count/dot/status 三种模式</li>
          <li>Avatar：文字/图片/图标，Avatar.Group 头像组</li>
          <li>Badge + Avatar 组合展示在线状态</li>
          <li>Timeline：时间线展示，支持 left/right/alternate 模式</li>
          <li>color 属性：green/blue/red/gray/custom</li>
        </ul>
      </Card>
    </div>
  )
}
