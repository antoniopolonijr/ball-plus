import { randomUUID } from "node:crypto";

import { expect, test } from "@playwright/test";

import { createNamedGame, deleteNamedGame, waitForServerAction } from "./helpers/saved-games";

const ONE_PIXEL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
  "base64",
);

test.describe("saved game cover images", () => {
  let activeGameName: string | undefined;

  test.afterEach(async ({ page }) => {
    if (!activeGameName) {
      return;
    }

    const gameName = activeGameName;
    activeGameName = undefined;
    await deleteNamedGame(page, gameName);
  });

  test("uploads and removes a private cover image using the test Blob store", async ({
    page,
  }) => {
    const gameName = `E2E cover game ${randomUUID().slice(0, 8)}`;
    activeGameName = "New Game";

    const gameId = await createNamedGame(page, gameName);
    activeGameName = gameName;

    await page.goto("/games");

    const coverInput = page.locator(
      `input[type="file"][aria-label="Upload cover image for ${gameName}"]`,
    );

    await waitForServerAction(page, () =>
      coverInput.setInputFiles({
        name: "ball-plus-e2e-cover.png",
        mimeType: "image/png",
        buffer: ONE_PIXEL_PNG,
      }),
    );

    const coverImage = page.getByRole("img", {
      name: `Cover image for ${gameName}`,
    });
    await expect(coverImage).toBeVisible();

    await expect
      .poll(
        () =>
          coverImage.evaluate((image) => (image as HTMLImageElement).naturalWidth),
        { timeout: 15_000 },
      )
      .toBeGreaterThan(0);

    const ownerResponse = await page.evaluate(async (coverPath) => {
      const response = await fetch(coverPath);
      return {
        status: response.status,
        contentType: response.headers.get("content-type"),
      };
    }, `/api/games/${gameId}/cover`);

    expect(ownerResponse.status).toBe(200);
    expect(ownerResponse.contentType).toContain("image/png");

    await page
      .getByRole("button", {
        name: `Cover image options for ${gameName}`,
      })
      .click();

    await waitForServerAction(page, async () => {
      await page.getByRole("menuitem", { name: "Remove Image" }).click();
    });

    await expect(
      page.getByRole("button", {
        name: `Add cover image for ${gameName}`,
      }),
    ).toBeVisible();

    const removedCoverStatus = await page.evaluate(async (coverPath) => {
      const response = await fetch(coverPath);
      return response.status;
    }, `/api/games/${gameId}/cover`);

    expect(removedCoverStatus).toBe(404);
  });
});
