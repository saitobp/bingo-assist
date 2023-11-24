import { test, expect, Page } from '@playwright/test'

function createHelper(page: Page) {
  async function goToHome() {
    await page.goto('http://localhost:5173/')
  }

  async function addDrawnNumber(number: string) {
    await page.getByLabel('Drawn number', { exact: true }).click()
    await page.getByLabel('Drawn number', { exact: true }).fill(number)

    await page.getByRole('button', { name: 'Save drawn number' }).click()

    await expect(page.getByLabel('Drawn number', { exact: true })).toHaveValue(
      '',
    )
  }

  async function drawnNumbers(numbers: number[]) {
    const sorted = numbers.sort((a, b) => a - b)

    for (const [i, number] of numbers.entries()) {
      const value = number.toString()

      await page.getByLabel('Drawn number', { exact: true }).click()
      await page.getByLabel('Drawn number', { exact: true }).fill(value)

      await page.getByRole('button', { name: 'Save drawn number' }).click()

      await expect(
        page.getByLabel('Drawn number', { exact: true }),
      ).toHaveValue('')

      await expect(
        page.getByLabel(`Drawn numbers list item ${i + 1}`),
      ).toHaveText(sorted[i].toString())
    }
  }

  async function createBingoCard(id: string, numbers?: number[][]) {
    // Fill new bingo card id
    await page.getByLabel('New card id').click()
    await page.getByLabel('New card id').fill(id)
    await page.getByLabel('New card id').press('Enter')

    // Loop through card numbers
    let counter = 0

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        counter++

        if (i === 2 && j === 2) continue

        const label = `New card number col ${j} row ${i}`
        const value = numbers === undefined ? counter : numbers[i][j]

        await page.getByLabel(label).click()
        await page.getByLabel(label).fill(value.toString())
      }
    }

    // Click the add new bingo card button
    await page.getByRole('button', { name: 'Add bingo card' }).click()

    // Check to see if the bingo card was created
    await expect(page.getByLabel(`Card ${id}`, { exact: true })).toBeVisible()
    await expect(page.getByLabel(`Card id ${id}`)).toHaveText(`Id: ${id}`)
  }

  return {
    goToHome,
    addDrawnNumber,
    createBingoCard,
    drawnNumbers,
  }
}

test('Add a bingo card', async ({ page }) => {
  const helper = createHelper(page)

  await helper.goToHome()
  await helper.createBingoCard('0001')

  // Fill new bingo card numbers
  let existingCardCounter = 0

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      existingCardCounter++

      if (i === 2 && j === 2) continue

      const value = existingCardCounter.toString()

      await expect(
        page.getByLabel(`Card 0001 number col ${i} row ${j}`),
      ).toHaveText(value)
    }
  }
})

test('Add drawn numbers', async ({ page }) => {
  const helper = createHelper(page)

  await helper.goToHome()
  await helper.createBingoCard('0001')

  await helper.addDrawnNumber('2')

  await expect(page.getByLabel('Card 0001 number col 0 row 1')).toHaveClass(
    /bg-green-200/,
  )

  await helper.addDrawnNumber('1')

  await expect(page.getByLabel('Card 0001 number col 0 row 0')).toHaveClass(
    /bg-green-200/,
  )

  // Check to see if the drawn numbers container has the new drawn number ordered
  await expect(page.getByLabel('Drawn numbers list item 1')).toHaveText('1')
})

test('Add multiple bingo cards', async ({ page }) => {
  const helper = createHelper(page)

  await helper.goToHome()

  for (let cardsCounter = 1; cardsCounter <= 5; cardsCounter++) {
    const id = cardsCounter.toString().padStart(4, '0')
    await helper.createBingoCard(id)
  }
})

test('Horizontal bingo', async ({ page }) => {
  const helper = createHelper(page)

  await helper.goToHome()
  await helper.createBingoCard('0001')
  await helper.drawnNumbers([1, 6, 11, 16, 21])

  await expect(page.getByLabel('Win status')).toHaveText(
    'Win: 0001 - Horizontal',
  )
})
