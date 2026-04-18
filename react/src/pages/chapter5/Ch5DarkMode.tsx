import { useState } from 'react'
import { Typography, Card, Divider, Switch, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5DarkMode() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🌙 5.4 暗黑模式</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 通过 <Text code>dark:</Text> 前缀实现暗黑模式，支持 class 和 media 两种策略。
      </Paragraph>

      <Card title="💡 dark: 前缀" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<div class="bg-white dark:bg-gray-800 
  text-gray-900 dark:text-white">
  内容区域
</div>

<button class="bg-indigo-500 dark:bg-indigo-700 
  hover:bg-indigo-600 dark:hover:bg-indigo-600">
  按钮
</button>`}</pre>
        </div>
      </Card>

      <Card title="🔬 暗黑模式演示" className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Switch checked={isDark} onChange={setIsDark} />
          <span>{isDark ? '🌙 暗黑模式' : '☀️ 亮色模式'}</span>
        </div>
        <div className={`p-6 rounded-xl transition-colors duration-300 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border'}`}>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold">📊</div>
              <div className="font-semibold">统计</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>1,234 条数据</div>
            </div>
            <div className={`p-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold">👥</div>
              <div className="font-semibold">用户</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>567 位用户</div>
            </div>
            <div className={`p-4 rounded-lg transition-colors ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold">💰</div>
              <div className="font-semibold">收入</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>¥89,012</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📋 两种暗黑模式策略" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl">
            <h4 className="font-bold text-blue-700 mb-2">class 策略（推荐）</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`// tailwind.config.js
darkMode: 'class'

// 通过 JS 切换
document.documentElement
  .classList.toggle('dark')

// CSS 中使用
<div class="bg-white dark:bg-gray-800">`}</pre>
            </div>
            <Tag color="blue" className="mt-2">手动控制</Tag>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">media 策略</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`// tailwind.config.js
darkMode: 'media'

// 跟随系统设置
// @media (prefers-color-scheme: dark)

// CSS 中使用（同上）
<div class="bg-white dark:bg-gray-800">`}</pre>
            </div>
            <Tag color="green" className="mt-2">自动跟随系统</Tag>
          </div>
        </div>
      </Card>

      <Card title="🌟 Ant Design + TailwindCSS 暗黑模式" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 1. Ant Design 暗黑主题
<ConfigProvider theme={{
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
}}>

// 2. TailwindCSS dark: 前缀
<div className="bg-white dark:bg-gray-800 
  text-gray-900 dark:text-white">

// 3. 统一管理暗黑状态
const [isDark, setIsDark] = useState(false)

// 4. 持久化到 localStorage
const [isDark, setIsDark] = useLocalStorage('dark', false)`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>dark: 前缀为暗黑模式编写替代样式</li>
          <li>class 策略手动控制，media 策略跟随系统</li>
          <li>Ant Design 用 ConfigProvider + darkAlgorithm</li>
          <li>两者配合：Ant Design 管组件主题，TailwindCSS 管自定义样式</li>
          <li>使用 useLocalStorage 持久化暗黑模式偏好</li>
        </ul>
      </Card>
    </div>
  )
}
