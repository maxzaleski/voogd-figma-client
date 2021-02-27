/* eslint-disable no-console */
/* eslint-disable no-undef */
const { client, config } = require('../config');

const testName = 'Fetch document';

module.exports = () => {
  if (config.TEST_TOKEN) {
    test(testName, async () => {
      const document = await client.getDocument(config.TEST_FILE_KEY);
      return expect(document != null).toBe(true);
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
