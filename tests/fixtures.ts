import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { HeaderFragment } from "../pages/fragments/HeaderFragment";
import { ProductsFiltersFragment } from "../pages/fragments/ProductsFiltersFragment";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { USER_EMAIL, USER_PASSWORD } from "../utils/env";

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  header: HeaderFragment;
  filters: ProductsFiltersFragment;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USER_EMAIL, USER_PASSWORD);
    await use(page);
  },

  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  header: async ({ page }, use) => use(new HeaderFragment(page)),
  filters: async ({ page }, use) => use(new ProductsFiltersFragment(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(USER_EMAIL, USER_PASSWORD);

    await page.goto("/");
    await use(page);
  },
});

export { expect };
