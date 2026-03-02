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
  await page.goto('https://demo5.cybersoft.edu.vn/');
  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();
  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();
  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await email.waitFor({ state: "visible" });
  await highlight(page, email);
  await email.fill("testlog123@gmail.com");
  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("123456789");
  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();
  await expect(page.locator("img.h-10")).toBeVisible();
  await page.waitForTimeout(3000);
});

// TC05 - LOGIN FAIL
test('TC05_Login_Fail', async ({ page }) => {
  await page.goto('https://demo5.cybersoft.edu.vn/');
  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();
  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();
  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await highlight(page, email);
  await email.fill("wrong@gmail.com");
  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("wrongpass");
  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();
  await expect(
    page.getByText("Email hoặc mật khẩu không đúng")
  ).toBeVisible();
  await page.waitForTimeout(3000);
});

// TC07 - VALIDATE ERROR MESSAGES
test('TC07_Validate_Error_Messages', async ({ page }) => {
  await page.goto('https://demo5.cybersoft.edu.vn/');

  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();
  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();
  await page.getByPlaceholder("Vui lòng nhập tài khoản").waitFor({ state: "visible" });

  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");

  // CASE 1: Bỏ trống cả hai trường → 2 lỗi cùng text, dùng first() và nth(1)
  await highlight(page, submit);
  await submit.click();
  const emailBlankError = page.getByText("Vui lòng không bỏ trống").first();
  const passBlankError = page.getByText("Vui lòng không bỏ trống").nth(1);
  await highlight(page, emailBlankError);
  await highlight(page, passBlankError);
  await expect(emailBlankError).toBeVisible({ timeout: 3000 });
  await expect(passBlankError).toBeVisible({ timeout: 3000 });
  await page.waitForTimeout(1000);

  // CASE 2: Bỏ trống mật khẩu → chỉ còn 1 lỗi ở password
  await highlight(page, email);
  await email.fill("testlog123@gmail.com");
  await highlight(page, submit);
  await submit.click();
  const passError = page.getByText("Vui lòng không bỏ trống").first();
  await highlight(page, passError);
  await expect(passError).toBeVisible({ timeout: 3000 });
  await page.waitForTimeout(1000);

  // CASE 3: Bỏ trống email → chỉ còn 1 lỗi ở email
  await email.clear();
  await highlight(page, password);
  await password.fill("123456789");
  await highlight(page, submit);
  await submit.click();
  const emailError = page.getByText("Vui lòng không bỏ trống").first();
  await highlight(page, emailError);
  await expect(emailError).toBeVisible({ timeout: 3000 });
  await page.waitForTimeout(1000);

  // CASE 4: Sai tài khoản hoặc mật khẩu
  await highlight(page, email);
  await email.fill("wrong@gmail.com");
  await highlight(page, password);
  await password.fill("wrongpass");
  await highlight(page, submit);
  await submit.click();
  const serverError = page.getByText("Email hoặc mật khẩu không đúng");
  await highlight(page, serverError);
  await expect(serverError).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(2000);

  // CASE 5: Email sai định dạng
  await email.clear();
  await password.clear();
  await highlight(page, email);
  await email.fill("notanemail");
  await highlight(page, password);
  await password.fill("123456789");
  await highlight(page, submit);
  await submit.click();
  const formatError = page.getByText("Vui lòng nhập đúng định dạng email");
  await highlight(page, formatError);
  await expect(formatError).toBeVisible({ timeout: 3000 });
  await page.waitForTimeout(2000);
});