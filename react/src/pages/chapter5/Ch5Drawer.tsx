import { useState } from 'react'
import { Typography, Card, Divider, Drawer, Button, Space, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Drawer() {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🗄️ 5.1 Drawer 抽屉</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Drawer 从屏幕边缘滑出的面板，适合展示详情、表单等需要更多空间的交互。
      </Paragraph>

      <Card title="💡 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Drawer
  title="抽屉标题"
  open={open}
  onClose={() => setOpen(false)}
  placement="right"  // left/right/top/bottom
  width={600}
>
  抽屉内容
</Drawer>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <Space>
            <Text strong>方向：</Text>
            {(['left', 'right', 'top', 'bottom'] as const).map(p => (
              <Button key={p} type={placement === p ? 'primary' : 'default'} onClick={() => setPlacement(p)}>{p}</Button>
            ))}
          </Space>
          <Button type="primary" onClick={() => setOpen(true)}>打开抽屉</Button>
          <Drawer title={`${placement} 抽屉`} open={open} onClose={() => setOpen(false)} placement={placement} width={placement === 'left' || placement === 'right' ? 500 : undefined}>
            <p>这是一个从 <Tag color="blue">{placement}</Tag> 方向滑出的抽屉。</p>
            <p>抽屉适合以下场景：</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>详情面板 —— 查看记录详情</li>
              <li>表单面板 —— 编辑/新增表单</li>
              <li>筛选面板 —— 复杂筛选条件</li>
              <li>帮助面板 —— 使用说明</li>
            </ul>
          </Drawer>
        </div>
      </Card>

      <Card title="📋 Drawer vs Modal" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">🗄️ Drawer</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>• 从边缘滑出</li>
              <li>• 空间更大</li>
              <li>• 不遮挡上下文</li>
              <li>• 适合：详情、长表单</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">🪟 Modal</h4>
            <ul className="text-sm space-y-1 text-green-600">
              <li>• 居中弹出</li>
              <li>• 空间有限</li>
              <li>• 聚焦注意力</li>
              <li>• 适合：确认、简单表单</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>placement 控制方向：left/right/top/bottom</li>
          <li>width/height 控制尺寸</li>
          <li>extra 属性添加右上角操作区</li>
          <li>Drawer 空间大，Modal 聚焦强</li>
          <li>destroyOnClose 关闭时销毁内容</li>
        </ul>
      </Card>
    </div>
  )
}
