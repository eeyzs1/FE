import { Typography, Card, Divider, List, Descriptions, Tag, Badge, Avatar, Space } from 'antd'
import { ClockCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const listData = [
  { title: 'React 19 发布', desc: '全新并发特性，Server Components 稳定', tag: '前端', color: 'blue' },
  { title: 'Ant Design 6', desc: '全面支持 React 19，Design Token 体系升级', tag: 'UI', color: 'green' },
  { title: 'TailwindCSS 4', desc: 'CSS-first 配置，性能大幅提升', tag: 'CSS', color: 'purple' },
  { title: 'TypeScript 5.9', desc: '更快的编译速度，更好的类型推断', tag: '语言', color: 'orange' },
]

export default function Ch4ListDescriptions() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📋 4.3 List 列表 & Descriptions 描述</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        List 用于展示数据列表，Descriptions 用于展示详情键值对。两者是数据展示的核心组件。
      </Paragraph>

      <Card title="💡 List 列表" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<List
  dataSource={data}
  renderItem={(item) => (
    <List.Item
      actions={[<a>编辑</a>, <a>删除</a>]}
      extra={<img width={100} src="..." />}
    >
      <List.Item.Meta
        avatar={<Avatar>{item.avatar}</Avatar>}
        title={item.title}
        description={item.desc}
      />
    </List.Item>
  )}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <List
            dataSource={listData}
            renderItem={(item) => (
              <List.Item actions={[<a key="edit">编辑</a>, <a key="del">删除</a>]}>
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: '#6366f1' }}>{item.tag[0]}</Avatar>}
                  title={<span>{item.title} <Tag color={item.color}>{item.tag}</Tag></span>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </div>
      </Card>

      <Card title="📖 Descriptions 描述列表" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Descriptions title="用户信息" bordered column={2}>
  <Descriptions.Item label="姓名">张三</Descriptions.Item>
  <Descriptions.Item label="年龄">25</Descriptions.Item>
  <Descriptions.Item label="角色">
    <Tag color="blue">Admin</Tag>
  </Descriptions.Item>
</Descriptions>

<Descriptions layout="vertical" size="small" />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-4">
          <Descriptions title="用户详情" bordered column={{ xs: 1, sm: 2 }}>
            <Descriptions.Item label="姓名">张三</Descriptions.Item>
            <Descriptions.Item label="年龄">25</Descriptions.Item>
            <Descriptions.Item label="邮箱">zhangsan@example.com</Descriptions.Item>
            <Descriptions.Item label="角色"><Tag color="red">Admin</Tag></Descriptions.Item>
            <Descriptions.Item label="状态"><Badge status="processing" text="运行中" /></Descriptions.Item>
            <Descriptions.Item label="注册时间">2024-01-15</Descriptions.Item>
          </Descriptions>
          <Descriptions title="紧凑模式" size="small" column={3}>
            <Descriptions.Item label="CPU">32%</Descriptions.Item>
            <Descriptions.Item label="内存">4.2 GB / 16 GB</Descriptions.Item>
            <Descriptions.Item label="磁盘">128 GB / 512 GB</Descriptions.Item>
          </Descriptions>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>List：dataSource + renderItem 渲染列表项</li>
          <li>List.Item.Meta：avatar + title + description 标准布局</li>
          <li>List.Item actions：操作按钮区域</li>
          <li>Descriptions：label + value 键值对展示</li>
          <li><Text code>bordered</Text> 边框样式，<Text code>column</Text> 列数</li>
          <li><Text code>layout="vertical"</Text> 垂直布局</li>
        </ul>
      </Card>
    </div>
  )
}
