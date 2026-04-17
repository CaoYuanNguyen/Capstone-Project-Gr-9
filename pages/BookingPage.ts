// import { Page, Locator } from '@playwright/test';

// export class BookingPage {
//   private page: Page;

//   dateField: Locator;
//   nextMonthBtn: Locator;
//   bookButton: Locator;
//   confirmButton: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     this.dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[1]");
//     this.nextMonthBtn = page.locator(".rdrNextPrevButton.rdrNextButton");
//     this.bookButton = page.locator("button", { hasText: "Đặt phòng" });
//     this.confirmButton = page.locator("button", { hasText: "Xác nhận" });
//   }

//   async openDatePicker() {
//     await this.dateField.click();
//   }

//   async nextMonth(times: number) {
//     for (let i = 0; i < times; i++) {
//       await this.nextMonthBtn.click();
//       await this.page.waitForTimeout(300);
//     }
//   }

//   async clickBook() {
//     await this.bookButton.click({ force: true });
//   }

//   async confirmBookingIfVisible() {
//     if (await this.confirmButton.isVisible()) {
//       await this.confirmButton.click({ force: true });
//     }
//   }
// }

import { Page, Locator, expect } from '@playwright/test';

export class BookingPage {
    readonly page: Page;

    // ─── Locators dùng chung ───
    readonly avatarBtn: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;

    // ─── Trang danh sách phòng ───
    readonly locationField: Locator;
    readonly searchBtn: Locator;
    readonly firstRoom: Locator;

    // ─── Trang chi tiết phòng ───
    readonly roomTitle: Locator;
    readonly roomImage: Locator;
    readonly checkInDate: Locator;
    readonly checkOutDate: Locator;
    readonly guestInput: Locator;
    readonly plusGuestBtn: Locator;
    readonly dateField: Locator;
    readonly nextMonthBtn: Locator;

    // ─── Giá ───
    readonly priceRows: Locator;
    readonly rentFee: Locator;
    readonly serviceFee: Locator;
    readonly totalFee: Locator;
    readonly priceButton: Locator;
    readonly priceModal: Locator;
    readonly minPriceInput: Locator;
    readonly maxPriceInput: Locator;
    readonly applyButton: Locator;

    // ─── Đặt phòng ───
    readonly bookButton: Locator;
    readonly confirmButton: Locator;

    // ─── Dashboard / Lịch sử ───
    readonly userMenuButton: Locator;
    readonly dashboardButton: Locator;
    readonly phongDaThue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Đăng nhập
        this.avatarBtn = page.locator('button:has(img.h-10)').first();
        this.emailInput = page.getByPlaceholder('Vui lòng nhập tài khoản');
        this.passwordInput = page.getByPlaceholder('Vui lòng nhập mật khẩu');
        this.submitBtn = page.getByRole('button', { name: 'Đăng nhập' }).last();

        // Tìm phòng
        this.locationField = page.locator("//p[text()='Địa điểm']/parent::div");
        this.searchBtn = page.locator("[aria-label='search']");
        this.firstRoom = page.locator("a[href*='detail']").first();

        // Chi tiết phòng
        this.roomTitle = page.locator('.font-bold.text-3xl.pt-4');
        this.roomImage = page.locator('img').first();
        this.checkInDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tl-lg');
        this.checkOutDate = page.locator('.cursor-pointer.grow.p-3.bg-white.rounded-tr-lg');
        this.guestInput = page.locator('.p-3.border-2.border-gray-600.rounded-b-lg');
        this.plusGuestBtn = page.locator('button').filter({ hasText: '+' }).last();
        this.dateField = page.locator("(//div[contains(@class,'cursor-pointer')])[1]");
        this.nextMonthBtn = page.locator('.rdrNextPrevButton.rdrNextButton');

        // Giá
        this.priceRows = page.locator('.flex.justify-between.items-center');
        this.rentFee = this.priceRows.nth(0);
        this.serviceFee = this.priceRows.nth(1);
        this.totalFee = this.priceRows.nth(2);
        this.priceButton = page.getByRole('button', { name: 'Giá' });
        this.priceModal = page.locator('.ant-modal-content');
        this.minPriceInput = page.getByPlaceholder('Giá thấp nhất');
        this.maxPriceInput = page.getByPlaceholder('Giá cao nhất');
        this.applyButton = page.getByRole('button', { name: 'Áp dụng' });

        // Đặt phòng
        this.bookButton = page.locator('button', { hasText: 'Đặt phòng' });
        this.confirmButton = page.locator('button', { hasText: 'Xác nhận' });

        // Dashboard
        this.userMenuButton = page.locator('button:has(img.rounded-full)')
            .or(page.locator('button#user-menu-button'));
        this.dashboardButton = page.locator("a:has-text('Dashboard')")
            .or(page.getByRole('link', { name: 'Dashboard' }));
        this.phongDaThue = page.locator("text=Phòng đã thuê");
    }

    // ─── ĐĂNG NHẬP ───
    async login(email: string, password: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1500);

        await this.avatarBtn.waitFor({ state: 'visible' });
        await this.avatarBtn.click();

        const dangNhapBtn = this.page.locator('#user-dropdown button').getByText('Đăng nhập');
        await dangNhapBtn.waitFor({ state: 'visible', timeout: 5000 });
        await dangNhapBtn.click();

        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();

        await expect(this.emailInput).toBeHidden({ timeout: 15000 });
    }

    // ─── TÌM PHÒNG ───
    async chonDiaDiemHCM(): Promise<void> {
        await this.locationField.click();
        await this.page.waitForTimeout(800);
        const hcm = this.page.locator("//p[text()='Hồ Chí Minh']/parent::div");
        await hcm.click();
        await this.searchBtn.click();
        await this.page.waitForURL(/ho-chi-minh/);
        await this.page.waitForTimeout(1500);
    }

    async chonPhongDauTien(): Promise<void> {
        await this.page.mouse.wheel(0, 350);
        await this.page.waitForTimeout(1200);
        await this.firstRoom.waitFor({ state: 'visible', timeout: 6000 });
        await this.firstRoom.scrollIntoViewIfNeeded();
        await this.firstRoom.click();
        await this.page.waitForURL('**/room-detail/**', { timeout: 6000 });
        await this.page.waitForTimeout(1500);
    }

    // ─── CHỌN NGÀY ───
    async openDatePicker(): Promise<void> {
        await this.dateField.click();
        await this.page.locator('.rdrCalendarWrapper').waitFor({ state: 'visible' });
    }

    async nextMonth(times: number): Promise<void> {
        for (let i = 0; i < times; i++) {
            await this.nextMonthBtn.click();
            await this.page.waitForTimeout(300);
        }
    }

    async chonNgay(checkInDay: string, checkOutDay: string): Promise<void> {
        await this.openDatePicker();
        await this.nextMonth(4);

        const checkIn = this.page.locator('.rdrDay:not(.rdrDayPassive)', { hasText: checkInDay }).first();
        await checkIn.hover();
        await checkIn.click();
        await this.page.waitForTimeout(500);

        const checkOut = this.page.locator('.rdrDay:not(.rdrDayPassive)', { hasText: checkOutDay }).first();
        await checkOut.hover();
        await checkOut.click();
        await this.page.waitForTimeout(800);

        await this.page.mouse.click(50, 50);
        await this.page.waitForTimeout(1000);
    }

    // ─── ĐẶT PHÒNG ───
    async themKhach(): Promise<void> {
        await this.plusGuestBtn.scrollIntoViewIfNeeded();
        await this.plusGuestBtn.click({ force: true });
        await this.page.waitForTimeout(1000);
    }

    async clickDatPhong(): Promise<void> {
        await this.bookButton.scrollIntoViewIfNeeded();
        await this.bookButton.click({ force: true });
        await this.page.waitForTimeout(1500);

        if (await this.confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.confirmButton.click({ force: true });
        }
        await this.page.waitForTimeout(2500);

        // Đóng notification nếu có
        const closeBtn = this.page.locator('.ant-notification-notice-close');
        if (await closeBtn.first().isVisible({ timeout: 1000 }).catch(() => false)) {
            await closeBtn.first().click();
            await this.page.waitForTimeout(1000);
        }
    }

    // ─── DASHBOARD / LỊCH SỬ ───
    async goToDashboard(): Promise<void> {
        await this.page.waitForTimeout(1000);
        await this.userMenuButton.first().waitFor({ state: 'visible', timeout: 6000 });
        await this.userMenuButton.first().click();
        await this.page.waitForTimeout(1000);
        await this.dashboardButton.waitFor({ state: 'visible', timeout: 6000 });
        await this.dashboardButton.click();
        await this.page.waitForURL('**/info-user**', { timeout: 6000 });
        await this.page.waitForTimeout(1000);
    }

    async scrollToPhongDaThue(): Promise<void> {
        await this.phongDaThue.waitFor({ state: 'visible', timeout: 6000 });
        await this.phongDaThue.scrollIntoViewIfNeeded();
        await this.page.evaluate(async () => {
            await new Promise<void>((resolve) => {
                let pos = 0;
                const timer = setInterval(() => {
                    const max = document.body.scrollHeight - window.innerHeight - 100;
                    window.scrollBy(0, 300);
                    pos += 300;
                    if (pos >= max) {
                        window.scrollTo(0, max);
                        clearInterval(timer);
                        resolve();
                    }
                }, 400);
            });
        });
        await this.page.waitForTimeout(2000);
    }

    // ─── TC17: KIỂM TRA GIÁ ───
    async verifyRoomDetailVisible(): Promise<void> {
        await expect(this.roomTitle).toBeVisible();
        await expect(this.roomImage).toBeVisible();
        await expect(this.checkInDate).toBeVisible();
        await expect(this.checkOutDate).toBeVisible();
        await expect(this.guestInput).toBeVisible();
        await expect(this.rentFee).toBeVisible();
        await expect(this.serviceFee).toBeVisible();
        await expect(this.totalFee).toBeVisible();
    }

    async getPricePerNight(): Promise<number> {
        const raw = await this.page.locator('p:has-text("nights")').first().textContent();
        const part = raw?.split(/[xX]/)[0] ?? '';
        const num = parseFloat(part.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) throw new Error(`Không parse được giá: "${raw}"`);
        return num;
    }

    async getNights(): Promise<number> {
        const raw = await this.page.locator('p:has-text("nights"), p:has-text("đêm")').first().textContent();
        const match = raw?.match(/[xX]\s*(\d+)/);
        if (!match) throw new Error(`Không tìm thấy số đêm: "${raw}"`);
        return parseInt(match[1]);
    }

    private parseMoney(raw: string | null): number {
        if (!raw) throw new Error(`Không parse được tiền: "${raw}"`);
        const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) throw new Error(`Giá trị không hợp lệ: "${raw}"`);
        return num;
    }

    async getMultipliedPrice(): Promise<number> {
        const raw = await this.page.locator('p:has-text("nights")')
            .locator('xpath=following-sibling::p[1]').textContent();
        return this.parseMoney(raw);
    }

    async getServiceFeeAmount(): Promise<number> {
        const raw = await this.page.locator('p:has-text("Cleaning fee")')
            .locator('xpath=following-sibling::p[1]').textContent();
        return this.parseMoney(raw);
    }

    async getTotalPrice(): Promise<number> {
        const raw = await this.page.locator('p:has-text("Total before taxes")')
            .locator('xpath=following-sibling::p[1]').textContent();
        return this.parseMoney(raw);
    }
}