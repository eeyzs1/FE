import { useState } from 'react'
import { Typography, Card, Divider, Tabs, Tag, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch4CardTabs() {
  const [activeTab, setActiveTab] = useState('1')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🃏 4.1 Card 卡片 & Tabs 标签页</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Card 是内容容器，Tabs 是内容分组 —— 两者是后台系统最常用的布局组件。
      </Paragraph>

      <Card title="💡 Card 卡片" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Card title="标题" extra={<a>更多</a>}>
  内容
</Card>

<Card hoverable cover={<img src="..." />}>
  <Card.Meta title="标题" description="描述" />
</Card>

<Card loading />  // 骨架加载
<Card size="small" />  // 紧凑模式`}</pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="基础卡片" extra={<a>更多</a>}>
            <p className="text-gray-500">这是基础卡片内容</p>
          </Card>
          <Card hoverable className="!border-indigo-200 hover:!shadow-lg transition-shadow">
            <div className="h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mb-3" />
            <Card.Meta title="可悬停卡片" description="鼠标悬停有阴影效果" />
          </Card>
          <Card size="small" title="紧凑模式">
            <p className="text-gray-500 text-sm">更小的内边距</p>
          </Card>
        </div>
      </Card>

      <Card title="💡 Card.Meta 内容区域" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Card hoverable>
  <Card.Meta
    avatar={<Avatar>U</Avatar>}
    title="卡片标题"
    description="卡片描述信息"
  />
</Card>`}</pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'React', desc: '用于构建用户界面的 JavaScript 库', color: 'from-cyan-400 to-blue-500', avatar: 'R' },
            { title: 'Ant Design', desc: '企业级 UI 组件库', color: 'from-blue-400 to-indigo-500', avatar: 'A' },
            { title: 'TailwindCSS', desc: '原子化 CSS 框架', color: 'from-teal-400 to-cyan-500', avatar: 'T' },
          ].map(item => (
            <Card key={item.title} hoverable className="hover:!shadow-lg transition-shadow">
              <Card.Meta
                avatar={<div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold`}>{item.avatar}</div>}
                title={item.title}
                description={item.desc}
              />
            </Card>
          ))}
        </div>
      </Card>

      <Card title="📑 Tabs 标签页" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Tabs activeKey={key} onChange={setKey} items={[
  { key: '1', label: '标签1', children: <div>内容1</div> },
  { key: '2', label: '标签2', children: <div>内容2</div> },
]} />

<Tabs type="card" />       // 卡片样式
<Tabs tabPosition="left" /> // 左侧标签`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-4">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
            { key: '1', label: '概览', children: <div className="p-2"><p>这是概览标签页的内容。当前活跃标签: <Tag color="blue">{activeTab}</Tag></p></div> },
            { key: '2', label: '详情', children: <div className="p-2"><p>这是详情标签页的内容，可以放置更详细的信息。</p></div> },
            { key: '3', label: '设置', children: <div className="p-2"><p>这是设置标签页，可以放置配置选项。</p></div> },
            { key: '4', label: <span>通知 <Tag color="red" size="small">3</Tag></span>, children: <div className="p-2"><p>带徽标的标签页，显示未读数量。</p></div> },
          ]} />
          <div>
            <Text strong>卡片样式：</Text>
            <Tabs type="card" items={[
              { key: '1', label: '标签1', children: <div className="p-2">卡片样式标签页</div> },
              { key: '2', label: '标签2', children: <div className="p-2">另一个标签</div> },
            ]} />
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Card：title/extra/cover/Meta/avatar 组合使用</li>
          <li><Text code>hoverable</Text> 悬停效果，<Text code>loading</Text> 骨架加载</li>
          <li>Tabs：<Text code>items</Text> 配置标签页，<Text code>type="card"</Text> 卡片样式</li>
          <li><Text code>tabPosition</Text>：top/right/bottom/left</li>
          <li>label 支持自定义 ReactNode（带徽标等）</li>
        </ul>
      </Card>
    </div>
  )
}
