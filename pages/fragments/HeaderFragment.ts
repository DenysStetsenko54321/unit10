import { expect, Locator, Page } from '@playwright/test';

export class HeaderFragment {
  readonly navMenu: Locator;
  readonly pageTitle: Locator;
  readonly cartIcon: Locator;
  readonly cartQuantity: Locator;

  constructor(private page: Page) {
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.pageTitle = page.locator('[data-test="page-title"]');
    this.cartIcon = page.locator('[aria-label="cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
  }

  async expectUserIsLoggedIn(username: string) {
    await expect(this.navMenu).toHaveText(username);
    await expect(this.navMenu).toBeVisible();
  }

  async expectCartQuantity(quantity: string) {
    await expect(this.cartQuantity).toHaveText(quantity);
  }

  async clickCart() {
    await this.cartIcon.click();
  }
}
