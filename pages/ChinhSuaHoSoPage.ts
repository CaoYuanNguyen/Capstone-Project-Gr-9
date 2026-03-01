import { Page, Locator } from '@playwright/test'

export class ChinhSuaHoSoPage {
    readonly page: Page
    readonly userMenuButton: Locator
    readonly dashboardButton: Locator
    readonly chinhSuaHoSoLink: Locator
    readonly capNhatButton: Locator

    constructor(page: Page) {
        this.page = page

        // Avatar button sau khi đăng nhập
        this.userMenuButton = page.locator("button:has(img.rounded-full)")
                                .or(page.locator("button.rounded-full:has(img)"))
                                .or(page.locator("header button").last())

        // Nút Dashboard trong dropdown
        this.dashboardButton = page.locator("a:has-text('Dashboard')")
                                .or(page.getByRole('link', { name: 'Dashboard' }))

        // Link Chỉnh sửa hồ sơ
        this.chinhSuaHoSoLink = page.locator("a:has-text('Chỉnh sửa hồ sơ')")
                                .or(page.locator("text=Chỉnh sửa hồ sơ"))

        // Nút Cập nhật trong footer modal
        this.capNhatButton = page.locator(".ant-modal-footer button.ant-btn-primary")
    }

    // b7: click vào user menu sau khi đăng nhập
    async clickUserMenu(): Promise<void> {
        await this.page.waitForTimeout(1000)
        await this.userMenuButton.first().waitFor({ state: 'visible', timeout: 6000 })
        await this.userMenuButton.first().click()
        await this.page.waitForTimeout(1000)
    }

    // b8: click vào Dashboard
    async clickDashboard(): Promise<void> {
        await this.dashboardButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.dashboardButton.click()
        await this.page.waitForTimeout(2000)
    }

    // b9: kiểm tra đang ở trang info-user
    async waitForDashboard(): Promise<void> {
        await this.page.waitForURL("**/info-user**", { timeout: 6000 })
        await this.page.waitForTimeout(1000)
    }

    // b10: click vào link Chỉnh sửa hồ sơ
    async clickChinhSuaHoSo(): Promise<void> {
        await this.chinhSuaHoSoLink.waitFor({ state: 'visible', timeout: 6000 })
        await this.chinhSuaHoSoLink.click()
        await this.page.waitForTimeout(1500)
    }

    // b11: điền email - dùng placeholder để phân biệt với modal đăng nhập
    async fillEmail(email: string): Promise<void> {
        // Đợi modal đăng nhập biến mất hoàn toàn
        await this.page.locator("input[placeholder='Vui lòng nhập mật khẩu']")
                        .waitFor({ state: 'hidden', timeout: 6000 })
        // input email trong modal chỉnh sửa có placeholder="vidu@gmail.com"
        const input = this.page.locator("input#email[placeholder='vidu@gmail.com']")
        await input.waitFor({ state: 'visible', timeout: 6000 })
        await input.clear()
        await input.fill(email)
        await this.page.waitForTimeout(500)
    }

    // b12: điền họ tên
    async fillHoTen(hoTen: string): Promise<void> {
        const input = this.page.locator("input#name")
        await input.waitFor({ state: 'visible', timeout: 6000 })
        await input.clear()
        await input.fill(hoTen)
        await this.page.waitForTimeout(500)
    }

    // b13: điền số điện thoại
    async fillSoDienThoai(sdt: string): Promise<void> {
        const input = this.page.locator("input#phone")
        await input.clear()
        await input.fill(sdt)
        await this.page.waitForTimeout(500)
    }

    // b14: điền ngày sinh
    async fillNgaySinh(ngaySinh: string): Promise<void> {
        const input = this.page.locator("input#birthday")
        await input.click()
        await this.page.waitForTimeout(300)
        await this.page.keyboard.type(ngaySinh)
        await this.page.keyboard.press("Enter")
        await this.page.waitForTimeout(500)
    }

    // b15: chọn giới tính
    async selectGioiTinh(gioiTinh: string): Promise<void> {
        const select = this.page.locator(".ant-modal-content .ant-select").last()
        await select.click()
        await this.page.waitForTimeout(500)
        await this.page.locator(".ant-select-item").filter({ hasText: gioiTinh }).click()
        await this.page.waitForTimeout(500)
    }

    // b16: click nút Cập nhật
    async clickCapNhat(): Promise<void> {
        await this.capNhatButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.capNhatButton.click()
        await this.page.waitForTimeout(2000)
    }
}