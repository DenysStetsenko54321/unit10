import { test, expect } from "./fixtures";
import { PaymentMethod } from "../utils/PaymentMethod";

test("Complete checkout flow as logged-in user", async ({
  homePage,
  productPage,
  cartPage,
  checkoutPage,
  header,
}) => {
  await homePage.goto();

  const productName = await homePage.getNthProductName(0);
  const productPrice = await homePage.getNthProductPrice(0);

  await homePage.openProductDetails();

  await productPage.addProductToCart();
  await header.expectCartQuantity("1");
  await header.clickCart();

  await expect(await cartPage.getProductName()).toContain(productName);
  await expect(await cartPage.getProductPrice()).toContain(productPrice);
  await expect(await cartPage.getTotalPrice()).toContain(productPrice);

  await cartPage.clickProceedToCheckout1();
  await checkoutPage.expectLoggedIn();
  await checkoutPage.clickProceedToCheckout2();
  await checkoutPage.fillBillingAddress();
  await checkoutPage.clickProceedToCheckout3();
  await checkoutPage.selectPaymentMethod(PaymentMethod.CreditCard);
  await checkoutPage.fillCreditCardDetailsIn3Months();
  await checkoutPage.confirmPaymentMethod();
  await checkoutPage.expectPaymentSuccess();
});
