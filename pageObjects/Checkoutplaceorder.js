class Checkoutplaceorder{
    constructor(page){
        this.page=page;
        this.productslist=page.locator('div li');
        // this.product=page.locator("text=ADIDAS ORIGINAL");
        this.checkoput=page.locator('text=Checkout')

        this.country=page.locator("[placeholder*='Country']")
        this.dropdown=page.locator("section .ta-results")
        this.cardDetails=page.locator('div [type="text"]')
        this.cardcvv=page.locator('div [type="text"]')
        this.name=page.locator('div [type="text"]');
        this.emailid=page.locator('div [type="text"]');
        this.applyoffer=page.locator('.btn-primary');
        this.placeOrder=page.locator('text=Place Order ');


    }
    async checkout(expect){
         //2.)dynomic waiting: to load atleast first product in the cart
            await this.productslist.first().waitFor();
            //const bool=await this.product.isVisible();
           // expect(bool).toBeTruthy();
            //checkout
            await this.checkoput.click()
    }
    async placeorder(expect){
            //3.)Dynomic Dropdown
            await this.country.pressSequentially('Ind');//type each letter at a time
            await this.dropdown.waitFor()
            const suggestionscount= await this.dropdown.locator('[type="button"]').count();// get count of suggestion in dropdown
            for(let i=0;i<suggestionscount;i++){
                const text=await this.dropdown.locator('[type="button"]').nth(i).textContent();
                if(text===' India'){
                    await this.dropdown.locator('[type="button"]').nth(i).click();
                    break;
                }
            }
            //fill some personal information
            await this.cardDetails.first().fill('1234 5698 7898 5412');
            await this.cardcvv.nth(1).fill('123');
            await this.name.nth(2).fill('hariprasad');
            await this.emailid.nth(3).fill('rahulshettyacademy');
            await this.applyoffer.click()
    
            await expect(this.page.locator('.user__name [type="text"]').first()).toHaveText('hariprasadreddy1@gmail.com');

            //placeorder
            await this.placeOrder.click();
            await expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
            const orderId=await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
            const cleanedId=orderId.replace(/[| ]/g, '');
            console.log(`order id is ${cleanedId}`);
            return cleanedId;

    }
}
module.exports={Checkoutplaceorder};