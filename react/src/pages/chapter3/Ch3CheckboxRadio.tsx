import { useState } from 'react'
import { Typography, Card, Divider, Checkbox, Radio, Space, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

const plainOptions = ['苹果', '梨', '橘子']
const radioOptions = ['步行', '骑车', '开车']

export default function Ch3CheckboxRadio() {
  const [checked, setChecked] = useState(false)
  const [checkedList, setCheckedList] = useState<string[]>(['苹果', '橘子'])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [radioValue, setRadioValue] = useState('步行')
  const [radioGroup, setRadioGroup] = useState(1)

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  const onCheckedListChange = (list: string[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>☑️ 3.5 Checkbox & Radio</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Checkbox 多选框和 Radio 单选框是最基础的数据录入组件。
      </Paragraph>

      <Card title="💡 Checkbox 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
  同意协议
</Checkbox>

<Checkbox defaultChecked disabled>
  禁用选中
</Checkbox>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <Space>
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>同意协议</Checkbox>
            <Tag color={checked ? 'green' : 'default'}>{checked ? '已同意' : '未同意'}</Tag>
          </Space>
          <Space>
            <Checkbox defaultChecked disabled>禁用选中</Checkbox>
            <Checkbox disabled>禁用未选</Checkbox>
          </Space>
        </div>
      </Card>

      <Card title="📋 Checkbox.Group 多选组" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Checkbox.Group
  options={plainOptions}
  value={checkedList}
  onChange={onCheckedListChange}
/>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            全选
          </Checkbox>
          <Divider className="!my-3" />
          <Checkbox.Group options={plainOptions} value={checkedList} onChange={onCheckedListChange} />
          <div className="mt-2 text-sm text-gray-500">已选: {checkedList.map(item => <Tag key={item} color="blue">{item}</Tag>)}</div>
        </div>
      </Card>

      <Card title="🔘 Radio 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Radio value="a">选项A</Radio>
<Radio value="b">选项B</Radio>

<Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
  <Radio value="a">选项A</Radio>
  <Radio value="b">选项B</Radio>
</Radio.Group>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <div>
            <Text strong>出行方式：</Text>
            <Radio.Group value={radioValue} onChange={(e) => setRadioValue(e.target.value)} className="ml-3">
              {radioOptions.map(item => <Radio key={item} value={item}>{item}</Radio>)}
            </Radio.Group>
            <div className="mt-1 text-sm text-gray-500">当前: <Tag color="blue">{radioValue}</Tag></div>
          </div>
        </div>
      </Card>

      <Card title="🎨 Radio 按钮样式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Radio.Group value={value} onChange={onChange} optionType="button">
  <Radio.Button value="a">杭州</Radio.Button>
  <Radio.Button value="b">上海</Radio.Button>
</Radio.Group>

<Radio.Group value={value} onChange={onChange}
  optionType="button" buttonStyle="solid">
  <Radio.Button value="a">杭州</Radio.Button>
  <Radio.Button value="b">上海</Radio.Button>
</Radio.Group>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
          <div>
            <Text strong>默认样式：</Text>
            <Radio.Group value={radioGroup} onChange={(e) => setRadioGroup(e.target.value)} optionType="button" className="ml-2">
              <Radio.Button value={1}>日</Radio.Button>
              <Radio.Button value={2}>周</Radio.Button>
              <Radio.Button value={3}>月</Radio.Button>
              <Radio.Button value={4}>年</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Text strong>实心样式：</Text>
            <Radio.Group value={radioGroup} onChange={(e) => setRadioGroup(e.target.value)} optionType="button" buttonStyle="solid" className="ml-2">
              <Radio.Button value={1}>日</Radio.Button>
              <Radio.Button value={2}>周</Radio.Button>
              <Radio.Button value={3}>月</Radio.Button>
              <Radio.Button value={4}>年</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Text strong>尺寸：</Text>
            <Space className="ml-2">
              <Radio.Group value={radioGroup} onChange={(e) => setRadioGroup(e.target.value)} optionType="button" size="large">
                <Radio.Button value={1}>大</Radio.Button>
                <Radio.Button value={2}>中</Radio.Button>
              </Radio.Group>
              <Radio.Group value={radioGroup} onChange={(e) => setRadioGroup(e.target.value)} optionType="button" size="small">
                <Radio.Button value={1}>小1</Radio.Button>
                <Radio.Button value={2}>小2</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Checkbox 多选，Radio 单选</li>
          <li><Text code>Checkbox.Group</Text> 管理多选状态</li>
          <li><Text code>indeterminate</Text> 实现全选/半选</li>
          <li><Text code>Radio.Group</Text> 管理单选状态</li>
          <li><Text code>optionType="button"</Text> 按钮样式</li>
          <li><Text code>buttonStyle="solid"</Text> 实心按钮</li>
        </ul>
      </Card>
    </div>
  )
}
