# Working in Day.js

Day.js is a small JavaScript date/time library with immutable, chainable APIs and optional plugins and locales. This is the library source, not a web application: there is no server or start command.

## Where things belong

- `src/index.js`: factory, Dayjs class, parsing, arithmetic, formatting, and plugin registration. Shared units and helpers are in `src/constant.js` and `src/utils.js`.
- `src/plugin/<name>/index.js`: optional features installed with `dayjs.extend`. Keep feature-specific work here rather than growing the core unnecessarily.
- `src/locale/`: language data; `types/index.d.ts` and `types/plugin/`: authored public declarations. Keep declarations in sync when changing public APIs.
- `test/`: core Jest tests; `test/plugin/` and `test/locale/`: matching feature tests. Tests import `src`, not the published package.
- `build/`: Rollup and Babel packaging scripts. `docs/` contains README translations and assets, not the complete external documentation site.

## Commands from the repository root

Use Node LTS and npm. CI selects `lts/*`; this checkout was prepared with Node 24.19.0 and npm 12.2.1. Check `node --version` and `npm --version` before diagnosing failures.

- Locked install: `npm ci --ignore-scripts --no-audit --no-fund`. This verified local setup skips lifecycle scripts, including contributor hooks; normal npm run commands still work. CI uses `npm install`.
- Focused example: `./node_modules/.bin/jest test/manipulate.test.js --runInBand --coverage=false`. Substitute the relevant test file. This is not the full test gate.
- Full tests, explicit UTC baseline: `TZ=UTC npm test -- --runInBand`. The upstream script runs eight timezone-focused passes, then all Jest tests with 100% line coverage required; the extra flag serializes the final pass. Without `TZ=UTC`, the final pass inherits the host timezone: this checkout had six failures in America/Los_Angeles but passed in UTC. Record the timezone and keep those results distinct.
- Lint JavaScript: `npm run lint`; this also covers nested tests. For just one changed file: `./node_modules/.bin/eslint test/manipulate.test.js`.
- Build UMD bundles and check size: `npm run build`. Build ESM: `npm run babel`. On Node 24, the UMD size gate failed with `ERR_OSSL_EVP_UNSUPPORTED`; a generated bundle alone is not a passing build. Report this separately; do not automatically upgrade dependencies or enable legacy crypto.
- Run a built-library example after the UMD build: `node -e "console.log(require('./dayjs.min.js')('2020-01-31').add(1, 'month').format('YYYY-MM-DD'))"`; expected output: `2020-02-29`.

## Conventions that matter

Use the surrounding ES6/Jest style: two spaces, single quotes, no semicolons or trailing commas. This repository uses Jest 22; use existing `it`/`forEach` patterns rather than assuming newer test APIs. Prefer fixed dates and explicit expected results. Restore any mocked clock or global locale changed by a test.

Date-changing operations normally return a new instance and preserve the original. The optional `badMutable` plugin is an intentional exception. Put regression tests beside the affected behavior; avoid adding plugins or dependencies for core arithmetic tests.

## Guardrails

Do not hand-edit generated root `dayjs.min.js`, `plugin/`, `locale/`, `esm/`, `index.d.ts`, or `locale.json`; edit `src/` or `types/` and rebuild. `coverage/` and `node_modules/` are outputs too. The package's `main` field points to a generated file, not the development entry point.

Do not upgrade dependencies, rewrite the lockfile, run release workflows, or format the whole repository for a small change. `npm run prettier` rewrites Markdown documentation; it is not the JavaScript lint command. Report failed checks honestly without weakening coverage thresholds or changing unrelated source.
