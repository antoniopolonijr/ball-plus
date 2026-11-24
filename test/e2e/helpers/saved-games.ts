import { expect, type Page } from "@playwright/test";

export async function waitForServerAction(
  page: Page,
  trigger: () => Promise<void>,
): Promise<void> {
  const responsePromise = page.waitForResponse(
    (response) => {
      const request = response.request();
      return (
        request.method() === "POST" &&
        Boolean(request.headers()["next-action"])
      );
    },
    { timeout: 20_000 },
  );

  await trigger();

  const response = await responsePromise;

  if (!response.ok()) {
    throw new Error(
      `Next.js server action failed with HTTP ${response.status()}: ${response.url()}`,
    );
  }
}

export async function createNamedGame(
  page: Page,
  gameName: string,
): Promise<string> {
  await page.goto("/games");
  await expect(
    page.getByRole("heading", { name: "My Games", exact: true }),
  ).toBeVisible();

  // The header and empty-state panel can both contain a New Game button.
  await page.getByRole("button", { name: "New Game", exact: true }).first().click();
  await page.waitForURL(/\/games\/[0-9a-f-]{36}$/i);

  const gameId = new URL(page.url()).pathname.split("/").at(-1);

  if (!gameId) {
    throw new Error("The new game's ID could not be read from its URL.");
  }

  await page.getByRole("button", { name: "Edit game name" }).click();
  const nameInput = page.getByRole("textbox", { name: "Game name" });

  await waitForServerAction(page, async () => {
    await nameInput.fill(gameName);
    await nameInput.press("Enter");
  });

  await expect(
    page.getByRole("heading", { name: gameName, exact: true }),
  ).toBeVisible();

  return gameId;
}

export async function deleteNamedGame(
  page: Page,
  gameName: string,
): Promise<void> {
  await page.goto("/games");

  const gameHeading = page.getByRole("heading", {
    name: gameName,
    exact: true,
  });

  if ((await gameHeading.count()) === 0) {
    return;
  }

  await page
    .getByRole("button", {
      name: `Delete ${gameName} Game`,
      exact: true,
    })
    .click();

  const dialog = page.getByRole("alertdialog");
  await expect(dialog).toBeVisible();

  await waitForServerAction(page, async () => {
    await dialog.getByRole("button", { name: "Delete game", exact: true }).click();
  });

  await expect(gameHeading).toHaveCount(0);
}
