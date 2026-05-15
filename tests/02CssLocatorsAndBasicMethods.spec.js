/*
1.)if id is present
css-> #idValue (or) tagname#idValue

2.)if class is present
css-> .classValue (or) tagname.classValue

3.)write css based on any atrribute
css-> [attribute='value'] 

    if want to use partial attribute value
     [attribute*='partialvalue']   ex:[style*='block']

4.)write css with traversing from parent to child
css-> parenttagname >> childtagname (or) parentcss >> childcss (or) parenttagname >> childcss (or) parentcss >> childtagname

5.)write css based on text
css-> text='textvalue'

    playwright has given one way two twite locator based text with tagname
    tagname:has-text('textvalue')

*/

const{test,expect}=require('@playwright/test')

test('validate error message after login with invalid credentials',async({page})=>{
    const username=page.locator('#username')
    const password=page.locator('#password')
    const submitbutton=page.locator('#signInBtn')
    const loginError=page.locator("[style*='block']")
    const cardTitles=page.locator('.card-title>>a')

    //by deafault playwright will create context.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await username.fill('username');
    await password.fill('password');
    await submitbutton.click();

    //await expect(page.getByText('Incorrect username/password.')).toHaveText('Incorrect username/password.')

    //extract text from locator
    console.log(await loginError.textContent())
    await expect(loginError).toContainText('username/password')
                // // const siteId = await page.locator('#field_sitesReaIdentifier').getAttribute('value');
                // // console.log("Site ID: " + siteId);
                // const siteId = await page.locator('#field_sitesReaIdentifier').inputValue();
                // console.log("Site ID: " + siteId);
    // with valid login
    await username.fill('rahulshettyacademy');//fill()-> will erase and type new text. type()-> will just type text.
    await password.fill('learning');
    await submitbutton.click();

    //extract one element/text from multiple elements/text(list)
    console.log(await cardTitles.nth(0).textContent())
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(2).textContent())


    //extract all elements
    console.log(await cardTitles.allTextContents())
    //some times above one may return array of 0 elements bcs allTextContents() method has no auto wait cmpared to textContent()
    console.log(await cardTitles.nth(0).textContent())
    console.log(await cardTitles.allTextContents())
   


})

test('Dynamic wait ,assignment 1', async({page})=>{
    const email=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const login=page.locator('#login')
    const cardTitles=page.locator('div>>h5>>b')

    await page.goto('https://rahulshettyacademy.com/client/')
    await email.fill('hariprasadreddy1@gmail.com');
    await password.fill('Hariprasad1');
    await login.click()

    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash')

    //dynamic wait, until all network calls are done and comes to idle state
    await page.waitForLoadState('networkidle'); 
    console.log(await cardTitles.allTextContents());

    //above one is little fleky,so go for waitFor() ,but this wait for single element.
    await page.locator('div>>h5>>b').first().waitFor();
   console.log(await cardTitles.allTextContents());
})

test('UI controles',async({page})=>{

    const dropdowm= page.locator('select.form-control');
    const documnetLink=page.locator("[href*='documents-request']")

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //1.)Dropdowm type1.) select tag with value attribute[value will be given in selectOption() method]
    //when we have multiple elements ,use tagname in css so we get one element ex: below.
    await dropdowm.selectOption('consult');


    //2.)Radio button
    await page.locator('.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    //assertion
    await expect(page.locator('.checkmark').nth(1)).toBeChecked()
    console.log(await page.locator('.checkmark').last().isChecked())//returns boolean value

    
    //3.)checkbox
    await page.locator("[type='checkbox']").check()
    //assertion
    await expect(page.locator("[type='checkbox']")).toBeChecked()
    await page.locator("[type='checkbox']").uncheck()
    expect(await page.locator("[type='checkbox']").isChecked()).toBeFalsy();


    //4.)blinkingText checking, using HTML class='blinkingText'(if anything is blinking then there must be use of that class-> so we assert that , if blinkingText class exist then it is blinking)
    await expect(documnetLink).toHaveAttribute('class','blinkingText');
})

    //5.)child window
test('handling child window',async({browser})=>{


    const context=await browser.newContext();
    const  page= await context.newPage();

    const username=page.locator('#username')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documnetLink=page.locator("[href*='documents-request']");

    //listening to any new page and opening new page has to happen at same time , so keeping them in async way in below two lins code
    const [newPage]= await Promise.all(//returned promises will be saved in array. as many lines of code/methods will return promises
        [
            //asling brower context to listen for any new page open before click link to open new page
            context.waitForEvent('page'),//all the methods in java script will return in the form of Promises -> pending, rejected, fulfilled
            documnetLink.click()//this just click so no action no return promise
        ]
    )
    const text=await newPage.locator('.red').textContent()// few locators will be having two classes like-> class="im-para red" . in this css im-para is one class and red is one class as they have gap/space between them
    console.log(text)
    const arrayText=text.split('@');
    const gamail=arrayText[1].split(' ')[0];
    console.log(gamail)
    
    //go and enter gmail in first page
    await username.fill(gamail)

})

    //6.)debug[playwright inspector--> debug, trace,explore]
    //npx playwright test --debug

    
    //7.)codegen--> record and play back
    //npx playwright codegen url ex: npx playwright codegen http://google.com

    
    /*
    8.)trace viewer , reporter and screenshots video
        [ trace: 'on',//on, off, retain-on-failure]  [ reporter :'hrml']    [ screenshot: 'only-on-failure',//on, off] [video: 'retain-on-failure',]
        npx playwright show-trace trace.zipPath  [take any tace.zip of any testcase from test-results folder]
        ex:npx playwright show-trace C:\Users\z046461\PlaywrightAutomation\test-results\02CssAndBasicMethods-valid-8f3cc-in-with-invalid-credentials\trace.zip
    */
