import { Typography, Card, Divider, Tag } from 'antd'

const { Title, Paragraph, Text } = Typography

export default function Ch7Testing() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🧪 7.4 测试基础</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        测试是保障代码质量和重构信心的基石。掌握 React 组件测试是达到大师水准的必经之路。
      </Paragraph>

      <Card title="💡 测试金字塔" className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🏗️</div>
            <div className="font-bold text-green-700">单元测试</div>
            <div className="text-sm text-green-600">数量最多，速度最快</div>
            <Tag color="green" className="mt-2">Vitest</Tag>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="font-bold text-blue-700">集成测试</div>
            <div className="text-sm text-blue-600">组件交互测试</div>
            <Tag color="blue" className="mt-2">RTL</Tag>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-3xl mb-2">🌐</div>
            <div className="font-bold text-purple-700">E2E 测试</div>
            <div className="text-sm text-purple-600">模拟用户操作</div>
            <Tag color="purple" className="mt-2">Playwright</Tag>
          </div>
        </div>
      </Card>

      <Card title="📦 工具链" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <Text strong>1. Vitest — 测试运行器</Text>
            <p className="text-sm text-gray-500 mt-1">Vite 原生测试框架，极速启动，兼容 Jest API</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mt-2">
              <pre>{`// 安装
pnpm add -D vitest

// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
})`}</pre>
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Text strong>2. React Testing Library — 组件测试</Text>
            <p className="text-sm text-gray-500 mt-1">以用户行为为中心的测试方法，不测试实现细节</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mt-2">
              <pre>{`// 安装
pnpm add -D @testing-library/react @testing-library/jest-dom

// 核心原则：
// ✅ 测试用户看到什么（文本、交互）
// ❌ 不测试组件内部实现（state、方法名）`}</pre>
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text strong>3. user-event — 模拟用户操作</Text>
            <p className="text-sm text-gray-500 mt-1">比 fireEvent 更真实地模拟用户交互</p>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mt-2">
              <pre>{`// 安装
pnpm add -D @testing-library/user-event

// 使用
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'hello')
await user.selectOptions(select, 'option1')`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card title="📝 单元测试示例" className="mb-6">
        <Paragraph>测试工具函数和自定义 Hook：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice, validateEmail } from './utils'

describe('formatPrice', () => {
  it('格式化价格', () => {
    expect(formatPrice(1234.5)).toBe('¥1,234.50')
  })
  
  it('处理零值', () => {
    expect(formatPrice(0)).toBe('¥0.00')
  })
})

describe('validateEmail', () => {
  it('有效邮箱返回 true', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })
  
  it('无效邮箱返回 false', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})

// Hook 测试
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('切换布尔值', () => {
    const { result } = renderHook(() => useToggle(false))
    
    expect(result.current[0]).toBe(false)
    
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
  })
})`}</pre>
        </div>
      </Card>

      <Card title="🧩 组件测试示例" className="mb-6">
        <Paragraph>测试 React 组件的渲染和交互：</Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// UserCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserCard from './UserCard'

describe('UserCard', () => {
  const mockUser = {
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
  }

  it('渲染用户信息', () => {
    render(<UserCard user={mockUser} />)
    
    expect(screen.getByText('张三')).toBeInTheDocument()
    expect(screen.getByText('zhangsan@example.com')).toBeInTheDocument()
    expect(screen.getByText('admin')).toBeInTheDocument()
  })

  it('点击编辑按钮触发回调', async () => {
    const onEdit = vi.fn()
    render(<UserCard user={mockUser} onEdit={onEdit} />)
    
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /编辑/ }))
    
    expect(onEdit).toHaveBeenCalledWith(mockUser)
  })

  it('加载状态显示骨架屏', () => {
    render(<UserCard loading />)
    
    expect(screen.queryByText('张三')).not.toBeInTheDocument()
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})`}</pre>
        </div>
      </Card>

      <Card title="🌐 异步测试" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 测试异步数据获取
import { waitFor, screen } from '@testing-library/react'

it('加载并显示数据', async () => {
  render(<UserList />)
  
  // 初始加载状态
  expect(screen.getByText('加载中...')).toBeInTheDocument()
  
  // 等待数据加载完成
  await waitFor(() => {
    expect(screen.getByText('用户列表')).toBeInTheDocument()
  })
  
  // 验证数据已渲染
  expect(screen.getAllByRole('row')).toHaveLength(5)
})

// Mock API
import { vi } from 'vitest'

vi.mock('./api', () => ({
  fetchUsers: vi.fn().mockResolvedValue([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
  ]),
}))`}</pre>
        </div>
      </Card>

      <Card title="📋 测试最佳实践" className="mb-6">
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <Text strong>✅ 推荐做法：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-green-700">
              <li>测试行为而非实现（用户看到什么、能做什么）</li>
              <li>使用 <Text code>screen.getByRole</Text> 而非 <Text code>getByTestId</Text></li>
              <li>使用 <Text code>userEvent</Text> 而非 <Text code>fireEvent</Text></li>
              <li>为每个 bug 先写一个失败的测试</li>
              <li>Mock 外部依赖，不 Mock 内部模块</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <Text strong>❌ 避免做法：</Text>
            <ul className="list-disc pl-5 mt-1 text-sm text-red-700">
              <li>测试组件内部 state（实现细节）</li>
              <li>过度使用 snapshot 测试</li>
              <li>Mock 所有依赖（测试变得脆弱）</li>
              <li>忽略异步操作的加载状态</li>
            </ul>
          </div>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-amber-50 to-orange-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Vitest + React Testing Library 是 React 测试的黄金组合</li>
          <li>测试金字塔：大量单元测试 + 适量集成测试 + 少量 E2E</li>
          <li>核心原则：测试用户行为，不测试实现细节</li>
          <li>userEvent 模拟真实用户操作，比 fireEvent 更可靠</li>
          <li>异步测试用 <Text code>waitFor</Text> 和 <Text code>findBy</Text></li>
          <li>良好的测试覆盖率让重构更有信心</li>
        </ul>
      </Card>
    </div>
  )
}
