import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly removeButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.removeButton = page.locator('.cart_button');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getFirstItemName(): Promise<string> {
    return await this.cartItemNames.first().innerText();
  }

  async removeFirstItem() {
    await this.removeButton.first().click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}