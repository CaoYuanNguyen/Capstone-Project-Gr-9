import { Page, Locator } from '@playwright/test';

export class BookingPage {
  private page: Page;

  dateField: Locator;
  nextMonthBtn: Locator;
  bookButton: Locator;
  confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[1]");
    this.nextMonthBtn = page.locator(".rdrNextPrevButton.rdrNextButton");
    this.bookButton = page.locator("button", { hasText: "Đặt phòng" });
    this.confirmButton = page.locator("button", { hasText: "Xác nhận" });
  }

  async openDatePicker() {
    await this.dateField.click();
  }

  async nextMonth(times: number) {
    for (let i = 0; i < times; i++) {
      await this.nextMonthBtn.click();
      await this.page.waitForTimeout(300);
    }
  }

  async clickBook() {
    await this.bookButton.click({ force: true });
  }

  async confirmBookingIfVisible() {
    if (await this.confirmButton.isVisible()) {
      await this.confirmButton.click({ force: true });
    }
  }
}