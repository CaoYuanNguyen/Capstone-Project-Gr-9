import { Page, Locator } from '@playwright/test'

export class RoomPage {
    readonly page: Page
    readonly diaDiemNhaTrang: Locator
    readonly danhSachPhong: Locator

    constructor(page: Page) {
        this.page = page

        // Click vào địa điểm Nha Trang 
        this.diaDiemNhaTrang = page.locator("a[href='/rooms/nha-trang']").first()

        // Phòng đầu tiên trong danh sách
        this.danhSachPhong = page.locator("a[href*='room-detail']").first()
    }

    // b2: scroll xuống để thấy danh sách địa điểm rồi click vào Nha Trang
    async clickDiaDiem(): Promise<void> {
        // Scroll xuống để thấy section địa điểm
        await this.page.evaluate(() => window.scrollBy(0, 400))
        await this.page.waitForTimeout(1000)

        // Đợi element xuất hiện rồi scroll vào view và click
        await this.diaDiemNhaTrang.waitFor({ state: 'visible', timeout: 6000 })
        await this.diaDiemNhaTrang.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(500)
        await this.diaDiemNhaTrang.click()
        await this.page.waitForTimeout(2000)
    }

    // b3: trên trang Nha Trang, scroll xuống để thấy danh sách phòng rồi click vào căn đầu tiên
    async clickPhongDauTien(): Promise<void> {
        // Scroll xuống để thấy danh sách phòng
        await this.page.evaluate(() => window.scrollBy(0, 500))
        await this.page.waitForTimeout(1000)

        // Đợi element xuất hiện rồi scroll vào view và click
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

    // b5: scroll xuống để xem chi tiết phòng 
    async scrollXemChiTiet(): Promise<void> {
        // Scroll xuống xem thông tin chi tiết phòng
        await this.page.evaluate(() => window.scrollBy(0, 600))
        await this.page.waitForTimeout(1500)

        // Scroll tiếp để xem tiện ích và giá
        await this.page.evaluate(() => window.scrollBy(0, 500))
        await this.page.waitForTimeout(1500)

        await this.page.evaluate(() => window.scrollBy(0, 500))
        await this.page.waitForTimeout(1500)

    }
}