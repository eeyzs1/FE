import { useState } from 'react'
import { Typography, Card, Divider, Form, Input, Button, Select, Switch, InputNumber, Slider, message, Space, Row, Col } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

interface FormValues {
  username: string
  email: string
  age: number
  gender: string
  hobbies: string[]
  subscribe: boolean
  satisfaction: number
  birthday: string | null
}

export default function Ch3Form() {
  const [form] = Form.useForm<FormValues>()
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)

  const onFinish = (values: FormValues) => {
    message.success('提交成功！')
    setSubmittedData(values)
  }

  const onReset = () => {
    form.resetFields()
    setSubmittedData(null)
  }

  const onFill = () => {
    form.setFieldsValue({
      username: '张三',
      email: 'zhangsan@example.com',
      age: 25,
      gender: 'male',
      hobbies: ['coding', 'reading'],
      subscribe: true,
      satisfaction: 80,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📋 3.3 Form 表单</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Form 是 Ant Design 最强大的组件之一，内置数据管理、校验、布局等功能。
      </Paragraph>

      <Card title="💡 Form 核心概念" className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <div className="text-2xl mb-1">📦</div>
            <div className="font-bold text-blue-700">Form</div>
            <div className="text-xs text-blue-500">表单容器，管理整体数据</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-2xl mb-1">🏷️</div>
            <div className="font-bold text-green-700">Form.Item</div>
            <div className="text-xs text-green-500">表单项，绑定字段和校验</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <div className="text-2xl mb-1">✅</div>
            <div className="font-bold text-purple-700">rules</div>
            <div className="text-xs text-purple-500">校验规则</div>
          </div>
        </div>
      </Card>

      <Card title="📝 完整表单示例" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [form] = Form.useForm()

<Form form={form} onFinish={onFinish} layout="vertical">
  <Form.Item name="username" label="用户名"
    rules={[{ required: true, message: '请输入用户名' }]}>
    <Input prefix={<UserOutlined />} />
  </Form.Item>
  
  <Form.Item name="email" label="邮箱"
    rules={[
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' }
    ]}>
    <Input prefix={<MailOutlined />} />
  </Form.Item>
  
  <Form.Item>
    <Button type="primary" htmlType="submit">提交</Button>
  </Form.Item>
</Form>`}</pre>
        </div>

        <Row gutter={24}>
          <Col span={14}>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="middle"
              >
                <Form.Item name="username" label="用户名"
                  rules={[{ required: true, message: '请输入用户名' },
                    { min: 2, message: '至少2个字符' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="输入用户名" />
                </Form.Item>

                <Form.Item name="email" label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '邮箱格式不正确' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="输入邮箱" />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="age" label="年龄"
                      rules={[{ required: true, message: '请输入年龄' }]}
                    >
                      <InputNumber min={1} max={120} className="w-full" placeholder="年龄" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender" label="性别"
                      rules={[{ required: true, message: '请选择性别' }]}
                    >
                      <Select placeholder="选择性别" options={[
                        { value: 'male', label: '男' },
                        { value: 'female', label: '女' },
                      ]} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="hobbies" label="爱好">
                  <Select mode="multiple" placeholder="选择爱好" options={[
                    { value: 'coding', label: '编程' },
                    { value: 'reading', label: '阅读' },
                    { value: 'gaming', label: '游戏' },
                    { value: 'music', label: '音乐' },
                    { value: 'sports', label: '运动' },
                  ]} />
                </Form.Item>

                <Form.Item name="satisfaction" label="满意度">
                  <Slider marks={{ 0: '0', 50: '50', 100: '100' }} />
                </Form.Item>

                <Form.Item name="subscribe" label="订阅通知" valuePropName="checked">
                  <Switch />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button onClick={onReset}>重置</Button>
                    <Button type="link" onClick={onFill}>自动填充</Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={10}>
            <div className="p-4 bg-gray-50 rounded-lg h-full">
              <Text strong>提交数据：</Text>
              {submittedData ? (
                <div className="mt-2 space-y-1 text-sm">
                  {Object.entries(submittedData).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-mono">
                        {Array.isArray(value) ? value.join(', ') : String(value ?? '-')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center text-gray-400">
                  <p>填写表单并提交</p>
                  <p>数据将显示在这里</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="📋 常用校验规则" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`rules={[
  { required: true, message: '必填项' },
  { min: 2, message: '最少2个字符' },
  { max: 20, message: '最多20个字符' },
  { type: 'email', message: '邮箱格式' },
  { type: 'url', message: 'URL格式' },
  { pattern: /^1[3-9]\\d{9}$/, message: '手机号格式' },
  { 
    validator: (_, value) => {
      if (value && value < 18) return Promise.reject('未满18岁')
      return Promise.resolve()
    }
  },
]}`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li><Text code>Form.useForm()</Text> 获取表单实例，控制表单数据</li>
          <li><Text code>onFinish</Text> 校验通过后触发，<Text code>onFinishFailed</Text> 校验失败触发</li>
          <li><Text code>rules</Text> 定义校验规则：required、min/max、type、pattern、validator</li>
          <li><Text code>form.setFieldsValue()</Text> 设置值，<Text code>form.resetFields()</Text> 重置</li>
          <li><Text code>layout</Text> 控制布局：horizontal / vertical / inline</li>
          <li>Switch 等组件需要 <Text code>valuePropName="checked"</Text></li>
        </ul>
      </Card>
    </div>
  )
}
