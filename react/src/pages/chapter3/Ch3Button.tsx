import { useState } from 'react'
import { Typography, Card, Divider, Button, Space, Tooltip, Popconfirm, Badge } from 'antd'
import { SearchOutlined, PlusOutlined, DownloadOutlined, DeleteOutlined, HeartOutlined, HeartFilled, ThunderboltOutlined, CloudUploadOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function Ch3Button() {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAsyncClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🔘 3.1 Button 按钮</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Button 是最基础的交互组件。Ant Design 提供了丰富的按钮类型、尺寸和状态。
      </Paragraph>

      <Card title="💡 按钮类型" className="mb-6">
        <Paragraph>通过 <Text code>type</Text> 属性设置按钮的视觉样式：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Button type="primary">主要按钮</Button>
<Button>默认按钮</Button>
<Button type="dashed">虚线按钮</Button>
<Button type="text">文字按钮</Button>
<Button type="link">链接按钮</Button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button type="primary">主要按钮</Button>
            <Button>默认按钮</Button>
            <Button type="dashed">虚线按钮</Button>
            <Button type="text">文字按钮</Button>
            <Button type="link">链接按钮</Button>
          </Space>
        </div>
      </Card>

      <Card title="🎨 图标按钮" className="mb-6">
        <Paragraph>搭配图标使用，让按钮更具表现力：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

<Button type="primary" icon={<SearchOutlined />}>搜索</Button>
<Button icon={<PlusOutlined />}>新增</Button>
<Button type="primary" icon={<DownloadOutlined />} shape="circle" />
<Button icon={<SearchOutlined />} shape="circle" />`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
            <Button icon={<PlusOutlined />}>新增</Button>
            <Button type="primary" icon={<DownloadOutlined />} shape="circle" />
            <Button icon={<SearchOutlined />} shape="circle" />
            <Button type="dashed" icon={<CloudUploadOutlined />}>上传</Button>
          </Space>
        </div>
      </Card>

      <Card title="📏 按钮尺寸" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Button type="primary" size="large">大按钮</Button>
<Button type="primary">中按钮</Button>
<Button type="primary" size="small">小按钮</Button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space>
            <Button type="primary" size="large">大按钮</Button>
            <Button type="primary">中按钮</Button>
            <Button type="primary" size="small">小按钮</Button>
          </Space>
        </div>
      </Card>

      <Card title="⚡ 按钮状态" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 禁用
<Button disabled>禁用按钮</Button>

// 加载中
<Button loading={loading} onClick={handleClick}>
  提交
</Button>

// 危险按钮
<Button danger type="primary">删除</Button>

// 幽灵按钮（背景透明）
<Button type="primary" ghost>Ghost</Button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button disabled>禁用按钮</Button>
            <Button type="primary" loading={loading} onClick={handleAsyncClick}>
              {loading ? '提交中...' : '点击提交'}
            </Button>
            <Button danger type="primary" icon={<DeleteOutlined />}>删除</Button>
            <Button type="primary" ghost>Ghost</Button>
          </Space>
        </div>
      </Card>

      <Card title="🎭 交互增强" className="mb-6">
        <Paragraph>配合 Tooltip、Popconfirm、Badge 等组件增强交互：</Paragraph>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Tooltip title="点击收藏">
              <Button
                type={liked ? 'primary' : 'default'}
                icon={liked ? <HeartFilled /> : <HeartOutlined />}
                onClick={() => setLiked(!liked)}
              >
                {liked ? '已收藏' : '收藏'}
              </Button>
            </Tooltip>
            <Popconfirm title="确定删除吗？" onConfirm={() => alert('已删除')} okText="确定" cancelText="取消">
              <Button danger type="primary">确认删除</Button>
            </Popconfirm>
            <Badge count={5}>
              <Button>消息</Button>
            </Badge>
            <Tooltip title="闪电操作">
              <Button type="primary" shape="circle" icon={<ThunderboltOutlined />} />
            </Tooltip>
          </Space>
        </div>
      </Card>

      <Card title="🌟 TailwindCSS + Ant Design Button" className="mb-6">
        <Paragraph>用 TailwindCSS 给 Ant Design 按钮添加额外样式：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 用 className 添加 Tailwind 样式
<Button type="primary" className="!rounded-full !px-8">
  圆角按钮
</Button>

<Button className="!border-indigo-500 !text-indigo-500 
  hover:!bg-indigo-50">
  自定义颜色
</Button>`}</pre>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <Space wrap>
            <Button type="primary" className="!rounded-full !px-8">圆角按钮</Button>
            <Button className="!border-indigo-500 !text-indigo-500 hover:!bg-indigo-50">自定义颜色</Button>
            <Button type="primary" className="!bg-gradient-to-r !from-indigo-500 !to-purple-500 !border-none">
              渐变按钮
            </Button>
          </Space>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li><Text code>type</Text> 控制按钮视觉类型：primary / default / dashed / text / link</li>
          <li><Text code>icon</Text> 添加图标，<Text code>shape="circle"</Text> 圆形按钮</li>
          <li><Text code>size</Text> 控制大小：large / middle / small</li>
          <li><Text code>loading</Text>、<Text code>disabled</Text>、<Text code>danger</Text> 控制状态</li>
          <li>配合 Tooltip、Popconfirm 增强交互体验</li>
          <li>TailwindCSS className 可以覆盖和扩展 Ant Design 样式</li>
        </ul>
      </Card>
    </div>
  )
}
