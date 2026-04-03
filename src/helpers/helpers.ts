import { Locator } from '@playwright/test'

export async function safeFill(
  locator: Locator,
  value: string,
  description: string,
) {
  await locator.scrollIntoViewIfNeeded({ timeout: 5000 })
  await locator.fill(value)
  console.log(`[Helper] Filled "${description}" with: ${value}`)
}
