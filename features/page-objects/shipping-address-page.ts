import { wait } from '../helpers/wait-util.ts';
import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class ShippingAddressPage {
  constructor(private interactionHelper: InteractionHelper) {}
  private fullName = $('~Full Name* input field');
  private addressLane1 = $('~Address Line 1* input field');
  private addressLane2 = $('~Address Line 2 input field');
  private city = $('~City* input field');
  private state = $('~State/Region input field');
  private zip = $('~Zip Code* input field');
  private country = $('~Country* input field');
  private toPaymentButton = $('~To Payment button');

  async fillShippingAddress(
    fullName: string,
    addressLane1: string,
    addressLane2: string,
    city: string,
    state: string,
    zip: string,
    country: string
  ) {
    await wait.forElementEnabled(this.fullName);
    const isShippingAddressPageDisplayed = await this.fullName
      .isDisplayed()
      .catch(() => false);
    if (isShippingAddressPageDisplayed) {
      await this.interactionHelper.typeElement(this.fullName, fullName);
      await this.interactionHelper.typeElement(this.addressLane1, addressLane1);
      await this.interactionHelper.typeElement(this.addressLane2, addressLane2);
      await this.interactionHelper.typeElement(this.city, city);
      await this.interactionHelper.typeElement(this.state, state);
      await this.interactionHelper.typeElement(this.zip, zip);
      await this.interactionHelper.typeElement(this.country, country);

      await this.interactionHelper.clickElement(this.toPaymentButton);
    }
  }
}
