# ⚡ Qwik 大师修炼教程 — 自学指南

> 从零到大师的 Qwik 完整学习路线，14 课掌握 Qwik 全栈开发

---

## 📖 教程简介

这是一套为 Qwik 初学者设计的完整自学教程，从 Qwik 的核心哲学到全栈实战，循序渐进地帮助你成为 Qwik 大师。

**教程特色：**
- 每课包含：核心概念讲解 → 代码示例 → 动手练习 → 大师洞察
- 基于官方文档深度整理，覆盖 Qwik 所有核心 API
- 所有练习都在本项目中完成，边学边做
- 包含可运行的交互式示例，直观体验 Qwik 特性

---

## 🗂️ 课程结构

### 🔰 阶段一：Qwik 哲学与基础

| 课程 | 文件 | 核心内容 | 建议时间 |
|------|------|---------|---------|
| 第 1 课 | [01-resumability.md](lessons/01-resumability.md) | 可恢复性哲学、`$` 符号、QRL、Optimizer、React 对比 | 2-3 小时 |
| 第 2 课 | [02-components.md](lessons/02-components.md) | component$()、Props、Slot、ref、内联组件、多态组件 | 2-3 小时 |
| 第 3 课 | [03-state-management.md](lessons/03-state-management.md) | useSignal、useStore、useComputed$、useResource$、Context、untrack | 3-4 小时 |

### ⚡ 阶段二：事件与生命周期

| 课程 | 文件 | 核心内容 | 建议时间 |
|------|------|---------|---------|
| 第 4 课 | [04-events.md](lessons/04-events.md) | 事件绑定、$()、sync$()、异步事件模型、自定义事件 Props | 2-3 小时 |
| 第 5 课 | [05-lifecycle-tasks.md](lessons/05-lifecycle-tasks.md) | useTask$、useVisibleTask$、useResource$、track、cleanup、previous | 3-4 小时 |
| 第 6 课 | [06-styling.md](lessons/06-styling.md) | useStylesScoped$、CSS Modules、Tailwind CSS、主题切换、Qwik UI | 2-3 小时 |

### 🏙️ 阶段三：Qwik City 全栈框架

| 课程 | 文件 | 核心内容 | 建议时间 |
|------|------|---------|---------|
| 第 7 课 | [07-routing.md](lessons/07-routing.md) | 目录路由、动态参数、Link、useNavigate、MPA/SPA | 2-3 小时 |
| 第 8 课 | [08-layouts.md](lessons/08-layouts.md) | 嵌套布局、Slot、布局中间件、sharedMap、错误边界、ServerError | 2-3 小时 |
| 第 9 课 | [09-loaders-actions.md](lessons/09-loaders-actions.md) | routeLoader$、routeAction$、Form、Zod、server$、类型安全 | 3-4 小时 |
| 第 10 课 | [10-middleware-endpoints.md](lessons/10-middleware-endpoints.md) | onRequest、RequestEvent API、REST 端点、Cookie、认证 | 3-4 小时 |

### 🎓 阶段四：高级主题与毕业

| 课程 | 文件 | 核心内容 | 建议时间 |
|------|------|---------|---------|
| 第 11 课 | [11-best-practices.md](lessons/11-best-practices.md) | 性能优化、反模式修复、Core Web Vitals、调试技巧 | 2-3 小时 |
| 第 12 课 | [12-graduation-project.md](lessons/12-graduation-project.md) | 毕业项目：博客/电商/项目管理工具 | 1-2 天 |

### 🚀 阶段五：生产就绪

| 课程 | 文件 | 核心内容 | 建议时间 |
|------|------|---------|---------|
| 第 13 课 | [13-deployment.md](lessons/13-deployment.md) | 适配器、环境变量、Docker、SSG、边缘部署 | 2-3 小时 |
| 第 14 课 | [14-testing.md](lessons/14-testing.md) | Vitest 单元测试、Playwright E2E 测试、CI 集成 | 2-3 小时 |

---

## 🚀 如何开始自学

### 前置要求

- Node.js v18.17+
- 基本的 HTML/CSS/JavaScript 知识
- 了解 TypeScript 基础（推荐但非必须）
- 了解 React 基础概念会有帮助（JSX、组件、Props）

### 第一步：启动项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start
```

浏览器打开 `http://localhost:5173`，确认项目正常运行。

### 第二步：按顺序阅读课程

从 `lessons/01-resumability.md` 开始，**严格按顺序学习**，因为后续课程依赖前面的知识。

### 第三步：运行交互式示例

访问 `/demo` 查看可运行的示例代码，配合课程文档学习：

- `/demo/counter` — 计数器 & 状态管理
- `/demo/events` — 事件处理
- `/demo/lifecycle` — 生命周期

### 第四步：完成每课的练习

每课末尾都有"动手实践"部分，在你的项目中实际编写代码。练习是学习的关键——**光看不练等于没学**。

### 第五步：完成毕业项目

学完第 1-11 课后，选择第 12 课中的一个毕业项目，独立完成。这是检验你是否真正掌握 Qwik 的最佳方式。

---

## 📁 项目结构

```
├── lessons/                    # 📚 课程文件（你正在阅读的教程）
│   ├── 01-resumability.md
│   ├── 02-components.md
│   ├── 03-state-management.md
│   ├── 04-events.md
│   ├── 05-lifecycle-tasks.md
│   ├── 06-styling.md
│   ├── 07-routing.md
│   ├── 08-layouts.md
│   ├── 09-loaders-actions.md
│   ├── 10-middleware-endpoints.md
│   ├── 11-best-practices.md
│   ├── 12-graduation-project.md
│   ├── 13-deployment.md
│   └── 14-testing.md
├── public/                     # 静态资源
└── src/
    ├── components/             # 组件目录（练习中创建的组件放这里）
    │   └── router-head/
    │       └── router-head.tsx
    ├── routes/                 # 路由目录
    │   ├── layout.tsx          # 全局布局
    │   ├── index.tsx           # 首页
    │   └── demo/               # 交互式示例
    │       ├── index.tsx
    │       ├── counter/
    │       ├── events/
    │       └── lifecycle/
    ├── entry.dev.tsx
    ├── entry.preview.tsx
    ├── entry.ssr.tsx
    ├── global.css
    └── root.tsx
```

---

## 🛠️ 常用命令

```bash
# 启动开发服务器（SSR 模式）
pnpm start

# 构建生产版本
pnpm build

# 预览生产构建（推荐用于性能测试）
pnpm preview

# 代码格式化
pnpm fmt

# 代码检查
pnpm lint

# 添加集成（如 Tailwind CSS）
pnpm qwik add tailwindcss
```

---

## 📝 学习建议

### 1. 每课学习流程

```
阅读课程文档 → 运行交互式示例 → 理解核心概念 → 完成动手练习 → 检查完成清单
```

### 2. 实践优先

- 不要只看代码，一定要自己敲
- 尝试修改示例代码，观察变化
- 每课的练习是最低要求，鼓励你做更多实验

### 3. 善用 DevTools

- 使用 Chrome DevTools 的 Network 面板观察 JS 加载
- 使用 Elements 面板查看 Qwik 的序列化 HTML
- 使用 Console 观察服务端/客户端的日志输出
- 使用 Lighthouse 测试性能分数

### 4. 遇到问题

- 查阅 [Qwik 官方文档](https://qwik.dev/docs/)
- 搜索 [Qwik GitHub Issues](https://github.com/QwikDev/qwik/issues)
- 加入 [Qwik Discord 社区](https://qwik.dev/chat/)
- 参考第 11 课的"常见错误解读"章节

### 5. 学习节奏

- 建议每天学习 1-2 课
- 阶段一（第1-3课）可以连续学完
- 阶段二（第4-6课）建议每课间隔半天消化
- 阶段三（第7-10课）是全栈核心，建议每课花足够时间练习
- 阶段四（第11-12课）是进阶，毕业项目建议花 1-2 天
- 阶段五（第13-14课）是生产就绪，学完毕业项目后再学

---

## 🎯 学习目标检查

完成全部课程后，你应该能够：

- [ ] 解释 Qwik 可恢复性与水合的本质区别
- [ ] 独立创建 Qwik 组件并正确使用 Props、Slot、ref
- [ ] 使用 useSignal / useStore / useComputed$ / useResource$ 管理状态
- [ ] 使用 untrack() 精确控制响应式依赖
- [ ] 处理各种事件，包括 sync$() 同步事件和自定义事件
- [ ] 使用 useTask$ / useVisibleTask$ 管理生命周期
- [ ] 设计路由和布局结构，包括错误边界
- [ ] 使用 routeLoader$ / routeAction$ / server$ 处理数据
- [ ] 利用 Zod 实现端到端类型安全
- [ ] 创建 REST API 端点和认证中间件
- [ ] 应用最佳实践优化性能，量化 Core Web Vitals
- [ ] 将应用部署到生产环境（Cloudflare/Vercel/Docker）
- [ ] 编写单元测试和 E2E 测试
- [ ] 独立构建完整的全栈 Qwik 应用

---

## 📚 参考资源

- [Qwik 官方文档](https://qwik.dev/docs/)
- [Qwik City 文档](https://qwik.dev/docs/qwikcity/)
- [Qwik GitHub](https://github.com/QwikDev/qwik)
- [Qwik Discord 社区](https://qwik.dev/chat/)
- [@QwikDev Twitter](https://twitter.com/QwikDev)
- [Qwik UI](https://qwik-ui.com/)
- [Qwik Realworld App](https://github.com/QwikDev/qwik-city-realworld-app)

---

**记住：Qwik 的大师不是写得多的人，而是让用户下载得少的人。** ⚡
