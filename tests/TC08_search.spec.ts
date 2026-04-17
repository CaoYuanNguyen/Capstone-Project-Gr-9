import { test, expect, Page, Locator } from '@playwright/test';

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 }); // fix timeout
  await locator.scrollIntoViewIfNeeded();

  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });

  await page.waitForTimeout(500); // giảm từ 1000 -> 500
}

async function removeHighlight(locator: Locator) {
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

// scroll
async function scrollToResult(page: Page) {
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(1000); // giảm
}

test.describe('Search & Filter', () => {

  test('TC08 - Search By Location', async ({ page }) => {

    // B1: Truy cập trang chủ
    await page.goto('https://demo5.cybersoft.edu.vn/');
    await page.waitForLoadState('domcontentloaded'); // fix

    // B2: Chọn địa điểm
    const location = page.locator("//p[text()='Địa điểm']/parent::div");
    await highlight(page, location);
    await location.click();
    await removeHighlight(location);

    const hcm = page.locator("//p[text()='Hồ Chí Minh']/parent::div");
    await highlight(page, hcm);
    await hcm.click();
    await removeHighlight(hcm);

    // B3: Click Search
    const searchBtn = page.locator("[aria-label='search']");
    await highlight(page, searchBtn);

    await Promise.all([
      page.waitForURL(/ho-chi-minh/, { timeout: 15000 }), // fix timeout
      searchBtn.click()
    ]);

    await removeHighlight(searchBtn);

    // B4: Scroll xem kết quả
    await scrollToResult(page);
  });

});