<script lang="ts">
  import type { Component } from 'svelte'
  import CounterExplore from './exercises/module-01-svelte-philosophy/CounterExplore.svelte'
  import TodoListBasic from './exercises/module-02-template-syntax/TodoList.svelte'
  import RegistrationForm from './exercises/module-03-events-and-binding/RegistrationForm.svelte'
  import TodoListComponents from './exercises/module-04-components-and-props/TodoList.svelte'
  import ShoppingCart from './exercises/module-05-rune-system/ShoppingCart.svelte'
  import StoreCartDemo from './exercises/module-06-store-and-context/StoreCartDemo.svelte'
  import LiveSearch from './exercises/module-07-lifecycle-and-effects/LiveSearch.svelte'
  import TransitionDemo from './exercises/module-08-transitions-and-animations/TransitionDemo.svelte'
  import ActionsDemo from './exercises/module-09-actions/ActionsDemo.svelte'
  import AdvancedDemo from './exercises/module-10-advanced-components/AdvancedDemo.svelte'
  import TypeScriptDemo from './exercises/module-11-typescript-deep/TypeScriptDemo.svelte'
  import ReactiveBuiltinsDemo from './exercises/module-12-reactive-builtins/ReactiveBuiltinsDemo.svelte'
  import TemplateDeepDemo from './exercises/module-13-template-deep/TemplateDeepDemo.svelte'
  import DebugToolsDemo from './exercises/module-14-debug-tools/DebugToolsDemo.svelte'
  import BindableDeepDemo from './exercises/module-15-bindable-deep/BindableDeepDemo.svelte'
  import SvelteKitBasicsDemo from './exercises/module-16-sveltekit-basics/SvelteKitBasicsDemo.svelte'
  import SvelteKitDataDemo from './exercises/module-17-sveltekit-data/SvelteKitDataDemo.svelte'

  type Module = {
    id: string
    title: string
    stage: string
    component: Component
  }

  const modules: Module[] = [
    { id: '01', title: '初识 Svelte — 编译型框架的哲学', stage: '基础', component: CounterExplore },
    { id: '02', title: '模板语法 — 声明式 UI 的艺术', stage: '基础', component: TodoListBasic },
    { id: '03', title: '事件处理与双向绑定', stage: '基础', component: RegistrationForm },
    { id: '04', title: '组件化思维 — Props 与组合', stage: '基础', component: TodoListComponents },
    { id: '05', title: 'Rune 系统精通 ⭐', stage: '进阶', component: ShoppingCart },
    { id: '06', title: 'Store 与全局状态管理', stage: '进阶', component: StoreCartDemo },
    { id: '07', title: '生命周期与副作用模式', stage: '进阶', component: LiveSearch },
    { id: '08', title: '过渡与动画', stage: '高级', component: TransitionDemo },
    { id: '09', title: 'Actions — 指令式 DOM 增强', stage: '高级', component: ActionsDemo },
    { id: '10', title: '高级组件模式', stage: '高级', component: AdvancedDemo },
    { id: '11', title: 'TypeScript 深度集成', stage: '高级', component: TypeScriptDemo },
    { id: '12', title: '响应式内置类型', stage: '高级', component: ReactiveBuiltinsDemo },
    { id: '13', title: '模板语法深度', stage: '高级', component: TemplateDeepDemo },
    { id: '14', title: '调试与开发工具', stage: '高级', component: DebugToolsDemo },
    { id: '15', title: '双向绑定深度', stage: '高级', component: BindableDeepDemo },
    { id: '16', title: 'SvelteKit 基础', stage: '大师', component: SvelteKitBasicsDemo },
    { id: '17', title: 'SvelteKit 数据层', stage: '大师', component: SvelteKitDataDemo },
  ]

  let activeModuleId = $state('01')

  let activeModule = $derived(modules.find(m => m.id === activeModuleId) ?? modules[0])

  let CurrentExercise = $derived(activeModule.component)

  const stageColors: Record<string, string> = {
    '基础': '#27ae60',
    '进阶': '#f39c12',
    '高级': '#e74c3c',
    '大师': '#8e44ad',
  }
</script>

<div class="app">
  <header class="header">
    <h1>🧙 Svelte 大师之路</h1>
    <p class="subtitle">从零基础到 Svelte 大师的系统化学习路径</p>
  </header>

  <div class="layout">
    <nav class="sidebar">
      {#each modules as module (module.id)}
        <button
          class="nav-item"
          class:active={activeModuleId === module.id}
          onclick={() => activeModuleId = module.id}
        >
          <span class="module-id">M{module.id}</span>
          <span class="module-title">{module.title}</span>
          <span class="stage-badge" style="background: {stageColors[module.stage] ?? '#95a5a6'}">{module.stage}</span>
        </button>
      {/each}
    </nav>

    <main class="content">
      <div class="module-header">
        <span class="module-tag">模块 {activeModule.id}</span>
        <h2>{activeModule.title}</h2>
        <span class="stage-tag" style="background: {stageColors[activeModule.stage] ?? '#95a5a6'}">{activeModule.stage}</span>
      </div>
      <div class="exercise-area">
        <CurrentExercise />
      </div>
    </main>
  </div>
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--bg, #fff);
    color: var(--text, #6b6375);
  }

  .header {
    text-align: center;
    padding: 20px;
    border-bottom: 2px solid var(--border, #e5e4e7);
  }

  .header h1 {
    font-size: 28px;
    margin: 0;
    color: var(--text-h, #08060d);
  }

  .subtitle {
    margin: 4px 0 0;
    font-size: 14px;
    color: #95a5a6;
  }

  .layout {
    display: flex;
    min-height: calc(100vh - 80px);
  }

  .sidebar {
    width: 280px;
    border-right: 2px solid var(--border, #e5e4e7);
    padding: 8px;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    text-align: left;
    background: none;
    font-size: 13px;
    color: var(--text, #6b6375);
    transition: all 0.15s;
  }

  .nav-item:hover {
    background: var(--accent-bg, rgba(170, 59, 255, 0.05));
    border-color: var(--border, #e5e4e7);
  }

  .nav-item.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
    color: var(--text-h, #08060d);
    font-weight: 500;
  }

  .module-id {
    font-family: var(--mono, monospace);
    font-size: 11px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    padding: 2px 6px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .module-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stage-badge {
    font-size: 10px;
    color: white;
    padding: 1px 6px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .module-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .module-header h2 {
    margin: 0;
    font-size: 20px;
    flex: 1;
  }

  .module-tag {
    font-family: var(--mono, monospace);
    font-size: 12px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    padding: 2px 8px;
    border-radius: 4px;
    color: var(--accent, #aa3bff);
  }

  .stage-tag {
    font-size: 11px;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .exercise-area {
    max-width: 800px;
  }

  @media (max-width: 768px) {
    .layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      border-right: none;
      border-bottom: 2px solid var(--border, #e5e4e7);
      display: flex;
      overflow-x: auto;
      padding: 4px;
      gap: 4px;
    }

    .nav-item {
      width: auto;
      flex-shrink: 0;
    }

    .module-title {
      display: none;
    }

    .stage-badge {
      display: none;
    }
  }
</style>
