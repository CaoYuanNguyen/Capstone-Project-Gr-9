import { Page, Locator } from '@playwright/test'

export class UploadAvatarPage {
    readonly page: Page
    readonly userMenuButton: Locator
    readonly dashboardButton: Locator
    readonly capNhatAnhLink: Locator
    readonly chooseFileInput: Locator
    readonly uploadAvatarButton: Locator

    constructor(page: Page) {
        this.page = page

        // Avatar button sau khi đăng nhập
        this.userMenuButton = page.locator("button:has(img.rounded-full)")
                                .or(page.locator("button.rounded-full:has(img)"))
                                .or(page.locator("header button").last())

        // Nút Dashboard trong dropdown
        this.dashboardButton = page.locator("a:has-text('Dashboard')")
                                .or(page.getByRole('link', { name: 'Dashboard' }))

        // Link Cập nhật ảnh trên trang Dashboard
        this.capNhatAnhLink = page.locator("button:has-text('Cập nhật ảnh')")
                                .or(page.locator("text=Cập nhật ảnh"))

        // Input file ẩn để upload ảnh
        this.chooseFileInput = page.locator("input[type='file']")

        // Nút Upload Avatar trong modal
        this.uploadAvatarButton = page.locator("button:has-text('Upload Avatar')")
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

    // b10: click vào link Cập nhật ảnh
    async clickCapNhatAnh(): Promise<void> {
        await this.capNhatAnhLink.waitFor({ state: 'visible', timeout: 6000 })
        await this.capNhatAnhLink.click()
        await this.page.waitForTimeout(1500)
    }

    // b11: chọn file ảnh (không cần mở dialog, dùng setInputFiles trực tiếp)
    async chooseFile(filePath: string): Promise<void> {
        await this.chooseFileInput.waitFor({ state: 'attached', timeout: 6000 })
        await this.chooseFileInput.setInputFiles(filePath)
        await this.page.waitForTimeout(1500)
    }

    // b12: click nút Upload Avatar
    async clickUploadAvatar(): Promise<void> {
        await this.uploadAvatarButton.waitFor({ state: 'visible', timeout: 6000 })
        await this.uploadAvatarButton.click()
        await this.page.waitForTimeout(2000)
    }
}