// @ts-check
import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/');
});

test.describe('Smoke tests', () => {
  test('Page has title', async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle("HTFR - Vinyl Superstore");
  });
  
  test('Page has a link', async ({ page }: { page: Page }) => {
    await expect(page).toHaveURL("https://www.htfr.com/");
  });
});