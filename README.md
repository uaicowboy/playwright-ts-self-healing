## Playwright TypeScript Self-Healing Framework

A clean, minimalist, E2E automation framework built with TypeScript 6.0 + Playwright 1.59 using strict semantic locators and a custom lightweight local Ollama self-healer.

**Although still in progress**, the project is function-based helpers architecture (composition over inheritance), full type safety, clean DX, local and offline AI integration. It is deliberately scoped to login flows on [saucedemo.com](https://www.saucedemo.com) for now.

### Architecture Decisions

- Function-based helpers (`helpers/helpers.ts`) instead of traditional Page Object Model classes
- I worked with POM on other projects, but here, I did prefer composition over inheritance for better maintainability and simpler code.
- `pnpm` — Used as the package manager throughout the project
- `Zod` — For runtime validation of environment variables and config

### Current Project Structure

```bash
playwright-ts-self-healing/
├── src/
│   ├── config/
│   │   └── storageState.ts
│   ├── helpers/
│   │   ├── auth.ts
│   │   └── helpers.ts
│   ├── selfHealer/
│   │   └── selfHealer.ts
│   ├── setup/
│   │   └── auth.setup.ts
│   └── utils/
│       └── grepRegex.ts
├── tests/
│   └── authFlow/
│       ├── flakyTest.spec.ts
│       ├── login.spec.ts
│       └── logout.spec.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── env.d.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
```

### Current Scope

- The project is focused on login-related flows only: `login.spec.ts` — Standard happy path
  `flakyTest.spec.ts` — Intentional failing locator to showcase self-healing with Ollama
  `logout.spec.ts` — Logout to showcase preserved user session.
  `auth.setup.ts` — Global setup for preserving user session / cookies

This focused scope makes the framework easy to review while clearly demonstrating core concepts.

### Self-Healing Process (Custom & Lightweight)

The self-healing is fallback-only:

- A locator fails during test execution
- `selfHealer.heal()` is called with the failing locator string and context
- Local Ollama suggests a better semantic locator (`getByRole`, `getByPlaceholder`, etc.)
- The suggestion is converted into a real Playwright `Locator`
- The healed locator is passed to helpers like `safeFill(healedLocator, value, description`)
- Clear before/after logs are printed for full transparency

Healing is disabled by default (`ENABLE_SELF_HEALING=false`) to ensure deterministic behavior in CI.

### Ollama Integration (Development Only)

Ollama is used exclusively during local development for the custom self-healer.

Setup (Mac):

```
brew install ollama
ollama serve          # Keep this running in background
ollama pull llama3.2:3b
```

Also add it as a project dependency: `pnpm add -D ollama`

### Running the tests

- Install dependencies - `pnpm install`
- Headless: `pnpm test --project=chromium`
- With Playwright UI mode: `pnpm test:ui --project=chromium`

### Dev note on Playwright Official Healer (v1.56+)

Playwright now includes a built-in Test Agents / Healer that can automatically repair broken locators.
Why I built a custom lightweight Ollama version:

- To try it!
- Complete control over the prompt and logging
- Fully local and offline (no cloud cost or dependency)
- Full visibility into every healing attempt

### Next planned enhancements

- Full end-to-end saucedemo flow (login → sort products → cart → checkout)
- Visual regression testing
- Enhanced GitHub Actions CI with Docker

### Out of scope:

Playwright Healer agent.
On a separated project I'll integrate official Playwright Healer agent for hybrid approach
