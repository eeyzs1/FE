import { Button, Space, Typography, Card, Divider, message } from 'antd'
import { CheckCircleOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, SmileOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Ch3Message() {
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => { message.success('操作成功！') }
  const error = () => { message.error('操作失败！') }
  const warning = () => { message.warning('请注意风险！') }
  const info = () => { message.info('这是一条信息') }
  const loading = () => {
    const hide = message.loading('加载中...', 0)
    setTimeout(hide, 2000)
  }

  const customDuration = () => { message.success('5秒后消失', 5) }
  const customHook = () => {
    messageApi.open({
      type: 'success',
      content: '通过 useMessage Hook 创建的消息',
      duration: 3,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>💬 3.6 Message 消息</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Message 全局展示操作反馈，轻量级提示，不打断用户操作。
      </Paragraph>

      <Card title="💡 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { message } from 'antd'

message.success('操作成功！')
message.error('操作失败！')
message.warning('请注意！')
message.info('提示信息')
message.loading('加载中...', 0)  // 0 = 不自动关闭
// 手动关闭: const hide = message.loading(...); hide()`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button type="primary" icon={<CheckCircleOutlined />} onClick={success}>Success</Button>
            <Button danger icon={<CloseCircleOutlined />} onClick={error}>Error</Button>
            <Button icon={<WarningOutlined />} onClick={warning}>Warning</Button>
            <Button icon={<InfoCircleOutlined />} onClick={info}>Info</Button>
            <Button icon={<SmileOutlined />} onClick={loading}>Loading (2s)</Button>
          </Space>
        </div>
      </Card>

      <Card title="⏱️ 自定义持续时间" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 默认 3 秒后消失
message.success('默认3秒')

// 自定义持续时间（秒）
message.success('5秒后消失', 5)

// 不自动关闭
const hide = message.loading('处理中...', 0)
setTimeout(hide, 3000)  // 3秒后手动关闭`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Button onClick={customDuration}>5秒后消失</Button>
        </div>
      </Card>

      <Card title="🪝 useMessage Hook" className="mb-6">
        <Paragraph>使用 <Text code>useMessage</Text> Hook 获取上下文相关的 messageApi：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [messageApi, contextHolder] = message.useMessage()

messageApi.open({
  type: 'success',
  content: '消息内容',
  duration: 3,
})

// 在 JSX 中渲染 contextHolder
return <>{contextHolder}<YourApp /></>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          {contextHolder}
          <Button type="primary" onClick={customHook}>useMessage Hook</Button>
        </div>
      </Card>

      <Card title="📋 Message vs Notification" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">💬 Message</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>• 轻量级，顶部居中</li>
              <li>• 自动消失</li>
              <li>• 不打断操作</li>
              <li>• 适合：操作反馈</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">🔔 Notification</h4>
            <ul className="text-sm space-y-1 text-green-600">
              <li>• 重量级，右上角</li>
              <li>• 可手动关闭</li>
              <li>• 包含更多信息</li>
              <li>• 适合：系统通知</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>5种类型：success / error / warning / info / loading</li>
          <li>默认 3 秒自动消失，可自定义持续时间</li>
          <li>loading 传 0 不自动关闭，返回关闭函数</li>
          <li>useMessage Hook 获取上下文 messageApi</li>
          <li>Message 轻量反馈，Notification 重量通知</li>
          <li>同一时刻最多显示一个（可配置 maxCount）</li>
        </ul>
      </Card>
    </div>
  )
}
