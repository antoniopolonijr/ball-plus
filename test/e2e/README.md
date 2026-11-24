# Ball+ — End-to-End tests

This directory contains Playwright browser tests for real user journeys. Vitest covers deterministic business rules; Playwright verifies the full Next.js + Hexclave + Neon experience.

## Covered journeys

### Public / unauthenticated

- Open Quick Game from the primary navigation.
- Generate teams in Quick Game and restore the result after reloading.
- View the anonymous Games-page sign-in call to action.
- Verify a saved-game route redirects an anonymous visitor to Hexclave sign-in.

### Authenticated saved games

- Sign in through the real Hexclave handler and save a Playwright storage state.
- Create a saved game and rename it.
- Update a player and a team, generate balanced teams, and persist the result.
- Reload the game and verify the database restored the player, team, and generated result.
- Delete the created game.
- Sign in as a second test account and verify the first user's game is absent from its list and returns 404 when opened directly.
- Upload and remove a private game cover when a dedicated Vercel Blob test token is configured.

## Environment setup

Copy `.env.test.local.example` to `.env.test.local` and provide test-only credentials.

### 1. Hexclave TEST project

Use a dedicated cloud project for automated tests where possible. Enable email/password sign-in and create two dedicated users in that project. Both accounts must be active and able to sign in with a password.

Required variables:

```env
NEXT_PUBLIC_HEXCLAVE_PROJECT_ID=
HEXCLAVE_SECRET_SERVER_KEY=
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
TEST_SECONDARY_USER_EMAIL=
TEST_SECONDARY_USER_PASSWORD=
```

- `TEST_USER_*` is the primary owner used by the setup project and saved-game tests.
- `TEST_SECONDARY_USER_*` is a different account used to prove ownership isolation.
- The Project ID is public; the Secret Server Key is server-only. Never expose the server key with a `NEXT_PUBLIC_` prefix.

### 2. Neon TEST database

Create a dedicated Neon project/database for E2E tests. Do not point Playwright or GitHub Actions at development or production data.

```env
DATABASE_URL=           # pooled connection string
DATABASE_URL_UNPOOLED=  # direct/unpooled connection string
```

Ball+ uses `DATABASE_URL` for runtime queries and `DATABASE_URL_UNPOOLED` for Drizzle migrations. Both URLs must refer to the same test database.

Before a local E2E run, apply the current migrations:

```bash
npm run db:migrate
```

The CI workflow runs migrations against the dedicated TEST database before Playwright. This implementation deliberately uses a permanent, isolated test database rather than creating/deleting Neon branches for every run. It does not require a Neon management API key.

### 3. Vercel Blob TEST store

The cover upload feature uses private Vercel Blob storage. **Do not use the production Blob token for tests.**

Create a separate private Blob store for E2E uploads and put its read/write token in:

```env
BLOB_READ_WRITE_TOKEN=
```

The cover test is skipped when this token is absent; all other authenticated saved-game tests can still run. In GitHub Actions, the test token is passed as `TEST_BLOB_READ_WRITE_TOKEN` and mapped to the SDK's `BLOB_READ_WRITE_TOKEN`.

The test's generated game record is deleted by its ID after the test; deleting the game also deletes the associated private cover blob.

### 4. Optional Playwright base URL

By default, Playwright starts `npm run dev` itself. Leave this variable unset for normal local runs.

```env
# Set only when testing an already-running server:
# PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000
```

When `PLAYWRIGHT_BASE_URL` is set, Playwright assumes that server is already running and does not start another one.

## Running tests

Install browsers once:

```bash
npx playwright install chromium
```

Run all browser tests:

```bash
npm run test:e2e
```

Useful focused commands:

```bash
npx playwright test --project=setup
npx playwright test test/e2e/saved-games.spec.ts --project=chromium-authenticated
npx playwright test test/e2e/saved-games-authorization.spec.ts --project=chromium-authenticated
npx playwright test test/e2e/saved-games-cover.spec.ts --project=chromium-authenticated
npx playwright test test/e2e/public-navigation.spec.ts --project=chromium-unauthenticated
npm run test:e2e:ui
npm run test:e2e:debug
```

## Authentication strategy

The `setup` Playwright project logs in with the dedicated primary test account using the real `/handler/sign-in` page and saves browser storage state to `playwright/.auth/user.json`.

The `chromium-authenticated` project depends on that setup and loads the saved state. Public tests run in a separate project with an explicitly empty storage state.

The authorization test creates a second, isolated browser context, signs in using the secondary test account, and checks that the first user's saved game is not listed and cannot be opened by ID.

The storage-state JSON contains session credentials. It is ignored by Git and must never be committed, uploaded as a public artifact, or reused from a personal browser session.

## GitHub Actions secrets

Add these under **Repository → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|---|---|
| `TEST_NEXT_PUBLIC_HEXCLAVE_PROJECT_ID` | Hexclave TEST project ID |
| `TEST_HEXCLAVE_SECRET_SERVER_KEY` | Hexclave TEST server key |
| `TEST_DATABASE_URL` | Neon TEST pooled URL |
| `TEST_DATABASE_URL_UNPOOLED` | Neon TEST direct URL for migrations |
| `TEST_USER_EMAIL` | Primary E2E account email |
| `TEST_USER_PASSWORD` | Primary E2E account password |
| `TEST_SECONDARY_USER_EMAIL` | Secondary E2E account email |
| `TEST_SECONDARY_USER_PASSWORD` | Secondary E2E account password |
| `TEST_BLOB_READ_WRITE_TOKEN` | Optional dedicated Blob TEST store token |

The first eight secrets are required to enable authenticated E2E runs in CI. The Blob secret is optional; without it, only the cover upload test is skipped.

The workflow maps the `TEST_*` secret names to the exact environment-variable names expected by Next.js, Hexclave, Drizzle, and Vercel Blob. No production secrets should be copied into this list.

## Isolation and cleanup

- Use a database and Hexclave project dedicated to tests.
- Use two test users; never use personal or production user credentials.
- Use a separate private Blob store.
- Test game names are unique per run.
- Tests execute with one Playwright worker because they share a dedicated primary test account.
- Tests delete games they create, using the unique game ID to avoid deleting an unrelated game with the same name.
- The workflow runs migrations against the isolated database before E2E.
- No test creates/deletes Neon branches automatically.

If a CI run is interrupted before cleanup, remove leftover E2E games from the dedicated test account/database only.

## Directory structure

```
test/
├── e2e/
│   ├── README.md
│   ├── auth.setup.ts
│   ├── helpers/
│   │   ├── auth.ts
│   │   └── saved-games.ts
│   ├── public-navigation.spec.ts
│   ├── saved-games.spec.ts
│   ├── saved-games-authorization.spec.ts
│   └── saved-games-cover.spec.ts
├── mocks/
│   └── README.md
├── setup.ts
└── unit/
    ├── games/
    └── team-generator/

playwright/
└── .auth/                  # Git-ignored Playwright session files
    └── user.json           # Generated by auth.setup.ts
```
