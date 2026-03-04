import { test, expect, Page, Locator } from '@playwright/test';

// hightlight
async function highlight(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(1000);
}

async function removeHighlight(locator: Locator) {
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

//scroll
async function scrollToResult(page: Page) {
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(2500);
}

test.describe('Search & Filter', () => {

  // ================= TC08 =================
  test('TC08 - Search By Location', async ({ page }) => {

    // B1: Truy cập trang chủ
    await page.goto('https://demo5.cybersoft.edu.vn/');
    await page.waitForTimeout(2000);

    // B2: Chọn địa điểm
    const location = page.locator("//p[text()='Địa điểm']/parent::div");
    await highlight(page, location);
    await location.click();
    await removeHighlight(location);

    await page.waitForTimeout(1500);

    const hcm = page.locator("//p[text()='Hồ Chí Minh']/parent::div");
    await highlight(page, hcm);
    await hcm.click();
    await removeHighlight(hcm);

    // B3: Click Search
    const searchBtn = page.locator("[aria-label='search']");
    await highlight(page, searchBtn);
    await searchBtn.click();
    await removeHighlight(searchBtn);

    // B4: Verify chuyển trang kết quả
    await page.waitForURL(/ho-chi-minh/, { timeout: 15000 });
    await page.waitForTimeout(3000);
    await scrollToResult(page);
  });


  // ================= TC09 =================
  test('TC09 - Filter By Date', async ({ page }) => {

    // B1: Truy cập trang chủ
    await page.goto('https://demo5.cybersoft.edu.vn/');
    await page.waitForTimeout(2000);

    // B2: Mở calendar
    const dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[2]");
    await highlight(page, dateField);
    await dateField.click();
    await removeHighlight(dateField);

    const calendar = page.locator(".rdrCalendarWrapper");
    await calendar.waitFor({ state: "visible" });

    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(500);

    // B3: Chuyển tháng 
    const nextMonthBtn = page.locator(".rdrNextPrevButton.rdrNextButton");
    await highlight(page, nextMonthBtn);

    for (let i = 0; i < 4; i++) {
      await nextMonthBtn.click();
      await page.waitForTimeout(300);
    }

    await removeHighlight(nextMonthBtn);
    await page.waitForTimeout(500);

    // B4: Chọn ngày Check in/out
    //------------checkin-------------
    const checkIn = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "5" }).first();
    await checkIn.scrollIntoViewIfNeeded();
    await checkIn.hover();
    await page.waitForTimeout(300);
    await checkIn.click();

    await page.waitForTimeout(500);

    //------------checkout-------------
    const checkOut = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "8" }).first();
    await checkOut.scrollIntoViewIfNeeded();
    await checkOut.hover();
    await page.waitForTimeout(300);
    await checkOut.click();

    await page.waitForTimeout(500);
    await page.locator(".rdrEndEdge").waitFor();

    // B5: Click Search
    const searchBtn = page.locator("[aria-label='search']");
    await highlight(page, searchBtn);
    await searchBtn.click();
    await removeHighlight(searchBtn);

    // B6: Verify chuyển trang rooms
    await page.waitForURL(/rooms/, { timeout: 15000 });
    await page.waitForTimeout(3000);
    await scrollToResult(page);
  });


  // ================= TC10 =================
  test('TC10 - Filter By Guest', async ({ page }) => {

    // B1: Truy cập trang chủ
    await page.goto('https://demo5.cybersoft.edu.vn/');
    await page.waitForTimeout(2000);

    // B2: Thêm 1 khách
    const guestField = page.locator("text=Thêm khách");
    await highlight(page, guestField);
    await guestField.click();
    await removeHighlight(guestField);

    const plusBtn = page.locator("text=+");
    await highlight(page, plusBtn);
    await plusBtn.click();
    await removeHighlight(plusBtn);

    // B3: Click Search
    const searchBtn = page.locator("[aria-label='search']");
    await highlight(page, searchBtn);
    await searchBtn.click();
    await removeHighlight(searchBtn);

    // B4: Verify chuyển trang rooms
    await page.waitForURL(/rooms/, { timeout: 15000 });
    await page.waitForTimeout(3000);
    await scrollToResult(page);
  });

});