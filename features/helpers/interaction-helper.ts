import { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';

export class InteractionHelper {
  static async verifyElementText(
    element: ChainablePromiseElement,
    expectedText: string
  ) {
    const actualText = await element.getText();
    expect(actualText).to.equal(expectedText);
  }
}
