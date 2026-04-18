import { useState } from 'react'
import { Typography, Card, Divider, Select, Tag, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
]

const groupOptions = [
  {
    label: '前端框架',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
  },
  {
    label: '后端语言',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'go', label: 'Go' },
    ],
  },
]

export default function Ch3Select() {
  const [single, setSingle] = useState<string | undefined>(undefined)
  const [multi, setMulti] = useState<string[]>([])
  const [search, setSearch] = useState<string | undefined>(undefined)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📋 3.3 Select 选择器</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Select 是最常用的表单组件之一，用于从一组选项中选择一个或多个值。
      </Paragraph>

      <Card title="💡 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Select
  value={value}
  onChange={setValue}
  style={{ width: 200 }}
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-4">
            <Text strong>选择框架：</Text>
            <Select value={single} onChange={setSingle} style={{ width: 200 }} placeholder="请选择" options={options} allowClear />
            <span className="text-sm text-gray-500">当前值: <Text code>{single ?? '(未选择)'}</Text></span>
          </div>
        </div>
      </Card>

      <Card title="🔀 多选模式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Select
  mode="multiple"
  value={multi}
  onChange={setMulti}
  options={options}
  placeholder="选择多个..."
  allowClear
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Select mode="multiple" value={multi} onChange={setMulti} style={{ width: '100%' }} options={options} placeholder="选择多个框架..." allowClear maxTagCount="responsive" />
          <div className="mt-2 text-sm text-gray-500">已选: {multi.length > 0 ? multi.map(m => <Tag key={m} color="blue">{m}</Tag>) : '(无)'}</div>
        </div>
      </Card>

      <Card title="🔍 搜索过滤" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Select
  showSearch
  filterOption={(input, option) =>
    (option?.label ?? '').toLowerCase()
      .includes(input.toLowerCase())
  }
  options={options}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Select showSearch value={search} onChange={setSearch} style={{ width: '100%' }} placeholder="输入关键词搜索..." options={options} allowClear />
        </div>
      </Card>

      <Card title="📂 分组选项" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const groupOptions = [
  {
    label: '前端框架',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
  },
  {
    label: '后端语言',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
    ],
  },
]

<Select options={groupOptions} />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Select style={{ width: '100%' }} placeholder="选择技术..." options={groupOptions} allowClear />
        </div>
      </Card>

      <Card title="🎨 自定义渲染" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const colorOptions = [
  { value: 'red', label: <Space><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />红色</Space> },
  { value: 'blue', label: <Space><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />蓝色</Space> },
]

<Select options={colorOptions} />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Select style={{ width: '100%' }} placeholder="选择颜色..." options={[
            { value: 'red', label: <Space><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />红色</Space> },
            { value: 'blue', label: <Space><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />蓝色</Space> },
            { value: 'green', label: <Space><span className="w-3 h-3 rounded-full bg-green-500 inline-block" />绿色</Space> },
            { value: 'orange', label: <Space><span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />橙色</Space> },
          ]} allowClear />
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li><Text code>mode="multiple"</Text> 多选，<Text code>mode="tags"</Text> 可创建新选项</li>
          <li><Text code>showSearch</Text> 启用搜索，<Text code>filterOption</Text> 自定义过滤</li>
          <li><Text code>options</Text> 支持分组（label + options 嵌套）</li>
          <li><Text code>allowClear</Text> 一键清空，<Text code>maxTagCount</Text> 控制标签显示数量</li>
          <li>label 支持自定义 ReactNode 渲染</li>
          <li><Text code>loading</Text> 显示加载状态，<Text code>disabled</Text> 禁用选项</li>
        </ul>
      </Card>
    </div>
  )
}
