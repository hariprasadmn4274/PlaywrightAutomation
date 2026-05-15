const { test, expect } = require('@playwright/test')


const {POManager}=require('../pageObjects/POManager')

//cover json->string(so no issues will comw)->js object
const dataset=JSON.parse(JSON.stringify(require('../support/data/15DataDrivenTestAndParameterization.json')))

//1.)parameteraization means using array of date : to execute same testcase with multiple data
for(const data of dataset){
//there should be change of name: bcs u cant have two tests with same name
    test(`client app place order with product ${data.productname}`, async({page})=>{

    
        const poManager=new POManager(page);

        const validLogin=poManager.getLoginPage();
        await validLogin.goTo();
        await validLogin.login(data.email,data.password);
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash')


        const dashboardpage=poManager.getDashboardPage();
        await dashboardpage.searchproductAddcart(data.productname);
        await dashboardpage.navigateToCart();

        const checkoutplaceorder=poManager.getCheckoutplaceorderPage();
        await checkoutplaceorder.checkout(expect);//like page u need to pass aseertion aswell
        const cleanedId=await checkoutplaceorder.placeorder(expect);
        
        const verifyOrders= poManager.getVerifyOrderPage();
        const orderDetails=await verifyOrders.orderVerification(cleanedId)   
        expect(orderDetails.includes(cleanedId)).toBeTruthy()

        
    });
}

//import it from fixture file
//{this flow brocket for customTest} is imp bcs that only supports ,only .skip etc
const {customTest}=require('../support/fixtures/15test-base')

//Useing data from customised fixtures
customTest(`client app place order`, async({page,testDataForOrder})=>{

    
        const poManager=new POManager(page);

        const validLogin=poManager.getLoginPage();
        await validLogin.goTo();
        await validLogin.login(testDataForOrder.email,testDataForOrder.password);
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash')


        const dashboardpage=poManager.getDashboardPage();
        await dashboardpage.searchproductAddcart(testDataForOrder.productname);
        await dashboardpage.navigateToCart();

        const checkoutplaceorder=poManager.getCheckoutplaceorderPage();
        await checkoutplaceorder.checkout(expect);//like page u need to pass aseertion aswell
        const cleanedId=await checkoutplaceorder.placeorder(expect);
        
        const verifyOrders= poManager.getVerifyOrderPage();
        const orderDetails=await verifyOrders.orderVerification(cleanedId)   
        expect(orderDetails.includes(cleanedId)).toBeTruthy()

        
    });