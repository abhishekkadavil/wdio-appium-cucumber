import { Then } from '@wdio/cucumber-framework';
import loginPage from '../page-objects/login-page';
import { ScenarioContext } from '../utils/scenario-context';

Then('login', async function (this: ScenarioContext) {
  await loginPage.login(
    this.testData.loginCredential.username,
    this.testData.loginCredential.password
  );
});
