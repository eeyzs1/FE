import { Typography, Card, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Layout() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📐 5.2 布局系统</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 提供了强大的 Flexbox 和 Grid 布局工具类，轻松实现各种布局。
      </Paragraph>

      <Card title="💡 Flexbox 布局" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<div class="flex items-center justify-between gap-4">
  <div>左侧</div>
  <div>右侧</div>
</div>

<div class="flex flex-col gap-2">
  <div>项目1</div>
  <div>项目2</div>
</div>`}</pre>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Text strong>水平居中</Text>
            <div className="flex justify-center mt-2 p-3 bg-white rounded">
              <div className="px-4 py-2 bg-indigo-500 text-white rounded">居中元素</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Text strong>两端对齐</Text>
            <div className="flex justify-between items-center mt-2 p-3 bg-white rounded">
              <div className="px-3 py-1 bg-green-500 text-white rounded text-sm">左侧</div>
              <div className="px-3 py-1 bg-green-500 text-white rounded text-sm">右侧</div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Text strong>垂直居中</Text>
            <div className="flex items-center justify-center h-24 mt-2 bg-white rounded">
              <div className="px-4 py-2 bg-purple-500 text-white rounded">垂直水平居中</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📊 Grid 布局" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<div class="grid grid-cols-3 gap-4">
  <div>1</div><div>2</div><div>3</div>
</div>

<div class="grid grid-cols-12 gap-4">
  <div class="col-span-8">主内容</div>
  <div class="col-span-4">侧边栏</div>
</div>`}</pre>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <Text strong>等分网格</Text>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-3 bg-indigo-500 text-white rounded text-center">Col {i}</div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Text strong>12列栅格</Text>
            <div className="grid grid-cols-12 gap-3 mt-2">
              <div className="col-span-8 p-3 bg-green-500 text-white rounded text-center">col-span-8</div>
              <div className="col-span-4 p-3 bg-green-400 text-white rounded text-center">col-span-4</div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Text strong>跨行跨列</Text>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="col-span-2 p-3 bg-purple-500 text-white rounded text-center">col-span-2</div>
              <div className="row-span-2 p-3 bg-purple-400 text-white rounded text-center flex items-center justify-center">row-span-2</div>
              <div className="col-span-2 p-3 bg-purple-300 text-white rounded text-center">col-span-2</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📏 间距系统" className="mb-6">
        <Paragraph>TailwindCSS 使用 4px 为基数的间距系统：</Paragraph>
        <div className="space-y-2 mt-4">
          {[
            { class: 'p-1 / m-1', value: '4px' },
            { class: 'p-2 / m-2', value: '8px' },
            { class: 'p-3 / m-3', value: '12px' },
            { class: 'p-4 / m-4', value: '16px' },
            { class: 'p-6 / m-6', value: '24px' },
            { class: 'p-8 / m-8', value: '32px' },
            { class: 'p-12 / m-12', value: '48px' },
          ].map(item => (
            <div key={item.class} className="flex items-center gap-4">
              <Text code className="w-24">{item.class}</Text>
              <div className="bg-indigo-500 h-3 rounded" style={{ width: item.value }} />
              <span className="text-sm text-gray-500">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Flexbox：flex / items-center / justify-between / gap</li>
          <li>Grid：grid / grid-cols-N / col-span-N / row-span-N</li>
          <li>间距：p/m + 方向(t/b/l/r/x/y) + 大小(1-96)</li>
          <li>尺寸：w/h + full/screen/auto/具体值</li>
          <li>定位：relative / absolute / fixed / sticky</li>
          <li>溢出：overflow-auto / overflow-hidden / overflow-scroll</li>
        </ul>
      </Card>
    </div>
  )
}
