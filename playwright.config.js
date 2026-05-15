// @ts-check
const { defineConfig, chromium } = require('@playwright/test');

module.exports = defineConfig({//this setting will apply entire project

  //1.)Basics all these single key and value pasirs for individual test
  testDir: './tests',
  timeout: 20 * 1000,// timeout for overall test, by default 30 sec
  reporter: 'html',
  expect: {
    timeout: 5000// this is for assertion timeout.
  },


  use: {//where every single test case will consume
    headless: false,
    browserName: 'chromium',// webkit,you can metion any browser
    screenshot: 'off',//only-on-failure
    trace: 'on',//on, off, retain-on-failure
    video: 'retain-on-failure',
  },
});


/* or
const config=({


})
module.export=config
*/