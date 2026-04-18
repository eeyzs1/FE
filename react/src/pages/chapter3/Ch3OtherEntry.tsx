import { useState } from 'react'
import { Typography, Card, Divider, Slider, Rate, Switch, Cascader, ColorPicker, Space, Tag, InputNumber } from 'antd'

const { Title, Paragraph, Text } = Typography

const cascaderOptions = [
  { value: 'zhejiang', label: '浙江', children: [
    { value: 'hangzhou', label: '杭州', children: [
      { value: 'xihu', label: '西湖' },
      { value: 'binjiang', label: '滨江' },
    ]},
    { value: 'ningbo', label: '宁波' },
  ]},
  { value: 'jiangsu', label: '江苏', children: [
    { value: 'nanjing', label: '南京', children: [
      { value: 'zhonghuamen', label: '中华门' },
    ]},
    { value: 'suzhou', label: '苏州' },
  ]},
]

export default function Ch3OtherEntry() {
  const [sliderVal, setSliderVal] = useState(30)
  const [rangeVal, setRangeVal] = useState<[number, number]>([20, 80])
  const [rateVal, setRateVal] = useState(3)
  const [switchVal, setSwitchVal] = useState(true)
  const [cascaderVal, setCascaderVal] = useState<string[]>([])
  const [colorVal, setColorVal] = useState('#1677ff')

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🎛️ 3.7 其他数据录入组件</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Slider、Rate、Switch、Cascader、ColorPicker 等辅助录入组件。
      </Paragraph>

      <Card title="🎚️ Slider 滑动输入" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Slider value={val} onChange={setVal} />
<Slider range value={[20, 80]} onChange={setRange} />
<Slider min={0} max={100} marks={{ 0: '0', 50: '50', 100: '100' }} />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-4">
          <div>
            <Text strong>基本滑块: {sliderVal}</Text>
            <Slider value={sliderVal} onChange={(v) => setSliderVal(v as number)} />
          </div>
          <div>
            <Text strong>范围滑块: {rangeVal[0]} - {rangeVal[1]}</Text>
            <Slider range value={rangeVal} onChange={(v) => setRangeVal(v as [number, number])} />
          </div>
          <div>
            <Text strong>带刻度：</Text>
            <Slider marks={{ 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }} defaultValue={37} />
          </div>
        </div>
      </Card>

      <Card title="⭐ Rate 评分" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Rate value={rate} onChange={setRate} />
<Rate allowHalf />
<Rate character="A" />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <Text strong>基本评分：</Text>
            <Rate value={rateVal} onChange={setRateVal} />
            <Tag color="blue">{rateVal} 分</Tag>
          </div>
          <div className="flex items-center gap-3">
            <Text strong>半星评分：</Text>
            <Rate allowHalf defaultValue={3.5} />
          </div>
          <div className="flex items-center gap-3">
            <Text strong>自定义字符：</Text>
            <Rate character="A" defaultValue={4} />
          </div>
        </div>
      </Card>

      <Card title="🔀 Switch 开关" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Switch checked={val} onChange={setVal} />
<Switch checkedChildren="开" unCheckedChildren="关" />
<Switch loading />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <Space>
            <Switch checked={switchVal} onChange={setSwitchVal} />
            <Tag color={switchVal ? 'green' : 'default'}>{switchVal ? '已开启' : '已关闭'}</Tag>
          </Space>
          <Space>
            <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
            <Switch checkedChildren="1" unCheckedChildren="0" defaultChecked />
          </Space>
        </div>
      </Card>

      <Card title="🔗 Cascader 级联选择" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Cascader
  options={options}
  value={value}
  onChange={setValue}
  placeholder="请选择"
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Cascader options={cascaderOptions} value={cascaderVal} onChange={(v) => setCascaderVal(v as string[])} placeholder="选择地区" style={{ width: '100%' }} />
          <div className="mt-2 text-sm text-gray-500">已选: {cascaderVal.length > 0 ? cascaderVal.join(' / ') : '(未选择)'}</div>
        </div>
      </Card>

      <Card title="🎨 ColorPicker 颜色选择" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<ColorPicker value={color} onChange={setColor} />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg flex items-center gap-4">
          <ColorPicker value={colorVal} onChange={(_, hex) => setColorVal(hex)} />
          <span className="text-sm">当前颜色: <Tag color="blue">{colorVal}</Tag></span>
          <div className="w-16 h-8 rounded" style={{ backgroundColor: colorVal }} />
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Slider：<Text code>range</Text> 范围选择，<Text code>marks</Text> 刻度标记</li>
          <li>Rate：<Text code>allowHalf</Text> 半星，<Text code>character</Text> 自定义字符</li>
          <li>Switch：<Text code>checkedChildren</Text> / <Text code>unCheckedChildren</Text> 文字</li>
          <li>Cascader：嵌套 children 实现多级联动</li>
          <li>ColorPicker：v5+ 新增，支持多种格式</li>
        </ul>
      </Card>
    </div>
  )
}
