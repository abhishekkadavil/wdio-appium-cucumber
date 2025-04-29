import { Then } from '@wdio/cucumber-framework';
import cartPage from '../page-objects/cart-page';

Then('Proceed to checkout', async function () {
  await cartPage.navigateToCheckoutPage();
});
