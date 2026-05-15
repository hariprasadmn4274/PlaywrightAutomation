class  ApiUtils{

    //we are keeping "apiContext" and "loginPayload" in constructor bcs we can access thenm in entire class
    //login details is common for entaire class methids so
     constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

    async getToken(){
        //https://rahulshettyacademy.com/client/
        //https://rahulshettyacademy.com/api/ecom/auth/login
            const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:this.loginPayload //after url , here u can give headers, params/ url params

                });    
            const loginResponseJson=await loginResponse.json();//using this response not just json, e can get body, status, headers, url, ok etc
            const token=await loginResponseJson.token;
            // console.log(token);
            return token;
    }


    async createOrder(orderPayload){
            let response={};
            response.token=await this.getToken();
           

            const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    // data: JSON.stringify(orderPayload), // Explicitly stringify the payload

                    
                    headers:{
                                "authorization":response.token,
                                "content-type":"application/json",
        
                            }
                });
                const orderResponseJson = await orderResponse.json();
                console.log("Order Response Status:", orderResponse.status());
                console.log("Order Response Body Text:", await orderResponse.text()); // helps when response isn't valid JSON

                const orderId = orderResponseJson.orders[0];
                response.orderId = orderId;
                return response;
    
    }

}
module.exports= {ApiUtils};