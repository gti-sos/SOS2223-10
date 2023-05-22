import { test, expect } from '@playwright/test';

test('Obtencion datos Medio Ambiente', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/environment-stats');

  // Esperar 2 segundos antes de hacer clic en el botón 
  await page.waitForTimeout(2000);
  
  // Hacer clic en el botón 
  await page.click('button:has-text("Obtener Datos Medio Ambiente")');


});
