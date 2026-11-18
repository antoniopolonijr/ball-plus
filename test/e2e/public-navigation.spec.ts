import { expect, test } from "@playwright/test";

test.describe("public navigation", () => {
  test("allows a visitor to open Quick Game from the main navigation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Quick Game" }).click();

    await expect(page).toHaveURL(/\/quick-game$/);
    await expect(
      page.getByRole("heading", { name: "Quick Game" }),
    ).toBeVisible();
  });

  test("shows the account call to action on the anonymous Games page", async ({
    page,
  }) => {
    await page.goto("/games");

    await expect(
      page.getByRole("heading", { name: "Save your games" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Quick Game" }),
    ).toBeVisible();
  });

  test("loads Quick Game directly", async ({ page }) => {
    await page.goto("/quick-game");

    await expect(
      page.getByRole("heading", { name: "Quick Game" }),
    ).toBeVisible();
  });
});
