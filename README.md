# Next.js with Lexical

Manage content with the Lexical editor.

## Setup
```sh
lando start
```
Run dev mode or prod mode.

Go to: https://nextlex.lndo.site/

### Dev mode

```shell
lando dev
```

### Prod mode
```shell
lando prod
```

### Next command
```shell
lando next <command>
```

Example: `lando next build && lando next start`

### Add ui components

Use the pre-made script:

```sh
lando shadcn add <component-name>
```

> This works just like the `shadcn/ui` CLI.

### Add a new app

Turborepo offers a simple command to add a new app:

```sh
lando turbo gen workspace --name <app-name>
```

This will create a new empty app in the `apps` directory.

If you want, you can copy an existing app with:

```sh
lando turbo gen workspace --name <app-name> --copy
```

> [!NOTE]
> Remember to run `pnpm install` after copying an app.

## pnpm workspaces

Workspaces in pnpm work similar to npm but vary slightly from yarn.

To modify package dependencies in workspaces, you must first change directories
into that workspace and then run the pnpm command.

Example:

`cd apps/nextlex && pnpm add <package>`

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `nextlex`: a [Next.js](https://nextjs.org/) app
- `@repo/ui`: a React component library (🚀 powered by **shadcn/ui**)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Learn more about shadcn/ui:

- [Documentation](https://ui.shadcn.com/docs)
