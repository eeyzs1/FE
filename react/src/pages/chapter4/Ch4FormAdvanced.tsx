import { Typography, Card, Divider, Form, Input, Select, Button, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch4FormAdvanced() {
  const [form] = Form.useForm()

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📝 4.3 表单进阶</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        深入掌握 Form 的高级特性：动态增减、联动、异步校验、表单实例方法。
      </Paragraph>

      <Card title="💡 动态表单项 Form.List" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Form.List name="users">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Space key={key} align="baseline">
          <Form.Item {...restField} name={[name, 'first']}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item {...restField} name={[name, 'last']}>
            <Input placeholder="Last Name" />
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Button onClick={() => add()}>Add</Button>
    </>
  )}
</Form.List>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Form form={form} layout="vertical">
            <Form.List name="members">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-2 flex-wrap">
                      <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: '请输入姓名' }]}>
                        <Input placeholder="姓名" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'role']}>
                        <Select placeholder="角色" className="w-32" options={[
                          { value: 'dev', label: '开发' },
                          { value: 'design', label: '设计' },
                          { value: 'pm', label: '产品' },
                        ]} />
                      </Form.Item>
                      <Button danger onClick={() => remove(name)}>删除</Button>
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block className="!mt-2">+ 添加成员</Button>
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </Card>

      <Card title="🔗 表单联动" className="mb-6">
        <Paragraph>通过 <Text code>Form.useWatch</Text> 或 <Text code>onValuesChange</Text> 实现字段联动：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 方式1：onValuesChange
<Form onValuesChange={(changed, all) => {
  if (changed.country === 'China') {
    form.setFieldsValue({ city: 'Beijing' })
  }
}}>

// 方式2：Form.useWatch
const country = Form.useWatch('country', form)
// country 变化时自动重新渲染`}</pre>
        </div>
      </Card>

      <Card title="📋 表单实例方法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`const [form] = Form.useForm()

form.getFieldValue('name')         // 获取单个字段值
form.getFieldsValue()              // 获取所有字段值
form.setFieldValue('name', '新值') // 设置单个字段值
form.setFieldsValue({...})         // 设置多个字段值
form.resetFields()                 // 重置表单
form.validateFields()              // 触发校验，返回 Promise
form.isFieldTouched('name')        // 字段是否被触碰
form.getFieldError('name')         // 获取字段错误信息
form.scrollToField('name')         // 滚动到字段位置`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Form.List 实现动态增减表单项</li>
          <li>Form.useWatch 监听字段变化</li>
          <li>onValuesChange 实现字段联动</li>
          <li>表单实例方法：get/set/validate/reset</li>
          <li>shouldUpdate 精确控制更新范围</li>
          <li>dependencies 声明字段依赖关系</li>
        </ul>
      </Card>
    </div>
  )
}
