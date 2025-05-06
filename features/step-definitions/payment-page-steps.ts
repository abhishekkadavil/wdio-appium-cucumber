import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then(
  'Provide payment info and proceed to review order',
  async function (this: ScenarioContext) {
    await this.pages.paymentPage.fillPaymentDetails(
      this.testData.payment.fullName,
      this.testData.payment.cardNumber,
      this.testData.payment.cardExpDate,
      this.testData.payment.securityCode
    );
  }
);
