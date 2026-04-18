import { Typography, Card, Tag, Row, Col, Progress, Divider } from 'antd'
import { Link } from 'react-router-dom'
import {
  BookOutlined,
  CodeOutlined,
  AppstoreOutlined,
  ThunderboltOutlined,
  FormatPainterOutlined,
  RocketOutlined,
  CrownOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const chapters = [
  {
    key: 'ch1',
    icon: <BookOutlined className="text-3xl" />,
    title: 'Chapter 1: React 核心基础',
    desc: '从零开始掌握 React 的核心概念：JSX、组件、Props、State、生命周期、事件处理、列表渲染、Error Boundaries',
    color: '#6366f1',
    lessons: [
      { path: '/ch1/jsx', name: 'JSX 语法' },
      { path: '/ch1/components', name: '组件基础' },
      { path: '/ch1/props', name: 'Props 传参' },
      { path: '/ch1/state', name: 'State 状态' },
      { path: '/ch1/lifecycle', name: '生命周期' },
      { path: '/ch1/events', name: '事件处理' },
      { path: '/ch1/lists', name: '列表与 Key' },
      { path: '/ch1/error-boundary', name: 'Error Boundaries' },
    ],
  },
  {
    key: 'ch2',
    icon: <CodeOutlined className="text-3xl" />,
    title: 'Chapter 2: React Hooks 深入',
    desc: '深入理解 React Hooks 机制：useEffect、useRef、useMemo、useCallback、useContext、自定义 Hook、React 19 新特性、React Router、TypeScript',
    color: '#8b5cf6',
    lessons: [
      { path: '/ch2/useeffect', name: 'useEffect' },
      { path: '/ch2/useref', name: 'useRef' },
      { path: '/ch2/usememo', name: 'useMemo' },
      { path: '/ch2/usecallback', name: 'useCallback' },
      { path: '/ch2/usecontext', name: 'useContext' },
      { path: '/ch2/custom-hooks', name: '自定义 Hook' },
      { path: '/ch2/react19', name: 'React 19' },
      { path: '/ch2/router', name: 'React Router' },
      { path: '/ch2/typescript', name: 'TypeScript' },
    ],
  },
  {
    key: 'ch3',
    icon: <AppstoreOutlined className="text-3xl" />,
    title: 'Chapter 3: Ant Design 组件体系',
    desc: '系统学习 Ant Design 核心组件：Button、Input、Select、DatePicker、Checkbox/Radio、Upload、Slider/Rate/Switch、Form、Table、Modal、Message、Layout',
    color: '#1677ff',
    lessons: [
      { path: '/ch3/button', name: 'Button' },
      { path: '/ch3/input', name: 'Input' },
      { path: '/ch3/select', name: 'Select' },
      { path: '/ch3/datepicker', name: 'DatePicker' },
      { path: '/ch3/checkbox-radio', name: 'Checkbox/Radio' },
      { path: '/ch3/upload', name: 'Upload' },
      { path: '/ch3/other-entry', name: 'Slider/Rate/Switch' },
      { path: '/ch3/form', name: 'Form' },
      { path: '/ch3/table', name: 'Table' },
      { path: '/ch3/modal', name: 'Modal' },
      { path: '/ch3/message', name: 'Message' },
      { path: '/ch3/layout', name: 'Layout' },
    ],
  },
  {
    key: 'ch4',
    icon: <ThunderboltOutlined className="text-3xl" />,
    title: 'Chapter 4: Ant Design 高级实战',
    desc: '掌握 Ant Design 高级组件：Card/Tabs、Tooltip/Popover、List/Descriptions、Badge/Avatar/Tag、Tree/Timeline、Notification、Drawer、Alert/Result、Progress/Skeleton/Spin、Menu/Dropdown、Pagination/Steps、主题定制、国际化、表单进阶、ProTable',
    color: '#0ea5e9',
    lessons: [
      { path: '/ch4/card-tabs', name: 'Card/Tabs' },
      { path: '/ch4/tooltip-popover', name: 'Tooltip/Popover' },
      { path: '/ch4/list-descriptions', name: 'List/Descriptions' },
      { path: '/ch4/badge-avatar-timeline', name: 'Badge/Avatar/Tag' },
      { path: '/ch4/tree-timeline', name: 'Tree/Timeline' },
      { path: '/ch4/notification', name: 'Notification' },
      { path: '/ch4/drawer', name: 'Drawer' },
      { path: '/ch4/alert-result', name: 'Alert/Result' },
      { path: '/ch4/progress-spin', name: 'Progress/Skeleton/Spin' },
      { path: '/ch4/menu-dropdown', name: 'Menu/Dropdown' },
      { path: '/ch4/pagination-steps', name: 'Pagination/Steps' },
      { path: '/ch4/theme', name: '主题定制' },
      { path: '/ch4/intl', name: '国际化' },
      { path: '/ch4/form-advanced', name: '表单进阶' },
      { path: '/ch4/protable', name: 'ProTable' },
    ],
  },
  {
    key: 'ch5',
    icon: <FormatPainterOutlined className="text-3xl" />,
    title: 'Chapter 5: TailwindCSS 核心体系',
    desc: '掌握原子化 CSS 思维：工具类优先、布局系统、排版工具类、背景与边框、滤镜与变换、交互性、响应式、暗黑模式、动画、自定义配置',
    color: '#06b6d4',
    lessons: [
      { path: '/ch5/utility-first', name: '原子化思维' },
      { path: '/ch5/layout', name: '布局系统' },
      { path: '/ch5/typography', name: '排版工具类' },
      { path: '/ch5/backgrounds-borders', name: '背景与边框' },
      { path: '/ch5/filters-transforms', name: '滤镜与变换' },
      { path: '/ch5/interactivity', name: '交互性' },
      { path: '/ch5/responsive', name: '响应式设计' },
      { path: '/ch5/dark-mode', name: '暗黑模式' },
      { path: '/ch5/animation', name: '动画过渡' },
      { path: '/ch5/custom', name: '自定义配置' },
    ],
  },
  {
    key: 'ch6',
    icon: <RocketOutlined className="text-3xl" />,
    title: 'Chapter 6: 三者融合 - 企业级实战',
    desc: 'React + Ant Design + TailwindCSS 三位一体，构建数据仪表盘和后台管理系统',
    color: '#10b981',
    lessons: [
      { path: '/ch6/dashboard', name: '数据仪表盘' },
      { path: '/ch6/admin', name: '后台管理系统' },
    ],
  },
  {
    key: 'ch7',
    icon: <CrownOutlined className="text-3xl" />,
    title: 'Chapter 7: 大师之路',
    desc: '性能优化、设计模式、测试、部署工程化 —— 从开发者到架构师的蜕变',
    color: '#f59e0b',
    lessons: [
      { path: '/ch7/perf', name: '性能优化' },
      { path: '/ch7/pattern', name: '设计模式' },
      { path: '/ch7/deploy', name: '部署与工程化' },
      { path: '/ch7/testing', name: '测试基础' },
    ],
  },
]

const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <Title className="!mb-2">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            React + Ant Design + TailwindCSS
          </span>
        </Title>
        <Title level={2} className="!mt-0 !font-normal !text-gray-500">
          从零到大师 · 交互式实战教程
        </Title>
        <Paragraph className="text-lg text-gray-500 max-w-2xl mx-auto">
          本教程共 <Text strong>{totalLessons}</Text> 个课时，覆盖从 React 基础到企业级全栈前端开发。
          每个课时都包含可运行的代码示例，让你在实践中掌握每一个知识点。
        </Paragraph>
        <div className="flex justify-center gap-4 mt-4">
          <Tag color="purple" className="text-base px-3 py-1">React 19</Tag>
          <Tag color="blue" className="text-base px-3 py-1">Ant Design 6</Tag>
          <Tag color="cyan" className="text-base px-3 py-1">TailwindCSS 4</Tag>
          <Tag color="green" className="text-base px-3 py-1">TypeScript</Tag>
        </div>
      </div>

      <Divider />

      <Row gutter={[24, 24]}>
        {chapters.map((chapter) => (
          <Col xs={24} lg={12} xl={8} key={chapter.key}>
            <Card
              hoverable
              className="h-full"
              styles={{
                body: { padding: '24px' },
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: chapter.color }}
                >
                  {chapter.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <Title level={5} className="!mb-1">{chapter.title}</Title>
                  <Paragraph className="!mb-3 text-gray-500 text-sm" ellipsis={{ rows: 2 }}>
                    {chapter.desc}
                  </Paragraph>
                  <Progress
                    percent={0}
                    size="small"
                    strokeColor={chapter.color}
                    format={() => `0/${chapter.lessons.length}`}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {chapter.lessons.map((lesson) => (
                  <Link key={lesson.path} to={lesson.path}>
                    <Tag
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ borderColor: chapter.color, color: chapter.color }}
                    >
                      {lesson.name}
                    </Tag>
                  </Link>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <div className="text-center text-gray-400 text-sm pb-8">
        <p>学习路径：Ch1 → Ch2 → Ch3 → Ch4 → Ch5 → Ch6 → Ch7</p>
        <p>建议按顺序学习，每个课时都有可交互的代码示例</p>
      </div>
    </div>
  )
}
