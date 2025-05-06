import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('Place order', async function (this: ScenarioContext) {
  await this.pages.orderReviewPage.completeOrderReview();
});
