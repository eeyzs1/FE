import { useState } from 'react'
import { Typography, Card, Divider, ConfigProvider, Button, Input, Select, DatePicker, Tag, Space } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

const { Title, Paragraph } = Typography

export default function Ch4Intl() {
  const [locale, setLocale] = useState<'zh' | 'en'>('zh')
  const localeMap = { zh: zhCN, en: enUS }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🌍 4.2 国际化</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        Ant Design 通过 ConfigProvider 的 locale 属性实现组件级国际化。
      </Paragraph>

      <Card title="💡 基本用法" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          <pre>{`import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

<ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
  <App />
</ConfigProvider>`}</pre>
        </div>
      </Card>

      <Card title="🔬 切换语言" className="mb-6">
        <div className="flex gap-2 mb-4">
          <Tag color={locale === 'zh' ? 'blue' : 'default'} className="cursor-pointer" onClick={() => setLocale('zh')}>中文</Tag>
          <Tag color={locale === 'en' ? 'blue' : 'default'} className="cursor-pointer" onClick={() => setLocale('en')}>English</Tag>
        </div>
        <ConfigProvider locale={localeMap[locale]}>
          <div className="p-4 bg-indigo-50 rounded-lg space-y-3">
            <Space wrap>
              <Button type="primary">{locale === 'zh' ? '确定' : 'Confirm'}</Button>
              <Button>{locale === 'zh' ? '取消' : 'Cancel'}</Button>
            </Space>
            <Select
              className="w-full"
              placeholder={locale === 'zh' ? '请选择' : 'Please select'}
              options={[
                { value: '1', label: locale === 'zh' ? '选项一' : 'Option 1' },
                { value: '2', label: locale === 'zh' ? '选项二' : 'Option 2' },
              ]}
            />
            <DatePicker className="w-full" />
            <Input placeholder={locale === 'zh' ? '请输入' : 'Please input'} allowClear />
          </div>
        </ConfigProvider>
      </Card>

      <Card title="📋 应用级国际化方案" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// 1. 创建 i18n 配置
const messages = {
  zh: { welcome: '欢迎', login: '登录' },
  en: { welcome: 'Welcome', login: 'Login' },
}

// 2. 创建 Context
const I18nContext = createContext()

// 3. 使用
const { locale, t } = useContext(I18nContext)
<h1>{t('welcome')}</h1>

// 4. 配合 Ant Design locale
<ConfigProvider locale={antdLocaleMap[locale]}>
  <App />
</ConfigProvider>`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>ConfigProvider locale 属性配置 Ant Design 组件语言</li>
          <li>支持 50+ 种语言包</li>
          <li>应用文本国际化需要自行实现（i18n 方案）</li>
          <li>日期组件国际化尤为重要</li>
          <li>动态切换 locale 即时生效</li>
        </ul>
      </Card>
    </div>
  )
}
