import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class CartPage {
  constructor(private interactionHelper: InteractionHelper) {}
  private proceedToCheckoutButton = $(
    `//android.widget.TextView[@text="Proceed To Checkout"]`
  );

  async navigateToCheckoutPage() {
    await this.interactionHelper.clickElement(this.proceedToCheckoutButton);
  }
}
