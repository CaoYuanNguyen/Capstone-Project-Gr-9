// helpers/assertionHelper.ts
import { Page, expect } from '@playwright/test'

export class AssertionHelper {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Kiểm tra thông báo thành công (ant-message)
    async expectSuccessMessage(text: string = 'thành công'): Promise<void> {
        const msg = this.page.locator('.ant-message-notice-content')
        await expect(msg).toBeVisible({ timeout: 5000 })
        await expect(msg).toContainText(text)
    }

    // Kiểm tra thông báo lỗi (ant-message)
    async expectErrorMessage(text: string): Promise<void> {
        const msg = this.page.locator('.ant-message-notice-content')
        await expect(msg).toBeVisible({ timeout: 5000 })
        await expect(msg).toContainText(text)
    }

    // Kiểm tra lỗi validation form (ant-form)
    async expectValidationError(): Promise<void> {
        const err = this.page.locator('.ant-form-item-explain-error').first()
        await expect(err).toBeVisible({ timeout: 5000 })
    }

    // Kiểm tra thông báo notification (ant-notification)
    async expectNotification(text: string): Promise<void> {
        const msg = this.page.locator('.ant-notification-notice-description')
        await expect(msg).toBeVisible({ timeout: 5000 })
        await expect(msg).toContainText(text)
    }

    // Kiểm tra URL hiện tại chứa chuỗi
    async expectUrlContains(urlPart: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(urlPart))
    }
}