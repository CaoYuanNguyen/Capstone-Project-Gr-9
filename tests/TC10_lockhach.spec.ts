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

async function removeHighlight(locator: Locator) {
  await locator.evaluate(el => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

// scroll
async function scrollToBottom(page: Page) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(800);
}

test('TC10 - Filter By Guest', async ({ page }) => {

  // B1: mở trang chủ
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  // B2: mở form chọn khách
  const guestField = page.locator("text=Thêm khách");
  await highlight(page, guestField);
  await guestField.click();
  await removeHighlight(guestField);

  // B3: tăng số lượng khách
  const plusBtn = page.locator("text=+").first();
  await highlight(page, plusBtn);
  await plusBtn.click();
  await removeHighlight(plusBtn);

  // B4: click search
  const searchBtn = page.locator("[aria-label='search']");
  await highlight(page, searchBtn);
  await searchBtn.click();
  await removeHighlight(searchBtn);

  // B5: verify kết quả
  await page.waitForURL(/rooms/, { timeout: 15000 });

  const rooms = page.locator("//div[contains(@class,'room')]");
  await expect(rooms.first()).toBeVisible();

  // B6: scroll
  await scrollToBottom(page);
});