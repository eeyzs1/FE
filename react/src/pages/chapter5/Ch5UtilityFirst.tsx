import { Typography, Card, Divider, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5UtilityFirst() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🎯 5.1 原子化思维</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 的核心理念是"原子化 CSS"——用工具类组合代替自定义 CSS。
      </Paragraph>

      <Card title="💡 传统 CSS vs 原子化" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-red-600 mb-2">❌ 传统 CSS</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`/* CSS 文件 */
.card {
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
}
.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

<!-- HTML -->
<div class="card">
  <h2 class="card-title">标题</h2>
</div>`}</pre>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-green-600 mb-2">✅ TailwindCSS</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<!-- 直接在 HTML 中写 -->
<div class="p-4 bg-white rounded-lg 
  shadow-sm">
  <h2 class="text-lg font-bold 
    text-gray-800">标题</h2>
</div>

<!-- 无需写任何 CSS！ -->`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🔬 原子化思维核心" className="mb-6">
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-bold text-indigo-700 mb-2">1. 每个类只做一件事</h4>
            <div className="flex flex-wrap gap-2">
              <Tag color="blue">p-4 → padding: 16px</Tag>
              <Tag color="green">text-lg → font-size: 18px</Tag>
              <Tag color="purple">rounded → border-radius: 4px</Tag>
              <Tag color="orange">flex → display: flex</Tag>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">2. 组合类实现复杂样式</h4>
            <div className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">A</div>
              <div>
                <div className="font-semibold text-gray-800">组合示例</div>
                <div className="text-sm text-gray-500">flex + items-center + gap-3</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">3. 响应式前缀</h4>
            <div className="flex flex-wrap gap-2">
              <Tag color="purple">sm: → 640px+</Tag>
              <Tag color="purple">md: → 768px+</Tag>
              <Tag color="purple">lg: → 1024px+</Tag>
              <Tag color="purple">xl: → 1280px+</Tag>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">4. 状态前缀</h4>
            <div className="flex flex-wrap gap-2">
              <Tag color="orange">hover: → 悬停</Tag>
              <Tag color="orange">focus: → 聚焦</Tag>
              <Tag color="orange">active: → 激活</Tag>
              <Tag color="orange">dark: → 暗黑</Tag>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📋 常用工具类速查" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">布局</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>flex</Text> / <Text code>grid</Text> / <Text code>block</Text></div>
              <div><Text code>items-center</Text> / <Text code>justify-between</Text></div>
              <div><Text code>gap-4</Text> / <Text code>space-x-2</Text></div>
              <div><Text code>w-full</Text> / <Text code>h-screen</Text></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">间距</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>p-4</Text> = padding: 16px</div>
              <div><Text code>m-2</Text> = margin: 8px</div>
              <div><Text code>px-6</Text> = padding-left/right: 24px</div>
              <div><Text code>mt-4</Text> = margin-top: 16px</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">排版</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>text-lg</Text> / <Text code>text-2xl</Text></div>
              <div><Text code>font-bold</Text> / <Text code>font-medium</Text></div>
              <div><Text code>text-gray-500</Text> / <Text code>text-indigo-600</Text></div>
              <div><Text code>text-center</Text> / <Text code>leading-6</Text></div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">视觉</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>bg-white</Text> / <Text code>bg-indigo-50</Text></div>
              <div><Text code>rounded-lg</Text> / <Text code>rounded-full</Text></div>
              <div><Text code>shadow-sm</Text> / <Text code>shadow-lg</Text></div>
              <div><Text code>border</Text> / <Text code>border-gray-200</Text></div>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>原子化思维：每个类只做一件事，组合使用</li>
          <li>无需命名 CSS 类，减少心智负担</li>
          <li>响应式前缀 <Text code>sm:/md:/lg:/xl:</Text></li>
          <li>状态前缀 <Text code>hover:/focus:/active:/dark:</Text></li>
          <li>TailwindCSS 4 默认自动扫描，无需配置 content</li>
          <li>与 Ant Design 搭配时，用 <Text code>!</Text> 前缀覆盖样式</li>
        </ul>
      </Card>
    </div>
  )
}
