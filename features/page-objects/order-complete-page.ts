import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class OrderCompletePage {
  constructor(private interactionHelper: InteractionHelper) {}
  private orderCompleteConfirmMessage = $(
    '//android.widget.TextView[@text="Checkout Complete"]'
  );

  async verifyOrderCompleteMessage(expectedMessage: string) {
    await this.interactionHelper.verifyElementText(
      this.orderCompleteConfirmMessage,
      expectedMessage
    );
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.interactionHelper.getText(
      this.orderCompleteConfirmMessage
    );
    return orderNumber;
  }
}
