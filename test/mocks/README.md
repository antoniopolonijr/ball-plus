# Test doubles

Keep reusable external-service test doubles in this folder.

For now, server-action and data-access tests define narrow module mocks locally in their spec files. This keeps each suite explicit about the Drizzle, Hexclave, Vercel Blob, and Next.js behavior it replaces, and avoids a large global mock that could hide missing dependencies.
