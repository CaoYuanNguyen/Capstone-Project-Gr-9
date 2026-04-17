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

// scroll
async function scroll(page: Page) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);
}

test('TC14 - Pagination', async ({ page }) => {

  // B1: mở trang
  await page.goto('https://demo5.cybersoft.edu.vn/');

  // B2: chọn HCM
  const city = page.locator("text=Hồ Chí Minh").first();
  await highlight(page, city);
  await city.click();

  // B3: scroll xuống pagination
  await scroll(page);

  // B4: click page 2
  const page2 = page.locator("text=2").first();
  await highlight(page, page2);
  await page2.click();

  // B5: verify
  const rooms = page.locator("a[href*='room-detail']");
  await expect(rooms.first()).toBeVisible();
});