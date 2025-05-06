import { InteractionHelper } from '../helpers/interaction-helper.ts';
import { wait } from '../helpers/wait-util.ts';

export class OrderCompletePage {
  private orderCompleteConfirmMessage = $(
    '//android.widget.TextView[@text="Checkout Complete"]'
  );

  async verifyOrderCompleteMessage(expectedMessage: string): Promise<string> {
    await wait.forElementEnabled(this.orderCompleteConfirmMessage);
    await InteractionHelper.verifyElementText(
      this.orderCompleteConfirmMessage,
      expectedMessage
    );
    return expectedMessage;
  }

  async getOrderNumber(): Promise<string> {
    await wait.forElementEnabled(this.orderCompleteConfirmMessage);
    const orderNumber = await this.orderCompleteConfirmMessage.getText();
    return orderNumber;
  }
}
