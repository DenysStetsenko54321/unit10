import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getProductName() {
    return this.page.locator('.product-title').textContent();
  }

  async getProductPrice() {
    return this.page.locator('[data-test="product-price"]').textContent();
  }

  async getTotalPrice() {
    return this.page.locator('[data-test="cart-total"]').textContent();
  }

  async clickProceedToCheckout1() {
    await this.page.locator('[data-test="proceed-1"]').click();
  }
}
