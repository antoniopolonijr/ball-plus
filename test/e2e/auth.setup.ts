import { mkdir } from "node:fs/promises";
import path from "node:path";

import { expect, test as setup } from "@playwright/test";

import {
  getPrimaryTestUserCredentials,
  signInWithPassword,
} from "./helpers/auth";

const authFile = path.resolve(process.cwd(), "playwright/.auth/user.json");

setup("authenticate the dedicated Ball+ E2E user", async ({ page }, testInfo) => {
  await mkdir(path.dirname(authFile), { recursive: true });

  try {
    await signInWithPassword(page, getPrimaryTestUserCredentials());

    // The Games page only renders "My Games" after the server has recognized
    // the Hexclave session. This checks the server-side session, not just UI state.
    await page.goto("/games");
    await expect(
      page.getByRole("heading", { name: "My Games", exact: true }),
    ).toBeVisible();

    await page.context().storageState({ path: authFile });
  } catch (error) {
    const screenshotPath = testInfo.outputPath("auth-setup-failure.png");
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {
      // Preserve the original authentication error if screenshot capture fails.
    });

    await testInfo.attach("auth-setup-failure", {
      path: screenshotPath,
      contentType: "image/png",
    }).catch(() => {
      // The original error remains the useful failure signal.
    });

    throw new Error(
      "Could not authenticate the primary E2E user. Check TEST_USER_EMAIL, " +
        "TEST_USER_PASSWORD, the Hexclave TEST project, and that the user is active " +
        "and allowed to sign in with email/password.",
      { cause: error },
    );
  }
});
