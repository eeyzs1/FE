import { useState } from 'react'
import { Typography, Card, Row, Col, Select, Tag, Switch, Slider } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5BackgroundsBorders() {
  const [bgColor, setBgColor] = useState('bg-indigo-500')
  const [borderWidth, setBorderWidth] = useState('border-2')
  const [borderColor, setBorderColor] = useState('border-indigo-500')
  const [borderRadius, setBorderRadius] = useState('rounded-lg')
  const [borderStyle, setBorderStyle] = useState('border-solid')
  const [shadowSize, setShadowSize] = useState('shadow-md')
  const [isRing, setIsRing] = useState(false)
  const [ringColor, setRingColor] = useState('ring-indigo-500')

  const bgColors = ['bg-slate-500', 'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500']
  const borderWidths = ['border-0', 'border', 'border-2', 'border-4', 'border-8']
  const borderColors = ['border-gray-300', 'border-red-500', 'border-blue-500', 'border-green-500', 'border-indigo-500', 'border-purple-500', 'border-pink-500']
  const borderRadiuses = ['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full']
  const borderStyles = ['border-solid', 'border-dashed', 'border-dotted', 'border-double', 'border-none']
  const shadows = ['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl']
  const ringColors = ['ring-indigo-500', 'ring-blue-500', 'ring-green-500', 'ring-red-500', 'ring-purple-500', 'ring-cyan-500']

  const boxClass = [
    'w-32 h-32 flex items-center justify-center text-white font-bold transition-all duration-300',
    bgColor, borderWidth, borderColor, borderRadius, borderStyle, shadowSize,
    isRing ? `ring-4 ${ringColor}` : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🎨 TailwindCSS 背景与边框</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        背景和边框是视觉设计的基础。TailwindCSS 用原子类覆盖了所有 CSS 背景和边框属性。
      </Paragraph>

      <Card title="交互式背景边框演练场" className="mb-6">
        <Paragraph className="mb-4">调整控件，实时预览效果：</Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>背景色</Text>
            <Select value={bgColor} onChange={setBgColor} style={{ width: '100%' }} options={bgColors.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>边框宽度</Text>
            <Select value={borderWidth} onChange={setBorderWidth} style={{ width: '100%' }} options={borderWidths.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>边框颜色</Text>
            <Select value={borderColor} onChange={setBorderColor} style={{ width: '100%' }} options={borderColors.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>圆角</Text>
            <Select value={borderRadius} onChange={setBorderRadius} style={{ width: '100%' }} options={borderRadiuses.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>边框样式</Text>
            <Select value={borderStyle} onChange={setBorderStyle} style={{ width: '100%' }} options={borderStyles.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>阴影</Text>
            <Select value={shadowSize} onChange={setShadowSize} style={{ width: '100%' }} options={shadows.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Switch checked={isRing} onChange={setIsRing} /> <Text>Ring 聚焦环</Text>
          </Col>
          {isRing && (
            <Col span={8}>
              <Text strong>Ring 颜色</Text>
              <Select value={ringColor} onChange={setRingColor} style={{ width: '100%' }} options={ringColors.map(s => ({ value: s, label: s }))} />
            </Col>
          )}
        </Row>

        <div className="flex justify-center mt-6 p-8 bg-gray-50 rounded-lg">
          <div className={boxClass}>Box</div>
        </div>

        <div className="mt-4 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          {boxClass}
        </div>
      </Card>

      <Card title="渐变背景" className="mb-6">
        <Paragraph className="mb-4">TailwindCSS 支持 8 个方向的渐变：</Paragraph>
        <Row gutter={[16, 16]}>
          {[
            { dir: 'to-r', from: 'from-indigo-500', to: 'to-cyan-500', label: '→ 向右' },
            { dir: 'to-l', from: 'from-purple-500', to: 'to-pink-500', label: '← 向左' },
            { dir: 'to-t', from: 'from-amber-400', to: 'to-red-500', label: '↑ 向上' },
            { dir: 'to-b', from: 'from-green-400', to: 'to-blue-500', label: '↓ 向下' },
            { dir: 'to-tr', from: 'from-rose-400', to: 'to-yellow-300', label: '↗ 右上' },
            { dir: 'to-br', from: 'from-violet-500', to: 'to-orange-300', label: '↘ 右下' },
          ].map(({ dir, from, to, label }) => (
            <Col span={8} key={dir}>
              <div className={`h-24 rounded-lg bg-gradient-${dir} ${from} ${to} flex items-center justify-center text-white font-bold`}>
                {label}
              </div>
              <Tag color="blue" className="mt-1">bg-gradient-{dir}</Tag>
            </Col>
          ))}
        </Row>

        <div className="mt-4">
          <Text strong>三色渐变（via）</Text>
          <div className="mt-2 h-24 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            from → via → to
          </div>
        </div>
      </Card>

      <Card title="边框技巧" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>单侧边框</Text>
            <div className="mt-2 space-y-2">
              <div className="border-l-4 border-l-indigo-500 pl-3 py-1 bg-indigo-50 rounded-r">左侧边框</div>
              <div className="border-t-4 border-t-green-500 pt-3 bg-green-50 rounded-b">顶部边框</div>
              <div className="border-r-4 border-r-red-500 pr-3 py-1 bg-red-50 rounded-l">右侧边框</div>
              <div className="border-b-4 border-b-amber-500 pb-3 bg-amber-50 rounded-t">底部边框</div>
            </div>
          </Col>
          <Col span={8}>
            <Text strong>分隔线</Text>
            <div className="mt-2 space-y-3">
              <div className="divide-y divide-gray-200">
                <div className="py-2">项目 A</div>
                <div className="py-2">项目 B</div>
                <div className="py-2">项目 C</div>
              </div>
            </div>
            <Tag color="green" className="mt-1">divide-y</Tag>
          </Col>
          <Col span={8}>
            <Text strong>轮廓与 Ring</Text>
            <div className="mt-2 space-y-2">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded ring-2 ring-indigo-300 ring-offset-2">Ring 聚焦</button>
              <br />
              <button className="px-4 py-2 bg-green-500 text-white rounded outline outline-2 outline-green-300 outline-offset-2">Outline 轮廓</button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="阴影层级" className="mb-6">
        <Paragraph className="mb-4">阴影是表达层级（elevation）的核心手段：</Paragraph>
        <Row gutter={[16, 16]}>
          {shadows.filter(s => s !== 'shadow-none').map((shadow) => (
            <Col span={8} key={shadow}>
              <div className={`p-4 bg-white ${shadow} rounded-lg text-center`}>
                <Text strong>{shadow}</Text>
              </div>
            </Col>
          ))}
        </Row>
        <div className="mt-4">
          <Text strong>彩色阴影</Text>
          <Row gutter={[16, 16]} className="mt-2">
            <Col span={8}>
              <div className="p-4 bg-white shadow-lg shadow-indigo-500/30 rounded-lg text-center">
                <Text>shadow-indigo-500/30</Text>
              </div>
            </Col>
            <Col span={8}>
              <div className="p-4 bg-white shadow-lg shadow-rose-500/30 rounded-lg text-center">
                <Text>shadow-rose-500/30</Text>
              </div>
            </Col>
            <Col span={8}>
              <div className="p-4 bg-white shadow-lg shadow-emerald-500/30 rounded-lg text-center">
                <Text>shadow-emerald-500/30</Text>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      <Card title="不透明度修饰符" className="mb-6">
        <Paragraph className="mb-4">
          用 <Text code>/</Text> 修饰符控制颜色不透明度，适用于 bg、text、border、ring 等所有颜色类：
        </Paragraph>
        <Row gutter={[16, 16]}>
          {['5', '10', '20', '30', '50', '70', '100'].map((opacity) => (
            <Col span={3} key={opacity}>
              <div className={`h-16 bg-indigo-500/${opacity} rounded flex items-center justify-center text-sm`}>
                /{opacity}
              </div>
            </Col>
          ))}
        </Row>
        <div className="mt-3 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          bg-indigo-500/50  text-red-500/70  border-blue-500/30
        </div>
      </Card>
    </div>
  )
}
