# Project Guidelines

# System Prompt: NextLex Turborepo (Lando + pnpm)

You are working in a **Turborepo** monorepo that contains:

- **apps/nextlex** — a Next.js (App Router) application
- **packages/editor** — a shared **Lexical** editor implementation
- **packages/ui** — a shared **shadcn/ui** component library

Package manager is **pnpm** with **workspaces** and a **pnpm catalog**.  
All commands must be executed **via Lando tooling only** (never raw npm/yarn/node).  
pnpm commands must be run **in the correct workspace**.

---

## Absolute Rules

1. **Use Lando for every command.** Prefix all executions with `lando` and use the provided command shims.
2. **Run in the correct workspace.** Prefer `-C <path>` or `--filter <workspace>` for pnpm. Do **not** run from the wrong directory.
3. **Use pnpm only** (no npm/yarn). Use workspace ranges (`workspace:*`) for internal deps.
4. **Keep monorepo hygiene.** Shared logic goes in `packages/*`, app-specific code stays in `apps/nextlex`.
5. **TypeScript first.** Add/adjust types as needed; maintain strictness settings.
6. **UI lives in `packages/ui`.** Only import shadcn components through the UI package.
7. **RTE lives in `packages/editor`.** Keep Lexical nodes/plugins there; the app consumes the package.

---

## Lando Command Shims

- `lando pnpm …` → pnpm (service: turborepo)
- `lando pnpx …` → pnpx (service: turborepo)
- `lando turbo …` → turbo (service: next, dir `/app`)
- `lando shadcn …` → `pnpm ui` (service: turborepo, dir `/app/packages/ui`)
- `lando next …` → next (service: next, dir `/app/apps/nextlex`)
- `lando dev` → `pnpm dev` in `/app/apps/nextlex`
- `lando prod` → `pnpm build && pnpm start` in `/app/apps/nextlex`

> If you need to run a pnpm command in a different workspace, use `-C` with a path from the repo root (`/app` in the container).

---

## Correct Command Examples

**Install a runtime dep in the Next app**

```sh
lando pnpm -C apps/nextlex add zod
```

**Install a dev dep in the UI package**
```sh
lando pnpm -C packages/ui add -D @types/react
```

**Run dev server for the app**
```sh
lando dev
```

**Build the app**
```sh
lando prod
```

## Project Conventions
- Next.js App Router in `apps/nextlex` (`app/` directory). Co-locate server actions & routes.
- packages/ui exports all shadcn components via a stable barrel (`src/index.ts`).
- packages/editor exports a `<RichTextEditor />` (Lexical) plus nodes/plugins as separate entry points.
- Path aliases: prefer importing `@repo/ui` and `@repo/editor`.
- pnpm catalog: when adding external deps, honor any pinned versions.

## Output Format for Code Changes

When editing code, always produce:
1. Plan (1–5 bullets).
2. File patches as unified diffs or code blocks (full file when new, minimal diff when edited).
3. Commands to run (using correct Lando + workspace form).
4. Notes on follow-ups or migrations.

## Lexical Editor Guidelines

* Lexical Editor Guidance
* Put nodes, themes, plugins in packages/editor.
* Expose <RichTextEditor /> from @repo/rte.
* Keep editor state serialization/deserialization utilities in packages/editor.
* Add new formatting as Lexical plugins in packages/editor.

