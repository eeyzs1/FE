# 第 12 课：毕业项目 — 全栈 Qwik 应用

> 🎯 学习目标：综合运用所有知识，独立构建一个完整的全栈 Qwik 应用

---

## 一、项目选择

从以下三个项目中任选一个（或自选）：

### 选项 A：📝 博客系统

**功能需求：**
- 文章列表页（分页）
- 文章详情页（动态路由）
- 文章创建/编辑（Form + routeAction$ + Zod）
- 文章删除（编程式 action.submit()）
- 标签分类（查询参数过滤）
- MDX 支持（可选）
- 评论系统（嵌套资源）
- SEO 优化（DocumentHead）

**技术要点：**
- `routeLoader$` 加载文章列表和详情
- `routeAction$` 处理创建/编辑/删除
- 动态路由 `[slug]`
- 布局嵌套（全局布局 + 博客布局）
- 搜索功能（查询参数）

### 选项 B：🛒 电商网站

**功能需求：**
- 产品列表页（搜索、过滤、排序）
- 产品详情页
- 购物车（Context + useStore）
- 结账流程（多步表单）
- 用户认证（中间件 + Cookie）
- 订单历史
- 响应式设计

**技术要点：**
- `routeLoader$` 加载产品数据
- Context 管理购物车状态
- 认证中间件保护结账路由
- `routeAction$` 处理订单提交
- `useResource$` 实现搜索建议

### 选项 C：📋 项目管理工具

**功能需求：**
- 项目列表
- 看板视图（拖拽）
- 任务 CRUD
- 任务分配
- 状态管理（待办/进行中/完成）
- 实时更新（SSE 流）
- 用户设置

**技术要点：**
- 复杂状态管理（useStore + Context）
- 拖拽交互（同步事件处理）
- SSE 流式更新
- REST API 端点
- 认证和授权

---

## 二、推荐项目结构

以博客系统为例：

```
src/
├── components/
│   ├── header/
│   │   └── header.tsx
│   ├── footer/
│   │   └── footer.tsx
│   ├── post-card/
│   │   └── post-card.tsx
│   ├── search-bar/
│   │   └── search-bar.tsx
│   └── comment/
│       └── comment.tsx
├── routes/
│   ├── layout.tsx              # 全局布局
│   ├── index.tsx               # 首页
│   ├── about/
│   │   └── index.tsx           # 关于页面
│   ├── blog/
│   │   ├── layout.tsx          # 博客布局（侧边栏）
│   │   ├── index.tsx           # 博客列表
│   │   ├── create/
│   │   │   └── index.tsx       # 创建文章
│   │   └── [slug]/
│   │       ├── index.tsx       # 文章详情
│   │       └── edit/
│   │           └── index.tsx   # 编辑文章
│   ├── login/
│   │   └── index.tsx           # 登录页面
│   └── api/
│       └── comments/
│           └── index.ts        # 评论 API
├── utils/
│   ├── db.ts                   # 数据库操作
│   └── auth.ts                 # 认证工具
└── global.css
```

---

## 三、实现步骤

### 步骤 1：搭建基础结构

1. 创建全局布局（Header + Footer）
2. 创建首页
3. 创建基本路由结构
4. 安装 Tailwind CSS（可选）

### 步骤 2：实现数据层

1. 创建模拟数据库（或使用 JSON 文件 / SQLite）
2. 实现 `routeLoader$` 加载列表数据
3. 实现动态路由的数据加载
4. 创建 REST API 端点

### 步骤 3：实现 CRUD 操作

1. 创建表单组件
2. 使用 `routeAction$` + Zod 验证
3. 实现创建功能
4. 实现编辑功能
5. 实现删除功能

### 步骤 4：添加交互功能

1. 搜索和过滤
2. 分页
3. 排序
4. 购物车 / 收藏

### 步骤 5：认证与安全

1. 登录/注册表单
2. 认证中间件
3. Cookie 管理
4. 路由保护

### 步骤 6：优化与完善

1. 应用最佳实践（第 11 课）
2. 添加加载状态
3. 错误处理
4. SEO 优化（DocumentHead）
5. 响应式设计

---

## 四、技术检查清单

完成项目后，确认你使用了以下所有技术：

### 基础
- [ ] `component$()` 创建组件
- [ ] Props 传递数据
- [ ] `<Slot />` 内容投影
- [ ] `ref` 获取 DOM 元素

### 状态管理
- [ ] `useSignal` 管理简单状态
- [ ] `useStore` 管理复杂状态
- [ ] `useComputed$` 计算派生状态
- [ ] `useResource$` 异步数据加载
- [ ] `createContextId` + `useContextProvider` + `useContext` 跨组件状态

### 事件
- [ ] `onClick$` 等事件绑定
- [ ] `$()` 创建可复用事件处理器
- [ ] `preventdefault:click` 声明式处理
- [ ] 自定义事件 Props（`QRL` 类型）

### 生命周期
- [ ] `useTask$` + `track()` 响应式副作用
- [ ] `useVisibleTask$` 浏览器端任务
- [ ] `cleanup()` 清理副作用

### 路由
- [ ] 目录路由
- [ ] 动态路由 `[param]`
- [ ] `<Link>` 导航
- [ ] `useNavigate()` 编程式导航
- [ ] `useLocation()` 路由信息
- [ ] `DocumentHead` 页面元信息

### 布局
- [ ] `layout.tsx` 嵌套布局
- [ ] 布局中间件

### 数据操作
- [ ] `routeLoader$` 数据加载
- [ ] `routeAction$` + `<Form>` 表单操作
- [ ] `zod$()` 表单验证
- [ ] `fail()` 错误处理
- [ ] `server$()` 服务端函数
- [ ] `globalAction$` 全局操作

### 中间件与端点
- [ ] `onRequest` / `onGet` 等中间件
- [ ] `RequestEvent` API
- [ ] `sharedMap` 数据共享
- [ ] Cookie 管理
- [ ] REST API 端点

### 样式
- [ ] 作用域样式 / CSS Modules / Tailwind CSS
- [ ] 主题切换

### 最佳实践
- [ ] 模板内联操作
- [ ] `useComputed$` 替代组件函数中的计算
- [ ] `useOn*` 替代 `useVisibleTask$` 事件注册
- [ ] `useLocation()` 替代 `window.location`

---

## 五、延伸学习

完成毕业项目后，你可以继续探索：

### 官方资源
- [Qwik 官方文档](https://qwik.dev/docs/)
- [Qwik City 文档](https://qwik.dev/docs/qwikcity/)
- [Qwik GitHub](https://github.com/QwikDev/qwik)
- [Qwik Discord 社区](https://qwik.dev/chat/)

### 进阶主题
- **部署**：Cloudflare、Vercel、Netlify、Node.js 适配器
- **SSG**：静态站点生成
- **国际化**：i18n 支持
- **测试**：Vitest + Playwright
- **Partytown**：第三方脚本 off-main-thread 执行
- **Qwik UI**：`@qwik-ui/headless` 组件库
- **集成**：Prisma、Supabase、Firebase 等

### 开源项目参考
- [Qwik Realworld App](https://github.com/QwikDev/qwik-city-realworld-app)
- [Qwik Shop](https://github.com/QwikDev/qwik-shop)

---

## 六、自我评估

完成所有课程后，问自己以下问题：

### 基础理解
- [ ] 我能解释 Qwik 的可恢复性与水合的区别吗？
- [ ] 我能解释 `$` 符号的作用吗？
- [ ] 我能解释 QRL 的工作原理吗？

### 实践能力
- [ ] 我能独立创建 Qwik 组件吗？
- [ ] 我能正确使用 useSignal / useStore / useComputed$ 吗？
- [ ] 我能实现事件处理和自定义事件吗？
- [ ] 我能使用 useTask$ / useVisibleTask$ / useResource$ 吗？

### 全栈能力
- [ ] 我能设计路由和布局结构吗？
- [ ] 我能使用 routeLoader$ / routeAction$ 处理数据吗？
- [ ] 我能创建 REST API 端点吗？
- [ ] 我能实现认证中间件吗？

### 性能优化
- [ ] 我能识别和修复反模式吗？
- [ ] 我能用 Chrome DevTools 分析性能吗？
- [ ] 我能解释 Qwik 的延迟加载策略吗？

---

🎉 **恭喜你完成了 Qwik 大师修炼教程！**

你已经掌握了从基础概念到高级优化的全部知识。现在，用你学到的技能去构建出色的 Web 应用吧！

记住：**Qwik 的大师不是写得多的人，而是让用户下载得少的人。** ⚡
