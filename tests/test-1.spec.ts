import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.omocha-auction.com/');
  await page.getByRole('link', { name: '미소년' }).click();
  await expect(page.locator('body')).toContainText('미소년');
});
