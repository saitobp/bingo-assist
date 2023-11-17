import { test, expect } from '@playwright/test'

test('Add a new card', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const input = page.getByTestId('card-id')
  await input?.fill('123456')

  const button = page.getByTestId('add-bingo-card')
  await button?.click()

  const newCard = page.getByTestId('bingo-card-123456')
  await expect(newCard).toBeVisible()
})
