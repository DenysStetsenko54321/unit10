import { test } from './fixtures';
import { USER_EMAIL, USER_PASSWORD, USER_NAME } from '../utils/env';

test('Verify login with valid credentials', async ({ loginPage, homePage, header }) => {
  await loginPage.goto();
  await loginPage.login(USER_EMAIL, USER_PASSWORD);

  await homePage.expectOnHomePage();
  await header.expectUserIsLoggedIn(USER_NAME);
});

test('Verify user can view product details', async ({ homePage, productPage }) => {
  await homePage.goto();
  await homePage.openProductDetails();

  await productPage.expectOnProductPage('Combination Pliers', '14.15');
});

test('Verify user can add product to cart', async ({ homePage, productPage, header }) => {
  await homePage.goto();
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
