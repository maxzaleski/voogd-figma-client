/**
 * @fileoverview
 * This files contains all the variables used globaly accross all tests.
 *
 * Test file:
 * https://www.figma.com/file/m0q78UuWxbEQcBMPDH90hQ/Voogd-Figma-Test-File?node-id=0%3A1
 */

const { Client } = require('../lib/voogd-figma-1.3.3.min.js');

const config = {
  TEST_FILE_KEY: 'm0q78UuWxbEQcBMPDH90hQ',
  TEST_TOKEN: '',
  TEST_STYLES_FILE_KEY: '',
  TEST_TEAMD_ID: '',
  TEST_PROJECT_ID: 0,
  TEST_ASSETS: [
    {
      exportAs: 'test1',
      id: '1:9',
    },
    {
      exportAs: 'test2',
      id: '1:10',
    },
    {
      exportAs: 'test3',
      id: '1:11',
    },
  ],
  TEST_OUTDIR: 'test/EXPORTED',
};

module.exports = {
  client: new Client(config.TEST_TOKEN),
  config,
};
