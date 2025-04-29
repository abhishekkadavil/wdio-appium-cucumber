import { Given, Then } from '@wdio/cucumber-framework';
import { DataReader } from '../utils/data-reader';
import { ScenarioContext } from '../utils/scenario-context';
import OrderCompletePage from '../page-objects/order-complete-page';

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
    const orderNumber = await OrderCompletePage.getOrderNumber();
    this.runtimeData[scenarioContextKey] = orderNumber;
    console.log('Saved Order Number:', orderNumber);
  }
);

Then(
  'I search for the created order from scenario context key {string}',
  async function (this: ScenarioContext, scenarioContextKey) {
    const orderNumber = this.runtimeData[scenarioContextKey];
    console.log('Using Order Number:', orderNumber);
  }
);
