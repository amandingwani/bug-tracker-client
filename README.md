# Bug Tracker

<!-- Prettier badge -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Environment Variables

- VITE_GOOGLE_OAUTH_CLIENT_ID
- VITE_BUG_TRACKER_API_URL

## Git Commit Types:

- feat: A new feature or enhancement added to the codebase.
- fix: A bug fix or correction to resolve an issue.
- docs: Documentation changes or updates.
- style: Changes related to code formatting, indentation, or whitespace.
- refactor: Code refactoring without adding new features or fixing bugs.
- test: Addition or modification of test cases.
- chore: Other changes not directly affecting the code (e.g., build scripts, dependencies).

## React + TypeScript + Vite

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
