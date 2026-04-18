---
title: "Content Collections in Astro"
description: "Learn how to use Astro's Content Collections for type-safe content management."
pubDate: 2024-03-10
tags: ["astro", "content", "typescript"]
draft: false
---

# Content Collections in Astro

Content Collections are one of Astro's most powerful features, providing type-safe content management.

## What are Content Collections?

Content Collections provide a way to organize and validate your content (blog posts, docs, etc.) with Zod schemas.

## Setting Up

1. Create `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = { blog };
```

2. Add Markdown files to `src/content/blog/`

3. Query in your pages:

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

## Benefits

- **Type Safety**: Catch errors at build time
- **Validation**: Ensure all content has required fields
- **Autocomplete**: IDE support for frontmatter fields
- **Querying**: Filter and sort content easily
