import { createMemo, For, Show } from "solid-js";
import { createStore } from "solid-js/store";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ShoppingCartSolution() {
  const products: Product[] = [
    { id: 1, name: "苹果", price: 5 },
    { id: 2, name: "香蕉", price: 3 },
    { id: 3, name: "橙子", price: 4 },
    { id: 4, name: "葡萄", price: 8 },
  ];

  const [cart, setCart] = createStore<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart((item) => item.id === product.id, "quantity", (q) => q + 1);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity + delta <= 0) {
      removeFromCart(id);
    } else {
      setCart((i) => i.id === id, "quantity", (q) => q + delta);
    }
  };

  const totalPrice = createMemo(() =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const totalItems = createMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>购物车 — 参考答案</h2>

      <div style={{ display: "flex", gap: "24px" }}>
        <div>
          <h3>商品列表</h3>
          <ul style={{ "list-style": "none", padding: 0 }}>
            <For each={products}>
              {(product) => (
                <li style={{ padding: "4px 0", display: "flex", "align-items": "center", gap: "8px" }}>
                  <span>{product.name} — ¥{product.price}</span>
                  <button onClick={() => addToCart(product)}>加入购物车</button>
                </li>
              )}
            </For>
          </ul>
        </div>

        <div>
          <h3>购物车 ({totalItems()} 件)</h3>
          <Show when={cart.length > 0} fallback={<p style={{ color: "#888" }}>购物车为空</p>}>
            <ul style={{ "list-style": "none", padding: 0 }}>
              <For each={cart}>
                {(item) => (
                  <li style={{ padding: "4px 0", display: "flex", "align-items": "center", gap: "8px" }}>
                    <span>{item.name} × {item.quantity} = ¥{item.price * item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)}>删除</button>
                  </li>
                )}
              </For>
            </ul>
          </Show>
          <p><strong>总价: ¥{totalPrice()}</strong></p>
        </div>
      </div>
    </div>
  );
}
