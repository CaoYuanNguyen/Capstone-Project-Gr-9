// helpers/assertionHelper.ts
import { Page, expect } from '@playwright/test'

export class AssertionHelper {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Kiểm tra thông báo thành công (ant-message)
    async expectSuccessMessage(text: string = 'thành công'): Promise<void> {
        const msg = this.page.locator('.ant-message-notice-content');
        // Đợi message xuất hiện và chứa text chính xác
        await expect(msg).toBeVisible({ timeout: 5000 });
        await expect(msg).toContainText(text);
    }

    // Kiểm tra thông báo lỗi (ant-message)
    async expectErrorMessage(text: string): Promise<void> {
        const msg = this.page.locator('.ant-message-notice-content')
        await expect(msg).toBeVisible({ timeout: 5000 })
        await expect(msg).toContainText(text)
    }

    async expectValidationError(): Promise<void> {
        // Đợi animation Ant Design chạy xong
        await this.page.waitForTimeout(800);
        
        const antErr = this.page.locator('div.ant-form-item-explain-error').first();
        const tailwindErr = this.page.locator('p.text-red-500').first();

        try {
            await antErr.waitFor({ state: 'visible', timeout: 5000 });
            return;
        } catch {}

        try {
            await tailwindErr.waitFor({ state: 'visible', timeout: 2000 });
            return;
        } catch {}

        throw new Error('Không tìm thấy thông báo lỗi validation');
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