<script lang="ts">
  import SharedCounter from './SharedCounter.svelte'

  type Product = { id: number; name: string; price: number }
  type CartItem = Product & { quantity: number }

  class Todo {
    done = $state(false)
    text: string

    constructor(text: string) {
      this.text = $state(text)
    }

    toggle = () => {
      this.done = !this.done
    }
  }

  let products: Product[] = $state([
    { id: 1, name: 'Svelte 贴纸', price: 9.9 },
    { id: 2, name: 'SvelteKit T恤', price: 99 },
    { id: 3, name: 'Rune 徽章', price: 19.9 },
    { id: 4, name: 'Compiler 马克杯', price: 49 },
  ])

  let cart: CartItem[] = $state([])
  let discount = $state(0)

  let frozenConfig = $state.raw({ theme: 'dark', lang: 'zh' })

  let subtotal = $derived(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))
  let discountAmount = $derived(subtotal * discount / 100)
  let total = $derived(subtotal - discountAmount)
  let itemCount = $derived(cart.reduce((sum, item) => sum + item.quantity, 0))

  let cartSnapshot = $state('')

  function takeSnapshot() {
    cartSnapshot = JSON.stringify($state.snapshot(cart), null, 2)
  }

  function addToCart(product: Product) {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart = [...cart, { ...product, quantity: 1 }]
    }
  }

  function removeFromCart(id: number) {
    cart = cart.filter(item => item.id !== id)
  }

  function updateQuantity(id: number, delta: number) {
    const item = cart.find(item => item.id === id)
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta)
    }
  }

  function clearCart() {
    cart = []
    discount = 0
  }

  let activeTab: 'cart' | 'deep' | 'class' | 'module' = $state('cart')

  let todoItems = $state([
    new Todo('学习 $state'),
    new Todo('学习 $derived'),
    new Todo('学习 $effect'),
  ])

  let newTodoText = $state('')

  function addTodo() {
    if (!newTodoText.trim()) return
    todoItems = [...todoItems, new Todo(newTodoText.trim())]
    newTodoText = ''
  }
</script>

<div class="rune-deep">
  <h2>Rune 系统深度</h2>

  <div class="tabs">
    <button class:active={activeTab === 'cart'} onclick={() => activeTab = 'cart'}>购物车</button>
    <button class:active={activeTab === 'deep'} onclick={() => activeTab = 'deep'}>$state 深度</button>
    <button class:active={activeTab === 'class'} onclick={() => activeTab = 'class'}>Class + $state</button>
    <button class:active={activeTab === 'module'} onclick={() => activeTab = 'module'}>跨模块状态</button>
  </div>

  {#if activeTab === 'cart'}
    <div class="tab-content">
      <div class="products">
        <h3>商品列表</h3>
        {#each products as product (product.id)}
          <div class="product">
            <span>{product.name}</span>
            <span class="price">¥{product.price.toFixed(2)}</span>
            <button onclick={() => addToCart(product)}>加入</button>
          </div>
        {/each}
      </div>
      <div class="cart">
        <h3>购物车 {#if itemCount > 0}({itemCount}){/if}</h3>
        {#if cart.length === 0}
          <p class="empty">购物车为空</p>
        {:else}
          {#each cart as item (item.id)}
            <div class="cart-item">
              <span>{item.name}</span>
              <div class="qty">
                <button onclick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onclick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <span class="price">¥{(item.price * item.quantity).toFixed(2)}</span>
              <button class="remove" onclick={() => removeFromCart(item.id)}>x</button>
            </div>
          {/each}
          <div class="discount">
            <span>折扣:</span>
            <button class:active={discount === 0} onclick={() => discount = 0}>无</button>
            <button class:active={discount === 10} onclick={() => discount = 10}>9折</button>
            <button class:active={discount === 20} onclick={() => discount = 20}>8折</button>
          </div>
          <div class="summary">
            <div>小计: ¥{subtotal.toFixed(2)}</div>
            {#if discount > 0}
              <div>折扣: -¥{discountAmount.toFixed(2)}</div>
            {/if}
            <div class="total">总计: ¥{total.toFixed(2)}</div>
          </div>
          <button class="clear" onclick={clearCart}>清空</button>
        {/if}
      </div>
    </div>

  {:else if activeTab === 'deep'}
    <div class="tab-content">
      <h3>$state.raw — 不可变状态</h3>
      <p class="hint">当不需要深度响应式时，用 $state.raw 避免代理开销。只能整体替换，不能修改属性。</p>
      <div class="raw-demo">
        <p>主题: {frozenConfig.theme} | 语言: {frozenConfig.lang}</p>
        <button onclick={() => frozenConfig = { ...frozenConfig, theme: frozenConfig.theme === 'dark' ? 'light' : 'dark' }}>
          切换主题（整体替换）
        </button>
      </div>

      <h3>$state.snapshot — 快照</h3>
      <p class="hint">将深度响应式代理转为普通对象，用于传给第三方库或 structuredClone</p>
      <button onclick={takeSnapshot}>拍摄购物车快照</button>
      {#if cartSnapshot}
        <pre class="snapshot">{cartSnapshot}</pre>
      {/if}

      <h3>$derived 覆写 — 乐观 UI</h3>
      <p class="hint">$derived 值可以临时覆写，用于乐观更新场景</p>
      <div class="override-demo">
        <p>商品数: {itemCount}</p>
        <p class="hint">itemCount 是 $derived，正常只读。Svelte 5.25+ 允许临时覆写实现乐观 UI。</p>
      </div>
    </div>

  {:else if activeTab === 'class'}
    <div class="tab-content">
      <h3>Class 字段中的 $state</h3>
      <p class="hint">类实例不会被代理，但可以用 $state 声明响应式字段</p>
      <div class="class-demo">
        <TodoClassDemo />
      </div>
    </div>

  {:else if activeTab === 'module'}
    <div class="tab-content">
      <h3>跨模块共享状态</h3>
      <p class="hint">在 .svelte.js/.svelte.ts 文件中使用 $state，通过对象属性（非重新赋值）导出</p>
      <ModuleStateDemo />
    </div>
  {/if}
</div>

{#snippet TodoClassDemo()}
  <div>
    {#each todoItems as todo}
      <div class="todo-item" class:done={todo.done}>
        <input type="checkbox" checked={todo.done} onchange={todo.toggle} />
        <span>{todo.text}</span>
        <span class="status">{todo.done ? '✅' : '⬜'}</span>
      </div>
    {/each}
    <form onsubmit={(e) => { e.preventDefault(); addTodo() }}>
      <input type="text" bind:value={newTodoText} placeholder="新任务..." />
      <button type="submit">添加</button>
    </form>
    <p class="hint">Class 中用 $state 声明的字段会变成 get/set，支持细粒度响应式</p>
  </div>
{/snippet}

{#snippet ModuleStateDemo()}
  <SharedCounter />
{/snippet}

<style>
  .rune-deep {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .tabs button {
    padding: 6px 12px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .tabs button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .tab-content { min-height: 200px; }

  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0 8px; }

  .products, .cart { margin-bottom: 16px; }

  .product, .cart-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .price { margin-left: auto; font-weight: bold; }

  .qty { display: flex; align-items: center; gap: 4px; }

  .qty button, .remove {
    width: 24px; height: 24px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    background: none;
  }

  .remove { color: #e74c3c; }

  .discount { display: flex; gap: 4px; align-items: center; margin: 8px 0; }
  .discount button {
    padding: 2px 8px;
    border: 1px solid var(--border, #e5e4e7);
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
  .discount button.active {
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-color: var(--accent, #aa3bff);
  }

  .summary { margin-top: 8px; padding-top: 8px; border-top: 2px solid var(--border, #e5e4e7); }
  .total { font-size: 18px; font-weight: bold; }

  .empty { color: #95a5a6; font-style: italic; }

  .clear {
    width: 100%; margin-top: 8px; padding: 6px;
    border: 1px solid #e74c3c; border-radius: 4px;
    background: none; color: #e74c3c; cursor: pointer;
  }

  .raw-demo, .override-demo { padding: 8px; background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-radius: 4px; margin-bottom: 12px; }

  .snapshot {
    background: var(--code-bg, #f4f3ec);
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    overflow-x: auto;
    max-height: 200px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  .todo-item.done span { text-decoration: line-through; opacity: 0.5; }

  .status { font-size: 14px; }

  form { display: flex; gap: 8px; margin-top: 8px; }
  form input { flex: 1; padding: 4px 8px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; }
  form button { padding: 4px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; }

  h3 { font-size: 16px; margin: 12px 0 4px; }
</style>
