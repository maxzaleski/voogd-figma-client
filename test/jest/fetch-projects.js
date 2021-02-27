/* eslint-disable no-console */
/* eslint-disable no-undef */
const { client, config } = require('../config');

const testName = 'Fetch projects';

module.exports = () => {
  if (config.TEST_PROJECT_ID) {
    test(testName, async () => {
      const projects = client.getProjects(config.TEST_TEAMD_ID);
      return expect(projects != null).toBe(true);
    });
  } else {
    console.log(`Test "${testName}" was skipped.`);
  }
};
