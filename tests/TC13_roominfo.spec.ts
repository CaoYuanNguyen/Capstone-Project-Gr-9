import { test, expect, Page, Locator } from '@playwright/test';

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate(el => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(300);
}

test('TC13 - Verify room info', async ({ page }) => {

  // B1: mở trang
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  // B2: chọn địa điểm
  const city = page.locator("text=Hồ Chí Minh").first();
  await highlight(page, city);
  await city.click();

  // B3: chọn phòng
  const room = page.locator("a[href*='room-detail']").first();
  await highlight(page, room);
  await room.click();

  // B4: verify title
  const title = page.locator("h1, h2").first();
  await expect(title).toBeVisible();
});