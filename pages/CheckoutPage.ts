import { expect, Page } from '@playwright/test';
import { PaymentMethod } from '../utils/PaymentMethod';
import { USER_NAME } from '../utils/env';

export class CheckoutPage {
  constructor(private page: Page) {}

  async expectLoggedIn() {
    const expectedText = `Hello ${USER_NAME}, you are already logged in. You can proceed to checkout.`;
    await expect(
      this.page.getByText(expectedText, { exact: true })
    ).toBeVisible();
  }

  async clickProceedToCheckout2() {
    await this.page.locator('[data-test="proceed-2"]').click();
  }

  async fillBillingAddress() {
    await this.page.getByLabel('State').fill('Test');
    await this.page.locator('[data-test="postal_code"]').pressSequentially('12345');
  }

  async clickProceedToCheckout3() {
    await this.page.locator('[data-test="proceed-3"]').click();
  }

  async selectPaymentMethod(method: PaymentMethod) {
    await this.page.selectOption('[data-test="payment-method"]', method);
  }

  async fillCreditCardDetails(details: {
    cardNumber: string;
    expiration: string;
    cvv: string;
    cardHolder: string;
  }) {
    await this.page.fill('#credit_card_number', details.cardNumber);
    await this.page.fill('#expiration_date', details.expiration);
    await this.page.fill('#cvv', details.cvv);
    await this.page.fill('#card_holder_name', details.cardHolder);
  }

  async fillCreditCardDetailsIn3Months() {
    const now = new Date();
    now.setMonth(now.getMonth() + 3);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year  = now.getFullYear();
    const expiration = `${month}/${year}`;

    await this.fillCreditCardDetails({
      cardNumber:  '1111-1111-1111-1111',
      expiration,
      cvv: '111',
      cardHolder: 'Test User',
    });
  }

  async confirmPaymentMethod() {
    await this.page.locator('[data-test="finish"]').click()
  }

  async expectPaymentSuccess() {
    await this.page.getByText('Payment was successful').waitFor({ timeout: 5000 });
  }
}
