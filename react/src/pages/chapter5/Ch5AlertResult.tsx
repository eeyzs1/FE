import { useState } from 'react'
import { Typography, Card, Divider, Alert, Result, Button, Space, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Ch5AlertResult() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🚨 5.2 Alert 警告 & Result 结果</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Alert 用于页面内警告提示，Result 用于操作结果反馈。
      </Paragraph>

      <Card title="💡 Alert 四种类型" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Alert type="success" message="成功提示" />
<Alert type="info" message="信息提示" />
<Alert type="warning" message="警告提示" />
<Alert type="error" message="错误提示" />

<Alert type="info" showIcon closable description="详细描述" />
<Alert type="info" banner />  // 顶部公告栏`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <Alert type="success" message="操作成功" showIcon />
          <Alert type="info" message="提示信息" showIcon />
          <Alert type="warning" message="请注意风险" showIcon />
          <Alert type="error" message="操作失败，请重试" showIcon />
          <Alert type="info" message="带描述的提示" description="这里是更详细的描述信息，可以包含更多内容帮助用户理解。" showIcon closable />
          {showAlert && (
            <Alert message="可关闭的提示" type="warning" closable onClose={() => setShowAlert(false)} showIcon />
          )}
        </div>
      </Card>

      <Card title="🏁 Result 结果页" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Result
  status="success"
  title="操作成功"
  subTitle="订单号: 202401150001"
  extra={[
    <Button type="primary">返回首页</Button>,
    <Button>查看详情</Button>,
  ]}
/>`}</pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Result
            status="success"
            title="提交成功"
            subTitle="您的申请已提交，预计 2-3 个工作日审核"
            extra={<Button type="primary">返回首页</Button>}
          />
          <Result
            status="error"
            title="提交失败"
            subTitle="请检查网络连接后重试"
            extra={<Space><Button type="primary">重新提交</Button><Button>返回</Button></Space>}
          />
          <Result status="warning" title="注意" subTitle="您的账户即将到期" extra={<Button type="primary">续费</Button>} />
          <Result status="info" title="提示" subTitle="您有一条新消息" extra={<Button type="primary">查看</Button>} />
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Alert 四种类型：success/info/warning/error</li>
          <li><Text code>showIcon</Text> 显示图标，<Text code>closable</Text> 可关闭</li>
          <li><Text code>banner</Text> 顶部公告栏模式</li>
          <li>Result 用于操作结果反馈，配合 extra 按钮</li>
          <li>Result 四种状态：success/error/warning/info</li>
        </ul>
      </Card>
    </div>
  )
}
