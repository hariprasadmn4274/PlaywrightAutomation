const { test, expect, request } = require('@playwright/test');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

//2.)Intercept and mock the "Request"
test('security test intercept the request', async ({ page }) => {

  const email = page.locator('#userEmail')
  const password = page.locator('#userPassword')
  const login = page.locator('#login')
  await page.goto('https://rahulshettyacademy.com/client/')
  await email.fill('hariprasadreddy1@gmail.com');
  await password.fill('Hariprasad1');
  await login.click()
  await page.locator("[routerlink*=myorders]").click()

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    //in route function using route.continue(), ask to change the url , in url we are changed the id ie 621661f884b053f6765465b6 (our id is different)
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))

  await page.locator('button:has-text("View")').first().click();
  await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order")
  await page.pause()
})

//3.)intercept and Block(abort) , that it should not happen
//for ex: css files should not load(style/design of ui) , so that loading page wont take time.
test('validate error message after login with invalid credentials', async ({ page }) => {
  const username = page.locator('#username')
  const password = page.locator('#password')
  const submitbutton = page.locator('#signInBtn')
  const cardTitles = page.locator('.card-title>>a')

  //1.here iam blocking .css file before entering into login page with url
  await page.route("**/*.css", route=>route.abort())
  //2.iam also blocking .jpg etc ie images in web
  await page.route("**/*.{jpg,png,jpeg}", route=>route.abort())

  //3. we can also ask playwright to listen and print all the api request accurs for test case using event listener method ie on()
  //we asking event listner on to listen all "request" and calling function to print.
  page.on("request",request=>console.log( request.url()));
  //we can also print status code as well
  page.on("response", Response=>console.log(Response.url(),Response.status()))

  
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  await username.fill('rahulshettyacademy');
  await password.fill('learning');
  await submitbutton.click();

    await page.pause();

  console.log(await cardTitles.nth(0).textContent())
  console.log(await cardTitles.first().textContent())
  console.log(await cardTitles.nth(2).textContent())


  console.log(await cardTitles.allTextContents())
  console.log(await cardTitles.nth(0).textContent())
  console.log(await cardTitles.allTextContents())



})