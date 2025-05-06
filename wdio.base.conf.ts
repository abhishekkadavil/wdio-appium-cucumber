/// <reference types="@wdio/globals/types" />

import allure from '@wdio/allure-reporter';

// wdio.base.conf.ts
export const baseConfig = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ['./features/**/*.feature'],
  maxInstances: 10,
  logLevel: 'info',
  services: [
    [
      'appium',
      {
        logPath: './logs/appium-logs.log',
      },
    ],
  ],
  framework: 'cucumber',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
      },
    ],
  ],
  cucumberOpts: {
    require: [
      './features/step-definitions/**/*.ts',
      './features/utils/scenario-context.ts',
    ],
    timeout: 60000,
  },
  afterStep: async (
    _step: unknown,
    _scenario: unknown,
    result: { error?: Error },
    _context: unknown
  ) => {
    if (result?.error) {
      const screenshot = await (
        browser as WebdriverIO.Browser
      ).takeScreenshot();
      allure.addAttachment(
        'Screenshot on Failure',
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    }
  },
};
