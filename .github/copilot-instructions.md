# ska-dataproduct-dashboard – Copilot Instructions

## Package manager
- **Yarn** (not npm, not pnpm).
- Install deps: `yarn install`
- Add a package: `yarn add <package>`

## How to run linting and tests

### Linting
```bash
yarn lint          # ESLint on all src files
yarn prettier      # check Prettier formatting
yarn lint:fix      # auto-fix ESLint issues
yarn prettier:fix  # auto-fix Prettier issues
```

### Tests
Tests use **Cypress** only — both component and e2e.  There are no Jest unit tests; do not create `.test.ts` / `.test.tsx` files.

```bash
# Component tests (interactive)
yarn cypress:open

# Component tests (headless CI)
yarn test:cypress:component:ci

# End-to-end tests (headless CI)
yarn test:cypress:e2e:ci
```

Test files live under `cypress/` and use the `.cy.tsx` extension.

## Project layout
```
src/                        # React application source
  App/                      # top-level App component
  components/               # shared UI components
  contexts/                 # React contexts
  services/                 # API service hooks and helpers
  types/                    # TypeScript type definitions
  utils/                    # pure utility functions
  env.ts                    # runtime environment variable types
cypress/                    # Cypress component and e2e tests
charts/                     # Helm chart for Kubernetes deployment
  ska-dataproduct-dashboard/
    values.yaml             # default Helm values
    templates/              # Kubernetes manifest templates
public/                     # static assets
env_scripts/                # env config generation scripts
webpack.config.js           # Webpack bundle config
tsconfig.json               # TypeScript compiler config
```

## Framework and language
- **React** with **TypeScript** (`.tsx` / `.ts`).
- **MUI** (`@mui/material`) for UI components.
- **Axios** for HTTP requests.
- `@ska-telescope/ska-gui-components` for SKAO-shared UI components.

## TypeScript conventions
- Strict mode is enabled (`"strict": true` in `tsconfig.json`).
- All component props and function signatures must have explicit types.
- Use path aliases defined in `tsconfig.json`: `@components/*`, `@services/*`,
  `@utils/*`, `@contexts/*`.

## Testing conventions
- All tests live under `cypress/` as `.cy.tsx` files.
- Use Cypress component testing for isolated component behaviour.
- Use Cypress e2e tests for full user-journey flows.
- Do not write Jest tests — the Jest config exists for legacy reasons only.
- When adding tests, follow the existing component test pattern: mount the
  component, interact via Cypress commands, assert on rendered output.
- **Test coverage discipline**: each code path should be covered by exactly one
  test. Do not write multiple tests that exercise the same branch or condition.
  Prefer `context`/`it` blocks for variations of the same logic rather than
  duplicating mount and interaction setup.

## Environment variables
Runtime env vars are injected at startup via `env_scripts/env_config.sh` and
typed in `src/env.ts`.  When adding a new env var:
1. Add it to `env_scripts/env_config` (template).
2. Add the TypeScript type in `src/env.ts`.
3. Reference it via the typed `env` object, never via raw `process.env`.

## Helm chart
The chart at `charts/ska-dataproduct-dashboard/` deploys both the dashboard
frontend and the `ska-dataproduct-api` backend in one release.

- Default values are in `charts/ska-dataproduct-dashboard/values.yaml`.
- API container configuration is under the `api:` key.
- Dashboard container configuration is under the `dashboard:` key.
- The shared PVC is controlled by `dataProductPVC:`.
- PostgreSQL table names default to empty strings in `values.yaml`; when empty
  the API auto-derives them from the per-volume UUID stored in `.dpd-volume-id`
  on the PV root.  Only set them explicitly when you need to override the
  auto-derived names.

## Code quality rules (apply when generating or modifying code)
- **No magic values**: assign bare literal strings or numbers to named
  constants at the top of the module.
- **No bloat**: prefer the simplest, smallest change that solves the problem.
  Do not add extra abstraction layers or helper functions unless reused in at
  least two places.
- **No AI/task artefacts in text**: never reference internal task labels or
  AI-session shorthand in comments, changelog entries, or commit messages.
  All written text must be self-contained and meaningful to a reader with no
  knowledge of the session that produced the change.
- **Changelog entries must be brief**: one line per bullet, describing *what* changed
  and *why* at a high level. Do not explain implementation details inline.
- **Docstrings / JSDoc**: add a JSDoc comment to every exported function or
  component that is non-trivial. Update it if the implementation changes.
