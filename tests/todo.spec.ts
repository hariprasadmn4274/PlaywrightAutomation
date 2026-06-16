import { test, expect } from '@playwright/test';

test('should allow me to add todo items', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // Add a new todo
  await page.locator('.new-todo').fill('Buy milk');
  await page.locator('.new-todo').press('Enter');

  // Add another todo
  await page.locator('.new-todo').fill('Run 5k');
  await page.locator('.new-todo').press('Enter');

  // Add a third todo
  await page.locator('.new-todo').fill('Fix MCP Server');
  await page.locator('.new-todo').press('Enter');

  // Make sure there are 3 todos
  await expect(page.locator('.todo-list li')).toHaveCount(3);

  // Mark 'Run 5k' as completed
  await page.locator('.todo-list li').filter({ hasText: 'Run 5k' }).locator('.toggle').check();

  // Verify that the item is marked as completed
  await expect(page.locator('.todo-list li').filter({ hasText: 'Run 5k' })).toHaveClass('completed');
});
