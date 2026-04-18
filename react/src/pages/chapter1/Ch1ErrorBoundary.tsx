import { Component, useState } from 'react'
import { Typography, Card, Divider, Button, Alert, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <Alert
            type="error"
            message="组件渲染出错"
            description={this.state.error?.message || '未知错误'}
            showIcon
          />
          <Button
            className="mt-3"
            size="small"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            重试
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}

function BuggyCounter() {
  const [count, setCount] = useState(0)

  if (count >= 3) {
    throw new Error('💥 计数器崩溃了！count 不能超过 2')
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg text-center">
      <div className="text-4xl font-bold text-blue-600 mb-3">{count}</div>
      <Button type="primary" onClick={() => setCount(c => c + 1)}>
        +1（到 3 会崩溃）
      </Button>
      <p className="mt-2 text-xs text-blue-500">点击 3 次触发错误</p>
    </div>
  )
}

function NestedErrorDemo() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('🔴 嵌套组件出错！')
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg text-center">
      <p className="text-green-700 mb-2">✅ 这个组件运行正常</p>
      <Button danger onClick={() => setShouldError(true)}>
        触发错误
      </Button>
    </div>
  )
}

function CustomFallbackDemo() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('自定义降级 UI 触发')
  }

  return (
    <div className="p-4 bg-purple-50 rounded-lg text-center">
      <p className="text-purple-700 mb-2">🎨 这个组件有自定义降级 UI</p>
      <Button onClick={() => setShouldError(true)}>触发错误</Button>
    </div>
  )
}

export default function Ch1ErrorBoundary() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🛡️ 1.8 Error Boundaries</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Error Boundaries 是 React 的错误捕获机制，防止子组件的渲染错误导致整个应用崩溃。
      </Paragraph>

      <Card title="💡 为什么需要 Error Boundaries？" className="mb-6">
        <Paragraph>
          React 默认情况下，子组件抛出错误会导致整个组件树卸载。Error Boundary 捕获错误并显示降级 UI。
        </Paragraph>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 mb-2">❌ 没有 Error Boundary</h4>
            <p className="text-sm text-red-600">一个组件出错 → 整个应用白屏</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">✅ 有 Error Boundary</h4>
            <p className="text-sm text-green-600">一个组件出错 → 显示降级 UI，其他组件正常</p>
          </div>
        </div>
      </Card>

      <Card title="📝 创建 Error Boundary" className="mb-6">
        <Paragraph>Error Boundary 必须使用类组件实现（React 目前不支持函数式 Error Boundary）：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  // 捕获渲染错误，更新状态
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  // 记录错误信息（可上报到错误监控服务）
  componentDidCatch(error, errorInfo) {
    console.error('Caught error:', error, errorInfo)
    // logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />
    }
    return this.props.children
  }
}

// 使用
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>`}</pre>
        </div>
      </Card>

      <Card title="🔬 交互演示：错误捕获" className="mb-6">
        <Paragraph>点击按钮触发错误，观察 Error Boundary 如何捕获：</Paragraph>
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </Card>

      <Card title="🧩 嵌套 Error Boundary" className="mb-6">
        <Paragraph>可以为不同区域设置独立的 Error Boundary，实现错误隔离：</Paragraph>
        <div className="grid grid-cols-2 gap-4">
          <ErrorBoundary>
            <NestedErrorDemo />
          </ErrorBoundary>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-700">✅ 其他区域不受影响</p>
            <p className="text-xs text-gray-400 mt-1">左侧崩溃时，这里仍然正常</p>
          </div>
        </div>
      </Card>

      <Card title="🎨 自定义降级 UI" className="mb-6">
        <Paragraph>可以为不同场景提供不同的降级 UI：</Paragraph>
        <ErrorBoundary
          fallback={
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-yellow-700">⚠️ 组件加载失败，请稍后重试</p>
              <Tag color="orange" className="mt-2">自定义降级 UI</Tag>
            </div>
          }
        >
          <CustomFallbackDemo />
        </ErrorBoundary>
      </Card>

      <Card title="📋 Error Boundary 注意事项" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <Text strong>❌ 无法捕获的错误：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-red-700">
              <li>事件处理函数中的错误</li>
              <li>异步代码（setTimeout、requestAnimationFrame）</li>
              <li>服务端渲染的错误</li>
              <li>Error Boundary 自身抛出的错误</li>
            </ul>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text strong>✅ 能捕获的错误：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-green-700">
              <li>子组件渲染期间的错误</li>
              <li>生命周期方法中的错误</li>
              <li>子组件构造函数中的错误</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Error Boundary 防止子组件错误导致整个应用崩溃</li>
          <li>必须使用类组件实现（getDerivedStateFromError + componentDidCatch）</li>
          <li>为关键区域设置独立的 Error Boundary 实现错误隔离</li>
          <li>提供友好的降级 UI，支持重试恢复</li>
          <li>componentDidCatch 可将错误上报到监控服务</li>
          <li>事件处理和异步代码中的错误需要 try/catch 手动处理</li>
        </ul>
      </Card>
    </div>
  )
}
