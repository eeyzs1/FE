import { useState } from 'react'
import { Typography, Card, Divider, Upload, Button, message, Tag, Space } from 'antd'
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { Dragger } = Upload

export default function Ch3Upload() {
  const [fileList, setFileList] = useState<any[]>([])

  const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info: any) {
      if (info.file.status === 'done') message.success(`${info.file.name} 上传成功`)
      else if (info.file.status === 'error') message.error(`${info.file.name} 上传失败`)
    },
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📤 3.6 Upload 上传</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Upload 组件用于文件上传，支持拖拽上传、批量上传、图片预览等多种模式。
      </Paragraph>

      <Card title="💡 基本上传" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Upload {...props}>
  <Button icon={<UploadOutlined />}>点击上传</Button>
</Upload>

// props 常用配置
const props = {
  name: 'file',              // 上传字段名
  action: '/api/upload',     // 上传地址
  headers: { authorization: 'Bearer xxx' },
  onChange(info) {
    if (info.file.status === 'done') message.success('上传成功')
    if (info.file.status === 'error') message.error('上传失败')
  },
}`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </div>
      </Card>

      <Card title="📂 拖拽上传" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Upload.Dragger {...props}>
  <p className="ant-upload-drag-icon">
    <InboxOutlined />
  </p>
  <p>点击或拖拽文件到此区域上传</p>
</Upload.Dragger>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Dragger {...props}>
            <p className="text-4xl text-indigo-400 mb-2"><InboxOutlined /></p>
            <p className="text-lg font-medium">点击或拖拽文件到此区域上传</p>
            <p className="text-sm text-gray-400 mt-1">支持单个或批量上传</p>
          </Dragger>
        </div>
      </Card>

      <Card title="🖼️ 图片上传" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<Upload
  action="/api/upload"
  listType="picture-card"
  fileList={fileList}
  onChange={({ fileList }) => setFileList(fileList)}
>
  {fileList.length < 4 && (
    <div><PlusOutlined /> 上传</div>
  )}
</Upload>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
          >
            {fileList.length < 4 && (
              <div><PlusOutlined /><div className="mt-1 text-sm">上传</div></div>
            )}
          </Upload>
          <div className="text-sm text-gray-500 mt-2">最多上传 4 张图片</div>
        </div>
      </Card>

      <Card title="📋 常用配置" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg flex items-center gap-3">
            <Tag color="blue">accept</Tag>
            <Text code>accept=".png,.jpg"</Text> 限制文件类型
          </div>
          <div className="p-3 bg-green-50 rounded-lg flex items-center gap-3">
            <Tag color="green">maxCount</Tag>
            <Text code>maxCount={3}</Text> 限制上传数量
          </div>
          <div className="p-3 bg-purple-50 rounded-lg flex items-center gap-3">
            <Tag color="purple">multiple</Tag>
            <Text code>multiple</Text> 支持多选
          </div>
          <div className="p-3 bg-orange-50 rounded-lg flex items-center gap-3">
            <Tag color="orange">disabled</Tag>
            <Text code>disabled</Text> 禁用上传
          </div>
          <div className="p-3 bg-red-50 rounded-lg flex items-center gap-3">
            <Tag color="red">beforeUpload</Tag>
            <Text code>beforeUpload={'{ (file) => file.size / 1024 < 500 }'}</Text> 上传前校验
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>action 指定上传地址，name 指定字段名</li>
          <li><Text code>listType</Text>：text / picture / picture-card</li>
          <li><Text code>Dragger</Text> 拖拽上传</li>
          <li><Text code>beforeUpload</Text> 上传前校验（大小、类型）</li>
          <li><Text code>fileList</Text> 受控模式管理文件列表</li>
          <li>自定义上传：<Text code>customRequest</Text></li>
        </ul>
      </Card>
    </div>
  )
}
