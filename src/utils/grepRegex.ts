export function getInventoryUrlRegex(): RegExp {
  const inventoryUrlRegex = process.env.INVENTORY_URL_GREP

  if (!inventoryUrlRegex) {
    console.warn('⚠️ INVENTORY_URL_GREP env var not set, using default regex')
    return /.*inventory\.html/
  }

  try {
    return new RegExp(inventoryUrlRegex)
  } catch (error) {
    throw new Error(
      `❌ Invalid regex in INVENTORY_URL_GREP: "${inventoryUrlRegex}". Error: ${error}`,
    )
  }
}
