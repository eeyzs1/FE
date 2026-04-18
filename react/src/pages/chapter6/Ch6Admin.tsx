import { useState } from 'react'
import { Typography, Card, Table, Tag, Button, Space, Input, Form, Modal, Popconfirm, Select, message, Row, Col, Statistic, Breadcrumb } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

interface UserRecord {
  key: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  createdAt: string
}

const initialData: UserRecord[] = Array.from({ length: 20 }, (_, i) => ({
  key: String(i + 1),
  name: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'][i % 8],
  email: `user${i + 1}@company.com`,
  role: ['admin', 'editor', 'viewer'][i % 3],
  department: ['技术部', '产品部', '市场部', '运营部'][i % 4],
  status: i % 4 === 0 ? 'inactive' as const : 'active' as const,
  createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
}))

export default function Ch6Admin() {
  const [data, setData] = useState(initialData)
  const [searchText, setSearchText] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<UserRecord | null>(null)
  const [form] = Form.useForm()

  const filteredData = data.filter(item =>
    item.name.includes(searchText) || item.email.includes(searchText)
  )

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    setModalOpen(true)
  }

  const handleEdit = (record: UserRecord) => {
    setEditingRecord(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key))
    message.success('删除成功')
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (editingRecord) {
        setData(data.map(item => item.key === editingRecord.key ? { ...item, ...values } : item))
        message.success('更新成功')
      } else {
        setData([...data, { ...values, key: Date.now().toString(), status: 'active', createdAt: new Date().toISOString().split('T')[0] }])
        message.success('添加成功')
      }
      setModalOpen(false)
    } catch {
      // 表单校验未通过
    }
  }

  const columns = [
    { title: '姓名', dataIndex: 'name', sorter: (a: UserRecord, b: UserRecord) => a.name.localeCompare(b.name) },
    { title: '邮箱', dataIndex: 'email' },
    { title: '角色', dataIndex: 'role', render: (v: string) => <Tag color={v === 'admin' ? 'red' : v === 'editor' ? 'blue' : 'green'}>{v}</Tag> },
    { title: '部门', dataIndex: 'department', render: (v: string) => <Tag>{v}</Tag> },
    { title: '状态', dataIndex: 'status', render: (v: string) => <Tag color={v === 'active' ? 'green' : 'default'}>{v === 'active' ? '在职' : '离职'}</Tag> },
    { title: '入职日期', dataIndex: 'createdAt' },
    {
      title: '操作',
      render: (_: unknown, record: UserRecord) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.key)}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <Title level={2}>🏢 6.2 后台管理系统</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        完整的 CRUD 后台管理系统，展示 React + Ant Design + TailwindCSS 的最佳实践。
      </Paragraph>

      <Breadcrumb items={[
        { title: <><HomeOutlined /> 首页</> },
        { title: '用户管理' },
      ]} className="mb-4" />

      <Row gutter={16} className="mb-6">
        <Col span={6}><Card><Statistic title="总用户" value={data.length} valueStyle={{ color: '#6366f1' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="在职" value={data.filter(d => d.status === 'active').length} valueStyle={{ color: '#10b981' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="管理员" value={data.filter(d => d.role === 'admin').length} valueStyle={{ color: '#ef4444' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="本月新增" value={3} valueStyle={{ color: '#f59e0b' }} /></Card></Col>
      </Row>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <Input.Search
            placeholder="搜索用户..."
            allowClear
            className="w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增用户
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8, showTotal: (total) => `共 ${total} 条` }}
          bordered
          size="middle"
        />
      </Card>

      <Modal
        title={editingRecord ? '编辑用户' : '新增用户'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="输入姓名" />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email', message: '请输入有效邮箱' }]}>
            <Input placeholder="输入邮箱" />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
            <Select placeholder="选择角色" options={[
              { value: 'admin', label: '管理员' },
              { value: 'editor', label: '编辑者' },
              { value: 'viewer', label: '查看者' },
            ]} />
          </Form.Item>
          <Form.Item name="department" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
            <Select placeholder="选择部门" options={[
              { value: '技术部', label: '技术部' },
              { value: '产品部', label: '产品部' },
              { value: '市场部', label: '市场部' },
              { value: '运营部', label: '运营部' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>

      <Card title="🎯 架构要点" className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>CRUD 完整流程：列表 → 新增 → 编辑 → 删除</li>
          <li>搜索过滤：前端 filter 或后端 API</li>
          <li>表单弹窗：Modal + Form + validateFields</li>
          <li>统计卡片：Statistic + Row/Col 网格布局</li>
          <li>状态管理：useState 管理数据，可升级为 Zustand/Redux</li>
          <li>消息反馈：message.success/error 操作提示</li>
        </ul>
      </Card>
    </div>
  )
}
