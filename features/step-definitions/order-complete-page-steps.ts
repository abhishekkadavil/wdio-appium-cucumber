import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then(
  'Order should be placed successfully with message {string}',
  async function (this: ScenarioContext, orderCompleteMessage: string) {
    await this.pages.orderCompletePage.verifyOrderCompleteMessage(
      orderCompleteMessage
    );
  }
);
