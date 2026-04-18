# 第 14 课：测试 — 单元测试与端到端测试

> 🎯 学习目标：掌握 Qwik 应用的测试策略，能够编写可靠的单元测试和 E2E 测试

---

## 一、测试策略概览

```
           ┌──────────────────────┐
           │    E2E 测试（少量）    │  ← Playwright
           │  验证完整用户流程      │
           ├──────────────────────┤
           │  集成测试（适量）      │  ← Vitest + Qwik 测试工具
           │  验证组件交互          │
           ├──────────────────────┤
           │  单元测试（大量）      │  ← Vitest
           │  验证纯函数和工具      │
           └──────────────────────┘
```

---

## 二、环境配置

### 2.1 安装测试依赖

```bash
pnpm add -D vitest @qwikest/vitest playwright @playwright/test
```

### 2.2 配置 Vitest

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: '.' })],
    test: {
      globals: true,
      environment: 'node',
    },
  };
});
```

### 2.3 配置 Playwright

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'pnpm preview',
    port: 4173,
  },
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:4173',
  },
});
```

### 2.4 添加测试脚本

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test.e2e": "playwright test",
    "test.unit": "vitest run"
  }
}
```

---

## 三、单元测试 — Vitest

### 3.1 测试纯函数

```ts
// src/utils/format.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
```

```ts
// src/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, truncate } from './format';

describe('formatDate', () => {
  it('应该正确格式化日期', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toContain('2024');
  });
});

describe('truncate', () => {
  it('短文本不应截断', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('长文本应该截断并添加省略号', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });
});
```

### 3.2 测试 Qwik 组件

使用 `@qwikest/vitest` 在 Vitest 中渲染和测试 Qwik 组件：

```tsx
// src/components/counter/counter.tsx
import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
  const count = useSignal(0);
  return (
    <div>
      <span data-testid="count">{count.value}</span>
      <button data-testid="increment" onClick$={() => count.value++}>
        +1
      </button>
    </div>
  );
});
```

```ts
// src/components/counter/counter.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@qwikest/vitest';
import { Counter } from './counter';

describe('Counter', () => {
  it('应该显示初始值 0', async () => {
    await render(<Counter />);
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('点击按钮后计数应该增加', async () => {
    await render(<Counter />);
    const button = screen.getByTestId('increment');
    await fireEvent.click(button);
    expect(screen.getByTestId('count').textContent).toBe('1');
  });
});
```

### 3.3 测试 routeLoader$

Loader 本质上是普通异步函数，可以直接测试：

```ts
// src/routes/blog/index.tsx
export const usePosts = routeLoader$(async () => {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
});
```

```ts
// 测试 loader 的核心逻辑（提取为独立函数）
// src/utils/posts.ts
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://api.example.com/posts');
  if (!res.ok) throw new Error('获取文章失败');
  return res.json();
}

// src/utils/posts.test.ts
import { describe, it, expect, vi } from 'vitest';
import { fetchPosts } from './posts';

describe('fetchPosts', () => {
  it('应该返回文章列表', async () => {
    const mockPosts = [{ id: 1, title: '测试文章' }];
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPosts),
    });

    const posts = await fetchPosts();
    expect(posts).toEqual(mockPosts);
  });

  it('请求失败时应该抛出错误', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchPosts()).rejects.toThrow('获取文章失败');
  });
});
```

### 3.4 测试 routeAction$ 验证逻辑

```ts
// src/utils/validation.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, '名字至少 2 个字符'),
  email: z.string().email('邮箱格式不正确'),
  message: z.string().min(10, '消息至少 10 个字符'),
});

// src/utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { contactSchema } from './validation';

describe('contactSchema', () => {
  it('应该通过有效数据', () => {
    const result = contactSchema.safeParse({
      name: '张三',
      email: 'test@example.com',
      message: '这是一条测试消息',
    });
    expect(result.success).toBe(true);
  });

  it('应该拒绝无效邮箱', () => {
    const result = contactSchema.safeParse({
      name: '张三',
      email: 'invalid-email',
      message: '这是一条测试消息',
    });
    expect(result.success).toBe(false);
  });
});
```

---

## 四、E2E 测试 — Playwright

### 4.1 基本页面测试

```ts
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('首页应该正确加载', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('首页应该有正确的标题', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Qwik/);
});
```

### 4.2 测试导航

```ts
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('SPA 导航应该正常工作', async ({ page }) => {
  await page.goto('/');

  // 点击导航链接
  await page.click('a[href="/about"]');

  // 验证 URL 变化
  await expect(page).toHaveURL('/about');

  // 验证页面内容
  await expect(page.locator('h1')).toContainText('关于');
});

test('浏览器后退应该正常工作', async ({ page }) => {
  await page.goto('/');
  await page.click('a[href="/about"]');
  await expect(page).toHaveURL('/about');

  await page.goBack();
  await expect(page).toHaveURL('/');
});
```

### 4.3 测试表单提交

```ts
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test('联系表单应该成功提交', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('input[name="name"]', '张三');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', '这是一条测试消息，长度足够。');
  await page.click('button[type="submit"]');

  await expect(page.locator('.success')).toBeVisible();
});

test('表单验证应该显示错误', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('input[name="email"]', 'invalid');
  await page.click('button[type="submit"]');

  await expect(page.locator('.error')).toBeVisible();
});
```

### 4.4 测试 SSR 输出

```ts
// e2e/ssr.spec.ts
import { test, expect } from '@playwright/test';

test('SSR 应该输出完整 HTML', async ({ page }) => {
  const response = await page.goto('/');
  const html = await response!.text();

  // 验证 HTML 中包含内容（不是空壳）
  expect(html).toContain('<h1');

  // 验证 Qwik 序列化状态
  expect(html).toContain('qwik/json');
});
```

---

## 五、测试最佳实践

### 5.1 测试文件组织

```
src/
├── components/
│   ├── counter/
│   │   ├── counter.tsx
│   │   └── counter.test.tsx      # 组件测试
│   └── card/
│       ├── card.tsx
│       └── card.test.tsx
├── utils/
│   ├── format.ts
│   └── format.test.ts            # 工具函数测试
└── routes/
    └── blog/
        ├── index.tsx
        └── blog.test.ts           # 页面级测试
e2e/
├── home.spec.ts                   # E2E 测试
├── navigation.spec.ts
└── contact.spec.ts
```

### 5.2 测试原则

1. **测试行为，而非实现**：验证用户看到的结果，而非内部状态
2. **优先测试关键路径**：先覆盖最重要的功能
3. **避免过度 mock**：mock 外部依赖（API），但不 mock 内部模块
4. **E2E 测试要精简**：只覆盖核心用户流程，不要用 E2E 测试所有细节

### 5.3 Qwik 特有的测试注意事项

- 组件测试需要使用 `@qwikest/vitest` 或类似工具，因为 `component$()` 需要 Optimizer 处理
- Loader 和 Action 的核心逻辑应提取为独立函数，方便直接测试
- `server$()` 函数在测试中需要模拟服务端环境
- 测试 SSR 时，确认 HTML 包含序列化状态

---

## 六、动手实践

### 练习 1：配置测试环境

1. 安装 Vitest 和 Playwright
2. 配置 `vite.config.ts` 和 `playwright.config.ts`
3. 运行 `pnpm test` 确认配置正确

### 练习 2：编写单元测试

为之前课程中创建的组件编写测试：
- Counter 组件：测试初始值和点击后更新
- Todo 应用：测试添加、完成、删除功能
- 工具函数：测试格式化、验证逻辑

### 练习 3：编写 E2E 测试

1. 测试首页加载
2. 测试页面导航
3. 测试表单提交
4. 测试 SSR 输出

---

## 七、大师洞察

### 测试金字塔在 Qwik 中的特殊意义

Qwik 的可恢复性意味着 SSR 输出的 HTML 是"完整"的——包含内容和状态。这使得 E2E 测试更可靠，因为你不需要等待水合完成就能验证页面内容。

### 持续集成（CI）

将测试集成到 CI 流水线中：

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test.unit

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm exec playwright install
      - run: pnpm build
      - run: pnpm test.e2e
```

---

✅ 完成本课后，你应该能够：
- [ ] 配置 Vitest 和 Playwright 测试环境
- [ ] 编写组件单元测试
- [ ] 测试 loader 和 action 的核心逻辑
- [ ] 编写 E2E 测试验证用户流程
- [ ] 验证 SSR 输出的正确性
- [ ] 将测试集成到 CI 流水线
