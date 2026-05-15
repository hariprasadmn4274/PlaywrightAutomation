class VerifyOrders{

    constructor(page){
        this.page=page;
        this.myorders=page.locator("li [routerlink*='myorders']")
        this.orderRows= page.locator('tbody tr')
        this.orderdetails=page.locator('.col-text')
    }
    async orderVerification(cleanedId){
        //go to orders anf verify ur order
            await this.myorders.click();
             
            //dynomic wait
            await this.orderRows.first().waitFor()
            const rowsCount=await this.orderRows.count();
            console.log(`total orders count ${rowsCount}`);
            for(let i=0;i<rowsCount;i++){
                //get orderid column in the singele row
                const order = await this.orderRows.locator('th').nth(i).textContent();
        
                if (order===cleanedId) {
                    console.log(`✅ Our Order matched at index ${i}`);
                    //get view button in single row
                    this.orderRows.locator('button').first().click();
                    break;
                }
            }
            const orderDetails=await this.orderdetails.textContent();
            return orderDetails;
            // expect(orderDetails.includes(cleanedId)).toBeTruthy()
    }
}
module.exports={VerifyOrders}