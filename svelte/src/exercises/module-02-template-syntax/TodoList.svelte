<script lang="ts">
  type Todo = {
    id: number
    text: string
    done: boolean
  }

  let todos: Todo[] = $state([
    { id: 1, text: '学习 Svelte 模板语法', done: false },
    { id: 2, text: '完成条件渲染练习', done: true },
    { id: 3, text: '完成列表渲染练习', done: false },
  ])

  let newText: string = $state('')
  let nextId: number = $state(4)
  let filter: 'all' | 'active' | 'completed' = $state('all')

  let filteredTodos = $derived.by(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.done)
      case 'completed': return todos.filter(t => t.done)
      default: return todos
    }
  })

  let remaining = $derived(todos.filter(t => !t.done).length)

  function addTodo() {
    if (!newText.trim()) return
    todos = [...todos, { id: nextId++, text: newText.trim(), done: false }]
    newText = ''
  }

  function removeTodo(id: number) {
    todos = todos.filter(t => t.id !== id)
  }
</script>

<div class="todo-app">
  <h2>待办事项</h2>

  <form onsubmit={(e) => { e.preventDefault(); addTodo() }}>
    <input
      type="text"
      bind:value={newText}
      placeholder="添加新任务..."
    />
    <button type="submit">添加</button>
  </form>

  <div class="filters">
    <button class:active={filter === 'all'} onclick={() => filter = 'all'}>全部</button>
    <button class:active={filter === 'active'} onclick={() => filter = 'active'}>进行中</button>
    <button class:active={filter === 'completed'} onclick={() => filter = 'completed'}>已完成</button>
  </div>

  <ul>
    {#each filteredTodos as todo (todo.id)}
      <li class:done={todo.done}>
        <input type="checkbox" bind:checked={todo.done} />
        <span>{todo.text}</span>
        <button class="delete" onclick={() => removeTodo(todo.id)}>x</button>
      </li>
    {/each}
  </ul>

  <p class="status">{remaining} 项待完成</p>

  {#if todos.length === 0}
    <p class="empty">暂无任务，添加一个吧！</p>
  {/if}
</div>

<style>
  .todo-app {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  form {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  input[type="text"] {
    flex: 1;
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid var(--border, #e5e4e7);
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

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  li.done span {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .delete {
    margin-left: auto;
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    font-size: 16px;
    padding: 0 4px;
  }

  .status { color: #95a5a6; font-size: 14px; margin-top: 8px; }
  .empty { color: #95a5a6; font-style: italic; }
</style>
