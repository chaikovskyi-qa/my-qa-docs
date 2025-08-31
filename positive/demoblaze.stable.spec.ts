import { test, expect } from '@playwright/test';

test('Add to cart — стабильный сценарий', async ({ page }) => {
  await page.goto('https://www.demoblaze.com');
  await page.getByRole('link', { name: /samsung galaxy s6/i }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('link', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /^cart$/i }).click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText(/samsung galaxy s6/i)).toBeVisible();
});
