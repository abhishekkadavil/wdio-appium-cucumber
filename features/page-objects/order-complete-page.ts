// import { expect } from 'chai';
import { InteractionHelper } from '../helpers/interaction-helper';

class OrderCompletePage {
  private orderCompleteConfirmMessage = $(
    '//android.widget.TextView[@text="Checkout Complete"]'
  );

  async verifyOrderCompleteMessage(expectedMessage: string): Promise<string> {
    await InteractionHelper.verifyElementText(
      this.orderCompleteConfirmMessage,
      expectedMessage
    );
    return expectedMessage;
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.orderCompleteConfirmMessage.getText();
    return orderNumber;
  }
}

export default new OrderCompletePage();
