import { useState } from 'react'
import { Typography, Card, Divider, Table, Tag, Button, Space, Input, Popconfirm } from 'antd'
import type { TableColumnsType } from 'antd'

const { Title, Paragraph, Text } = Typography

interface UserRecord {
  key: string
  name: string
  age: number
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
}

const mockData: UserRecord[] = Array.from({ length: 30 }, (_, i) => ({
  key: String(i + 1),
  name: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'][i % 8],
  age: 20 + (i % 15),
  email: `user${i + 1}@example.com`,
  role: ['admin', 'editor', 'viewer'][i % 3],
  status: i % 3 === 0 ? 'inactive' : 'active',
  joinDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

export default function Ch3Table() {
  const [data, setData] = useState(mockData)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [searchText, setSearchText] = useState('')

  const filteredData = data.filter(item =>
    item.name.includes(searchText) || item.email.includes(searchText)
  )

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key))
  }

  const columns: TableColumnsType<UserRecord> = [
    {
      title: '姓名',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [...new Set(data.map(d => d.name))].map(name => ({ text: name, value: name })),
      onFilter: (value, record) => record.name === value,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role: string) => {
        const colorMap: Record<string, string> = { admin: 'red', editor: 'blue', viewer: 'green' }
        return <Tag color={colorMap[role]}>{role.toUpperCase()}</Tag>
      },
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Editor', value: 'editor' },
        { text: 'Viewer', value: 'viewer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '活跃' : '未激活'}
        </Tag>
      ),
    },
    {
      title: '加入日期',
      dataIndex: 'joinDate',
      sorter: (a, b) => a.joinDate.localeCompare(b.joinDate),
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button size="small" type="link">编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.key)}>
            <Button size="small" type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <Title level={2}>📊 3.4 Table 表格</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Table 是后台管理系统最核心的组件，支持排序、筛选、分页、行选择等丰富功能。
      </Paragraph>

      <Card title="💡 Table 核心属性" className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '📋', title: 'columns', desc: '列配置' },
            { icon: '📦', title: 'dataSource', desc: '数据源' },
            { icon: '🔢', title: 'pagination', desc: '分页配置' },
            { icon: '🔀', title: 'rowSelection', desc: '行选择' },
            { icon: '↕️', title: 'sorter', desc: '排序' },
            { icon: '🔍', title: 'filters', desc: '筛选' },
            { icon: '📐', title: 'scroll', desc: '滚动' },
            { icon: '🎨', title: 'rowClassName', desc: '行样式' },
          ].map(item => (
            <div key={item.title} className="p-2 bg-indigo-50 rounded text-center">
              <div className="text-lg">{item.icon}</div>
              <div className="font-mono text-xs font-bold text-indigo-700">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="📊 完整表格示例" className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <Input.Search
            placeholder="搜索姓名或邮箱..."
            allowClear
            className="w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {selectedRowKeys.length > 0 && (
            <span className="text-sm text-gray-500">
              已选择 <Text strong>{selectedRowKeys.length}</Text> 项
            </span>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          size="middle"
          bordered
        />
      </Card>

      <Card title="📋 columns 配置详解" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`const columns = [
  {
    title: '姓名',           // 列标题
    dataIndex: 'name',       // 数据字段名
    key: 'name',             // 唯一 key
    sorter: (a, b) => ...,   // 排序函数
    filters: [...],          // 筛选选项
    onFilter: (val, rec) => ..., // 筛选函数
    render: (val, rec) => ...,   // 自定义渲染
    width: 200,              // 列宽
    align: 'center',         // 对齐方式
    fixed: 'left',           // 固定列
  },
]`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>columns 定义列，dataSource 提供数据</li>
          <li>sorter 排序、filters 筛选、render 自定义渲染</li>
          <li>pagination 配置分页，showTotal 显示总数</li>
          <li>rowSelection 实现行选择（多选/单选）</li>
          <li>数据项需要唯一的 key 字段</li>
          <li>scroll 配置滚动，fixed 固定列</li>
        </ul>
      </Card>
    </div>
  )
}
