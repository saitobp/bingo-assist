import { test, expect } from '@playwright/test'

test('Has title', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page).toHaveTitle('Bingo Assist')
})

test('Has header', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const header = page.getByTestId('header')
  await expect(header).toBeVisible()
})
