import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ProductDetailsPage {
  constructor(private interactionHelper: InteractionHelper) {}
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

  private productDesc = $('~product description');

  async addItemToCart(colorName: string, quantity: number) {
    // Select item color
    await this.interactionHelper.clickElement(this.itemColor(colorName));

    //increase quantity
    // Increase quantity
    for (let i = 1; i < quantity; i++) {
      await this.interactionHelper.clickElement(this.quantityAddButton);
    }

    //Add item to cart
    await this.interactionHelper.clickElement(this.addItemToCartButton);
  }

  async navigateToCartPage() {
    await await this.interactionHelper.clickElement(this.cartIcon);
  }

  async verifyProductDesc(expectedProductDesc: string) {
    await this.interactionHelper.verifyElementText(
      this.productDesc,
      expectedProductDesc
    );
  }
}
