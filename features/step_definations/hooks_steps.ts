import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {POManager} from '../../pageObjects_ts/POManager'

//cover json->string(so no issues will comw)->js object
const dataset=JSON.parse(JSON.stringify(require('../../support_ts/data/15DataDrivenTestAndParameterization.json')))

import { chromium, Page } from '@playwright/test';






Given('I login using hooks into application with valid credentials {string} and {string}',{timeout:100*1000}, async function (email: string, password: string) {
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

When('using hooks I will add {string} into cart',{timeout:100*1000}, async function (productname:string) {

        const dashboardpage=this.poManager.getDashboardPage();
        await dashboardpage.searchproductAddcart(productname);
        await dashboardpage.navigateToCart();});

When('using hooks I enter all the required details and place the order',{timeout:100*1000}, async function () {


        const checkoutplaceorder=this.poManager.getCheckoutplaceorderPage();
        await checkoutplaceorder.checkout(expect);//like page u need to pass aseertion aswell
        this.cleanedId=await checkoutplaceorder.placeorder(expect);});

Then('using hooks I verify placed order in order history page',{timeout:100*1000}, async function () {


         const verifyOrders= this.poManager.getVerifyOrderPage();
        const orderDetails: any=await verifyOrders.orderVerification(this.cleanedId)   
        expect(orderDetails.includes(this.cleanedId)).toBeTruthy()
});
