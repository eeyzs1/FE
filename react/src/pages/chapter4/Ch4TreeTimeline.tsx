import { useState } from 'react'
import { Typography, Card, Space, Tree, Timeline, Tag, Switch, Input, Button, Divider, Row, Col } from 'antd'
import type { TreeProps } from 'antd'
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  FileOutlined,
  FolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const treeData: TreeProps['treeData'] = [
  {
    title: 'src',
    key: 'src',
    icon: <FolderOutlined />,
    children: [
      {
        title: 'components',
        key: 'components',
        icon: <FolderOutlined />,
        children: [
          { title: 'Header.tsx', key: 'header', icon: <FileOutlined />, isLeaf: true },
          { title: 'Footer.tsx', key: 'footer', icon: <FileOutlined />, isLeaf: true },
          { title: 'Sidebar.tsx', key: 'sidebar', icon: <FileOutlined />, isLeaf: true },
        ],
      },
      {
        title: 'pages',
        key: 'pages',
        icon: <FolderOutlined />,
        children: [
          { title: 'Home.tsx', key: 'home', icon: <FileOutlined />, isLeaf: true },
          { title: 'About.tsx', key: 'about', icon: <FileOutlined />, isLeaf: true },
          { title: 'Dashboard.tsx', key: 'dashboard', icon: <FileOutlined />, isLeaf: true },
        ],
      },
      { title: 'App.tsx', key: 'app', icon: <FileOutlined />, isLeaf: true },
      { title: 'main.tsx', key: 'main', icon: <FileOutlined />, isLeaf: true },
    ],
  },
  {
    title: 'public',
    key: 'public',
    icon: <FolderOutlined />,
    children: [
      { title: 'index.html', key: 'index', icon: <FileOutlined />, isLeaf: true },
      { title: 'favicon.ico', key: 'favicon', icon: <FileOutlined />, isLeaf: true },
    ],
  },
  { title: 'package.json', key: 'package', icon: <FileOutlined />, isLeaf: true },
  { title: 'tsconfig.json', key: 'tsconfig', icon: <FileOutlined />, isLeaf: true },
]

const orgData: TreeProps['treeData'] = [
  {
    title: 'CEO - 张总',
    key: 'ceo',
    children: [
      {
        title: 'CTO - 李工',
        key: 'cto',
        children: [
          { title: '前端组 - 王明', key: 'fe' },
          { title: '后端组 - 赵强', key: 'be' },
          { title: '测试组 - 孙丽', key: 'qa' },
        ],
      },
      {
        title: 'CFO - 陈总',
        key: 'cfo',
        children: [
          { title: '财务部 - 刘芳', key: 'finance' },
          { title: '审计部 - 周正', key: 'audit' },
        ],
      },
      {
        title: 'COO - 吴总',
        key: 'coo',
        children: [
          { title: '运营部 - 郑华', key: 'ops' },
          { title: '市场部 - 黄磊', key: 'marketing' },
        ],
      },
    ],
  },
]

export default function Ch4TreeTimeline() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['src', 'components'])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [showLine, setShowLine] = useState(true)
  const [showIcon, setShowIcon] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  const onSelect: TreeProps['onSelect'] = (keys) => {
    setSelectedKeys(keys)
  }

  const onCheck: TreeProps['onCheck'] = (keys) => {
    setCheckedKeys(keys as React.Key[])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🌳 Tree / Timeline 树形与时间线</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Tree 用于层级数据展示与选择，Timeline 用于时间序列展示。两者都是"结构化信息"的可视化方案。
      </Paragraph>

      <Card title="Tree 树形控件" className="mb-6">
        <Paragraph className="mb-4">
          Tree 的核心场景：<br />
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><Tag color="blue">文件目录</Tag> —— 项目结构、文件夹浏览</li>
            <li><Tag color="green">组织架构</Tag> —— 公司部门、人员树</li>
            <li><Tag color="orange">权限配置</Tag> —— 菜单权限、数据权限</li>
            <li><Tag color="purple">分类选择</Tag> —— 商品分类、地区选择</li>
          </ul>
        </Paragraph>

        <Row gutter={24}>
          <Col span={14}>
            <div className="mb-3 flex gap-2">
              <Switch checked={showLine} onChange={setShowLine} size="small" />
              <Text className="text-sm">连接线</Text>
              <Switch checked={showIcon} onChange={setShowIcon} size="small" className="ml-2" />
              <Text className="text-sm">图标</Text>
            </div>
            <Tree
              showLine={showLine}
              showIcon={showIcon}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              checkedKeys={checkedKeys}
              onExpand={setExpandedKeys}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
              checkable
              defaultExpandAll={false}
            />
            <div className="mt-2 text-sm text-gray-500">
              选中: {selectedKeys.length > 0 ? selectedKeys.map(k => <Tag key={k} color="blue">{String(k)}</Tag>) : '(无)'}
              <br />
              勾选: {checkedKeys.length > 0 ? `${checkedKeys.length} 项` : '(无)'}
            </div>
          </Col>
          <Col span={10}>
            <Card size="small" title="Tree 要点" className="mb-3">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><Text code>expandedKeys</Text> 控制展开</li>
                <li><Text code>selectedKeys</Text> 控制选中</li>
                <li><Text code>checkedKeys</Text> 控制勾选</li>
                <li>三者都是受控模式，需配合 state</li>
                <li><Text code>checkable</Text> 开启勾选框</li>
                <li><Text code>draggable</Text> 开启拖拽</li>
                <li><Text code>showLine</Text> 显示连接线</li>
              </ul>
            </Card>
            <Card size="small" title="性能提示">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>大数据量（1000+节点）使用 <Text code>virtual</Text> 属性</li>
                <li>异步加载用 <Text code>loadData</Text></li>
                <li>搜索过滤用 <Text code>treeData</Text> 过滤后重新渲染</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Tree 组织架构示例" className="mb-6">
        <Paragraph className="mb-4">
          Tree 展示组织架构时的常见模式：目录树 + 详情面板。
        </Paragraph>
        <Row gutter={24}>
          <Col span={12}>
            <Tree
              showLine
              defaultExpandAll
              treeData={orgData}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
            />
          </Col>
          <Col span={12}>
            <Card size="small" title="选中信息">
              {selectedKeys.length > 0 ? (
                <div>
                  <Paragraph>选中节点: <Tag color="blue">{String(selectedKeys[0])}</Tag></Paragraph>
                  <Paragraph className="text-sm text-gray-500">实际项目中，这里会展示该节点对应的详细信息</Paragraph>
                </div>
              ) : (
                <Paragraph type="secondary">点击左侧节点查看详情</Paragraph>
              )}
            </Card>
          </Col>
        </Row>
      </Card>

      <Card title="Timeline 时间线" className="mb-6">
        <Paragraph className="mb-4">
          Timeline 的核心场景：<br />
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><Tag color="blue">操作日志</Tag> —— 用户行为追踪</li>
            <li><Tag color="green">流程进度</Tag> —— 审批流程、订单状态</li>
            <li><Tag color="orange">版本历史</Tag> —— 发布记录、变更日志</li>
            <li><Tag color="purple">消息通知</Tag> —— 系统通知时间线</li>
          </ul>
        </Paragraph>

        <Row gutter={24}>
          <Col span={12}>
            <Text strong>基础时间线</Text>
            <Timeline className="mt-2">
              <Timeline.Item>创建项目 2024-01-01</Timeline.Item>
              <Timeline.Item>通过初审 2024-01-05</Timeline.Item>
              <Timeline.Item>发布上线 2024-01-10</Timeline.Item>
              <Timeline.Item>版本迭代 2024-02-01</Timeline.Item>
            </Timeline>
          </Col>
          <Col span={12}>
            <Text strong>带状态时间线</Text>
            <Timeline className="mt-2">
              <Timeline.Item color="green">需求确认</Timeline.Item>
              <Timeline.Item color="green">设计完成</Timeline.Item>
              <Timeline.Item color="blue" dot={<SyncOutlined spin />}>开发中</Timeline.Item>
              <Timeline.Item color="gray">测试</Timeline.Item>
              <Timeline.Item color="gray">上线</Timeline.Item>
            </Timeline>
          </Col>
        </Row>
      </Card>

      <Card title="Timeline 进阶用法" className="mb-6">
        <Row gutter={24}>
          <Col span={12}>
            <Text strong>自定义节点</Text>
            <Timeline className="mt-2">
              <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />} color="green">
                <div>
                  <Text strong>部署成功</Text>
                  <br />
                  <Text type="secondary" className="text-sm">2024-01-15 14:30</Text>
                </div>
              </Timeline.Item>
              <Timeline.Item dot={<CloseCircleOutlined style={{ fontSize: '16px' }} />} color="red">
                <div>
                  <Text strong>构建失败</Text>
                  <br />
                  <Text type="secondary" className="text-sm">2024-01-15 14:25</Text>
                  <br />
                  <Tag color="red">Error: Module not found</Tag>
                </div>
              </Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} color="blue">
                <div>
                  <Text strong>等待审核</Text>
                  <br />
                  <Text type="secondary" className="text-sm">预计 2 小时内完成</Text>
                </div>
              </Timeline.Item>
            </Timeline>
          </Col>
          <Col span={12}>
            <Text strong>交替展示</Text>
            <Timeline mode="alternate" className="mt-2">
              <Timeline.Item>创建服务 2024-01-01</Timeline.Item>
              <Timeline.Item color="green">通过初审 2024-01-05</Timeline.Item>
              <Timeline.Item dot={<SyncOutlined spin />} color="blue">复审中</Timeline.Item>
              <Timeline.Item color="red">驳回 2024-01-12</Timeline.Item>
              <Timeline.Item color="green">最终通过 2024-01-15</Timeline.Item>
            </Timeline>
          </Col>
        </Row>
      </Card>

      <Card title="API 速查">
        <Paragraph>
          <Text strong>Tree 核心属性：</Text>
          <Text code>treeData</Text>（数据）、<Text code>expandedKeys</Text>（展开项）、
          <Text code>selectedKeys</Text>（选中项）、<Text code>checkedKeys</Text>（勾选项）、
          <Text code>checkable</Text>（勾选框）、<Text code>draggable</Text>（拖拽）、
          <Text code>showLine</Text>（连接线）、<Text code>loadData</Text>（异步加载）、
          <Text code>onSelect/onCheck/onExpand</Text>（回调）
        </Paragraph>
        <Paragraph>
          <Text strong>Timeline 核心属性：</Text>
          <Text code>mode</Text>（left/right/alternate）、<Text code>items</Text>（时间线项）
        </Paragraph>
        <Paragraph>
          <Text strong>Timeline.Item 核心属性：</Text>
          <Text code>color</Text>（blue/red/green/gray）、<Text code>dot</Text>（自定义节点）、
          <Text code>position</Text>（left/right）
        </Paragraph>
      </Card>
    </div>
  )
}
