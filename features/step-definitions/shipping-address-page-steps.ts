import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then(
  'Provide shipment address and proceed to payment page',
  async function (this: ScenarioContext) {
    await this.pages.shippingAddressPage.fillShippingAddress(
      this.testData.shippingAddress.fullName,
      this.testData.shippingAddress.addressLane1,
      this.testData.shippingAddress.addressLane2,
      this.testData.shippingAddress.city,
      this.testData.shippingAddress.state,
      this.testData.shippingAddress.zip,
      this.testData.shippingAddress.country
    );
  }
);
