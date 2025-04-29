import { Then } from '@wdio/cucumber-framework';
import HomePage from '../page-objects/home-page';
import { ScenarioContext } from '../utils/scenario-context';

Then('Select the product', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await HomePage.selectProduct(item.name);
  }
});
