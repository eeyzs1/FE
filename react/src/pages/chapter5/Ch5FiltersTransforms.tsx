import { useState } from 'react'
import { Typography, Card, Row, Col, Select, Switch, Slider, Tag, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5FiltersTransforms() {
  const [blur, setBlur] = useState('blur-none')
  const [brightness, setBrightness] = useState('brightness-100')
  const [contrast, setContrast] = useState('contrast-100')
  const [grayscale, setGrayscale] = useState(false)
  const [saturate, setSaturate] = useState('saturate-100')
  const [rotate, setRotate] = useState('rotate-0')
  const [scale, setScale] = useState('scale-100')
  const [translateX, setTranslateX] = useState('translate-x-0')
  const [skew, setSkew] = useState('skew-x-0')
  const [origin, setOrigin] = useState('origin-center')

  const filterClass = [blur, brightness, contrast, grayscale ? 'grayscale' : '', saturate].filter(Boolean).join(' ')
  const transformClass = [rotate, scale, translateX, skew, origin].filter(Boolean).join(' ')

  const blurs = ['blur-none', 'blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl']
  const brightnesses = ['brightness-0', 'brightness-50', 'brightness-75', 'brightness-100', 'brightness-125', 'brightness-150', 'brightness-200']
  const contrasts = ['contrast-0', 'contrast-50', 'contrast-75', 'contrast-100', 'contrast-125', 'contrast-150', 'contrast-200']
  const saturates = ['saturate-0', 'saturate-50', 'saturate-100', 'saturate-150', 'saturate-200']
  const rotates = ['rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180', '-rotate-6', '-rotate-12', '-rotate-45', '-rotate-90']
  const scales = ['scale-0', 'scale-50', 'scale-75', 'scale-90', 'scale-95', 'scale-100', 'scale-105', 'scale-110', 'scale-125', 'scale-150']
  const translateXs = ['translate-x-0', 'translate-x-1', 'translate-x-2', 'translate-x-4', 'translate-x-8', '-translate-x-1', '-translate-x-2', '-translate-x-4', '-translate-x-8']
  const skews = ['skew-x-0', 'skew-x-1', 'skew-x-2', 'skew-x-3', 'skew-x-6', 'skew-x-12', '-skew-x-6', '-skew-x-12']
  const origins = ['origin-center', 'origin-top', 'origin-bottom', 'origin-left', 'origin-right', 'origin-top-left', 'origin-top-right', 'origin-bottom-left', 'origin-bottom-right']

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🔮 TailwindCSS 滤镜与变换</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        滤镜（Filters）改变元素视觉效果，变换（Transforms）改变元素几何形态。两者配合能创造丰富的交互反馈。
      </Paragraph>

      <Card title="滤镜演练场" className="mb-6">
        <Paragraph className="mb-4">调整控件，实时预览滤镜效果：</Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>模糊</Text>
            <Select value={blur} onChange={setBlur} style={{ width: '100%' }} options={blurs.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>亮度</Text>
            <Select value={brightness} onChange={setBrightness} style={{ width: '100%' }} options={brightnesses.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>对比度</Text>
            <Select value={contrast} onChange={setContrast} style={{ width: '100%' }} options={contrasts.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>饱和度</Text>
            <Select value={saturate} onChange={setSaturate} style={{ width: '100%' }} options={saturates.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Switch checked={grayscale} onChange={setGrayscale} /> <Text>灰度</Text>
          </Col>
        </Row>

        <div className="flex justify-center mt-6 gap-8">
          <div className="text-center">
            <Text type="secondary">原图</Text>
            <div className="mt-2 w-40 h-28 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              Image
            </div>
          </div>
          <div className="text-center">
            <Text type="secondary">滤镜效果</Text>
            <div className={`mt-2 w-40 h-28 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl ${filterClass}`}>
              Image
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          {filterClass}
        </div>
      </Card>

      <Card title="变换演练场" className="mb-6">
        <Paragraph className="mb-4">调整控件，实时预览变换效果：</Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Text strong>旋转</Text>
            <Select value={rotate} onChange={setRotate} style={{ width: '100%' }} options={rotates.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={6}>
            <Text strong>缩放</Text>
            <Select value={scale} onChange={setScale} style={{ width: '100%' }} options={scales.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={6}>
            <Text strong>平移X</Text>
            <Select value={translateX} onChange={setTranslateX} style={{ width: '100%' }} options={translateXs.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={6}>
            <Text strong>倾斜</Text>
            <Select value={skew} onChange={setSkew} style={{ width: '100%' }} options={skews.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={6}>
            <Text strong>变换原点</Text>
            <Select value={origin} onChange={setOrigin} style={{ width: '100%' }} options={origins.map(s => ({ value: s, label: s }))} />
          </Col>
        </Row>

        <div className="flex justify-center mt-6 p-8 bg-gray-50 rounded-lg overflow-hidden">
          <div className={`w-32 h-32 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold transition-all duration-500 ${transformClass}`}>
            Box
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          {transformClass}
        </div>
      </Card>

      <Card title="实战：Hover 交互效果" className="mb-6">
        <Paragraph className="mb-4">滤镜+变换最常见的应用是 hover 效果：</Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <div className="w-full h-32 bg-gradient-to-br from-indigo-400 to-cyan-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <Text className="mt-1 block">缩放放大</Text>
            </div>
            <Tag color="blue" className="mt-1">hover:scale-110</Tag>
          </Col>
          <Col span={6}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 transition-all duration-300 group-hover:rotate-3 group-hover:scale-105" />
              </div>
              <Text className="mt-1 block">旋转+缩放</Text>
            </div>
            <Tag color="purple" className="mt-1">hover:rotate-3 hover:scale-105</Tag>
          </Col>
          <Col span={6}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <div className="w-full h-32 bg-gradient-to-br from-amber-400 to-red-400 transition-all duration-300 group-hover:brightness-110 group-hover:saturate-150" />
              </div>
              <Text className="mt-1 block">亮度+饱和度</Text>
            </div>
            <Tag color="orange" className="mt-1">hover:brightness-110</Tag>
          </Col>
          <Col span={6}>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <div className="w-full h-32 bg-gradient-to-br from-green-400 to-teal-400 transition-all duration-300 group-hover:blur-sm group-hover:scale-105" />
              </div>
              <Text className="mt-1 block">模糊+缩放</Text>
            </div>
            <Tag color="green" className="mt-1">hover:blur-sm hover:scale-105</Tag>
          </Col>
        </Row>
      </Card>

      <Card title="Backdrop Filter 背景滤镜" className="mb-6">
        <Paragraph className="mb-4">
          <Text code>backdrop-blur</Text> 实现毛玻璃效果，是现代 UI 的标志性视觉：
        </Paragraph>
        <div className="relative h-48 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          <div className="absolute top-4 left-4 w-20 h-20 bg-yellow-400 rounded-full" />
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-cyan-400 rounded-full" />
          <div className="absolute inset-8 backdrop-blur-md bg-white/30 rounded-xl flex items-center justify-center">
            <Text className="text-white text-xl font-bold">backdrop-blur-md + bg-white/30</Text>
          </div>
        </div>
        <div className="mt-3 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          backdrop-blur-md bg-white/30 rounded-xl
        </div>
      </Card>

      <Card title="3D 变换" className="mb-6">
        <Paragraph className="mb-4">
          TailwindCSS 也支持 3D 变换，需要配合 <Text code>perspective</Text> 和 <Text code>transform-style</Text>：
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col span={8} className="text-center">
            <div className="perspective-[500px]">
              <div className="w-32 h-24 bg-indigo-500 rounded-lg flex items-center justify-center text-white transition-transform duration-500 hover:rotate-y-12 mx-auto">
                rotateY
              </div>
            </div>
            <Tag color="blue" className="mt-2">hover:rotate-y-12</Tag>
          </Col>
          <Col span={8} className="text-center">
            <div className="perspective-[500px]">
              <div className="w-32 h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white transition-transform duration-500 hover:rotate-x-12 mx-auto">
                rotateX
              </div>
            </div>
            <Tag color="purple" className="mt-2">hover:rotate-x-12</Tag>
          </Col>
          <Col span={8} className="text-center">
            <div className="perspective-[500px]">
              <div className="w-32 h-24 bg-cyan-500 rounded-lg flex items-center justify-center text-white transition-transform duration-500 hover:scale-z-110 mx-auto preserve-3d">
                scaleZ
              </div>
            </div>
            <Tag color="cyan" className="mt-2">preserve-3d</Tag>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
