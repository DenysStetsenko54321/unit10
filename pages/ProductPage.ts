import { expect, Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;
  readonly toast: Locator;
  readonly productQuantity: Locator;
  readonly productTitle: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
    this.addToCartButton = page.locator('#btn-add-to-cart');
    this.addToFavoritesButton = page.locator('#btn-add-to-favorites');
    this.toast = page.locator('#toast-container');
    this.productQuantity = page.locator('[data-test="product-quantity"]');
    this.productTitle = page.locator('.product-title');
    this.proceedButton = page.locator('[data-test="proceed-1"]');
  }

  async expectOnProductPage(expectedName: string, expectedPrice: string) {
    await expect(this.page).toHaveURL(/.*product/);
    await expect(this.productName).toHaveText(expectedName);
    await expect(this.unitPrice).toHaveText(expectedPrice);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async expectToastVisibleWithMessage(message: string) {
    await expect(this.toast).toBeVisible();
    await expect(this.toast).toContainText(message);
  }

  async expectToastDisappearsIn8s() {
    await expect(this.toast).toBeHidden({ timeout: 8000 });
  }

  async expectCheckoutDetails(details: { productName: string; quantity: string }) {
    await expect(this.productQuantity).toHaveValue(details.quantity);
    await expect(this.productTitle).toHaveText(details.productName);
    await expect(this.proceedButton).toBeVisible();
  }

  
}
