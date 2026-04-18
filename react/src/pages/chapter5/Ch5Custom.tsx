import { Typography, Card, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Custom() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>⚙️ 5.6 自定义配置</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 4 通过 CSS 配置（而非 JS 配置文件）进行自定义，更灵活更直观。
      </Paragraph>

      <Card title="💡 TailwindCSS 4 配置方式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`/* index.css — TailwindCSS 4 的配置入口 */
@import "tailwindcss";

/* 自定义主题变量 */
@theme {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --font-display: "Inter", sans-serif;
  --breakpoint-xs: 475px;
}

/* 自定义工具类 */
@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}`}</pre>
        </div>
      </Card>

      <Card title="🎨 自定义颜色" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`@theme {
  --color-primary: #6366f1;
  --color-primary-light: #818cf8;
  --color-primary-dark: #4f46e5;
}

/* 使用 */
<div class="bg-primary text-white">
<button class="bg-primary hover:bg-primary-dark">`}</pre>
        </div>
        <div className="flex gap-3 mt-2">
          <div className="w-16 h-16 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs">Primary</div>
          <div className="w-16 h-16 rounded-lg bg-indigo-400 flex items-center justify-center text-white text-xs">Light</div>
          <div className="w-16 h-16 rounded-lg bg-indigo-700 flex items-center justify-center text-white text-xs">Dark</div>
        </div>
      </Card>

      <Card title="🛠️ @utility 自定义工具类" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@utility text-gradient {
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</pre>
        </div>
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold">Glass 效果</h3>
            <p className="text-sm opacity-80">毛玻璃 / 玻璃拟态效果</p>
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            渐变文字效果
          </span>
        </div>
      </Card>

      <Card title="📋 任意值语法" className="mb-6">
        <Paragraph>使用方括号 <Text code>[...]</Text> 编写任意值：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`<div class="top-[117px]">           /* 任意值 */
<div class="grid-cols-[1fr_2fr_1fr]"> /* 任意网格 */
<div class="text-[#1da1f2]">        /* 任意颜色 */
<div class="bg-[url('/hero.png')]"> /* 任意背景图 */
<button class="hover:bg-[#1da1f2]"> /* 任意 hover */`}</pre>
        </div>
      </Card>

      <Card title="🌟 与 Ant Design 协同" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 1. 用 ! 前缀覆盖 Ant Design 样式
<Button className="!rounded-full !px-8 !bg-indigo-600">
  圆角按钮
</Button>

// 2. 用 TailwindCSS 扩展 Ant Design 组件
<Card className="hover:!shadow-lg transition-shadow duration-300">
  悬停阴影
</Card>

// 3. 用 CSS 变量桥接主题
@theme {
  --color-primary: var(--ant-color-primary);
}

// 4. ConfigProvider + TailwindCSS dark:
<ConfigProvider theme={{
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
}}>
  <div className="bg-white dark:bg-gray-800">`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>TailwindCSS 4 用 CSS @theme 配置替代 JS 配置</li>
          <li>@utility 定义自定义工具类</li>
          <li>方括号 <Text code>[...]</Text> 编写任意值</li>
          <li><Text code>!</Text> 前缀覆盖 Ant Design 样式</li>
          <li>CSS 变量桥接 Ant Design 和 TailwindCSS 主题</li>
          <li>优先使用 TailwindCSS 工具类，必要时才自定义</li>
        </ul>
      </Card>
    </div>
  )
}
