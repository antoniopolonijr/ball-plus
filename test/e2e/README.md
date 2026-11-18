# Ball+ — End-to-End tests

This directory contains Playwright tests for user-visible application journeys. Business rules are covered by Vitest; E2E tests verify that routes and navigation work in a real browser.

## Covered journeys

- Public navigation to Quick Game.
- Anonymous access to the Games page and its sign-up call to action.
- Direct navigation to the Quick Game route.

The signed-in saved-game flow is intentionally not enabled yet. It needs a dedicated Hexclave test account and an isolated database, neither of which should be silently replaced with production credentials.

## Environment

Copy `.env.test.local.example` to `.env.test.local`.

- `PLAYWRIGHT_BASE_URL` (optional): test server URL. When omitted, Playwright starts `npm run dev`.
- `PLAYWRIGHT_STORAGE_STATE` (optional): path to a Playwright storage-state JSON for a dedicated test user.

Use a dedicated test environment. Never point test mutations at production data. Do not commit `.env.test.local` or the storage-state JSON.

## Commands

- `npm run test:e2e`
- `npm run test:e2e:ui`
- `npm run test:e2e:debug`
- `npx playwright test test/e2e/public-navigation.spec.ts`

Install Chromium once with `npx playwright install chromium`.

## Authentication strategy

Ball+ uses Hexclave. Once a dedicated test identity and stable login flow are configured, create a Playwright storage state and set `PLAYWRIGHT_STORAGE_STATE`. Keep anonymous and authenticated projects separate as the authenticated suite grows.

Unlike the course repository, this project does not automatically create and delete Neon branches. The course implementation uses a different authentication provider and a different application schema. A Neon branch lifecycle can be added when the Ball+ team has a safe Neon management credential and test-specific migration/seed process.

## Directory structure

```
test/
├── e2e/
│   ├── README.md
│   └── public-navigation.spec.ts
├── mocks/
│   └── README.md
├── setup.ts
└── unit/
    ├── games/
    │   ├── actions.test.ts
    │   └── data.test.ts
    └── team-generator/
        ├── can-generate-teams.test.ts
        ├── generate-balanced-teams.test.ts
        ├── generated-teams-utils.test.ts
        ├── parse-player-list.test.ts
        └── team-generator-store.test.ts
```

## CI

The workflow runs unit tests, typecheck, lint, build and unauthenticated browser smoke tests. It uses a syntactically valid placeholder Neon URL only so that the application can initialize; the anonymous smoke tests must not issue database queries. Add a dedicated test database and Hexclave identity before enabling tests that create, update or delete saved games.
