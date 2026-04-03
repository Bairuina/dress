# Frontend Architecture

This frontend is organized for a React + TypeScript + Vite interview project.

## Layers

```text
src/
  api/        # HTTP client and domain API wrappers
  components/ # reusable UI pieces
  hooks/      # React Query and shared hooks
  layouts/    # page shells and shared layout containers
  pages/      # route-level pages
  router/     # routing entry
  types/      # shared TypeScript types
  utils/      # pure helpers
```

## Responsibility Split

- `api`
  Wraps backend requests and keeps network code out of pages.
- `components`
  Holds reusable UI blocks that can be combined by pages.
- `hooks`
  Encapsulates server-state and mutation logic.
- `layouts`
  Keeps the app frame, header, and content shell separate from business pages.
- `pages`
  Owns route-level composition and page-specific orchestration.
- `types`
  Stores contract types shared across frontend modules.

## Current Page Flow

- `/`
  Dashboard page for wardrobe overview and clothes management.

## Reading Order

1. `src/main.tsx`
2. `src/router/index.tsx`
3. `src/pages/dashboard/index.tsx`
4. `src/components/dashboard/*`
5. `src/hooks/use-clothes.ts`
6. `src/api/clothes.ts`

## Notes

- Keep imports layered from top to bottom.
- Pages should orchestrate, not implement HTTP details directly.
- Reusable UI belongs in `components`, not `pages`.
