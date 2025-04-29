class OrderReviewPage {
  private placeOrderButton = $('~Place Order button');

  async completeOrderReview() {
    await this.placeOrderButton.click();
  }
}

export default new OrderReviewPage();
