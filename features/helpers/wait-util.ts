import { ChainablePromiseElement } from 'webdriverio';
import { EnvConfig } from '../utils/env.ts';

// Waits until the element is displayed.
export async function waitForElementDisplayed(
  elementPromise: ChainablePromiseElement,
  timeout: number = EnvConfig.ELEMENT_WAIT_TIMEOUT,
  timeoutMsg?: string
): Promise<void> {
  const element = await elementPromise;

  await element.waitForDisplayed({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not displayed after ${timeout}ms`,
  });
}

// Waits until the element is not displayed (e.g., disappears).
export async function waitForElementHidden(
  elementPromise: ChainablePromiseElement,
  timeout: number = Number(EnvConfig.ELEMENT_WAIT_TIMEOUT),
  timeoutMsg?: string
): Promise<void> {
  const element = await elementPromise;

  await element.waitForDisplayed({
    reverse: true,
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} still displayed after ${timeout}ms`,
  });
}

// Waits until the element exists in the DOM.
export async function waitForElementExist(
  elementPromise: ChainablePromiseElement,
  timeout: number = Number(EnvConfig.ELEMENT_WAIT_TIMEOUT),
  timeoutMsg?: string
): Promise<void> {
  const element = await elementPromise;

  await element.waitForExist({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not existing after ${timeout}ms`,
  });
}

// Waits until the element no longer exists in the DOM.
export async function waitForElementNotExist(
  elementPromise: ChainablePromiseElement,
  timeout: number = Number(EnvConfig.ELEMENT_WAIT_TIMEOUT),
  timeoutMsg?: string
): Promise<void> {
  const element = await elementPromise;

  await element.waitForExist({
    reverse: true,
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} still exists after ${timeout}ms`,
  });
}

// Waits until the element becomes enabled (intractable).
export async function waitForElementEnabled(
  elementPromise: ChainablePromiseElement,
  timeout: number = Number(EnvConfig.ELEMENT_WAIT_TIMEOUT),
  timeoutMsg?: string
): Promise<void> {
  const element = await elementPromise;

  await element.waitForEnabled({
    timeout,
    timeoutMsg:
      timeoutMsg ||
      `Element ${element.selector} not enabled after ${timeout}ms`,
  });
}

export const wait = {
  forDisplayed: waitForElementDisplayed,
  forElementHidden: waitForElementHidden,
  forExist: waitForElementExist,
  forElementNotExist: waitForElementNotExist,
  forElementEnabled: waitForElementEnabled,
};
