# Vue 3 教学项目审查报告

审查日期：2026-04-15（第六次）

审查方法：基于 vue-best-practices skill + vue skill 的核心参考文档（reactivity、sfc、component-data-flow、composables、script-setup-macros、core-new-apis）进行系统性审查

---

## 〇、上次 Review 处理情况

### 第五次优化处理状态

| 编号 | 问题 | 状态 | 说明 |
|------|------|------|------|
| 优化1 | provide/inject 应使用 Symbol + InjectionKey | ✅ 已修复 | 已创建 `injectionKeys.ts`，使用 Symbol + InjectionKey |
| 优化2 | App.vue 模板中重复 find() 调用 | ✅ 已修复 | 已提取 `currentLesson`、`prevLesson`、`nextLesson` 为 computed |
| 优化3 | 提取 useEventListener composable | ✅ 已修复 | 已创建 `useEventListener.ts`，useMouse/useOnline 复用 |
| 优化4 | useFetch 缺少 AbortController 请求取消 | ✅ 已修复 | watch 回调中使用 AbortController + onCleanup |
| 优化5 | useCounter 返回可变 ref | ✅ 已修复 | 返回 `readonly(count)` |
| 优化6 | composables 中原始值应使用 shallowRef | ✅ 已修复 | useCounter/useMouse/useOnline 原始值改用 shallowRef |
| 优化7 | Lesson1 模板中 count 直接赋值 | ✅ 已修复 | 改为 `@click="resetCount"` 方法调用 |
| 优化8 | Lesson10 非 scoped style 缺少注释说明 | ✅ 已修复 | 已添加注释说明 |

---

## 一、Bug 和错误

### Bug1: useFetch 中 data 的类型断言不安全（严重）

- **文件**: `src/composables/useFetch.ts` 第4行
- **问题**: `const data = ref<T | null>(null) as { value: T | null }` 将 `Ref<T | null>` 强制转为 `{ value: T | null }`，丢失了 `Ref` 的类型信息。返回的 `data` 不再被 TypeScript 识别为 `Ref`，调用方无法正确使用 `.value`
- **修复**: 移除 `as` 断言，直接返回 `Ref<T | null>`

### Bug2: useEventListener 只能在 setup 中使用（严重）

- **文件**: `src/composables/useEventListener.ts`
- **问题**: `onMounted`/`onUnmounted` 必须在 setup 同步上下文中调用。如果 composable 在异步回调或非 setup 上下文中被调用，会报错。且如果在 `onMounted` 之后才调用，事件监听不会注册
- **修复**: 添加 `getCurrentScope()` 检查，非活跃作用域时直接注册事件并返回清理函数

### Bug3: DefineModelDemo 中 modifiers 的不安全 as any 访问（严重）

- **文件**: `src/components/DefineModelDemo.vue` 第12行
- **问题**: `(formattedText as any).modifiers?.capitalize` 使用 `as any` 绕过类型检查，失去 TypeScript 类型安全保障
- **修复**: 使用 defineModel 的 `set` 选项处理修饰符逻辑，避免 `as any`

---

## 二、优化建议（基于 Vue Best Practices）

### 优化1: 自定义指令中使用 any 类型（中等）

- **文件**: `src/views/Lesson11Directive.vue`
- **问题**: `vColor`、`vPermission`、`vDebounce` 指令的 `binding` 参数都用了 `any`，缺少类型约束
- **修复**: 使用 `DirectiveBinding<T>` 泛型替代 `any`

### 优化2: useOnline SSR 兼容性（中等）

- **文件**: `src/composables/useOnline.ts` 第5行
- **问题**: `navigator.onLine` 在 SSR 环境下不存在，会抛出 ReferenceError
- **修复**: 添加 `typeof navigator !== 'undefined'` 保护

### 优化3: Lesson7Lifecycle updateCount 非响应式（中等）

- **文件**: `src/views/Lesson7Lifecycle.vue` 第29行
- **问题**: `let updateCount = 0` 是普通变量，模板中显示的值不会自动更新。虽然注释说明了"非响应式"，但作为教程项目可能误导初学者
- **修复**: 改为 `ref` 使其响应式，同时保留注释说明 onUpdated 的触发

### 优化4: 测试覆盖不足（中等）

- **文件**: `src/composables/__tests__/`
- **问题**: 仅有 `useCounter` 一个 composable 有测试，核心的 `useFetch` 缺少测试
- **修复**: 为 `useFetch` 添加测试

### 优化5: TodoItem priorityMap 未与 Todo 类型关联（轻微）

- **文件**: `src/components/TodoItem.vue` 第13-17行
- **问题**: `priorityMap` 没有与 `Todo.priority` 的类型关联，如果 `Todo.priority` 增加新选项，`priorityMap` 不会报错
- **修复**: 使用 `satisfies Record<Todo['priority'], ...>` 确保类型一致

---

## 三、审查评分

| 类别 | 评分 | 说明 |
|------|------|------|
| 架构与规范 | ⭐⭐⭐⭐⭐ | 全部使用 Composition API + `<script setup lang="ts">`，非常规范 |
| 响应式系统 | ⭐⭐⭐⭐⭐ | 正确使用 ref/shallowRef/reactive/computed/watch，composables 中原始值已用 shallowRef |
| SFC 结构 | ⭐⭐⭐⭐⭐ | 顺序正确（script → template → style），scoped 使用得当 |
| 组件数据流 | ⭐⭐⭐⭐⭐ | props/emits 正确，provide/inject 已使用 Symbol + InjectionKey |
| Composables | ⭐⭐⭐⭐ | 结构良好，useEventListener 已提取，useFetch 有 AbortController；类型断言和作用域保护需修复 |
| 性能优化 | ⭐⭐⭐⭐⭐ | 路由懒加载、shallowRef、KeepAlive、markRaw 都有使用 |
| 类型安全 | ⭐⭐⭐⭐ | defineProps/defineEmits 泛型标注，InjectionKey 类型安全；useFetch 类型断言和指令 any 需修复 |
| 模板安全 | ⭐⭐⭐⭐⭐ | v-html 仅用于硬编码安全值，有风险提示 |

---

## 四、课程顺序建议（暂不调整，记录备查）

当前第15课（模板语法）和第16课（SFC基础）应放在最前面，但调整顺序涉及大量文件重命名和路由修改，建议作为后续优化单独处理。

建议顺序：
1. SFC基础+模板语法 → 2. 响应式基础 → 3. computed/watch → 4. 条件/列表渲染 → 5. Class/Style+事件 → 6. 表单v-model → 7. 组件通信 → 8. 组件注册+透传 → 9. Router → 10. 生命周期+Composables → 11. 模板引用+provide/inject+动态组件 → 12. 内置组件 → 13. 自定义指令+组件v-model → 14. Pinia → 15. 异步组件+shallowRef → 16. 深入响应式+渲染函数 → 17. SFC深入+渲染机制 → 18. TypeScript → 19. 测试+部署 → 20. SSR+安全

---

## 五、总体评价

### 优点

1. **全部使用 Composition API + `<script setup lang="ts">`** — 完全遵循 Vue 3 推荐风格
2. **课程体系完整** — 19课 + 1实战，从基础到进阶覆盖了 Vue 3 核心知识点
3. **Pinia 使用 Setup Store 风格 + storeToRefs** — 遵循官方推荐
4. **路由懒加载 + 代码分割** — 所有路由组件动态导入
5. **TypeScript 类型标注规范** — defineProps/defineEmits 使用泛型方式
6. **Composable 示例丰富** — useCounter、useMouse、useFetch、useOnline 覆盖常见模式
7. **Vue 新特性覆盖全面** — useTemplateRef、useId、defineOptions、defineModel 均有演示
8. **SFC 结构规范** — 所有组件遵循 script → template → style 顺序
9. **测试基础设施完善** — vitest + @vue/test-utils，有可运行的测试示例
10. **上次 review 问题处理率极高** — 8项优化全部完成

### 待改进

1. **useFetch 类型断言** — `as { value: T | null }` 丢失 Ref 类型信息
2. **useEventListener 作用域保护** — 非 setup 上下文调用会报错
3. **DefineModelDemo as any** — modifiers 访问绕过类型检查
4. **自定义指令 any 类型** — 应使用 DirectiveBinding 泛型
5. **useOnline SSR 兼容** — navigator 在 SSR 环境不存在
6. **测试覆盖** — 核心composable（useFetch）缺少测试
