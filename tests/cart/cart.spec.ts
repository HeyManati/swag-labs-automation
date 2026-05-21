import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPages';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart - Swag Labs', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  test('producto agregado aparece en el carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('el nombre del producto en carrito es correcto', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const nameInInventory = await inventoryPage.getFirstItemName();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    const nameInCart = await cartPage.getFirstItemName();
    expect(nameInCart).toBe(nameInInventory);
  });

  test('boton Remove elimina el producto del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.removeFirstItem();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('boton Continue Shopping regresa al inventario', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

});