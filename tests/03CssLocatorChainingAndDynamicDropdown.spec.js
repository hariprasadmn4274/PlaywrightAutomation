const { test, expect } = require('@playwright/test')

test.only('Dynamic wait ,assignment 1: client app place order', async({page})=>{

    const email=page.locator('#userEmail')
    const password=page.locator('#userPassword')
    const login=page.locator('#login')
    const cardTitles=page.locator('div>>h5>>b')
    const productsList=page.locator(".card-body")
    const productname='ADIDAS ORIGINAL'

    await page.goto('https://rahulshettyacademy.com/client/')
    await email.fill('hariprasadreddy1@gmail.com');
    await password.fill('Hariprasad1');
    await login.click()

    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash')

    //ADIDAS ORIGINALgoing to add to cart
    const count=await productsList.count();
    for(let i=0;i<count;i++){

    //add to cart
    //1.)locator chaining
        if(await productsList.nth(i).locator("b").textContent()===productname){
             await productsList.nth(i).locator('text= Add To Cart').click();
            
            break;
        }
    }
    await page.waitForTimeout(3000); // static waits for 3 seconds, not good to use

    //go to cart
    await page.locator("[routerlink*='cart']").click();
    //2.)dynomic waiting: to load atleast first product in the cart
    await page.locator('div li').first().waitFor();
    const bool=await page.locator("text=ADIDAS ORIGINAL").isVisible();
    expect(bool).toBeTruthy();

    //checkout
    await page.locator('text=Checkout').click()
    //3.)Dynomic Dropdown
    // await page.locator("[placeholder*='Country']").pressSequentially('Ind');//type each letter at a time
    // const dropdown=page.locator("section .ta-results");//get entire dropdown
    // //dynomic wait
    // await dropdown.waitFor()
    // const suggestionscount= await dropdown.locator('[type="button"]').count();// get count of suggestion in dropdown
    // for(let i=0;i<suggestionscount;i++){
    //     const text=await dropdown.locator('[type="button"]').nth(i).textContent();
    //     if(text===' India'){
    //         await dropdown.locator('[type="button"]').nth(i).click();
    //         break;
    //     }
    // }

    await page.getByPlaceholder('Select Country').pressSequentially('Ind')
    const dropdown = await page.locator('section.ta-results')
    const dropcount= dropdown.locator('[type="button"]').count()

    for(let i=0;i<dropcount; i++){
       const text= await dropdown.locator('[type="button"]').nth(i).textContent();
       if(text==' India'){
        await dropdown.locator('[type="button"]').nth(i).click()
       }
    }




    //fill some personal information
    await page.locator('div [type="text"]').first().fill('1234 5698 7898 5412');
    await page.locator('div [type="text"]').nth(1).fill('123');
    await page.locator('div [type="text"]').nth(2).fill('hariprasad');
    await page.locator('div [type="text"]').nth(3).fill('rahulshettyacademy');
    await page.locator('.btn-primary').click()

    
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText('hariprasadreddy1@gmail.com');

    //checkout
    await page.locator('text=Place Order ').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    const orderId=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const cleanedId=orderId.replace(/[| ]/g, '');
    console.log(`order id is ${cleanedId}`);

    //go to orders anf verify ur order
    await page.locator("li [routerlink*='myorders']").click();
    const orderRows= page.locator('tbody tr')
    //dynomic wait
    await orderRows.first().waitFor()
    const rowsCount=await orderRows.count();
    console.log(`total orders count ${rowsCount}`);
    for(let i=0;i<rowsCount;i++){
        //get orderid column in the singele row
        const order = await orderRows.locator('th').nth(i).textContent();

        if (order===cleanedId) {
            console.log(`✅ Our Order matched at index ${i}`);
            //get view button in single row
            orderRows.locator('button').first().click();
            break;
        }
    }
    const orderDetails=await page.locator('.col-text').textContent();
    expect(orderDetails.includes(cleanedId)).toBeTruthy()

    
});