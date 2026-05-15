const {ValidLoginPOM}=require('./ValidLoginPOM');
const {Dashboardpage}=require('./Dashboardpage');
const {Checkoutplaceorder}=require('./Checkoutplaceorder');
const {VerifyOrders}=require('./VerifyOrder');

class POManager{

    constructor(page){
        this.page=page;
        this.validLogin=new ValidLoginPOM(this.page);
        this.dashboardpage=new Dashboardpage(this.page);
        this.checkoutplaceorder=new Checkoutplaceorder(this.page)
        this.verifyOrders=new VerifyOrders(this.page);

    }
    
    getLoginPage(){     
        return this.validLogin;    
    }
    getDashboardPage(){
        return this.dashboardpage;
    }
    getCheckoutplaceorderPage(){
        return this.checkoutplaceorder;
    }
    getVerifyOrderPage(){
        return this.verifyOrders;
    }
}
module.exports={POManager};