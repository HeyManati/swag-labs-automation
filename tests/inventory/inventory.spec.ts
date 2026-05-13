import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPages';

test.describe('Inventory - Swag Labs', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  test('se muestran 6 productos en el catalogo', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('agregar producto al carrito actualiza el badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    const badge = await inventoryPage.getCartBadgeCount();
    expect(badge).toBe('1');
  });

  test('ordenar productos de Z a A cambia el primero', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('az');
    const firstAZ = await inventoryPage.getFirstItemName();
    await inventoryPage.sortBy('za');
    const firstZA = await inventoryPage.getFirstItemName();
    expect(firstAZ).not.toBe(firstZA);
  });

  test('click en carrito navega a la pagina del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

});