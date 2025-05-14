import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class PaymentPage {
  constructor(private interactionHelper: InteractionHelper) {}
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
    const isPaymentPageDisplayed = await this.fullName
      .isDisplayed()
      .catch(() => false);
    if (isPaymentPageDisplayed) {
      await this.interactionHelper.typeElement(this.fullName, fullName);
      await this.interactionHelper.typeElement(this.cardNumber, cardNumber);
      await this.interactionHelper.typeElement(this.cardExpDate, cardExpDate);
      await this.interactionHelper.typeElement(this.securityCode, securityCode);
      await this.interactionHelper.clickElement(this.reviewButton);
      await this.interactionHelper.clickElement(this.reviewButton);
    }
  }
}
