import { Page, Locator, expect } from '@playwright/test';

export class RoomPage {
  readonly page: Page;

  //Thông tin chính
  readonly roomTitle: Locator;
  readonly locationLink: Locator;
  readonly roomInfoContainer: Locator;

  // Ngày & khách
  readonly checkInDate: Locator;
  readonly checkOutDate: Locator;
  readonly guestInput: Locator;

  // Giá 
  readonly priceRows: Locator;
  readonly rentFee: Locator;
  readonly serviceFee: Locator;
  readonly totalFee: Locator;

  readonly cardBody: Locator;

  // Hình ảnh 
  readonly roomImage: Locator;

  // Nút sort theo giá
  readonly priceButton: Locator;
    // ===== Popup giá =====
    readonly priceModal: Locator;
    readonly minPriceInput: Locator;
    readonly maxPriceInput: Locator;
    readonly applyButton: Locator;
  constructor(page: Page) {
    this.page = page;

    // Tiêu đề phòng
    this.roomTitle = page.locator('.font-bold.text-3xl.pt-4');

    // Địa điểm
    this.locationLink = page.getByRole('link', { name: /Hồ Chí Minh/i });
    // Container thông tin phòng (số khách, phòng ngủ, giường, phòng tắm...)
    this.roomInfoContainer = page.locator('.basis-7\\/12.space-y-5');

    // Scope vào booking container trước, rồi tìm theo class cụ thể
    const bookingForm = page.locator('.border-2.border-gray-600.rounded-lg, .border-x-2.border-t-2.border-gray-600').first().locator('..');

    // Hoặc đơn giản hơn - dùng class đặc trưng của từng ô
    this.checkInDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tl-lg');
    this.checkOutDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tr-lg');

    // Số lượng khách
    this.guestInput = page.locator('.p-3.border-2.border-gray-600.rounded-b-lg');

    // Phí (thuê phòng, dịch vụ, tổng)
    this.priceRows = page.locator('.flex.justify-between.items-center');
    this.rentFee = this.priceRows.nth(0);
    this.serviceFee = this.priceRows.nth(1);
    this.totalFee = this.priceRows.nth(2);

    // Tiện ích
    // Tiện ích - scope vào container chứa heading tiện ích
    // Ant Design card body
    this.cardBody = page.locator('.ant-card-body');

    // Hình ảnh phòng
    this.roomImage = page.locator('img').first();

    // Giá
    this.priceButton = page.getByRole('button', { name: 'Giá' });

    this.priceModal = page.locator('.ant-modal-content');
    this.minPriceInput = page.getByPlaceholder('Giá thấp nhất');
    this.maxPriceInput = page.getByPlaceholder('Giá cao nhất');
    this.applyButton = page.getByRole('button', { name: 'Áp dụng' });
  }

  // TC13: Kiểm tra toàn bộ thông tin phòng hiển thị đầy đủ

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
}