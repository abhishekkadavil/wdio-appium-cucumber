import { Then } from '@wdio/cucumber-framework';
import { ScenarioContext } from '../utils/scenario-context.ts';

Then('login', async function (this: ScenarioContext) {
  await this.pages.loginPage.login(
    this.testData.loginCredential.username,
    this.testData.loginCredential.password
  );
});
