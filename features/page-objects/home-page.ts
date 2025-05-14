import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class HomePage {
  constructor(private interactionHelper: InteractionHelper) {}
  private itemLocator(itemName: string) {
    return $(
      `//android.widget.TextView[@content-desc="store item text" and @text="${itemName}"]`
    );
  }

  async selectProduct(itemName: string) {
    this.interactionHelper.clickElement(this.itemLocator(itemName));
  }
}
