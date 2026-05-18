import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly overviewItems: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.overviewItems = page.locator('.cart_item');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationHeader = page.locator('.complete-header');
  }

  async fillForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async getOverviewItemCount(): Promise<number> {
    return await this.overviewItems.count();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getConfirmationHeader(): Promise<string> {
    return await this.confirmationHeader.innerText();
  }
}