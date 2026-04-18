import { useState } from 'react'
import { Typography, Card, Row, Col, Switch, Tag, Select, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Interactivity() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [cursorType, setCursorType] = useState('cursor-pointer')
  const [resizeDir, setResizeDir] = useState('resize')

  const cursors = ['cursor-auto', 'cursor-default', 'cursor-pointer', 'cursor-wait', 'cursor-text', 'cursor-move', 'cursor-not-allowed', 'cursor-zoom-in', 'cursor-zoom-out', 'cursor-grab', 'cursor-grabbing', 'cursor-crosshair']
  const resizes = ['resize-none', 'resize', 'resize-y', 'resize-x']

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🖱️ TailwindCSS 交互性工具类</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        交互性工具类控制用户与元素的交互方式：光标、选择、滚动、拖拽、指针事件等。
        这些类直接影响用户体验，但常被忽视。
      </Paragraph>

      <Card title="光标样式" className="mb-6">
        <Paragraph className="mb-4">
          光标是用户理解"可交互性"的第一信号。选对光标 = 降低认知负担。
        </Paragraph>
        <Row gutter={[16, 16]}>
          {[
            { cls: 'cursor-pointer', desc: '可点击', use: '按钮、链接' },
            { cls: 'cursor-not-allowed', desc: '禁止操作', use: '禁用状态' },
            { cls: 'cursor-wait', desc: '等待中', use: '加载状态' },
            { cls: 'cursor-text', desc: '可输入', use: '输入框' },
            { cls: 'cursor-move', desc: '可移动', use: '拖拽元素' },
            { cls: 'cursor-grab', desc: '可抓取', use: '拖拽区域' },
            { cls: 'cursor-zoom-in', desc: '放大', use: '图片预览' },
            { cls: 'cursor-crosshair', desc: '精确选择', use: '画布、截图' },
          ].map(({ cls, desc, use }) => (
            <Col span={6} key={cls}>
              <div className={`p-4 border rounded-lg text-center ${cls} hover:border-indigo-400 transition-colors`}>
                <Text strong>{desc}</Text>
                <br />
                <Text type="secondary" className="text-xs">{use}</Text>
              </div>
              <Tag color="blue" className="mt-1 text-xs">{cls}</Tag>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="选择与用户交互" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>文本选择控制</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-gray-50 rounded select-none">
                <Text>select-none: 无法选中文字</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded select-text">
                <Text>select-text: 可以选中文字</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded select-all">
                <Text>select-all: 点击全选</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded select-auto">
                <Text>select-auto: 浏览器默认</Text>
              </div>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>select-none</Text> 最常用：按钮、图标、卡片等不需要选中文字的交互元素
            </Paragraph>
          </Col>
          <Col span={8}>
            <Text strong>指针事件</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-indigo-100 rounded pointer-events-none">
                <Text>pointer-events-none: 忽略所有鼠标事件</Text>
              </div>
              <div className="p-3 bg-green-100 rounded pointer-events-auto">
                <Text>pointer-events-auto: 正常响应</Text>
              </div>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>pointer-events-none</Text> 常见场景：遮罩层下的元素不响应点击、装饰性覆盖层
            </Paragraph>
          </Col>
          <Col span={8}>
            <Text strong>调整大小</Text>
            <div className="mt-2 space-y-2">
              <textarea className={`w-full p-2 border rounded ${resizeDir}`} rows={2} placeholder="试试拖拽右下角" />
              <Select value={resizeDir} onChange={setResizeDir} style={{ width: '100%' }} options={resizes.map(s => ({ value: s, label: s }))} />
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>resize-none</Text> 最常用：禁止 textarea 默认可拖拽行为
            </Paragraph>
          </Col>
        </Row>
      </Card>

      <Card title="滚动控制" className="mb-6">
        <Paragraph className="mb-4">
          滚动控制是长列表和布局的关键：
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>scroll 自动</Text>
            <div className="h-32 overflow-auto border rounded p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="py-1 border-b last:border-b-0">滚动项 {i + 1}</div>
              ))}
            </div>
            <Tag color="blue" className="mt-1">overflow-auto</Tag>
          </Col>
          <Col span={8}>
            <Text strong>scroll 隐藏滚动条</Text>
            <div className="h-32 overflow-y-scroll scrollbar-hide border rounded p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="py-1 border-b last:border-b-0">滚动项 {i + 1}</div>
              ))}
            </div>
            <Tag color="green" className="mt-1">scrollbar-hide</Tag>
          </Col>
          <Col span={8}>
            <Text strong>snap 吸附</Text>
            <div className="h-32 overflow-y-scroll snap-y snap-mandatory border rounded">
              {['🔴 红色', '🟢 绿色', '🔵 蓝色', '🟡 黄色', '🟣 紫色'].map((item, i) => (
                <div key={i} className="h-32 snap-start flex items-center justify-center text-xl font-bold bg-gray-50">
                  {item}
                </div>
              ))}
            </div>
            <Tag color="purple" className="mt-1">snap-y snap-mandatory</Tag>
          </Col>
        </Row>
      </Card>

      <Card title="触摸与手势" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>触摸操作</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-gray-50 rounded touch-none">
                <Text>touch-none: 禁止触摸操作</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded touch-pan-x">
                <Text>touch-pan-x: 只允许水平滑动</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded touch-pinch-zoom">
                <Text>touch-pinch-zoom: 允许双指缩放</Text>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <Text strong>过滚动行为</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-gray-50 rounded overscroll-auto">
                <Text>overscroll-auto: 默认行为</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded overscroll-contain">
                <Text>overscroll-contain: 阻止传播</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded overscroll-none">
                <Text>overscroll-none: 禁止过滚动</Text>
              </div>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>overscroll-contain</Text> 最常用：模态框内滚动不影响背景
            </Paragraph>
          </Col>
          <Col span={8}>
            <Text strong>粘性定位</Text>
            <div className="mt-2 h-40 overflow-auto border rounded">
              <div className="sticky top-0 bg-indigo-500 text-white p-2 font-bold z-10">粘性标题</div>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="p-2 border-b">内容项 {i + 1}</div>
              ))}
            </div>
            <Tag color="blue" className="mt-1">sticky top-0</Tag>
          </Col>
        </Row>
      </Card>

      <Card title="无障碍交互" className="mb-6">
        <Paragraph className="mb-4">
          无障碍（Accessibility）不是可选项，是必须项。TailwindCSS 提供了相关工具类：
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>屏幕阅读器</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-gray-50 rounded relative">
                <Text>可见文字</Text>
                <span className="sr-only">仅屏幕阅读器可见</span>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="not-sr-only">正常显示的文字</span>
              </div>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>sr-only</Text>：视觉隐藏但屏幕阅读器可读。用于图标按钮的文本替代
            </Paragraph>
          </Col>
          <Col span={8}>
            <Text strong>焦点样式</Text>
            <div className="mt-2 space-y-2">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2">
                focus:ring 焦点环
              </button>
              <br />
              <button className="px-4 py-2 bg-gray-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                focus-visible 仅键盘焦点
              </button>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              <Text code>focus-visible</Text> 比 <Text code>focus</Text> 更好：只在键盘导航时显示焦点环，鼠标点击不显示
            </Paragraph>
          </Col>
          <Col span={8}>
            <Text strong>强制颜色</Text>
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-gray-50 rounded forced-color-adjust-auto">
                <Text>forced-color-adjust-auto</Text>
              </div>
              <div className="p-3 bg-gray-50 rounded forced-color-adjust-none">
                <Text>forced-color-adjust-none</Text>
              </div>
            </div>
            <Paragraph className="text-sm text-gray-500 mt-2">
              Windows 高对比度模式下的颜色适配
            </Paragraph>
          </Col>
        </Row>
      </Card>

      <Card title="交互性速查表" className="mb-6">
        <Row gutter={[16, 16]}>
          {[
            { category: '光标', classes: 'cursor-pointer, cursor-not-allowed, cursor-wait, cursor-move, cursor-grab' },
            { category: '选择', classes: 'select-none, select-text, select-all' },
            { category: '指针', classes: 'pointer-events-none, pointer-events-auto' },
            { category: '滚动', classes: 'overflow-auto, overflow-hidden, overflow-scroll, overscroll-contain' },
            { category: '吸附', classes: 'snap-start, snap-center, snap-end, snap-mandatory' },
            { category: '调整', classes: 'resize-none, resize, resize-x, resize-y' },
            { category: '触摸', classes: 'touch-none, touch-pan-x, touch-pinch-zoom' },
            { category: '无障碍', classes: 'sr-only, not-sr-only, focus-visible:ring-*' },
          ].map(({ category, classes }) => (
            <Col span={12} key={category}>
              <Card size="small" title={category}>
                <div className="flex flex-wrap gap-1">
                  {classes.split(', ').map((cls) => (
                    <Tag key={cls} color="blue">{cls}</Tag>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  )
}
