import { Page, Locator, expect } from '@playwright/test';

export class RoomPage {
  readonly page: Page;

  // Thông tin chính
  readonly roomTitle: Locator;
  readonly locationLink: Locator;
  readonly roomInfoContainer: Locator;

  // Ngày & khách
  readonly checkInDate: Locator;
  readonly checkOutDate: Locator;
  readonly guestInput: Locator;

  // Giá (booking form)
  readonly priceRows: Locator;
  readonly rentFee: Locator;
  readonly serviceFee: Locator;
  readonly totalFee: Locator;

  // Giá (price section chi tiết)
  readonly roomPricePerNight: Locator;
  readonly multipliedRoomPrice: Locator;
  readonly totalPrice: Locator;

  // Hình ảnh
  readonly roomImage: Locator;

  // Card
  readonly cardBody: Locator;

  // Nút sort theo giá
  readonly priceButton: Locator;

  // Popup giá
  readonly priceModal: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyButton: Locator;

  // Date Picker
  readonly dateButton: Locator;
  readonly dayCell: (day: string) => Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.roomTitle = page.locator('.font-bold.text-3xl.pt-4');
    this.locationLink = page.getByRole('link', { name: /Hồ Chí Minh/i });
    this.roomInfoContainer = page.locator('.basis-7\\/12.space-y-5');
    this.checkInDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tl-lg');
    this.checkOutDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tr-lg');
    this.guestInput = page.locator('.p-3.border-2.border-gray-600.rounded-b-lg');

    this.priceRows = page.locator('.flex.justify-between.items-center');
    this.rentFee = this.priceRows.nth(0);
    this.serviceFee = this.priceRows.nth(1);
    this.totalFee = this.priceRows.nth(2);

    this.roomImage = page.locator('img').first();
    this.cardBody = page.locator('.ant-card-body');

    this.priceButton = page.getByRole('button', { name: 'Giá' });
    this.priceModal = page.locator('.ant-modal-content');
    this.minPriceInput = page.getByPlaceholder('Giá thấp nhất');
    this.maxPriceInput = page.getByPlaceholder('Giá cao nhất');
    this.applyButton = page.getByRole('button', { name: 'Áp dụng' });

    this.dateButton = page.locator('.cursor-pointer.grow');
    this.dayCell = (day: string) =>
      page.locator('span.rdrDayNumber span', { hasText: day });
    this.closeButton = page.getByRole('button', { name: 'Close' });

    this.roomPricePerNight = page.locator('span.font-bold').first();
    const detailPriceRows = page.locator('p.font-mono.text-lg.font-bold');
    this.multipliedRoomPrice = detailPriceRows.nth(0);
    this.totalPrice = detailPriceRows.nth(1);
  }

  // ─── TC13 ───
  async verifyRoomDetailVisible() {
    await expect(this.roomTitle).toBeVisible();
    await expect(this.locationLink).toBeVisible();
    await expect(this.roomInfoContainer).toBeVisible();
    await expect(this.roomImage).toBeVisible();
    await expect(this.checkInDate).toBeVisible();
    await expect(this.checkOutDate).toBeVisible();
    await expect(this.guestInput).toBeVisible();
    await expect(this.rentFee).toBeVisible();
    await expect(this.serviceFee).toBeVisible();
    await expect(this.totalFee).toBeVisible();
  }

  async verifyNoInvalidValues() {
    const bodyText = await this.page.locator('body').textContent();
    expect(bodyText).not.toContain('undefined');
    expect(bodyText).not.toContain('NaN');
  }

  async verifyTitleNotEmpty() {
    await expect(this.roomTitle).toBeVisible();
    const text = await this.roomTitle.textContent();
    expect(text?.trim()).not.toBe('');
  }

  async verifyTitleContains(text: string) {
    await expect(this.roomTitle).toContainText(text);
  }

  async verifyLocation(expectedLocation: string) {
    await expect(this.locationLink).toHaveText(expectedLocation);
  }

  async verifyImageLoaded() {
    await expect(this.roomImage).toBeVisible();
    const src = await this.roomImage.getAttribute('src');
    expect(src?.trim()).toBeTruthy();
  }

  async verifyPriceNotEmpty() {
    for (const row of [this.rentFee, this.serviceFee, this.totalFee]) {
      await expect(row).toBeVisible();
      const text = await row.textContent();
      expect(text?.trim()).not.toBe('');
    }
  }

  async clickFirstCard() {
    await this.cardBody.first().click();
  }

  async clickPriceButton() {
    await this.priceButton.click();
  }

  async verifyPriceFilterVisible() {
    await expect(this.priceModal).toBeVisible();
    await expect(this.minPriceInput).toBeVisible();
    await expect(this.maxPriceInput).toBeVisible();
    await expect(this.applyButton).toBeVisible();
  }

  // ─── TC17: Chọn ngày check-in / check-out ───
  async selectDates(checkInDay: string, checkOutDay: string) {
    // Mở date picker bằng cách click vào ô check-in
    await this.checkInDate.click();

    // Chờ calendar xuất hiện
    await this.page.locator('.rdrCalendarWrapper').waitFor({ state: 'visible' });

    // Click ngày check-in (exact match để tránh nhầm "5" với "15", "25")
    await this.page
      .locator('span.rdrDayNumber span')
      .filter({ hasText: new RegExp(`^${checkInDay}$`) })
      .first()
      .click();

    // Click ngày check-out
    await this.page
      .locator('span.rdrDayNumber span')
      .filter({ hasText: new RegExp(`^${checkOutDay}$`) })
      .first()
      .click();

    // Đóng calendar (click ra ngoài hoặc dùng nút Close nếu có)
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  // ─── TC17: Lấy số đêm từ dòng "$28 X 7 nights" ───
  async getNights(): Promise<number> {
    const raw = await this.page
      .locator('p:has-text("nights"), p:has-text("đêm")')
      .first()
      .textContent();
    const match = raw?.match(/[xX]\s*(\d+)/);
    if (!match) throw new Error(`Không tìm thấy số đêm trong: "${raw}"`);
    return parseInt(match[1]);
  }

  // ─── TC17: Lấy giá phòng / đêm từ booking card ───
  async getPricePerNight(): Promise<number> {
    // Snapshot: generic chứa "$28" ngay trước "/ night"
    const raw = await this.page
      .locator('p:has-text("nights")')
      .first()
      .textContent();
    // "$28 X 7 nights" → lấy số trước X
    const part = raw?.split(/[xX]/)[0] ?? '';
    const num = parseFloat(part.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) throw new Error(`Không parse được giá từ: "${raw}"`);
    return num;
  }

  // ─── TC17: Lấy giá sau nhân, phí dịch vụ, tổng ───
  async getMultipliedPrice(): Promise<number> {
    const raw = await this.page
      .locator('p:has-text("nights")')
      .locator('xpath=following-sibling::p[1]')
      .textContent();
    return this.parseMoney(raw);
  }

  async getServiceFee(): Promise<number> {
    const raw = await this.page
      .locator('p:has-text("Cleaning fee")')
      .locator('xpath=following-sibling::p[1]')
      .textContent();
    return this.parseMoney(raw);
  }

  async getTotalPrice(): Promise<number> {
    const raw = await this.page
      .locator('p:has-text("Total before taxes")')
      .locator('xpath=following-sibling::p[1]')
      .textContent();
    return this.parseMoney(raw);
  }

  private parseMoney(raw: string | null): number {
    if (!raw) throw new Error(`Không parse được tiền: "${raw}"`);
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) throw new Error(`Giá trị không hợp lệ: "${raw}"`);
    return num;
  }
}