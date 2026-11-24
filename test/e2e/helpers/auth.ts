import { expect, type Page } from "@playwright/test";

export type TestUserCredentials = {
  email: string;
  password: string;
};

function getRequiredCredential(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required E2E environment variable: ${name}`);
  }

  return value;
}

export function getPrimaryTestUserCredentials(): TestUserCredentials {
  return {
    email: getRequiredCredential("TEST_USER_EMAIL"),
    password: getRequiredCredential("TEST_USER_PASSWORD"),
  };
}

export function getSecondaryTestUserCredentials(): TestUserCredentials {
  return {
    email: getRequiredCredential("TEST_SECONDARY_USER_EMAIL"),
    password: getRequiredCredential("TEST_SECONDARY_USER_PASSWORD"),
  };
}

export async function signInWithPassword(
  page: Page,
  credentials: TestUserCredentials,
): Promise<void> {
  await page.goto("/handler/sign-in");

  const emailInput = page.locator('input[type="email"]').first();
  const passwordInput = page.locator('input[type="password"]').first();
  const submitButton = page.locator('form button[type="submit"]').first();

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill(credentials.email);
  await passwordInput.fill(credentials.password);
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Hexclave's handler redirects after a successful sign-in. Do not save
  // storage state until the protected server-rendered Games page confirms it.
  await expect(page).not.toHaveURL(/\/handler\/sign-in(?:[/?#]|$)/, {
    timeout: 20_000,
  });

  await page.goto("/games");
  await expect(
    page.getByRole("heading", { name: "My Games", exact: true }),
  ).toBeVisible({ timeout: 15_000 });
}
