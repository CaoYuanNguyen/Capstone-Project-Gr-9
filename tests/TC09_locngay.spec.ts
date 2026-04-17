import { test, expect, Page, Locator } from '@playwright/test';

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.evaluate(el => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(400);
}

async function removeHighlight(locator: Locator) {
  await locator.evaluate(el => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

// scroll
async function scrollToBottom(page: Page) {
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(800);
}

test('TC09 - Filter By Date', async ({ page }) => {

  // B1: Mở trang
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  // B2: Mở calendar
  const dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[2]");
  await highlight(page, dateField);
  await dateField.click();
  await removeHighlight(dateField);

  const calendar = page.locator(".rdrCalendarWrapper");
  await calendar.waitFor({ state: "visible" });

  // B3: chọn ngày checkin
  const checkIn = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "25" }).first();
  await highlight(page, checkIn);
  await checkIn.click();

  // B4: chọn ngày checkout
  const checkOut = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "29" }).first();
  await highlight(page, checkOut);
  await checkOut.click();

  // B5: search
  const searchBtn = page.locator("[aria-label='search']");
  await Promise.all([
    page.waitForURL(/rooms/, { timeout: 15000 }),
    searchBtn.click()
  ]);

  // B6: verify
  const rooms = page.locator("//div[contains(@class,'room')]");
  await expect(rooms.first()).toBeVisible();

  // B7: scroll
  await scrollToBottom(page);
});