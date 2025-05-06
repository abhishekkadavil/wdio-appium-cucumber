import { wait } from '../helpers/wait-util.ts';

export class HomePage {
  private itemLocator(itemName: string) {
    return $(
      `//android.widget.TextView[@content-desc="store item text" and @text="${itemName}"]`
    );
  }

  async selectProduct(itemName: string) {
    const itemElement = this.itemLocator(itemName);
    await wait.forExist(itemElement);
    await wait.forElementEnabled(itemElement);
    await itemElement.click();
  }
}
