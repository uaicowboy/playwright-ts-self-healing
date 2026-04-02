declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Core configuration
      BASE_URL: string
      BROWSER: 'chromium' | 'firefox' | 'webkit'
      HEADLESS: 'true' | 'false'

      // Self-healing
      ENABLE_SELF_HEALING: 'true' | 'false'
      HEALING_MAX_RETRIES: string

      // Local Ollama
      OLLAMA_HOST: string
      OLLAMA_MODEL: string

      // SauceDemo credentials
      USER_NAME: string
      USER_PASSWORD: string
    }
  }
}

export {}
