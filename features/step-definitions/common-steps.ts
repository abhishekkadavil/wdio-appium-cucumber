import { Given, Then } from '@wdio/cucumber-framework';
import { DataReader } from '../utils/data-reader.ts';
import { ScenarioContext } from '../utils/scenario-context.ts';
import logger from '../utils/logger.ts';

Given(
  'The app is launched and test data loaded from {string}',
  async function (this: ScenarioContext, testDataPath) {
    // read test data
    const testDataReader: DataReader = new DataReader();
    this.testData = testDataReader.readJSON(testDataPath);
  }
);

Then(
  'Save order number in scenario context key {string}',
  async function (this: ScenarioContext, scenarioContextKey) {
    const orderNumber = await this.pages.orderCompletePage.getOrderNumber();
    this.runtimeData[scenarioContextKey] = orderNumber;
    logger.info('Saved Order Number:', orderNumber);
  }
);

Then(
  'I search for the created order from scenario context key {string}',
  async function (this: ScenarioContext, scenarioContextKey) {
    const orderNumber = this.runtimeData[scenarioContextKey];
    logger.info('Using Order Number:', orderNumber);
  }
);

Then('perform platform-specific action', async function () {
  const isAndroid = driver.isAndroid;
  const isIOS = driver.isIOS;

  if (isAndroid) {
    // Do Android-specific stuff
  } else if (isIOS) {
    // Do iOS-specific stuff
  }
});
