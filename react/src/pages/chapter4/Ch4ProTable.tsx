import { Typography, Card, Divider, Table, Tag, Button, Input, Space, Select } from 'antd'
import type { TableColumnsType } from 'antd'

const { Title, Paragraph } = Typography

interface Record {
  key: string
  name: string
  age: number
  email: string
  role: string
  status: string
  createdAt: string
}

const data: Record[] = Array.from({ length: 50 }, (_, i) => ({
  key: String(i + 1),
  name: ['张三', '李四', '王五', '赵六', '钱七'][i % 5],
  age: 20 + (i % 20),
  email: `user${i + 1}@example.com`,
  role: ['admin', 'editor', 'viewer'][i % 3],
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
}))

export default function Ch4ProTable() {
  const columns: TableColumnsType<Record> = [
    { title: '姓名', dataIndex: 'name', filters: [...new Set(data.map(d => d.name))].map(n => ({ text: n, value: n })), onFilter: (v, r) => r.name === v },
    { title: '年龄', dataIndex: 'age', sorter: (a, b) => a.age - b.age },
    { title: '邮箱', dataIndex: 'email' },
    { title: '角色', dataIndex: 'role', render: (r: string) => <Tag color={r === 'admin' ? 'red' : r === 'editor' ? 'blue' : 'green'}>{r}</Tag> },
    { title: '状态', dataIndex: 'status', render: (s: string) => <Tag color={s === 'active' ? 'green' : 'default'}>{s === 'active' ? '活跃' : '未激活'}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', sorter: (a, b) => a.createdAt.localeCompare(b.createdAt) },
    { title: '操作', render: () => <Space><Button size="small" type="link">编辑</Button><Button size="small" type="link" danger>删除</Button></Space> },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <Title level={2}>📊 4.4 ProTable 模式</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        ProTable 是企业级表格的最佳实践模式，整合搜索、筛选、分页等功能。
      </Paragraph>

      <Card title="💡 ProTable 核心特性" className="mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '🔍', title: '搜索表单', desc: '自动生成搜索表单' },
            { icon: '📊', title: '数据请求', desc: '自动管理 loading' },
            { icon: '📄', title: '分页', desc: '自动分页处理' },
            { icon: '↕️', title: '排序', desc: '服务端/客户端排序' },
            { icon: '🎯', title: '筛选', desc: '多条件组合筛选' },
            { icon: '⚡', title: '工具栏', desc: '刷新/密度/列设置' },
          ].map(item => (
            <div key={item.title} className="p-3 bg-indigo-50 rounded text-center">
              <div className="text-xl">{item.icon}</div>
              <div className="font-bold text-sm text-indigo-700">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="📊 手动实现 ProTable 模式" className="mb-6">
        <Paragraph>不使用 @ant-design/pro-table 库，手动实现核心功能：</Paragraph>
        <div className="mb-3 flex flex-wrap gap-3 items-center">
          <Input.Search placeholder="搜索..." className="w-48" allowClear />
          <Select placeholder="角色" className="w-28" allowClear options={[
            { value: 'admin', label: 'Admin' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' },
          ]} />
          <Select placeholder="状态" className="w-28" allowClear options={[
            { value: 'active', label: '活跃' },
            { value: 'inactive', label: '未激活' },
          ]} />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
          }}
          bordered
          size="middle"
        />
      </Card>

      <Card title="📋 ProTable 请求模式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 典型的 ProTable 请求模式
const fetchData = async (params: {
  current: number
  pageSize: number
  keyword?: string
  role?: string
}) => {
  const res = await api.getUsers(params)
  return {
    data: res.list,
    total: res.total,
    success: true,
  }
}

// 配合 useEffect
useEffect(() => {
  const load = async () => {
    setLoading(true)
    try {
      const result = await fetchData(tableParams)
      setData(result.data)
      setTotal(result.total)
    } finally {
      setLoading(false)
    }
  }
  load()
}, [tableParams])`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>ProTable = 搜索 + 表格 + 分页 + 请求管理</li>
          <li>可以手动实现核心模式，不一定需要额外库</li>
          <li>请求参数：current、pageSize、filters、sorter</li>
          <li>loading 状态管理是关键</li>
          <li>搜索表单与表格参数联动</li>
          <li>企业级项目推荐 @ant-design/pro-components</li>
        </ul>
      </Card>
    </div>
  )
}
