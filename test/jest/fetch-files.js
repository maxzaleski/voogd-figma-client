/* eslint-disable no-console */
/* eslint-disable no-undef */
const { client, config } = require('../config');

const testName = 'Fetch files';

module.exports = () => {
  if (config.TEST_PROJECT_ID) {
    test(testName, async () => {
      const files = await client.getProjectFiles(config.TEST_PROJECT_ID);
      return expect(files != null).toBe(true);
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
