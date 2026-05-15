import{test,expect} from '@playwright/test'

test('Calender/date picker',async({page})=>{
    
    const date='15';
    const month="6";
    const year="2027";
    const expectedList = [month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    //click on date picker
    await page.locator(".react-date-picker__inputGroup").click();
    //click on main menu to for months
    await page.locator(".react-calendar__navigation__label").click();
    //again click on main menu to go for year
    await page.locator(".react-calendar__navigation__label").click();

    //now click on year
    await page.getByText(year).click();

    //now click on month
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();

    //now click on date: using xpath for below one
    await page.locator("//abbr[text()='"+date+"']").click();

    //assertion
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }



})