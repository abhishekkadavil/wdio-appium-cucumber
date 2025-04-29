import { Then } from '@wdio/cucumber-framework';
import paymentPage from '../page-objects/payment-page';
import { ScenarioContext } from '../utils/scenario-context';

Then(
  'Provide payment info and proceed to review order',
  async function (this: ScenarioContext) {
    await paymentPage.fillPaymentDetails(
      this.testData.payment.fullName,
      this.testData.payment.cardNumber,
      this.testData.payment.cardExpDate,
      this.testData.payment.securityCode
    );
  }
);
