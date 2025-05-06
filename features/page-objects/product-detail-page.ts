import { InteractionHelper } from '../helpers/interaction-helper.ts';
import { wait } from '../helpers/wait-util.ts';

export class ProductDetailsPage {
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
    const itemColor = this.itemColor(colorName);
    await wait.forElementEnabled(itemColor);
    await itemColor.click();

    //increase quantity
    // Increase quantity
    for (let i = 1; i < quantity; i++) {
      await wait.forElementEnabled(this.quantityAddButton);
      await this.quantityAddButton.click();
    }

    //Add item to cart
    await wait.forElementEnabled(this.addItemToCartButton);
    await this.addItemToCartButton.click();
  }

  async navigateToCartPage() {
    await wait.forElementEnabled(this.cartIcon);
    await this.cartIcon.click();
  }

  async verifyProductDesc(expectedProductDesc: string): Promise<string> {
    await InteractionHelper.verifyElementText(
      this.productDesc,
      expectedProductDesc
    );
    return expectedProductDesc;
  }
}
