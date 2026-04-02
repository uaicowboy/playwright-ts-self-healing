import { Browser, expect } from '@playwright/test'
import fs from 'fs'
import { AUTH_DIR, STORAGE_STATE } from '../config/storageState'

export async function loginAndSaveStorageState(
  browser: Browser,
  username: string = process.env.USER_NAME,
  password: string = process.env.USER_PASSWORD,
): Promise<string> {
  // Ensure directory exists
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true })
  }

  console.log(`🔑 Logging in as "${username}" and saving storage state...`)

  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto('/')
  await page.getByRole('textbox', { name: 'Username' }).fill(username)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()

  // Verify successful login
  await expect(page).toHaveURL(/.*inventory.html/)
  await expect(page.getByText('Products')).toBeVisible()

  await context.storageState({ path: STORAGE_STATE })

  console.log(`✅ Storage state saved to: ${STORAGE_STATE}`)

  await context.close()
  return STORAGE_STATE
}
