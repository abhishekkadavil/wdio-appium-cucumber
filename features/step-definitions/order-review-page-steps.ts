import { Then } from '@wdio/cucumber-framework';
import orderReviewPage from '../page-objects/order-review-page';

Then('Place order', async function () {
  await orderReviewPage.completeOrderReview();
});
