/* eslint-disable no-console */
/* eslint-disable no-undef */
const { client, config } = require('../config');

const testName = 'Fetch styles (no filtering)';

module.exports = () => {
  if (config.TEST_TEAMD_ID) {
    test(testName, async () => {
      const styles = await client.getTeamStyles(config.TEST_TEAMD_ID);
      return expect(!!styles.length).toBe(true);
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
