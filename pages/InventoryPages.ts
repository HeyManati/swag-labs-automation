import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addFirstItemToCart() {
    await this.page.locator('.btn_inventory').first().click();
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstItemName(): Promise<string> {
    return await this.page.locator('.inventory_item_name').first().innerText();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}