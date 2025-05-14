import { InteractionHelper } from '../helpers/interaction-helper.ts';

export class LoginPage {
  constructor(private interactionHelper: InteractionHelper) {}

  private usernameField = $('~Username input field');
  private passwordField = $('~Password input field');
  private loginButton = $('~Login button');

  async login(username: string, password: string) {
    const isLoginScreenDisplayed = await this.usernameField
      .isDisplayed()
      .catch(() => false);

    if (isLoginScreenDisplayed) {
      await this.interactionHelper.typeElement(this.usernameField, username);
      await this.interactionHelper.typeElement(this.passwordField, password);
      await this.interactionHelper.clickElement(this.loginButton);
    } else {
      console.log('Already logged in. Skipping login.');
    }
  }
}
