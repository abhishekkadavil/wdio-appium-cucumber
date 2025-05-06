import { wait } from '../helpers/wait-util.ts';

export class OrderReviewPage {
  private placeOrderButton = $('~Place Order button');

  async completeOrderReview() {
    await wait.forElementEnabled(this.placeOrderButton);
    await this.placeOrderButton.click();
  }
}
