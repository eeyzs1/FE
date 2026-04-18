# 🎓 React + Ant Design + TailwindCSS 大师课

> 从零到大师的交互式实战教程 —— 7 章 60 课时，覆盖 React 核心到企业级全栈前端开发

## 🚀 快速启动

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 打开浏览器访问
# http://localhost:5173/
```

启动后，你将看到课程大纲首页，左侧是章节导航，点击任意课时即可开始学习。

---

## 📚 课程体系

### Chapter 1: React 核心基础（8 课时）

> 🎯 目标：掌握 React 的核心概念，能独立编写 React 组件

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 1.1 JSX 语法 | `/ch1/jsx` | JSX 基本语法、表达式嵌入、条件渲染、样式处理、事件绑定 |
| 1.2 组件基础 | `/ch1/components` | 函数组件、组件组合、组件独立性、单一职责原则 |
| 1.3 Props 传参 | `/ch1/props` | Props 传递、只读性、条件 Props、children Props |
| 1.4 State 状态 | `/ch1/state` | useState、数字/字符串/数组/布尔状态、状态更新规则 |
| 1.5 生命周期 | `/ch1/lifecycle` | 挂载/更新/卸载、useEffect、依赖数组、清理函数 |
| 1.6 事件处理 | `/ch1/events` | 鼠标/键盘/表单事件、合成事件、事件修饰 |
| 1.7 列表与 Key | `/ch1/lists` | map 渲染、key 规则、列表增删改、条件过滤 |
| 1.8 Error Boundaries | `/ch1/error-boundary` | 错误捕获、降级 UI、错误隔离、类组件实现 |

**✅ 学完标志**：能独立编写一个 Todo List 应用，并处理渲染错误

---

### Chapter 2: React Hooks 深入（9 课时）

> 🎯 目标：深入理解 Hooks 机制，掌握 React 19 新特性、路由与 TypeScript

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 2.1 useEffect | `/ch2/useeffect` | 执行时机、依赖追踪、数据获取、竞态条件处理 |
| 2.2 useRef | `/ch2/useref` | useRef vs useState、DOM 引用、存储可变值、ref 不触发渲染 |
| 2.3 useMemo | `/ch2/usememo` | 计算缓存、列表过滤缓存、何时使用 useMemo |
| 2.4 useCallback | `/ch2/usecallback` | 函数引用缓存、React.memo 配合、何时使用 useCallback |
| 2.5 useContext | `/ch2/usecontext` | Context 创建与使用、避免 Prop Drilling、全局状态管理 |
| 2.6 自定义 Hook | `/ch2/custom-hooks` | useLocalStorage、useDebounce、useFetch、useToggle、Hook 设计原则 |
| 2.7 React 19 新特性 | `/ch2/react19` | use()、useActionState、useOptimistic、useFormStatus |
| 2.8 React Router | `/ch2/router` | 路由核心概念、useNavigate、useSearchParams、嵌套路由、Outlet、路由守卫、懒加载 |
| 2.9 TypeScript 模式 | `/ch2/typescript` | interface vs type、泛型、工具类型、React+TS 实战模式、严格模式 |

**✅ 学完标志**：能编写自定义 Hook，掌握路由和 TypeScript 在 React 中的应用

---

### Chapter 3: Ant Design 组件体系（12 课时）

> 🎯 目标：熟练使用 Ant Design 核心组件，理解组件 API 设计

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 3.1 Button 按钮 | `/ch3/button` | 按钮类型、图标按钮、尺寸、状态、交互增强、TailwindCSS 覆盖样式 |
| 3.2 Input 输入框 | `/ch3/input` | 前缀后缀、Password/TextArea/Search、尺寸、TailwindCSS 自定义 |
| 3.3 Select 选择器 | `/ch3/select` | 基础选择、多选、搜索、分组、远程搜索 |
| 3.4 DatePicker 日期 | `/ch3/datepicker` | 日期选择、范围选择、时间选择、禁用日期 |
| 3.5 Checkbox/Radio | `/ch3/checkbox-radio` | 复选框、单选框、全选、按钮样式 |
| 3.6 Upload 上传 | `/ch3/upload` | 拖拽上传、图片列表、上传限制、上传状态 |
| 3.7 Slider/Rate/Switch | `/ch3/other-entry` | 滑动输入、评分、开关、级联选择、颜色选择 |
| 3.8 Form 表单 | `/ch3/form` | Form.useForm、校验规则、表单布局、表单实例方法 |
| 3.9 Table 表格 | `/ch3/table` | 列配置、排序筛选、分页、行选择、自定义渲染 |
| 3.10 Modal 弹窗 | `/ch3/modal` | 基本弹窗、表单弹窗、自定义样式、静态方法 |
| 3.11 Message 消息 | `/ch3/message` | 5 种类型、持续时间、useMessage Hook、Message vs Notification |
| 3.12 Layout 布局 | `/ch3/layout` | Header/Sider/Content/Footer、Menu、Breadcrumb、Dropdown |

**✅ 学完标志**：能用 Ant Design 搭建一个完整的后台管理页面骨架

---

### Chapter 4: Ant Design 高级实战（15 课时）

> 🎯 目标：掌握 Ant Design 全部组件体系和深度定制能力

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 4.1 Card/Tabs | `/ch4/card-tabs` | 卡片布局、标签页切换、可编辑标签、标签页徽标 |
| 4.2 Tooltip/Popover | `/ch4/tooltip-popover` | 文字提示、气泡卡片、触发方式、位置控制 |
| 4.3 List/Descriptions | `/ch4/list-descriptions` | 列表渲染、描述列表、响应式描述、列表操作 |
| 4.4 Badge/Avatar/Tag | `/ch4/badge-avatar-timeline` | 徽标数、头像组合、标签颜色与预设 |
| 4.5 Tree/Timeline | `/ch4/tree-timeline` | 文件树、组织架构、时间线、自定义节点 |
| 4.6 Notification | `/ch4/notification` | 4 种类型、位置配置、自定义按钮、动态更新、Notification vs Message |
| 4.7 Drawer 抽屉 | `/ch4/drawer` | 多方向抽屉、表单抽屉、多级抽屉 |
| 4.8 Alert/Result | `/ch4/alert-result` | 警告提示、结果页、自定义图标、操作按钮 |
| 4.9 Progress/Skeleton/Spin | `/ch4/progress-spin` | 进度条、骨架屏、加载中、三种加载反馈选择指南 |
| 4.10 Menu/Dropdown | `/ch4/menu-dropdown` | 顶部导航、侧边导航、下拉菜单、右键菜单、用户头像菜单 |
| 4.11 Pagination/Steps | `/ch4/pagination-steps` | 分页控制、步骤条、注册流程、分页 vs 无限滚动 |
| 4.12 主题定制 | `/ch4/theme` | ConfigProvider、Design Token 体系、暗黑主题、主题色切换 |
| 4.13 国际化 | `/ch4/intl` | locale 配置、语言切换、应用级 i18n 方案 |
| 4.14 表单进阶 | `/ch4/form-advanced` | Form.List 动态表单、表单联动、Form.useWatch、表单实例方法 |
| 4.15 ProTable | `/ch4/protable` | 搜索+表格+分页整合、请求模式、手动实现 ProTable |

**✅ 学完标志**：能定制 Ant Design 主题，熟练使用所有组件，实现动态表单和高级表格

---

### Chapter 5: TailwindCSS 核心体系（10 课时）

> 🎯 目标：掌握原子化 CSS 思维，能高效编写样式

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 5.1 原子化思维 | `/ch5/utility-first` | 传统 CSS vs 原子化、工具类组合、响应式前缀、状态前缀、速查表 |
| 5.2 布局系统 | `/ch5/layout` | Flexbox 布局、Grid 布局、12 列栅格、间距系统 |
| 5.3 排版工具类 | `/ch5/typography` | 字体大小/粗细、文本对齐/颜色/行高/字间距、截断省略、装饰效果、渐变文字 |
| 5.4 背景与边框 | `/ch5/backgrounds-borders` | 背景色、渐变背景、边框样式/圆角/阴影、Ring 聚焦环、不透明度修饰符 |
| 5.5 滤镜与变换 | `/ch5/filters-transforms` | 模糊/亮度/对比度/灰度、旋转/缩放/平移/倾斜、Hover 效果、毛玻璃、3D 变换 |
| 5.6 交互性 | `/ch5/interactivity` | 光标样式、文本选择、指针事件、滚动控制、触摸手势、无障碍交互 |
| 5.7 响应式设计 | `/ch5/responsive` | 断点系统、移动优先策略、响应式导航/卡片/间距 |
| 5.8 暗黑模式 | `/ch5/dark-mode` | dark: 前缀、class/media 策略、Ant Design + TailwindCSS 暗黑协同 |
| 5.9 动画过渡 | `/ch5/animation` | transition 过渡、4 种内置动画、显隐动画、时长与缓动 |
| 5.10 自定义配置 | `/ch5/custom` | @theme 配置、@utility 自定义类、任意值语法、与 Ant Design 协同 |

**✅ 学完标志**：能用 TailwindCSS 快速实现任何 UI 设计稿

---

### Chapter 6: 三者融合 — 企业级实战（2 课时）

> 🎯 目标：综合运用三大技术栈构建企业级应用

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 6.1 数据仪表盘 | `/ch6/dashboard` | Statistic 统计卡片、Table 数据表格、Progress 进度、时间筛选 |
| 6.2 后台管理系统 | `/ch6/admin` | 完整 CRUD、搜索过滤、表单弹窗、统计概览、消息反馈 |

**✅ 学完标志**：能独立搭建一个完整的后台管理系统

---

### Chapter 7: 大师之路（4 课时）

> 🎯 目标：从开发者到架构师的蜕变

| 课时 | 路径 | 核心内容 |
|------|------|----------|
| 7.1 性能优化 | `/ch7/perf` | React.memo、useMemo/useCallback、代码分割、虚拟列表、性能分析工具 |
| 7.2 设计模式 | `/ch7/pattern` | 复合组件、Render Props、HOC、自定义 Hook 模式、项目架构、状态管理选型 |
| 7.3 部署与工程化 | `/ch7/deploy` | Vite 构建优化、Vercel/Docker 部署、CI/CD、环境变量 |
| 7.4 测试基础 | `/ch7/testing` | Vitest、React Testing Library、单元测试、组件测试、异步测试、测试最佳实践 |

**✅ 学完标志**：能设计、测试并部署一个生产级 React 应用

---

## 📖 自学指南

### 学习路径

```
Ch1 React 基础 → Ch2 Hooks 深入 → Ch3 Ant Design 组件 → Ch4 Ant Design 进阶
                                                              ↓
Ch7 大师之路 ← Ch6 企业级实战 ← Ch5 TailwindCSS 核心
```

**强烈建议按顺序学习**，每个章节都建立在前一章的基础上。

### 每课时学习方法

1. **阅读概念讲解** —— 每个课时开头的 💡 卡片解释核心概念
2. **研究代码示例** —— 深色代码块展示源码，理解每一行
3. **动手交互** —— 点击按钮、输入文字、切换开关，观察运行结果
4. **修改实验** —— 打开对应源码文件，修改参数看效果变化
5. **总结要点** —— 每课时末尾的 🎯 卡片是核心要点，确保理解

### 建议学习节奏

| 阶段 | 章节 | 建议时长 | 每日课时 |
|------|------|----------|----------|
| 第 1 周 | Ch1 + Ch2 | 5-7 天 | 1-2 课时/天 |
| 第 2 周 | Ch3 + Ch4 | 7-10 天 | 2 课时/天 |
| 第 3 周 | Ch5 | 5-7 天 | 1-2 课时/天 |
| 第 4 周 | Ch6 + Ch7 | 5-7 天 | 1 课时/天 |

### 实践建议

- **不要只看不练** —— 每学完一个课时，尝试在项目外独立实现相同功能
- **修改源码实验** —— 找到 `src/pages/` 下对应的文件，修改代码看效果
- **构建个人项目** —— 学完 Ch6 后，开始构建自己的项目
- **遇到问题先思考** —— React 官方文档 和 Ant Design 官方文档是最好的参考

### 源码结构

```
src/
├── components/
│   └── Layout.tsx              # 侧边栏导航布局
├── pages/
│   ├── Home.tsx                # 课程大纲首页
│   ├── chapter1/               # React 核心基础（8 课时）
│   ├── chapter2/               # React Hooks 深入（9 课时）
│   ├── chapter3/               # Ant Design 组件（12 课时）
│   ├── chapter4/               # Ant Design 进阶（15 课时）
│   ├── chapter5/               # TailwindCSS 核心（10 课时）
│   ├── chapter6/               # 三者融合实战（2 课时）
│   └── chapter7/               # 大师之路（4 课时）
├── App.tsx                     # 路由配置（React.lazy 代码分割）
├── main.tsx                    # 入口文件
└── index.css                   # TailwindCSS 入口 + 全局样式
```

---

## 🔗 官方文档

学习过程中，以下官方文档是你最好的朋友：

- **React**: https://react.dev/
- **Ant Design**: https://ant.design/
- **TailwindCSS**: https://tailwindcss.com/
- **Vite**: https://vite.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| Ant Design | 6 | 企业级 UI 组件库 |
| TailwindCSS | 4 | 原子化 CSS 框架 |
| TypeScript | 5.9 | 类型安全 |
| Vite | 8 | 构建工具 |
| React Router | 7 | 路由管理 |

---

## 📜 常用命令

```bash
pnpm dev       # 启动开发服务器
pnpm build     # 构建生产包
pnpm preview   # 预览生产包
pnpm lint      # 代码检查
```
