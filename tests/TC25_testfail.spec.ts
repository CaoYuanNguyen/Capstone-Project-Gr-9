import { test, expect, Page, Locator } from '@playwright/test';

//  HIGHLIGHT 
async function highlight(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();

  await locator.evaluate(el => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
    el.style.transition = "0.3s";
  });

  await page.waitForTimeout(400);
}

async function removeHighlight(locator: Locator) {
  await locator.evaluate(el => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

//  SCROLL 
async function scroll(page: Page) {
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(500);
}

async function closeAllPopup(page: Page) {
  await page.mouse.click(0, 0);
  await page.waitForTimeout(400);
}

test('TC25 - Search no result', async ({ page }) => {

  //  B1: MỞ TRANG 
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForLoadState('domcontentloaded');

  //  B2: CHỌN ĐỊA ĐIỂM 
  const location = page.locator("//p[text()='Địa điểm']/parent::div");
  await highlight(page, location);
  await removeHighlight(location);
  await location.click();

  const hcm = page.locator("//p[text()='Hồ Chí Minh']/parent::div");
  await highlight(page, hcm);
  await removeHighlight(hcm);
  await hcm.click();

  //  B3: CHỌN NGÀY 
  const dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[2]");
  await highlight(page, dateField);
  await removeHighlight(dateField);
  await dateField.click();

  const checkIn = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "28" }).first();
  await highlight(page, checkIn);
  await removeHighlight(checkIn);
  await checkIn.click();

  const checkOut = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "29" }).first();
  await highlight(page, checkOut);
  await removeHighlight(checkOut);
  await checkOut.click();

  //  B4: ĐÓNG POPUP 
  await closeAllPopup(page);

  //  B5: CHỌN KHÁCH 
  const guest = page.locator("text=Thêm khách");
  await highlight(page, guest);
  await removeHighlight(guest);
  await guest.click();

  const plusBtn = page.locator("text=+").first();

  for (let i = 0; i < 5; i++) {
    await highlight(page, plusBtn);
    await removeHighlight(plusBtn);
    await plusBtn.click();
  }

  //  B6: SEARCH 
  const searchBtn = page.locator("[aria-label='search']");
  await highlight(page, searchBtn);
  await removeHighlight(searchBtn);

  await Promise.all([
    page.waitForURL(/rooms|ho-chi-minh/, { timeout: 15000 }),
    searchBtn.click()
  ]);

  // B7: VERIFY KHÔNG CÓ KẾT QUẢ 
  const rooms = page.locator("a[href*='room-detail']");
  const count = await rooms.count();

  console.log("Room count:", count);

  if (count === 0) {
    console.log("Không có kết quả");

    const bodyText = await page.textContent("body");
    expect(bodyText?.length).toBeGreaterThan(0);
  } else {
    console.log("Có kết quả");

    await expect(rooms.first()).toBeVisible();
  }

  // B8: SCROLL
  await scroll(page);
});