import { test, expect } from '@playwright/test'

test.describe('Logout Flow', () => {
  test('it should successfully log out', async ({ page }) => {
    await page.goto('/inventory.html')
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible()

    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.getByRole('link', { name: 'Logout' }).click()

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
})
