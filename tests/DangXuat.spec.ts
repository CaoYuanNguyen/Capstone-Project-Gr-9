import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('TC06: Đăng xuất thành công', async ({ page }) => {
  await page.goto('https://demo5.cybersoft.edu.vn/');
  await page.locator("img.h-10").click();
  await page.locator("text=Đăng nhập").first().click();

  const emailInput = page.locator("input[placeholder='Vui lòng nhập tài khoản']");
  const passInput = page.locator("input[placeholder='Vui lòng nhập mật khẩu']");
  await emailInput.waitFor();
  await emailInput.fill("testlog123@gmail.com");
  await passInput.fill("123456789");
  await page.waitForTimeout(3000);
  await page.locator("button:has-text('Đăng nhập')").last().click();
  await expect(page.locator("img.h-10")).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(3000);

  let homePage = new HomePage(page);
  await homePage.signOut();
  await page.waitForTimeout(1000);

  // Sau logout: dùng button guest (img.h-10) để mở dropdown
  await page.locator("img.h-10").click();

  // Verify: nút Đăng nhập xuất hiện lại
  await expect(page.locator("li button:has-text('Đăng nhập')")).toBeVisible({ timeout: 5000 });

  // Verify: Sign out không còn
  await expect(page.locator("button.text-red-800")).not.toBeVisible();
});