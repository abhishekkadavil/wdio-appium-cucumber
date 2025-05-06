# WebdriverIO Appium Cucumber boilerplate

This is a boilerplate for Cucumber Appium webdriverIO for mobile APP automation

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
- [WebdriverIO](https://webdriver.io/docs/gettingstarted)
  - Created new project using `npm init wdio@latest . `. If you want to configure existing project then run `npx wdio config`.
- Cucumber - BDD support
- Allure Reporting `npm install @wdio/allure-reporter --save-dev`
  - Config in reporters section of [wdio.conf.ts](wdio.conf.ts)
  - `npm i allure-commandline` - generate html from allure result
  - Execute `npx report` defined in [package.json](package.json) to generate report
- `npm install dotenv` env management
- `npm install winston` for log
- `npm install moment-timezone` - timezone conversion for log
- Chai - Assertion

  - `npm install --save-dev chai`
  - `npm install --save-dev @types/chai`

#### Other packages to install

- `npm install --save-dev @wdio/types` - To use `$` in `$('~email')`

### Pre Check

**Appium**  
Check if appium is installed globally

- Appium version check - `appium -version`
- Run the installer - `appium-installer`
- https://inspector.appiumpro.com/
  - `appium --allow-cors` - Whether the Appium server should allow web browser connections from any host
- `appium -p 4722` - Run appium globally(need to run appium before running appium inspector)

**Appium inspector - To get the xpath of elements**

- Download from [Git repo](https://github.com/appium/appium-inspector)
  - Start appium server globally using `appium -p 4722`
  - Use [appium-inspector-config](appium-inspector-config) in appium inspector, Use port as `4722` in appium inspector before starting the server

**Appium doctor**

- install appium doctor - `npm i -g appium-doctor`
- to check appium version - `appium-doctor --version`
- to check requirement - `appium-doctor --android`

### Emulator

- Install android studio
- [Setup virtual device reference 1](https://www.youtube.com/watch?v=hKx_6VI53c8&list=PLQKDzuA2cCjrJeFQ2qUrS-5nN4LqYzoyq&index=4)
- [Setup virtual device reference 2](https://www.youtube.com/watch?v=jQFRgOI8-3o&list=PL9ok7C7Yn9A99LiTcemmKmupBdNB38bbo&index=2)

## Execution

- Run `npm run smoke` to execute tests through [package.json](package.json).(instead of smoke we can define any value in package.json)
- Run in parallel by executing `npm run test:sharded`
- Generate undefined steps using `npx cucumber-js ./features/feature-files/place-order.feature`
- Execute specif tags
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke and @login"`
  - `npx wdio run wdio.conf.ts --cucumberOpts.tagExpression="@smoke or @regression"`
- write spec report to file or execute `npm run spec`, if you want to append the spec log use `wdio run ./wdio.conf.ts >> logs/spec-output.log 2>&1` or `spec-append`

## Why

- Why WebdriverIO + Appium ? Why not something like Selenium + Appium
  - It’s faster to set up, more scalable for mobile testing, and has a much better DX if you're using JS/TS.
  - Selenium is web-focused; not optimized for mobile-first testing.
  - You don't manually manage the driver instance in the test code.
  - WebdriverIO internally manages the session and the driver(Both appium server and browser) for you — automatically per test, per session.
    - When you do: `await $('~username').setValue('some user');`.WebdriverIO automatically knows which driver/session to send the command to.
      You never need to explicitly pass the driver object around.

## How

### Test data

Test data is managed through json files. Below step is used to inject test data into the test.

```feature
Given The app is launched and test data loaded from '/place-order/scenario1.json'
```

[data-reader](features/utils/data-reader.ts) handles the test data reading logic.

### Context management

Contest management is done through [scenario-context](features/utils/scenario-context.ts) with help of [cucumber-js world](https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md). In scenario-context the test data will be stored and managed by `testData` and other data that shared between steps in a scenario are shared though `runtimeData`.

Page objects are also shared through [scenario-context](features/utils/scenario-context.ts).

**Here is how we share the data between steps**

```feature
# Save data in scenario context
Then Save order number in scenario context key 'orderNumber'

# Retrieve the saved data in scenario context
Then I search for the created order from scenario context key 'orderNumber'
```

## Reporting

For reporting we are using allure reporting. Report section of [wdio.conf.ts](wdio.conf.ts) is where we configure different report. In the current project we configured `spec` and `allure` reporting.

After the test execution we need to run `npm run report` to generate report. the spec reporting logs will be present in the [logs](logs) folder.

For opening the allure report we need a live server. We can use either live server plugin in vscode(right lick on the index.html -> open with live server) or we can use `npx http-server ./allure-report`.

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

Logs will be generated in [logs](logs) folder.

We are using winston for logging. Implementation is present in [logger.ts](features/utils/logger.ts). We can use the logger as below-

```ts
import logger from '../utils/logger';
Before(async () => {
  logger.info('Starting Scenario...');
});
```

Apart from the manual log, The framework will generate appium log, and spec reporting as well.

## Configuration

Configuration is done though [.env](.env) file. The data is initalised in staring of the execution in [wdio.conf.ts](wdio.conf.ts) by using below command

```ts
import * as dotenv from 'dotenv';
dotenv.config();
```

After that we use [env.ts](features/utils/env.ts) to load env data and use everywhere. usage eg: [wait-util.ts](features/helpers/wait-util.ts)

## Execution flow

### Pre test

Folder cleanup task will be done through [pre-test.ts](features/utils/pre-test.ts this is called before executing the test in [package.json](package.json). we have added pre script in every execution.

Apart from the webdriver hook we also have [cucumber hooks](features/step-definitions/hooks.ts) as well, which help to other before test after test tasks such as opening and closing the app gracefully.

Note: the app will open using [wdio.conf.ts](wdio.conf.ts) but using the cucumber hooks we can activate and close the app gracefully which will avoid unexpected behaviors.

### Execution

Execution will be start from [wdio.conf.ts](wdio.conf.ts).

- The [Test data](#test-data) will be injected to the test.
- The test data from json are stored in the [testData](features/utils/scenario-context.ts) and used across different steps of the test scenario.

### Platform specific

If there are any platform specif step we can execute that as below

```ts
Then('perform platform-specific action', async function () {
  const isAndroid = driver.isAndroid; //driver is defined, initialized and manged by webdriverIO
  const isIOS = driver.isIOS;

  if (isAndroid) {
    // Do Android-specific stuff
  } else if (isIOS) {
    // Do iOS-specific stuff
  }
});
```

If there are platform specific selectors we can manage those like below.

```ts
private get usernameField() {
    return driver.isAndroid
      ? $('~Username input field') // Android locator
      : $('-ios predicate string:label == "Username input field"'); // iOS locator
  }
```

Sometimes, driver.isAndroid and driver.isIOS may not behave as expected with older versions or certain setups. You can safely do:

```ts
const isAndroid =
  browser.capabilities.platformName?.toLowerCase() === 'android';
const isIOS = browser.capabilities.platformName?.toLowerCase() === 'ios';
```

### Retry

Handles in specFileRetries in [wdio.conf.ts](wdio.conf.ts)

### Parallel execution

If we have multiple devices we can configure them in capabilities section of [run-sharded.ts](run-sharded.ts) file. We can add multiple device there. If we have only one device we cannot execute tests in parallel. If we have one feature file all the test in the feature file will be executed by a device.
