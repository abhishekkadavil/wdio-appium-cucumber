import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context';
import productDetailPage from '../page-objects/product-detail-page';

Then('Add product to the cart', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await productDetailPage.addItemToCart(item.color, item.quantity);
  }
});

Then('navigate to the cart', async function () {
  await productDetailPage.navigateToCartPage();
});
