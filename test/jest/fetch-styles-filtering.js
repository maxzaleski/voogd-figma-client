/* eslint-disable no-console */
/* eslint-disable no-undef */
const { client, config } = require('../config');

const testName = 'Fetch styles with filtering';

module.exports = () => {
  const { TEST_TEAMD_ID } = config;
  const { TEST_STYLES_FILE_KEY } = config;
  if (TEST_TEAMD_ID) {
    test(testName, async () => {
      const styles = await client.getTeamStyles(TEST_TEAMD_ID, [
        TEST_STYLES_FILE_KEY,
      ]);
      return expect(!!styles.length).toBe(true);
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
