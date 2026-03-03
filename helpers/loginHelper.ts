// helpers/loginHelper.ts
import { Page, expect } from '@playwright/test'
import { VALID_USER } from '../data/testData'

export class LoginHelper {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async login(email: string, password: string): Promise<void> {
        // Scroll lên đầu trang trước khi click avatar
        await this.page.evaluate(() => window.scrollTo(0, 0))
        await this.page.waitForTimeout(500)

        const avatar = this.page.locator("img.h-10")
        await avatar.scrollIntoViewIfNeeded()
        await avatar.click({ force: true })

        // Đợi dropdown hiện ra rồi mới click Đăng nhập
        const dangNhapBtn = this.page.locator("text=Đăng nhập").first()
        await dangNhapBtn.waitFor({ state: 'visible', timeout: 6000 })
        await dangNhapBtn.click({ force: true })

        const emailInput = this.page.locator("input[placeholder='Vui lòng nhập tài khoản']")
        await emailInput.waitFor({ state: 'visible', timeout: 6000 })
        await emailInput.fill(email)
        await this.page.locator("input[placeholder='Vui lòng nhập mật khẩu']").fill(password)
        await this.page.waitForTimeout(500)
        await this.page.locator("button:has-text('Đăng nhập')").last().click({ force: true })
        await this.page.waitForTimeout(2000)
    }

    async loginAsDefault(): Promise<void> {
        await this.login(VALID_USER.email, VALID_USER.password)
        await expect(
            this.page.locator("input[placeholder='Vui lòng nhập tài khoản']")
        ).toHaveCount(0)
    }

    async expectLoginError(): Promise<void> {
        const errorMsg = this.page.locator(".ant-message-notice-content")
            .or(this.page.locator(".ant-notification-notice-message"))
        await expect(errorMsg).toBeVisible({ timeout: 5000 })
    }
}