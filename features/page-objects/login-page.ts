class LoginPage {
  private usernameField = $('~Username input field');
  private passwordField = $('~Password input field');
  private loginButton = $('~Login button');

  async login(username: string, password: string) {
    const isLoginScreenDisplayed = await this.usernameField
      .isDisplayed()
      .catch(() => false);

    if (isLoginScreenDisplayed) {
      await this.usernameField.setValue(username);
      await this.passwordField.setValue(password);
      await this.loginButton.click();
    } else {
      console.log('Already logged in. Skipping login.');
    }
  }
}

export default new LoginPage();
