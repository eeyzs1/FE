# 🎓 Vue 3 交互式教程

一套完整覆盖 Vue 官方指南的交互式学习教程，每个知识点都是一个可操作的页面，边学边练。

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

启动后访问 http://localhost:5173/ ，左侧导航栏切换课程。

## 📚 课程目录

### 基础篇

| 课程 | 路由 | 核心知识点 | 对应官方章节 |
|------|------|-----------|------------|
| 第1课 | `/lesson1` | `ref()` / `reactive()` / `{{ }}` / `v-model` / `@click` | 响应式基础 |
| 第2课 | `/lesson2` | `computed()` / `watch()` / 可写 computed / 多源监听 | 计算属性 / 侦听器 |
| 第3课 | `/lesson3` | `defineProps` / `defineEmits` / 默认/具名/作用域插槽 | Props / 事件 / 插槽 |
| 第4课 | `/lesson4` | `v-if` / `v-show` / `v-for` + `:key` | 条件渲染 / 列表渲染 |
| 第5课 | `/lesson5` | `v-model` 全形态 / 修饰符 `.lazy` `.number` `.trim` | 表单输入绑定 |
| 第6课 | `/lesson6` | `RouterLink` / `useRouter` / `useRoute` / 动态路由 | 路由 |
| 第7课 | `/lesson7` | `onMounted` / `onUnmounted` / Composables 模式 | 生命周期 / 组合式函数 |

### 进阶篇

| 课程 | 路由 | 核心知识点 | 对应官方章节 |
|------|------|-----------|------------|
| 第8课 | `/lesson8` | `:class` / `:style` / 事件修饰符 `.stop` `.prevent` `.once` | 类与样式绑定 / 事件处理 |
| 第9课 | `/lesson9` | 模板引用 / `provide` / `inject` / `<component :is>` / `<KeepAlive>` | 模板引用 / 依赖注入 / KeepAlive |
| 第10课 | `/lesson10` | `<Teleport>` / `<Transition>` / `<TransitionGroup>` / `<Suspense>` | Transition / Teleport / Suspense |

### 高级篇

| 课程 | 路由 | 核心知识点 | 对应官方章节 |
|------|------|-----------|------------|
| 第11课 | `/lesson11` | 自定义指令 / 透传 Attributes / 组件 v-model | 自定义指令 / 透传 / 组件 v-model |
| 第12课 | `/lesson12` | `defineAsyncComponent` / `nextTick` / `shallowRef` / `v-bind()` in CSS | 异步组件 / 响应式 API 进阶 |
| 第13课 | `/lesson13` | Pinia `defineStore` / `$reset` / `$patch` / 插件 | 状态管理 / 插件 |
| 第14课 | `/lesson14` | Proxy 原理 / track & trigger / `h()` 渲染函数 | 深入响应式 / 渲染函数 |

### 规模化与工程化篇

| 课程 | 路由 | 核心知识点 | 对应官方章节 |
|------|------|-----------|------------|
| 第15课 | `/lesson15` | 模板语法详解 / `v-html` / 动态参数 / 组件基础 / 组件注册 | 模板语法 / 组件基础 / 注册 |
| 第16课 | `/lesson16` | SFC 结构 / `:deep()` / `:slotted()` / CSS Modules / 渲染机制 / 虚拟 DOM | 单文件组件 / 工具链 / 渲染机制 |
| 第17课 | `/lesson17` | `ref<T>` / `reactive<T>` / `defineProps<{}>` / `defineEmits<{}>` / 联合类型 | TypeScript 总览 / TS 与组合式 API |
| 第18课 | `/lesson18` | Vitest / `v-once` / `v-memo` / `vite build` / SPA 部署 | 测试 / 性能优化 / 生产部署 |
| 第19课 | `/lesson19` | SSR vs CSR / Nuxt 3 / 无障碍 / XSS 防护 / 动画技巧 | SSR / 无障碍 / 安全 / 动画技巧 |

### 综合实战

| 课程 | 路由 | 说明 |
|------|------|------|
| TodoApp | `/todo` | 综合运用全部 19 课知识构建完整应用 |

## 🗂️ 项目结构

```
src/
├── composables/                # Composables（组合式函数）
│   ├── useCounter.ts           #   计数器逻辑封装
│   └── useMouse.ts             #   鼠标追踪逻辑封装
├── components/                 # 子组件
│   ├── ChildCard.vue           #   Props + Emit 示例
│   ├── SlotDemo.vue            #   插槽示例
│   ├── TodoItem.vue            #   Todo 子项
│   ├── TabHome.vue             #   动态组件 - 首页
│   ├── TabProfile.vue          #   动态组件 - 个人
│   ├── TabSettings.vue         #   动态组件 - 设置
│   ├── CustomInput.vue         #   组件 v-model
│   ├── CustomVModel.vue        #   命名 v-model
│   ├── AttrChild.vue           #   透传 Attributes
│   └── GlobalButton.vue        #   全局注册组件
├── stores/                     # Pinia 状态管理
│   └── index.ts                #   counter + cart Store
├── views/                      # 各课页面 (19课 + 1实战)
│   ├── Lesson1Reactive.vue     ~ Lesson19SSRSecurity.vue
│   └── TodoApp.vue             #   综合实战
├── router/
│   └── index.ts                # 路由配置
├── App.vue                     # 带侧边导航的布局
├── main.ts                     # 入口（Pinia + Router + 全局组件）
└── style.css                   # 全局样式
```

## 🛠️ 技术栈

- **Vue 3.5** — 组合式 API + `<script setup>`
- **TypeScript** — 类型安全
- **Vite 8** — 极速开发体验 + HMR
- **Vue Router 5** — 单页应用路由
- **Pinia 3** — 状态管理
- **Ant Design Vue** — UI 组件库（已安装，可扩展使用）

## 💡 学习建议

1. **按顺序学习** — 课程由浅入深，每课依赖前课知识
2. **动手操作** — 每课都有交互式演示，点击按钮、输入内容观察变化
3. **阅读源码** — 每个文件顶部有详细中文注释解释核心概念
4. **修改代码** — 利用 Vite HMR，修改代码后浏览器自动更新
5. **完成实战** — TodoApp 综合运用全部知识，是检验学习成果的最佳方式

## 📖 对应 Vue 官方文档完整映射

| 教程课程 | Vue 官方文档对应章节 |
|---------|-------------------|
| 第1课 | [响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals) |
| 第2课 | [计算属性](https://cn.vuejs.org/guide/essentials/computed) / [侦听器](https://cn.vuejs.org/guide/essentials/watchers) |
| 第3课 | [Props](https://cn.vuejs.org/guide/components/props) / [组件事件](https://cn.vuejs.org/guide/components/events) / [插槽](https://cn.vuejs.org/guide/components/slots) |
| 第4课 | [条件渲染](https://cn.vuejs.org/guide/essentials/conditional) / [列表渲染](https://cn.vuejs.org/guide/essentials/list) |
| 第5课 | [表单输入绑定](https://cn.vuejs.org/guide/essentials/forms) |
| 第6课 | [路由](https://cn.vuejs.org/guide/scaling-up/routing) |
| 第7课 | [生命周期钩子](https://cn.vuejs.org/guide/essentials/lifecycle) / [组合式函数](https://cn.vuejs.org/guide/reusability/composables) |
| 第8课 | [Class 与 Style 绑定](https://cn.vuejs.org/guide/essentials/class-and-style) / [事件处理](https://cn.vuejs.org/guide/essentials/event-handling) |
| 第9课 | [模板引用](https://cn.vuejs.org/guide/essentials/template-refs) / [依赖注入](https://cn.vuejs.org/guide/components/provide-inject) / [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive) |
| 第10课 | [Transition](https://cn.vuejs.org/guide/built-ins/transition) / [TransitionGroup](https://cn.vuejs.org/guide/built-ins/transition-group) / [Teleport](https://cn.vuejs.org/guide/built-ins/teleport) / [Suspense](https://cn.vuejs.org/guide/built-ins/suspense) |
| 第11课 | [自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives) / [透传 Attributes](https://cn.vuejs.org/guide/components/attrs) / [组件 v-model](https://cn.vuejs.org/guide/components/v-model) |
| 第12课 | [异步组件](https://cn.vuejs.org/guide/components/async) / [响应式 API 进阶](https://cn.vuejs.org/api/reactivity-advanced) |
| 第13课 | [状态管理](https://cn.vuejs.org/guide/scaling-up/state-management) / [插件](https://cn.vuejs.org/guide/reusability/plugins) |
| 第14课 | [深入响应式系统](https://cn.vuejs.org/guide/extras/reactivity-in-depth) / [渲染函数 & JSX](https://cn.vuejs.org/guide/extras/render-function) |
| 第15课 | [模板语法](https://cn.vuejs.org/guide/essentials/template-syntax) / [组件基础](https://cn.vuejs.org/guide/essentials/component-basics) / [组件注册](https://cn.vuejs.org/guide/components/registration) |
| 第16课 | [单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc) / [工具链](https://cn.vuejs.org/guide/scaling-up/tooling) / [渲染机制](https://cn.vuejs.org/guide/extras/rendering-mechanism) |
| 第17课 | [TypeScript 总览](https://cn.vuejs.org/guide/typescript/overview) / [TS 与组合式 API](https://cn.vuejs.org/guide/typescript/composition-api) |
| 第18课 | [测试](https://cn.vuejs.org/guide/scaling-up/testing) / [性能优化](https://cn.vuejs.org/guide/best-practices/performance) / [生产部署](https://cn.vuejs.org/guide/best-practices/production-deployment) |
| 第19课 | [SSR](https://cn.vuejs.org/guide/scaling-up/ssr) / [无障碍](https://cn.vuejs.org/guide/best-practices/accessibility) / [安全](https://cn.vuejs.org/guide/best-practices/security) / [动画技巧](https://cn.vuejs.org/guide/extras/animation) |
