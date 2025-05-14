import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class OrderReviewPage {
  constructor(private interactionHelper: InteractionHelper) {}
  private placeOrderButton = $('~Place Order button');

  async completeOrderReview() {
    await this.interactionHelper.clickElement(this.placeOrderButton);
  }
}
