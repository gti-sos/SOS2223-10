// ts-check
import {test, expect} from '@playwright/test';
test('Has title',async({page}) => {
    await page.goto('https://sos2223-10.appspot.com/employment-stats');
    //Except a title
    await expect(page).toHaveTitle(/Datos Empleo/);
});