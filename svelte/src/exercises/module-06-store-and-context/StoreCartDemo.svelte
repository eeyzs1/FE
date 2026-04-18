<script lang="ts">
  import { provideCart } from './cartStore'

  let cart = provideCart()
  let itemCount = cart.itemCount
  let subtotal = cart.subtotal

  const products = [
    { id: 1, name: 'Svelte 贴纸', price: 9.9 },
    { id: 2, name: 'SvelteKit T恤', price: 99 },
    { id: 3, name: 'Rune 徽章', price: 19.9 },
    { id: 4, name: 'Compiler 马克杯', price: 49 },
  ]
</script>

<div class="store-demo">
  <h2>Store + Context 购物车</h2>

  <div class="products">
    {#each products as product (product.id)}
      <div class="product">
        <span>{product.name} - ¥{product.price}</span>
        <button onclick={() => cart.add(product)}>加入</button>
      </div>
    {/each}
  </div>

  <div class="cart-info">
    <p>购物车: {$itemCount} 件商品</p>
    <p>小计: ¥{$subtotal.toFixed(2)}</p>
    <button onclick={() => cart.clear()}>清空</button>
  </div>
</div>

<style>
  .store-demo {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5));
    border-radius: 8px;
  }

  .product {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid var(--border, #e5e4e7);
  }

  .cart-info {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 2px solid var(--border, #e5e4e7);
  }
</style>
