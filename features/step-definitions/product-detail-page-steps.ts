import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('Add product to the cart', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await this.pages.productDetailsPage.addItemToCart(
      item.color,
      item.quantity
    );
  }
});

Then('navigate to the cart', async function (this: ScenarioContext) {
  await this.pages.productDetailsPage.navigateToCartPage();
});

Then(
  'Validate the product description as {string}',
  async function (this: ScenarioContext, productDesc: string) {
    await this.pages.productDetailsPage.verifyProductDesc(productDesc);
  }
);
