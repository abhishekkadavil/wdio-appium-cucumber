// run-sharded.ts
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { baseConfig } from './wdio.base.conf.ts';
import * as dotenv from 'dotenv';
import * as glob from 'glob';
import logger from './features/utils/logger.ts';

dotenv.config();

// Clean up any previous temp configs
glob.sync('./.temp.wdio.*.conf.cjs').forEach(fs.unlinkSync);

// Recursively find all feature files
const featureFiles = glob.sync('./features/**/*.feature');

// Devices list
const devices = [
  {
    name: 'emulator-5554',
    platformVersion: '14',
    port: 4723,
  },
  // {
  //   name: 'emulator-5555',
  //   platformVersion: '14',
  //   port: 4724,
  // },
  {
    name: 'nightwatch-android-11',
    platformVersion: '11',
    port: 4725,
  },
];

// Split feature files evenly across devices
function chunkArray<T>(arr: T[], chunkCount: number): T[][] {
  const result: T[][] = Array.from({ length: chunkCount }, () => []);
  arr.forEach((item, index) => result[index % chunkCount].push(item));
  return result;
}

const chunks = chunkArray(featureFiles, devices.length);

// Generate and run configs for each device
devices.forEach((device, i) => {
  const specs = chunks[i];
  if (!specs || specs.length === 0) {
    logger.warn(`[${device.name}] No specs to run. Skipping...`);
    return;
  }

  const wdioConfig = {
    ...baseConfig,
    specs,
    port: device.port,
    capabilities: [
      {
        platformName: 'Android',
        'appium:platformVersion': device.platformVersion,
        'appium:deviceName': device.name,
        'appium:app': path.join(process.cwd(), process.env.APP_PATH as string),
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': false,
      },
    ],
  };

  // Save config as .cjs to work with ES Modules
  const tempFile = `./.temp.wdio.${device.name}.conf.cjs`;
  fs.writeFileSync(
    tempFile,
    `exports.config = ${JSON.stringify(wdioConfig, null, 2)};`
  );

  // Run WebDriverIO with the generated config
  exec(`npx wdio ${tempFile}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`[${device.name}] Error:`, stderr);
    } else {
      console.log(`[${device.name}] Output:\n`, stdout);
    }

    // Clean up the temporary config
    fs.unlinkSync(tempFile);
  });
});

// log when ever there is an exception
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}\n${err.stack}`);
});

process.on('unhandledRejection', (reason: any) => {
  logger.error(
    `Unhandled Rejection: ${reason?.message || reason}\n${reason?.stack || ''}`
  );
});
