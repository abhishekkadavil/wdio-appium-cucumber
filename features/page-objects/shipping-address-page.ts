import { wait } from '../helpers/wait-util.ts';

export class ShippingAddressPage {
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
      await wait.forElementEnabled(this.fullName);
      await this.fullName.setValue(fullName);

      await wait.forElementEnabled(this.addressLane1);
      await this.addressLane1.setValue(addressLane1);

      await wait.forElementEnabled(this.addressLane2);
      await this.addressLane2.setValue(addressLane2);

      await wait.forElementEnabled(this.city);
      await this.city.setValue(city);

      await wait.forElementEnabled(this.state);
      await this.state.setValue(state);

      await wait.forElementEnabled(this.zip);
      await this.zip.setValue(zip);

      await wait.forElementEnabled(this.country);
      await this.country.setValue(country);

      await wait.forElementEnabled(this.toPaymentButton);
      await this.toPaymentButton.click();
    }
  }
}
