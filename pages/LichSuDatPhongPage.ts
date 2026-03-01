import { Page, Locator } from '@playwright/test'

export class LichSuDatPhongPage {
    readonly page: Page
    readonly userMenuButton: Locator
    readonly dashboardButton: Locator
    readonly phongDaThue: Locator

    constructor(page: Page) {
        this.page = page

        this.userMenuButton = page.locator("button:has(img.rounded-full)")
                                .or(page.locator("button.rounded-full:has(img)"))
                                .or(page.locator("header button").last())

        this.dashboardButton = page.locator("a:has-text('Dashboard')")
                                .or(page.getByRole('link', { name: 'Dashboard' }))

        this.phongDaThue = page.locator("text=Phòng đã thuê")
    }

    async highlight(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded()
        await locator.evaluate((el: HTMLElement) => {
            el.style.border = "4px solid red"
            el.style.backgroundColor = "yellow"
        })
        await this.page.waitForTimeout(500)
        await locator.evaluate((el: HTMLElement) => {
            el.style.border = ""
            el.style.backgroundColor = ""
        })
    }

    // b7: chọn địa điểm Hồ Chí Minh
    async chonDiaDiem(): Promise<void> {
        const location = this.page.locator("//p[text()='Địa điểm']/parent::div")
        await this.highlight(location)
        await location.click()
        await this.page.waitForTimeout(800)

        const hcm = this.page.locator("//p[text()='Hồ Chí Minh']/parent::div")
        await this.highlight(hcm)
        await hcm.click()
        await this.page.waitForTimeout(800)

        const searchBtn = this.page.locator("[aria-label='search']")
        await this.highlight(searchBtn)
        await searchBtn.click()

        await this.page.waitForURL(/ho-chi-minh/)
        await this.page.waitForTimeout(1500)
    }

    // b8: scroll xuống và chọn phòng đầu tiên
    async chonPhong(): Promise<void> {
        await this.page.mouse.wheel(0, 350)
        await this.page.waitForTimeout(1200)

        const firstRoom = this.page.locator("a[href*='detail']").first()
        await this.highlight(firstRoom)
        await firstRoom.click()
        await this.page.waitForTimeout(2000)
    }

    // b9: chọn ngày check-in và check-out
    async chonNgay(): Promise<void> {
        const dateField = this.page.locator("(//div[contains(@class,'cursor-pointer')])[1]")
        await this.highlight(dateField)
        await dateField.click()
        await this.page.waitForTimeout(1200)

        const checkIn = this.page.locator("(//button[contains(@class,'rdrDay')])[5]")
        await checkIn.waitFor({ state: 'visible' })
        await this.highlight(checkIn)
        await checkIn.click()
        await this.page.waitForTimeout(1200)

        const checkOut = this.page.locator("(//button[contains(@class,'rdrDay')])[10]")
        await checkOut.waitFor({ state: 'visible' })
        await checkOut.hover()
        await this.page.waitForTimeout(2000)
        await this.highlight(checkOut)
        await checkOut.click()
        await this.page.waitForTimeout(1500)

        await this.page.mouse.click(50, 50)
        await this.page.waitForTimeout(1200)
    }

    // b10: thêm khách
    async themKhach(): Promise<void> {
        const plusBtn = this.page.locator("button").filter({ hasText: "+" }).last()
        await plusBtn.scrollIntoViewIfNeeded()
        await this.highlight(plusBtn)
        await plusBtn.click({ force: true })
        await this.page.waitForTimeout(1000)
    }

    // b11: click nút Đặt phòng rồi đóng thông báo
    async clickDatPhong(): Promise<void> {
        const bookBtn = this.page.locator("button", { hasText: "Đặt phòng" })
        await bookBtn.scrollIntoViewIfNeeded()
        await this.highlight(bookBtn)
        await bookBtn.click({ force: true })
        await this.page.waitForTimeout(1500)

        // Xác nhận nếu có popup 
        const confirmBtn = this.page.locator("button", { hasText: "Xác nhận" })
        const isConfirmVisible = await confirmBtn.isVisible({ timeout: 2000 }).catch(() => false)
        if (isConfirmVisible) {
            await confirmBtn.click({ force: true })
        }
        await this.page.waitForTimeout(2500)

        // Đóng thông báo "Thêm mới thành công!" bằng nút X
        const closeBtn = this.page.locator(".ant-notification-notice-close")
                            .or(this.page.locator(".ant-notification .anticon-close"))
        if (await closeBtn.first().isVisible()) {
            await closeBtn.first().click()
            await this.page.waitForTimeout(1000)
        }
    }

    // b12: click vào user menu sau khi đặt phòng
    async clickUserMenu(): Promise<void> {
        await this.page.waitForTimeout(1000)
        await this.userMenuButton.first().waitFor({ state: 'visible', timeout: 6000 })
        await this.userMenuButton.first().click()
        await this.page.waitForTimeout(2000)
    }

    // b13: click vào Dashboard
    async clickDashboard(): Promise<void> {
        await this.dashboardButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.dashboardButton.click()
        await this.page.waitForTimeout(2000)
    }

    // b14: kiểm tra đang ở trang info-user
    async waitForDashboard(): Promise<void> {
        await this.page.waitForURL("**/info-user**", { timeout: 6000 })
        await this.page.waitForTimeout(1000)
    }

    // b15: scroll xuống xem Phòng đã thuê
    async scrollToPhongDaThue(): Promise<void> {
        await this.phongDaThue.waitFor({ state: 'visible', timeout: 6000 })
        await this.phongDaThue.scrollIntoViewIfNeeded()
        await this.page.waitForTimeout(1000)
        await this.page.evaluate(() => window.scrollBy(0, 200))
        await this.page.waitForTimeout(1500)
    }
}