import { ChainablePromiseElement } from 'webdriverio';
import { expect } from 'chai';
import { wait } from '../helpers/wait-util.ts';
import allure from '@wdio/allure-reporter';

export class InteractionHelper {
  async verifyElementText(
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

  async typeElement(element: ChainablePromiseElement, input: string) {
    try {
      await wait.forElementEnabled(element);
      await element.setValue(input);
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in typeElement: ${ex}`);
    }
  }

  async clickElement(element: ChainablePromiseElement) {
    try {
      await wait.forElementEnabled(element);
      await element.click();
      return element;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in clickElement: ${ex}`);
    }
  }

  async getText(element: ChainablePromiseElement): Promise<string> {
    try {
      await wait.forElementEnabled(element);
      const textValue = await element.getText();
      return textValue;
    } catch (ex) {
      console.error('***** Error Occurred *****', ex);
      throw new Error(`Error in getText: ${ex}`);
    }
  }
}
