class Dashboardpage
{
    constructor(page){
        this.page=page;
        this.productsList=page.locator(".card-body")
        this.cartpage=page.locator("[routerlink*='cart']")

    }
    async searchproductAddcart(productname){
        //ADIDAS ORIGINALgoing to add to cart
        const count=await this.productsList.count();
        for(let i=0;i<count;i++){
        //add to cart
        //1.)locator chaining
            if(await this.productsList.nth(i).locator("b").textContent()===productname){
                await this.productsList.nth(i).locator('text= Add To Cart').click();
                
                break;
            }
        }
        await this.page.waitForTimeout(3000); // static waits for 3 seconds, not good to use

    }
    async navigateToCart(){
        //go to cart
        await this.cartpage.click();

    }
}
module.exports={Dashboardpage};