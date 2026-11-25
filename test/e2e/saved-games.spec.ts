import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import {
  createGame,
  deleteGameById,
  renameGame,
  waitForGameSave,
} from "./helpers/saved-games";

test.describe("saved games", () => {
  let activeGameId: string | undefined;

  test.afterEach(async ({ page }) => {
    if (!activeGameId) {
      return;
    }

    const gameId = activeGameId;
    activeGameId = undefined;
    await deleteGameById(page, gameId);
  });

  test("creates, edits, generates, persists and deletes a saved game", async ({
    page,
  }) => {
    const gameName = `E2E saved game ${randomUUID().slice(0, 8)}`;
    const gameId = await createGame(page);
    activeGameId = gameId;

    await renameGame(page, gameName);

    await expect(page).toHaveURL(new RegExp(`/games/${gameId}$`));
    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toBeVisible();

    const playerName = `E2E Player ${randomUUID().slice(0, 6)}`;
    const playerNameInput = page
      .getByRole("textbox", {
        name: "Player name",
      })
      .first();

    await waitForGameSave(page, () => playerNameInput.fill(playerName));

    const teamName = `E2E Team ${randomUUID().slice(0, 6)}`;
    const teamNameInput = page
      .getByRole("textbox", {
        name: "Team name",
      })
      .first();

    await waitForGameSave(page, () => teamNameInput.fill(teamName));

    await waitForGameSave(page, async () => {
      await page
        .getByRole("button", { name: "Generate balanced teams" })
        .click();
    });

    const generatedTeams = page.getByRole("region", {
      name: "Generated Teams",
    });
    await expect(generatedTeams).toBeVisible();
    await expect(generatedTeams).toContainText(playerName);
    await expect(generatedTeams).toContainText(teamName);
    await expect(generatedTeams).toContainText(teamName);
    await expect(page.getByTestId("game-save-status")).toHaveAttribute(
      "data-state",
      "saved",
    );

    // A fresh document load verifies database persistence, not only Zustand state.
    await page.reload();

    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Player name" }).first(),
    ).toHaveValue(playerName);
    await expect(
      page.getByRole("textbox", { name: "Team name" }).first(),
    ).toHaveValue(teamName);
    await expect(generatedTeams).toBeVisible();
    await expect(generatedTeams).toContainText(playerName);

    await deleteGameById(page, gameId);
    activeGameId = undefined;

    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toHaveCount(0);
  });
});
