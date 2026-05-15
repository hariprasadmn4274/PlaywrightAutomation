import { Before,After, BeforeAll, BeforeStep, AfterStep, AfterAll,Status} from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

//before all the scenario
BeforeAll(function(){

})

//before every single scenario
Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage(); 
});

//before every single step: means Gven. When, Then
BeforeStep(function(){

})

//after every single step: means Gven. When, Then
AfterStep(async function({result}){
    if(result.status==Status.FAILED){
        await this.page.screenshot({path: 'screenshotHooks.png'});
    }
})

//before every single scenario
After(async function(){
    //this just clear cxach cookies after tthe code run.
})

//after all the scenario
AfterAll(function(){

})