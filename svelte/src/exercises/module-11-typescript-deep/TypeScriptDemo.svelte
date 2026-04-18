<script lang="ts">
  import GenericList from './GenericList.svelte'

  type User = { id: number; name: string; email: string }
  type Product = { id: number; name: string; price: number }

  const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'Diana', email: 'diana@example.com' },
  ]

  const products: Product[] = [
    { id: 1, name: 'Svelte 贴纸', price: 9.9 },
    { id: 2, name: 'SvelteKit T恤', price: 99 },
    { id: 3, name: 'Rune 徽章', price: 19.9 },
    { id: 4, name: 'Compiler 马克杯', price: 49 },
  ]

  let selectedUser: User | null = $state(null)
  let selectedProduct: Product | null = $state(null)
</script>

<div class="ts-demo">
  <h2>TypeScript 深度集成</h2>

  <div class="section">
    <h3>泛型组件 — GenericList&lt;T&gt;</h3>
    <p class="hint">同一个 GenericList 组件，复用于不同类型的数据</p>

    <div class="two-col">
      <div class="col">
        <h4>用户列表</h4>
        <GenericList items={users} onSelect={(u) => selectedUser = u} />
        {#if selectedUser}
          <div class="selection">
            选中: {selectedUser.name} ({selectedUser.email})
          </div>
        {/if}
      </div>
      <div class="col">
        <h4>商品列表</h4>
        <GenericList items={products} onSelect={(p) => selectedProduct = p} />
        {#if selectedProduct}
          <div class="selection">
            选中: {selectedProduct.name} (¥{selectedProduct.price})
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="section">
    <h3>类型信息</h3>
    <div class="type-info">
      <p><code>selectedUser</code> → {selectedUser ? `User: ${selectedUser.name}` : 'null'}</p>
      <p><code>selectedProduct</code> → {selectedProduct ? `Product: ${selectedProduct.name}` : 'null'}</p>
    </div>
  </div>
</div>

<style>
  .ts-demo {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .section {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .hint {
    color: #95a5a6;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .two-col {
    display: flex;
    gap: 16px;
  }

  .col {
    flex: 1;
  }

  .col h4 {
    font-size: 14px;
    margin: 0 0 8px;
  }

  .selection {
    margin-top: 8px;
    padding: 6px 10px;
    background: var(--accent-bg, rgba(170, 59, 255, 0.1));
    border-radius: 4px;
    font-size: 13px;
  }

  .type-info {
    padding: 12px;
    background: var(--code-bg, #f4f3ec);
    border-radius: 6px;
  }

  .type-info p {
    margin: 4px 0;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    .two-col {
      flex-direction: column;
    }
  }
</style>
