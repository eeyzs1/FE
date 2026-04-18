import { useState } from 'react'
import { Typography, Card, Space, Pagination, Steps, Button, Result, Divider, Row, Col, Tag, Select } from 'antd'
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Ch4PaginationSteps() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepStatus, setStepStatus] = useState<'wait' | 'process' | 'finish' | 'error'>('process')

  const totalItems = 85

  const stepItems = [
    { title: '账号信息', icon: currentStep === 0 ? <LoadingOutlined /> : <UserOutlined /> },
    { title: '身份验证', icon: <SolutionOutlined /> },
    { title: '审核中', icon: stepStatus === 'error' ? <SmileOutlined /> : undefined },
    { title: '完成', icon: <CheckCircleOutlined /> },
  ]

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      setStepStatus('process')
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setStepStatus('process')
    }
  }

  const errorStep = () => {
    setStepStatus('error')
  }

  const resetSteps = () => {
    setCurrentStep(0)
    setStepStatus('process')
  }

  const mockData = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    status: ['进行中', '已完成', '待审核'][i % 3],
  }))

  const currentData = mockData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📄 Pagination / Steps 分页与步骤</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Pagination 解决数据量大的浏览问题，Steps 解决流程引导问题。两者都是"分步"思维的不同体现。
      </Paragraph>

      <Card title="Pagination 分页" className="mb-6">
        <Paragraph className="mb-4">
          分页的核心决策：<Text strong>何时用分页 vs 无限滚动</Text>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><Tag color="blue">分页</Tag> 数据量确定、需要定位特定页、后台管理</li>
            <li><Tag color="green">无限滚动</Tag> 信息流、社交动态、浏览为主</li>
            <li><Tag color="orange">虚拟列表</Tag> 大数据量（1000+）、需要滚动但保持性能</li>
          </ul>
        </Paragraph>

        <div className="mb-4">
          <Text strong>基础分页 + 数据展示</Text>
          <div className="mt-2 border rounded p-3">
            {currentData.map((item) => (
              <div key={item.id} className="flex justify-between py-1 border-b last:border-b-0">
                <span>{item.name}</span>
                <Tag color={item.status === '已完成' ? 'green' : item.status === '进行中' ? 'blue' : 'orange'}>
                  {item.status}
                </Tag>
              </div>
            ))}
          </div>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={(page, size) => { setCurrentPage(page); setPageSize(size) }}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} / 共 ${total} 条`}
          pageSizeOptions={['5', '10', '20', '50']}
        />

        <Divider />

        <div>
          <Text strong>更多分页样式</Text>
          <div className="mt-3 space-y-4">
            <div>
              <Text type="secondary" className="text-sm">简洁模式（只显示页码）</Text>
              <Pagination simple defaultCurrent={1} total={50} />
            </div>
            <div>
              <Text type="secondary" className="text-sm">迷你模式</Text>
              <Pagination size="small" defaultCurrent={1} total={50} showTotal={(total) => `共 ${total} 条`} />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Steps 步骤条" className="mb-6">
        <Paragraph className="mb-4">
          Steps 的核心价值：<Text strong>降低用户焦虑</Text>。让用户知道"在哪、还剩多少、下一步是什么"。
        </Paragraph>

        <Steps current={currentStep} status={stepStatus} items={stepItems} onChange={setCurrentStep} />

        <Divider />

        <Space>
          <Button onClick={prevStep} disabled={currentStep === 0}>上一步</Button>
          <Button type="primary" onClick={nextStep} disabled={currentStep === 3}>下一步</Button>
          <Button danger onClick={errorStep}>模拟错误</Button>
          <Button onClick={resetSteps}>重置</Button>
        </Space>

        <Divider />

        <div className="text-sm text-gray-500">
          当前步骤: <Tag color="blue">{currentStep + 1}</Tag>
          状态: <Tag color={stepStatus === 'error' ? 'red' : stepStatus === 'finish' ? 'green' : 'blue'}>{stepStatus}</Tag>
        </div>
      </Card>

      <Card title="Steps 变体" className="mb-6">
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <Text strong>竖直步骤条</Text>
            <Steps direction="vertical" current={1} items={[
              { title: '已完成', description: '这是描述信息' },
              { title: '进行中', description: '这是描述信息' },
              { title: '待处理', description: '这是描述信息' },
            ]} className="mt-2" />
          </Col>
          <Col span={24}>
            <Text strong>带图标步骤条</Text>
            <Steps items={[
              { title: '登录', status: 'finish', icon: <UserOutlined /> },
              { title: '验证', status: 'finish', icon: <SolutionOutlined /> },
              { title: '审核', status: 'process', icon: <LoadingOutlined /> },
              { title: '完成', status: 'wait', icon: <SmileOutlined /> },
            ]} className="mt-2" />
          </Col>
          <Col span={24}>
            <Text strong>导航步骤条（可点击切换）</Text>
            <Steps current={currentStep} onChange={setCurrentStep} items={[
              { title: '第一步' },
              { title: '第二步' },
              { title: '第三步' },
            ]} className="mt-2" />
          </Col>
        </Row>
      </Card>

      <Card title="实战：注册流程" className="mb-6">
        <Paragraph className="mb-4">
          Steps + 表单的经典组合，引导用户完成多步操作。
        </Paragraph>
        <Steps current={currentStep} onChange={setCurrentStep} items={[
          { title: '填写信息' },
          { title: '邮箱验证' },
          { title: '完成注册' },
        ]} />
        <div className="mt-4 p-6 bg-gray-50 rounded text-center">
          {currentStep === 0 && (
            <div>
              <Paragraph>请填写用户名、密码等基本信息</Paragraph>
              <Button type="primary" onClick={() => setCurrentStep(1)}>下一步</Button>
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <Paragraph>验证邮件已发送至 your@email.com</Paragraph>
              <Space>
                <Button onClick={() => setCurrentStep(0)}>上一步</Button>
                <Button type="primary" onClick={() => setCurrentStep(2)}>验证完成</Button>
              </Space>
            </div>
          )}
          {currentStep === 2 && (
            <Result status="success" title="注册成功" subTitle="欢迎加入！" extra={<Button type="primary" onClick={resetSteps}>重新开始</Button>} />
          )}
        </div>
      </Card>

      <Card title="API 速查">
        <Paragraph>
          <Text strong>Pagination 核心属性：</Text>
          <Text code>current</Text>（当前页）、<Text code>pageSize</Text>（每页条数）、
          <Text code>total</Text>（总数）、<Text code>onChange</Text>（变化回调）、
          <Text code>showSizeChanger</Text>（显示条数切换）、<Text code>showQuickJumper</Text>（快速跳转）、
          <Text code>showTotal</Text>（总数显示）、<Text code>simple</Text>（简洁模式）
        </Paragraph>
        <Paragraph>
          <Text strong>Steps 核心属性：</Text>
          <Text code>current</Text>（当前步）、<Text code>direction</Text>（horizontal/vertical）、
          <Text code>status</Text>（wait/process/finish/error）、<Text code>onChange</Text>（点击回调）、
          <Text code>items</Text>（步骤项）、<Text code>size</Text>（default/small）
        </Paragraph>
      </Card>
    </div>
  )
}
