import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = page.locator(".product-title");
  }

  async goto() {
    await this.page.goto("/");
  }

  async expectOnHomePage() {
    await expect(this.page.locator('[data-test="page-title"]')).toHaveText(
      "My account"
    );
  }

  async getProductNames(): Promise<string[]> {
    const count = await this.productTitles.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      names.push(await this.productTitles.nth(i).innerText());
    }

    return names;
  }

  async openProductDetails() {
    await this.page.locator('[alt="Combination Pliers"]').click();
  }

  async openSlipJointPliers() {
    await this.page.locator('[alt="Slip Joint Pliers"]').click();
  }

  async getProductPrices(): Promise<number[]> {
    const productCards = this.page.locator('[data-test="product-card"]');
    const count = await productCards.count();

    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productCards
        .nth(i)
        .locator('[data-test="product-price"]')
        .innerText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }

    return prices;
  }
}
