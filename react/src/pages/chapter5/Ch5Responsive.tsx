import { Typography, Card, Divider, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Responsive() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>📱 5.3 响应式设计</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 的响应式系统采用移动优先策略，通过前缀实现不同断点的样式。
      </Paragraph>

      <Card title="💡 断点系统" className="mb-6">
        <div className="space-y-3">
          {[
            { prefix: '默认', min: '0px', desc: '所有屏幕', color: 'gray' },
            { prefix: 'sm:', min: '640px', desc: '小屏幕', color: 'green' },
            { prefix: 'md:', min: '768px', desc: '中等屏幕', color: 'blue' },
            { prefix: 'lg:', min: '1024px', desc: '大屏幕', color: 'purple' },
            { prefix: 'xl:', min: '1280px', desc: '超大屏幕', color: 'orange' },
            { prefix: '2xl:', min: '1536px', desc: '超超大屏幕', color: 'red' },
          ].map(bp => (
            <div key={bp.prefix} className="flex items-center gap-3">
              <Tag color={bp.color} className="font-mono w-16 text-center">{bp.prefix}</Tag>
              <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-mono"
                  style={{ width: bp.min === '0px' ? '100%' : `${parseInt(bp.min) / 16}%` }}
                >
                  {bp.min !== '0px' && `≥${bp.min}`}
                </div>
              </div>
              <span className="text-sm text-gray-500 w-20">{bp.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🔬 移动优先策略" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<!-- 移动优先：小屏1列，中屏2列，大屏3列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<!-- 移动优先：小屏隐藏，中屏显示 -->
<div class="hidden md:block">侧边栏</div>

<!-- 移动优先：小屏全宽，大屏固定宽度 -->
<div class="w-full lg:w-64">导航</div>`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Text strong>调整浏览器窗口大小查看效果：</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-sm text-center">
                <div className="text-2xl mb-1">{i}</div>
                <div className="text-sm text-gray-500">
                  <span className="md:hidden">1列布局</span>
                  <span className="hidden md:inline lg:hidden">2列布局</span>
                  <span className="hidden lg:inline">3列布局</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="📋 响应式实战模式" className="mb-6">
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">响应式导航</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<nav class="flex items-center justify-between p-4">
  <div class="text-xl font-bold">Logo</div>
  <!-- 移动端汉堡菜单 -->
  <button class="md:hidden">☰</button>
  <!-- 桌面端导航链接 -->
  <div class="hidden md:flex gap-4">
    <a>首页</a><a>关于</a><a>联系</a>
  </div>
</nav>`}</pre>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-2">响应式卡片</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<div class="grid grid-cols-1 sm:grid-cols-2 
  lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {cards.map(card => (
    <div class="p-4 bg-white rounded-xl shadow" />
  ))}
</div>`}</pre>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">响应式间距</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<!-- 小屏 p-4，中屏 p-6，大屏 p-8 -->
<div class="p-4 md:p-6 lg:p-8">

<!-- 小屏文字小，大屏文字大 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>移动优先：基础样式给小屏，前缀给大屏</li>
          <li>6个断点：sm(640) / md(768) / lg(1024) / xl(1280) / 2xl(1536)</li>
          <li>hidden + md:block 实现响应式显隐</li>
          <li>grid-cols-1 md:grid-cols-2 实现响应式网格</li>
          <li>调整浏览器窗口测试响应式效果</li>
        </ul>
      </Card>
    </div>
  )
}
