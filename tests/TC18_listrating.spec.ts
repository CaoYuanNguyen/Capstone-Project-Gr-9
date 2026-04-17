import { test, expect, Page, Locator } from '@playwright/test';

// ================= HIGHLIGHT =================
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();

  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
    el.style.transform = "scale(1.05)";
  });

  await page.waitForTimeout(400);
}

// ================= SCROLL =================
async function slowScroll(page: Page) {
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 250);
    await page.waitForTimeout(150);
  }
}

async function fastScrollToReview(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();

  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(120);
  }
}

test('TC18 - Scroll Review Section', async ({ page }) => {

  // B1: MỞ TRANG
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  // B2: CHỌN THÀNH PHỐ
  const city = page.locator("text=Hồ Chí Minh").first();
  await highlight(page, city);
  await city.click();

  // B3: CHỌN PHÒNG
  const room = page.locator("a[href*='room-detail']").first();
  await room.waitFor({ state: 'visible' });

  await highlight(page, room);
  await room.click();

  // B4: CHỜ LOAD
  await page.waitForURL(/room-detail/);
  await page.waitForLoadState('domcontentloaded');

  // B5: SCROLL TỪ TRÊN XUỐNG
  await page.evaluate(() => window.scrollTo(0, 0));
  await slowScroll(page);

  // B6: SCROLL TỚI REVIEW
  const reviews = page.locator("pre").first();
  await fastScrollToReview(page, reviews);

  // B7: VERIFY
  await expect(reviews).toBeVisible({ timeout: 15000 });

  const count = await page.locator("pre").count();
  expect(count).toBeGreaterThan(0);
});