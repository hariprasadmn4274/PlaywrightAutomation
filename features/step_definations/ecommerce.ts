import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {POManager} from '../../pageObjects_ts/POManager'


//cover json->string(so no issues will comw)->js object
const dataset=JSON.parse(JSON.stringify(require('../../support_ts/data/15DataDrivenTestAndParameterization.json')))

//earlier we used get page fixture from text keyword but now we are not using text keyword --> page has no value. then how? see below
//now we can get it from playwright keyword --> playwright-->browser-->page
import { Before } from '@cucumber/cucumber';
import { chromium, Page } from '@playwright/test';

//commond to run 
//npx cucumber-js --exit
//npx cucumber-js features/Ecommerce.feature --exit
//npx cucumber-js features/Ecommerce.feature --name "In an Ecommerce application placing an order" --exit



Given('I login into application with valid credentials {string} and {string}',{timeout:100*1000}, async function (email: string, password: string) {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        this.page = await context.newPage(); 
        const page: Page = this.page; // or get from context

         this.poManager=new POManager(page);

        const validLogin=this.poManager.getLoginPage();
        await validLogin.goTo();
        await validLogin.login(email,password);
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash')

});

When('I will add {string} into cart',{timeout:100*1000}, async function (productname:string) {

        const dashboardpage=this.poManager.getDashboardPage();
        await dashboardpage.searchproductAddcart(productname);
        await dashboardpage.navigateToCart();});

When('I enter all the required details and place the order',{timeout:100*1000}, async function () {


        const checkoutplaceorder=this.poManager.getCheckoutplaceorderPage();
        await checkoutplaceorder.checkout(expect);//like page u need to pass aseertion aswell
        this.cleanedId=await checkoutplaceorder.placeorder(expect);});

Then('I verify placed order in order history page',{timeout:100*1000}, async function () {


         const verifyOrders= this.poManager.getVerifyOrderPage();
        const orderDetails: any=await verifyOrders.orderVerification(this.cleanedId)   
        expect(orderDetails.includes(this.cleanedId)).toBeTruthy()
});
