import { Page, Locator } from '@playwright/test'

export class DatPhongPage {
    readonly page: Page
    readonly diaDiemNhaTrang: Locator
    readonly danhSachPhong: Locator
    readonly datPhongButton: Locator

    constructor(page: Page) {
        this.page = page

        // Click vào địa điểm Nha Trang
        this.diaDiemNhaTrang = page.locator("a[href='/rooms/nha-trang']").first()

        // Phòng đầu tiên trong danh sách
        this.danhSachPhong = page.locator("a[href*='room-detail']").first()

        // Nút Đặt phòng trong trang chi tiết
        this.datPhongButton = page.getByRole('button', { name: 'Đặt phòng' })
                                .or(page.locator("button:has-text('Đặt phòng')"))
    }

    // b2: scroll xuống rồi click vào Nha Trang
    async clickDiaDiem(): Promise<void> {
        await this.page.evaluate(() => window.scrollBy(0, 400))
        await this.page.waitForTimeout(1000)

        await this.diaDiemNhaTrang.waitFor({ state: 'visible', timeout: 6000 })
        await this.diaDiemNhaTrang.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(500)
        await this.diaDiemNhaTrang.click()
        await this.page.waitForTimeout(2000)
    }

    // b3: scroll xuống rồi click vào phòng đầu tiên
    async clickPhongDauTien(): Promise<void> {
        await this.page.evaluate(() => window.scrollBy(0, 500))
        await this.page.waitForTimeout(1000)

        await this.danhSachPhong.waitFor({ state: 'visible', timeout: 6000 })
        await this.danhSachPhong.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(1000)
        await this.danhSachPhong.click()
        await this.page.waitForTimeout(1500)
    }

    // b4: kiểm tra đang ở trang chi tiết phòng
    async waitForChiTiet(): Promise<void> {
        await this.page.waitForURL("**/room-detail/**", { timeout: 6000 })
        await this.page.waitForTimeout(1500)
    }

    // b5: scroll xuống để thấy nút Đặt phòng
    async scrollToDatePhong(): Promise<void> {
        await this.page.evaluate(() => window.scrollBy(0, 600))
        await this.page.waitForTimeout(1000)
    }

    // b6: click nút Đặt phòng
    async clickDatPhong(): Promise<void> {
        await this.datPhongButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.datPhongButton.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(500)
        await this.datPhongButton.click()
        await this.page.waitForTimeout(2000)
    }
}