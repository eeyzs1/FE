import { useState } from 'react'
import { Typography, Card, Space, Button, NotificationArgs, notification, Divider, Row, Col, Switch, Select, InputNumber, Tag } from 'antd'
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  SmileOutlined,
  BellOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

type NotificationPlacement = NotificationArgs['placement']

export default function Ch4Notification() {
  const [api, contextHolder] = notification.useNotification()
  const [placement, setPlacement] = useState<NotificationPlacement>('topRight')
  const [duration, setDuration] = useState(4.5)
  const [withBtn, setWithBtn] = useState(false)

  const openBasic = (type: 'success' | 'info' | 'warning' | 'error') => {
    api[type]({
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} 通知`,
      description: '这是一条通知消息，用于向用户反馈操作结果或系统状态变化。',
      placement,
      duration,
    })
  }

  const openCustom = () => {
    api.open({
      message: '自定义通知',
      description: '你可以自定义图标、样式和内容。',
      placement,
      duration,
      icon: <SmileOutlined style={{ color: '#6366f1' }} />,
    })
  }

  const openWithBtn = () => {
    api.open({
      message: '需要确认的通知',
      description: '这条通知包含操作按钮，用户可以执行相关操作。',
      placement,
      duration: 0,
      btn: (
        <Space>
          <Button size="small" onClick={() => api.destroy()}>忽略</Button>
          <Button type="primary" size="small" onClick={() => { api.destroy(); api.success({ message: '已确认', placement }) }}>确认</Button>
        </Space>
      ),
    })
  }

  const openWithProgress = () => {
    const key = `progress-${Date.now()}`
    let progress = 0
    api.open({
      key,
      message: '文件上传中',
      description: `进度: ${progress}%`,
      placement,
      duration: 0,
      icon: <BellOutlined style={{ color: '#1677ff' }} />,
    })
    const timer = setInterval(() => {
      progress += 10
      if (progress >= 100) {
        clearInterval(timer)
        api.success({ key, message: '上传完成', description: '文件已成功上传', placement, duration })
      } else {
        api.open({
          key,
          message: '文件上传中',
          description: `进度: ${progress}%`,
          placement,
          duration: 0,
          icon: <BellOutlined style={{ color: '#1677ff' }} />,
        })
      }
    }, 500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {contextHolder}
      <Title level={2}>🔔 Notification 通知提醒框</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        全局展示通知提醒信息。与 Message 的区别：Notification 更适合复杂内容（标题+描述+操作），
        支持多种位置、自定义按钮、动态更新。
      </Paragraph>

      <Card title="基础四种类型" className="mb-6">
        <Paragraph className="mb-4">
          Notification 提供四种语义类型：<Text code>success</Text>、<Text code>info</Text>、<Text code>warning</Text>、<Text code>error</Text>。
          选择依据：操作成功→success，信息提示→info，风险警告→warning，错误反馈→error。
        </Paragraph>
        <Space wrap>
          <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => openBasic('success')}>Success</Button>
          <Button icon={<InfoCircleOutlined />} onClick={() => openBasic('info')}>Info</Button>
          <Button icon={<WarningOutlined />} onClick={() => openBasic('warning')}>Warning</Button>
          <Button danger icon={<CloseCircleOutlined />} onClick={() => openBasic('error')}>Error</Button>
        </Space>
      </Card>

      <Card title="位置与配置" className="mb-6">
        <Paragraph className="mb-4">
          Notification 支持 6 个弹出位置。不同位置适用于不同场景：
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><Text code>topRight</Text>（默认）—— 最常见，不遮挡左侧导航</li>
            <li><Text code>topLeft</Text> —— 适合 RTL 布局</li>
            <li><Text code>bottomRight</Text> / <Text code>bottomLeft</Text> —— 适合聊天/消息类应用</li>
            <li><Text code>top</Text> / <Text code>bottom</Text> —— 居中通知，更醒目</li>
          </ul>
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>弹出位置</Text>
            <Select
              value={placement}
              onChange={setPlacement}
              style={{ width: '100%' }}
              options={[
                { value: 'topLeft', label: '左上' },
                { value: 'topRight', label: '右上' },
                { value: 'bottomLeft', label: '左下' },
                { value: 'bottomRight', label: '右下' },
                { value: 'top', label: '顶部居中' },
                { value: 'bottom', label: '底部居中' },
              ]}
            />
          </Col>
          <Col span={8}>
            <Text strong>持续时间(秒)</Text>
            <InputNumber min={1} max={30} value={duration} onChange={(v) => setDuration(v ?? 4.5)} style={{ width: '100%' }} />
          </Col>
          <Col span={8}>
            <Text strong>带操作按钮</Text>
            <Switch checked={withBtn} onChange={setWithBtn} />
          </Col>
        </Row>
        <Divider />
        <Button type="primary" onClick={withBtn ? openWithBtn : () => openBasic('info')}>
          {withBtn ? '发送带按钮的通知' : '发送通知'}
        </Button>
      </Card>

      <Card title="自定义图标与动态更新" className="mb-6">
        <Paragraph className="mb-4">
          <Text strong>自定义图标：</Text>通过 <Text code>icon</Text> 属性替换默认图标。<br />
          <Text strong>动态更新：</Text>通过 <Text code>key</Text> 属性更新同一通知的内容，常用于进度条、状态变化。
        </Paragraph>
        <Space>
          <Button onClick={openCustom}>自定义图标通知</Button>
          <Button type="dashed" onClick={openWithProgress}>模拟上传进度</Button>
        </Space>
      </Card>

      <Card title="Notification vs Message 选择指南" className="mb-6">
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title={<Text strong>✅ 用 Notification" className="mb-4">
            <Space direction="vertical" className="w-full">
              <div><Tag color="blue">复杂内容</Tag> 需要标题+描述+操作</div>
              <div><Tag color="blue">需要交互</Tag> 用户需要点击按钮</div>
              <div><Tag color="blue">持续显示</Tag> 需要用户手动关闭</div>
              <div><Tag color="blue">后台推送</Tag> 系统消息、审批通知</div>
            </Space>
          </Col>
          <Col span={12}>
            <Card size="small" title={<Text strong>✅ 用 Message" className="mb-4">
            <Space direction="vertical" className="w-full">
              <div><Tag color="green">简单反馈</Tag> 操作成功/失败</div>
              <div><Tag color="green">无需交互</Tag> 纯信息展示</div>
              <div><Tag color="green">自动消失</Tag> 短暂提示即可</div>
              <div><Tag color="green">轻量级</Tag> 不打断用户操作流</div>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card title="API 速查">
        <Paragraph>
          <Text strong>notification.useNotification()</Text> —— 推荐方式，返回 <Text code>[api, contextHolder]</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>api 方法：</Text>
          <ul className="list-disc pl-5 space-y-1">
            <li><Text code>api.success/info/warning/error(config)</Text> —— 语义化方法</li>
            <li><Text code>api.open(config)</Text> —— 自定义方法</li>
            <li><Text code>api.destroy(key?)</Text> —— 销毁通知</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <Text strong>核心 config 属性：</Text>
          <Text code>message</Text> 标题、<Text code>description</Text> 描述、<Text code>placement</Text> 位置、
          <Text code>duration</Text> 持续时间、<Text code>icon</Text> 图标、<Text code>btn</Text> 操作按钮、
          <Text code>key</Text> 唯一标识（用于更新）、<Text code>onClose</Text> 关闭回调。
        </Paragraph>
      </Card>
    </div>
  )
}
