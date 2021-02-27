/* eslint-disable no-console */
/* eslint-disable no-undef */
const fs = require('fs-extra');
const { client, config } = require('../config');

const testName = 'Save images';

module.exports = (removedDir) => {
  if (config.TEST_FILE_KEY) {
    test(testName, async () => {
      const call = await client.exportAssets(config.TEST_FILE_KEY, {
        outDir: config.TEST_OUTDIR,
        format: 'PNG',
        assetRefs: config.TEST_ASSETS,
      });
      if (removedDir) await fs.remove(config.TEST_OUTDIR);
      return expect(call).toBe();
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
