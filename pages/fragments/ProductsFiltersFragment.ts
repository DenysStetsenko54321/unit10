import { expect, Locator, Page } from "@playwright/test";

export class ProductsFiltersFragment {
  private readonly categoryCheckboxes: Locator;
  private readonly productTitles: Locator;
  private readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    this.categoryCheckboxes = page.locator('[id^="checkbox-category"]');
    this.productTitles = page.locator('[data-test="product-title"]');
    this.sortDropdown = page.locator('[data-test="sort"]');
  }

  async selectCategory(categoryName: string) {
    const checkbox = this.page.locator(`[id^="checkbox-category"]`, {
      hasText: categoryName,
    });
    await checkbox.check();
  }

  async selectSortOption(optionText: string) {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async getProductTitles(): Promise<string[]> {
    return this.productTitles.allInnerTexts();
  }

  async expectProductsContain(text: string) {
    const titles = await this.getProductTitles();
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(text.toLowerCase());
    }
  }

  async expectProductsSortedAsc() {
    const titles = await this.getProductTitles();
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  }

  async expectProductsSortedDesc() {
    const titles = await this.getProductTitles();
    const sorted = [...titles].sort((a, b) => b.localeCompare(a));
    expect(titles).toEqual(sorted);
  }

  async expectPricesSortedAsc() {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  }

  async expectPricesSortedDesc() {
    const prices = await this.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  }

  private async getProductPrices(): Promise<number[]> {
    const priceLocators = this.page.locator('[data-test="unit-price"]');
    const priceTexts = await priceLocators.allInnerTexts();
    return priceTexts.map((text) => parseFloat(text.replace("$", "")));
  }

  async selectCategoryOption(group: string, label: string) {
    const categoryGroup = this.page.getByText(group);
    await categoryGroup.click();
    const option = this.page.getByLabel(label);
    await option.check();
  }

  async filterByCategory(label: string) {
    const checkbox = this.page.locator('label').filter({ hasText: label });
    await checkbox.click();
  }
}
