import { Page, Locator } from '@playwright/test';

export class FilterPage {
  readonly page: Page;
  readonly dateField: Locator;
  readonly calendar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[2]");
    this.calendar = page.locator(".rdrCalendarWrapper");
  }

  async openCalendar() {
    await this.dateField.click();
    await this.calendar.waitFor({ state: "visible" });
  }

  async selectDate(day: string) {
    const date = this.page.locator(`.rdrDay:not(.rdrDayPassive) >> text=${day}`).first();
    await date.click();
  }

  async closeCalendar() {
    await this.page.mouse.click(0, 0);
  }
}