import { wait } from '../helpers/wait-util.ts';

export class CartPage {
  private proceedToCheckoutButton = $(
    `//android.widget.TextView[@text="Proceed To Checkout"]`
  );

  async navigateToCheckoutPage() {
    await wait.forElementEnabled(this.proceedToCheckoutButton);
    await this.proceedToCheckoutButton.click();
  }
}
