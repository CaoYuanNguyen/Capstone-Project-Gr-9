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

test('TC11 - Filter By Price', async ({ page }) => {

  // B1: mở trang
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  // B2: click filter giá
  const giaBtn = page.locator("text=Giá").first();
  await highlight(page, giaBtn);
  await giaBtn.click();
  await removeHighlight(giaBtn);

  // B3: verify
  await expect(page.locator("body")).toBeVisible();
});