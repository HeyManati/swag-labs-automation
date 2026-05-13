# Swag Labs - E2E Automation Framework

Playwright + TypeScript automation framework built with Page Object Model pattern, targeting [Swag Labs](https://www.saucedemo.com/) as a demo e-commerce application.

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing framework
- TypeScript — strongly typed test code
- Page Object Model — maintainable test architecture
- GitHub Actions — CI/CD pipeline

## Project Structure

swag-labs-automation/
├── pages/               # Page Object classes
│   ├── LoginPage.ts
│   └── InventoryPages.ts
├── tests/
│   ├── auth/            # Authentication tests
│   │   └── login.spec.ts
│   └── inventory/       # Inventory & cart tests
│       └── inventory.spec.ts
└── playwright.config.ts

## Test Coverage

### Auth
- Login exitoso con credenciales válidas
- Login fallido con password incorrecto
- Login fallido con usuario bloqueado

### Inventory
- Verificación de 6 productos en el catálogo
- Agregar producto al carrito actualiza el badge
- Ordenar productos cambia el orden mostrado
- Navegación al carrito desde el icono

## Run Tests

```bash
# Install dependencies
npm install
npx playwright install

# Run all tests
npx playwright test

# Run specific suite
npx playwright test tests/auth/login.spec.ts
npx playwright test tests/inventory/inventory.spec.ts

# Run with UI mode
npx playwright test --ui

# View HTML report
npx playwright show-report
```