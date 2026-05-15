import {test, expect} from '@playwright/test'

test("More validations",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await page.goto("http://google.com/")
    //going back to rahulshettyacademy.com/AutomationPractice/ page
    await page.goBack();
    //going to google page
    await page.goForward();
    await page.goBack();
    //assertion checking visisble or not
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    //aseetion checking element is hidden or not
    await expect(page.locator("#displayed-text")).toBeHidden();

    //web popup are normal popup where we get css locators for clicking ok or cancel
    //1.)java Dialog: we are just informing page that anywhere in the page if 'dialog' event occurs, just accept it.(means clicks ok): using on() method
    page.on('dialog',dialog=>dialog.accept());// .dismiss() , to reject/cancel
    await page.locator("#confirmbtn").click();

    //2.)mouse hover 
    await page.locator("#mousehover").hover();

    //3.)iFrame: are child frame(page) within parent frame.
    //iframe will be with tagname-> iframe/frameset.  always choose locator iframe id or name ->best
    const iframe=page.frameLocator("#courses-iframe");//not ferforming any action , just collecting iframe location
    //we could see only one element with below locator but it says two elements are there, so other one is hidden, just inform playwright to consider only visible element by mentioning :visible in licator
    await iframe.locator('li [href="lifetime-access"]:visible').click();
    const subscriberstext=await iframe.locator(".text h2").textContent();
    console.log(subscriberstext.split(" ")[1])

})


test("screenshots ",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    //1.take screen shot on element level
    await page.locator("#displayed-text").screenshot({path:'elementScreenshot.png'})
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    //take screenshot on page level
    await page.screenshot({path: "screenshot.png"})
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test("screenshots and visual testing",async({page})=>{

    await page.goto("https://www.google.co/")
    //screenshot1 (expected)--> compare with-->screenshot2(actual) =if any cahnges in screenshot elignment,fixel,letter gives test fail
     expect(await page.screenshot()).toMatchSnapshot({path:'hompage.png'})
})