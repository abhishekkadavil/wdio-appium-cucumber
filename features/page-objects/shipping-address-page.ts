class ShippingAddressPage {
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
    const isShippingAddressPageDisplayed = await this.fullName
      .isDisplayed()
      .catch(() => false);
    if (isShippingAddressPageDisplayed) {
      await this.fullName.setValue(fullName);
      await this.addressLane1.setValue(addressLane1);
      await this.addressLane2.setValue(addressLane2);
      await this.city.setValue(city);
      await this.state.setValue(state);
      await this.zip.setValue(zip);
      await this.country.setValue(country);
      await this.toPaymentButton.click();
    }
  }
}

export default new ShippingAddressPage();
