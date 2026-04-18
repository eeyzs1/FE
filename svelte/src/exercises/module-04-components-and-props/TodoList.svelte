<script lang="ts">
  import TodoInput from './TodoInput.svelte'
  import TodoItem from './TodoItem.svelte'
  import Card from './Card.svelte'
  import type { Snippet } from 'svelte'

  type Todo = {
    id: number
    text: string
    done: boolean
  }

  let todos: Todo[] = $state([])
  let filter: 'all' | 'active' | 'completed' = $state('all')

  function addTodo(text: string) {
    todos = [...todos, { id: Date.now(), text, done: false }]
  }

  function toggleTodo(id: number) {
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
  }

  function removeTodo(id: number) {
    todos = todos.filter(t => t.id !== id)
  }

  let filteredTodos = $derived.by(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.done)
      case 'completed': return todos.filter(t => t.done)
      default: return todos
    }
  })

  let remaining = $derived(todos.filter(t => !t.done).length)
</script>

<div class="todo-app">
  <Card title="组件化待办事项">
    {#snippet header()}
      <h3>📋 组件化待办事项 — Snippet 演示</h3>
    {/snippet}

    <TodoInput onadd={addTodo} />

    <div class="filters">
      <button class:active={filter === 'all'} onclick={() => filter = 'all'}>全部</button>
      <button class:active={filter === 'active'} onclick={() => filter = 'active'}>进行中</button>
      <button class:active={filter === 'completed'} onclick={() => filter = 'completed'}>已完成</button>
    </div>

    <div class="list">
      {#each filteredTodos as todo (todo.id)}
        <TodoItem
          {todo}
          ontoggle={() => toggleTodo(todo.id)}
          onremove={() => removeTodo(todo.id)}
        >
          {#snippet actions()}
            <button class="custom-action" onclick={() => toggleTodo(todo.id)}>
              {todo.done ? '↩️' : '✅'}
            </button>
          {/snippet}
        </TodoItem>
      {/each}
    </div>

    <p class="count">{remaining} 项待完成</p>

    {#snippet footer()}
      共 {todos.length} 项任务，{remaining} 项待完成
    {/snippet}
  </Card>
</div>

<style>
  .todo-app {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
  }

  .filters {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
  }

  .filters button {
    padding: 4px 10px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .filters button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .list {
    margin: 8px 0;
  }

  .count { color: #95a5a6; font-size: 14px; margin-top: 8px; }

  .custom-action {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    padding: 0 4px;
  }
</style>
