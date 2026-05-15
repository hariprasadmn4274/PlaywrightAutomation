const { test, expect } = require('@playwright/test')
//import validlogin page object
const {ValidLoginPOM} = require('../pageObjects/ValidLoginPOM');
const {Dashboardpage} = require('../pageObjects/Dashboardpage');
const {Checkoutplaceorder}=require('../pageObjects/Checkoutplaceorder')
const {VerifyOrders}=require('../pageObjects/VerifyOrder')

const {POManager}=require('../pageObjects/POManager')

test('Dynamic wait ,assignment 1: client app place order', async({page})=>{

    const email='hariprasadreddy1@gmail.com';
    const password='Hariprasad1';
    const cardTitles=page.locator('div>>h5>>b')
    const productname='ADIDAS ORIGINAL'

    const poManager=new POManager(page);

    const validLogin=poManager.getLoginPage();
    await validLogin.goTo();
    await validLogin.login(email,password);
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash')

    const dashboardpage=poManager.getDashboardPage();
    await dashboardpage.searchproductAddcart(productname);
    await dashboardpage.navigateToCart();

    const checkoutplaceorder=poManager.getCheckoutplaceorderPage();
    await checkoutplaceorder.checkout(expect);//like page u need to pass aseertion aswell
    const cleanedId=await checkoutplaceorder.placeorder(expect);
    
    const verifyOrders= poManager.getVerifyOrderPage();
    const orderDetails=await verifyOrders.orderVerification(cleanedId)   
    expect(orderDetails.includes(cleanedId)).toBeTruthy()

    
});