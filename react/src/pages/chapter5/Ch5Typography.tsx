import { useState } from 'react'
import { Typography, Card, Divider, Slider, Select, Row, Col, Switch, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Typography() {
  const [fontSize, setFontSize] = useState('text-lg')
  const [fontWeight, setFontWeight] = useState('font-normal')
  const [textAlign, setTextAlign] = useState('text-left')
  const [textColor, setTextColor] = useState('text-gray-900')
  const [lineHeight, setLineHeight] = useState('leading-relaxed')
  const [letterSpacing, setLetterSpacing] = useState('tracking-normal')
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isUppercase, setIsUppercase] = useState(false)

  const sampleText = 'TailwindCSS 让你用原子化类名精确控制每一个样式属性，告别 CSS 文件的维护噩梦。'

  const fontSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl']
  const fontWeights = ['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black']
  const textAligns = ['text-left', 'text-center', 'text-right', 'text-justify']
  const textColors = ['text-gray-900', 'text-gray-500', 'text-red-500', 'text-blue-500', 'text-green-500', 'text-purple-500', 'text-indigo-500', 'text-cyan-500']
  const lineHeights = ['leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose']
  const letterSpacings = ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest']

  const className = [
    fontSize, fontWeight, textAlign, textColor, lineHeight, letterSpacing,
    isItalic ? 'italic' : '',
    isUnderline ? 'underline' : '',
    isUppercase ? 'uppercase' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>✏️ TailwindCSS 排版工具类</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        排版是 Web 的基础。TailwindCSS 提供了完整的排版工具类，覆盖字体、颜色、间距、对齐等所有属性。
      </Paragraph>

      <Card title="交互式排版演练场" className="mb-6">
        <Paragraph className="mb-4">调整下方控件，实时预览排版效果：</Paragraph>

        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>字体大小</Text>
            <Select value={fontSize} onChange={setFontSize} style={{ width: '100%' }} options={fontSizes.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>字体粗细</Text>
            <Select value={fontWeight} onChange={setFontWeight} style={{ width: '100%' }} options={fontWeights.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>文本对齐</Text>
            <Select value={textAlign} onChange={setTextAlign} style={{ width: '100%' }} options={textAligns.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>文本颜色</Text>
            <Select value={textColor} onChange={setTextColor} style={{ width: '100%' }} options={textColors.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>行高</Text>
            <Select value={lineHeight} onChange={setLineHeight} style={{ width: '100%' }} options={lineHeights.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Text strong>字间距</Text>
            <Select value={letterSpacing} onChange={setLetterSpacing} style={{ width: '100%' }} options={letterSpacings.map(s => ({ value: s, label: s }))} />
          </Col>
          <Col span={8}>
            <Switch checked={isItalic} onChange={setIsItalic} /> <Text>斜体</Text>
          </Col>
          <Col span={8}>
            <Switch checked={isUnderline} onChange={setIsUnderline} /> <Text>下划线</Text>
          </Col>
          <Col span={8}>
            <Switch checked={isUppercase} onChange={setIsUppercase} /> <Text>大写</Text>
          </Col>
        </Row>

        <Divider>预览效果</Divider>

        <div className="p-6 bg-white border-2 border-dashed border-gray-200 rounded-lg">
          <p className={className}>{sampleText}</p>
        </div>

        <Divider>生成的类名</Divider>

        <div className="p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          {className}
        </div>
      </Card>

      <Card title="标题层级" className="mb-6">
        <Paragraph className="mb-4">TailwindCSS 没有语义化标题类，用 <Text code>text-*</Text> + <Text code>font-*</Text> 组合：</Paragraph>
        <div className="space-y-3">
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H1</Tag>
            <span className="text-5xl font-bold tracking-tight">主标题 5xl</span>
          </div>
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H2</Tag>
            <span className="text-4xl font-bold tracking-tight">二级标题 4xl</span>
          </div>
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H3</Tag>
            <span className="text-3xl font-semibold">三级标题 3xl</span>
          </div>
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H4</Tag>
            <span className="text-2xl font-semibold">四级标题 2xl</span>
          </div>
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H5</Tag>
            <span className="text-xl font-medium">五级标题 xl</span>
          </div>
          <div className="flex items-baseline gap-4">
            <Tag className="w-20 text-center">H6</Tag>
            <span className="text-lg font-medium">六级标题 lg</span>
          </div>
        </div>
      </Card>

      <Card title="文本截断与省略" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>单行截断</Text>
            <div className="mt-1">
              <p className="truncate w-full border p-2 rounded text-sm">
                这是一段很长的文本，使用 truncate 类可以在单行内截断并显示省略号，非常适合列表项标题
              </p>
            </div>
            <Tag color="blue" className="mt-1">truncate</Tag>
          </Col>
          <Col span={8}>
            <Text strong>行数限制</Text>
            <div className="mt-1">
              <p className="line-clamp-2 w-full border p-2 rounded text-sm">
                这是一段很长的文本，使用 line-clamp-2 类可以限制为两行显示，超出部分自动省略。适用于卡片描述、文章摘要等场景
              </p>
            </div>
            <Tag color="green" className="mt-1">line-clamp-2</Tag>
          </Col>
          <Col span={8}>
            <Text strong>换行控制</Text>
            <div className="mt-1">
              <p className="break-words w-full border p-2 rounded text-sm">
                SuperLongWordWithoutAnySpacesWillBeBrokenWithBreakWordsClass
              </p>
            </div>
            <Tag color="orange" className="mt-1">break-words</Tag>
          </Col>
        </Row>
      </Card>

      <Card title="装饰与特殊效果" className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>文本装饰</Text>
            <div className="space-y-2 mt-1">
              <p className="underline">下划线 underline</p>
              <p className="overline">上划线 overline</p>
              <p className="line-through">删除线 line-through</p>
              <p className="no-underline">无装饰 no-underline</p>
              <p className="underline decoration-wavy decoration-indigo-500 underline-offset-4">波浪下划线</p>
            </div>
          </Col>
          <Col span={12}>
            <Text strong>文本变换</Text>
            <div className="space-y-2 mt-1">
              <p className="uppercase">uppercase 大写</p>
              <p className="lowercase">LOWERCASE 小写</p>
              <p className="capitalize">capitalize 首字母大写</p>
              <p className="normal-case">Normal Case 正常</p>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="渐变文字" className="mb-6">
        <Paragraph className="mb-4">用 <Text code>bg-clip-text</Text> + <Text code>text-transparent</Text> 实现渐变文字效果：</Paragraph>
        <div className="space-y-4">
          <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            渐变文字效果
          </p>
          <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            青蓝渐变
          </p>
          <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            暖色渐变
          </p>
        </div>
        <div className="mt-3 p-3 bg-gray-900 text-green-400 rounded font-mono text-sm">
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent
        </div>
      </Card>
    </div>
  )
}
