import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import { createNamedGame, deleteNamedGame, waitForServerAction } from "./helpers/saved-games";

test.describe("saved games", () => {
  let activeGameName: string | undefined;

  test.afterEach(async ({ page }) => {
    if (!activeGameName) {
      return;
    }

    const gameName = activeGameName;
    activeGameName = undefined;
    await deleteNamedGame(page, gameName);
  });

  test("creates, edits, generates, persists and deletes a saved game", async ({
    page,
  }) => {
    const gameName = `E2E saved game ${randomUUID().slice(0, 8)}`;

    // The test account is dedicated to E2E. If the test fails before renaming,
    // the default name is also cleaned up in afterEach.
    activeGameName = "New Game";

    const gameId = await createNamedGame(page, gameName);
    activeGameName = gameName;

    await expect(page).toHaveURL(new RegExp(`/games/${gameId}$`));
    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toBeVisible();

    const playerName = `E2E Player ${randomUUID().slice(0, 6)}`;
    const playerNameInput = page.getByRole("textbox", {
      name: "Player name",
    }).first();

    await waitForServerAction(page, () => playerNameInput.fill(playerName));

    const teamName = `E2E Team ${randomUUID().slice(0, 6)}`;
    const teamNameInput = page.getByRole("textbox", {
      name: "Team name",
    }).first();

    await waitForServerAction(page, () => teamNameInput.fill(teamName));

    await waitForServerAction(page, async () => {
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

    // A fresh document load verifies the database copy, not just Zustand state.
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

    await page.goto("/games");
    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toBeVisible();

    await deleteNamedGame(page, gameName);
    activeGameName = undefined;

    await expect(
      page.getByRole("heading", { name: gameName, exact: true }),
    ).toHaveCount(0);
  });
});
