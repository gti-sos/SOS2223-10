import { test, expect } from '@playwright/test';

test('Obetener datos economia', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');

  
  
// Espera 2 segundos antes de hacer clic en el botón de obtener datos economia
await page.waitForTimeout(2000);
// Hace clic en el botón de obtener datos economia
await page.click('button:has-text("Obetener datos economia")');
});




