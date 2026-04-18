import { useState } from 'react'
import { Typography, Card, Divider, Button, Space } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch5Animation() {
  const [show, setShow] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>✨ 5.5 动画过渡</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        TailwindCSS 内置 transition 和 animation 工具类，轻松实现流畅的动画效果。
      </Paragraph>

      <Card title="💡 Transition 过渡" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<button class="transition-colors duration-300 
  hover:bg-indigo-600 bg-indigo-500">

<div class="transition-all duration-500 ease-in-out
  hover:scale-110 hover:shadow-lg">

<div class="transition-opacity duration-300
  opacity-100 hover:opacity-50">`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <Space wrap size="large">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded transition-colors duration-300 hover:bg-indigo-700">
              颜色过渡
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded transition-all duration-300 hover:scale-110 hover:shadow-lg">
              缩放+阴影
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded transition-opacity duration-300 hover:opacity-50">
              透明度
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded transition-all duration-500 hover:rotate-12">
              旋转
            </button>
          </Space>
        </div>
      </Card>

      <Card title="🎬 Animation 动画" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`<div class="animate-spin">🔄</div>    // 旋转
<div class="animate-ping">🟢</div>   // 脉冲
<div class="animate-pulse">⏳</div>  // 呼吸
<div class="animate-bounce">⬆️</div> // 弹跳`}</pre>
        </div>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="animate-spin text-4xl">🔄</div>
              <div className="text-sm mt-2 text-gray-500">spin</div>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-green-400 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-8 w-8 bg-green-500 items-center justify-center text-white text-xs">🟢</div>
              </div>
              <div className="text-sm mt-2 text-gray-500">ping</div>
            </div>
            <div className="text-center">
              <div className="animate-pulse text-4xl">⏳</div>
              <div className="text-sm mt-2 text-gray-500">pulse</div>
            </div>
            <div className="text-center">
              <div className="animate-bounce text-4xl">⬆️</div>
              <div className="text-sm mt-2 text-gray-500">bounce</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🎭 显隐动画" className="mb-6">
        <Paragraph>配合条件渲染和过渡类实现显隐动画：</Paragraph>
        <Button type="primary" onClick={() => setShow(!show)} className="mb-3">
          {show ? '隐藏' : '显示'}
        </Button>
        <div className="relative h-32 overflow-hidden">
          <div className={`transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl">
              <h3 className="font-bold text-lg">渐入动画</h3>
              <p>opacity + translate 组合实现平滑显隐</p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📋 过渡属性速查" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">过渡属性</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>transition-none</Text></div>
              <div><Text code>transition-all</Text> 所有属性</div>
              <div><Text code>transition-colors</Text> 颜色</div>
              <div><Text code>transition-opacity</Text> 透明度</div>
              <div><Text code>transition-transform</Text> 变换</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <h4 className="font-bold mb-2">时长与缓动</h4>
            <div className="font-mono text-xs space-y-1">
              <div><Text code>duration-75/100/150/200/300/500/700/1000</Text></div>
              <div><Text code>ease-linear</Text> 线性</div>
              <div><Text code>ease-in</Text> 加速</div>
              <div><Text code>ease-out</Text> 减速</div>
              <div><Text code>ease-in-out</Text> 先加后减</div>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-cyan-50 to-blue-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>transition-* 添加过渡效果</li>
          <li>duration-* 控制时长，ease-* 控制缓动</li>
          <li>4种内置动画：spin / ping / pulse / bounce</li>
          <li>opacity + translate 组合实现显隐动画</li>
          <li>hover: / focus: 配合 transition 实现交互反馈</li>
          <li>自定义动画通过 @keyframes + animate-[name] 实现</li>
        </ul>
      </Card>
    </div>
  )
}
