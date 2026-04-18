import { useState } from 'react'
import { Typography, Card, Space, Progress, Skeleton, Spin, Button, Switch, Row, Col, Slider, Divider, Tag, Alert } from 'antd'
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Ch4ProgressSpin() {
  const [progress, setProgress] = useState(66)
  const [loading, setLoading] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const simulateProgress = () => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📊 Progress / Skeleton / Spin 加载反馈</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        三种加载反馈组件，解决不同场景：<br />
        <Text strong>Progress</Text> —— 已知进度（如文件上传、数据处理）<br />
        <Text strong>Skeleton</Text> —— 内容加载占位（如列表、卡片、详情）<br />
        <Text strong>Spin</Text> —— 未知进度等待（如 API 请求、异步操作）
      </Paragraph>

      <Card title="Progress 进度条" className="mb-6">
        <Paragraph className="mb-4">
          Progress 有三种形态：<Text code>line</Text>（线形）、<Text code>circle</Text>（圆形）、<Text code>dashboard</Text>（仪表盘）。
          选择依据：线形适合页面内嵌、圆形/仪表盘适合独立展示。
        </Paragraph>

        <Space direction="vertical" className="w-full" size="large">
          <div>
            <Text strong>线形进度条</Text>
            <Progress percent={progress} />
            <Progress percent={progress} status="active" />
            <Progress percent={100} status="success" />
            <Progress percent={30} status="exception" />
          </div>

          <Divider />

          <div>
            <Text strong>渐变进度条</Text>
            <Progress percent={progress} strokeColor={{ '0%': '#6366f1', '100%': '#06b6d4' }} />
            <Progress percent={progress} strokeColor={{ '0%': '#f59e0b', '100%': '#ef4444' }} />
          </div>

          <Divider />

          <Row gutter={24} align="middle">
            <Col span={8} className="text-center">
              <Text strong>圆形</Text>
              <Progress type="circle" percent={Math.round(progress)} size={120} />
            </Col>
            <Col span={8} className="text-center">
              <Text strong>仪表盘</Text>
              <Progress type="dashboard" percent={Math.round(progress)} size={120} gapDegree={30} />
            </Col>
            <Col span={8} className="text-center">
              <Text strong>小尺寸</Text>
              <Progress type="circle" percent={Math.round(progress)} size={80} strokeColor="#6366f1" />
            </Col>
          </Row>

          <Divider />

          <div>
            <Text strong>交互控制</Text>
            <Slider min={0} max={100} value={Math.round(progress)} onChange={(v) => setProgress(v)} />
            <Space>
              <Button type="primary" onClick={simulateProgress}>模拟进度</Button>
              <Button onClick={() => setProgress(0)}>重置</Button>
            </Space>
          </div>

          <Divider />

          <div>
            <Text strong>分段进度条</Text>
            <Progress percent={60} success={{ percent: 30 }} />
            <Paragraph className="text-sm text-gray-500 mt-1">
              通过 <Text code>success.percent</Text> 展示已完成和进行中的不同阶段
            </Paragraph>
          </div>
        </Space>
      </Card>

      <Card title="Skeleton 骨架屏" className="mb-6">
        <Paragraph className="mb-4">
          骨架屏的核心价值：<Text strong>减少感知等待时间</Text>。用户看到内容轮廓而非空白，心理上感觉加载更快。
        </Paragraph>

        <Row gutter={24}>
          <Col span={12}>
            <Text strong>基础骨架</Text>
            <Switch checked={skeletonLoading} onChange={setSkeletonLoading} className="ml-2" />
            <div className="mt-2">
              <Skeleton loading={skeletonLoading} active paragraph={{ rows: 3 }}>
                <Card size="small">
                  <Title level={5}>真实内容标题</Title>
                  <Paragraph>这是加载完成后展示的真实内容。骨架屏在数据未到达时提供视觉占位，避免页面闪烁。</Paragraph>
                  <Space>
                    <Tag color="blue">React</Tag>
                    <Tag color="green">Ant Design</Tag>
                    <Tag color="cyan">TailwindCSS</Tag>
                  </Space>
                </Card>
              </Skeleton>
            </div>
          </Col>
          <Col span={12}>
            <Text strong>头像+标题骨架</Text>
            <Skeleton loading={skeletonLoading} active avatar paragraph={{ rows: 2 }}>
              <Card size="small">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">R</div>
                  <div>
                    <Text strong>React 大师</Text>
                    <br />
                    <Text type="secondary">前端开发工程师</Text>
                  </div>
                </div>
              </Card>
            </Skeleton>
          </Col>
        </Row>

        <Divider />

        <div>
          <Text strong>自定义骨架形状</Text>
          <div className="mt-2 flex gap-4">
            <Skeleton.Input active style={{ width: 200 }} />
            <Skeleton.Image active style={{ width: 120, height: 80 }} />
            <Skeleton.Button active style={{ width: 120 }} />
          </div>
          <Paragraph className="text-sm text-gray-500 mt-2">
            <Text code>Skeleton.Input</Text>、<Text code>Skeleton.Image</Text>、<Text code>Skeleton.Button</Text> 分别对应输入框、图片、按钮的占位
          </Paragraph>
        </div>
      </Card>

      <Card title="Spin 加载中" className="mb-6">
        <Paragraph className="mb-4">
          Spin 适用于：<Text strong>不确定加载时间</Text>的场景。与 Progress 的区别是 Progress 有明确百分比，Spin 没有。
        </Paragraph>

        <Row gutter={24}>
          <Col span={8}>
            <Text strong>基础用法</Text>
            <div className="mt-2">
              <Spin spinning={spinning} tip="加载中...">
                <Card size="small">
                  <Paragraph>这段内容可以被 Spin 包裹，加载时显示遮罩。</Paragraph>
                  <Button onClick={() => { setSpinning(true); setTimeout(() => setSpinning(false), 2000) }}>
                    触发加载
                  </Button>
                </Card>
              </Spin>
            </div>
          </Col>
          <Col span={8}>
            <Text strong>自定义指示器</Text>
            <div className="mt-2 flex flex-col items-center gap-4">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              <Spin indicator={<SyncOutlined style={{ fontSize: 24 }} spin />} />
              <Spin size="large" />
            </div>
          </Col>
          <Col span={8}>
            <Text strong>独立使用</Text>
            <div className="mt-2">
              <Space direction="vertical" align="center">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
                <Spin tip="加载中...">
                  <div className="p-4 bg-gray-50 rounded">内容区域</div>
                </Spin>
              </Space>
            </div>
          </Col>
        </Row>

        <Divider />

        <Alert
          type="info"
          message="选择指南"
          description={
            <ul className="list-disc pl-5 space-y-1 mb-0">
              <li><Text strong>已知进度</Text> → Progress（文件上传、数据处理）</li>
              <li><Text strong>内容占位</Text> → Skeleton（列表、卡片、详情页）</li>
              <li><Text strong>未知等待</Text> → Spin（API 请求、异步操作）</li>
              <li><Text strong>页面级</Text> → 全局 Spin；<Text strong>区域级</Text> → 局部 Spin/Skeleton</li>
            </ul>
          }
        />
      </Card>
    </div>
  )
}
