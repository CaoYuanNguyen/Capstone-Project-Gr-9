import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;

  avatar: Locator;
  loginButton: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.avatar = page.locator("img.h-10");
    this.loginButton = page.getByText("Đăng nhập").first();
    this.emailInput = page.getByPlaceholder("Vui lòng nhập tài khoản");
    this.passwordInput = page.getByPlaceholder("Vui lòng nhập mật khẩu");
    this.submitButton = page.getByRole("button", { name: "Đăng nhập" }).last();
  }

  async openLoginForm() {
    await this.avatar.click();
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.openLoginForm();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}