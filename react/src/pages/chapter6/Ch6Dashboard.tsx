import { Typography, Card, Row, Col, Statistic, Table, Tag, Progress, Select, DatePicker, Space, Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, DollarOutlined, EyeOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const stats = [
  { title: '总用户', value: 12893, prefix: <UserOutlined />, suffix: '人', change: 12.5, color: '#6366f1' },
  { title: '总订单', value: 5678, prefix: <ShoppingCartOutlined />, suffix: '单', change: -3.2, color: '#10b981' },
  { title: '总收入', value: 890120, prefix: <DollarOutlined />, suffix: '元', change: 8.7, color: '#f59e0b' },
  { title: '访问量', value: 345678, prefix: <EyeOutlined />, suffix: '次', change: 15.3, color: '#ef4444' },
]

const recentOrders = [
  { key: '1', order: 'ORD-001', customer: '张三', amount: 1299, status: 'completed', date: '2024-01-15' },
  { key: '2', order: 'ORD-002', customer: '李四', amount: 599, status: 'processing', date: '2024-01-15' },
  { key: '3', order: 'ORD-003', customer: '王五', amount: 2399, status: 'completed', date: '2024-01-14' },
  { key: '4', order: 'ORD-004', customer: '赵六', amount: 899, status: 'cancelled', date: '2024-01-14' },
  { key: '5', order: 'ORD-005', customer: '钱七', amount: 3499, status: 'processing', date: '2024-01-13' },
]

const statusMap: Record<string, { color: string; text: string }> = {
  completed: { color: 'green', text: '已完成' },
  processing: { color: 'blue', text: '处理中' },
  cancelled: { color: 'red', text: '已取消' },
}

const columns = [
  { title: '订单号', dataIndex: 'order' },
  { title: '客户', dataIndex: 'customer' },
  { title: '金额', dataIndex: 'amount', render: (v: number) => `¥${v.toLocaleString()}` },
  { title: '状态', dataIndex: 'status', render: (v: string) => <Tag color={statusMap[v].color}>{statusMap[v].text}</Tag> },
  { title: '日期', dataIndex: 'date' },
]

export default function Ch6Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <Title level={2}>📊 6.1 数据仪表盘</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        综合运用 React + Ant Design + TailwindCSS 构建企业级数据仪表盘。
      </Paragraph>

      <Card title="💡 架构设计" className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-center">
            <div className="font-bold text-indigo-700">React</div>
            <div className="text-xs text-gray-500">状态管理 + 组件逻辑</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="font-bold text-blue-700">Ant Design</div>
            <div className="text-xs text-gray-500">Card / Table / Statistic</div>
          </div>
          <div className="p-3 bg-cyan-50 rounded-lg text-center">
            <div className="font-bold text-cyan-700">TailwindCSS</div>
            <div className="text-xs text-gray-500">布局 / 间距 / 渐变</div>
          </div>
        </div>
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <Space>
          <Select defaultValue="7d" options={[
            { value: '24h', label: '24小时' },
            { value: '7d', label: '7天' },
            { value: '30d', label: '30天' },
            { value: '90d', label: '90天' },
          ]} />
          <DatePicker />
        </Space>
        <Button type="primary">导出报表</Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        {stats.map(stat => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <Card hoverable className="h-full">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
              <div className="mt-2 flex items-center gap-1">
                {stat.change > 0 ? (
                  <ArrowUpOutlined className="text-green-500" />
                ) : (
                  <ArrowDownOutlined className="text-red-500" />
                )}
                <span className={stat.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-gray-400 text-xs">vs 上期</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card title="最近订单">
            <Table columns={columns} dataSource={recentOrders} pagination={false} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="目标完成度" className="h-full">
            <div className="space-y-4">
              {[
                { label: '用户增长', percent: 78, color: '#6366f1' },
                { label: '收入目标', percent: 65, color: '#10b981' },
                { label: '客户满意度', percent: 92, color: '#f59e0b' },
                { label: '市场份额', percent: 45, color: '#ef4444' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: item.color }}>{item.percent}%</span>
                  </div>
                  <Progress percent={item.percent} showInfo={false} strokeColor={item.color} size="small" />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="🎯 融合要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Ant Design 的 Card、Statistic、Table 提供组件骨架</li>
          <li>TailwindCSS 的 Row/Col 网格 + gap/spacing 控制布局</li>
          <li>React 的 useState/useEffect 管理数据和交互</li>
          <li>渐变色、圆角、阴影用 TailwindCSS 快速实现</li>
          <li>数据请求、过滤、排序用 React 状态管理</li>
        </ul>
      </Card>
    </div>
  )
}
