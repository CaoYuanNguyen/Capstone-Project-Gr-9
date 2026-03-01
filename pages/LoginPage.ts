import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginSuccess(email: string, password: string) {

    await this.page.goto('https://demo5.cybersoft.edu.vn/');
    await this.page.waitForLoadState('networkidle');

    // Click avatar
    await this.page.locator("img.h-10").click({ force: true });

    // Click nút Đăng nhập trong dropdown
    await this.page.locator("text=Đăng nhập").first().click({ force: true });

    // Đợi modal hiện
    await this.page.waitForSelector("input[type='email']", { state: 'visible' });

    // CLICK trước rồi mới fill
    const emailInput = this.page.locator("input[type='email']");
    await emailInput.click({ force: true });
    await emailInput.fill(email);

    const passInput = this.page.locator("input[type='password']");
    await passInput.click({ force: true });
    await passInput.fill(password);

    // Click nút đăng nhập màu đen
    await this.page.locator("button:has-text('Đăng nhập')").last().click({ force: true });

    // Chờ login xong
    await this.page.waitForTimeout(2000);

    // Verify: modal biến mất
    await expect(emailInput).toHaveCount(0);
  }
}