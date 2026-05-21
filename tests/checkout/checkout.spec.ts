import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPages';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout - Swag Labs', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.checkout();
  });

  test('formulario valido navega al overview', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('Alex', 'Altan', '10100');
    await checkoutPage.continue();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  });

  test('overview muestra el producto agregado', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('Alex', 'Altan', '10100');
    await checkoutPage.continue();
    const itemCount = await checkoutPage.getOverviewItemCount();
    expect(itemCount).toBe(1);
  });

  test('formulario sin nombre retorna error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('', 'Altan', '10100');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('formulario sin apellido retorna error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('Alex', '', '10100');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('formulario sin codigo postal retorna error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('Alex', 'Altan', '');
    await checkoutPage.continue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('finish button completa la orden con confirmacion', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillForm('Alex', 'Altan', '10100');
    await checkoutPage.continue();
    await checkoutPage.finish();
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');
  });

});