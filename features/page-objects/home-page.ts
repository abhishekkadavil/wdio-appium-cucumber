class HomePage {
  private itemLocator(itemName: string) {
    return $(
      `//android.widget.TextView[@content-desc="store item text" and @text="${itemName}"]`
    );
  }

  async selectProduct(itemName: string) {
    const itemElement = this.itemLocator(itemName);
    await itemElement.click();
  }
}

export default new HomePage();
