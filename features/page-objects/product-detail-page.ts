class ProductDetailsPage {
  private itemColor(colorName: string) {
    return $(
      `//android.view.ViewGroup[@content-desc="${colorName} circle"]/android.view.ViewGroup`
    );
  }
  private quantityAddButton = $(
    `//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView`
  );
  private addItemToCartButton = $(
    `//android.widget.TextView[@text="Add To Cart"]`
  );

  private cartIcon = $(
    `//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.ImageView`
  );

  async addItemToCart(colorName: string, quantity: number) {
    // Select item color
    const itemColor = this.itemColor(colorName);
    await itemColor.click();

    //increase quantity
    // Increase quantity
    for (let i = 1; i < quantity; i++) {
      await this.quantityAddButton.click();
    }

    //Add item to cart
    await this.addItemToCartButton.click();
  }

  async navigateToCartPage() {
    await this.cartIcon.click();
  }
}

export default new ProductDetailsPage();
