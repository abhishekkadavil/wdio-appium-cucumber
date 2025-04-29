class CartPage {
  private proceedToCheckoutButton = $(
    `//android.widget.TextView[@text="Proceed To Checkout"]`
  );

  async navigateToCheckoutPage() {
    await this.proceedToCheckoutButton.click();
  }
}

export default new CartPage();
