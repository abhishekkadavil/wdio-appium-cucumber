import { wait } from '../helpers/wait-util.ts';

export class PaymentPage {
  private fullName = $('~Full Name* input field');
  private cardNumber = $('~Card Number* input field');
  private cardExpDate = $('~Expiration Date* input field');
  private securityCode = $('~Security Code* input field');
  private reviewButton = $('~Review Order button');

  async fillPaymentDetails(
    fullName: string,
    cardNumber: string,
    cardExpDate: string,
    securityCode: string
  ) {
    await wait.forElementEnabled(this.fullName);
    await wait.forElementEnabled(this.cardNumber);
    await wait.forElementEnabled(this.cardExpDate);
    await wait.forElementEnabled(this.securityCode);
    await wait.forElementEnabled(this.reviewButton);

    const isPaymentPageDisplayed = await this.fullName
      .isDisplayed()
      .catch(() => false);
    if (isPaymentPageDisplayed) {
      await this.fullName.setValue(fullName);
      await this.cardNumber.setValue(cardNumber);
      await this.cardExpDate.setValue(cardExpDate);
      await this.securityCode.setValue(securityCode);
      await this.reviewButton.click();
      await this.reviewButton.click();
    }
  }
}
