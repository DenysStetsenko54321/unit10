import { test, expect } from '@playwright/test';
import { WEB_URL, USER_EMAIL, USER_PASSWORD, USER_NAME } from '../utils/env';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto(`${WEB_URL}/auth/login`);
  await page.locator('#email').pressSequentially(USER_EMAIL);
  await page.locator('#password').pressSequentially(USER_PASSWORD);
  await page.locator('.btnSubmit').click();
  await expect(page).toHaveURL(`${WEB_URL}/account`);
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText(USER_NAME);
  await expect(page.locator('[data-test="nav-menu"]')).toBeVisible();
});

test('Verify user can view product details', async ({ page }) => {
  await page.goto(WEB_URL);
  await page.locator('[alt="Combination Pliers"]').click();
  await expect(page).toHaveURL(new RegExp(`${WEB_URL}/product`));
  await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toHaveText('14.15');
  await expect(page.locator('#btn-add-to-cart')).toBeVisible();
  await expect(page.locator('#btn-add-to-favorites')).toBeVisible();
})

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto(WEB_URL);
  await page.locator('[alt="Slip Joint Pliers"]').click();
  await expect(page).toHaveURL(new RegExp(`${WEB_URL}/product`));
  await expect(page.locator('[data-test="product-name"]')).toHaveText('Slip Joint Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toHaveText('9.17');

  await page.locator('#btn-add-to-cart').click();
  await expect(page.locator('#toast-container')).toBeVisible();
  await expect(page.locator('#toast-container')).toContainText('Product added to shopping cart');
  await expect(page.locator('#toast-container')).toBeHidden({ timeout: 8000 });
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');

  await page.locator('[aria-label="cart"]').click();
  await expect(page).toHaveURL(`${WEB_URL}/checkout`);
  await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('1');
  await expect(page.locator('.product-title')).toHaveText('Slip Joint Pliers');
  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
})