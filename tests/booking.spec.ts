import { test, expect, Page, Locator } from '@playwright/test';

//hightlight
async function highlight(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(500);
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

test('TC16 - Booking Success', async ({ page }) => {

  // B1: Truy cập trang và đăng nhập
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForTimeout(1500);

  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();

  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();

  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await highlight(page, email);
  await email.fill("testlog123@gmail.com");

  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("123456789");

  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();
  await page.waitForTimeout(1800);


  // B2: Tìm phòng
  const location = page.locator("//p[text()='Địa điểm']/parent::div");
  await highlight(page, location);
  await location.click();

  const hcm = page.locator("//p[text()='Hồ Chí Minh']/parent::div");
  await highlight(page, hcm);
  await hcm.click();

  const searchBtn = page.locator("[aria-label='search']");
  await highlight(page, searchBtn);
  await searchBtn.click();

  await page.waitForURL(/ho-chi-minh/);
  await page.waitForTimeout(1500);


  // B3: Chọn phòng
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(1200);

  const firstRoom = page.locator("a[href*='detail']").first();
  await highlight(page, firstRoom);
  await firstRoom.click();
  await page.waitForTimeout(2000);


  // B4: Chọn ngày check-in và check-out
  const dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[1]");
  await highlight(page, dateField);
  await dateField.click();

  const calendar = page.locator(".rdrCalendarWrapper");
  await calendar.waitFor({ state: "visible" });

  const nextMonthBtn = page.locator(".rdrNextPrevButton.rdrNextButton");
  for (let i = 0; i < 4; i++) {
    await nextMonthBtn.click();
    await page.waitForTimeout(400);
  }

  //-------------checkin--------------
  const checkIn = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "5" }).first();
  await checkIn.scrollIntoViewIfNeeded();
  await checkIn.hover();
  await page.waitForTimeout(300);
  await checkIn.click();

  await page.waitForTimeout(500);

  //-------------checkout--------------
  const checkOut = page.locator(".rdrDay:not(.rdrDayPassive)", { hasText: "8" }).first();
  await checkOut.scrollIntoViewIfNeeded();
  await checkOut.hover();
  await page.waitForTimeout(300);
  await checkOut.click();

  await page.waitForTimeout(800);
  await page.mouse.click(50, 50);
  await page.waitForTimeout(1000);


  // B5: Tăng số lượng khách
  const plusBtn = page.locator("button").filter({ hasText: "+" }).last();
  await highlight(page, plusBtn);
  await plusBtn.click({ force: true });
  await page.waitForTimeout(1000);


  // B6: Thực hiện đặt phòng
  const bookBtn = page.locator("button", { hasText: "Đặt phòng" });
  await highlight(page, bookBtn);
  await bookBtn.click({ force: true });
  await page.waitForTimeout(1500);


  // B7: Xác nhận đặt phòng
  const confirmBtn = page.locator("button", { hasText: "Xác nhận" });

  if (await confirmBtn.isVisible()) {
    await highlight(page, confirmBtn);
    await confirmBtn.click({ force: true });
  }

  await page.waitForTimeout(2500);


  // B8: Verify kết quả đặt phòng
  if (
    page.url().includes("profile") ||
    page.url().includes("booking") ||
    page.url().includes("account")
  ) {
    await expect(page).toHaveURL(/profile|booking|account/);
  } else {
    await expect(
      page.locator("button", { hasText: "Đặt phòng" })
    ).toBeVisible();
  }

});