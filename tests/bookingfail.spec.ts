import { test, expect, Page, Locator } from '@playwright/test';

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(500);
  await locator.evaluate((el: HTMLElement) => {0
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

test('TC19 - Booking Fail', async ({ page }) => {

  // B1: Mở trang và đăng nhập
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

  // B2: Tìm phòng theo địa điểm
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

  // B3: Chọn phòng đầu tiên
  await page.mouse.wheel(0, 350);
  await page.waitForTimeout(1200);

  const firstRoom = page.locator("a[href*='detail']").first();
  await highlight(page, firstRoom);
  await firstRoom.click();

  await page.waitForTimeout(2000);

  // B4: Mở chọn ngày
  const dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[1]");
  await highlight(page, dateField);
  await dateField.click();

  await page.waitForTimeout(1200);

  // B5: Chọn ngày không hợp lệ (Yesterday)
  const yesterdayBtn = page.getByText("Yesterday");
  await yesterdayBtn.waitFor({ state: "visible" });

  await highlight(page, yesterdayBtn);
  await yesterdayBtn.click();

  await page.waitForTimeout(1200);

  // B6: Click ra ngoài
  await page.mouse.click(50, 50);
  await page.waitForTimeout(1200);
});