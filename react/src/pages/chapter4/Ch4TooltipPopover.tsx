import { Typography, Card, Divider, Tooltip, Popover, Button, Space, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch4TooltipPopover() {
  const content = (
    <div>
      <p className="font-bold">提示内容</p>
      <p className="text-sm text-gray-500">这里可以放更详细的信息</p>
      <div className="mt-2 flex gap-2">
        <Button size="small" type="primary">确定</Button>
        <Button size="small">取消</Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>💬 4.2 Tooltip & Popover</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Tooltip 提供简单文字提示，Popover 提供富内容浮层。两者是交互增强的核心组件。
      </Paragraph>

      <Card title="💡 Tooltip 文字提示" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Tooltip title="提示文字">
  <Button>悬停查看</Button>
</Tooltip>

// 12 个方向
<Tooltip placement="top" title="上方" />
<Tooltip placement="topLeft" title="左上" />
<Tooltip placement="topRight" title="右上" />
<Tooltip placement="bottom" title="下方" />
<Tooltip placement="left" title="左侧" />
<Tooltip placement="right" title="右侧" />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="grid grid-cols-4 gap-3">
            {[
              { placement: 'top' as const, label: '上' },
              { placement: 'topLeft' as const, label: '左上' },
              { placement: 'topRight' as const, label: '右上' },
              { placement: 'right' as const, label: '右' },
              { placement: 'rightTop' as const, label: '右上' },
              { placement: 'rightBottom' as const, label: '右下' },
              { placement: 'bottom' as const, label: '下' },
              { placement: 'bottomLeft' as const, label: '左下' },
              { placement: 'bottomRight' as const, label: '右下' },
              { placement: 'left' as const, label: '左' },
              { placement: 'leftTop' as const, label: '左上' },
              { placement: 'leftBottom' as const, label: '左下' },
            ].map(item => (
              <Tooltip key={item.placement} placement={item.placement} title={`${item.placement} 提示`}>
                <Button className="w-full">{item.label}</Button>
              </Tooltip>
            ))}
          </div>
        </div>
      </Card>

      <Card title="💭 Popover 气泡卡片" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Popover content={content} title="标题">
  <Button>点击查看</Button>
</Popover>

// trigger 触发方式
<Popover trigger="hover" content="悬停触发" />
<Popover trigger="click" content="点击触发" />
<Popover trigger="focus" content="聚焦触发" />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <Space wrap>
            <Popover content={content} title="操作确认">
              <Button type="primary">点击弹出 Popover</Button>
            </Popover>
            <Popover content="悬停即可看到" trigger="hover">
              <Button>悬停触发</Button>
            </Popover>
          </Space>
        </div>
      </Card>

      <Card title="📊 Tooltip vs Popover 对比" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">💬 Tooltip</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>• 简单文字提示</li>
              <li>• 默认 hover 触发</li>
              <li>• 不支持复杂内容</li>
              <li>• 适合：简短说明</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">💭 Popover</h4>
            <ul className="text-sm space-y-1 text-green-600">
              <li>• 富内容浮层</li>
              <li>• 默认 click 触发</li>
              <li>• 支持按钮、表单等</li>
              <li>• 适合：操作确认、详情</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Tooltip：简单文字提示，12 个方向</li>
          <li>Popover：富内容浮层，支持 title + content</li>
          <li><Text code>trigger</Text>：hover / click / focus</li>
          <li><Text code>placement</Text>：控制弹出方向</li>
          <li>Tooltip 适合简短提示，Popover 适合复杂交互</li>
        </ul>
      </Card>
    </div>
  )
}
