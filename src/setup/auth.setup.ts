import { test } from '@playwright/test'
import { loginAndSaveStorageState } from '../helpers/auth'

test('it authenticates and save storage state', async ({ browser }) => {
  console.log('🔧 Running auth setup...')
  await loginAndSaveStorageState(browser)
  console.log('✅ Auth setup completed and "storageState" saved!')
})
