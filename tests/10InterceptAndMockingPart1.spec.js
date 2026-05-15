const { test, expect, request } = require('@playwright/test');

const fakePayLoadOrders = { data: [], message: "No Orders" };

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

let webContext;
test.beforeAll(async({browser})=>{
  
    //step 1.)normal way of login
    const context=await browser.newContext();
    const page=await context.newPage();

    const email=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const login=page.locator('#login')

    await page.goto('https://rahulshettyacademy.com/client/')
    await email.fill('hariprasadreddy1@gmail.com');
    await password.fill('Hariprasad1');
    await login.click()

            await page.waitForLoadState('networkidle')// wait till page loads completely otherwise storate state will store empty info
            // ✅ Wait for dashboard url or some dashboard element to ensure login is success
            await page.waitForURL('**/dashboard/**'); 

    //step 2.)we are storing current browser context session storage details into one json file ie state.json using storageState() method
    await context.storageState({path: 'state.json'})
    //step 3.)creating new browser context called "webContext" and invoking state.json file into that.
    webContext=await browser.newContext({storageState:'state.json'});

})
 
//1.)Intercept and Mock the "Response"
test('@SP Place the order', async ( ) => {
  
  const page=await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");

  //intercepting response -APi gives response to us-> { playwright fakeresponse}->give it to browser->render data on front end

 //bfore clicking order element , will just intercept and mock the response using route() method 
 //route() method is accepts two parameters, one string(url) as argument,other one is function 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      //here first fetch response boday from above route url ie route.request()=above url
      const response = await page.request.fetch(route.request());
      //our fake response 
      let body = JSON.stringify(fakePayLoadOrders);
      //giving our fake payload to browser
      route.fulfill(
        {
          response,
          body, 
 
        });
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")//simply wait untill we get full response
 
  console.log(await page.locator(".mt-4").textContent());
 
});
 