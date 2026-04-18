import { createContext, useContext, useState } from 'react'
import { Typography, Card, Divider, Button, Input, Tag } from 'antd'

const { Title, Paragraph } = Typography

type Theme = 'light' | 'dark'
type Lang = 'zh' | 'en'

interface AppContextType {
  theme: Theme
  toggleTheme: () => void
  lang: Lang
  setLang: (lang: Lang) => void
  user: { name: string; role: string } | null
  login: (name: string, role: string) => void
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}

function ThemedCard({ children, title }: { children: React.ReactNode; title: string }) {
  const { theme } = useAppContext()
  const isDark = theme === 'dark'

  return (
    <div className={`p-4 rounded-xl transition-colors ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border'}`}>
      <h4 className="font-bold mb-2">{title}</h4>
      {children}
    </div>
  )
}

function UserInfo() {
  const { user, logout, lang } = useAppContext()
  const t = (zh: string, en: string) => lang === 'zh' ? zh : en

  if (!user) return <p className="text-gray-500">{t('未登录', 'Not logged in')}</p>

  return (
    <div className="flex items-center gap-2">
      <Tag color="blue">{user.role}</Tag>
      <span>{user.name}</span>
      <Button size="small" danger onClick={logout}>{t('退出', 'Logout')}</Button>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext()
  return (
    <button
      className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-800 text-white'}`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? '☀️ 亮色' : '🌙 暗色'}
    </button>
  )
}

function LangSwitch() {
  const { lang, setLang } = useAppContext()
  return (
    <div className="flex gap-2">
      <Tag color={lang === 'zh' ? 'blue' : 'default'} className="cursor-pointer" onClick={() => setLang('zh')}>中文</Tag>
      <Tag color={lang === 'en' ? 'blue' : 'default'} className="cursor-pointer" onClick={() => setLang('en')}>English</Tag>
    </div>
  )
}

function LoginForm() {
  const { login } = useAppContext()
  const [name, setName] = useState('')

  return (
    <div className="flex gap-2">
      <Input size="small" value={name} onChange={(e) => setName(e.target.value)} placeholder="输入用户名" />
      <Button size="small" type="primary" onClick={() => { login(name || '访客', 'user'); setName('') }}>登录</Button>
    </div>
  )
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [lang, setLang] = useState<Lang>('zh')
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  const value: AppContextType = {
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    lang,
    setLang,
    user,
    login: (name, role) => setUser({ name, role }),
    logout: () => setUser(null),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default function Ch2UseContext() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🌐 2.5 useContext</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        useContext 让你跨组件层级传递数据，避免 prop drilling（逐层传递 props）。
      </Paragraph>

      <Card title="💡 Context 解决什么问题？" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <h4 className="font-bold text-red-700 mb-2">❌ Prop Drilling</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<App theme={theme}>
  <Header theme={theme}>
    <Nav theme={theme}>
      <Button theme={theme} />
    </Nav>
  </Header>
</App>`}</pre>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">✅ Context</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`<ThemeProvider>
  <App>
    <Header>
      <Nav>
        <Button /> {/* 直接用 */}
      </Nav>
    </Header>
  </App>
</ThemeProvider>`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card title="💡 创建和使用 Context" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`// 1. 创建 Context
const AppContext = createContext(null)

// 2. 创建 Provider 组件
function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const value = {
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// 3. 在子组件中使用
function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('Must be used within Provider')
  return ctx
}

function Button() {
  const { theme, toggleTheme } = useAppContext()
  return <button onClick={toggleTheme}>{theme}</button>
}`}</pre>
        </div>
      </Card>

      <Card title="🔬 实战：全局状态管理" className="mb-6">
        <Paragraph>下面的演示包含主题、语言、用户三个全局状态，通过 Context 共享：</Paragraph>
        <AppProvider>
          <div className="p-4 bg-indigo-50 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <ThemeToggle />
                <LangSwitch />
              </div>
              <UserInfo />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ThemedCard title="用户信息">
                <UserInfo />
                <div className="mt-2">
                  <LoginForm />
                </div>
              </ThemedCard>
              <ThemedCard title="主题控制">
                <ThemeToggle />
              </ThemedCard>
            </div>
          </div>
        </AppProvider>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Context 解决 prop drilling 问题，实现跨层级数据共享</li>
          <li>三步走：createContext → Provider → useContext</li>
          <li>Context 值变化时，所有消费者都会重新渲染</li>
          <li>适合：主题、语言、用户信息等全局数据</li>
          <li>不适合：高频更新的数据（考虑状态管理库）</li>
          <li>自定义 Hook 封装 useContext，增加类型安全和错误提示</li>
        </ul>
      </Card>
    </div>
  )
}
