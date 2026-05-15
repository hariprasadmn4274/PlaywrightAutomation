// @ts-check
const { defineConfig, chromium, devices, _android } = require('@playwright/test');

module.exports = defineConfig({

  //1.)Basics all these single key and value pasirs for individual test
  testDir: './tests',
  timeout: 30 * 1000,// timeout for overall test, by default 30 sec
  reporter: 'html',
  expect: {
    timeout: 5000// this is for assertion timeout.
  },
  retries:0,//if test fails , it will try 3 times untill it passes
 // workers:2,//only two testfiles will execute in parallel(workers= test files)




/*
//command to run tests using different project config
//1.) npx playwright test tests/15DataDrivenTestAndParameterization.spec.js --config playwright.config1.js

  use: {//share settings  for entire project
    headless: true,
    browserName: 'firefox',// firefox,webkit,you can metion any browser
    screenshot: 'off',//only-on-failure
    trace: 'on',//on, off, retain-on-failure
    video: 'retain-on-failure',
  },
  */

  //or
  //2.)keep multiple projects in same config file and use coomond below
  //npx playwright test tests/15DataDrivenTestAndParameterization.spec.js --config playwright.config1.js --project=executeInChrome

  projects:[
    {
      name:'executeInChrome',
      use: {
          headless: false,
          browserName: 'chromium',// firefox,webkit,you can metion any browser
          screenshot: 'on',//only-on-failure, off.  I will get all 3 screenshot,tace, video in html report itself
          trace: 'on',//on, off, retain-on-failure
          video: 'retain-on-failure',
        //  viewport:{width:720,height:720},//this make browser in this particular size ie responsiveness
        //  ...devices['Galaxy Note 3'],//u can use any mobile u want
          //permissions:['Geolocation'],// sometimes web page ask that google want to know ur location allow or deny
          ignoreHTTPSErrors:true,// to handle pages which has no ssl certification that https
        }
    },
    {
      
      name:'executeInFirfox',
      use: {
          headless: true,
          browserName: 'firefox',// firefox,webkit,you can metion any browser
          screenshot: 'off',//only-on-failure
          trace: 'on',//on, off, retain-on-failure
          video: 'retain-on-failure',
        },
    }
      
  ]

});

// by dafault test files executes in parallel and tests within one file will execute in sequence