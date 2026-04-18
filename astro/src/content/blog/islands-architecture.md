---
title: "Understanding Islands Architecture"
description: "Deep dive into Astro's Islands Architecture and how it enables fast websites."
pubDate: 2024-02-20
tags: ["astro", "architecture", "performance"]
draft: false
---

# Understanding Islands Architecture

The Islands Architecture is the key innovation behind Astro's performance.

## The Problem

Traditional frameworks hydrate the entire page, even parts that don't need interactivity. This results in:

- Large JavaScript bundles
- Slow Time to Interactive (TTI)
- Poor performance on mobile devices

## The Solution: Islands

Astro treats interactive components as "islands" in a sea of static HTML:

```
┌─────────────────────────────┐
│  Static Header (0 JS)       │
├─────────────────────────────┤
│  ┌─────────┐  ┌──────────┐ │
│  │ Island 1│  │ Island 2 │ │
│  │ (React) │  │ (Vue)    │ │
│  └─────────┘  └──────────┘ │
├─────────────────────────────┤
│  Static Footer (0 JS)       │
└─────────────────────────────┘
```

## Client Directives

Control when each island hydrates:

- `client:load` — Immediately
- `client:idle` — When browser is idle
- `client:visible` — When entering viewport
- `client:media` — When matching a media query

## Benefits

1. **Smaller bundles** — Only ship JS for interactive parts
2. **Faster loads** — Static HTML renders instantly
3. **Better UX** — No layout shift from hydration
