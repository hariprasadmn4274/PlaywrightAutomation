const {test, expect} =require('@playwright/test')

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