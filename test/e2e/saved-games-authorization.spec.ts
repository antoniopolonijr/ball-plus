import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import {
  getSecondaryTestUserCredentials,
  signInWithPassword,
} from "./helpers/auth";
import { createGame, deleteGameById, renameGame } from "./helpers/saved-games";

test.describe("saved game authorization", () => {
  let activeGameId: string | undefined;

  test.afterEach(async ({ page }) => {
    if (!activeGameId) {
      return;
    }

    const gameId = activeGameId;
    activeGameId = undefined;
    await deleteGameById(page, gameId);
  });

  test("does not expose a game to a different authenticated user", async ({
    page,
    browser,
  }) => {
    const gameName = `E2E private game ${randomUUID().slice(0, 8)}`;
    const gameId = await createGame(page);
    activeGameId = gameId;
    await renameGame(page, gameName);

    const secondaryContext = await browser.newContext({
      storageState: { cookies: [], origins: [] },
    });

    try {
      const secondaryPage = await secondaryContext.newPage();
      await signInWithPassword(
        secondaryPage,
        getSecondaryTestUserCredentials(),
      );

      await expect(
        secondaryPage.getByRole("heading", { name: "My Games", exact: true }),
      ).toBeVisible();

      await expect(
        secondaryPage.getByRole("heading", {
          name: gameName,
          exact: true,
        }),
      ).toHaveCount(0);

      await secondaryPage.goto(`/games/${gameId}`);

      // 1. Check the text/heading on the not-found.tsx page.
      await expect(
        secondaryPage.getByRole("heading", {
          name: "Page not found",
          exact: true,
        }),
      ).toBeVisible();

      // The original owner must still be able to open the game.
      await page.goto(`/games/${gameId}`);
      await expect(
        page.getByRole("heading", { name: gameName, exact: true }),
      ).toBeVisible();
    } finally {
      await secondaryContext.close();
    }
  });
});
