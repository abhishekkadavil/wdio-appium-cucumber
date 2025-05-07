import { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';
import { wait } from '../helpers/wait-util.ts';
import allure from '@wdio/allure-reporter';

export class InteractionHelper {
  static async verifyElementText(
    element: ChainablePromiseElement,
    expectedText: string
  ) {
    await wait.forElementEnabled(element);
    const actualText = await element.getText();

    try {
      expect(actualText).to.equal(expectedText);

      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `PASS: verifyElementText - '${expectedText}'`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    } catch (error) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        `FAIL: verifyElementText - Expected '${expectedText}', got '${actualText}'`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
      throw error; // re-throw so test still fails
    }
  }
}
