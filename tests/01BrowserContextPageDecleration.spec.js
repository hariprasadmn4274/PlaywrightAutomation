/* 
1.just one commond to set up playwright, after setting up envi variable path.
   npm init playwright

2.Run commonds
    1.npx playwright test
    2.npx playwright test --headed,  npx playwright test --headedless
    3.npx playwright test --project=chromium
    4.npx playwright test tests/UIBasicComponents.spec.js
    5.npx playwright show-report
    6.type1:Using playwright inspector: works only for web/ui related elements and code
        npx playwright test --debug 
      type2:using vs code debuger: can debug js code 
        step: keep test which u want to debug in script like below in config.js
        "scripts": {
            "test": "npx playwright test tests/08ApiUtilsScriptRefactoring.spec.js",}
        step: shift+cntl+p --> choose debug npm script


    Playwright UI test runner
    7.npx playwright test --ui
*/
const {test, expect}= require('@playwright/test')

test.only('Browser context decleration playwright test', async ({ browser }) => {

    const context = await browser.newContext(); // you can pass proxy, cookies as parameters to newContext() method.
    const page = await context.newPage(); // you can pass proxy, cookies as parameters to newPage() method.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

});

test.only('Page playwright test',async({page})=>{

    //by deafault playwright will create context.
    await page.goto('https://www.google.com/')

    //title - assertion
    console.log(await page.title())
    await expect(page).toHaveTitle('Google')

})