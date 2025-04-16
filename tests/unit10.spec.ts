import { test } from '@playwright/test';
import { USER_EMAIL, USER_PASSWORD, USER_NAME } from '../utils/env';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { HeaderFragment } from '../pages/fragments/HeaderFragment';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const header = new HeaderFragment(page);

  await loginPage.goto();
  await loginPage.login(USER_EMAIL, USER_PASSWORD);

  await homePage.expectOnHomePage();
  await header.expectUserIsLoggedIn(USER_NAME);
});

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await page.goto('/');
  await homePage.openProductDetails();

  await productPage.expectOnProductPage('Combination Pliers', '14.15');
});

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const header = new HeaderFragment(page);

  await page.goto('/');
  await homePage.openSlipJointPliers();

  await productPage.expectOnProductPage('Slip Joint Pliers', '9.17');
  await productPage.addProductToCart();

  await productPage.expectToastVisibleWithMessage('Product added to shopping cart');
  await productPage.expectToastDisappearsIn8s();

  await header.expectCartQuantity('1');
  await header.clickCart();

  await productPage.expectCheckoutDetails({
    productName: 'Slip Joint Pliers',
    quantity: '1',
  });
});
