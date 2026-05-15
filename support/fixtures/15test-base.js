const base=require('@playwright/test')

exports.customTest=base.test.extend(
    {
        //creating js object
        testDataForOrder : {
            
            email:"hariprasadreddy1@gmail.com",
            password:"Hariprasad1",
            productname:"ADIDAS ORIGINAL"
             
        }
    }
)