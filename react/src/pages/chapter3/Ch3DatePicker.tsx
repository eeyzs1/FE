import { useState } from 'react'
import { Typography, Card, Divider, DatePicker, TimePicker, Space, Tag } from 'antd'
import type { Dayjs } from 'dayjs'

const { Title, Paragraph, Text } = Typography
const { RangePicker } = DatePicker

export default function Ch3DatePicker() {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null] | null>(null)
  const [time, setTime] = useState<Dayjs | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📅 3.4 DatePicker 日期选择</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        DatePicker 和 TimePicker 是表单中处理日期时间的核心组件。
      </Paragraph>

      <Card title="💡 DatePicker 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'

const [date, setDate] = useState<Dayjs | null>(null)

<DatePicker value={date} onChange={setDate} />
<DatePicker picker="month" />
<DatePicker picker="year" />
<DatePicker picker="quarter" />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <div className="flex items-center gap-4 flex-wrap">
            <Text strong>日期：</Text>
            <DatePicker value={date} onChange={setDate} placeholder="选择日期" />
            <span className="text-sm text-gray-500">值: <Text code>{date?.format('YYYY-MM-DD') ?? '(未选择)'}</Text></span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Text strong>月份：</Text>
            <DatePicker picker="month" placeholder="选择月份" />
            <Text strong>年份：</Text>
            <DatePicker picker="year" placeholder="选择年份" />
          </div>
        </div>
      </Card>

      <Card title="📊 RangePicker 日期范围" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const { RangePicker } = DatePicker

<RangePicker value={range} onChange={setRange} />

// 限制可选范围
<RangePicker
  disabledDate={(current) => {
    return current && current > dayjs().endOf('day')
  }}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <RangePicker value={range} onChange={setRange} style={{ width: '100%' }} />
          <div className="text-sm text-gray-500">
            {range && range[0] && range[1]
              ? <span>从 <Text code>{range[0].format('YYYY-MM-DD')}</Text> 到 <Text code>{range[1].format('YYYY-MM-DD')}</Text></span>
              : '请选择日期范围'}
          </div>
        </div>
      </Card>

      <Card title="⏰ TimePicker 时间选择" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<TimePicker value={time} onChange={setTime} />

<TimePicker use12Hours format="h:mm:ss A" />

<TimePicker.RangePicker />`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <div className="flex items-center gap-4 flex-wrap">
            <Text strong>时间：</Text>
            <TimePicker value={time} onChange={setTime} placeholder="选择时间" />
            <span className="text-sm text-gray-500">值: <Text code>{time?.format('HH:mm:ss') ?? '(未选择)'}</Text></span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Text strong>12小时制：</Text>
            <TimePicker use12Hours format="h:mm:ss A" placeholder="选择时间" />
          </div>
        </div>
      </Card>

      <Card title="🎨 常用配置" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 格式化
<DatePicker format="YYYY年MM月DD日" />

// 禁用特定日期
<DatePicker disabledDate={(current) => {
  return current && current < dayjs().startOf('day')
}} />

// 预设范围
<RangePicker presets={[
  { label: '最近7天', value: [dayjs().subtract(7, 'd'), dayjs()] },
  { label: '最近30天', value: [dayjs().subtract(30, 'd'), dayjs()] },
]} />

// 尺寸
<DatePicker size="large" />
<DatePicker size="small" />`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>DatePicker 基于 dayjs，需要安装 dayjs 类型</li>
          <li><Text code>picker</Text> 切换选择粒度：date/month/year/quarter/week</li>
          <li>RangePicker 选择日期范围</li>
          <li><Text code>disabledDate</Text> 限制可选日期</li>
          <li><Text code>format</Text> 自定义显示格式</li>
          <li><Text code>presets</Text> 添加快捷选项</li>
        </ul>
      </Card>
    </div>
  )
}
