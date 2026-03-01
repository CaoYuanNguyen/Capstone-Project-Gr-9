import { test, expect } from '@playwright/test';

test('TC04_Login_Success', async ({ page }) => {

  await page.goto('https://demo5.cybersoft.edu.vn/');

  await page.locator("img.h-10").click();
  await page.locator("text=Đăng nhập").first().click();

  const emailInput = page.locator("input[placeholder='Vui lòng nhập tài khoản']");
  const passInput = page.locator("input[placeholder='Vui lòng nhập mật khẩu']");

  await emailInput.waitFor();

  await emailInput.fill("tnguyen22@gmail.com");
  await passInput.fill("123");

  await page.waitForTimeout(3000);

  await page.locator("button:has-text('Đăng nhập')").last().click();

  await expect(page.locator("img.h-10")).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(3000);
});
