import { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';
import { wait } from '../helpers/wait-util.ts';

export class InteractionHelper {
  static async verifyElementText(
    element: ChainablePromiseElement,
    expectedText: string
  ) {
    await wait.forElementEnabled(element);
    const actualText = await element.getText();
    expect(actualText).to.equal(expectedText);
  }
}
