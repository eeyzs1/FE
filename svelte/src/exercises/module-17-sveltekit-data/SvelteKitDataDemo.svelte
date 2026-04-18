<script lang="ts">
  let activeTab: 'load' | 'actions' | 'streaming' | 'hooks' = $state('load')
</script>

<div class="sveltekit-data">
  <h2>SvelteKit 数据层</h2>
  <p class="warning">⚠️ SvelteKit 数据层代码需要在 SvelteKit 项目中运行。以下为概念和代码示例。</p>

  <div class="tabs">
    <button class:active={activeTab === 'load'} onclick={() => activeTab = 'load'}>Load 函数</button>
    <button class:active={activeTab === 'actions'} onclick={() => activeTab = 'actions'}>Form Actions</button>
    <button class:active={activeTab === 'streaming'} onclick={() => activeTab = 'streaming'}>Streaming</button>
    <button class:active={activeTab === 'hooks'} onclick={() => activeTab = 'hooks'}>Hooks</button>
  </div>

  {#if activeTab === 'load'}
    <div class="tab-content">
      <h3>Load 函数 — 数据加载</h3>
      <p class="hint">通用 load (+page.js) 在浏览器和服务端都运行；服务端 load (+page.server.js) 只在服务端运行</p>
      <pre class="code-block">// +page.server.js
import &#123; error &#125; from '@sveltejs/kit'
import type &#123; PageServerLoad &#125; from './$types'

export const load: PageServerLoad = async (&#123; params &#125;) =&gt; &#123;
  const post = await db.getPost(params.slug)
  if (!post) error(404, 'Not found')
  return &#123; post &#125;
&#125;</pre>
      <p class="hint">返回值通过 data prop 传递给 +page.svelte</p>
    </div>
  {:else if activeTab === 'actions'}
    <div class="tab-content">
      <h3>Form Actions — 表单提交</h3>
      <p class="hint">用原生 form 提交数据，无需 JavaScript 也能工作，可用 use:enhance 渐进增强</p>
      <pre class="code-block">// +page.server.js
import &#123; fail &#125; from '@sveltejs/kit'
import type &#123; Actions &#125; from './$types'

export const actions = &#123;
  default: async (&#123; request &#125;) =&gt; &#123;
    const data = await request.formData()
    const email = data.get('email')
    if (!email) return fail(400, &#123; missing: true &#125;)
    return &#123; success: true &#125;
  &#125;
&#125;</pre>
    </div>
  {:else if activeTab === 'streaming'}
    <div class="tab-content">
      <h3>Streaming — 流式数据</h3>
      <p class="hint">服务端 load 返回 Promise 时，页面先渲染，数据就绪后自动填充</p>
      <pre class="code-block">// +page.server.js
export const load = async (&#123; params &#125;) =&gt; (&#123;
  post: await loadPost(params.slug),
  comments: loadComments(params.slug)
&#125;)</pre>
      <pre class="code-block">&lt;!-- +page.svelte 中用 #await --&gt;
&#123;#await data.comments&#125;
  &lt;p&gt;加载评论中...&lt;/p&gt;
&#123;:then comments&#125;
  &#123;#each comments as c&#125;&lt;p&gt;&#123;c.text&#125;&lt;/p&gt;&#123;/each&#125;
&#123;/await&#125;</pre>
    </div>
  {:else if activeTab === 'hooks'}
    <div class="tab-content">
      <h3>Hooks — 请求拦截</h3>
      <p class="hint">在 src/hooks.server.js 中拦截每个请求，用于认证、日志等</p>
      <pre class="code-block">// src/hooks.server.js
import type &#123; Handle &#125; from '@sveltejs/kit'

export const handle: Handle = async (&#123; event, resolve &#125;) =&gt; &#123;
  event.locals.user = await getUser(event.cookies.get('sessionid'))
  const response = await resolve(event)
  response.headers.set('x-custom', 'value')
  return response
&#125;</pre>
    </div>
  {/if}
</div>

<style>
  .sveltekit-data { max-width: 600px; margin: 20px auto; padding: 20px; border: 2px solid var(--accent-border, rgba(170, 59, 255, 0.5)); border-radius: 8px; }
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
  .tabs button { padding: 5px 10px; border: 1px solid var(--border, #e5e4e7); border-radius: 4px; cursor: pointer; font-size: 12px; }
  .tabs button.active { background: var(--accent-bg, rgba(170, 59, 255, 0.1)); border-color: var(--accent, #aa3bff); }
  .hint { color: #95a5a6; font-size: 13px; margin: 4px 0; }
  .warning { background: rgba(243, 156, 18, 0.1); padding: 8px; border-radius: 4px; font-size: 13px; margin-bottom: 12px; }
  .tab-content { min-height: 150px; }
  .code-block { background: var(--code-bg, #f4f3ec); padding: 12px; border-radius: 6px; font-family: var(--mono, monospace); font-size: 13px; overflow-x: auto; white-space: pre; line-height: 1.5; margin-bottom: 8px; }
</style>
