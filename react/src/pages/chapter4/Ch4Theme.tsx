import { useState } from 'react'
import { Typography, Card, Divider, ConfigProvider, Button, Tag, Switch, Space, theme } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch4Theme() {
  const [isDark, setIsDark] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#1677ff')

  const colors = [
    { name: '默认蓝', color: '#1677ff' },
    { name: '极光绿', color: '#52c41a' },
    { name: '烈焰红', color: '#f5222d' },
    { name: '暮光紫', color: '#722ed1' },
    { name: '日落橙', color: '#fa8c16' },
    { name: '青碧', color: '#13c2c2' },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🎨 4.1 主题定制</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Ant Design 支持通过 ConfigProvider 和 CSS 变量进行深度主题定制。
      </Paragraph>

      <Card title="💡 ConfigProvider 主题" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { ConfigProvider, theme } from 'antd'

// 方式1：修改主题色
<ConfigProvider theme={{
  token: {
    colorPrimary: '#722ed1',    // 主色
    borderRadius: 8,             // 圆角
    fontSize: 16,                // 字号
    colorBgContainer: '#f5f5f5', // 背景色
  }
}}>
  <App />
</ConfigProvider>

// 方式2：暗黑主题
<ConfigProvider theme={{
  algorithm: theme.darkAlgorithm,
}}>
  <App />
</ConfigProvider>`}</pre>
        </div>
      </Card>

      <Card title="🔬 主题色切换" className="mb-6">
        <Paragraph>点击切换主色，观察组件样式变化：</Paragraph>
        <div className="flex gap-2 mb-4">
          {colors.map(c => (
            <button
              key={c.color}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                primaryColor === c.color ? 'border-gray-800 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.color }}
              onClick={() => setPrimaryColor(c.color)}
              title={c.name}
            />
          ))}
        </div>
        <ConfigProvider theme={{ token: { colorPrimary: primaryColor } }}>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Space wrap>
              <Button type="primary">主要按钮</Button>
              <Button>默认按钮</Button>
              <Button type="dashed">虚线按钮</Button>
              <Tag color="blue">标签</Tag>
              <Switch defaultChecked />
            </Space>
          </div>
        </ConfigProvider>
      </Card>

      <Card title="🌙 暗黑模式" className="mb-6">
        <Paragraph>使用 <Text code>darkAlgorithm</Text> 切换暗黑主题：</Paragraph>
        <div className="mb-3">
          <Switch checked={isDark} onChange={setIsDark} /> <span className="ml-2">{isDark ? '🌙 暗黑模式' : '☀️ 亮色模式'}</span>
        </div>
        <ConfigProvider theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: { colorPrimary: primaryColor },
        }}>
          <div className={`p-4 rounded-lg ${isDark ? '' : 'bg-gray-50'}`}>
            <Space wrap>
              <Button type="primary">主要按钮</Button>
              <Button>默认按钮</Button>
              <Tag color="blue">标签</Tag>
            </Space>
          </div>
        </ConfigProvider>
      </Card>

      <Card title="📋 Design Token 体系" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// Seed Token（种子令牌）—— 全局基础
{
  colorPrimary: '#1677ff',    // 主色
  fontSize: 14,               // 字号
  borderRadius: 6,            // 圆角
}

// Map Token（映射令牌）—— 由种子派生
{
  colorPrimaryHover: '#4096ff',
  colorPrimaryActive: '#0958d9',
  colorBgContainer: '#ffffff',
}

// Component Token（组件令牌）—— 组件级别
{
  Button: { contentPaddingLR: 16 },
  Table: { headerBg: '#fafafa' },
}`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>ConfigProvider theme 属性配置主题</li>
          <li>token.colorPrimary 修改主色</li>
          <li>theme.darkAlgorithm 切换暗黑模式</li>
          <li>三层 Token 体系：Seed → Map → Component</li>
          <li>组件级 Token 可精确控制单个组件样式</li>
          <li>TailwindCSS + Ant Design Token 可协同工作</li>
        </ul>
      </Card>
    </div>
  )
}
