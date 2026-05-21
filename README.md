# Swag Labs — Playwright Automation Framework

![CI](https://github.com/HeyManati/swag-labs-automation/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

End-to-end automation framework built with **Playwright + TypeScript** following the **Page Object Model** pattern. Designed to demonstrate production-ready QA automation skills for enterprise web applications.

---

## 🧪 Test Coverage

| Module | Test Cases | Type |
|----------------|---|-----|
| Authentication | 3 | E2E |
| Inventory      | 4 | E2E |
| Cart           | 4 | E2E |
| Checkout       | 6 | E2E |
| **Total**      | **17** | |

### Authentication
- ✅ Successful login with valid credentials
- ✅ Failed login with incorrect password
- ✅ Failed login with locked-out user

### Inventory
- ✅ Catalog displays 6 products
- ✅ Adding item to cart updates badge count
- ✅ Sort Z→A changes first displayed product
- ✅ Cart icon navigates to cart page

---

## 🏗️ Architecture

```
swag-labs-automation/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   ├── inventory/
│   │   └── inventory.spec.ts
│   ├── cart/
│   │   └── cart.spec.ts
│   └── checkout/
│       └── checkout.spec.ts
```

### Design Decisions

**Page Object Model** — All selectors and interactions are encapsulated in page classes, keeping tests clean and maintainable. Adding a new test never requires touching locators directly.

**`beforeEach` for shared state** — Inventory tests share a login step via `beforeEach`, avoiding duplication and making the setup explicit.

**`data-test` attributes** — Locators use `[data-test="..."]` attributes where available, following Playwright best practices for selector stability.

---

## ⚙️ CI/CD

Pipeline runs automatically on every **push** and **pull request** to `main` and `master`.

```
push / pull_request → install deps → install browsers → run tests → upload HTML report
```

The Playwright HTML report is uploaded as a GitHub Actions artifact and retained for **30 days** after each run.

---

## 🚀 Local Setup

```bash
# Clone the repo
git clone https://github.com/HeyManati/swag-labs-automation.git
cd swag-labs-automation

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# View HTML report
npx playwright show-report
```

---

## 🛠️ Stack

| Tool | Purpose |
|---|---|
| Playwright | E2E test runner & browser automation |
| TypeScript | Type-safe test code |
| Page Object Model | Framework architecture pattern |
| GitHub Actions | CI/CD pipeline |
| Playwright HTML Reporter | Test reporting & artifacts |

---

## 📁 Related Projects

This repo is part of a broader QA automation portfolio:

| Project | Stack | Focus |
|---|---|---|
| **swag-labs-automation** ← you are here | Playwright + TypeScript | UI automation, POM, CI/CD |
| [api-testing-playwright](https://github.com/HeyManati/api-testing-playwright) | Playwright + TypeScript | API testing, contract validation |
---

## 👤 Author

**Alex** — QA Engineer  
3+ years in manual QA for B2B SaaS ERP systems, transitioning to automation.  
[GitHub](https://github.com/HeyManati) · [LinkedIn](www.linkedin.com/in/wilfredo-alexander-altan-reyes-49a659223)