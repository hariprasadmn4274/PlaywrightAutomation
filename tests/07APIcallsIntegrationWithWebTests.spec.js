/*
if have 50 teast cases to place order, need to login for 50 times 
--> intead of the integrate api use same login taken and directly land in place order page.
-->if any one time out of 50 that login page is unsatble then test case will fail, so we can avaid this.
--> minimize automation script and  eventuslly reduce flekyness of the code. 
*/

import {test, expect, request} from '@playwright/test'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


const loginPayload={userEmail: "hariprasadreddy1@gmail.com", userPassword: "Hariprasad1"};

const orderPayload = { orders: [{ country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb" }] };//67a8dde5c0d3e6622a297cc8

let token;//making token as global so we can use outside also
let orderId;
test.beforeAll('',async()=>{

    //same like "browser" context creation, we do "request" context creation for API calls integration
    const apiContext=await request.newContext();//you can pass proxy etc here                 //payload we are passing as data(key:value pair)
    
    //1.)Login API
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
             data:loginPayload //after url , here u can give headers, params/ url params

        });    
    //assertion that response is 200 ok
     expect(loginResponse.ok()).toBeTruthy()  
    //get json part of response
    const loginResponseJson=await loginResponse.json();//using this response not just json, e can get body, status, headers, url, ok etc
    //get only token
    token=await loginResponseJson.token;
    console.log(token);

    //2.)Order API
    const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:{
                        "authorization":token,
                        "content-type":"application/json",

                    }
        });
    const orderResponseJson=await orderResponse.json();
    orderId = orderResponseJson.orders[0]; // Get first item from array
    console.log(orderId);

})

// test.beforeEach(()=>{


// })

test('Dynamic wait ,assignment 1: client app place order', async({page})=>{

    //1.)insert token into web:
    //playwright cant insert something directly into web but java script code can 
    // ex:addInitScript(argument, value)//takes to parameters,argument as functin code where insert token, value as token
    await page.addInitScript(argument =>{ window.localStorage.setItem('token',argument),token});//setItem("key","value")
                      //^token will be passed into argument, this argument will take token and go inside function , sets token in key value pair in local storage

    //name differently according to udemy video
    //page.addInitScript(value =>{ window.localStorage.setItem('token',value),token})



    //now if go to this url, directly it go to orders page
    await page.goto("https://rahulshettyacademy.com/client/")
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/')


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

        if (order===orderId) {
            console.log(`✅ Our Order matched at index ${i}`);
            //get view button in single row
            orderRows.locator('button').first().click();
            break;
        }
    }
    const orderDetails=await page.locator('.col-text').textContent();
    expect(orderDetails.includes(cleanedId)).toBeTruthy()

    
});