import { useState } from 'react'
import { Typography, Card, Divider, Input, InputNumber } from 'antd'
import { SearchOutlined, UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TextArea, Password } = Input

export default function Ch3Input() {
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📝 3.2 Input 输入框</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Input 是表单的核心组件。Ant Design 提供了丰富的输入框变体和前缀/后缀配置。
      </Paragraph>

      <Card title="💡 基本输入框" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Input placeholder="基本输入框" />
<Input value={value} onChange={(e) => setValue(e.target.value)} />
<Input disabled placeholder="禁用状态" />
<Input allowClear placeholder="可清除" />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Input placeholder="基本输入框" />
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="受控输入" allowClear />
          <Input disabled placeholder="禁用状态" />
          <div className="text-sm text-gray-500">当前值: <Text code>{value || '(空)'}</Text></div>
        </div>
      </Card>

      <Card title="🎨 前缀与后缀" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Input prefix={<UserOutlined />} placeholder="用户名" />
<Input prefix={<LockOutlined />} type="password" />
<Input suffix={<SearchOutlined />} placeholder="搜索" />
<Input addonBefore="http://" addonAfter=".com" />
<Input prefix="¥" suffix="RMB" />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Input prefix={<UserOutlined />} placeholder="用户名" />
          <Input prefix={<LockOutlined />} placeholder="密码" type="password" />
          <Input suffix={<SearchOutlined />} placeholder="搜索..." allowClear />
          <Input addonBefore="http://" addonAfter=".com" placeholder="网站地址" />
          <InputNumber prefix="¥" suffix="RMB" className="w-full" placeholder="金额" />
        </div>
      </Card>

      <Card title="📝 输入框变体" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 密码输入框
<Input.Password placeholder="输入密码" />

// 多行文本
<Input.TextArea rows={4} placeholder="多行文本" />

// 搜索框
<Input.Search placeholder="搜索" onSearch={handleSearch} />

// 数字输入框
<InputNumber min={0} max={100} />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">密码输入</label>
            <Password placeholder="输入密码" iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">多行文本</label>
            <TextArea rows={3} placeholder="输入多行文本..." showCount maxLength={200} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">搜索框</label>
            <Input.Search
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="输入关键词搜索..."
              allowClear
              enterButton="搜索"
              onSearch={(value) => alert(`搜索: ${value}`)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">数字输入</label>
            <InputNumber min={0} max={100} className="w-full" placeholder="输入数字" />
          </div>
        </div>
      </Card>

      <Card title="📏 输入框尺寸" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Input size="large" placeholder="大尺寸" />
<Input placeholder="中尺寸（默认）" />
<Input size="small" placeholder="小尺寸" />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Input size="large" prefix={<UserOutlined />} placeholder="大尺寸" />
          <Input prefix={<UserOutlined />} placeholder="中尺寸（默认）" />
          <Input size="small" prefix={<UserOutlined />} placeholder="小尺寸" />
        </div>
      </Card>

      <Card title="🌟 TailwindCSS + Input" className="mb-6">
        <Paragraph>用 TailwindCSS 自定义输入框样式：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Input className="!rounded-full !px-6" placeholder="圆角输入框" />
<Input className="!border-indigo-400 focus:!border-indigo-600" 
  placeholder="自定义边框色" />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg space-y-3">
          <Input className="!rounded-full !px-6" placeholder="圆角输入框" prefix={<SearchOutlined />} />
          <Input className="!border-indigo-400" placeholder="自定义边框色" />
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Input 支持 prefix/suffix/addonBefore/addonAfter 扩展</li>
          <li>变体：Password、TextArea、Search、InputNumber</li>
          <li><Text code>allowClear</Text> 一键清空，<Text code>showCount</Text> 显示字数</li>
          <li>受控组件：value + onChange 配合使用</li>
          <li>size 属性控制大小，与 Button 的 size 一致</li>
          <li>TailwindCSS className 可覆盖和增强样式</li>
        </ul>
      </Card>
    </div>
  )
}
