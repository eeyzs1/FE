import { useState, use, Suspense, useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'
import { Typography, Card, Divider, Input, Button, Tag, Spin } from 'antd'

const { Title, Paragraph, Text } = Typography

type Post = { userId: number; id: number; title: string; body: string }

function fetchPost(id: number): Promise<Post> {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
}

function PostDetail({ postPromise }: { postPromise: Promise<Post> }) {
  const post = use(postPromise)

  return (
    <div className="p-4 bg-white rounded-lg border">
      <Tag color="blue">ID: {post.id}</Tag>
      <h4 className="font-bold mt-2">{post.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{post.body.slice(0, 100)}...</p>
    </div>
  )
}

function UseDemo() {
  const [postId, setPostId] = useState(1)
  const [postPromise, setPostPromise] = useState(() => fetchPost(1))

  const handleRefresh = () => {
    const newId = (postId % 5) + 1
    setPostId(newId)
    setPostPromise(fetchPost(newId))
  }

  return (
    <div className="p-4 bg-indigo-50 rounded-lg">
      <div className="flex gap-2 mb-3">
        <Button type="primary" onClick={handleRefresh}>换一篇文章</Button>
        <Tag color="blue">Post {postId}</Tag>
      </div>
      <Suspense fallback={<div className="text-center py-4"><Spin tip="加载中..." /></div>}>
        <PostDetail postPromise={postPromise} />
      </Suspense>
    </div>
  )
}

function ActionStateDemo() {
  const [state, submitAction, isPending] = useActionState(
    async (previousState: string, formData: FormData) => {
      const name = formData.get('name') as string
      await new Promise(resolve => setTimeout(resolve, 1500))
      if (!name?.trim()) return '❌ 名字不能为空'
      return `✅ 欢迎, ${name}! (上次: ${previousState || '无'})`
    },
    ''
  )

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <form action={submitAction} className="flex gap-2">
        <Input name="name" placeholder="输入你的名字" disabled={isPending} />
        <Button type="primary" htmlType="submit" loading={isPending}>提交</Button>
      </form>
      {state && (
        <div className="mt-2 p-2 bg-white rounded text-sm">{state}</div>
      )}
    </div>
  )
}

function OptimisticDemo() {
  const [liked, setLiked] = useState(false)
  const [optimisticLiked, addOptimistic] = useOptimistic(liked)

  const handleLike = async () => {
    addOptimistic(!liked)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLiked(!liked)
  }

  return (
    <div className="p-4 bg-orange-50 rounded-lg text-center">
      <Button
        type={optimisticLiked ? 'primary' : 'default'}
        danger={optimisticLiked}
        size="large"
        onClick={handleLike}
        loading={optimisticLiked !== liked}
      >
        {optimisticLiked ? '❤️ 已点赞' : '🤍 点赞'}
      </Button>
      <p className="mt-2 text-sm text-gray-500">
        点击后立即更新 UI，异步操作完成后同步真实状态
      </p>
    </div>
  )
}

function FormStatusDemo() {
  const { pending } = useFormStatus()

  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Input name="email" placeholder="输入邮箱" disabled={pending} className="flex-1" />
        <Button type="primary" htmlType="submit" loading={pending}>
          {pending ? '提交中...' : '订阅'}
        </Button>
      </div>
      {pending && <p className="mt-2 text-sm text-purple-600">⏳ 正在提交表单...</p>}
    </div>
  )
}

function FormStatusWrapper() {
  const [result, setResult] = useState('')

  const submitAction = async (formData: FormData) => {
    const email = formData.get('email') as string
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResult(`✅ ${email} 订阅成功!`)
  }

  return (
    <form action={submitAction}>
      <FormStatusDemo />
      {result && <p className="mt-2 text-sm text-green-600">{result}</p>}
    </form>
  )
}

export default function Ch2React19() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🚀 2.7 React 19 新特性</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        React 19 引入了多个革命性 Hook，让数据获取、表单处理和状态管理更加优雅。
      </Paragraph>

      <Card title="💡 React 19 核心 API 速览" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'use()', desc: '读取 Promise 和 Context', color: 'blue' },
            { name: 'useActionState()', desc: '表单状态管理', color: 'green' },
            { name: 'useOptimistic()', desc: '乐观更新', color: 'orange' },
            { name: 'useFormStatus()', desc: '表单提交状态', color: 'purple' },
          ].map(item => (
            <div key={item.name} className="p-3 bg-gray-50 rounded-lg">
              <Tag color={item.color} className="mb-1">{item.name}</Tag>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🌐 use() — 读取 Promise 和 Context" className="mb-6">
        <Paragraph>
          <Text code>use()</Text> 是 React 19 最重要的新 Hook，可以在渲染时读取 Promise 的值，
          配合 Suspense 实现优雅的数据获取。
        </Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import { use, Suspense } from 'react'

// 读取 Promise
function PostDetail({ postPromise }) {
  const post = use(postPromise) // 自动挂起直到 Promise resolve
  return <div>{post.title}</div>
}

// 配合 Suspense 使用
<Suspense fallback={<Spinner />}>
  <PostDetail postPromise={fetchPost(1)} />
</Suspense>

// 也可以读取 Context
const theme = use(ThemeContext) // 替代 useContext`}</pre>
        </div>
        <UseDemo />
      </Card>

      <Card title="📝 useActionState() — 表单状态管理" className="mb-6">
        <Paragraph>
          <Text code>useActionState</Text> 统一管理表单提交的状态、结果和 pending 状态，
          替代手动管理 loading/error/data 的模式。
        </Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [state, submitAction, isPending] = useActionState(
  async (previousState, formData) => {
    // previousState: 上一次的返回值
    // formData: 表单数据
    const result = await submitToServer(formData)
    return result // 作为新的 state
  },
  initialValue // 初始状态
)

<form action={submitAction}>
  <input name="username" />
  <button type="submit" disabled={isPending}>
    {isPending ? '提交中...' : '提交'}
  </button>
</form>`}</pre>
        </div>
        <ActionStateDemo />
      </Card>

      <Card title="⚡ useOptimistic() — 乐观更新" className="mb-6">
        <Paragraph>
          <Text code>useOptimistic</Text> 在异步操作完成前先显示预期结果，
          操作完成后再同步真实状态。适合点赞、收藏等即时反馈场景。
        </Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`const [liked, setLiked] = useState(false)
const [optimisticLiked, addOptimistic] = useOptimistic(liked)

const handleLike = async () => {
  addOptimistic(!liked) // 立即显示乐观状态
  await toggleLikeAPI(!liked) // 异步操作
  setLiked(!liked) // 同步真实状态
}

// optimisticLiked 在异步期间为乐观值
// 异步完成后自动回退到真实值`}</pre>
        </div>
        <OptimisticDemo />
      </Card>

      <Card title="📊 useFormStatus() — 表单提交状态" className="mb-6">
        <Paragraph>
          <Text code>useFormStatus</Text> 让子组件感知父级 form 的提交状态，
          无需通过 props 传递 pending 状态。
        </Paragraph>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 子组件：自动感知父 form 的提交状态
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

// 父组件
<form action={submitAction}>
  <input name="email" />
  <SubmitButton /> {/* 自动获取 pending 状态 */}
</form>

// ⚠️ 必须在 <form> 内部的组件中使用`}</pre>
        </div>
        <FormStatusWrapper />
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li><Text code>use()</Text> 读取 Promise/Context，配合 Suspense 实现声明式数据获取</li>
          <li><Text code>useActionState()</Text> 统一管理表单提交的状态和结果</li>
          <li><Text code>useOptimistic()</Text> 乐观更新，提升用户体验的即时反馈</li>
          <li><Text code>useFormStatus()</Text> 子组件感知父 form 的 pending 状态</li>
          <li>React 19 推崇 "Action" 模式：表单提交 → 服务端处理 → 状态更新</li>
          <li>这些新 API 减少了手动管理 loading/error 的样板代码</li>
        </ul>
      </Card>
    </div>
  )
}
