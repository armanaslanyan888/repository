// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Smoke tests', () => {
  test('Page has title', async ({ page }) => {
    await expect(page).toHaveTitle("HTFR - Vinyl Superstore");
  });
  
  test('Page has a link', async ({ page }) => {
    await expect(page).toHaveURL("https://www.htfr.com/");
  });
});
