import { test, expect, Page, Locator } from '@playwright/test';

// highlight
async function highlight(page: Page, locator: Locator) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "4px solid red";
    el.style.backgroundColor = "yellow";
  });
  await page.waitForTimeout(400);
  await locator.evaluate((el: HTMLElement) => {
    el.style.border = "";
    el.style.backgroundColor = "";
  });
}

test('TC25 - Change Password (Feature Not Available)', async ({ page }) => {

  // B1: Đăng nhập
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.waitForTimeout(1500);

  const avatar = page.locator("img.h-10");
  await highlight(page, avatar);
  await avatar.click();
  await page.waitForTimeout(600);

  const loginBtn = page.getByText("Đăng nhập").first();
  await highlight(page, loginBtn);
  await loginBtn.click();
  await page.waitForTimeout(600);

  const email = page.getByPlaceholder("Vui lòng nhập tài khoản");
  await highlight(page, email);
  await email.fill("testlog123@gmail.com");

  const password = page.getByPlaceholder("Vui lòng nhập mật khẩu");
  await highlight(page, password);
  await password.fill("123456789");
  await page.waitForTimeout(1000);

  const submit = page.getByRole("button", { name: "Đăng nhập" }).last();
  await highlight(page, submit);
  await submit.click();

  await expect(page.locator("img.h-10")).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(2000);

  // B2: Chọn Dashboard
  const avatarAfterLogin = page.locator("img.h-10");
  await highlight(page, avatarAfterLogin);
  await avatarAfterLogin.click();

  await page.mouse.move(0, 0); // tránh hover Sign out

  const dashboardBtn = page.getByText("Dashboard");
  await highlight(page, dashboardBtn);
  await dashboardBtn.click();

  await page.mouse.click(10, 10);

  await expect(page).toHaveURL(/info-user|dashboard/);

  // B3: Mở Chỉnh sửa hồ sơ
  const editProfileBtn = page.getByText("Chỉnh sửa hồ sơ");
  await expect(editProfileBtn).toBeVisible({ timeout: 5000 });

  await highlight(page, editProfileBtn);
  await editProfileBtn.click();

  const modal = page.locator(".ant-modal-wrap:visible .ant-modal-content");
  await expect(modal).toBeVisible();

  // B4: Verify không có Change Password
  await expect(
    modal.getByText(/mật khẩu mới|đổi mật khẩu|change password/i)
  ).toHaveCount(0);

  await page.waitForTimeout(3000);
});