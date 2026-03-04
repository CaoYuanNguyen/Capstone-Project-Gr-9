import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  private page: Page;

  dashboardButton: Locator;
  editProfileButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dashboardButton = page.getByText("Dashboard");
    this.editProfileButton = page.getByText("Chỉnh sửa hồ sơ");
  }

  async goToDashboard() {
    await this.dashboardButton.click();
  }

  async openEditProfile() {
    await this.editProfileButton.click();
  }
}