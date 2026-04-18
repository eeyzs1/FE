import { useState } from 'react'
import { Typography, Card, Divider, Button, Modal, Space, Form, Input, Select, Tag } from 'antd'

const { Title, Paragraph } = Typography

export default function Ch3Modal() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setBasicOpen(false)
      setConfirmLoading(false)
    }, 1500)
  }

  const handleFormOk = async () => {
    try {
      const values = await form.validateFields()
      setConfirmLoading(true)
      setTimeout(() => {
        setFormOpen(false)
        setConfirmLoading(false)
        form.resetFields()
        alert(`提交数据: ${JSON.stringify(values)}`)
      }, 1000)
    } catch {
      // 表单校验未通过，不执行提交
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🪟 3.5 Modal 弹窗</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Modal 用于在当前页面弹出一个对话框，承载信息确认、表单填写等交互。
      </Paragraph>

      <Card title="💡 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>打开弹窗</Button>

<Modal
  title="基本弹窗"
  open={open}
  onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
>
  <p>这是弹窗内容</p>
</Modal>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Button type="primary" onClick={() => setBasicOpen(true)}>打开基本弹窗</Button>
          <Modal
            title="基本弹窗"
            open={basicOpen}
            onOk={handleOk}
            onCancel={() => setBasicOpen(false)}
            confirmLoading={confirmLoading}
          >
            <p>这是一个基本弹窗的内容。</p>
            <p>点击确定按钮会模拟异步操作（1.5秒后关闭）。</p>
          </Modal>
        </div>
      </Card>

      <Card title="📝 表单弹窗" className="mb-6">
        <Paragraph>在 Modal 中嵌入 Form，实现新增/编辑功能：</Paragraph>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Button type="primary" onClick={() => setFormOpen(true)}>新增用户</Button>
          <Modal
            title="新增用户"
            open={formOpen}
            onOk={handleFormOk}
            onCancel={() => { setFormOpen(false); form.resetFields() }}
            confirmLoading={confirmLoading}
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
            </Form>
          </Modal>
        </div>
      </Card>

      <Card title="🎨 自定义样式弹窗" className="mb-6">
        <Paragraph>配合 TailwindCSS 自定义弹窗样式：</Paragraph>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Button onClick={() => setCustomOpen(true)}>打开自定义弹窗</Button>
          <Modal
            title={null}
            open={customOpen}
            onCancel={() => setCustomOpen(false)}
            footer={null}
            className="!top-20"
            styles={{
              body: { borderRadius: '16px', padding: '0', overflow: 'hidden' },
            }}
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
              <h2 className="text-xl font-bold">🎉 欢迎加入！</h2>
              <p className="text-indigo-100 mt-1">这是一个自定义样式的弹窗</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Modal 的样式可以通过以下方式自定义：</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Tag color="blue">styles</Tag>
                  <span className="text-sm">修改内容区/遮罩层样式</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag color="green">className</Tag>
                  <span className="text-sm">TailwindCSS 覆盖样式</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag color="purple">footer={null}</Tag>
                  <span className="text-sm">自定义底部按钮</span>
                </div>
              </div>
              <Button type="primary" className="mt-4 w-full" onClick={() => setCustomOpen(false)}>
                知道了
              </Button>
            </div>
          </Modal>
        </div>
      </Card>

      <Card title="⚡ 静态方法" className="mb-6">
        <Paragraph>Modal 提供了静态方法，无需手动管理状态：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`Modal.confirm({ title: '确认删除？', content: '此操作不可逆' })
Modal.info({ title: '提示', content: '这是一条信息' })
Modal.success({ title: '成功', content: '操作完成' })
Modal.warning({ title: '警告', content: '请注意' })
Modal.error({ title: '错误', content: '操作失败' })`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button onClick={() => Modal.confirm({ title: '确认删除？', content: '此操作不可逆，确定继续吗？' })}>Confirm</Button>
            <Button onClick={() => Modal.info({ title: '提示', content: '这是一条信息提示' })}>Info</Button>
            <Button onClick={() => Modal.success({ title: '成功', content: '操作已完成！' })}>Success</Button>
            <Button onClick={() => Modal.warning({ title: '警告', content: '请注意风险！' })}>Warning</Button>
            <Button danger onClick={() => Modal.error({ title: '错误', content: '操作失败，请重试' })}>Error</Button>
          </Space>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>open 控制显示/隐藏，onOk/onCancel 处理确认/取消</li>
          <li>confirmLoading 显示加载状态</li>
          <li>destroyOnClose 关闭时销毁子组件</li>
          <li>静态方法（Modal.confirm 等）无需管理状态</li>
          <li>styles 和 className 可自定义样式</li>
          <li>表单弹窗：嵌入 Form + validateFields</li>
        </ul>
      </Card>
    </div>
  )
}
