import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('Select the product', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await this.pages.homePage.selectProduct(item.name);
  }
});
