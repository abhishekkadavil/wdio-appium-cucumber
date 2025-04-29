import { Then } from '@wdio/cucumber-framework';
import orderCompletePage from '../page-objects/order-complete-page';

Then(
  'Order should be placed successfully with message {string}',
  async function (orderCommpleteMessage: string) {
    await orderCompletePage.verifyOrderCompleteMessage(orderCommpleteMessage);
  }
);
