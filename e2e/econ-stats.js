import { test, expect } from '@playwright/test';

test('carga recursos iniciales', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');

  
  
// Espera 2 segundos antes de hacer clic en el botón de cargar datos iniciales.
await page.waitForTimeout(2000);
// Hace clic en el botón de cargar datos iniciales.
await page.click('button:has-text("Cargar recursos")');

const mensajeExito = page.locator('#messages');
await expect(mensajeExito).toHaveText('Datos cargados correctamente');
});



test('realiza una búsqueda', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');

  // Ingresa valores en los campos de búsqueda.
  await page.fill('input[placeholder=" territorio"]', 'andalucia');
  await page.fill('input[placeholder="año"]', '');
  await page.fill('input[placeholder="casa finalizadas"]', '');
  await page.fill('input[placeholder="precio medio metro cuadrado"]', '');
  await page.fill('input[placeholder="turistas"]', '');

  // Hace clic en el botón de búsqueda.
  await page.click('button:has-text("Buscar")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('');//Si no se encontraran resultados, apareceria aqui un mensaje de que no existen resultados,
                                            //SI hay resultados no se mostrará nada
});

// Resto de las pruebas...
test('limpia los campos de búsqueda', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');

  // Ingresa valores en los campos de búsqueda.
  await page.fill('input[placeholder=" territorio"]', 'Territorio');
  await page.fill('input[placeholder="period"]', '2019');
  await page.fill('input[placeholder="casas finalizadas"]', '1000');
  await page.fill('input[placeholder="precio medio metro cuadrado"]', '500');
  await page.fill('input[placeholder="turistas"]', '8000000');

  // Hace clic en el botón de limpiar.
  await page.click('button:has-text("Limpiar")');

  // Espera que los campos de búsqueda estén vacíos.
  const territorio = page.locator('input[placeholder=" territorio"]');
  const periodo = page.locator('input[placeholder="periodo"]');
  const casaFinalizada = page.locator('input[placeholder="casas finalizadas"]');
  const precioMCuadrado = page.locator('input[placeholder="precio medio metro cuadrado"]');
  const turista = page.locator('input[placeholder="turistas"]');

  await expect(territorio).toHaveValue('');
  await expect(periodo).toHaveValue('');
  await expect(casaFinalizada).toHaveValue('');
  await expect(precioMCuadrado).toHaveValue('');
  await expect(turista).toHaveValue('');
});
test('borra un recurso', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');

 

  await page.waitForTimeout(2000);
   // Hace clic en el botón de "Borrar un recurso".
   await page.click('button:has-text("Borrar un recurso")');
  // Ingresa valores en los campos de eliminación.
  await page.fill('input[id="delete_territory"]', 'andalucia');
  await page.fill('input[id="delete_year"]', '2008');

  // Hace clic en el botón de eliminar.
  await page.click('button:has-text("Eliminar")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('Recurso eliminado correctamente');
});


test('borra todos los recursos', async ({ page }) => {
  await page.goto('https://sos2223-10.appspot.com/economy-stats');


  await page.waitForTimeout(2000);
   // Hace clic en el botón de "Borrar un recurso".
   await page.click('button:has-text("Borrar recursos")');

  const mensajeExito = page.locator('#messages');
  await expect(mensajeExito).toHaveText('Recursos eliminados correctamente');
});
