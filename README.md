# WebdriverIO Appium Cucumber boilerplate

This is a boilerplate for cucumber appium webdriverIO for mobile APP automation

## Plugin Needed

- Prettier for formatting
  - ctrl + , -> search `singleQuote` enable singleQuote of prettier
- Live Server - for allure report opening we can do the same with `npx http-server ./allure-report` as well
- Cucumber (Gherkin) Full Support
  - ctrl + , -> will open the vs code user defined settings search for cucumber -> and edit the settings file - add cucumber.features, cucumber.glue paths

```json
"cucumber.features": [
   "features/feature-files/*.feature",
	],
	"cucumber.glue": [
   "features/step-definitions/*.ts",
	],
   "cucumberautocomplete.steps": [
        "features/step-definitions/*.ts",
    ],

```

## Sample APPs

- https://github.com/saucelabs/my-demo-app-rn
- https://github.com/saucelabs/sample-app-mobile
- https://github.com/webdriverio/native-demo-app

## Tools used

- [Appium](https://appium.io/docs/en/latest/) - Need to install locally and globally through npm
  - `npm install --save-dev appium` - Install locally(Needed to install locally since we want the app to be launched when the tests are executing)
  - `npm install -g appium` - Install globally(Needed to install globally if we want to use with appium inspector)
- Appium inspector - To get the xpath of elements
  - Download from [Git repo](https://github.com/appium/appium-inspector)
  - Start appium server globally using `appium -p 4724`
  - Use [appium-inspector-config](appium-inspector-config.json) in appium inspector, Use port as `4724` in appium inspector before starting the server
- [WebdriverIO](https://webdriver.io/docs/gettingstarted)
  - Created new project using `npm init wdio@latest . `. If you want to configure existing project then run `npx wdio config`.
- Cucumber - BDD support
- Allure Reporting `npm install @wdio/allure-reporter --save-dev`
  - Config in reporters section of [wdio.conf.ts](wdio.conf.ts)
  - `npm i allure-commandline` - generate html from allure result
  - Execute `npx report` defined in [package.json](package.json) to generate report
- `npm install dotenv` env management
- `npm install winston` for log
- Chai - Assertion

  - `npm install --save-dev chai`
  - `npm install --save-dev @types/chai`

#### Other packages to install

- `npm install --save-dev @wdio/types` - To use `$` in `$('~email')`

### Appium configuration

- Appium version check - `appium -version`
- Run the installer - `appium-installer`
- https://inspector.appiumpro.com/
  - `appium --allow-cors` - Whether the Appium server should allow web browser connections from any host

**Appium doctor**

- install appium doctor - `npm i -g appium-doctor`
- to check appium version - `appium-doctor --version`
- to check requirement - `appium-doctor --android`

### Emulator

- Install android studio
- [Setup virtual device reference 1](https://www.youtube.com/watch?v=hKx_6VI53c8&list=PLQKDzuA2cCjrJeFQ2qUrS-5nN4LqYzoyq&index=4)
- [Setup virtual device reference 2](https://www.youtube.com/watch?v=jQFRgOI8-3o&list=PL9ok7C7Yn9A99LiTcemmKmupBdNB38bbo&index=2)

## Execution

- Run `npx wdio run serenity.conf.ts` to execute tests
- Run in parallel by configuring `maxInstances` in [dio.conf.ts](wdio.conf.ts)
- Generate undefined steps using `npx cucumber-js ./features/feature-files/place-order.feature`
- Execute specif tags
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke and @login"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke or @regression"`
- Execute through [package.json](package.json)
  - npm run `npm run test`
- `npx wdio run ./wdio.conf.ts > logs/spec-output.log 2>&1` - write spec report to file or execute `npm run spec`, if you want to append the spec log use `wdio run ./wdio.conf.ts >> logs/spec-output.log 2>&1` or `spec-append`

## Why

- Why WebdriverIO + Appium ? Why not something like Selenium + Appium
  - It’s faster to set up, more scalable for mobile testing, and has a much better DX if you're using JS/TS.
  - Selenium is web-focused; not optimized for mobile-first testing.
  - You don't manually manage the driver instance in the test code.
  - WebdriverIO internally manages the session and the driver(Both appium server and browser) for you — automatically per test, per session.
    - When you do: `await $('~username').setValue('some user');`.WebdriverIO automatically knows which driver/session to send the command to.
      You never need to explicitly pass the driver object around.

## How

**Object management**

- Unlike languages like java we don't need to manage objects in TS. Classes like [login-page.ts](features/page-objects/login-page.ts) uses `export default new LoginPage();` export class. It creates only one object when the file is first imported. -> Then Node.js caches the module (the object). -> All future imports will reuse the same object — no new new LoginPage() happens automatically. Unlike java `new` will not create new objects. Even if import multiple times it will use the same object.

```ts
import loginPage from './LoginPage'; // same object (cached)
import loginPageAgain from './LoginPage'; // still same object
```

Even though pages are a shared instance, each test uses its own independent Appium or browser session context when calling method like `.setValue(username)`. No need to worry about object management.

If we export the class like `export { HomePage };` and use `const homePage = new HomePage();` to create object, this will create new object every time.

## Test data

Test data is managed through json files. Below step is used to inject test data into the test.

```feature
Given The app is launched and test data loaded from '/place-order/scenario1.json'
```

[data-reader](features/utils/data-reader.ts) handles the test data reading logic.

## Context management

Contest management is done through [scenario-context](features/utils/scenario-context.ts) with help of [cucumber-js world](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md). In scenario-context the test data will be stored and managed by `testData` and other data that shared between steps in a scenario are shared though `runtimeData`.

**Here is how we share the data between steps**

```feature
# Save data in scenario context
Then Save order number in scenario context key 'orderNumber'

# Retrieve the saved data in scenario context
Then I search for the created order from scenario context key 'orderNumber'
```

## Reporting

For reporting we are using allure reporting. For opening allure report we need a live server. We can use either live server plugin in vscode(right lick on the index.html -> open with live server) or we can use `npx http-server ./allure-report`. Report section of [wdio.conf.ts](wdio.conf.ts) is where we configure different report. In the current project we configured `spec` and `allure` reporting.

Screenshots are added in `afterStep` of [wdio.conf.ts hooks](wdio.conf.ts). There is no particular reason for using [wdio.conf.ts hooks](wdio.conf.ts) instead of [cucumber hooks](features/step-definitions/hooks.ts).

We can test info like below - [Reference](https://webdriver.io/docs/allure-reporter#supported-allure-api).

```ts
import allureReporter from '@wdio/allure-reporter';

Then('Select the product', async function (this: ScenarioContext) {
  for (const item of this.testData.items) {
    await HomePage.selectProduct(item.name);
  }
  allureReporter.addFeature('Feature_name');
  allureReporter.addStory('Story_name');
});
```

## Log

We are using winston for logging. Implementation is present in [logger.ts](features/utils/logger.ts). We can use the logger as below-

```ts
import logger from '../utils/logger';
Before(async () => {
  logger.info('Starting Scenario...');
});
```

## Configuration

Configuration is done though [.env](.env) file.

## Execution flow

**Pre test**
Folder cleanup task woll be done through `before` of [wdio.conf.ts hooks](wdio.conf.ts). Apart from the webdriver hook we also have [cucumber hooks](features/step-definitions/hooks.ts) as well which help to other before test after test tasks.

**Execution**
Execution will be start from [wdio.conf.ts](wdio.conf.ts).

- The [Test data](#test-data) will be injected to the test.
- The test data from json are stored in the [testData](features/utils/scenario-context.ts) and used across different steps of the test scenario.

**Parallel execution**
If we have multiple devices we can configure them in capabilities section of [wdio.conf.ts](wdio.conf.ts) file. ew can add multiple device there. If we have only one device we cannot execute tests in parallel.
