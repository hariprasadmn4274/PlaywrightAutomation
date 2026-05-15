import{test, expect} from '@playwright/test'

test('Playwright special locators',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    //1.)getByLabel() : as long as you perform check()/click() operation .[there will be label tagname]
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');

        /*getByLabel() also works for input/edit box only when there is association between 'for' attribute from label tag and 'id' attribute from input tag
        ex:below :
        <label for="exampleInputPassword1">Password</label>
        <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password"> */
        //await getByLabel('Password').fill('password123')
        await page.getByPlaceholder('Password').fill('password123')



    //2.)getByPlaceholder(): placeholder means inside inputbox there grey text sugession
    await page.getByPlaceholder('Password').fill('hari123');

    //3.)getByRole() :this method can use when tagname or class name has button/btn
    //when we have multiple buttons in same page, them mention specifically with name as below syntax
    await page.getByRole("button",{name:'Submit'}).click();
         //getByRole()
            await page.getByRole("link",{name:'Shop'}).click();
            
    //4.)getByText()
    await page.getByText(" The Form has been submitted successfully!.").isVisible();

            

    //5.)LocatorChaining                                         //here we have only one button in that specific card , so just mentioned as button
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click()
})

test('Dynamic wait: simplify using special lcator ,assignment 2', async({page})=>{

    const email=page.getByPlaceholder('email@example.com')
    const password=page.getByPlaceholder('enter your passsword')
    const login=page.getByRole("button",{name:'Login'})


    await page.goto('https://rahulshettyacademy.com/client/')
    await email.fill('hariprasadreddy1@gmail.com');
    await password.fill('Hariprasad1');
    await login.click()
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash')

    //ADIDAS ORIGINALgoing to add to cart
    //filter({hasText:'value'}) method act as getBytext() method
    await page.locator(".card-body").filter({hasText:'ADIDAS ORIGINAL'}).getByRole("button",{name:' Add To Cart'}).click()
    
    
    await page.waitForTimeout(3000); // static waits for 3 seconds, not good to use

    //go to cart
    await page.locator("li").getByRole("button",{name:'Cart'}).click();

    //2.)dynomic waiting: to load atleast first product in the cart
    await page.locator('div li').first().waitFor();
    const bool=await page.getByText("ADIDAS ORIGINAL").isVisible();
    expect(bool).toBeTruthy();

    //checkout
    await page.getByRole("button",{name:'Checkout'}).click()
    await page.getByPlaceholder("Select Country").pressSequentially('Ind');
    await page.getByRole("button",{name:'India'}).nth(1).click();

    //fill some personal information
    await page.locator('div [type="text"]').first().fill('1234 5698 7898 5412');
    await page.locator('div [type="text"]').nth(1).fill('123');
    await page.locator('div [type="text"]').nth(2).fill('hariprasad');
    await page.locator('div [type="text"]').nth(3).fill('rahulshettyacademy');
    await page.getByRole("button",{name:'Apply Coupon'}).click()

    
    //Place order
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();

    const orderId=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    const cleanedId=orderId.replace(/[| ]/g, '');
    console.log(`order id is ${cleanedId}`);
    await page.pause()
    //go to orders anf verify ur order
    await page.getByRole("button",{name:'ORDERS'}).click();
    //dynomic wait
    await page.locator('tbody tr').first().waitFor()
    await expect(page.getByText(cleanedId)).toBeVisible();
    
    
});