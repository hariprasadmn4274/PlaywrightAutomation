
import {test, expect, request} from '@playwright/test'
import { ApiUtils } from '../Utils/ApiUtils';

const loginPayload={userEmail: "hariprasadreddy1@gmail.com", userPassword: "Hariprasad1"};
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb" }] };//67a8dde5c0d3e6622a297cc8
let response;

test.beforeAll('',async()=>{
    
    const apiContext=await request.newContext({ ignoreHTTPSErrors: true});//you can pass proxy etc here                 //payload we are passing as data(key:value pair)
    const apiUtils=new ApiUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
})



test('Dynamic wait ,assignment 1: client app place order', async({page})=>{
    
    // await page.addInitScript(argument =>{ window.localStorage.setItem('token',argument),response.token});//setItem("key","value")
    //page.addInitScript(value =>{ window.localStorage.setItem('token',value),token})
    await page.addInitScript((token) => {
        window.localStorage.setItem('token', token);
      }, response.token);

    //now if go to this url, directly it go to orders page
    await page.goto("https://rahulshettyacademy.com/client/")
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash')


    //Go to orders anf verify ur order
    await page.locator("li [routerlink*='myorders']").click();
    const orderRows= page.locator('tbody tr')
    //dynomic wait
    await orderRows.first().waitFor()
    const rowsCount=await orderRows.count();
    console.log(`total orders count ${rowsCount}`);
    for(let i=0;i<rowsCount;i++){
        //get orderid column in the singele row
        const order = await orderRows.locator('th').nth(i).textContent();

        if (order===response.orderId) {
            console.log(`✅ Our Order matched at index ${i}`);
            //get view button in single row
            orderRows.locator('button').first().click();
            break;
        }
    }
    const orderDetails=await page.locator('.col-text').textContent();
    expect(orderDetails.includes(response.orderId)).toBeTruthy()

    
});