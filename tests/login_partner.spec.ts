import { test, expect, Page, Locator } from '@playwright/test';

// highlight
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

// TC04 - LOGIN SUCCESS
test('TC04_Login_Success', async ({ page }) => {

  // B1: Mở trang chủ
  await page.goto('https://demo5.cybersoft.edu.vn/');

  // B2: Mở form đăng nhập
  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();

  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();

  // B3: Nhập thông tin hợp lệ
  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await email.waitFor({ state: "visible" });
  await highlight(page, email);
  await email.fill("testlog123@gmail.com");

  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("123456789");

  // B4: Click đăng nhập và verify thành công
  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();

  await expect(page.locator("img.h-10")).toBeVisible();

  await page.waitForTimeout(3000);
});



// TC05 - LOGIN FAIL
test('TC05_Login_Fail', async ({ page }) => {

  // B1: Mở trang chủ
  await page.goto('https://demo5.cybersoft.edu.vn/');

  // B2: Mở form đăng nhập
  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();

  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();

  // B3: Nhập thông tin sai
  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await highlight(page, email);
  await email.fill("wrong@gmail.com");

  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("wrongpass");

  // B4: Click đăng nhập và verify thất bại
  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();

  await expect(
    page.getByText("Email hoặc mật khẩu không đúng")
  ).toBeVisible();

  await page.waitForTimeout(3000);
});