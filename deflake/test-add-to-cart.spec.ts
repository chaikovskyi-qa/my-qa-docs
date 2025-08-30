import { test, expect, chromium } from '@playwright/test';

test('Add to cart — с троттлингом 1 секунда', async () => {
  test.setTimeout(60000); // увеличиваем таймаут на всякий

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 🌐 Включаем троттлинг: 1000 мс latency
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 1000,
    downloadThroughput: 200 * 1024 / 8, // 200 kbps
    uploadThroughput: 100 * 1024 / 8,
    connectionType: 'cellular3g',
  });

  // 1. Главная страница
  await page.goto('https://www.demoblaze.com');

  // 2. Открываем товар
  const product = page.getByRole('link', { name: /samsung galaxy s6/i });
  await expect(product).toBeVisible({ timeout: 15000 });
  await product.click();

  // 3. Кнопка "Add to cart"
  const addToCart = page.getByRole('link', { name: /^add to cart$/i });
  await expect(addToCart).toBeVisible({ timeout: 15000 });
  await expect(addToCart).toBeEnabled();

  // 4. Клик + ожидание диалога и запроса
  await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/addtocart') && resp.status() === 200
    ),
    page.waitForEvent('dialog').then(async dialog => {
      console.log('📢 Dialog message:', dialog.message());
      await dialog.accept();
    }),
    addToCart.click(),
  ]);

  // 5. Переход в корзину и ожидание ответа
  const cartLink = page.locator('#cartur');
  const [viewResp] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('/viewcart') && resp.status() === 200
    ),
    cartLink.click(),
  ]);

  const rawBody = await viewResp.text();
  console.log('📦 Raw /viewcart response:', rawBody.slice(0, 200));

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    data = null;
    console.warn('⚠️ JSON parse failed');
  }

  expect(Array.isArray(data)).toBeTruthy();
  expect(data?.some((item: any) =>
    String(item.title || item.product || '').toLowerCase().includes('samsung galaxy s6')
  )).toBeTruthy();

  // 6. Проверка UI
  await expect(page).toHaveURL(/\/cart\.html$/);
  const row = page.locator('#tbodyid tr').filter({ hasText: /samsung galaxy s6/i });
  await expect(row).toBeVisible({ timeout: 15000 });

  await browser.close();
});
