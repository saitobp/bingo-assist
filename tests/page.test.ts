import { test, expect } from '@playwright/test'

test('Has title', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page).toHaveTitle('Bingo Assist')
})
