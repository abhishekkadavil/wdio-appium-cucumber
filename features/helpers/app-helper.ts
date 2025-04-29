export function getAppId(): string {
  const platformName = (
    driver.capabilities.platformName as string
  )?.toLowerCase();

  if (platformName === 'android') {
    return (driver.capabilities as any).appPackage as string;
  } else if (platformName === 'ios') {
    return (driver.capabilities as any).bundleId as string;
  } else {
    throw new Error('Unsupported platform for getAppId()');
  }
}

export async function safeCloseApp(): Promise<void> {
  const appId = getAppId();
  if (!appId) {
    console.warn('App ID not found. Skipping close.');
    return;
  }

  const maxRetries = 2; // Number of retries
  let attempt = 0;
  const timeout = 5000; // Timeout for terminateApp

  while (attempt < maxRetries) {
    try {
      console.log(`Trying to terminate app: ${appId} (Attempt ${attempt + 1})`);
      await driver.terminateApp(appId, { timeout }); // Attempt to terminate app
      console.log('App terminated successfully.');
      return; // Exit if successful
    } catch (error: unknown) {
      attempt++;
      // TypeScript needs to know the error is an instance of Error
      if (error instanceof Error) {
        console.warn(
          `Attempt ${attempt} to terminate app failed: ${error.message}`
        );
      } else {
        console.warn(
          `Attempt ${attempt} to terminate app failed with unknown error`
        );
      }

      // If we've reached the maximum number of retries, throw an error
      if (attempt >= maxRetries) {
        console.error('Max retries reached. App termination failed.');
        throw error; // Re-throw the error
      }

      console.log('Retrying to terminate app...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before retrying (optional)
    }
  }
}
