import ollama from 'ollama'
import { Page, Locator } from '@playwright/test'

export class SelfHealer {
  private enabled = process.env.ENABLE_SELF_HEALING
  private model = process.env.OLLAMA_MODEL

  async heal(
    failingLocatorStr: string,
    context: string,
    page: Page,
  ): Promise<Locator | null> {
    if (!this.enabled) {
      console.log(`[SelfHealer] Disabled for: ${failingLocatorStr}`)
      return null
    }

    console.log(`[SelfHealer] Healing triggered - ${failingLocatorStr}`)
    console.log(`[SelfHealer] Context: ${context}`)

    try {
      const prompt = `Suggest ONLY a full valid Playwright semantic locator starting with "getBy".
Return exactly one line starting with "getBy". No explanation, no "page.", no extra text.

Failing locator: ${failingLocatorStr}
Context: ${context} (saucedemo.com)

Example good output: getByPlaceholder('Username')

New locator: `

      const response = await ollama.chat({
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
      })

      const suggestion = response.message.content.trim()
      console.log(`[SelfHealer] Suggested: ${suggestion}`)

      // dynamic conversion
      const healed = (await page.evaluateHandle((code) => {
        const clean = code.replace(/^page\./, '')
        return eval(clean)
      }, suggestion)) as unknown as Locator

      return healed
    } catch (e: any) {
      console.log(`[SelfHealer] Ollama error: ${e.message}`)
      return null
    }
  }
}
