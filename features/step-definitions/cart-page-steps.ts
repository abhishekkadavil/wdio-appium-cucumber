import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('Proceed to checkout', async function (this: ScenarioContext) {
  await this.pages.cartPage.navigateToCheckoutPage();
});
