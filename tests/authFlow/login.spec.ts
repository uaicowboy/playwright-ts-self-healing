import { test, expect } from '@playwright/test'
import { getInventoryUrlRegex } from 'src/utils/grepRegex'

test.describe('Login Flow', () => {
  test('it should successfully log in with valid credentials', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill(process.env.USER_NAME)
    await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click()

    // Assert user lands on inventory page
    await expect(page).toHaveURL(getInventoryUrlRegex())
    await expect(page.getByText('Products')).toBeVisible()
    await expect(page.locator('data-test=inventory-item').first()).toBeVisible()
  })
})
