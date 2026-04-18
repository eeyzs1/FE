import { Typography, Card, Divider, Tag, Steps } from 'antd'

const { Title, Paragraph } = Typography

export default function Ch7Deploy() {
  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>🚀 7.3 部署与工程化</Title>
      <Paragraph className="text-lg text-gray-500 mb-6">
        从开发到生产，掌握完整的部署流程和工程化最佳实践。
      </Paragraph>

      <Card title="💡 构建与部署流程" className="mb-6">
        <Steps
          direction="vertical"
          current={-1}
          items={[
            { title: '代码质量检查', description: 'ESLint + TypeScript + Prettier 确保代码质量' },
            { title: '单元测试', description: 'Vitest + React Testing Library 组件测试' },
            { title: '构建打包', description: 'Vite build → 优化的生产包' },
            { title: '部署上线', description: 'Vercel / Netlify / Docker / CI/CD' },
          ]}
        />
      </Card>

      <Card title="📦 Vite 构建优化" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-antd': ['antd'],
        },
      },
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true },
    },
    // chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
})`}</pre>
        </div>
      </Card>

      <Card title="🌐 部署方案" className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-xl">
            <h4 className="font-bold text-indigo-700 mb-2">Vercel（推荐）</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`# 安装
npm i -g vercel

# 部署
vercel

# 自动部署：推送到 Git
# → Vercel 自动构建部署`}</pre>
            </div>
            <Tag color="blue" className="mt-2">零配置</Tag>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <h4 className="font-bold text-green-700 mb-2">Docker</h4>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
              <pre>{`# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`}</pre>
            </div>
            <Tag color="green" className="mt-2">容器化</Tag>
          </div>
        </div>
      </Card>

      <Card title="🔄 CI/CD 流程" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`}</pre>
        </div>
      </Card>

      <Card title="📋 环境变量管理" className="mb-6">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <pre>{`# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=开发环境

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=生产环境

// 代码中使用
const apiUrl = import.meta.env.VITE_API_URL`}</pre>
        </div>
      </Card>

      <Divider />

      <Card title="🎯 关键要点" className="bg-gradient-to-r from-amber-50 to-orange-50">
        <ul className="list-disc pl-5 space-y-2">
          <li>Vite 构建优化：代码分割、压缩、tree-shaking</li>
          <li>部署方案：Vercel（简单）/ Docker（可控）/ CI/CD（自动化）</li>
          <li>环境变量：.env 文件 + import.meta.env</li>
          <li>代码质量：ESLint + TypeScript + Prettier + 测试</li>
          <li>CI/CD：自动 lint → test → build → deploy</li>
          <li>监控：Sentry 错误追踪 + 性能监控</li>
        </ul>
      </Card>
    </div>
  )
}
