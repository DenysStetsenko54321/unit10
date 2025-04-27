import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-test^="product-"][href^="/product/"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectOnHomePage() {
    await expect(this.page.locator('[data-test="page-title"]')).toHaveText('My account');
  }

  async getProductNames(): Promise<string[]> {
    return this.productCards
      .locator('[data-test^="product-"][href^="/product/"]')
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceStrings = await this.productCards
      .locator('[data-test="product-price"]')
      .allTextContents();
    return priceStrings.map(str => parseFloat(str.replace('$', '').trim()));
  }

  async openProductDetails() {
    await this.page.locator('[alt="Combination Pliers"]').click();
  }

  async openSlipJointPliers() {
    await this.page.locator('[alt="Slip Joint Pliers"]').click();
  }

  async openNthProduct(index: number) {
    await this.productCards.nth(index).click();
  }

  async getNthProductName(index: number): Promise<string> {
    const locator = this.productCards.nth(index).locator('[data-test="product-name"]');
    await expect(locator).toBeVisible();
    return (await locator.textContent())?.trim() || '';
  }

  async getNthProductPrice(index: number): Promise<string> {
    const locator = this.productCards.nth(index).locator('[data-test="product-price"]');
    await expect(locator).toBeVisible();
    return (await locator.textContent())?.trim() || '';
  }

  async addNthProductToCart(index: number) {
    await this.productCards.nth(index).click();
    const btn = this.page.locator('#btn-add-to-cart');
    await expect(btn).toBeVisible();
    await btn.click();
  }
}
