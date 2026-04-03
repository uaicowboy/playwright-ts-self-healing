import { test, expect } from '@playwright/test'
import { safeFill } from 'src/helpers/helpers'
import { SelfHealer } from 'src/helpers/selfHealer'
import { getInventoryUrlRegex } from 'src/utils/grepRegex'

// Skip on CI
test.describe.skip('Flaky Login with Self-Healing Demo', () => {
  const healer = new SelfHealer()

  test('it should successfully log in after locator fix', async ({ page }) => {
    const wrongLocator = page.getByPlaceholder('UsernameWrongLocator')

    await page.goto('/')

    try {
      // wrong locator for the demo. Use healer only on user name field for now
      await wrongLocator.fill(process.env.USER_NAME)
    } catch (error) {
      console.log('[Test] Locator failed, calling SelfHealer...')

      const healedLocator = await healer.heal(
        wrongLocator.toString(),
        'username field',
        page,
      )

      if (healedLocator) {
        await safeFill(healedLocator, process.env.USER_NAME!, 'username')
      } else {
        console.log('[Healer] No healed locator. Test failed')
        throw error
      }
    }

    await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click()

    // Assert user lands on inventory page
    await expect(page).toHaveURL(getInventoryUrlRegex())
    await expect(page.getByText('Products')).toBeVisible()
    await expect(page.locator('data-test=inventory-item').first()).toBeVisible()
  })
})
