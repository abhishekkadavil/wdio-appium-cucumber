import { Before, After } from '@wdio/cucumber-framework';
import { getAppId, safeCloseApp } from '../helpers/app-helper.ts';
import logger from '../utils/logger.ts';

Before(async (scenario) => {
  logger.info(`Running Scenario: ${scenario.pickle.name}`);

  const appId = getAppId();
  if (!appId) {
    console.warn('App ID not found. Skipping app reset.');
    return;
  }

  try {
    await driver.activateApp(appId);
    console.log('App activated successfully.');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to activate app: ${error.message}`);
    } else {
      console.error('Failed to activate app due to unknown error.');
    }
  }
});

After(async () => {
  logger.info('Ending Scenario...');

  // Safely close the app before starting
  await safeCloseApp();
});
